<script lang="ts">
	import ListPage from '$lib/client/ui/list-page/ListPage.svelte';
	import Badge from '$lib/client/ui/badge/Badge.svelte';

	let { data } = $props();
</script>

<ListPage
	title="Naming"
	seoDescription="File and folder naming configs for Radarr and Sonarr."
	groups={[{ data: data.configs }]}
	view="cards"
	href={(row) => `/pcd/${data.database}/naming/${row.arrType}/${row.slug}`}>
	{#snippet description()}
		<p>File and folder naming configs for Radarr and Sonarr.</p>
	{/snippet}
	{#snippet card(row)}
		<div class="flex h-full flex-col gap-2">
			<div class="flex items-center justify-between gap-2">
				<p class="font-medium">{row.name}</p>
				<Badge color={row.arrType === 'radarr' ? 'warning' : 'info'}>
					{row.arrType === 'radarr' ? 'Radarr' : 'Sonarr'}
				</Badge>
			</div>
			<div class="flex flex-wrap gap-1.5">
				<Badge variant="subtle">{row.colonReplacement}</Badge>
				{#if row.multiEpisode}
					<Badge variant="subtle">{row.multiEpisode}</Badge>
				{/if}
			</div>
		</div>
	{/snippet}
</ListPage>
