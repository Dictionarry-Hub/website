<script lang="ts">
	import ListPage from '$lib/client/ui/list-page/ListPage.svelte';
	import type { Column } from '$lib/client/ui/table/types';

	let { data } = $props();

	type Row = (typeof data.groups)[number]['data'][number];

	const columns: Column<Row>[] = [
		{ key: 'name', header: 'Name', sortable: true },
		{ key: 'propersRepacks', header: 'Propers & Repacks', width: '12rem' },
		{ key: 'mediaInfo', header: 'Media Info', width: '8rem' }
	];
</script>

<ListPage
	title="Media Settings"
	seoDescription="Media management settings: propers, repacks, and media info handling in Radarr and Sonarr."
	groups={data.groups}
	{columns}
	href={(row) => `/pcd/${data.database}/media-settings/${row.arrType}/${row.slug}`}>
	{#snippet description()}
		<p>Propers, repacks, and media info handling in Radarr and Sonarr.</p>
	{/snippet}
	{#snippet card(row)}
		<div class="flex h-full flex-col gap-1">
			<p class="font-medium">{row.name}</p>
			<p class="text-sm text-text-soft">Propers &amp; Repacks: {row.propersRepacks}</p>
			<p class="text-sm text-text-soft">Media Info: {row.mediaInfo}</p>
		</div>
	{/snippet}
</ListPage>
