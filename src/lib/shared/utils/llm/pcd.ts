import type {
	CompiledDatabase,
	CustomFormat,
	DelayProfile,
	MediaSettings,
	NamingConfig,
	PatternCondition,
	QualityDefinitionConfig,
	RegularExpression
} from '$lib/types/pcd';
import { slugify } from '$lib/shared/utils/slug';
import {
	NAMING_FORMAT_LABELS,
	COLON_REPLACEMENT_LABELS,
	MULTI_EPISODE_LABELS,
	formatProtocol,
	formatDelay,
	formatPropersRepacks,
	formatTierSize,
	formatTierMaxSize
} from '$lib/shared/utils/pcd/format';
import { SITE_URL } from './site.js';
import { join, fence } from './md.js';

// Markdown serializers for PCD entity artifacts. PCD entities are structured
// data compiled from PCD repositories, so these are API-style serializers
// consuming the same CompiledDatabase JSON the entity pages render, not
// mdsvex pass-throughs. See docs/backend/llm.md.

export function regexToMarkdown(data: CompiledDatabase, regex: RegularExpression): string {
	const slug = slugify(regex.name);

	const context = [
		`A regular expression from the ${data.name} PCD database.`,
		regex.tags.length > 0 ? `Tags: ${regex.tags.join(', ')}.` : '',
		`Web version: ${SITE_URL}/pcd/${data.id}/regular-expressions/${slug}`
	]
		.filter(Boolean)
		.join(' ');

	const references = data.customFormats.filter((cf) =>
		cf.conditions.some((c) => (c.data as PatternCondition).regularExpressionName === regex.name)
	);

	return join([
		`# ${regex.name}`,
		context,
		'## Pattern',
		fence('regex', regex.pattern),
		regex.regex101Id ? `Test this pattern at https://regex101.com/r/${regex.regex101Id}.` : '',
		regex.description ? join(['## Description', regex.description]) : '',
		'## References',
		referencesSection(data.id, references)
	]);
}

export function delayProfileToMarkdown(data: CompiledDatabase, profile: DelayProfile): string {
	const slug = slugify(profile.name);

	const rows: [string, string][] = [
		['Download Protocol', formatProtocol(profile.preferredProtocol)]
	];
	if (profile.preferredProtocol !== 'only_torrent') {
		rows.push(['Usenet Delay', formatDelay(profile.usenetDelay)]);
	}
	if (profile.preferredProtocol !== 'only_usenet') {
		rows.push(['Torrent Delay', formatDelay(profile.torrentDelay)]);
	}
	rows.push(['Bypass if Highest Quality', profile.bypassIfHighestQuality ? 'Yes' : 'No']);
	rows.push([
		'Bypass if Above Custom Format Score',
		profile.bypassIfAboveCustomFormatScore ? 'Yes' : 'No'
	]);
	if (profile.bypassIfAboveCustomFormatScore) {
		rows.push(['Minimum Custom Format Score', String(profile.minimumCustomFormatScore ?? 0)]);
	}

	return join([
		`# ${profile.name}`,
		`A delay profile from the ${data.name} PCD database. ` +
			`Web version: ${SITE_URL}/pcd/${data.id}/delay-profiles/${slug}`,
		'## Configuration',
		settingsTable(rows)
	]);
}

export function namingConfigToMarkdown(data: CompiledDatabase, naming: NamingConfig): string {
	const slug = slugify(naming.name);

	const rows: [string, string][] = [
		['Rename', naming.rename ? 'Yes' : 'No'],
		['Character Replacement', naming.replaceIllegalCharacters ? 'Yes' : 'No']
	];
	if (naming.replaceIllegalCharacters) {
		rows.push([
			'Colon Replacement',
			COLON_REPLACEMENT_LABELS[naming.colonReplacementFormat] ?? naming.colonReplacementFormat
		]);
		if (naming.colonReplacementFormat === 'custom' && naming.customColonReplacementFormat) {
			rows.push(['Custom Replacement', `\`${naming.customColonReplacementFormat}\``]);
		}
	}
	const multiEpisodeStyle = naming.arrType === 'sonarr' ? naming.formats.multiEpisodeStyle : null;
	if (multiEpisodeStyle) {
		rows.push([
			'Multi-Episode Style',
			MULTI_EPISODE_LABELS[multiEpisodeStyle] ?? multiEpisodeStyle
		]);
	}

	const formatSections = Object.entries(naming.formats)
		.filter(([key]) => key !== 'multiEpisodeStyle')
		.map(([key, value]) =>
			join([`### ${NAMING_FORMAT_LABELS[key] ?? key}`, fence('text', value)])
		);

	return join([
		`# ${naming.name}`,
		`A ${arrLabel(naming.arrType)} naming configuration from the ${data.name} PCD database. ` +
			`Web version: ${SITE_URL}/pcd/${data.id}/naming/${naming.arrType}/${slug}`,
		'## Configuration',
		settingsTable(rows),
		'## Naming Scheme',
		...formatSections
	]);
}

export function mediaSettingsToMarkdown(
	data: CompiledDatabase,
	settings: MediaSettings,
	arrType: string
): string {
	const slug = slugify(settings.name);

	const rows: [string, string][] = [
		['Propers & Repacks', formatPropersRepacks(settings.propersRepacks)],
		['Enable Media Info', settings.enableMediaInfo ? 'Yes' : 'No']
	];

	return join([
		`# ${settings.name}`,
		`${arrLabel(arrType)} media management settings from the ${data.name} PCD database. ` +
			`Web version: ${SITE_URL}/pcd/${data.id}/media-settings/${arrType}/${slug}`,
		'## Configuration',
		settingsTable(rows)
	]);
}

export function qualityDefinitionsToMarkdown(
	data: CompiledDatabase,
	config: QualityDefinitionConfig,
	arrType: string
): string {
	const slug = slugify(config.name);

	const tierRows = config.tiers.map(
		(t) =>
			`| ${t.qualityName} | ${formatTierSize(t.minSize, 'mb-min')} | ${formatTierSize(t.preferredSize, 'mb-min')} | ${formatTierMaxSize(t.maxSize, 'mb-min', arrType)} |`
	);

	return join([
		`# ${config.name}`,
		`${arrLabel(arrType)} quality definitions from the ${data.name} PCD database. ` +
			`Web version: ${SITE_URL}/pcd/${data.id}/quality-definitions/${arrType}/${slug}`,
		'## Quality Tiers',
		'Sizes are megabytes per minute of runtime.',
		[
			'| Quality | Min | Preferred | Max |',
			'| ------- | --- | --------- | --- |',
			...tierRows
		].join('\n')
	]);
}

function settingsTable(rows: [string, string][]): string {
	return [
		'| Setting | Value |',
		'| ------- | ----- |',
		...rows.map(([setting, value]) => `| ${setting} | ${value} |`)
	].join('\n');
}

function arrLabel(arrType: string): string {
	return arrType.charAt(0).toUpperCase() + arrType.slice(1);
}

function referencesSection(databaseId: string, references: CustomFormat[]): string {
	if (references.length === 0) {
		return 'No custom formats reference this regular expression.';
	}

	const items = references.map(
		(cf) =>
			`- [${cf.name}](${SITE_URL}/pcd/${databaseId}/custom-formats/${slugify(cf.name)}.md)`
	);

	return join([
		'Custom formats using this regular expression. Each link points to the markdown version.',
		items.join('\n')
	]);
}
