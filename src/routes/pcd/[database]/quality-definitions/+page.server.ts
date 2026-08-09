import { error } from '@sveltejs/kit';
import { slugify } from '$lib/shared/utils/slug';
import type { CompiledDatabase } from '$lib/types/pcd';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { database } = params;

	let data: CompiledDatabase;
	try {
		const module = await import(`$lib/data/pcd/${database}.json`);
		data = module.default as CompiledDatabase;
	} catch {
		error(404, 'Database not found');
	}

	const configs = (['radarr', 'sonarr'] as const).flatMap((arrType) =>
		data.media[arrType].qualityDefinitions.map((config) => ({
			name: config.name,
			arrType,
			slug: slugify(config.name)
		}))
	);

	return { configs, database };
};
