import { error } from '@sveltejs/kit';
import type { EntryGenerator, RequestHandler } from './$types';
import { loadApiSpec } from '$lib/shared/utils/openapi/index.js';
import { tagToMarkdown } from '$lib/shared/utils/llm/index.js';

export const prerender = true;

export const entries: EntryGenerator = async () => {
	const spec = await loadApiSpec();

	return spec.tags.map((tag) => ({ tag: tag.slug }));
};

export const GET: RequestHandler = async ({ params }) => {
	const spec = await loadApiSpec();
	const tag = spec.tags.find((t) => t.slug === params.tag);

	if (!tag) error(404, 'Not found');

	return new Response(tagToMarkdown(spec, tag), {
		headers: { 'Content-Type': 'text/markdown; charset=utf-8' }
	});
};
