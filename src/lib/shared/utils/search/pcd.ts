import { slugify } from '../slug.js';
import type {
	CompiledDatabase,
	CustomFormat,
	DelayProfile,
	MediaSettings,
	NamingConfig,
	QualityDefinitionConfig,
	QualityProfile,
	RegularExpression
} from '$lib/types/pcd';
import { BASELINE_ELO, type SearchEntry } from './types.js';

// Entry builders for PCD entities. Blurbs are display text and searchable
// text at once; terms that are searchable but not readable prose (tags, arr
// types, quality names) go to keywords. Descriptions are nullable across PCD,
// so every builder has a derived fallback. See docs/backend/search.md.

const BLURB_MAX = 160;
const PATTERN_MAX = 80;

type ArrType = 'radarr' | 'sonarr';

/** First paragraph of a markdown description, stripped to plain text. */
function plainText(markdown: string): string {
	return markdown
		.split(/\n\s*\n/)[0]
		.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
		.replace(/[*_`#>]/g, '')
		.replace(/\s+/g, ' ')
		.trim()
		.replace(/:$/, '...');
}

function truncate(text: string, max: number): string {
	if (text.length <= max) return text;
	const cut = text.slice(0, max);
	const lastSpace = cut.lastIndexOf(' ');
	return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd()}...`;
}

function descriptionBlurb(description: string | null, fallback: () => string): string {
	return description ? truncate(plainText(description), BLURB_MAX) : fallback();
}

/** "doNotPrefer" to "do not prefer". */
function humanizeCamel(value: string): string {
	return value.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
}

function capitalize(value: string): string {
	return value.charAt(0).toUpperCase() + value.slice(1);
}

function dedupe(values: string[]): string[] {
	return [...new Set(values)];
}

export function buildQualityProfileEntry(
	profile: QualityProfile,
	database: string
): SearchEntry {
	const qualityNames = profile.qualities
		.filter((entry) => entry.enabled)
		.flatMap((entry) =>
			entry.quality ? [entry.quality] : entry.group ? [entry.group.name, ...entry.group.members] : []
		);

	return {
		title: profile.name,
		url: `/pcd/${database}/quality-profiles/${slugify(profile.name)}`,
		type: 'quality-profile',
		blurb: descriptionBlurb(profile.description, () => {
			if (!profile.upgradesAllowed) return 'Upgrades disabled.';
			const target = profile.qualities.find((entry) => entry.upgradeUntil);
			const name = target?.quality ?? target?.group?.name;
			return name ? `Upgrades until ${name}.` : 'Quality profile.';
		}),
		keywords: dedupe([...profile.tags, ...qualityNames, 'quality profile']),
		elo: BASELINE_ELO
	};
}

export function buildCustomFormatEntry(format: CustomFormat, database: string): SearchEntry {
	return {
		title: format.name,
		url: `/pcd/${database}/custom-formats/${slugify(format.name)}`,
		type: 'custom-format',
		blurb: descriptionBlurb(format.description, () => {
			if (format.conditions.length === 0) return 'No conditions.';
			const types = dedupe(format.conditions.map((c) => c.type.replace(/_/g, ' ')));
			const plural = format.conditions.length === 1 ? 'condition' : 'conditions';
			return `${format.conditions.length} ${plural}: ${types.join(', ')}.`;
		}),
		keywords: [...format.tags, 'custom format'],
		elo: BASELINE_ELO
	};
}

export function buildRegularExpressionEntry(
	regex: RegularExpression,
	database: string
): SearchEntry {
	return {
		title: regex.name,
		url: `/pcd/${database}/regular-expressions/${slugify(regex.name)}`,
		type: 'regular-expression',
		blurb: descriptionBlurb(
			regex.description,
			() => `Pattern: ${truncate(regex.pattern, PATTERN_MAX)}`
		),
		keywords: [...regex.tags, 'regex', 'regular expression'],
		elo: BASELINE_ELO
	};
}

export function buildDelayProfileEntry(profile: DelayProfile, database: string): SearchEntry {
	// Real protocol values are prefixed ("prefer_torrent"), not bare names.
	const protocol = profile.preferredProtocol.replace(/^prefer_/, '').replace(/_/g, ' ');
	const parts = [`Prefers ${protocol}.`];
	if (profile.usenetDelay) parts.push(`${profile.usenetDelay} min usenet delay.`);
	if (profile.torrentDelay) parts.push(`${profile.torrentDelay} min torrent delay.`);
	if (profile.bypassIfHighestQuality) parts.push('Bypasses at highest quality.');
	if (profile.bypassIfAboveCustomFormatScore && profile.minimumCustomFormatScore !== null) {
		parts.push(`Bypasses above score ${profile.minimumCustomFormatScore}.`);
	}

	return {
		title: profile.name,
		url: `/pcd/${database}/delay-profiles/${slugify(profile.name)}`,
		type: 'delay-profile',
		blurb: parts.join(' '),
		keywords: ['delay profile'],
		elo: BASELINE_ELO
	};
}

export function buildNamingEntry(config: NamingConfig, database: string): SearchEntry {
	return {
		title: config.name,
		url: `/pcd/${database}/naming/${config.arrType}/${slugify(config.name)}`,
		type: 'naming',
		blurb: `${capitalize(config.arrType)} naming scheme, renaming ${config.rename ? 'enabled' : 'disabled'}.`,
		keywords: [config.arrType, 'naming'],
		elo: BASELINE_ELO
	};
}

export function buildMediaSettingsEntry(
	settings: MediaSettings,
	arrType: ArrType,
	database: string
): SearchEntry {
	return {
		title: settings.name,
		url: `/pcd/${database}/media-settings/${arrType}/${slugify(settings.name)}`,
		type: 'media-settings',
		blurb: `Propers/repacks: ${humanizeCamel(settings.propersRepacks)}. MediaInfo ${settings.enableMediaInfo ? 'enabled' : 'disabled'}.`,
		keywords: [arrType, 'media settings'],
		elo: BASELINE_ELO
	};
}

export function buildQualityDefinitionsEntry(
	config: QualityDefinitionConfig,
	arrType: ArrType,
	database: string
): SearchEntry {
	const tiers = config.tiers;
	const blurb =
		tiers.length === 0
			? 'No quality tiers.'
			: tiers.length === 1
				? `1 quality tier, ${tiers[0].qualityName}.`
				: `${tiers.length} quality tiers, ${tiers[0].qualityName} to ${tiers[tiers.length - 1].qualityName}.`;

	return {
		title: config.name,
		url: `/pcd/${database}/quality-definitions/${arrType}/${slugify(config.name)}`,
		type: 'quality-definitions',
		blurb,
		keywords: [arrType, 'quality definitions'],
		elo: BASELINE_ELO
	};
}

/** Every search entry for one compiled database. */
export function buildPcdEntries(database: CompiledDatabase): SearchEntry[] {
	const id = database.id;
	const arrTypes: ArrType[] = ['radarr', 'sonarr'];

	return [
		...database.qualityProfiles.map((p) => buildQualityProfileEntry(p, id)),
		...database.customFormats.map((cf) => buildCustomFormatEntry(cf, id)),
		...database.regularExpressions.map((re) => buildRegularExpressionEntry(re, id)),
		...database.delayProfiles.map((dp) => buildDelayProfileEntry(dp, id)),
		...arrTypes.flatMap((arr) => [
			...database.media[arr].naming.map((n) => buildNamingEntry(n, id)),
			...database.media[arr].settings.map((s) => buildMediaSettingsEntry(s, arr, id)),
			...database.media[arr].qualityDefinitions.map((q) =>
				buildQualityDefinitionsEntry(q, arr, id)
			)
		])
	];
}
