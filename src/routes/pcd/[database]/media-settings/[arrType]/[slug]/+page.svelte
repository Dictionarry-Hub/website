<script lang="ts">
	import { page } from '$app/state';
	import PageHeader from '$lib/client/ui/header/PageHeader.svelte';
	import AiMenu from '$lib/client/ui/ai-menu/AiMenu.svelte';
	import AdaptiveList from '$lib/client/ui/adaptive-list/AdaptiveList.svelte';
	import Badge from '$lib/client/ui/badge/Badge.svelte';
	import SEO from '$lib/client/ui/utils/SEO.svelte';
	import { formatPropersRepacks } from '$lib/shared/utils/pcd/format';
	import type { Column } from '$lib/client/ui/table/types';

	let { data } = $props();
	const settings = $derived(data.settings);

	interface SettingRow {
		id: string;
		setting: string;
		value: string;
		[key: string]: unknown;
	}

	const rows = $derived<SettingRow[]>([
		{
			id: 'propers-repacks',
			setting: 'Propers & Repacks',
			value: formatPropersRepacks(settings.propersRepacks)
		},
		{
			id: 'media-info',
			setting: 'Enable Media Info',
			value: settings.enableMediaInfo ? 'Yes' : 'No'
		}
	]);

	const columns: Column<SettingRow>[] = [
		{ key: 'setting', header: 'Setting' },
		{ key: 'value', header: 'Value' }
	];
</script>

<SEO title={settings.name} />

<PageHeader title={settings.name}>
	{#snippet actions()}
		<AiMenu
			artifactPath="{page.url.pathname}.md"
			pagePath={page.url.pathname} />
	{/snippet}
</PageHeader>

<h2
	id="configuration"
	class="mt-8 border-b border-border-muted pb-2 text-xl font-bold">
	Configuration
</h2>
<div class="mt-4">
	<AdaptiveList
		data={rows}
		{columns}>
		{#snippet cell(row, col)}
			{#if col.key === 'setting'}
				<span class="font-medium">{row.setting}</span>
			{:else if col.key === 'value'}
				{#if row.id === 'propers-repacks'}
					<Badge
						color="info"
						variant="subtle"
						pill>{row.value}</Badge>
				{:else}
					<Badge
						color={row.value === 'Yes' ? 'success' : 'neutral'}
						variant="subtle"
						pill>
						{row.value}
					</Badge>
				{/if}
			{/if}
		{/snippet}
		{#snippet card(row)}
			<p class="text-sm font-medium">{row.setting}</p>
			<div class="mt-2">
				{#if row.id === 'propers-repacks'}
					<Badge
						color="info"
						variant="subtle"
						pill>{row.value}</Badge>
				{:else}
					<Badge
						color={row.value === 'Yes' ? 'success' : 'neutral'}
						variant="subtle"
						pill>
						{row.value}
					</Badge>
				{/if}
			</div>
		{/snippet}
	</AdaptiveList>
</div>
