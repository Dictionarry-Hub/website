import type { RequestHandler } from './$types';
import { loadApiSpec } from '$lib/shared/utils/openapi/index.js';
import { specToMarkdown } from '$lib/shared/utils/llm/index.js';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const spec = await loadApiSpec();

	return new Response(specToMarkdown(spec), {
		headers: { 'Content-Type': 'text/markdown; charset=utf-8' }
	});
};
