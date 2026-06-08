// Parsed OpenAPI data shape - used by the page.server.ts load function and page components

export interface ApiSpec {
	title: string;
	version: string;
	description: string;
	auth: AuthInfo[];
	tags: ApiTag[];
}

export interface AuthInfo {
	name: string;
	type: string;
	location: string;
	paramName: string;
	description: string;
	[key: string]: unknown;
}

export interface ApiTag {
	name: string;
	slug: string;
	description: string;
	endpoints: ApiEndpoint[];
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ApiEndpoint {
	operationId: string;
	method: HttpMethod;
	path: string;
	summary: string;
	description: string | null;
	parameters: ApiParameter[];
	requestBody: ApiRequestBody | null;
	responses: ApiResponse[];
	snippets: CodeSnippet[];
}

export interface ApiParameter {
	name: string;
	location: string;
	required: boolean;
	type: string;
	description: string;
	[key: string]: unknown;
}

export interface ApiRequestBody {
	required: boolean;
	contentType: string;
	example: string;
}

export interface ApiResponse {
	status: string;
	description: string;
	example: string | null;
	schema: string | null;
}

export interface CodeSnippet {
	language: string;
	title: string;
	code: string;
}
