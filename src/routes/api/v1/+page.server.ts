import type { PageServerLoad } from './$types';
import { loadApiSpec } from '$lib/shared/utils/openapi/index.js';

export const load: PageServerLoad = async () => {
	const spec = await loadApiSpec();

	return { spec };
};
