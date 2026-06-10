import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { LintRule, Violation } from '../types.js';

// Exempt/pending routes live in tooling/lint/md-mirror.json so they can be
// edited without touching code. Entry syntax: an exact route ("/dev/ui"), or
// a route ending in "/*" which matches everything beneath it ("/pcd/*").
// "exempt" is permanent policy, "pending" is debt that shrinks to empty as
// mirror layers land. See docs/backend/llm.md.
const CONFIG_PATH = resolve(import.meta.dirname, '../md-mirror.json');

interface MirrorEntry {
	route: string;
	reason: string;
}

interface MirrorConfig {
	exempt: MirrorEntry[];
	pending: MirrorEntry[];
}

function loadConfig(): MirrorConfig | string {
	let parsed: unknown;

	try {
		parsed = JSON.parse(readFileSync(CONFIG_PATH, 'utf-8'));
	} catch (e) {
		return `Cannot read config: ${e instanceof Error ? e.message : String(e)}`;
	}

	if (typeof parsed !== 'object' || parsed === null) return 'Config must be a JSON object.';

	for (const key of ['exempt', 'pending']) {
		const list = (parsed as Record<string, unknown>)[key];
		if (!Array.isArray(list)) return `Config key "${key}" must be an array.`;

		for (const entry of list) {
			if (
				typeof entry !== 'object' ||
				entry === null ||
				typeof (entry as Record<string, unknown>).route !== 'string' ||
				typeof (entry as Record<string, unknown>).reason !== 'string'
			) {
				return `Every "${key}" entry must be an object with string "route" and "reason" fields.`;
			}

			const route = (entry as MirrorEntry).route;
			if (!route.startsWith('/')) return `Route "${route}" must start with "/".`;
		}
	}

	return parsed as MirrorConfig;
}

// build/index.html -> "/", build/api/v1.html -> "/api/v1"
function htmlToRoute(path: string): string {
	const route = '/' + path.replace(/^build\//, '').replace(/\.html$/, '');
	return route === '/index' ? '/' : route;
}

function matches(route: string, entry: MirrorEntry): boolean {
	if (entry.route.endsWith('/*')) {
		const prefix = entry.route.slice(0, -2);
		return route === prefix || route.startsWith(prefix + '/');
	}
	return route === entry.route;
}

const rule: LintRule = {
	name: 'require-md-mirror',
	description: 'Every built page must have a sibling markdown mirror for LLM consumption',
	category: 'llm',
	severity: 'error',
	files: 'build/**/*.{html,md}',
	check(files) {
		const config = loadConfig();

		if (typeof config === 'string') {
			return [{ rule: this.name, file: 'tooling/lint/md-mirror.json', message: config }];
		}

		const skipped = [...config.exempt, ...config.pending];
		const violations: Violation[] = [];
		const mdPaths = new Set(files.filter((f) => f.path.endsWith('.md')).map((f) => f.path));
		const htmlFiles = files.filter((f) => f.path.endsWith('.html'));

		for (const file of htmlFiles) {
			const route = htmlToRoute(file.path);
			if (skipped.some((entry) => matches(route, entry))) continue;

			const mirror = file.path.replace(/\.html$/, '.md');

			if (!mdPaths.has(mirror)) {
				violations.push({
					rule: this.name,
					file: file.path,
					message: `Missing markdown mirror: expected ${mirror}. See docs/backend/llm.md.`
				});
			}
		}

		return violations;
	}
};

export default rule;
