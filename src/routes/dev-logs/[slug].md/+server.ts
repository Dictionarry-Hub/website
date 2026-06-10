import { error } from '@sveltejs/kit';
import type { EntryGenerator, RequestHandler } from './$types';
import { devLogToMarkdown, type DevLogMeta } from '$lib/shared/utils/llm/index.js';

export const prerender = true;

const modules = import.meta.glob<{ metadata: DevLogMeta }>('/src/routes/dev-logs/**/+page.svx', {
	eager: true
});

const sources = import.meta.glob<string>('/src/routes/dev-logs/**/+page.svx', {
	eager: true,
	query: '?raw',
	import: 'default'
});

// The slug is the route directory name, same derivation as the nav in
// +layout.server.ts.
function slugFromPath(path: string): string {
	return path.split('/').at(-2)!;
}

export const entries: EntryGenerator = () =>
	Object.keys(modules).map((path) => ({ slug: slugFromPath(path) }));

export const GET: RequestHandler = ({ params }) => {
	const path = Object.keys(modules).find((p) => slugFromPath(p) === params.slug);

	if (!path) error(404, 'Not found');

	const markdown = devLogToMarkdown(modules[path].metadata, sources[path], params.slug);

	return new Response(markdown, {
		headers: { 'Content-Type': 'text/markdown; charset=utf-8' }
	});
};
