import type { LintRule } from '../types.js';

const rule: LintRule = {
	name: 'require-seo',
	description: 'Every +page.svelte must render SEO directly or through an approved composition',
	category: 'seo',
	severity: 'error',
	files: 'src/routes/**/+page.svelte',
	check(files) {
		const violations = [];

		for (const file of files) {
			const hasDirectSeo =
				file.content.includes("from '$lib/client/ui/utils/SEO.svelte'") &&
				file.content.includes('<SEO');
			const hasListPageSeo =
				file.content.includes("from '$lib/client/ui/list-page/ListPage.svelte'") &&
				file.content.includes('<ListPage');

			if (!hasDirectSeo && !hasListPageSeo) {
				violations.push({
					rule: this.name,
					file: file.path,
					message: 'Missing SEO. Render <SEO /> directly or through <ListPage />.'
				});
			}
		}

		return violations;
	}
};

export default rule;
