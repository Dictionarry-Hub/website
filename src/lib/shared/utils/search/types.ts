// Search index entry shape. See docs/backend/search.md.

export const BASELINE_ELO = 1500;

export type SearchEntryType =
	| 'doc'
	| 'dev-log'
	| 'wiki'
	| 'api-endpoint'
	| 'quality-profile'
	| 'custom-format'
	| 'regular-expression'
	| 'delay-profile'
	| 'naming'
	| 'media-settings'
	| 'quality-definitions';

export interface SearchEntry {
	/** Display name. */
	title: string;
	/** Route; the identity key joining entries, ratings, and click events. */
	url: string;
	type: SearchEntryType;
	/** Short description; displayed in results and searchable. */
	blurb: string;
	/** Searchable but never displayed (tags, arr types, quality names). */
	keywords: string[];
	/** Rating baked in at build time. */
	elo: number;
}
