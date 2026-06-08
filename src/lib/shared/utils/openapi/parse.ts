import { marked } from 'marked';
import type {
	ApiSpec,
	ApiTag,
	ApiEndpoint,
	ApiParameter,
	ApiRequestBody,
	ApiResponse,
	AuthInfo,
	HttpMethod
} from '$lib/types/api';
import { generateExample, schemaToTypeString } from './schema.js';
import { generateSnippets } from './snippets.js';
import { slugify } from '../slug.js';

// Raw OpenAPI types (minimal, no $ref support needed)

interface RawSpec {
	info: { title: string; version: string; description?: string };
	servers?: { url: string; description?: string }[];
	tags?: { name: string; description?: string }[];
	paths: Record<string, RawPathItem>;
	components?: {
		securitySchemes?: Record<string, RawSecurityScheme>;
	};
}

interface RawPathItem {
	parameters?: RawParameter[];
	get?: RawOperation;
	post?: RawOperation;
	put?: RawOperation;
	patch?: RawOperation;
	delete?: RawOperation;
}

interface RawOperation {
	operationId?: string;
	summary?: string;
	description?: string;
	tags?: string[];
	parameters?: RawParameter[];
	requestBody?: {
		required?: boolean;
		content?: Record<string, { schema?: RawSchema; example?: unknown }>;
	};
	responses?: Record<string, RawResponse>;
}

interface RawParameter {
	name: string;
	in: string;
	required?: boolean;
	description?: string;
	schema?: RawSchema;
}

interface RawResponse {
	description?: string;
	content?: Record<string, { schema?: RawSchema; example?: unknown }>;
}

interface RawSchema {
	type?: string;
	properties?: Record<string, RawSchema>;
	required?: string[];
	items?: RawSchema;
	enum?: unknown[];
	nullable?: boolean;
	example?: unknown;
	format?: string;
	default?: unknown;
	oneOf?: RawSchema[];
	description?: string;
}

interface RawSecurityScheme {
	type: string;
	in?: string;
	name?: string;
	description?: string;
}

const HTTP_METHODS = ['get', 'post', 'put', 'patch', 'delete'] as const;

export async function parseOpenApiSpec(raw: RawSpec): Promise<ApiSpec> {
	const baseUrl = raw.servers?.[0]?.url ?? '/api/v1';

	const auth = parseAuth(raw.components?.securitySchemes);
	const tagMap = buildTagMap(raw);

	// Generate snippets for each endpoint
	for (const tag of tagMap.values()) {
		for (const endpoint of tag.endpoints) {
			endpoint.snippets = generateSnippets(endpoint, baseUrl);
		}
	}

	// Preserve tag order from spec
	const tagOrder = (raw.tags ?? []).map((t) => t.name);
	const tags: ApiTag[] = [];

	for (const name of tagOrder) {
		const tag = tagMap.get(name);
		if (tag && tag.endpoints.length > 0) {
			tags.push(tag);
		}
	}

	// Add any tags not listed in spec.tags
	for (const [name, tag] of tagMap) {
		if (!tagOrder.includes(name) && tag.endpoints.length > 0) {
			tags.push(tag);
		}
	}

	const description = raw.info.description ? await marked.parse(raw.info.description) : '';

	return {
		title: raw.info.title,
		version: raw.info.version,
		description,
		auth,
		tags
	};
}

function parseAuth(schemes?: Record<string, RawSecurityScheme>): AuthInfo[] {
	if (!schemes) return [];

	return Object.entries(schemes).map(([name, scheme]) => ({
		name,
		type: scheme.type,
		location: scheme.in ?? '',
		paramName: scheme.name ?? '',
		description: scheme.description ?? ''
	}));
}

function buildTagMap(raw: RawSpec): Map<string, ApiTag> {
	const tagDescriptions = new Map<string, string>();
	for (const t of raw.tags ?? []) {
		tagDescriptions.set(t.name, t.description ?? '');
	}

	const tagMap = new Map<string, ApiTag>();

	for (const [path, pathItem] of Object.entries(raw.paths)) {
		const pathParams = pathItem.parameters ?? [];

		for (const method of HTTP_METHODS) {
			const operation = pathItem[method];
			if (!operation) continue;

			const tagName = operation.tags?.[0] ?? 'Other';
			if (!tagMap.has(tagName)) {
				tagMap.set(tagName, {
					name: tagName,
					slug: slugify(tagName),
					description: tagDescriptions.get(tagName) ?? '',
					endpoints: []
				});
			}

			const endpoint = parseEndpoint(path, method, operation, pathParams);
			tagMap.get(tagName)!.endpoints.push(endpoint);
		}
	}

	return tagMap;
}

function parseEndpoint(
	path: string,
	method: string,
	op: RawOperation,
	pathParams: RawParameter[]
): ApiEndpoint {
	const allParams = [...pathParams, ...(op.parameters ?? [])];

	return {
		operationId: op.operationId ?? `${method}${path}`,
		method: method.toUpperCase() as HttpMethod,
		path,
		summary: op.summary ?? '',
		description: op.description ?? null,
		parameters: allParams.map(parseParameter),
		requestBody: parseRequestBody(op.requestBody),
		responses: parseResponses(op.responses),
		snippets: []
	};
}

function parseParameter(param: RawParameter): ApiParameter {
	return {
		name: param.name,
		location: param.in,
		required: param.required ?? false,
		type: param.schema ? schemaToTypeString(param.schema) : 'string',
		description: param.description ?? ''
	};
}

function parseRequestBody(body?: RawOperation['requestBody']): ApiRequestBody | null {
	if (!body?.content) return null;

	const [contentType, media] = Object.entries(body.content)[0] ?? [];
	if (!contentType || !media) return null;

	let example: string;
	if (media.example) {
		example = JSON.stringify(media.example, null, 2);
	} else if (media.schema) {
		example = JSON.stringify(generateExample(media.schema), null, 2);
	} else {
		return null;
	}

	return {
		required: body.required ?? false,
		contentType,
		example
	};
}

function parseResponses(responses?: Record<string, RawResponse>): ApiResponse[] {
	if (!responses) return [];

	return Object.entries(responses).map(([status, resp]) => {
		let example: string | null = null;

		if (resp.content) {
			const [, media] = Object.entries(resp.content)[0] ?? [];
			if (media?.example) {
				example = JSON.stringify(media.example, null, 2);
			} else if (media?.schema) {
				example = JSON.stringify(generateExample(media.schema), null, 2);
			}
		}

		return {
			status,
			description: resp.description ?? '',
			example
		};
	});
}
