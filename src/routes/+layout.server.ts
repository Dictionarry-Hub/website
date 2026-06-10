export const prerender = true;

interface ArticleMeta {
	title: string;
	slug: string;
	created: string;
}

interface PcdNavEntry {
	name: string;
	arrType: string;
}

interface PcdNavIndex {
	[databaseId: string]: {
		customFormats: string[];
		qualityProfiles: string[];
		regularExpressions: string[];
		delayProfiles: string[];
		naming: PcdNavEntry[];
		mediaSettings: PcdNavEntry[];
		qualityDefinitions: PcdNavEntry[];
	};
}

function articleNav(files: Record<string, { metadata: ArticleMeta }>, base: string) {
	return Object.entries(files)
		.map(([path, module]) => {
			const slug = path.split('/').at(-2)!;
			return {
				title: module.metadata.title,
				href: `${base}/${slug}`,
				created: module.metadata.created
			};
		})
		.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
}

export async function load() {
	const devLogFiles = import.meta.glob<{ metadata: ArticleMeta }>(
		'/src/routes/dev-logs/**/+page.svx',
		{ eager: true }
	);
	const wikiFiles = import.meta.glob<{ metadata: ArticleMeta }>('/src/routes/wiki/**/+page.svx', {
		eager: true
	});

	const devLogs = articleNav(devLogFiles, '/dev-logs');
	const wiki = articleNav(wikiFiles, '/wiki');

	const pcdNavFiles = import.meta.glob<{ default: PcdNavIndex }>('/src/lib/data/pcd/index.json', {
		eager: true
	});
	const pcdNav: PcdNavIndex = Object.values(pcdNavFiles)[0]?.default ?? {};

	return { devLogs, wiki, pcdNav };
}
