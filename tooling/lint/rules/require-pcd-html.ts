import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { expectedPcdHtmlRoutes } from '../../../src/lib/shared/utils/pcd/prerender.js';
import type { LintRule } from '../types.js';

const ROOT = resolve(import.meta.dirname, '../../..');

const rule: LintRule = {
	name: 'require-pcd-html',
	description: 'Every expected PCD index and implemented entity route must be prerendered',
	category: 'seo',
	severity: 'error',
	files: 'build/pcd/**/*.html',
	check() {
		return expectedPcdHtmlRoutes().flatMap((route) => {
			const expectedPath = `build${route}.html`;
			if (existsSync(resolve(ROOT, expectedPath))) return [];

			return [
				{
					rule: this.name,
					file: expectedPath,
					message: `Missing prerendered HTML for ${route}.`
				}
			];
		});
	}
};

export default rule;
