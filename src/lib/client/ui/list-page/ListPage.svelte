<script
	lang="ts"
	generics="T extends Record<string, unknown>">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import SEO from '$lib/client/ui/utils/SEO.svelte';
	import PageHeader from '$lib/client/ui/header/PageHeader.svelte';
	import AiMenu from '$lib/client/ui/ai-menu/AiMenu.svelte';
	import AdaptiveList from '$lib/client/ui/adaptive-list/AdaptiveList.svelte';
	import Carousel from '$lib/client/ui/carousel/Carousel.svelte';
	import Card from '$lib/client/ui/card/Card.svelte';
	import type { Snippet } from 'svelte';
	import type { Column } from '$lib/client/ui/table/types';
	import type { ListGroup } from './types';

	interface Props {
		title: string;
		seoDescription?: string;
		description?: Snippet;
		groups: ListGroup<T>[];
		columns?: Column<T>[];
		view?: 'adaptive' | 'cards';
		href?: (row: T) => string | undefined;
		cell?: Snippet<[row: T, column: Column<T>]>;
		card: Snippet<[row: T]>;
		artifactPath?: string;
		carousel?: number;
		carouselCard?: Snippet<[row: T]>;
	}

	let {
		title,
		seoDescription,
		description,
		groups,
		columns,
		view,
		href,
		cell,
		card,
		artifactPath,
		carousel,
		carouselCard
	}: Props = $props();

	const pool = $derived(groups.flatMap((group) => group.data));

	// SSG HTML carries the first N entries; the random pick happens after
	// hydration so the pre-rendered markup never mismatches.
	let shuffled = $state<T[] | undefined>();
	const featured = $derived(carousel ? (shuffled ?? pool.slice(0, carousel)) : []);

	onMount(() => {
		if (!carousel) return;
		const picks = [...pool];
		for (let i = picks.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[picks[i], picks[j]] = [picks[j], picks[i]];
		}
		shuffled = picks.slice(0, carousel);
	});

	function groupId(groupTitle: string) {
		return groupTitle
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-|-$/g, '');
	}
</script>

<SEO
	{title}
	description={seoDescription} />

<PageHeader {title}>
	{#snippet actions()}
		{#if artifactPath}
			<AiMenu
				{artifactPath}
				pagePath={page.url.pathname} />
		{/if}
	{/snippet}
</PageHeader>

{#if description}
	<div class="mb-8 text-text-soft">
		{@render description()}
	</div>
{/if}

{#if featured.length > 0}
	<div class="mb-10">
		<Carousel
			items={featured}
			label="Featured {title}"
			itemClass="w-full">
			{#snippet item(row)}
				{@const url = href?.(row)}
				{#if url}
					<a
						href={url}
						class="block h-full">
						<Card class="h-full transition-colors hover:bg-surface-hover">
							{@render (carouselCard ?? card)(row)}
						</Card>
					</a>
				{:else}
					<Card class="h-full">
						{@render (carouselCard ?? card)(row)}
					</Card>
				{/if}
			{/snippet}
		</Carousel>
	</div>
{/if}

{#each groups as group, i (group.title ?? i)}
	{#if group.data.length > 0}
		<section class="mb-10">
			{#if group.title}
				<h2
					id={groupId(group.title)}
					class="mb-1 border-b border-border-muted pb-2 text-xl font-bold">
					{group.title}
				</h2>
			{/if}
			{#if group.description}
				<p class="mb-4 text-text-soft">{group.description}</p>
			{/if}
			<div class={group.title || group.description ? 'mt-4' : ''}>
				<AdaptiveList
					data={group.data}
					{columns}
					{view}
					{href}
					{cell}
					{card} />
			</div>
		</section>
	{/if}
{/each}
