import { createHighlighterCoreSync } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import { createCssVariablesTheme } from 'shiki/core';
import javascript from 'shiki/langs/javascript.mjs';
import typescript from 'shiki/langs/typescript.mjs';
import json from 'shiki/langs/json.mjs';
import yaml from 'shiki/langs/yaml.mjs';
import shellscript from 'shiki/langs/shellscript.mjs';
import python from 'shiki/langs/python.mjs';
import sql from 'shiki/langs/sql.mjs';
import markdown from 'shiki/langs/markdown.mjs';
import jsx from 'shiki/langs/jsx.mjs';
import tsx from 'shiki/langs/tsx.mjs';
import html from 'shiki/langs/html.mjs';
import csharp from 'shiki/langs/csharp.mjs';

const theme = createCssVariablesTheme({
	name: 'css-variables',
	variablePrefix: '--theme-code-',
	fontStyle: true
});

const highlighter = createHighlighterCoreSync({
	themes: [theme],
	langs: [
		javascript,
		typescript,
		json,
		yaml,
		shellscript,
		python,
		sql,
		markdown,
		jsx,
		tsx,
		html,
		csharp
	],
	engine: createJavaScriptRegexEngine()
});

/**
 * Highlight code using Shiki with CSS variable-based theming.
 * Returns the inner HTML of the highlighted code (without the wrapping <pre><code>).
 */
export function highlight(code: string, language: string): string {
	const lang = resolveLanguage(language);
	const html = highlighter.codeToHtml(code, { lang, theme: 'css-variables' });
	return html;
}

/** Map common aliases to Shiki language IDs. */
function resolveLanguage(lang: string): string {
	const aliases: Record<string, string> = {
		'js': 'javascript',
		'ts': 'typescript',
		'sh': 'shellscript',
		'bash': 'shellscript',
		'shell': 'shellscript',
		'zsh': 'shellscript',
		'py': 'python',
		'yml': 'yaml',
		'md': 'markdown',
		'cs': 'csharp',
		'c#': 'csharp'
	};
	return aliases[lang] || lang;
}
