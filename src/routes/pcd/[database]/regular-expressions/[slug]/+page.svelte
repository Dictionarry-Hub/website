<script lang="ts">
	import PageHeader from '$lib/client/ui/header/PageHeader.svelte';
	import CodeBlock from '$lib/client/ui/markdown/code/CodeBlock.svelte';
	import SEO from '$lib/client/ui/utils/SEO.svelte';
	import { Regex, FlaskConical } from '@lucide/svelte';
	import Badge from '$lib/client/ui/badge/Badge.svelte';

	let { data } = $props();
	const regex = $derived(data.regex);
	const descriptionHtml = $derived(data.descriptionHtml);
</script>

<SEO title={regex.name} description={regex.description ?? undefined} />

<PageHeader title={regex.name} tags={regex.tags}>
	{#snippet actions()}
		{#if regex.regex101Id}
			<a href="https://regex101.com/r/{regex.regex101Id}" target="_blank" rel="noopener noreferrer">
				<Badge variant="outline" icon={FlaskConical} iconColor="text-info-icon" link pill>regex101</Badge>
			</a>
		{/if}
	{/snippet}
</PageHeader>

<h2 id="pattern" class="mt-8 border-b border-border-muted pb-2 text-xl font-bold">Pattern</h2>
<div class="mt-4">
	<CodeBlock items={[{ title: 'Pattern', code: regex.pattern, language: 'text', icon: Regex }]} overflow="wrap" />
</div>

<h2 id="description" class="mt-8 border-b border-border-muted pb-2 text-xl font-bold">Description</h2>
{#if descriptionHtml}
	<div class="prose mt-2">
		{@html descriptionHtml}
	</div>
{:else}
	<p class="mt-2 text-sm text-text-muted italic">{regex.noDescriptionMessage}</p>
{/if}
