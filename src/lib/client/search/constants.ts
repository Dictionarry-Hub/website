// Every tunable in the ranking algorithm. Tests assert orderings, never
// values, so these can be tuned freely. See docs/backend/search.md.

export const SEARCH = {
	/** Default result count; also the "shown" list in click events. */
	LIMIT: 10,

	// Field weights: where a token matches matters.
	WEIGHT_TITLE: 1,
	WEIGHT_KEYWORD: 0.65,
	WEIGHT_BLURB: 0.5,

	// Match tiers. Prefix and substring scale with how much of the field
	// token the query token covers; fuzzy scales down with edit distance.
	PREFIX_BASE: 0.55,
	PREFIX_SCALE: 0.4,
	SUBSTRING_BASE: 0.35,
	SUBSTRING_SCALE: 0.3,
	FUZZY_BASE: 0.5,

	/**
	 * Penalty floor per query token an entry fails to match, scaled by how
	 * strongly that token matches elsewhere in the corpus: missing a strong
	 * keyword costs this much, missing a weak blurb-only word costs little.
	 */
	UNMATCHED_PENALTY: 0.3,

	/** How much matching little of a long title costs (0 = ignore coverage). */
	COVERAGE_FACTOR: 0.15,

	/** Candidates below this fraction of the top text score are dropped. */
	RELATIVE_GATE: 0.5,

	// Flatness-adaptive Elo weight: decisive text rankings keep Elo near the
	// minimum, clustered ones slide toward the maximum. SPREAD_REF is the
	// top-two relative gap considered fully decisive.
	SPREAD_REF: 0.25,
	ELO_WEIGHT_MIN: 0.05,
	ELO_WEIGHT_MAX: 0.3,

	/** Flatness floor when the query contains qualifier language ("best"). */
	EXPLORATORY_FLATNESS: 0.8
} as const;
