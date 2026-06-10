import { error } from '@sveltejs/kit';
import type { EntryGenerator, RequestHandler } from './$types';
import { buildPcdEntries } from '$lib/shared/utils/search/pcd.js';
import type { CompiledDatabase } from '$lib/types/pcd';

export const prerender = true;

// Per-database search entries: every PCD entity in one database. The glob
// tolerates missing PCD data (gitignored, produced by compile:pcd) the same
// way the layout nav does: no data, no prerendered index files.

export const entries: EntryGenerator = () => {
	const files = import.meta.glob<{ default: Record<string, unknown> }>(
		'/src/lib/data/pcd/index.json',
		{ eager: true }
	);
	const navIndex = Object.values(files)[0]?.default ?? {};

	return Object.keys(navIndex).map((database) => ({ database }));
};

export const GET: RequestHandler = async ({ params }) => {
	let data: CompiledDatabase;
	try {
		const module = await import(`$lib/data/pcd/${params.database}.json`);
		data = module.default as CompiledDatabase;
	} catch {
		error(404, 'Database not found');
	}

	return new Response(JSON.stringify(buildPcdEntries(data)), {
		headers: { 'Content-Type': 'application/json' }
	});
};
