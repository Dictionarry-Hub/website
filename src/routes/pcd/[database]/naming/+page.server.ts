import { error } from '@sveltejs/kit';
import { slugify } from '$lib/shared/utils/slug';
import { COLON_REPLACEMENT_LABELS, MULTI_EPISODE_LABELS } from '$lib/shared/utils/pcd/format';
import { pcdDatabaseEntries } from '$lib/shared/utils/pcd/prerender.js';
import type { CompiledDatabase } from '$lib/types/pcd';
import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = pcdDatabaseEntries;

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
		data.media[arrType].naming.map((config) => {
			const multiEpisodeStyle =
				arrType === 'sonarr' ? (config.formats.multiEpisodeStyle ?? null) : null;
			return {
				name: config.name,
				arrType,
				colonReplacement:
					COLON_REPLACEMENT_LABELS[config.colonReplacementFormat] ??
					config.colonReplacementFormat,
				multiEpisode: multiEpisodeStyle
					? (MULTI_EPISODE_LABELS[multiEpisodeStyle] ?? multiEpisodeStyle)
					: null,
				slug: slugify(config.name)
			};
		})
	);

	return { configs, database };
};
