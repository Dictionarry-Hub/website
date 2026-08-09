<script lang="ts">
	import ListPage from '$lib/client/ui/list-page/ListPage.svelte';
	import Badge from '$lib/client/ui/badge/Badge.svelte';

	let { data } = $props();
</script>

<ListPage
	title="Quality Definitions"
	seoDescription="Quality definition configs: size boundaries for each quality in Radarr and Sonarr."
	groups={[{ data: data.configs }]}
	view="cards"
	href={(row) => `/pcd/${data.database}/quality-definitions/${row.arrType}/${row.slug}`}>
	{#snippet description()}
		<p>Size boundaries for each quality in Radarr and Sonarr.</p>
	{/snippet}
	{#snippet card(row)}
		<div class="flex h-full flex-col gap-2">
			<div class="flex items-center justify-between gap-2">
				<p class="font-medium">{row.name}</p>
				<Badge color={row.arrType === 'radarr' ? 'warning' : 'info'}>
					{row.arrType === 'radarr' ? 'Radarr' : 'Sonarr'}
				</Badge>
			</div>
		</div>
	{/snippet}
</ListPage>
