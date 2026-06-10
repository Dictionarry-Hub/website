import type { RequestHandler } from './$types';
import type { DevLogMeta, WikiMeta } from '$lib/shared/utils/llm/index.js';
import { buildApiEndpointEntries } from '$lib/shared/utils/search/api.js';
import { buildDevLogEntry } from '$lib/shared/utils/search/devlog.js';
import { buildWikiEntry } from '$lib/shared/utils/search/wiki.js';
import { applyRatings } from '$lib/shared/utils/search/ratings.js';
import { loadApiSpec } from '$lib/shared/utils/openapi/index.js';

export const prerender = true;

// Database-independent search entries: dev logs, wiki articles, and API
// endpoints today, docs when that layer exists. See docs/backend/search.md.

const devLogModules = import.meta.glob<{ metadata: DevLogMeta }>(
	'/src/routes/dev-logs/**/+page.svx',
	{ eager: true }
);

const wikiModules = import.meta.glob<{ metadata: WikiMeta }>('/src/routes/wiki/**/+page.svx', {
	eager: true
});

export const GET: RequestHandler = async () => {
	const devLogs = Object.entries(devLogModules).map(([path, module]) =>
		buildDevLogEntry({ ...module.metadata, slug: path.split('/').at(-2)! })
	);

	const wiki = Object.entries(wikiModules).map(([path, module]) =>
		buildWikiEntry({ ...module.metadata, slug: path.split('/').at(-2)! })
	);

	const spec = await loadApiSpec();
	const entries = applyRatings([...devLogs, ...wiki, ...buildApiEndpointEntries(spec)]);

	return new Response(JSON.stringify(entries), {
		headers: { 'Content-Type': 'application/json' }
	});
};
