import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { LintRule, Violation } from '../types.js';

const CONFIG_PATH = resolve(import.meta.dirname, '../yaml-artifacts.json');

interface YamlArtifactConfig {
	requiredEntityTypes: string[];
}

function loadConfig(): YamlArtifactConfig | string {
	let parsed: unknown;

	try {
		parsed = JSON.parse(readFileSync(CONFIG_PATH, 'utf-8'));
	} catch (e) {
		return `Cannot read config: ${e instanceof Error ? e.message : String(e)}`;
	}

	if (typeof parsed !== 'object' || parsed === null) return 'Config must be a JSON object.';

	const required = (parsed as Record<string, unknown>).requiredEntityTypes;
	if (!Array.isArray(required)) return 'Config key "requiredEntityTypes" must be an array.';
	if (
		required.some(
			(entityType) => typeof entityType !== 'string' || !/^[a-z0-9-]+$/.test(entityType)
		)
	) {
		return 'Every required entity type must be a lowercase route segment.';
	}

	return { requiredEntityTypes: required as string[] };
}

const rule: LintRule = {
	name: 'require-yaml-artifact',
	description: 'Supported PCD entity detail pages must have a sibling YAML artifact',
	category: 'exports',
	severity: 'error',
	files: 'build/pcd/**/*.{html,yaml}',
	check(files) {
		const config = loadConfig();

		if (typeof config === 'string') {
			return [{ rule: this.name, file: 'tooling/lint/yaml-artifacts.json', message: config }];
		}

		const required = new Set(config.requiredEntityTypes);
		const yamlPaths = new Set(
			files.filter((file) => file.path.endsWith('.yaml')).map((file) => file.path)
		);
		const violations: Violation[] = [];

		for (const file of files) {
			if (!file.path.endsWith('.html')) continue;

			const match = file.path.match(/^build\/pcd\/[^/]+\/([^/]+)\/.+\.html$/);
			if (!match || !required.has(match[1])) continue;

			const artifact = file.path.replace(/\.html$/, '.yaml');
			if (!yamlPaths.has(artifact)) {
				violations.push({
					rule: this.name,
					file: file.path,
					message: `Missing YAML artifact: expected ${artifact}. See docs/backend/exports.md.`
				});
			}
		}

		return violations;
	}
};

export default rule;
