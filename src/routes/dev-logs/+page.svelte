<script lang="ts">
	import ListPage from '$lib/client/ui/list-page/ListPage.svelte';
	import DateTime from '$lib/client/ui/datetime/DateTime.svelte';
	import type { Column } from '$lib/client/ui/table/types';

	let { data } = $props();

	type Row = (typeof data.logs)[number];

	const columns: Column<Row>[] = [
		{ key: 'title', header: 'Title', sortable: true },
		{ key: 'blurb', header: 'About' },
		{ key: 'created', header: 'Published', sortable: true, width: '10rem' }
	];
</script>

<ListPage
	title="Dev Logs"
	seoDescription="A running record of how Profilarr gets built, written as it happens."
	groups={[{ data: data.logs }]}
	{columns}
	href={(row) => `/dev-logs/${row.slug}`}
	artifactPath="/dev-logs.md">
	{#snippet description()}
		<p>A running record of how Profilarr gets built, written as it happens.</p>
	{/snippet}
	{#snippet cell(row, column)}
		{#if column.key === 'created'}
			<DateTime date={row.created} />
		{:else}
			{row[column.key]}
		{/if}
	{/snippet}
	{#snippet card(row)}
		<div class="flex h-full flex-col gap-2">
			<p class="font-medium">{row.title}</p>
			{#if row.blurb}
				<p class="text-sm text-text-soft">{row.blurb}</p>
			{/if}
			<div class="mt-auto pt-1">
				<span class="text-sm text-text-muted"><DateTime date={row.created} /></span>
			</div>
		</div>
	{/snippet}
</ListPage>
