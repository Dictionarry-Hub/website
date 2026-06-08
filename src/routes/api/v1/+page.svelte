<script lang="ts">
	import SEO from '$lib/client/ui/utils/SEO.svelte';
	import PageHeader from '$lib/client/ui/header/PageHeader.svelte';
	import Badge from '$lib/client/ui/badge/Badge.svelte';
	import AdaptiveList from '$lib/client/ui/adaptive-list/AdaptiveList.svelte';
	import Card from '$lib/client/ui/card/Card.svelte';
	import EndpointSection from './EndpointSection.svelte';
	import type { Column } from '$lib/client/ui/table/types';
	import type { AuthInfo } from '$lib/types/api';

	let { data } = $props();
	const spec = $derived(data.spec);

	const authColumns: Column<AuthInfo>[] = [
		{ key: 'name', header: 'Method' },
		{ key: 'location', header: 'Location' },
		{ key: 'paramName', header: 'Parameter' },
		{ key: 'description', header: 'Description' }
	];
</script>

<SEO
	title="API Reference v{spec.version}"
	description="Profilarr API reference documentation for v{spec.version}." />

<PageHeader title="API Reference">
	{#snippet actions()}
		<Badge
			variant="outline"
			color="accent"
			size="md">v{spec.version}</Badge>
	{/snippet}
</PageHeader>

<!-- Description -->
{#if spec.description}
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- parsed markdown from OpenAPI spec -->
	<div class="prose mb-8 text-text-soft">{@html spec.description}</div>
{/if}

<!-- Authentication -->
{#if spec.auth.length > 0}
	<section class="mb-10">
		<h2
			id="authentication"
			class="mb-4 font-accent text-xl font-semibold">
			Authentication
		</h2>
		<p class="mb-4 text-sm text-text-soft">
			Profilarr requires authentication on all API endpoints via either an
			<code>X-Api-Key</code> header or a session cookie. API keys are for programmatic access
			and restricted to <code>/api/</code> paths; session cookies are set after browser login.
			Authenticated users never see raw secrets. Sensitive values are stripped from all responses
			and only accessible with filesystem access to the host.
		</p>
		<AdaptiveList
			data={spec.auth}
			columns={authColumns}>
			{#snippet cell(row, col)}
				{#if col.key === 'paramName'}
					<code class="text-xs">{row.paramName}</code>
				{:else if col.key === 'location'}
					<Badge
						color="neutral"
						size="sm">{row.location}</Badge>
				{:else}
					{row[col.key]}
				{/if}
			{/snippet}
			{#snippet card(row)}
				<div class="flex items-center gap-2">
					<span class="font-medium">{row.name}</span>
					<Badge
						color="neutral"
						size="sm">{row.location}</Badge>
				</div>
				<code class="mt-1 text-xs">{row.paramName}</code>
				<p class="mt-1 text-sm text-text-soft">{row.description}</p>
			{/snippet}
		</AdaptiveList>
	</section>
{/if}

<!-- Tag Sections -->
{#each spec.tags as tag (tag.slug)}
	<section class="mb-10">
		<h2
			id={tag.slug}
			class="mb-1 font-accent text-xl font-semibold">
			{tag.name}
		</h2>
		{#if tag.description}
			<p class="mb-6 text-sm text-text-soft">{tag.description}</p>
		{/if}

		{#each tag.endpoints as endpoint (endpoint.operationId)}
			<EndpointSection {endpoint} />
		{/each}
	</section>
{/each}
