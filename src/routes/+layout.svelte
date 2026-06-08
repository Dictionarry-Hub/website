<script lang="ts">
	import './layout.css';
	import { theme, THEMES } from '$lib/client/ui/theme/theme.svelte';
	import { database, DATABASES } from '$lib/client/ui/database/database.svelte';
	import DropdownSelect from '$lib/client/ui/dropdown/DropdownSelect.svelte';
	import {
		Monitor,
		Sun,
		Moon,
		Landmark,
		Flame,
		Telescope,
		NotebookPen,
		Wrench,
		BookOpen,
		Trash2,
		SlidersHorizontal,
		Tags,
		Regex,
		Clock,
		FileText,
		Settings,
		Ruler
	} from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import NavGroup from '$lib/client/ui/nav/NavGroup.svelte';
	import NavItem from '$lib/client/ui/nav/NavItem.svelte';
	import { slugify } from '$lib/shared/utils/slug';

	const themeOptions = [
		{ value: 'system', label: 'System', icon: Monitor },
		{ value: 'light', label: 'Light', icon: Sun },
		{ value: 'dark', label: 'Dark', icon: Moon },
		{ value: 'retro', label: 'Retro', icon: Landmark },
		{ value: 'velouria', label: 'Velouria', icon: Flame },
		{ value: 'roswell', label: 'Roswell', icon: Telescope }
	];

	const databaseIcons: Record<string, typeof BookOpen> = {
		dictionarry: BookOpen,
		trash: Trash2,
		'trash-french': Trash2,
		'trash-german': Trash2,
		dumpstarr: Flame
	};

	const databaseOptions = DATABASES.map((d) => ({
		value: d.id,
		label: d.name,
		icon: databaseIcons[d.id]
	}));

	let { children, data } = $props();

	let themeValue = $state(theme.current);
	let databaseValue = $state(database.current);

	const currentNav = $derived(data.pcdNav[databaseValue]);

	// Sync database from URL when on PCD routes
	$effect(() => {
		const pathname = page.url.pathname;
		if (database.isPcdRoute(pathname)) {
			database.syncFromUrl(pathname);
			databaseValue = database.current;
		}
	});

	function onDatabaseChange(v: string) {
		const id = v as typeof database.current;
		database.set(id);

		// Navigate to the new database's equivalent page when on a PCD route
		const pathname = page.url.pathname;
		if (database.isPcdRoute(pathname)) {
			const newPath = pathname.replace(/^\/pcd\/[^/]+/, `/pcd/${id}`);
			goto(newPath);
		}
	}

	onMount(() => {
		theme.init();
		themeValue = theme.current;
		database.init();
		databaseValue = database.current;
	});
</script>

<div class="fixed top-0 left-0 flex h-screen w-72 flex-col bg-bg font-sans text-text">
	<!-- Navbar -->
	<div class="flex items-center justify-between border-r border-b border-border px-6 py-4">
		<div class="flex items-center gap-2">
			<img src="/icon.png" alt="dictionarry" class="size-5" />
			<span class="font-accent text-lg font-semibold">dictionarry</span>
		</div>
		<div class="flex items-center gap-1">
			<DropdownSelect
				bind:value={databaseValue}
				options={databaseOptions}
				header="Database"
				position="middle"
				iconOnly
				onchange={onDatabaseChange} />
			<DropdownSelect
				bind:value={themeValue}
				options={themeOptions}
				header="Theme"
				position="middle"
				iconOnly
				onchange={(v) => theme.set(v as typeof theme.current)} />
		</div>
	</div>
	<!-- Page nav -->
	<div class="flex-1 overflow-y-auto border-r border-border px-4 py-4">
		{#if currentNav}
			<NavGroup
				label="Quality Profiles"
				href="/pcd/{databaseValue}/quality-profiles"
				icon={SlidersHorizontal}
				open={false}>
				{#each currentNav.qualityProfiles as name}
					<NavItem label={name} href="/pcd/{databaseValue}/quality-profiles/{name}" />
				{/each}
			</NavGroup>

			<NavGroup
				label="Custom Formats"
				href="/pcd/{databaseValue}/custom-formats"
				icon={Tags}
				open={false}>
				{#each currentNav.customFormats as name}
					<NavItem label={name} href="/pcd/{databaseValue}/custom-formats/{name}" />
				{/each}
			</NavGroup>

			<NavGroup
				label="Regular Expressions"
				href="/pcd/{databaseValue}/regular-expressions"
				icon={Regex}
				open={false}>
				{#each currentNav.regularExpressions as name}
					<NavItem label={name} href="/pcd/{databaseValue}/regular-expressions/{slugify(name)}" />
				{/each}
			</NavGroup>

			<NavGroup
				label="Delay Profiles"
				href="/pcd/{databaseValue}/delay-profiles"
				icon={Clock}
				open={false}>
				{#each currentNav.delayProfiles as name}
					<NavItem label={name} href="/pcd/{databaseValue}/delay-profiles/{slugify(name)}" />
				{/each}
			</NavGroup>

			<NavGroup
				label="Naming"
				href="/pcd/{databaseValue}/naming"
				icon={FileText}
				open={false}>
				{#each currentNav.naming as entry}
					<NavItem
						label={entry.name}
						image="/{entry.arrType}.svg"
						href="/pcd/{databaseValue}/naming/{entry.arrType}/{slugify(entry.name)}" />
				{/each}
			</NavGroup>

			<NavGroup
				label="Media Settings"
				href="/pcd/{databaseValue}/media-settings"
				icon={Settings}
				open={false}>
				{#each currentNav.mediaSettings as entry}
					<NavItem
						label={entry.name}
						image="/{entry.arrType}.svg"
						href="/pcd/{databaseValue}/media-settings/{entry.arrType}/{slugify(entry.name)}" />
				{/each}
			</NavGroup>

			<NavGroup
				label="Quality Definitions"
				href="/pcd/{databaseValue}/quality-definitions"
				icon={Ruler}
				open={false}>
				{#each currentNav.qualityDefinitions as entry}
					<NavItem
						label={entry.name}
						image="/{entry.arrType}.svg"
						href="/pcd/{databaseValue}/quality-definitions/{entry.arrType}/{entry.name}" />
				{/each}
			</NavGroup>
		{/if}

		{#if data.devLogs.length > 0}
			<NavGroup label="Dev Logs" href="/dev-logs" icon={NotebookPen}>
				{#each data.devLogs as log}
					<NavItem label={log.title} href={log.href} />
				{/each}
			</NavGroup>
		{/if}

		{#if import.meta.env.DEV}
			<NavGroup label="Dev" href="/dev" icon={Wrench}>
				<NavItem label="UI Showcase" href="/dev/ui" />
				<NavItem label="Error 404" href="/dev/errors/404" />
				<NavItem label="Error 403" href="/dev/errors/403" />
				<NavItem label="Error 500" href="/dev/errors/500" />
			</NavGroup>
		{/if}
	</div>
</div>

<main class="min-h-screen bg-bg pl-72 font-sans text-text">
	<div id="top" class="content-area mx-auto max-w-3xl px-6 py-10">
		{@render children()}
	</div>
</main>

<style>
	@media (min-width: 1280px) {
		.content-area {
			margin-left: calc(50% - 24rem - 9rem);
			margin-right: auto;
		}
	}
</style>
