<script lang="ts">
	import SEO from '$lib/client/ui/utils/SEO.svelte';
	import Author from '$lib/client/ui/author/Author.svelte';
	import DateTime from '$lib/client/ui/datetime/DateTime.svelte';
	import Badge from '$lib/client/ui/badge/Badge.svelte';
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

<article class="mx-auto max-w-prose px-6 py-10">
	<header class="mb-8">
		<h1 class="font-accent text-3xl font-bold">{title}</h1>
		{#if authors.length > 0 || created}
			<div class="mt-2 flex items-center gap-2 text-text-soft">
				{#each authors as a}
					<Author name={a.name} avatar={a.avatar} href={a.href} />
				{/each}
				{#if authors.length > 0 && created}
					<span class="text-text-muted">·</span>
				{/if}
				{#if created}
					<DateTime date={created} class="text-sm" />
				{/if}
			</div>
		{/if}
		{#if tags && tags.length > 0}
			<div class="mt-3 flex flex-wrap gap-2">
				{#each tags as tag}
					<Badge pill>{tag}</Badge>
				{/each}
			</div>
		{/if}
	</header>

	<div class="prose">
		{@render children()}
	</div>
</article>
