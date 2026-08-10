import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
	fetchRepo,
	fetchSchema,
	resolveSchemaVersion,
	getOpsDir,
	cleanupTempDirs
} from './fetch.js';
import { compileDatabase } from './build.js';
import { extractDatabase } from './extract.js';
import { slugify } from '../../src/lib/shared/utils/slug.js';
import type { PcdConfig, PcdManifest } from './types.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '../..');
const outputDir = join(projectRoot, 'src/lib/data/pcd');

interface NavEntry {
	name: string;
	arrType: string;
}

interface NavIndex {
	[databaseId: string]: {
		customFormats: string[];
		qualityProfiles: string[];
		regularExpressions: string[];
		delayProfiles: string[];
		naming: NavEntry[];
		mediaSettings: NavEntry[];
		qualityDefinitions: NavEntry[];
	};
}

interface SlugCollision {
	database: string;
	entityType: string;
	slug: string;
	names: string[];
}

function checkSlugCollisions(navIndex: NavIndex): SlugCollision[] {
	const collisions: SlugCollision[] = [];

	for (const [dbId, db] of Object.entries(navIndex)) {
		for (const [entityType, entries] of Object.entries(db)) {
			const slugMap = new Map<string, string[]>();
			const names = (entries as (string | NavEntry)[]).map((e) =>
				typeof e === 'string' ? e : `${e.arrType}/${e.name}`
			);

			for (const name of names) {
				const slug = slugify(name);
				const existing = slugMap.get(slug);
				if (existing) {
					existing.push(name);
				} else {
					slugMap.set(slug, [name]);
				}
			}

			for (const [slug, slugNames] of slugMap) {
				if (slugNames.length > 1) {
					// Skip case-only collisions (e.g. SiGMA vs SIGMA) - known upstream issue
					const isCaseOnly = slugNames.every(
						(n) => n.toLowerCase() === slugNames[0].toLowerCase()
					);
					if (!isCaseOnly) {
						collisions.push({ database: dbId, entityType, slug, names: slugNames });
					}
				}
			}
		}
	}

	return collisions;
}

function main(): void {
	const config: PcdConfig = JSON.parse(readFileSync(join(__dirname, 'config.json'), 'utf-8'));

	mkdirSync(outputDir, { recursive: true });

	console.log(`Compiling ${config.databases.length} PCD databases...\n`);

	const navIndex: NavIndex = {};

	for (const entry of config.databases) {
		const start = performance.now();
		console.log(`  ${entry.name} (${entry.repo}@${entry.branch})`);

		// Fetch database repo
		const repoPath = fetchRepo(entry.repo, entry.branch);
		const manifest: PcdManifest = JSON.parse(readFileSync(join(repoPath, 'pcd.json'), 'utf-8'));

		// Resolve and fetch schema
		const { repo: schemaRepo, version: schemaVersion } = resolveSchemaVersion(manifest);
		const schemaPath = fetchSchema(schemaRepo, schemaVersion);

		// Compile: schema ops then base ops
		const schemaOpsDir = getOpsDir(schemaPath);
		const baseOpsDir = getOpsDir(repoPath);
		const db = compileDatabase(schemaOpsDir, baseOpsDir);

		// Extract and write
		const compiled = extractDatabase(db, entry, manifest, schemaVersion);
		const outputPath = join(outputDir, `${entry.id}.json`);
		writeFileSync(outputPath, JSON.stringify(compiled, null, 2));

		db.close();

		// Collect nav data
		const mediaEntries = (arrType: 'radarr' | 'sonarr') => ({
			naming: compiled.media[arrType].naming.map((n) => ({ name: n.name, arrType })),
			settings: compiled.media[arrType].settings.map((s) => ({ name: s.name, arrType })),
			qualityDefs: compiled.media[arrType].qualityDefinitions.map((q) => ({
				name: q.name,
				arrType
			}))
		});
		const radarr = mediaEntries('radarr');
		const sonarr = mediaEntries('sonarr');

		navIndex[entry.id] = {
			customFormats: compiled.customFormats.map((cf) => cf.name),
			qualityProfiles: compiled.qualityProfiles.map((qp) => qp.name),
			regularExpressions: compiled.regularExpressions.map((re) => re.name),
			delayProfiles: compiled.delayProfiles.map((dp) => dp.name),
			naming: [...radarr.naming, ...sonarr.naming],
			mediaSettings: [...radarr.settings, ...sonarr.settings],
			qualityDefinitions: [...radarr.qualityDefs, ...sonarr.qualityDefs]
		};

		const elapsed = (performance.now() - start).toFixed(0);
		console.log(
			`    -> ${compiled.customFormats.length} CFs, ${compiled.qualityProfiles.length} QPs, ${compiled.regularExpressions.length} regexes (${elapsed}ms)`
		);
	}

	// Check for slug collisions
	const collisions = checkSlugCollisions(navIndex);
	if (collisions.length > 0) {
		console.error('\nSlug collisions detected (these entities produce identical URL slugs):');
		for (const c of collisions) {
			console.error(`  ${c.database}/${c.entityType}: ${c.names.join(', ')} -> "${c.slug}"`);
		}
		cleanupTempDirs();
		process.exit(1);
	}

	// Write nav index for layout sidebar
	writeFileSync(join(outputDir, 'index.json'), JSON.stringify(navIndex));

	cleanupTempDirs();
	console.log('\nDone.');
}

main();
