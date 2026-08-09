import { error } from '@sveltejs/kit';
import { slugify } from '$lib/shared/utils/slug';
import { formatPropersRepacks } from '$lib/shared/utils/pcd/format';
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

	const groups = (['radarr', 'sonarr'] as const).map((arrType) => ({
		title: arrType === 'radarr' ? 'Radarr' : 'Sonarr',
		data: data.media[arrType].settings.map((settings) => ({
			name: settings.name,
			propersRepacks: formatPropersRepacks(settings.propersRepacks),
			mediaInfo: settings.enableMediaInfo ? 'Yes' : 'No',
			slug: slugify(settings.name),
			arrType
		}))
	}));

	return { groups, database };
};
