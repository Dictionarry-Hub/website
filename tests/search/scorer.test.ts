import { describe, expect, it } from 'vitest';
import { createIndex, popular, search, type SearchResult } from '$lib/client/search';
import { damerauLevenshtein } from '$lib/client/search/distance';
import { termKey, tokenize } from '$lib/client/search/normalize';
import type { SearchEntry } from '$lib/shared/utils/search/types';

function entry(overrides: Partial<SearchEntry> = {}): SearchEntry {
	return {
		title: 'Some Page',
		url: `/some-page`,
		type: 'doc',
		blurb: '',
		keywords: [],
		elo: 1500,
		...overrides
	};
}

function titles(results: SearchResult[]): string[] {
	return results.map((r) => r.entry.title);
}

function run(query: string, entries: SearchEntry[], options = {}): SearchResult[] {
	return search(createIndex(entries), query, options);
}

describe('tokenize', () => {
	it('lowercases, strips diacritics, and splits on punctuation and whitespace', () => {
		expect(tokenize('Café au  Lait!')).toEqual(['cafe', 'au', 'lait']);
		expect(tokenize('WEB-DL 1080p')).toEqual(['web', 'dl', '1080p']);
		expect(tokenize('  ')).toEqual([]);
	});
});

describe('termKey', () => {
	it('normalizes and token-sorts so word order does not matter', () => {
		expect(termKey('Profile  1080p')).toBe('1080p profile');
		expect(termKey('1080p profile')).toBe('1080p profile');
	});
});

describe('damerauLevenshtein', () => {
	it('computes edit distance with transpositions as one edit', () => {
		expect(damerauLevenshtein('the', 'the')).toBe(0);
		expect(damerauLevenshtein('teh', 'the')).toBe(1);
		expect(damerauLevenshtein('qualtiy', 'quality')).toBe(1);
		expect(damerauLevenshtein('kitten', 'sitting')).toBe(3);
		expect(damerauLevenshtein('abc', '')).toBe(3);
	});
});

describe('text matching', () => {
	it('ranks fuller title coverage first', () => {
		// All three contain "naming"; the page that IS "Naming" wins over
		// pages where it is one word among several or a substring.
		const results = run('naming', [
			entry({ title: 'Naming', url: '/a' }),
			entry({ title: 'Advanced Naming Conventions', url: '/b' }),
			entry({ title: 'Renaming Files', url: '/c' })
		]);

		expect(titles(results)[0]).toBe('Naming');
	});

	it('matches prefixes while typing', () => {
		const results = run('qual', [
			entry({ title: 'Quality Profile', url: '/a' }),
			entry({ title: 'Donuts', url: '/b' })
		]);

		expect(titles(results)).toEqual(['Quality Profile']);
	});

	it('survives a transposition typo', () => {
		const results = run('qualtiy', [
			entry({ title: 'Quality Profile', url: '/a' }),
			entry({ title: 'Donuts', url: '/b' })
		]);

		expect(titles(results)).toEqual(['Quality Profile']);
	});

	it('does not match beyond edit distance 2', () => {
		const results = run('quxxxty', [entry({ title: 'Quality Profile', url: '/a' })]);

		expect(results).toEqual([]);
	});

	it('matches across hyphenation', () => {
		const results = run('web dl', [
			entry({ title: 'WEB-DL Tier 1', url: '/a' }),
			entry({ title: 'Donuts', url: '/b' })
		]);

		expect(titles(results)).toEqual(['WEB-DL Tier 1']);
	});
});

describe('field weighting', () => {
	it('ranks a title match above a blurb match', () => {
		const results = run('upgrade', [
			entry({ title: 'Encode Profile', blurb: 'Handles upgrade behavior.', url: '/a' }),
			entry({ title: 'Upgrade Strategies', blurb: 'A guide.', url: '/b' })
		]);

		expect(titles(results)[0]).toBe('Upgrade Strategies');
	});

	it('finds entries matched only by keywords', () => {
		const results = run('sonarr', [
			entry({ title: 'Episode Naming', keywords: ['sonarr'], url: '/a' }),
			entry({ title: 'Donuts', url: '/b' })
		]);

		expect(titles(results)).toEqual(['Episode Naming']);
	});

	it('ranks a title match above a keyword match', () => {
		const results = run('sonarr', [
			entry({ title: 'Episode Naming', keywords: ['sonarr'], url: '/a' }),
			entry({ title: 'Sonarr Setup', url: '/b' })
		]);

		expect(titles(results)[0]).toBe('Sonarr Setup');
	});
});

describe('multi-word queries', () => {
	it('excludes entries missing a discriminating token', () => {
		// "sonarr" matches other entries in the corpus, so an entry without it
		// is penalized below the gate, not carried along by "naming" alone.
		const results = run('sonarr naming', [
			entry({ title: 'Episode Naming', keywords: ['sonarr'], url: '/a' }),
			entry({ title: 'Movie Naming', keywords: ['radarr'], url: '/b' })
		]);

		expect(titles(results)).toEqual(['Episode Naming']);
	});

	it('drops corpus-unmatched tokens instead of penalizing', () => {
		// "best" matches nothing in the corpus: qualifier language, not a
		// failed navigation. Results match the same query without it.
		const entries = [
			entry({ title: '1080p Profile Alpha', url: '/a' }),
			entry({ title: '1080p Profile Beta', url: '/b' }),
			entry({ title: 'Donuts', url: '/c' })
		];

		const withQualifier = run('best 1080p profile', entries);
		const without = run('1080p profile', entries);

		expect(titles(withQualifier)).toEqual(titles(without));
		expect(titles(withQualifier)).toContain('1080p Profile Alpha');
	});

	it('returns empty when no token matches anything', () => {
		const results = run('xyzzy plugh', [entry({ title: 'Quality Profile', url: '/a' })]);

		expect(results).toEqual([]);
	});
});

