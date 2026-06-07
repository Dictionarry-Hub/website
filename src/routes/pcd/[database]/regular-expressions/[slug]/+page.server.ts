import { error } from '@sveltejs/kit';
import { marked } from 'marked';
import { slugify } from '$lib/shared/utils/slug';
import type { CompiledDatabase } from '$lib/types/pcd';
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

function pickMessage(name: string): string {
	let hash = 0;
	for (let i = 0; i < name.length; i++) {
		hash = (hash * 31 + name.charCodeAt(i)) | 0;
	}
	return NO_DESCRIPTION_MESSAGES[Math.abs(hash) % NO_DESCRIPTION_MESSAGES.length];
}

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
	const noDescriptionMessage = descriptionHtml ? null : pickMessage(regex.name);

	return { regex: { ...regex, noDescriptionMessage }, descriptionHtml };
};
