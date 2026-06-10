/** Join markdown blocks with blank lines, dropping empty ones. */
export function join(blocks: (string | null)[]): string {
	return blocks
		.map((block) => block?.trim() ?? '')
		.filter((block) => block !== '')
		.join('\n\n');
}

export function fence(language: string, code: string): string {
	return `\`\`\`${language}\n${code.trim()}\n\`\`\``;
}
