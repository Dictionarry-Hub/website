import { stringify } from 'yaml';

export function stringifyYaml(value: unknown): string {
	return stringify(value, {
		indent: 2,
		lineWidth: 0,
		blockQuote: 'literal'
	});
}
