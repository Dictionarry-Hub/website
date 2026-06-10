import { SITE_URL } from './site.js';

export type Assistant = 'claude' | 'chatgpt';

export const DEFAULT_PROMPT = 'Read {url} so I can ask questions about it.';

/**
 * Build a deep link that opens an assistant with a prompt referencing a page.
 * Links carry a prompt, never content (URL prompt payloads cap around 14k
 * characters). Claude is pointed at the markdown artifact; ChatGPT at the
 * HTML page, which its fetcher handles better.
 *
 * The prompt template's `{url}` token is replaced per assistant. These URL
 * formats are owned by the receiving apps and undocumented; verified working
 * as of June 2026.
 */
export function assistantLink(
	assistant: Assistant,
	paths: { artifactPath: string; pagePath: string },
	promptTemplate: string = DEFAULT_PROMPT
): string {
	const url =
		assistant === 'claude'
			? `${SITE_URL}${paths.artifactPath}`
			: `${SITE_URL}${paths.pagePath}`;
	const q = encodeURIComponent(promptTemplate.replace('{url}', url));

	return assistant === 'claude'
		? `https://claude.ai/new?q=${q}`
		: `https://chatgpt.com/?hints=search&q=${q}`;
}
