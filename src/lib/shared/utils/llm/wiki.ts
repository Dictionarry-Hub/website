import { SITE_URL } from './site.js';
import { join, isoDate, articleBody } from './md.js';

// Markdown serializers for wiki article artifacts. Same shape as the dev log
// serializers: the source .svx files are already markdown, so the body ships
// nearly verbatim via articleBody. See docs/backend/llm.md.

export interface WikiMeta {
	title: string;
	blurb?: string;
	author?: string | string[];
	created?: string;
	tags?: string[];
}

export interface WikiIndexEntry extends WikiMeta {
	slug: string;
}

export function wikiToMarkdown(meta: WikiMeta, source: string, slug: string): string {
	const authors = meta.author ? (Array.isArray(meta.author) ? meta.author : [meta.author]) : [];

	const context = [
		`A Dictionarry wiki article${authors.length > 0 ? ` by ${authors.join(', ')}` : ''}` +
			`${meta.created ? `, published ${isoDate(meta.created)}` : ''}.`,
		meta.tags && meta.tags.length > 0 ? `Tags: ${meta.tags.join(', ')}.` : '',
		`Web version: ${SITE_URL}/wiki/${slug}`
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

export function wikiIndexToMarkdown(articles: WikiIndexEntry[]): string {
	const items = articles.map((article) => {
		const date = article.created ? ` (${isoDate(article.created)})` : '';
		const blurb = article.blurb ? `: ${article.blurb}` : '';
		return `- [${article.title}](${SITE_URL}/wiki/${article.slug}.md)${date}${blurb}`;
	});

	return join([
		'# Dictionarry Wiki',
		'> Wiki articles from the Dictionarry project, newest first. Each link points to the markdown version of an article.',
		`Web version: ${SITE_URL}/wiki`,
		items.join('\n')
	]);
}
