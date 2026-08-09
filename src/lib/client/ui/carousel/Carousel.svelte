<script
	lang="ts"
	generics="T">
	import Button from '$lib/client/ui/button/Button.svelte';
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		items: T[];
		item: Snippet<[item: T]>;
		label?: string;
		itemClass?: string;
	}

	let { items, item, label = 'Carousel', itemClass = '' }: Props = $props();

	let viewport: HTMLDivElement | undefined = $state();
	let canPrev = $state(false);
	let canNext = $state(false);

	function updateControls() {
		if (!viewport) return;
		canPrev = viewport.scrollLeft > 0;
		canNext = viewport.scrollLeft + viewport.clientWidth < viewport.scrollWidth - 1;
	}

	function scrollByPage(direction: 1 | -1) {
		viewport?.scrollBy({ left: direction * viewport.clientWidth });
	}

	$effect(() => {
		void items;
		updateControls();
	});
</script>

<svelte:window onresize={updateControls} />

<section
	aria-label={label}
	class="relative">
	{#if canPrev || canNext}
		<div class="mb-2 flex justify-end gap-1">
			<Button
				type="button"
				variant="ghost"
				size="sm"
				icon={ChevronLeft}
				aria-label="Previous"
				disabled={!canPrev}
				onclick={() => scrollByPage(-1)} />
			<Button
				type="button"
				variant="ghost"
				size="sm"
				icon={ChevronRight}
				aria-label="Next"
				disabled={!canNext}
				onclick={() => scrollByPage(1)} />
		</div>
	{/if}
	<div
		bind:this={viewport}
		onscroll={updateControls}
		class="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 motion-safe:scroll-smooth">
		{#each items as entry, i (i)}
			<div class="shrink-0 snap-start {itemClass}">
				{@render item(entry)}
			</div>
		{/each}
	</div>
</section>
