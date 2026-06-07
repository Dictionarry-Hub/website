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
		Trash2
	} from '@lucide/svelte';
	import { onMount } from 'svelte';
	import NavGroup from '$lib/client/ui/nav/NavGroup.svelte';
	import NavItem from '$lib/client/ui/nav/NavItem.svelte';

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
				onchange={(v) => database.set(v as typeof database.current)} />
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
			</NavGroup>
		{/if}
	</div>
</div>

<main class="min-h-screen bg-bg pl-72 font-sans text-text">
	{@render children()}
</main>
