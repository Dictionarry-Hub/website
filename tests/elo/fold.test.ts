import { describe, expect, it } from 'vitest';
import { foldEvents, type EloEvent } from '../../tooling/elo/fold.js';

function click(overrides: Partial<EloEvent> = {}): EloEvent {
	return {
		query: '1080p profile',
		clicked: '/a',
		shown: ['/a', '/b', '/c'],
		source: 'human',
		...overrides
	};
}

describe('global ratings', () => {
	it('moves the clicked route up and every shown-but-ignored route down', () => {
		const { global } = foldEvents([click()]);

		expect(global['/a']).toBeGreaterThan(1500);
		expect(global['/b']).toBeLessThan(1500);
		expect(global['/c']).toBeLessThan(1500);
	});

	it('never mentions routes that appear in no event', () => {
		const { global } = foldEvents([click()]);

		expect(global['/elsewhere']).toBeUndefined();
	});

	it('conserves rating: the winner gains what the losers lose', () => {
		const { global } = foldEvents([click()]);

		const totalDelta = global['/a'] - 1500 + (global['/b'] - 1500) + (global['/c'] - 1500);
		expect(totalDelta).toBeCloseTo(0, 8);
	});

	it('has diminishing returns: beating the same opponents again moves less', () => {
		const one = foldEvents([click()]);
		const two = foldEvents([click(), click()]);

		const firstGain = one.global['/a'] - 1500;
		const secondGain = two.global['/a'] - one.global['/a'];
		expect(secondGain).toBeLessThan(firstGain);
		expect(secondGain).toBeGreaterThan(0);
	});

	it('is deterministic for the same event sequence', () => {
		const events = [click(), click({ clicked: '/b' }), click({ clicked: '/c' })];

		expect(foldEvents(events)).toEqual(foldEvents(events));
	});

	it('updates simultaneously within an event: shown order is irrelevant', () => {
		const a = foldEvents([click({ shown: ['/a', '/b', '/c'] })]);
		const b = foldEvents([click({ shown: ['/c', '/b', '/a'] })]);

		expect(a.global).toEqual(b.global);
	});

	it('produces no movement when the clicked route was the only one shown', () => {
		const { global } = foldEvents([click({ shown: ['/a'] })]);

		expect(global['/a'] ?? 1500).toBe(1500);
	});
});

describe('event exclusions', () => {
	it('skips synthetic events', () => {
		const { global } = foldEvents([click({ source: 'synthetic' })]);

		expect(global).toEqual({});
	});

	it('skips popular-view clicks (empty query)', () => {
		const { global } = foldEvents([click({ query: '' }), click({ query: '   ' })]);

		expect(global).toEqual({});
	});

	it('skips malformed events where the click is not among the shown', () => {
		const { global } = foldEvents([click({ clicked: '/not-shown' })]);

		expect(global).toEqual({});
	});
});

describe('per-term ratings', () => {
	it('ships a term once it reaches the click cutoff, not before', () => {
		const below = foldEvents([click(), click()], { termCutoff: 3 });
		const at = foldEvents([click(), click(), click()], { termCutoff: 3 });

		expect(below.perTerm['1080p profile']).toBeUndefined();
		expect(at.perTerm['1080p profile']).toBeDefined();
	});

	it('merges word-order and casing variants into one term', () => {
		const { perTerm } = foldEvents(
			[
				click({ query: '1080p profile' }),
				click({ query: 'Profile 1080p' }),
				click({ query: '  profile   1080P ' })
			],
			{ termCutoff: 3 }
		);

		expect(Object.keys(perTerm)).toEqual(['1080p profile']);
	});

	it('shrinks term ratings toward global: term data lifts its winner above its global rating', () => {
		// Globally, /a dominates via a different term; on "niche term", /b wins.
		const globalEvents = Array.from({ length: 20 }, () =>
			click({ query: 'common', clicked: '/a', shown: ['/a', '/b'] })
		);
		const nicheEvents = Array.from({ length: 3 }, () =>
			click({ query: 'niche term', clicked: '/b', shown: ['/a', '/b'] })
		);

		const { global, perTerm } = foldEvents([...globalEvents, ...nicheEvents], {
			termCutoff: 3
		});
		const table = perTerm['niche term'];

		expect(table['/b']).toBeGreaterThan(global['/b']);
		expect(table['/a']).toBeLessThan(global['/a']);
	});

	it('trusts the term less when the confidence constant is higher', () => {
		const events = [
			...Array.from({ length: 20 }, () =>
				click({ query: 'common', clicked: '/a', shown: ['/a', '/b'] })
			),
			...Array.from({ length: 3 }, () =>
				click({ query: 'niche term', clicked: '/b', shown: ['/a', '/b'] })
			)
		];

		const trusting = foldEvents(events, { termCutoff: 3, confidenceC: 2 });
		const skeptical = foldEvents(events, { termCutoff: 3, confidenceC: 50 });

		// The skeptical config keeps the term's /b rating closer to its global rating.
		const trustingLift = trusting.perTerm['niche term']['/b'] - trusting.global['/b'];
		const skepticalLift = skeptical.perTerm['niche term']['/b'] - skeptical.global['/b'];
		expect(skepticalLift).toBeLessThan(trustingLift);
		expect(skepticalLift).toBeGreaterThan(0);
	});
});
