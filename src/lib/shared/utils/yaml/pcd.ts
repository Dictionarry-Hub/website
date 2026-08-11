import type { CompiledDatabase, Condition, ConditionData, CustomFormat } from '$lib/types/pcd';
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
