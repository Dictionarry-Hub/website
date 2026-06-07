import { error } from '@sveltejs/kit';
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

	const profile = data.delayProfiles.find((dp) => slugify(dp.name) === slug);
	if (!profile) {
		error(404, 'Delay profile not found');
	}

	return { profile, database };
};
