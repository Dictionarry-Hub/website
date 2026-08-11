import { error } from '@sveltejs/kit';
import type { EntryGenerator, RequestHandler } from './$types';
import { slugify } from '$lib/shared/utils/slug';
import { qualityDefinitionsToYaml } from '$lib/shared/utils/yaml/index.js';
import type { CompiledDatabase } from '$lib/types/pcd';

export const prerender = true;

const databases = import.meta.glob<CompiledDatabase>(
	['/src/lib/data/pcd/*.json', '!**/index.json'],
	{ eager: true, import: 'default' }
);

function databaseId(path: string): string {
	return path
		.split('/')
		.at(-1)!
		.replace(/\.json$/, '');
}

export const entries: EntryGenerator = () =>
	Object.entries(databases).flatMap(([path, data]) =>
		Object.entries(data.media).flatMap(([arrType, arrMedia]) =>
			arrMedia.qualityDefinitions
				.map((config) => ({
					database: databaseId(path),
					arrType,
					slug: slugify(config.name)
				}))
				.filter((entry) => entry.slug !== '')
		)
	);

export const GET: RequestHandler = ({ params }) => {
	const entry = Object.entries(databases).find(([path]) => databaseId(path) === params.database);
	if (!entry) error(404, 'Database not found');

	const data = entry[1];
	const arrMedia = data.media[params.arrType as keyof typeof data.media];
	if (!arrMedia) error(404, 'Arr type not found');

	const config = arrMedia.qualityDefinitions.find((item) => slugify(item.name) === params.slug);
	if (!config) error(404, 'Quality definitions not found');

	return new Response(qualityDefinitionsToYaml(data, config, params.arrType), {
		headers: {
			'Content-Type': 'application/yaml; charset=utf-8',
			'Content-Disposition': 'inline'
		}
	});
};
