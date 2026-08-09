<script lang="ts">
	import ListPage from '$lib/client/ui/list-page/ListPage.svelte';
	import DateTime from '$lib/client/ui/datetime/DateTime.svelte';
	import type { Column } from '$lib/client/ui/table/types';

	let { data } = $props();

	type Row = (typeof data.articles)[number];

	const columns: Column<Row>[] = [
		{ key: 'title', header: 'Title', sortable: true },
		{ key: 'blurb', header: 'About' },
		{ key: 'created', header: 'Published', sortable: true, width: '10rem' }
	];
</script>

<ListPage
	title="Wiki"
	seoDescription="Background reading for anyone who wants to understand the methodology, not just use the profiles."
	groups={[{ data: data.articles }]}
	{columns}
	href={(row) => `/wiki/${row.slug}`}
	artifactPath="/wiki.md">
	{#snippet description()}
		<p>
			Background reading for anyone who wants to understand the methodology, not just use the
			profiles.
		</p>
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
