import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { foldEvents, type EloEvent } from './fold.js';

// compile:elo - the third compile pipeline. Pulls the click event log out of
// D1 via wrangler (no connection code, no secrets handling: wrangler owns
// auth for both --local and --remote), replays it through the Elo fold, and
// writes the two rating files the build overlays onto the search index.
// See docs/backend/search.md.
//
// Usage:
//   pnpm compile:elo              (local D1, worker/.wrangler state)
//   pnpm compile:elo -- --remote  (production D1, needs wrangler auth)

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '../..');
const outputDir = join(projectRoot, 'src/lib/data/elo');

const DATABASE = 'dictionarry-clicks';
const WRANGLER_CONFIG = 'worker/wrangler.jsonc';
const QUERY = 'SELECT query, clicked, shown, source FROM clicks ORDER BY ts';

interface ClickRow {
	query: string;
	clicked: string;
	shown: string;
	source: string;
}

function fetchRows(remote: boolean): ClickRow[] {
	const stdout = execFileSync(
		join(projectRoot, 'node_modules/.bin/wrangler'),
		[
			'd1',
			'execute',
			DATABASE,
			remote ? '--remote' : '--local',
			'-c',
			WRANGLER_CONFIG,
			'--command',
			QUERY,
			'--json'
		],
		{
			cwd: projectRoot,
			encoding: 'utf-8',
			maxBuffer: 256 * 1024 * 1024,
			env: { ...process.env, WRANGLER_SEND_METRICS: 'false' },
			stdio: ['ignore', 'pipe', 'inherit']
		}
	);

	const parsed = JSON.parse(stdout) as { results: ClickRow[] }[];
	return parsed.flatMap((batch) => batch.results);
}

function round(value: number): number {
	return Math.round(value * 10) / 10;
}

function main(): void {
	const remote = process.argv.includes('--remote');

	console.log(`Reading click events from ${remote ? 'remote' : 'local'} D1...`);
	const rows = fetchRows(remote);

	let malformed = 0;
	const events: EloEvent[] = [];
	for (const row of rows) {
		try {
			const shown = JSON.parse(row.shown) as string[];
			events.push({ query: row.query, clicked: row.clicked, shown, source: row.source });
		} catch {
			malformed += 1;
		}
	}

	const { global, perTerm } = foldEvents(events);

	const ratings = Object.fromEntries(
		Object.entries(global).map(([route, rating]) => [route, round(rating)])
	);
	const queryRatings = Object.fromEntries(
		Object.entries(perTerm).map(([term, table]) => [
			term,
			Object.fromEntries(Object.entries(table).map(([route, rating]) => [route, round(rating)]))
		])
	);

	mkdirSync(outputDir, { recursive: true });
	writeFileSync(join(outputDir, 'ratings.json'), JSON.stringify(ratings, null, 2));
	writeFileSync(join(outputDir, 'query-ratings.json'), JSON.stringify(queryRatings, null, 2));

	// The humble v1 of build-time anomaly detection: a summary a human can
	// eyeball when rating movements look wrong.
	console.log(`  -> ${rows.length} events read (${malformed} malformed, skipped)`);
	console.log(`  -> ${Object.keys(ratings).length} routes rated`);
	console.log(`  -> ${Object.keys(queryRatings).length} terms shipped`);
	console.log(`  -> written to ${outputDir}`);
	console.log('\nDone.');
}

main();
