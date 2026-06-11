import type {
	CompiledDatabase,
	CustomFormat,
	PatternCondition,
	RegularExpression
} from '$lib/types/pcd';
import { slugify } from '$lib/shared/utils/slug';
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
