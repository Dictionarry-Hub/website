// Display formatting for PCD entity values, shared by the entity pages and
// the llm serializers so the HTML page and its markdown artifact cannot
// drift apart.

export const NAMING_FORMAT_LABELS: Record<string, string> = {
	movieFormat: 'Movie',
	movieFolderFormat: 'Movie Folder',
	standardEpisodeFormat: 'Standard Episode',
	dailyEpisodeFormat: 'Daily Episode',
	animeEpisodeFormat: 'Anime Episode',
	seriesFolderFormat: 'Series Folder',
	seasonFolderFormat: 'Season Folder'
};

export const COLON_REPLACEMENT_LABELS: Record<string, string> = {
	delete: 'Delete',
	dash: 'Replace with Dash',
	spaceDash: 'Replace with Space Dash',
	spaceDashSpace: 'Replace with Space Dash Space',
	smart: 'Smart Replace',
	custom: 'Custom'
};

export const MULTI_EPISODE_LABELS: Record<string, string> = {
	extend: 'Extend',
	duplicate: 'Duplicate',
	repeat: 'Repeat',
	scene: 'Scene',
	range: 'Range',
	prefixedRange: 'Prefixed Range'
};

/** Title-case an underscore protocol value: only_usenet -> Only Usenet. */
export function formatProtocol(protocol: string): string {
	return protocol
		.split('_')
		.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
		.join(' ');
}

/** Human delay from minutes: null -> N/A, 0 -> No delay, 150 -> 2h 30m. */
export function formatDelay(minutes: number | null): string {
	if (minutes === null) return 'N/A';
	if (minutes === 0) return 'No delay';
	if (minutes < 60) return `${minutes}m`;
	const h = Math.floor(minutes / 60);
	const m = minutes % 60;
	return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

/** Quality definition tier sizes are stored as megabytes per minute of runtime. */
export type TierSizeUnit = 'mb-min' | 'gb-hr';

export const TIER_SIZE_UNIT_LABELS: Record<TierSizeUnit, string> = {
	'mb-min': 'MB/min',
	'gb-hr': 'GB/hr'
};

/** GB/hr uses binary gigabytes (x60 / 1024), matching how the arr UIs display sizes. */
export function formatTierSize(mbPerMin: number, unit: TierSizeUnit): string {
	if (unit === 'gb-hr') {
		return String(Math.round(((mbPerMin * 60) / 1024) * 10) / 10);
	}
	return String(mbPerMin);
}

// The arr max-size sliders cap out at these values; a tier stored at or
// above its cap means no limit, as does 0.
const TIER_MAX_SIZE_CAPS: Record<string, number> = {
	radarr: 2000,
	sonarr: 1000
};

export function formatTierMaxSize(mbPerMin: number, unit: TierSizeUnit, arrType: string): string {
	const cap = TIER_MAX_SIZE_CAPS[arrType];
	if (mbPerMin === 0 || (cap !== undefined && mbPerMin >= cap)) {
		return 'Unlimited';
	}
	return formatTierSize(mbPerMin, unit);
}

export function formatPropersRepacks(value: string): string {
	switch (value) {
		case 'doNotPrefer':
			return 'Do Not Prefer';
		case 'preferAndUpgrade':
			return 'Prefer and Upgrade';
		case 'prefer':
			return 'Prefer';
		default:
			return value;
	}
}
