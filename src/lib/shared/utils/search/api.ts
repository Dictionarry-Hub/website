import type { ApiSpec } from '$lib/types/api';
import { BASELINE_ELO, type SearchEntry } from './types.js';

// One entry per API operation. The HTML API reference is a single page with
// per-endpoint anchor ids (id={operationId}), so entries anchor into it.
// Anchored URLs are full identity keys for Elo like any other route.

export function buildApiEndpointEntries(spec: ApiSpec): SearchEntry[] {
	const page = `/api/v${spec.version}`;

	return spec.tags.flatMap((tag) =>
		tag.endpoints.map(
			(endpoint): SearchEntry => ({
				title: endpoint.summary || `${endpoint.method} ${endpoint.path}`,
				url: `${page}#${endpoint.operationId}`,
				type: 'api-endpoint',
				blurb: `${endpoint.method} ${spec.baseUrl}${endpoint.path}`,
				keywords: [tag.name],
				elo: BASELINE_ELO
			})
		)
	);
}
