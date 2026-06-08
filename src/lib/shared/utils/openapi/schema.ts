// Generates example JSON objects from OpenAPI schema definitions.
// Walks properties recursively to produce representative placeholder values.

interface SchemaNode {
	type?: string;
	properties?: Record<string, SchemaNode>;
	required?: string[];
	items?: SchemaNode;
	enum?: unknown[];
	nullable?: boolean;
	example?: unknown;
	format?: string;
	default?: unknown;
	oneOf?: SchemaNode[];
	description?: string;
}

const MAX_DEPTH = 6;

function exampleForType(schema: SchemaNode): unknown {
	if (schema.example !== undefined) return schema.example;
	if (schema.default !== undefined) return schema.default;
	if (schema.enum && schema.enum.length > 0) return schema.enum[0];

	switch (schema.type) {
		case 'string':
			if (schema.format === 'date-time') return '2026-01-01T00:00:00Z';
			if (schema.format === 'uuid') return '550e8400-e29b-41d4-a716-446655440000';
			if (schema.format === 'uri' || schema.format === 'url') return 'https://example.com';
			return 'string';
		case 'integer':
			return 0;
		case 'number':
			return 0.0;
		case 'boolean':
			return false;
		case 'null':
			return null;
		default:
			return 'string';
	}
}

export function generateExample(schema: SchemaNode, depth = 0): unknown {
	if (depth >= MAX_DEPTH) return '...';

	// Handle oneOf: pick the first non-null option
	if (schema.oneOf) {
		const nonNull = schema.oneOf.find((s) => s.type !== 'null');
		if (nonNull) return generateExample(nonNull, depth);
		return null;
	}

	if (schema.type === 'array') {
		const itemExample = schema.items ? generateExample(schema.items, depth + 1) : 'string';
		return [itemExample];
	}

	if (schema.type === 'object' && schema.properties) {
		const obj: Record<string, unknown> = {};
		for (const [key, prop] of Object.entries(schema.properties)) {
			obj[key] = generateExample(prop, depth + 1);
		}
		return obj;
	}

	if (schema.nullable) return null;

	return exampleForType(schema);
}

export function schemaToTypeString(schema: SchemaNode): string {
	if (schema.enum) {
		return schema.enum.map((v) => JSON.stringify(v)).join(' | ');
	}

	if (schema.oneOf) {
		return schema.oneOf.map((s) => schemaToTypeString(s)).join(' | ');
	}

	if (schema.type === 'array' && schema.items) {
		return `${schemaToTypeString(schema.items)}[]`;
	}

	if (schema.type === 'object') return 'object';

	const base = schema.type ?? 'unknown';
	if (schema.nullable) return `${base} | null`;
	return base;
}
