import type { LintRule } from '../types.js';

const rule: LintRule = {
	name: 'require-seo',
	description: 'Every +page.svelte must import and use the SEO component',
	category: 'seo',
	severity: 'error',
	files: 'src/routes/**/+page.svelte',
	check(files) {
		const violations = [];

		for (const file of files) {
			const hasImport = file.content.includes("from '$lib/client/ui/utils/SEO.svelte'");
			const hasUsage = file.content.includes('<SEO');

			if (!hasImport || !hasUsage) {
				violations.push({
					rule: this.name,
					file: file.path,
					message: 'Missing SEO component. Every page must import and use <SEO />.'
				});
			}
		}

		return violations;
	}
};

export default rule;
