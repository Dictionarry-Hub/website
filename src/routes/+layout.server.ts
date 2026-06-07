export const prerender = true;

interface DevLogMeta {
	title: string;
	slug: string;
	created: string;
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

	return { devLogs };
}
