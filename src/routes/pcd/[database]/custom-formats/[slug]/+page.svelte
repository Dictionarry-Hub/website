<script lang="ts">
	import { page } from '$app/state';
	import PageActionsMenu from '$lib/client/ui/page-actions/PageActionsMenu.svelte';
	import type { PageFormatAction } from '$lib/client/ui/page-actions/types';
	import PageHeader from '$lib/client/ui/header/PageHeader.svelte';
	import SEO from '$lib/client/ui/utils/SEO.svelte';
	import {
		formatConditionArrType,
		formatConditionType,
		formatConditionValue
	} from '$lib/shared/utils/pcd/format';

	let { data } = $props();
	const format = $derived(data.format);
	const descriptionHtml = $derived(data.descriptionHtml);
	const formatActions = $derived.by((): PageFormatAction[] => {
		const yamlPath = `${page.url.pathname}.yaml`;
		return [
			{
				kind: 'copy',
				label: 'Copy as YAML',
				successLabel: 'YAML copied',
				url: yamlPath
			},
			{
				kind: 'download',
				label: 'Download as YAML',
				url: yamlPath,
				filename: `${page.params.slug}.yaml`
			}
		];
	});
</script>

<SEO
	title={format.name}
	description={format.description ?? undefined} />

<PageHeader
	title={format.name}
	tags={format.tags}>
	{#snippet actions()}
		<PageActionsMenu
			{formatActions}
			artifactPath="{page.url.pathname}.md"
			pagePath={page.url.pathname} />
	{/snippet}
</PageHeader>

{#if descriptionHtml}
	<section aria-labelledby="description">
		<h2 id="description">Description</h2>
		<div>
			<!-- eslint-disable-next-line svelte/no-at-html-tags -- markdown parsed at build time -->
			{@html descriptionHtml}
		</div>
	</section>
{/if}

<section aria-labelledby="configuration">
	<h2 id="configuration">Configuration</h2>
	<dl>
		<dt>Include in Rename</dt>
		<dd>{format.includeInRename ? 'Yes' : 'No'}</dd>
	</dl>
</section>

<section aria-labelledby="conditions">
	<h2 id="conditions">Conditions</h2>
	{#if format.conditions.length > 0}
		{#each format.conditions as condition}
			<article>
				<h3>{condition.name}</h3>
				<dl>
					<dt>Type</dt>
					<dd>{formatConditionType(condition.type)}</dd>
					<dt>Value</dt>
					<dd>
						{#if condition.regularExpressionSlug}
							<a
								href="/pcd/{page.params
									.database}/regular-expressions/{condition.regularExpressionSlug}">
								{formatConditionValue(condition.data)}
							</a>
						{:else}
							{formatConditionValue(condition.data)}
						{/if}
					</dd>
					<dt>Applies To</dt>
					<dd>{formatConditionArrType(condition.arrType)}</dd>
					<dt>Required</dt>
					<dd>{condition.required ? 'Yes' : 'No'}</dd>
					<dt>Negated</dt>
					<dd>{condition.negate ? 'Yes' : 'No'}</dd>
				</dl>
			</article>
		{/each}
	{:else}
		<p>No conditions.</p>
	{/if}
</section>

{#if format.tests.length > 0}
	<section aria-labelledby="tests">
		<h2 id="tests">Tests</h2>
		{#each format.tests as test}
			<article>
				<h3>{test.title}</h3>
				<dl>
					<dt>Type</dt>
					<dd>{test.type}</dd>
					<dt>Expected to Match</dt>
					<dd>{test.shouldMatch ? 'Yes' : 'No'}</dd>
				</dl>
				{#if test.description}
					<p>{test.description}</p>
				{/if}
			</article>
		{/each}
	</section>
{/if}
