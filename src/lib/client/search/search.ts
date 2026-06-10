import { BASELINE_ELO, type SearchEntry } from '$lib/shared/utils/search/types';
import { SEARCH } from './constants.js';
import { damerauLevenshtein } from './distance.js';
import { termKey, tokenize } from './normalize.js';

// The ranking pipeline: normalize, match per token in tiers, aggregate to an
// entry text score, gate, then blend Elo with a flatness-adaptive weight.
// Pure functions over plain data. See docs/backend/search.md.

interface PreparedEntry {
	entry: SearchEntry;
	title: string[];
	keywords: string[];
	blurb: string[];
}

export interface SearchIndex {
	items: PreparedEntry[];
}

export interface SearchResult {
	entry: SearchEntry;
	score: number;
}

export interface SearchOptions {
	/** Per-term effective ratings (term -> route -> rating). */
	queryRatings?: Record<string, Record<string, number>>;
	limit?: number;
}

/** Tokenize entries once at load so keystrokes never re-normalize the corpus. */
export function createIndex(entries: SearchEntry[]): SearchIndex {
	return {
		items: entries.map((entry) => ({
			entry,
			title: tokenize(entry.title),
			keywords: entry.keywords.flatMap((keyword) => tokenize(keyword)),
			blurb: tokenize(entry.blurb)
		}))
	};
}

/** Match one query token against one field token, in tiers of strictness. */
function tokenScore(query: string, field: string): number {
	if (query === field) return 1;
	if (field.startsWith(query)) {
		return SEARCH.PREFIX_BASE + SEARCH.PREFIX_SCALE * (query.length / field.length);
	}
	if (query.length >= 2 && field.includes(query)) {
		return SEARCH.SUBSTRING_BASE + SEARCH.SUBSTRING_SCALE * (query.length / field.length);
	}

	const maxDistance = query.length >= 5 ? 2 : query.length >= 3 ? 1 : 0;
	if (maxDistance === 0 || Math.abs(query.length - field.length) > maxDistance) return 0;
	const distance = damerauLevenshtein(query, field);
	if (distance > maxDistance) return 0;
	return SEARCH.FUZZY_BASE * (1 - distance / Math.max(query.length, field.length));
}

/** Best weighted match for a query token anywhere in the entry. */
function bestFieldScore(query: string, item: PreparedEntry): number {
	let best = 0;
	for (const token of item.title) {
		best = Math.max(best, tokenScore(query, token) * SEARCH.WEIGHT_TITLE);
	}
	for (const token of item.keywords) {
		best = Math.max(best, tokenScore(query, token) * SEARCH.WEIGHT_KEYWORD);
	}
	for (const token of item.blurb) {
		best = Math.max(best, tokenScore(query, token) * SEARCH.WEIGHT_BLURB);
	}
	return best;
}

/** Elo's expected-score formula: maps a rating to 0..1 around the baseline. */
function eloNorm(rating: number): number {
	return 1 / (1 + 10 ** ((BASELINE_ELO - rating) / 400));
}

export function search(
	index: SearchIndex,
	query: string,
	options: SearchOptions = {}
): SearchResult[] {
	const tokens = tokenize(query);
	if (tokens.length === 0) return [];

	// Stage 2: every query token against every entry.
	const matrix = index.items.map((item) => tokens.map((token) => bestFieldScore(token, item)));

	// A token matching nothing in the entire index is qualifier language
	// ("best"): dropped from scoring, counted as exploratory intent. A token
	// matching some entries discriminates, and entries missing it pay for it.
	const realIndices = tokens.map((_, i) => i).filter((i) => matrix.some((row) => row[i] > 0));
	if (realIndices.length === 0) return [];
	const exploratory = realIndices.length < tokens.length;

	// How strongly each token matches anywhere in the corpus. An entry missing
	// a token is penalized in proportion: missing a strong keyword ("sonarr")
	// costs the full penalty, missing a weak blurb-only word barely registers.
	const corpusStrength = tokens.map((_, i) => Math.max(...matrix.map((row) => row[i])));

	// Stage 3: aggregate to a text score per entry.
	const candidates: { item: PreparedEntry; text: number }[] = [];
	index.items.forEach((item, entryIndex) => {
		const row = matrix[entryIndex];
		let sum = 0;
		let penalty = 1;
		for (const i of realIndices) {
			sum += row[i];
			if (row[i] === 0) {
				penalty *= 1 - (1 - SEARCH.UNMATCHED_PENALTY) * corpusStrength[i];
			}
		}
		if (sum === 0) return; // absolute floor: no real token matched at all

		let text = (sum / realIndices.length) * penalty;

		const covered = item.title.filter((token) =>
			tokens.some((q) => tokenScore(q, token) > 0)
		).length;
		const coverage = item.title.length > 0 ? covered / item.title.length : 0;
		text *= 1 - SEARCH.COVERAGE_FACTOR * (1 - coverage);

		candidates.push({ item, text });
	});
	if (candidates.length === 0) return [];

	// Stage 4: gate relative to the top candidate, then blend Elo with a
	// weight that grows as the top text scores flatten.
	candidates.sort((a, b) => b.text - a.text);
	const top = candidates[0].text;
	const gated = candidates.filter((c) => c.text >= SEARCH.RELATIVE_GATE * top);

	const second = gated[1]?.text ?? top;
	const spread = (top - second) / top;
	let flatness = 1 - Math.min(spread / SEARCH.SPREAD_REF, 1);
	if (exploratory) flatness = Math.max(flatness, SEARCH.EXPLORATORY_FLATNESS);
	const eloWeight =
		SEARCH.ELO_WEIGHT_MIN + (SEARCH.ELO_WEIGHT_MAX - SEARCH.ELO_WEIGHT_MIN) * flatness;

	const table = options.queryRatings?.[termKey(query)];
	const results = gated.map(({ item, text }) => {
		const rating = table?.[item.entry.url] ?? item.entry.elo;
		return { entry: item.entry, score: (1 - eloWeight) * text + eloWeight * eloNorm(rating) };
	});

	results.sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title));
	return results.slice(0, options.limit ?? SEARCH.LIMIT);
}

/**
 * Top entries by global rating, for the palette's empty state. Per-term
 * tables never apply: there is no term.
 */
export function popular(index: SearchIndex, limit: number = SEARCH.LIMIT): SearchResult[] {
	return [...index.items]
		.sort((a, b) => b.entry.elo - a.entry.elo || a.entry.title.localeCompare(b.entry.title))
		.slice(0, limit)
		.map((item) => ({ entry: item.entry, score: eloNorm(item.entry.elo) }));
}
