// Display formatting for PCD entity values, shared by the entity pages and
// the llm serializers so the HTML page and its markdown artifact cannot
// drift apart.

import type { Condition, ConditionData } from '$lib/types/pcd';

const BYTES_PER_GB = 1024 ** 3;

const SOURCE_LABELS: Record<string, string> = {
	unknown: 'Unknown',
	television: 'Television',
	television_raw: 'Television Raw',
	web_dl: 'WEB-DL',
	webrip: 'WEBRip',
	dvd: 'DVD',
	bluray: 'Bluray',
	bluray_raw: 'Bluray Raw',
	cam: 'CAM',
	telesync: 'Telesync',
	telecine: 'Telecine',
	workprint: 'Workprint'
};

const RESOLUTION_LABELS: Record<string, string> = {
	'360p': '360p',
	'480p': '480p',
	'540p': '540p',
	'576p': '576p',
	'720p': '720p',
	'1080p': '1080p',
	'2160p': '2160p'
};

const QUALITY_MODIFIER_LABELS: Record<string, string> = {
	none: 'None',
	regional: 'Regional',
	screener: 'Screener',
	rawhd: 'RawHD',
	brdisk: 'BRDISK',
	remux: 'REMUX'
};

const RELEASE_TYPE_LABELS: Record<string, string> = {
	single_episode: 'Single Episode',
	multi_episode: 'Multi Episode',
	season_pack: 'Season Pack'
};

const INDEXER_FLAG_LABELS: Record<string, string> = {
	freeleech: 'Freeleech',
	halfleech: 'Halfleech',
	double_upload: 'Double Upload',
	internal: 'Internal',
	scene: 'Scene',
	freeleech_75: 'Freeleech 75%',
	freeleech_25: 'Freeleech 25%',
	nuked: 'Nuked',
	ptp_golden: 'PTP Golden',
	ptp_approved: 'PTP Approved'
};

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

export function formatConditionType(type: Condition['type']): string {
	return type
		.split('_')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

export function formatConditionArrType(arrType: string): string {
	if (arrType === 'all') return 'Radarr and Sonarr';
	return arrType.charAt(0).toUpperCase() + arrType.slice(1);
}

export function formatConditionValue(data: ConditionData): string {
	switch (data.type) {
		case 'release_title':
		case 'release_group':
		case 'edition':
			return data.regularExpressionName;
		case 'language':
			return data.exceptLanguage ? `Except ${data.languageName}` : data.languageName;
		case 'source':
			return SOURCE_LABELS[data.source] ?? data.source;
		case 'resolution':
			return RESOLUTION_LABELS[data.resolution] ?? data.resolution;
		case 'quality_modifier':
			return QUALITY_MODIFIER_LABELS[data.qualityModifier] ?? data.qualityModifier;
		case 'release_type':
			return RELEASE_TYPE_LABELS[data.releaseType] ?? data.releaseType;
		case 'indexer_flag':
			return INDEXER_FLAG_LABELS[data.flag] ?? data.flag;
		case 'size':
			return formatSizeRange(data.minBytes, data.maxBytes);
		case 'year':
			return formatYearRange(data.minYear, data.maxYear);
	}
}

function formatSizeRange(minimum: number | null, maximum: number | null): string {
	if (minimum === null && maximum === null) return 'Any size';
	if (minimum === null) return `At most ${formatGigabytes(maximum)} GB`;
	if (maximum === null) return `At least ${formatGigabytes(minimum)} GB`;
	return `${formatGigabytes(minimum)} GB to ${formatGigabytes(maximum)} GB`;
}

function formatGigabytes(bytes: number): string {
	return String(Math.round((bytes / BYTES_PER_GB) * 100) / 100);
}

function formatYearRange(minimum: number | null, maximum: number | null): string {
	if (minimum === null && maximum === null) return 'Any year';
	if (minimum === null) return `${maximum} or earlier`;
	if (maximum === null) return `${minimum} or later`;
	return `${minimum} to ${maximum}`;
}
