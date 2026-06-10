import { BASELINE_ELO } from '../../src/lib/shared/utils/search/types.js';
import { termKey } from '../../src/lib/client/search/normalize.js';

// The Elo fold: replays the click event log into ratings, from scratch,
// every build (docs/backend/search.md). Two layers from the same events:
// a global per-route leaderboard, and per-term tables shrunk toward global
// by click volume. Pure function; fetching events and writing files is the
// compile:elo script's job.
//
// A click is a tournament round: the clicked route beats every other shown
// route pairwise. The K budget is split across opponents so one click is
// one click's worth of movement regardless of list length, and deltas are
// computed from pre-event ratings so shown order cannot matter.

export interface EloEvent {
	/** Raw query text; normalization happens here, at fold time. */
	query: string;
	clicked: string;
	shown: string[];
	source: string;
}

export interface EloConfig {
	/** Total rating movement budget per click event. */
	kFactor: number;
	baseline: number;
	/** Shrinkage constant: clicks at which a term earns 50% trust. */
	confidenceC: number;
	/** Minimum clicks for a term table to ship (file-size cutoff). */
	termCutoff: number;
}

export const DEFAULT_ELO_CONFIG: EloConfig = {
	kFactor: 32,
	baseline: BASELINE_ELO,
	confidenceC: 10,
	termCutoff: 3
};

export interface EloRatings {
	global: Record<string, number>;
	perTerm: Record<string, Record<string, number>>;
}

function rating(map: Map<string, number>, route: string, baseline: number): number {
	return map.get(route) ?? baseline;
}

function applyEvent(
	map: Map<string, number>,
	event: EloEvent,
	{ kFactor, baseline }: EloConfig
): void {
	const losers = event.shown.filter((route) => route !== event.clicked);
	if (losers.length === 0) return;

	const kPerOpponent = kFactor / losers.length;
	const winnerBefore = rating(map, event.clicked, baseline);

	let winnerDelta = 0;
	const loserDeltas: [string, number][] = [];
	for (const loser of losers) {
		const loserBefore = rating(map, loser, baseline);
		const expectedWin = 1 / (1 + 10 ** ((loserBefore - winnerBefore) / 400));
		const transfer = kPerOpponent * (1 - expectedWin);
		winnerDelta += transfer;
		loserDeltas.push([loser, -transfer]);
	}

	map.set(event.clicked, winnerBefore + winnerDelta);
	for (const [route, delta] of loserDeltas) {
		map.set(route, rating(map, route, baseline) + delta);
	}
}

export function foldEvents(events: EloEvent[], config: Partial<EloConfig> = {}): EloRatings {
	const cfg: EloConfig = { ...DEFAULT_ELO_CONFIG, ...config };

	const global = new Map<string, number>();
	const terms = new Map<string, { ratings: Map<string, number>; clicks: number }>();

	for (const event of events) {
		if (event.source !== 'human') continue;
		const key = termKey(event.query);
		if (!key) continue; // popular-view clicks fold nothing in v1
		if (!event.shown.includes(event.clicked)) continue;

		applyEvent(global, event, cfg);

		let bucket = terms.get(key);
		if (!bucket) {
			bucket = { ratings: new Map(), clicks: 0 };
			terms.set(key, bucket);
		}
		bucket.clicks += 1;
		applyEvent(bucket.ratings, event, cfg);
	}

	const perTerm: EloRatings['perTerm'] = {};
	for (const [key, bucket] of terms) {
		if (bucket.clicks < cfg.termCutoff) continue;
		const confidence = bucket.clicks / (bucket.clicks + cfg.confidenceC);
		const table: Record<string, number> = {};
		for (const [route, termRating] of bucket.ratings) {
			const globalRating = global.get(route) ?? cfg.baseline;
			table[route] = confidence * termRating + (1 - confidence) * globalRating;
		}
		perTerm[key] = table;
	}

	return { global: Object.fromEntries(global), perTerm };
}
