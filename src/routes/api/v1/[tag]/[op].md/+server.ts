import { error } from '@sveltejs/kit';
import type { EntryGenerator, RequestHandler } from './$types';
import { loadApiSpec } from '$lib/shared/utils/openapi/index.js';
import { endpointToMarkdown, operationSlug } from '$lib/shared/utils/llm/index.js';

export const prerender = true;

export const entries: EntryGenerator = async () => {
	const spec = await loadApiSpec();
	const seen = new Set<string>();

	return spec.tags.flatMap((tag) =>
		tag.endpoints.map((endpoint) => {
			const op = operationSlug(endpoint.operationId);
			const url = `${tag.slug}/${op}`;

			// operationIds are unique in the spec, but slugs are derived; a
			// collision would silently overwrite an artifact, so fail loudly.
			if (seen.has(url)) {
				throw new Error(`Duplicate operation slug: ${url}`);
			}
			seen.add(url);

			return { tag: tag.slug, op };
		})
	);
};

export const GET: RequestHandler = async ({ params }) => {
	const spec = await loadApiSpec();
	const tag = spec.tags.find((t) => t.slug === params.tag);
	const endpoint = tag?.endpoints.find((e) => operationSlug(e.operationId) === params.op);

	if (!tag || !endpoint) error(404, 'Not found');

	return new Response(endpointToMarkdown(spec, tag, endpoint), {
		headers: { 'Content-Type': 'text/markdown; charset=utf-8' }
	});
};
