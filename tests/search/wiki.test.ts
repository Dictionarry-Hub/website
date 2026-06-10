import { describe, expect, it } from 'vitest';
import { buildWikiEntry } from '$lib/shared/utils/search/wiki';

describe('buildWikiEntry', () => {
	it('passes the frontmatter blurb through and routes tags to keywords', () => {
		const entry = buildWikiEntry({
			title: 'Anatomy of a Profile',
			slug: 'anatomy-of-a-profile',
			blurb: 'How profiles, custom formats, and regex fit together.',
			author: 'https://github.com/santiagosayshey',
			created: '2026-01-13',
			tags: ['profiles', 'radarr', 'sonarr']
		});

		expect(entry).toEqual({
			title: 'Anatomy of a Profile',
			url: '/wiki/anatomy-of-a-profile',
			type: 'wiki',
			blurb: 'How profiles, custom formats, and regex fit together.',
			keywords: ['profiles', 'radarr', 'sonarr', 'wiki article'],
			elo: 1500
		});
	});

	it('tolerates missing blurb and tags', () => {
		const entry = buildWikiEntry({ title: 'Golden Popcorn Performance Index', slug: 'gppi' });

		expect(entry.blurb).toBe('');
		expect(entry.keywords).toEqual(['wiki article']);
	});
});
