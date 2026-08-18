import type { SearchEntry } from '$lib/shared/utils/search/types';
import { createIndex, type SearchIndex } from './search.js';

export const SEARCH_ELO_ENABLED = import.meta.env.PUBLIC_SEARCH_ELO_ENABLED === 'true';

// Lazy index loading: nothing is fetched until the palette first opens.
// Core entries are required; the per-database file and the per-term rating
// table are tolerated missing (same philosophy as the nav: absent build
// inputs degrade, they do not break). Loads are cached for the session; a
// failed load is evicted so the next open retries.

export interface LoadedSearch {
	index: SearchIndex;
	queryRatings: Record<string, Record<string, number>>;
}

const cache = new Map<string, Promise<LoadedSearch>>();
let ratingsCache: Promise<Record<string, Record<string, number>>> | null = null;

async function fetchJson<T>(path: string): Promise<T> {
	const response = await fetch(path);
	if (!response.ok) throw new Error(`${path}: ${response.status}`);
	return response.json();
}

function loadQueryRatings(): Promise<Record<string, Record<string, number>>> {
	ratingsCache ??= fetchJson<Record<string, Record<string, number>>>(
		'/search-index/query-ratings.json'
	).catch(() => ({}));
	return ratingsCache;
}

export function loadSearchIndex(database: string): Promise<LoadedSearch> {
	let cached = cache.get(database);
	if (!cached) {
		cached = Promise.all([
			fetchJson<SearchEntry[]>('/search-index/core.json'),
			fetchJson<SearchEntry[]>(`/search-index/${database}.json`).catch(
				() => [] as SearchEntry[]
			),
			SEARCH_ELO_ENABLED ? loadQueryRatings() : Promise.resolve({})
		]).then(([core, db, queryRatings]) => ({
			index: createIndex([...core, ...db]),
			queryRatings
		}));
		cached.catch(() => cache.delete(database));
		cache.set(database, cached);
	}
	return cached;
}
