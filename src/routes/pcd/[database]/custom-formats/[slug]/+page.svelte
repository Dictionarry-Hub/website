<script lang="ts">
	import { page } from '$app/state';
	import AdaptiveList from '$lib/client/ui/adaptive-list/AdaptiveList.svelte';
	import Badge from '$lib/client/ui/badge/Badge.svelte';
	import PageActionsMenu from '$lib/client/ui/page-actions/PageActionsMenu.svelte';
	import type { PageFormatAction } from '$lib/client/ui/page-actions/types';
	import PageHeader from '$lib/client/ui/header/PageHeader.svelte';
	import type { Column } from '$lib/client/ui/table/types';
	import SEO from '$lib/client/ui/utils/SEO.svelte';
	import { formatConditionValue } from '$lib/shared/utils/pcd/format';
	import {
		formatProfileScore,
		type QualityProfileReference
	} from '$lib/shared/utils/pcd/references';
	import ConditionCard from './ConditionCard.svelte';

	let { data } = $props();
	const format = $derived(data.format);
	const descriptionHtml = $derived(data.descriptionHtml);
	const references = $derived(data.references);
	const referenceColumns: Column<QualityProfileReference>[] = [
		{ key: 'name', header: 'Quality Profile', sortable: true },
		{ key: 'scores', header: 'Score' }
	];

	function scoreClass(score: number): string {
		if (score > 0) return 'text-success-text';
		if (score < 0) return 'text-danger-text';
		return 'text-text-muted';
	}

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

{#snippet scoreValue(score: number)}
	<span class="text-sm font-medium tabular-nums {scoreClass(score)}">
		{formatProfileScore(score)}
	</span>
{/snippet}

{#snippet scoreList(reference: QualityProfileReference)}
	<div class="flex flex-wrap items-center gap-3">
		{#if reference.scores.radarr !== null && reference.scores.radarr === reference.scores.sonarr}
			<span class="inline-flex items-center gap-1.5">
				<img
					src="/radarr.svg"
					alt="Radarr"
					class="size-5" />
				<img
					src="/sonarr.svg"
					alt="Sonarr"
					class="size-5" />
				{@render scoreValue(reference.scores.radarr)}
			</span>
		{:else}
			{#if reference.scores.radarr !== null}
				<span class="inline-flex items-center gap-1.5">
					<img
						src="/radarr.svg"
						alt="Radarr"
						class="size-5" />
					{@render scoreValue(reference.scores.radarr)}
				</span>
			{/if}
			{#if reference.scores.sonarr !== null}
				<span class="inline-flex items-center gap-1.5">
					<img
						src="/sonarr.svg"
						alt="Sonarr"
						class="size-5" />
					{@render scoreValue(reference.scores.sonarr)}
				</span>
			{/if}
		{/if}
	</div>
{/snippet}

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

<section aria-labelledby="references">
	<h2
		id="references"
		class="mt-8 border-b border-border-muted pb-2 text-xl font-bold">
		References
	</h2>
	{#if references.length > 0}
		<div class="mt-4">
			<AdaptiveList
				data={references}
				columns={referenceColumns}
				href={(row) =>
					`/pcd/${page.params.database}/quality-profiles/${row.slug}`}>
				{#snippet cell(row, column)}
					{#if column.key === 'name'}
						<span class="font-medium">{row.name}</span>
					{:else if column.key === 'scores'}
						{@render scoreList(row)}
					{/if}
				{/snippet}
				{#snippet card(row)}
					<p class="text-sm font-medium">{row.name}</p>
					<div class="mt-2">{@render scoreList(row)}</div>
				{/snippet}
			</AdaptiveList>
		</div>
	{:else}
		<p class="mt-4 text-sm text-text-muted italic">
			No quality profiles reference this custom format.
		</p>
	{/if}
</section>
