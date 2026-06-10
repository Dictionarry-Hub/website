import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { LintRule, FileEntry, Violation } from '../types.js';

// Cross-file consistency for the theme system. A theme is three artifacts
// that must agree: its CSS file (src/styles/themes/<id>.css), its registry
// entry (themes.ts), and its @import (layout.css). Beyond presence, every
// theme CSS must define the complete token contract, with light.css as the
// canonical set: a missing token silently inherits from :root and produces
// a 95%-right theme. See docs/frontend/ui.md.

const ROOT = resolve(import.meta.dirname, '../../..');
const REGISTRY_PATH = 'src/lib/client/ui/theme/themes.ts';
const LAYOUT_CSS_PATH = 'src/routes/layout.css';
const CANONICAL = 'light';

const TOKEN_RE = /--theme-[a-z0-9-]+(?=\s*:)/g;
const REGISTRY_ID_RE = /id:\s*'([^']+)'/g;
const IMPORT_RE = /@import\s+'\.\.\/styles\/themes\/([a-z0-9-]+)\.css'/g;

function themeId(path: string): string {
	return path.replace(/^.*\//, '').replace(/\.css$/, '');
}

function tokensOf(content: string): Set<string> {
	return new Set(content.match(TOKEN_RE) ?? []);
}

function matchAll(content: string, re: RegExp): Set<string> {
	return new Set([...content.matchAll(re)].map((m) => m[1]));
}

const rule: LintRule = {
	name: 'theme-sync',
	description: 'Theme CSS files, the theme registry, and layout.css imports must agree',
	category: 'ui',
	severity: 'error',
	files: 'src/styles/themes/*.css',

	check(files: FileEntry[]): Violation[] {
		const violations: Violation[] = [];
		const fail = (file: string, message: string) =>
			violations.push({ rule: this.name, file, message });

		let registrySource: string;
		let layoutSource: string;
		try {
			registrySource = readFileSync(resolve(ROOT, REGISTRY_PATH), 'utf-8');
			layoutSource = readFileSync(resolve(ROOT, LAYOUT_CSS_PATH), 'utf-8');
		} catch (e) {
			fail(REGISTRY_PATH, `Cannot read theme wiring: ${e instanceof Error ? e.message : e}`);
			return violations;
		}

		const registryIds = matchAll(registrySource, REGISTRY_ID_RE);
		registryIds.delete('system'); // meta-theme, no CSS file
		const importIds = matchAll(layoutSource, IMPORT_RE);
		const cssIds = new Set(files.map((f) => themeId(f.path)));

		const canonical = files.find((f) => themeId(f.path) === CANONICAL);
		if (!canonical) {
			fail(`src/styles/themes/${CANONICAL}.css`, 'Canonical theme file is missing.');
			return violations;
		}
		const canonicalTokens = tokensOf(canonical.content);

		for (const file of files) {
			const id = themeId(file.path);

			// Selector: light is :root, everything else is [data-theme='<id>'].
			const selector = id === CANONICAL ? ':root' : `[data-theme='${id}']`;
			if (!file.content.includes(selector)) {
				fail(file.path, `Missing selector ${selector}.`);
			}

			if (!/color-scheme:\s*(light|dark)/.test(file.content)) {
				fail(file.path, 'Missing color-scheme declaration (light or dark).');
			}

			if (!registryIds.has(id)) {
				fail(file.path, `Not registered in ${REGISTRY_PATH}.`);
			}
			if (!importIds.has(id)) {
				fail(file.path, `Not imported in ${LAYOUT_CSS_PATH}.`);
			}

			if (id === CANONICAL) continue;
			const tokens = tokensOf(file.content);
			const missing = [...canonicalTokens].filter((t) => !tokens.has(t));
			const extra = [...tokens].filter((t) => !canonicalTokens.has(t));
			if (missing.length > 0) {
				fail(
					file.path,
					`Missing ${missing.length} token(s) from the contract: ${missing.join(', ')}.`
				);
			}
			if (extra.length > 0) {
				fail(
					file.path,
					`Token(s) not in the contract (add to light.css or remove): ${extra.join(', ')}.`
				);
			}
		}

		for (const id of registryIds) {
			if (!cssIds.has(id)) {
				fail(
					REGISTRY_PATH,
					`Theme '${id}' is registered but src/styles/themes/${id}.css does not exist.`
				);
			}
		}
		for (const id of importIds) {
			if (!cssIds.has(id)) {
				fail(LAYOUT_CSS_PATH, `Imports themes/${id}.css which does not exist.`);
			}
		}

		return violations;
	}
};

export default rule;
