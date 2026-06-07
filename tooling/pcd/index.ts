import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { fetchRepo, fetchSchema, resolveSchemaVersion, getOpsDir, cleanupTempDirs } from './fetch.js';
import { compileDatabase } from './build.js';
import { extractDatabase } from './extract.js';
import type { PcdConfig, PcdManifest } from './types.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '../..');
const outputDir = join(projectRoot, 'src/lib/data/pcd');

function main(): void {
	const config: PcdConfig = JSON.parse(readFileSync(join(__dirname, 'config.json'), 'utf-8'));

	mkdirSync(outputDir, { recursive: true });

	console.log(`Compiling ${config.databases.length} PCD databases...\n`);

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
		const compiled = extractDatabase(db, entry, manifest);
		const outputPath = join(outputDir, `${entry.id}.json`);
		writeFileSync(outputPath, JSON.stringify(compiled, null, 2));

		db.close();

		const elapsed = (performance.now() - start).toFixed(0);
		console.log(`    -> ${compiled.customFormats.length} CFs, ${compiled.qualityProfiles.length} QPs, ${compiled.regularExpressions.length} regexes (${elapsed}ms)`);
	}

	cleanupTempDirs();
	console.log('\nDone.');
}

main();