describe('gate', () => {
	it('excludes weakly related entries when a strong match exists', () => {
		const results = run('quality profile', [
			entry({ title: 'Quality Profile', url: '/a' }),
			entry({ title: 'Media Settings', blurb: 'Affects quality.', url: '/b' })
		]);

		expect(titles(results)).toEqual(['Quality Profile']);
	});

	it('returns empty for an empty or whitespace query', () => {
		const entries = [entry({ title: 'Quality Profile', url: '/a' })];

		expect(run('', entries)).toEqual([]);
		expect(run('   ', entries)).toEqual([]);
	});
});

describe('elo blend', () => {
	it('breaks ties between equal text matches by rating', () => {
		const results = run('hd profile', [
			entry({ title: 'HD Profile Alpha', url: '/a', elo: 1500 }),
			entry({ title: 'HD Profile Beta', url: '/b', elo: 1700 })
		]);

		expect(titles(results)[0]).toBe('HD Profile Beta');
	});

	it('does not let a high rating overturn a clearly better text match', () => {
		const results = run('quality profiles', [
			entry({ title: 'Quality Profiles Guide', url: '/a', elo: 1400 }),
			entry({ title: 'Quality Settings', url: '/b', elo: 2200 })
		]);

		expect(titles(results)[0]).toBe('Quality Profiles Guide');
	});

	it('never admits an irrelevant page regardless of rating', () => {
		const results = run('1080p balanced', [
			entry({ title: '1080p Balanced', url: '/a', elo: 1400 }),
			entry({ title: 'Donuts', blurb: 'A grilled cheese story.', url: '/b', elo: 3000 })
		]);

		expect(titles(results)).toEqual(['1080p Balanced']);
	});
});

describe('per-term ratings', () => {
	const entries = [
		entry({ title: '1080p Profile Alpha', url: '/a', elo: 1500 }),
		entry({ title: '1080p Profile Beta', url: '/b', elo: 1500 })
	];

	it('uses the term table when the normalized query matches', () => {
		const results = run('1080p profile', entries, {
			queryRatings: { '1080p profile': { '/b': 1800 } }
		});

		expect(titles(results)[0]).toBe('1080p Profile Beta');
	});

	it('normalizes term keys with token sort', () => {
		const results = run('profile 1080p', entries, {
			queryRatings: { '1080p profile': { '/b': 1800 } }
		});

		expect(titles(results)[0]).toBe('1080p Profile Beta');
	});

	it('falls back to global elo when the term is absent', () => {
		const results = run('1080p profile', entries, {
			queryRatings: { 'unrelated term': { '/b': 1800 } }
		});

		expect(titles(results)[0]).toBe('1080p Profile Alpha');
	});

	it('ignores global and per-term ratings when Elo is disabled', () => {
		const results = run(
			'1080p profile',
			[
				entry({ title: '1080p Profile Alpha', url: '/a', elo: 1200 }),
				entry({ title: '1080p Profile Beta', url: '/b', elo: 2200 })
			],
			{
				queryRatings: { '1080p profile': { '/b': 2400 } },
				useElo: false
			}
		);

		expect(titles(results)[0]).toBe('1080p Profile Alpha');
	});
});

describe('results', () => {
	it('respects the limit option and defaults to 15', () => {
		const entries = Array.from({ length: 20 }, (_, i) =>
			entry({ title: `Profile ${String.fromCharCode(65 + i)}`, url: `/p${i}` })
		);

		expect(run('profile', entries)).toHaveLength(15);
		expect(run('profile', entries, { limit: 3 })).toHaveLength(3);
	});

	it('breaks exact ties deterministically by title', () => {
		const results = run('profile', [
			entry({ title: 'Profile Beta', url: '/b' }),
			entry({ title: 'Profile Alpha', url: '/a' })
		]);

		expect(titles(results)).toEqual(['Profile Alpha', 'Profile Beta']);
	});
});

describe('popular', () => {
	it('returns the highest rated entries first, using global ratings only', () => {
		const results = popular(
			createIndex([
				entry({ title: 'Beta', url: '/b', elo: 1600 }),
				entry({ title: 'Alpha', url: '/a', elo: 1800 }),
				entry({ title: 'Gamma', url: '/c', elo: 1500 })
			])
		);

		expect(titles(results)).toEqual(['Alpha', 'Beta', 'Gamma']);
	});

	it('respects the limit and breaks rating ties by title', () => {
		const results = popular(
			createIndex([
				entry({ title: 'Beta', url: '/b', elo: 1500 }),
				entry({ title: 'Alpha', url: '/a', elo: 1500 }),
				entry({ title: 'Top', url: '/t', elo: 1900 })
			]),
			2
		);

		expect(titles(results)).toEqual(['Top', 'Alpha']);
	});
});
