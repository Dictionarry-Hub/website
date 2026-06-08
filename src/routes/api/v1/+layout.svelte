<script lang="ts">
	import TableOfContents from '$lib/client/ui/toc/TableOfContents.svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="relative">
	<article>
		{@render children()}
	</article>

	<div class="toc-float">
		<div class="toc-sticky">
			<TableOfContents />
		</div>
	</div>
</div>

<style>
	.toc-float {
		display: none;
		position: absolute;
		top: 0;
		left: 100%;
		height: 100%;
		margin-left: 2rem;
	}

	.toc-sticky {
		position: fixed;
		top: 2rem;
		max-height: calc(100vh - 4rem);
		overflow-y: auto;
	}

	article :global(h2),
	article :global(h3) {
		scroll-margin-top: 1rem;
	}

	@media (min-width: 1280px) {
		.toc-float {
			display: block;
		}
	}
</style>
