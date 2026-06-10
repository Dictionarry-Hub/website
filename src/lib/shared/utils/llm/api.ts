import type { ApiSpec, ApiTag, ApiEndpoint } from '$lib/types/api';
import { SITE_URL } from './site.js';

// Markdown serializers for the API reference artifacts. Formatting decisions
// live here and nowhere else. Heading depths are fixed across all
// granularities so bodies compose downward by concatenation: tags are `##`,
// endpoints are `###`, endpoint subsections are `####`. See
// docs/backend/llm.md.

/** URL slug for an operation: kebab-cased operationId (getDatabase -> get-database). */
export function operationSlug(operationId: string): string {
	return operationId.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

export function specToMarkdown(spec: ApiSpec): string {
	const scopeNote = `The complete ${spec.title} v${spec.version} reference in a single file.`;

	return join([
		preamble(spec, null, scopeNote),
		spec.descriptionMd,
		...spec.tags.map((tag) => tagSection(tag))
	]);
}

export function tagToMarkdown(spec: ApiSpec, tag: ApiTag): string {
	const scopeNote =
		`Part of the ${spec.title} v${spec.version} reference. This file covers the ` +
		`${tag.name} endpoints. Full reference: ${SITE_URL}/api/v1.md`;

	return join([preamble(spec, tag.name, scopeNote), tagSection(tag)]);
}

export function endpointToMarkdown(spec: ApiSpec, tag: ApiTag, endpoint: ApiEndpoint): string {
	const scopeNote =
		`Part of the ${spec.title} v${spec.version} reference. This file covers a single ` +
		`endpoint from the ${tag.name} group. Full reference: ${SITE_URL}/api/v1.md`;

	const scope = `${endpoint.method} ${endpoint.path}`;

	return join([preamble(spec, scope, scopeNote), endpointSection(endpoint)]);
}

// Every artifact starts with the same self-contained preamble: title, scope
// blockquote, then the context needed to act on any chunk standalone.
function preamble(spec: ApiSpec, scope: string | null, scopeNote: string): string {
	const title = scope
		? `# ${spec.title} v${spec.version}: ${scope}`
		: `# ${spec.title} v${spec.version}`;

	const context =
		`All requests use the base URL \`\${PROFILARR_URL}${spec.baseUrl}\`. ${authSentence(spec)} ` +
		'`${PROFILARR_URL}` and `${API_KEY}` are placeholders for your own Profilarr instance ' +
		'URL and API key.';

	return join([title, `> ${scopeNote}`, context]);
}

function authSentence(spec: ApiSpec): string {
	const apiKey = spec.auth.find((a) => a.type === 'apiKey' && a.location === 'header');
	if (!apiKey) return '';

	return `Authenticate by sending the API key in the \`${apiKey.paramName}\` header.`;
}

function tagSection(tag: ApiTag): string {
	return join([
		`## ${tag.name}`,
		tag.description,
		...tag.endpoints.map((endpoint) => endpointSection(endpoint))
	]);
}

function endpointSection(endpoint: ApiEndpoint): string {
	return join([
		`### ${endpoint.method} ${endpoint.path}`,
		endpoint.summary,
		endpoint.description,
		parametersSection(endpoint),
		requestBodySection(endpoint),
		responsesSection(endpoint),
		exampleSection(endpoint)
	]);
}

function parametersSection(endpoint: ApiEndpoint): string {
	if (endpoint.parameters.length === 0) return '';

	const rows = endpoint.parameters.map(
		(p) =>
			`| ${cell(p.name)} | ${cell(p.location)} | ${cell(p.type)} | ` +
			`${p.required ? 'yes' : 'no'} | ${cell(p.description)} |`
	);

	return join([
		'#### Parameters',
		[
			'| Name | In | Type | Required | Description |',
			'| ---- | -- | ---- | -------- | ----------- |',
			...rows
		].join('\n')
	]);
}

function requestBodySection(endpoint: ApiEndpoint): string {
	const body = endpoint.requestBody;
	if (!body) return '';

	return join([
		'#### Request Body',
		`\`${body.contentType}\`${body.required ? ' (required)' : ''}`,
		fence('json', body.example)
	]);
}

function responsesSection(endpoint: ApiEndpoint): string {
	if (endpoint.responses.length === 0) return '';

	const blocks = endpoint.responses.map((response) =>
		join([
			`**${response.status}**${response.description ? `: ${response.description}` : ''}`,
			response.example ? fence('json', response.example) : ''
		])
	);

	return join(['#### Responses', ...blocks]);
}

// Artifacts carry only the curl snippet: it is the most universal expression
// of a request and models translate it to any language trivially.
function exampleSection(endpoint: ApiEndpoint): string {
	const curl = endpoint.snippets.find((s) => s.title === 'curl');
	if (!curl) return '';

	return join(['#### Example', fence('bash', curl.code)]);
}

function fence(language: string, code: string): string {
	return `\`\`\`${language}\n${code.trim()}\n\`\`\``;
}

/** Escape a value for use inside a markdown table cell. */
function cell(value: string): string {
	return value
		.replace(/\|/g, '\\|')
		.replace(/\s*\n\s*/g, ' ')
		.trim();
}

function join(blocks: (string | null)[]): string {
	return blocks
		.map((block) => block?.trim() ?? '')
		.filter((block) => block !== '')
		.join('\n\n');
}
