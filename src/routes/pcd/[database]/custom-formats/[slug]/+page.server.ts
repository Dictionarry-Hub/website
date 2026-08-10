import { error } from '@sveltejs/kit';
import { marked } from 'marked';
import { slugify } from '$lib/shared/utils/slug';
import type { CompiledDatabase } from '$lib/types/pcd';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { database, slug } = params;

	let data: CompiledDatabase;
	try {
		const module = await import(`$lib/data/pcd/${database}.json`);
		data = module.default as CompiledDatabase;
	} catch {
		error(404, 'Database not found');
	}

	const format = data.customFormats.find((customFormat) => slugify(customFormat.name) === slug);
	if (!format) {
		error(404, 'Custom format not found');
	}

	const descriptionHtml = format.description ? await marked.parse(format.description) : null;

	return { format, descriptionHtml };
};
