import { readFileSync, globSync } from 'node:fs';
import { resolve, relative } from 'node:path';
import type { LintRule, Violation, FileEntry } from './types.js';

import requireSeo from './rules/require-seo.js';
import noRawUi from './rules/no-raw-ui.js';
import noRawTokens from './rules/no-raw-tokens.js';
import requireMdMirror from './rules/require-md-mirror.js';
import requireYamlArtifact from './rules/require-yaml-artifact.js';
import themeSync from './rules/theme-sync.js';

const rules: LintRule[] = [
	requireSeo,
	noRawUi,
	noRawTokens,
	requireMdMirror,
	requireYamlArtifact,
	themeSync
];

function run(): void {
	const root = resolve(import.meta.dirname, '../..');
	const category = parseCategory();
	const filtered = category ? rules.filter((r) => r.category === category) : rules;

	if (filtered.length === 0) {
		console.error(`No rules found for category: ${category}`);
		process.exit(1);
	}

	const violations: Violation[] = [];

	for (const rule of filtered) {
		const paths = globSync(rule.files, { cwd: root }) as string[];
		const files: FileEntry[] = paths.map((p) => ({
			path: relative(root, resolve(root, p)),
			content: readFileSync(resolve(root, p), 'utf-8')
		}));

		if (files.length === 0) continue;

		violations.push(...rule.check(files));
	}

	if (violations.length === 0) {
		console.log(category ? `All ${category} rules passed.` : 'All lint rules passed.');
		process.exit(0);
	}

	let hasError = false;

	for (const v of violations) {
		const severity = filtered.find((r) => r.name === v.rule)?.severity ?? 'error';
		const icon = severity === 'error' ? '✘' : '⚠️';
		const location =
			v.line && v.column
				? `${v.file}:${v.line}:${v.column}`
				: v.line
					? `${v.file}:${v.line}`
					: v.file;

		console.error(`  ${icon}  ${v.rule} (${location})`);
		console.error(`     ${v.message}`);

		if (severity === 'error') hasError = true;
	}

	console.error(`\n${violations.length} violation(s) found.`);
	process.exit(hasError ? 1 : 0);
}

function parseCategory(): string | undefined {
	const args = process.argv.slice(2);
	const idx = args.indexOf('--category');
	if (idx !== -1 && args[idx + 1]) return args[idx + 1];
	return undefined;
}

run();
