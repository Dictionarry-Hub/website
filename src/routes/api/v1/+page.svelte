<script lang="ts">
	import SEO from '$lib/client/ui/utils/SEO.svelte';
	import PageHeader from '$lib/client/ui/header/PageHeader.svelte';
	import Badge from '$lib/client/ui/badge/Badge.svelte';
	import Card from '$lib/client/ui/card/Card.svelte';
	import EndpointSection from './EndpointSection.svelte';
	import { KeyRound, Cookie } from '@lucide/svelte';

	let { data } = $props();
	const spec = $derived(data.spec);

	const authIcons = {
		header: KeyRound,
		cookie: Cookie
	} as Record<string, typeof KeyRound>;
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
		<div class="grid gap-3 sm:grid-cols-2">
			{#each spec.auth as auth (auth.name)}
				{@const Icon = authIcons[auth.location] ?? KeyRound}
				<Card>
					<div class="flex items-start gap-3">
						<div class="rounded-control bg-surface-muted p-2">
							<Icon
								size={18}
								class="text-text-muted" />
						</div>
						<div>
							<div class="flex items-center gap-2">
								<span class="font-medium">{auth.paramName}</span>
								<Badge
									color="neutral"
									size="sm">{auth.location}</Badge>
							</div>
							<p class="mt-1 text-sm text-text-soft">{auth.description}</p>
						</div>
					</div>
				</Card>
			{/each}
		</div>
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
