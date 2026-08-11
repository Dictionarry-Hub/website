import type {
	CompiledDatabase,
	Condition,
	ConditionData,
	CustomFormat,
	DelayProfile,
	MediaSettings,
	NamingConfig,
	QualityDefinitionConfig,
	RegularExpression
} from '$lib/types/pcd';
import { SITE_URL } from '$lib/shared/utils/llm/site.js';
import { sortConditions } from '$lib/shared/utils/pcd/conditions';
import { slugify } from '$lib/shared/utils/slug';
import { stringifyYaml } from './stringify.js';

export function customFormatToYaml(data: CompiledDatabase, format: CustomFormat): string {
	const document = {
		schema_version: data.schemaVersion,
		database: {
			id: data.id,
			name: data.name,
			version: data.version
		},
		entity_type: 'custom_format',
		name: format.name,
		description: format.description,
		tags: format.tags,
		include_in_rename: format.includeInRename,
		conditions: sortConditions(format.conditions).map((condition) =>
			conditionToYaml(data, condition)
		),
		...(format.tests.length > 0
			? {
					tests: format.tests.map((test) => ({
						title: test.title,
						type: test.type,
						should_match: test.shouldMatch,
						...(test.description === null ? {} : { description: test.description })
					}))
				}
			: {})
	};

	return stringifyYaml(document);
}

export function regularExpressionToYaml(data: CompiledDatabase, regex: RegularExpression): string {
	return stringifyYaml({
		schema_version: data.schemaVersion,
		database: {
			id: data.id,
			name: data.name,
			version: data.version
		},
		entity_type: 'regular_expression',
		name: regex.name,
		description: regex.description,
		tags: regex.tags,
		pattern: regex.pattern,
		regex101_id: regex.regex101Id
	});
}

export function mediaSettingsToYaml(
	data: CompiledDatabase,
	settings: MediaSettings,
	arrType: string
): string {
	return stringifyYaml({
		schema_version: data.schemaVersion,
		database: {
			id: data.id,
			name: data.name,
			version: data.version
		},
		entity_type: 'media_settings',
		arr_type: arrType,
		name: settings.name,
		propers_repacks: settings.propersRepacks,
		enable_media_info: settings.enableMediaInfo
	});
}

export function delayProfileToYaml(data: CompiledDatabase, profile: DelayProfile): string {
	return stringifyYaml({
		schema_version: data.schemaVersion,
		database: {
			id: data.id,
			name: data.name,
			version: data.version
		},
		entity_type: 'delay_profile',
		name: profile.name,
		preferred_protocol: profile.preferredProtocol,
		usenet_delay: profile.usenetDelay,
		torrent_delay: profile.torrentDelay,
		bypass_if_highest_quality: profile.bypassIfHighestQuality,
		bypass_if_above_custom_format_score: profile.bypassIfAboveCustomFormatScore,
		minimum_custom_format_score: profile.minimumCustomFormatScore
	});
}

export function namingConfigToYaml(data: CompiledDatabase, naming: NamingConfig): string {
	return stringifyYaml({
		schema_version: data.schemaVersion,
		database: {
			id: data.id,
			name: data.name,
			version: data.version
		},
		entity_type: 'naming',
		arr_type: naming.arrType,
		name: naming.name,
		rename: naming.rename,
		replace_illegal_characters: naming.replaceIllegalCharacters,
		colon_replacement_format: naming.colonReplacementFormat,
		custom_colon_replacement_format: naming.customColonReplacementFormat ?? null,
		formats: naming.formats
	});
}

export function qualityDefinitionsToYaml(
	data: CompiledDatabase,
	config: QualityDefinitionConfig,
	arrType: string
): string {
	return stringifyYaml({
		schema_version: data.schemaVersion,
		database: {
			id: data.id,
			name: data.name,
			version: data.version
		},
		entity_type: 'quality_definitions',
		arr_type: arrType,
		name: config.name,
		tiers: config.tiers.map((tier) => ({
			quality: tier.qualityName,
			min_size: tier.minSize,
			preferred_size: tier.preferredSize,
			max_size: tier.maxSize
		}))
	});
}

function conditionToYaml(data: CompiledDatabase, condition: Condition): Record<string, unknown> {
	return {
		name: condition.name,
		type: condition.type,
		applies_to: condition.arrType === 'all' ? ['radarr', 'sonarr'] : [condition.arrType],
		required: condition.required,
		negated: condition.negate,
		value: conditionValueToYaml(data, condition.data)
	};
}

function conditionValueToYaml(
	data: CompiledDatabase,
	condition: ConditionData
): Record<string, unknown> {
	switch (condition.type) {
		case 'release_title':
		case 'release_group':
		case 'edition': {
			const regex = data.regularExpressions.find(
				(entry) => entry.name === condition.regularExpressionName
			);
			const regexSlug = regex ? slugify(regex.name) : '';
			return {
				regular_expression: condition.regularExpressionName,
				...(regexSlug
					? {
							url: `${SITE_URL}/pcd/${data.id}/regular-expressions/${regexSlug}`
						}
					: {})
			};
		}
		case 'language':
			return { language: condition.languageName, except: condition.exceptLanguage };
		case 'source':
			return { source: condition.source };
		case 'resolution':
			return { resolution: condition.resolution };
		case 'quality_modifier':
			return { quality_modifier: condition.qualityModifier };
		case 'release_type':
			return { release_type: condition.releaseType };
		case 'indexer_flag':
			return { flag: condition.flag };
		case 'size':
			return { min_bytes: condition.minBytes, max_bytes: condition.maxBytes };
		case 'year':
			return { min_year: condition.minYear, max_year: condition.maxYear };
	}
}
