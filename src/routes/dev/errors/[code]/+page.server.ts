import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const code = parseInt(params.code, 10);
	error(code, `Preview of ${code} error`);
};
