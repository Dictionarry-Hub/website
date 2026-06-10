import { describe, expect, it } from 'vitest';
import { buildApiEndpointEntries } from '$lib/shared/utils/search/api';
import type { ApiEndpoint, ApiSpec } from '$lib/types/api';

function endpoint(overrides: Partial<ApiEndpoint> = {}): ApiEndpoint {
	return {
		operationId: 'getDatabases',
		method: 'GET',
		path: '/databases',
		summary: 'List databases',
		description: null,
		descriptionHtml: null,
		parameters: [],
		requestBody: null,
		responses: [],
		snippets: [],
		...overrides
	};
}

function spec(overrides: Partial<ApiSpec> = {}): ApiSpec {
	return {
		title: 'Profilarr API',
		version: '1',
		description: '',
		descriptionMd: '',
		baseUrl: '/api/v1',
		auth: [],
		tags: [],
		...overrides
	};
}

describe('buildApiEndpointEntries', () => {
	it('builds one entry per operation, anchored into the API reference page', () => {
		const entries = buildApiEndpointEntries(
			spec({
				tags: [
					{
						name: 'Databases',
						slug: 'databases',
						description: 'Database management',
						endpoints: [
							endpoint(),
							endpoint({
								operationId: 'deleteDatabase',
								method: 'DELETE',
								path: '/databases/{id}',
								summary: 'Delete a database'
							})
						]
					}
				]
			})
		);

		expect(entries).toEqual([
			{
				title: 'List databases',
				url: '/api/v1#getDatabases',
				type: 'api-endpoint',
				blurb: 'GET /api/v1/databases',
				keywords: ['Databases'],
				elo: 1500
			},
			{
				title: 'Delete a database',
				url: '/api/v1#deleteDatabase',
				type: 'api-endpoint',
				blurb: 'DELETE /api/v1/databases/{id}',
				keywords: ['Databases'],
				elo: 1500
			}
		]);
	});

	it('falls back to method and path when the summary is empty', () => {
		const entries = buildApiEndpointEntries(
			spec({
				tags: [
					{
						name: 'Other',
						slug: 'other',
						description: '',
						endpoints: [endpoint({ summary: '' })]
					}
				]
			})
		);

		expect(entries[0].title).toBe('GET /databases');
	});

	it('flattens endpoints across tags in spec order', () => {
		const entries = buildApiEndpointEntries(
			spec({
				tags: [
					{ name: 'A', slug: 'a', description: '', endpoints: [endpoint()] },
					{
						name: 'B',
						slug: 'b',
						description: '',
						endpoints: [endpoint({ operationId: 'getB', path: '/b' })]
					}
				]
			})
		);

		expect(entries.map((e) => e.keywords)).toEqual([['A'], ['B']]);
	});
});
