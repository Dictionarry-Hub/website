export const prerender = true;

interface DevLogMeta {
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

export async function load() {
	const devLogFiles = import.meta.glob<{ metadata: DevLogMeta }>(
		'/src/routes/dev-logs/**/+page.svx',
		{ eager: true }
	);

	const devLogs = Object.entries(devLogFiles)
		.map(([path, module]) => {
			const slug = path.split('/').at(-2)!;
			return {
				title: module.metadata.title,
				href: `/dev-logs/${slug}`,
				created: module.metadata.created
			};
		})
		.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());

	const pcdNavFiles = import.meta.glob<{ default: PcdNavIndex }>('/src/lib/data/pcd/index.json', {
		eager: true
	});
	const pcdNav: PcdNavIndex = Object.values(pcdNavFiles)[0]?.default ?? {};

	return { devLogs, pcdNav };
}
