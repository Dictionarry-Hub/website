import { SITE_URL } from './site.js';
import { join } from './md.js';

// Markdown serializers for dev log artifacts. The source .svx files are
// already markdown, so the body ships nearly verbatim: frontmatter and script
// blocks are stripped, embedded components stay intact (they often carry real
// content in props, e.g. CodeBlock code). See docs/backend/llm.md.

export interface DevLogMeta {
	title: string;
	blurb?: string;
	author?: string | string[];
	created?: string;
	tags?: string[];
}

export interface DevLogIndexEntry extends DevLogMeta {
	slug: string;
}

export function devLogToMarkdown(meta: DevLogMeta, source: string, slug: string): string {
	const authors = meta.author ? (Array.isArray(meta.author) ? meta.author : [meta.author]) : [];

	const context = [
		`A Dictionarry dev log${authors.length > 0 ? ` by ${authors.join(', ')}` : ''}` +
			`${meta.created ? `, published ${isoDate(meta.created)}` : ''}.`,
		meta.tags && meta.tags.length > 0 ? `Tags: ${meta.tags.join(', ')}.` : '',
		`Web version: ${SITE_URL}/dev-logs/${slug}`
	]
		.filter(Boolean)
		.join(' ');

	return join([`# ${meta.title}`, meta.blurb ? `> ${meta.blurb}` : '', context, body(source)]);
}

export function devLogIndexToMarkdown(logs: DevLogIndexEntry[]): string {
	const items = logs.map((log) => {
		const date = log.created ? ` (${isoDate(log.created)})` : '';
		const blurb = log.blurb ? `: ${log.blurb}` : '';
		return `- [${log.title}](${SITE_URL}/dev-logs/${log.slug}.md)${date}${blurb}`;
	});

	return join([
		'# Dictionarry Dev Logs',
		'> Development logs from the Dictionarry project, newest first. Each link points to the markdown version of a log.',
		`Web version: ${SITE_URL}/dev-logs`,
		items.join('\n')
	]);
}

/** YAML date parsing produces ISO timestamps; keep just the date part. */
function isoDate(created: string): string {
	return String(created).slice(0, 10);
}

function body(source: string): string {
	return source
		.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '')
		.replace(/<script[\s\S]*?<\/script>\r?\n?/g, '')
		.trim();
}
