import type { SearchEntry } from '$lib/shared/utils/search/types';
import { createIndex, type SearchIndex } from './search.js';

// Lazy index loading: nothing is fetched until the palette first opens.
// Core entries are required; the per-database file is tolerated missing
// (same philosophy as the nav: no PCD data, no PCD entries). Indexes are
// cached per database for the session; a failed load is evicted so the
// next open retries.

const cache = new Map<string, Promise<SearchIndex>>();

async function fetchEntries(path: string): Promise<SearchEntry[]> {
	const response = await fetch(path);
	if (!response.ok) throw new Error(`${path}: ${response.status}`);
	return response.json();
}

export function loadSearchIndex(database: string): Promise<SearchIndex> {
	let cached = cache.get(database);
	if (!cached) {
		cached = Promise.all([
			fetchEntries('/search-index/core.json'),
			fetchEntries(`/search-index/${database}.json`).catch(() => [] as SearchEntry[])
		]).then(([core, db]) => createIndex([...core, ...db]));
		cached.catch(() => cache.delete(database));
		cache.set(database, cached);
	}
	return cached;
}
