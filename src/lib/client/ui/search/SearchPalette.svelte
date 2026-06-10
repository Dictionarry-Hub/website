<script lang="ts">
	import { goto } from '$app/navigation';
	import { Search } from '@lucide/svelte';
	import Badge from '$lib/client/ui/badge/Badge.svelte';
	import Dialog from '$lib/client/ui/dialog/Dialog.svelte';
	import Kbd from '$lib/client/ui/kbd/Kbd.svelte';
	import { popular, search, type SearchResult } from '$lib/client/search';
	import { SEARCH } from '$lib/client/search/constants';
	import { loadSearchIndex, type LoadedSearch } from '$lib/client/search/load';
	import { recordClick } from '$lib/client/search/clicks';
	import type { SearchEntryType } from '$lib/shared/utils/search/types';

	interface Props {
		/** Bindable. Also toggled globally by Ctrl+K / Cmd+K. */
		open?: boolean;
		/** Active database id; scopes which index is loaded. */
		database: string;
	}

	let { open = $bindable(false), database }: Props = $props();

	const POPULAR_LIMIT = 8;

	type BadgeColor = 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info';

	const TYPE_BADGES: Record<SearchEntryType, { label: string; color: BadgeColor }> = {
		'doc': { label: 'Docs', color: 'info' },
		'dev-log': { label: 'Dev Log', color: 'success' },
		'wiki': { label: 'Wiki', color: 'info' },
		'api-endpoint': { label: 'API', color: 'neutral' },
		'quality-profile': { label: 'Profile', color: 'accent' },
		'custom-format': { label: 'Format', color: 'info' },
		'regular-expression': { label: 'Regex', color: 'warning' },
		'delay-profile': { label: 'Delay', color: 'neutral' },
		'naming': { label: 'Naming', color: 'neutral' },
		'media-settings': { label: 'Media', color: 'neutral' },
		'quality-definitions': { label: 'Quality', color: 'neutral' }
	};

	let query = $state('');
	let selected = $state(0);
	let loaded = $state<LoadedSearch | null>(null);
	let loadFailed = $state(false);
	let listEl: HTMLElement | undefined = $state();

	const isPopular = $derived(query.trim() === '');

	const results = $derived.by((): SearchResult[] => {
		if (!loaded) return [];
		return isPopular
			? popular(loaded.index, POPULAR_LIMIT)
			: search(loaded.index, query, { queryRatings: loaded.queryRatings });
	});

	// Load (or reload on database switch) while open. The stale flag guards
	// against an older fetch resolving after a database change.
	$effect(() => {
		if (!open) return;
		const target = database;
		let stale = false;
		loadSearchIndex(target)
			.then((result) => {
				if (stale) return;
				loaded = result;
				loadFailed = false;
			})
			.catch(() => {
				if (!stale) loadFailed = true;
			});
		return () => {
			stale = true;
		};
	});

	// Fresh slate every open.
	$effect(() => {
		if (open) {
			query = '';
			selected = 0;
		}
	});

	// Keep the selected row in view while arrowing through a long list.
	$effect(() => {
		const row = listEl?.querySelector(`[data-index="${selected}"]`);
		row?.scrollIntoView({ block: 'nearest' });
	});

	function activate(result: SearchResult) {
		// Battles record a fixed prefix, not the scrollable display list, so
		// they are identical-sized on every device. A deeper click appends
		// the clicked route: it beat everything ranked above it.
		const shown = results.slice(0, SEARCH.SHOWN_RECORD_LIMIT).map((r) => r.entry.url);
		if (!shown.includes(result.entry.url)) shown.push(result.entry.url);

		recordClick({
			query: query.trim(),
			clicked: result.entry.url,
			shown
		});
		open = false;
		goto(result.entry.url);
	}

	function onInputKeydown(event: KeyboardEvent) {
		if (results.length === 0) return;
		if (event.key === 'ArrowDown') {
			event.preventDefault();
			selected = (selected + 1) % results.length;
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			selected = (selected - 1 + results.length) % results.length;
		} else if (event.key === 'Enter') {
			event.preventDefault();
			activate(results[selected]);
		}
	}

	function onWindowKeydown(event: KeyboardEvent) {
		if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
			event.preventDefault();
			open = !open;
		}
	}
</script>

<svelte:window onkeydown={onWindowKeydown} />

<Dialog
	bind:open
	ariaLabel="Search"
	class="mt-[12svh] mb-auto max-h-[60svh] w-full max-w-xl">
	{#snippet header()}
		<div class="flex items-center gap-3 px-4 py-3">
			<Search
				size={18}
				class="shrink-0 text-text-muted" />
			<!-- 16px+ font so iOS does not zoom the dialog on focus -->
			<input
				type="text"
				placeholder="Search the docs, PCD entities, dev logs..."
				aria-label="Search"
				class="w-full bg-transparent text-base text-text outline-none placeholder:text-text-muted"
				bind:value={query}
				oninput={() => (selected = 0)}
				onkeydown={onInputKeydown} />
		</div>
	{/snippet}

	<div bind:this={listEl}>
		{#if loadFailed}
			<p class="px-4 py-10 text-center text-sm text-text-muted">
				The search index failed to load.
			</p>
		{:else if !loaded}
			<p class="px-4 py-10 text-center text-sm text-text-muted">Loading index...</p>
		{:else if results.length === 0}
			<p class="px-4 py-10 text-center text-sm text-text-muted">
				No results for "{query}".
			</p>
		{:else}
			{#if isPopular}
				<div
					class="px-4 pt-3 pb-1 text-xs font-semibold tracking-wide text-text-muted uppercase">
					Popular
				</div>
			{/if}
			<ul
				role="listbox"
				aria-label="Search results"
				class="p-2">
				{#each results as result, i (result.entry.url)}
					<li
						role="option"
						aria-selected={i === selected}>
						<button
							type="button"
							data-index={i}
							class="flex w-full cursor-pointer items-center gap-3 rounded-control px-3 py-2 text-left {i ===
							selected
								? 'bg-surface-hover'
								: ''}"
							onclick={() => activate(result)}
							onmousemove={() => (selected = i)}>
							<span class="min-w-0 flex-1">
								<span class="block truncate text-sm font-medium text-text">
									{result.entry.title}
								</span>
								{#if result.entry.blurb}
									<span class="block truncate text-xs text-text-muted">
										{result.entry.blurb}
									</span>
								{/if}
							</span>
							<Badge
								variant="subtle"
								color={TYPE_BADGES[result.entry.type].color}>
								{TYPE_BADGES[result.entry.type].label}
							</Badge>
						</button>
					</li>
				{/each}
			</ul>
		{/if}
	</div>

	{#snippet footer()}
		<div class="flex items-center gap-4 px-4 py-2 text-xs text-text-muted">
			<span class="flex items-center gap-1.5"><Kbd>↑↓</Kbd> navigate</span>
			<span class="flex items-center gap-1.5"><Kbd>↵</Kbd> open</span>
			<span class="flex items-center gap-1.5"><Kbd>esc</Kbd> close</span>
		</div>
	{/snippet}
</Dialog>
