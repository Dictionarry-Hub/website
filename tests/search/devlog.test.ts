import { describe, expect, it } from 'vitest';
import { buildDevLogEntry } from '$lib/shared/utils/search/devlog';

describe('buildDevLogEntry', () => {
	it('passes the frontmatter blurb through and routes tags to keywords', () => {
		const entry = buildDevLogEntry({
			title: '📐 Show Your Work',
			slug: 'show-your-work',
			blurb: 'Upgrades, operations, testing, and treating preference like math.',
			author: 'https://github.com/santiagosayshey',
			created: '2026-01-13',
			tags: ['profilarr v2', 'architecture']
		});

		expect(entry).toEqual({
			title: '📐 Show Your Work',
			url: '/dev-logs/show-your-work',
			type: 'dev-log',
			blurb: 'Upgrades, operations, testing, and treating preference like math.',
			keywords: ['profilarr v2', 'architecture', 'dev log'],
			elo: 1500
		});
	});

	it('tolerates missing blurb and tags', () => {
		const entry = buildDevLogEntry({ title: 'Donuts', slug: 'donuts' });

		expect(entry.blurb).toBe('');
		expect(entry.keywords).toEqual(['dev log']);
	});
});
