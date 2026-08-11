<script lang="ts">
	import Badge from '$lib/client/ui/badge/Badge.svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		tags?: string[];
		badges?: Snippet;
		meta?: Snippet;
		actions?: Snippet;
	}

	let { title, tags, badges, meta, actions }: Props = $props();
</script>

<header class="mb-8 border-b border-border-muted pb-4">
	<div class="flex items-center justify-between gap-4">
		<h1 class="font-accent text-3xl font-bold">{title}</h1>
		{#if actions}
			<div class="flex items-center gap-2">
				{@render actions()}
			</div>
		{/if}
	</div>
	{#if meta}
		<div class="mt-2 flex items-center gap-2 text-text-soft">
			{@render meta()}
		</div>
	{/if}
	{#if (tags && tags.length > 0) || badges}
		<div class="mt-3 flex flex-wrap gap-2">
			{#if tags}
				{#each tags as tag (tag)}
					<Badge>{tag}</Badge>
				{/each}
			{/if}
			{#if badges}
				{@render badges()}
			{/if}
		</div>
	{/if}
</header>
