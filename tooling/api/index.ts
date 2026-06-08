import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '../..');
const outputDir = join(projectRoot, 'src/lib/data/api');

interface Config {
	repo: string;
	branch: string;
	file: string;
}

async function main(): Promise<void> {
	const config: Config = JSON.parse(readFileSync(join(__dirname, 'config.json'), 'utf-8'));

	const url = `https://raw.githubusercontent.com/${config.repo}/${config.branch}/${config.file}`;

	console.log(`Fetching OpenAPI spec from ${config.repo}@${config.branch}...`);

	const response = await fetch(url);
	if (!response.ok) {
		console.error(`Failed to fetch: ${response.status} ${response.statusText}`);
		process.exit(1);
	}

	const spec = (await response.json()) as Record<string, unknown>;

	// Basic validation
	if (!spec.openapi || !spec.paths) {
		console.error('Invalid OpenAPI spec: missing "openapi" or "paths" field');
		process.exit(1);
	}

	mkdirSync(outputDir, { recursive: true });

	const outputPath = join(outputDir, 'v1.json');
	writeFileSync(outputPath, JSON.stringify(spec, null, 2));

	const pathCount = Object.keys(spec.paths as Record<string, unknown>).length;
	console.log(`  -> ${pathCount} paths written to ${outputPath}`);
	console.log('\nDone.');
}

main();
