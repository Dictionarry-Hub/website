<script lang="ts">
	import { page } from '$app/state';
	import Badge from '$lib/client/ui/badge/Badge.svelte';
	import PageActionsMenu from '$lib/client/ui/page-actions/PageActionsMenu.svelte';
	import type { PageFormatAction } from '$lib/client/ui/page-actions/types';
	import PageHeader from '$lib/client/ui/header/PageHeader.svelte';
	import SEO from '$lib/client/ui/utils/SEO.svelte';
	import { formatConditionValue } from '$lib/shared/utils/pcd/format';
	import ConditionCard from './ConditionCard.svelte';

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

{#snippet renameBadge()}
	<Badge
		color="info"
		variant="solid">Included in Rename</Badge>
{/snippet}

<PageHeader
	title={format.name}
	tags={format.tags}
	badges={format.includeInRename ? renameBadge : undefined}>
	{#snippet actions()}
		<PageActionsMenu
			{formatActions}
			artifactPath="{page.url.pathname}.md"
			pagePath={page.url.pathname} />
	{/snippet}
</PageHeader>

<section aria-labelledby="description">
	<h2
		id="description"
		class="mt-8 border-b border-border-muted pb-2 text-xl font-bold">
		Description
	</h2>
	{#if descriptionHtml}
		<div class="prose mt-2">
			<!-- eslint-disable-next-line svelte/no-at-html-tags -- markdown parsed at build time -->
			{@html descriptionHtml}
		</div>
	{:else}
		<p class="mt-2 text-sm text-text-muted italic">{format.noDescriptionMessage}</p>
	{/if}
</section>

<section aria-labelledby="conditions">
	<h2
		id="conditions"
		class="mt-8 border-b border-border-muted pb-2 text-xl font-bold">
		Conditions
	</h2>
	{#if format.conditions.length > 0}
		<div class="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
			{#each format.conditions as condition, index (index)}
				<ConditionCard
					name={condition.name}
					type={condition.type}
					value={formatConditionValue(condition.data)}
					valueHref={condition.regularExpressionSlug
						? `/pcd/${page.params.database}/regular-expressions/${condition.regularExpressionSlug}`
						: undefined}
					arrType={condition.arrType}
					required={condition.required}
					negated={condition.negate} />
			{/each}
		</div>
	{:else}
		<p class="mt-4 text-sm text-text-muted italic">No conditions.</p>
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
