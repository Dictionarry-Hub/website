import type { RequestHandler } from './$types';

export const prerender = true;

// Per-term effective ratings (term -> route -> rating), computed by
// compile:elo. Tolerantly empty when ratings have not been compiled.
// See docs/backend/search.md.

const files = import.meta.glob<{ default: Record<string, Record<string, number>> }>(
	'/src/lib/data/elo/query-ratings.json',
	{ eager: true }
);
const queryRatings = Object.values(files)[0]?.default ?? {};

export const GET: RequestHandler = () => {
	return new Response(JSON.stringify(queryRatings), {
		headers: { 'Content-Type': 'application/json' }
	});
};
