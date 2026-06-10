import type { RequestHandler } from './$types';
import type { DevLogMeta } from '$lib/shared/utils/llm/index.js';
import { buildApiEndpointEntries } from '$lib/shared/utils/search/api.js';
import { buildDevLogEntry } from '$lib/shared/utils/search/devlog.js';
import { loadApiSpec } from '$lib/shared/utils/openapi/index.js';

export const prerender = true;

// Database-independent search entries: dev logs and API endpoints today,
// docs and wiki articles when those layers exist. See docs/backend/search.md.

const devLogModules = import.meta.glob<{ metadata: DevLogMeta }>(
	'/src/routes/dev-logs/**/+page.svx',
	{ eager: true }
);

export const GET: RequestHandler = async () => {
	const devLogs = Object.entries(devLogModules).map(([path, module]) =>
		buildDevLogEntry({ ...module.metadata, slug: path.split('/').at(-2)! })
	);

	const spec = await loadApiSpec();
	const entries = [...devLogs, ...buildApiEndpointEntries(spec)];

	return new Response(JSON.stringify(entries), {
		headers: { 'Content-Type': 'application/json' }
	});
};
