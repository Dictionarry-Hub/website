<script lang="ts">
	import PageHeader from '$lib/client/ui/header/PageHeader.svelte';
	import AdaptiveList from '$lib/client/ui/adaptive-list/AdaptiveList.svelte';
	import Badge from '$lib/client/ui/badge/Badge.svelte';
	import SEO from '$lib/client/ui/utils/SEO.svelte';
	import type { Column } from '$lib/client/ui/table/types';

	let { data } = $props();
	const profile = $derived(data.profile);

	const isOnlyUsenet = $derived(profile.preferredProtocol === 'only_usenet');
	const isOnlyTorrent = $derived(profile.preferredProtocol === 'only_torrent');
	const showUsenetDelay = $derived(!isOnlyTorrent);
	const showTorrentDelay = $derived(!isOnlyUsenet);

	function formatProtocol(protocol: string): string {
		return protocol
			.split('_')
			.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
			.join(' ');
	}

	function formatDelay(minutes: number | null): string {
		if (minutes === null) return 'N/A';
		if (minutes === 0) return 'No delay';
		if (minutes < 60) return `${minutes}m`;
		const h = Math.floor(minutes / 60);
		const m = minutes % 60;
		return m > 0 ? `${h}h ${m}m` : `${h}h`;
	}

	interface SettingRow {
		id: string;
		setting: string;
		value: string;
		[key: string]: unknown;
	}

	const rows = $derived<SettingRow[]>([
		{
			id: 'protocol',
			setting: 'Download Protocol',
			value: formatProtocol(profile.preferredProtocol)
		},
		{
			id: 'bypass-quality',
			setting: 'Bypass if Highest Quality',
			value: profile.bypassIfHighestQuality ? 'Yes' : 'No'
		},
		{
			id: 'bypass-score',
			setting: 'Bypass if Above CF Score',
			value: profile.bypassIfAboveCustomFormatScore ? 'Yes' : 'No'
		}
	]);

	const columns: Column<SettingRow>[] = [
		{ key: 'setting', header: 'Setting' },
		{ key: 'value', header: 'Value' }
	];
</script>

<SEO title={profile.name} />

<PageHeader title={profile.name} />

<h2 id="configuration" class="mt-8 border-b border-border-muted pb-2 text-xl font-bold">
	Configuration
</h2>
<div class="mt-4">
	<AdaptiveList data={rows} {columns}>
		{#snippet cell(row, col)}
			{#if col.key === 'setting'}
				<span class="font-medium">{row.setting}</span>
			{:else if col.key === 'value'}
				{#if row.id === 'protocol'}
					<Badge color="info" variant="subtle" pill>{row.value}</Badge>
				{:else}
					<Badge
						color={row.value === 'Yes' ? 'success' : 'neutral'}
						variant="subtle"
						pill
					>
						{row.value}
					</Badge>
				{/if}
			{/if}
		{/snippet}
		{#snippet expanded(row)}
			{#if row.id === 'protocol'}
				<div class="space-y-2">
					{#if showUsenetDelay}
						<div class="flex items-center justify-between">
							<span class="text-sm text-text-muted">Usenet Delay</span>
							<span class="text-sm font-medium">
								{formatDelay(profile.usenetDelay)}
							</span>
						</div>
					{/if}
					{#if showTorrentDelay}
						<div class="flex items-center justify-between">
							<span class="text-sm text-text-muted">Torrent Delay</span>
							<span class="text-sm font-medium">
								{formatDelay(profile.torrentDelay)}
							</span>
						</div>
					{/if}
				</div>
			{:else if row.id === 'bypass-score' && profile.bypassIfAboveCustomFormatScore}
				<div class="flex items-center justify-between">
					<span class="text-sm text-text-muted">Minimum CF Score</span>
					<span class="text-sm font-medium">
						{profile.minimumCustomFormatScore ?? 0}
					</span>
				</div>
			{/if}
		{/snippet}
		{#snippet card(row)}
			<p class="text-sm font-medium">{row.setting}</p>
			<div class="mt-2">
				{#if row.id === 'protocol'}
					<Badge color="info" variant="subtle" pill>{row.value}</Badge>
					<div class="mt-3 space-y-1">
						{#if showUsenetDelay}
							<div class="flex items-center justify-between text-sm">
								<span class="text-text-muted">Usenet Delay</span>
								<span class="font-medium">{formatDelay(profile.usenetDelay)}</span>
							</div>
						{/if}
						{#if showTorrentDelay}
							<div class="flex items-center justify-between text-sm">
								<span class="text-text-muted">Torrent Delay</span>
								<span class="font-medium">{formatDelay(profile.torrentDelay)}</span>
							</div>
						{/if}
					</div>
				{:else}
					<Badge
						color={row.value === 'Yes' ? 'success' : 'neutral'}
						variant="subtle"
						pill
					>
						{row.value}
					</Badge>
					{#if row.id === 'bypass-score' && profile.bypassIfAboveCustomFormatScore}
						<div class="mt-3 flex items-center justify-between text-sm">
							<span class="text-text-muted">Minimum CF Score</span>
							<span class="font-medium">{profile.minimumCustomFormatScore ?? 0}</span>
						</div>
					{/if}
				{/if}
			</div>
		{/snippet}
	</AdaptiveList>
</div>
