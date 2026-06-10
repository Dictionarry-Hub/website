import type { ApiSpec } from '$lib/types/api';
import { parseOpenApiSpec } from './parse.js';

let cached: Promise<ApiSpec> | null = null;

/**
 * Import and parse the compiled OpenAPI spec. Memoized because the page load
 * and every markdown artifact route call this during the same prerender pass.
 */
export function loadApiSpec(): Promise<ApiSpec> {
	cached ??= import('$lib/data/api/v1.json').then((module) => parseOpenApiSpec(module.default));
	return cached;
}
