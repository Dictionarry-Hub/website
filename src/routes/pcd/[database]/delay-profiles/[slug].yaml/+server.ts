import { error } from '@sveltejs/kit';
import type { EntryGenerator, RequestHandler } from './$types';
import { slugify } from '$lib/shared/utils/slug';
import { delayProfileToYaml } from '$lib/shared/utils/yaml/index.js';
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
		data.delayProfiles
			.map((profile) => ({ database: databaseId(path), slug: slugify(profile.name) }))
			.filter((entry) => entry.slug !== '')
	);

export const GET: RequestHandler = ({ params }) => {
	const entry = Object.entries(databases).find(([path]) => databaseId(path) === params.database);
	if (!entry) error(404, 'Database not found');

	const data = entry[1];
	const profile = data.delayProfiles.find((item) => slugify(item.name) === params.slug);
	if (!profile) error(404, 'Delay profile not found');

	return new Response(delayProfileToYaml(data, profile), {
		headers: {
			'Content-Type': 'application/yaml; charset=utf-8',
			'Content-Disposition': 'inline'
		}
	});
};
