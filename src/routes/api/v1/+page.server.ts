import type { PageServerLoad } from './$types';
import { parseOpenApiSpec } from '$lib/shared/utils/openapi/index.js';

export const load: PageServerLoad = async () => {
	const module = await import('$lib/data/api/v1.json');
	const spec = await parseOpenApiSpec(module.default);

	return { spec };
};
