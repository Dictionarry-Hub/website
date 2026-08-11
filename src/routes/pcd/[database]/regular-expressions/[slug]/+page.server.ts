import { error } from '@sveltejs/kit';
import { marked } from 'marked';
import { pickDescriptionFallback } from '$lib/shared/utils/pcd/description';
import { slugify } from '$lib/shared/utils/slug';
import type { CompiledDatabase, PatternCondition } from '$lib/types/pcd';
import type { PageServerLoad } from './$types';

const NO_DESCRIPTION_MESSAGES = [
	'This regex speaks for itself.',
	'No description needed. Just vibes.',
	'The pattern is the documentation.',
	'Self-documenting regex. A rare breed.',
	'If you know, you know.',
	'Description not found. Regex not sorry.',
	'Some things are better left unexplained.',
	'It matches what it matches.',
	'This regex matches the correct thing 100% of the time 40% of the time.'
];

export const load: PageServerLoad = async ({ params }) => {
	const { database, slug } = params;

	let data: CompiledDatabase;
	try {
		const module = await import(`$lib/data/pcd/${database}.json`);
		data = module.default as CompiledDatabase;
	} catch {
		error(404, 'Database not found');
	}

	const regex = data.regularExpressions.find((re) => slugify(re.name) === slug);
	if (!regex) {
		error(404, 'Regular expression not found');
	}

	const descriptionHtml = regex.description ? await marked.parse(regex.description) : null;
	const noDescriptionMessage = descriptionHtml
		? null
		: pickDescriptionFallback(regex.name, NO_DESCRIPTION_MESSAGES);

	// Find custom formats that reference this regex
	const references = data.customFormats
		.filter((cf) =>
			cf.conditions.some(
				(c) => (c.data as PatternCondition).regularExpressionName === regex.name
			)
		)
		.map((cf) => ({
			name: cf.name,
			slug: slugify(cf.name),
			tags: cf.tags
		}));

	return { regex: { ...regex, noDescriptionMessage }, descriptionHtml, references, database };
};
