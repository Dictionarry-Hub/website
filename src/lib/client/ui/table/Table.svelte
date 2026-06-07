<script lang="ts" generics="T extends Record<string, unknown>">
	import { goto } from '$app/navigation';
	import { ChevronUp, ChevronDown, ChevronRight } from '@lucide/svelte';
	import type { Snippet } from 'svelte';
	import type { Column } from './types';
	import Button from '$lib/client/ui/button/Button.svelte';

	interface Props {
		data: T[];
		columns: Column<T>[];
		href?: (row: T) => string | undefined;
		cell?: Snippet<[row: T, column: Column<T>]>;
		expanded?: Snippet<[row: T]>;
	}

	let { data, columns, href, cell, expanded }: Props = $props();

	let sortKey = $state<string | null>(null);
	let sortDir = $state<'asc' | 'desc'>('asc');
	let expandedRows = $state<Set<number>>(new Set());
	let probeContainer = $state<HTMLElement | null>(null);
	let expandableSet = $state<Set<number>>(new Set());

	function toggleSort(key: string) {
		if (sortKey === key) {
			sortDir = sortDir === 'asc' ? 'desc' : 'asc';
		} else {
			sortKey = key;
			sortDir = 'asc';
		}
	}

	function toggleExpand(index: number) {
		if (!expandableSet.has(index)) return;
		const next = new Set(expandedRows);
		if (next.has(index)) {
			next.delete(index);
		} else {
			next.add(index);
		}
		expandedRows = next;
	}

	const sorted = $derived.by(() => {
		if (!sortKey) return data;
		const key = sortKey;
		const dir = sortDir === 'asc' ? 1 : -1;
		return [...data].sort((a, b) => {
			const av = a[key];
			const bv = b[key];
			if (av == null && bv == null) return 0;
			if (av == null) return 1;
			if (bv == null) return -1;
			if (typeof av === 'string' && typeof bv === 'string') {
				return av.localeCompare(bv) * dir;
			}
			return ((av as number) - (bv as number)) * dir;
		});
	});

	$effect(() => {
		const _rows = sorted;
		if (!probeContainer) return;

		const next = new Set<number>();
		const children = probeContainer.children;
		for (let i = 0; i < _rows.length; i++) {
			if (children[i]?.childElementCount > 0) {
				next.add(i);
			}
		}
		expandableSet = next;
	});

	const colCount = $derived(columns.length + (expanded ? 1 : 0));

	function rowClick(row: T) {
		if (!href) return;
		const url = href(row);
		if (url) goto(url);
	}
</script>

{#if expanded}
	<div class="hidden" bind:this={probeContainer}>
		{#each sorted as row}
			<div>{@render expanded(row)}</div>
		{/each}
	</div>
{/if}

<!-- lint-disable no-raw-ui -->
<div class="overflow-hidden rounded-card border border-border bg-surface-muted shadow-card">
	<table class="w-full border-collapse text-sm">
		<thead>
			<tr class="border-b border-border bg-surface">
				{#each columns as col}
					<th
						class="px-4 py-3 font-medium text-text-muted {col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'} {col.width ?? ''}"
					>
						{#if col.sortable}
							<button
								type="button"
								class="inline-flex items-center gap-1 hover:text-text transition-colors"
								onclick={() => toggleSort(col.key)}
							>
								{col.header}
								{#if sortKey === col.key}
									{#if sortDir === 'asc'}
										<ChevronUp size={14} />
									{:else}
										<ChevronDown size={14} />
									{/if}
								{/if}
							</button>
						{:else}
							{col.header}
						{/if}
					</th>
				{/each}
				{#if expanded}
					<th class="w-8"></th>
				{/if}
			</tr>
		</thead>
		<tbody>
			{#each sorted as row, idx}
				<tr
					class="border-b border-border-subtle last:border-b-0 {href?.(row) ? 'cursor-pointer hover:bg-surface-hover transition-colors' : ''}"
					onclick={() => rowClick(row)}
				>
					{#each columns as col}
						<td class="px-4 py-3 {col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'}">
							{#if cell}
								{@render cell(row, col)}
							{:else}
								{row[col.key] ?? ''}
							{/if}
						</td>
					{/each}
					{#if expanded}
						<td class="px-2 py-3 text-center">
							{#if expandableSet.has(idx)}
								<Button
									type="button"
									variant="ghost"
									size="sm"
									icon={ChevronRight}
									iconClass="transition-transform {expandedRows.has(idx) ? 'rotate-90' : ''}"
									onclick={(e: MouseEvent) => { e.stopPropagation(); toggleExpand(idx); }}
								/>
							{/if}
						</td>
					{/if}
				</tr>
				{#if expanded && expandedRows.has(idx)}
					<tr class="border-b border-border-subtle last:border-b-0">
						<td colspan={colCount} class="bg-surface px-4 py-4">
							{@render expanded(row)}
						</td>
					</tr>
				{/if}
			{/each}
		</tbody>
	</table>
</div>
