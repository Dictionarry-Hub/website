<script
	lang="ts"
	generics="T extends Record<string, unknown>">
	import Card from '$lib/client/ui/card/Card.svelte';
	import Table from '$lib/client/ui/table/Table.svelte';
	import type { Snippet } from 'svelte';
	import type { Column } from '$lib/client/ui/table/types';

	interface Props {
		data: T[];
		columns: Column<T>[];
		href?: (row: T) => string | undefined;
		cell?: Snippet<[row: T, column: Column<T>]>;
		card: Snippet<[row: T]>;
		expanded?: Snippet<[row: T]>;
	}

	let { data, columns, href, cell, card, expanded }: Props = $props();
</script>

<!-- Table view (lg+) -->
<div class="hidden lg:block">
	<Table
		{data}
		{columns}
		{href}
		{cell}
		{expanded} />
</div>

<!-- Card view (below lg) -->
<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:hidden">
	{#each data as row, i (i)}
		{#if href?.(row)}
			<a
				href={href!(row)!}
				class="block">
				<Card class="h-full transition-colors hover:bg-surface-hover">
					{@render card(row)}
				</Card>
			</a>
		{:else}
			<Card class="h-full">
				{@render card(row)}
			</Card>
		{/if}
	{/each}
</div>
