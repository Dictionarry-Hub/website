import type { ApiEndpoint } from '$lib/types/api';
import type { CodeSnippet } from '$lib/types/api';

export function generateSnippets(endpoint: ApiEndpoint, baseUrl: string): CodeSnippet[] {
	return [
		{
			language: 'shellscript',
			title: 'curl',
			code: generateCurl(endpoint, baseUrl)
		},
		{
			language: 'python',
			title: 'Python',
			code: generatePython(endpoint, baseUrl)
		},
		{
			language: 'javascript',
			title: 'JavaScript / TypeScript',
			code: generateJavaScript(endpoint, baseUrl)
		},
		{
			language: 'csharp',
			title: 'C#',
			code: generateCSharp(endpoint, baseUrl)
		}
	];
}

function generateCurl(endpoint: ApiEndpoint, baseUrl: string): string {
	const lines: string[] = [];
	const url = `\${PROFILARR_URL}${baseUrl}${endpoint.path}`;

	lines.push(`curl -X ${endpoint.method} "${url}" \\`);
	lines.push(`  -H "X-Api-Key: \${API_KEY}"`);

	if (endpoint.requestBody) {
		lines[lines.length - 1] += ' \\';
		lines.push(`  -H "Content-Type: application/json" \\`);
		lines.push(`  -d '${endpoint.requestBody.example}'`);
	}

	return lines.join('\n');
}

function generatePython(endpoint: ApiEndpoint, baseUrl: string): string {
	const lines: string[] = [];
	const url = `{profilarr_url}${baseUrl}${endpoint.path}`;
	const method = endpoint.method.toLowerCase();

	lines.push('import requests');
	lines.push('');
	lines.push('profilarr_url = "http://localhost:6868"');
	lines.push('');
	lines.push(`response = requests.${method}(`);
	lines.push(`    "${url}",`);
	lines.push('    headers={"X-Api-Key": API_KEY},');

	if (endpoint.requestBody) {
		lines.push(`    json=${pythonDict(endpoint.requestBody.example)},`);
	}

	lines.push(')');
	lines.push('');
	lines.push('print(response.json())');

	return lines.join('\n');
}

function generateJavaScript(endpoint: ApiEndpoint, baseUrl: string): string {
	const lines: string[] = [];
	const url = `\${profilarrUrl}${baseUrl}${endpoint.path}`;

	lines.push('const profilarrUrl = "http://localhost:6868";');
	lines.push('');
	lines.push(`const response = await fetch(\`${url}\`, {`);

	if (endpoint.method !== 'GET') {
		lines.push(`  method: "${endpoint.method}",`);
	}

	lines.push('  headers: {');
	lines.push('    "X-Api-Key": API_KEY,');

	if (endpoint.requestBody) {
		lines.push('    "Content-Type": "application/json",');
	}

	lines.push('  },');

	if (endpoint.requestBody) {
		lines.push(`  body: JSON.stringify(${endpoint.requestBody.example}),`);
	}

	lines.push('});');
	lines.push('');
	lines.push('const data = await response.json();');
	lines.push('console.log(data);');

	return lines.join('\n');
}

function generateCSharp(endpoint: ApiEndpoint, baseUrl: string): string {
	const lines: string[] = [];
	const url = `{profilarrUrl}${baseUrl}${endpoint.path}`;

	lines.push('using var client = new HttpClient();');
	lines.push('');
	lines.push('var profilarrUrl = "http://localhost:6868";');
	lines.push('client.DefaultRequestHeaders.Add("X-Api-Key", apiKey);');
	lines.push('');

	if (endpoint.requestBody) {
		lines.push(`var content = new StringContent(`);
		lines.push(`    ${csharpString(endpoint.requestBody.example)},`);
		lines.push('    System.Text.Encoding.UTF8,');
		lines.push('    "application/json"');
		lines.push(');');
		lines.push('');
		lines.push(`var response = await client.${csharpMethod(endpoint.method)}Async(`);
		lines.push(`    $"${url}",`);
		lines.push('    content');
		lines.push(');');
	} else {
		lines.push(`var response = await client.${csharpMethod(endpoint.method)}Async(`);
		lines.push(`    $"${url}"`);
		lines.push(');');
	}

	lines.push('');
	lines.push('var body = await response.Content.ReadAsStringAsync();');
	lines.push('Console.WriteLine(body);');

	return lines.join('\n');
}

function csharpMethod(method: string): string {
	switch (method) {
		case 'GET':
			return 'Get';
		case 'POST':
			return 'Post';
		case 'PUT':
			return 'Put';
		case 'PATCH':
			return 'Patch';
		case 'DELETE':
			return 'Delete';
		default:
			return 'Send';
	}
}

function csharpString(json: string): string {
	return `@"${json.replace(/"/g, '""')}"`;
}

/** Convert a JSON string to a Python-ish dict representation */
function pythonDict(json: string): string {
	return json
		.replace(/"([^"]+)":/g, '"$1":')
		.replace(/: true/g, ': True')
		.replace(/: false/g, ': False')
		.replace(/: null/g, ': None');
}
