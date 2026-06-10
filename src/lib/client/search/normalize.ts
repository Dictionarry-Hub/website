/**
 * Lowercase, strip diacritics, and split on anything non-alphanumeric.
 * Hyphenated terms ("WEB-DL") become separate tokens.
 */
export function tokenize(text: string): string[] {
	return text
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.split(/[^a-z0-9]+/)
		.filter(Boolean);
}

/**
 * Canonical key for per-term rating lookups: normalized tokens, sorted, so
 * "profile 1080p" and "1080p profile" share a key. Must match the
 * normalization compile:elo applies when building query-ratings.json.
 */
export function termKey(query: string): string {
	return tokenize(query).sort().join(' ');
}
