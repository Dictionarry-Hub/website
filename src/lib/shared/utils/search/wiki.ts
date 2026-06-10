import type { WikiIndexEntry } from '../llm/wiki.js';
import { BASELINE_ELO, type SearchEntry } from './types.js';

export function buildWikiEntry(article: WikiIndexEntry): SearchEntry {
	return {
		title: article.title,
		url: `/wiki/${article.slug}`,
		type: 'wiki',
		blurb: article.blurb ?? '',
		keywords: [...(article.tags ?? []), 'wiki article'],
		elo: BASELINE_ELO
	};
}
