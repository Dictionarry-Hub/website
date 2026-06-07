<script lang="ts">
	import SEO from '$lib/client/ui/utils/SEO.svelte';
	import PageHeader from '$lib/client/ui/header/PageHeader.svelte';
	import Author from '$lib/client/ui/author/Author.svelte';
	import DateTime from '$lib/client/ui/datetime/DateTime.svelte';
	import TableOfContents from '$lib/client/ui/toc/TableOfContents.svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		blurb?: string;
		author?: string | string[];
		created?: string;
		tags?: string[];
		children: Snippet;
	}

	let { title, blurb, author, created, tags, children }: Props = $props();

	function parseAuthor(value: string) {
		try {
			const url = new URL(value);
			const name = url.pathname.split('/').filter(Boolean).pop() ?? value;
			const isGitHub = url.hostname === 'github.com';
			return { name, href: value, avatar: isGitHub ? `${value}.png` : undefined };
		} catch {
			return { name: value, href: undefined, avatar: undefined };
		}
	}

	const authors = $derived.by(() => {
		if (!author) return [];
		const list = Array.isArray(author) ? author : [author];
		return list.map(parseAuthor);
	});
</script>

<SEO {title} description={blurb} />

<div id="top" class="content-wrapper relative mx-auto max-w-prose px-6 py-10">
	<article>
		<PageHeader {title} {tags}>
			{#snippet meta()}
				{#each authors as a}
					<Author name={a.name} avatar={a.avatar} href={a.href} />
				{/each}
				{#if authors.length > 0 && created}
					<span class="text-text-muted">·</span>
				{/if}
				{#if created}
					<DateTime date={created} class="text-sm" />
				{/if}
			{/snippet}
		</PageHeader>

		<div class="prose">
			{@render children()}
		</div>
	</article>

	<div class="toc-float">
		<div class="toc-sticky">
			<TableOfContents {title} />
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
		.content-wrapper {
			margin-left: calc(50% - 32.5ch - 9rem);
			margin-right: auto;
		}

		.toc-float {
			display: block;
		}
	}
</style>
