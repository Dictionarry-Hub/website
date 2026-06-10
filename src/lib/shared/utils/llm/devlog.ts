import { SITE_URL } from './site.js';
import { join, isoDate, articleBody } from './md.js';

// Markdown serializers for dev log artifacts. The source .svx files are
// already markdown, so the body ships nearly verbatim via articleBody.
// See docs/backend/llm.md.

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

	return join([
		`# ${meta.title}`,
		meta.blurb ? `> ${meta.blurb}` : '',
		context,
		articleBody(source)
	]);
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
