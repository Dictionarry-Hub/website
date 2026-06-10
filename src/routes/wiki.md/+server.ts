import type { RequestHandler } from './$types';
import { wikiIndexToMarkdown, type WikiMeta } from '$lib/shared/utils/llm/index.js';

export const prerender = true;

const modules = import.meta.glob<{ metadata: WikiMeta }>('/src/routes/wiki/**/+page.svx', {
	eager: true
});

export const GET: RequestHandler = () => {
	const articles = Object.entries(modules)
		.map(([path, module]) => ({
			...module.metadata,
			slug: path.split('/').at(-2)!
		}))
		.sort((a, b) => new Date(b.created ?? 0).getTime() - new Date(a.created ?? 0).getTime());

	return new Response(wikiIndexToMarkdown(articles), {
		headers: { 'Content-Type': 'text/markdown; charset=utf-8' }
	});
};
