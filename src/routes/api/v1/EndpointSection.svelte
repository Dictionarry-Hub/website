<script lang="ts">
	import Badge from '$lib/client/ui/badge/Badge.svelte';
	import CodeBlock from '$lib/client/ui/markdown/code/CodeBlock.svelte';
	import Table from '$lib/client/ui/table/Table.svelte';
	import type { Column } from '$lib/client/ui/table/types';
	import type { ApiEndpoint, ApiParameter, HttpMethod } from '$lib/types/api';
	import SiCurl from '@icons-pack/svelte-simple-icons/icons/SiCurl';
	import SiPython from '@icons-pack/svelte-simple-icons/icons/SiPython';
	import SiTypescript from '@icons-pack/svelte-simple-icons/icons/SiTypescript';
	import SiDotnet from '@icons-pack/svelte-simple-icons/icons/SiDotnet';
	import { Braces } from '@lucide/svelte';
	import Button from '$lib/client/ui/button/Button.svelte';
	import type { Component } from 'svelte';

	interface Props {
		endpoint: ApiEndpoint;
	}

	let { endpoint }: Props = $props();

	const methodColors: Record<HttpMethod, 'success' | 'accent' | 'warning' | 'danger' | 'info'> = {
		GET: 'success',
		POST: 'accent',
		PUT: 'info',
		PATCH: 'warning',
		DELETE: 'danger'
	};

	const snippetIcons: Record<string, Component<{ size?: number; class?: string }>> = {
		curl: SiCurl,
		requests: SiPython,
		fetch: SiTypescript,
		HttpClient: SiDotnet
	};

	const snippetItems = $derived(
		endpoint.snippets.map((s) => ({
			title: s.title,
			code: s.code,
			language: s.language,
			icon: snippetIcons[s.title]
		}))
	);

	const responsesWithBody = $derived(endpoint.responses.filter((r) => r.example));
	let showSchema = $state(false);

	const hasSchemas = $derived(responsesWithBody.some((r) => r.schema));

	const responseItems = $derived(
		responsesWithBody.map((r) => ({
			title: r.status,
			code: showSchema && r.schema ? r.schema : r.example!,
			language: 'json'
		}))
	);

	const responsesWithoutBody = $derived(endpoint.responses.filter((r) => !r.example));

	const paramColumns: Column<ApiParameter>[] = [
		{ key: 'name', header: 'Name' },
		{ key: 'location', header: 'In' },
		{ key: 'type', header: 'Type' },
		{ key: 'required', header: 'Required' },
		{ key: 'description', header: 'Description' }
	];

	const requestBodyItem = $derived(
		endpoint.requestBody
			? [
					{
						title: 'Request Body',
						code: endpoint.requestBody.example,
						language: 'json'
					}
				]
			: null
	);
</script>

<div class="mb-8 border-b border-border-subtle pb-8 last:mb-0 last:border-b-0 last:pb-0">
	<!-- Header -->
	<div class="mb-3 flex items-center gap-3">
		<Badge
			color={methodColors[endpoint.method]}
			size="sm">
			{endpoint.method}
		</Badge>
		<h3
			id={endpoint.operationId}
			data-method={endpoint.method}
			class="text-sm font-semibold">
			<Badge
				variant="outline"
				color="neutral"
				size="sm">{endpoint.path}</Badge>
		</h3>
		<span class="text-sm text-text-soft">{endpoint.summary}</span>
	</div>

	<!-- Description -->
	{#if endpoint.descriptionHtml}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -- parsed markdown from OpenAPI spec -->
		<div class="prose mb-4 text-sm text-text-soft">{@html endpoint.descriptionHtml}</div>
	{/if}

	<!-- Parameters -->
	{#if endpoint.parameters.length > 0}
		<div class="mb-4">
			<h4 class="mb-2 text-xs font-semibold tracking-wide text-text-muted uppercase">
				Parameters
			</h4>
			<Table
				data={endpoint.parameters}
				columns={paramColumns}>
				{#snippet cell(row, col)}
					{#if col.key === 'name'}
						<span class="font-mono text-xs">{row.name}</span>
					{:else if col.key === 'type'}
						<span class="font-mono text-xs text-text-soft">{row.type}</span>
					{:else if col.key === 'required'}
						{#if row.required}
							<Badge
								color="success"
								size="sm">yes</Badge>
						{:else}
							<Badge
								color="neutral"
								size="sm">no</Badge>
						{/if}
					{:else if col.key === 'location'}
						<span class="text-text-soft">{row.location}</span>
					{:else}
						<span class="text-text-soft">{row[col.key]}</span>
					{/if}
				{/snippet}
			</Table>
		</div>
	{/if}

	<!-- Request Body -->
	{#if requestBodyItem}
		<div class="mb-4">
			<h4 class="mb-2 text-xs font-semibold tracking-wide text-text-muted uppercase">
				Request Body
			</h4>
			<CodeBlock items={requestBodyItem} />
		</div>
	{/if}

	<!-- Code Snippets -->
	{#if snippetItems.length > 0}
		<div class="mb-4">
			<h4 class="mb-2 text-xs font-semibold tracking-wide text-text-muted uppercase">
				Request
			</h4>
			<CodeBlock items={snippetItems} />
		</div>
	{/if}

	<!-- Responses -->
	{#if responseItems.length > 0}
		<div class="mb-4">
			<h4 class="mb-2 text-xs font-semibold tracking-wide text-text-muted uppercase">
				Responses
			</h4>
			<CodeBlock items={responseItems}>
				{#snippet headerActions()}
					{#if hasSchemas}
						<Button
							type="button"
							variant={showSchema ? 'accent' : 'default'}
							size="sm"
							icon={Braces}
							onclick={() => (showSchema = !showSchema)}>
							{showSchema ? 'Hide Schema' : 'Show Schema'}
						</Button>
					{/if}
				{/snippet}
				{#snippet footer(activeIndex)}
					<!-- eslint-disable-next-line svelte/no-at-html-tags -- parsed markdown from OpenAPI spec -->
					{@html responsesWithBody[activeIndex].descriptionHtml}
				{/snippet}
			</CodeBlock>
		</div>
	{/if}

	{#if responsesWithoutBody.length > 0}
		<div class="flex flex-wrap gap-2">
			{#each responsesWithoutBody as resp (resp.status)}
				<Badge
					color="neutral"
					size="sm">
					{resp.status}
					{resp.description}
				</Badge>
			{/each}
		</div>
	{/if}
</div>
