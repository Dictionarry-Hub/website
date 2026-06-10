import type { SearchEntry } from './types.js';

// The Elo overlay: the entire join between computed ratings and the index.
// Ratings are a build input that is allowed to be absent (local, CI, and PR
// builds never run compile:elo), so the glob tolerates a missing file and
// everything ships at the builders' baseline. New pages miss the map and
// keep baseline; orphaned ratings are simply never looked up.

const ratingFiles = import.meta.glob<{ default: Record<string, number> }>(
	'/src/lib/data/elo/ratings.json',
	{ eager: true }
);
const ratings: Record<string, number> = Object.values(ratingFiles)[0]?.default ?? {};

export function applyRatings(entries: SearchEntry[]): SearchEntry[] {
	return entries.map((entry) => ({ ...entry, elo: ratings[entry.url] ?? entry.elo }));
}
