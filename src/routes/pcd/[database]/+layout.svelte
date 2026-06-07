<script lang="ts">
	import TableOfContents from '$lib/client/ui/toc/TableOfContents.svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<div id="top" class="content-wrapper relative mx-auto max-w-3xl px-6 py-10">
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
		position: sticky;
		top: 2rem;
	}

	@media (min-width: 1280px) {
		.toc-float {
			display: block;
		}
	}
</style>
