<script lang="ts">
	import './layout.css';
	import { theme, THEMES } from '$lib/client/ui/theme/theme.svelte';
	import Button from '$lib/client/ui/button/Button.svelte';
	import { Sun, Moon, Monitor } from '@lucide/svelte';
	import { onMount } from 'svelte';

	const themeIcons = { light: Sun, dark: Moon, retro: Monitor } as const;

	let { children } = $props();

	onMount(() => {
		theme.init();
	});
</script>

<div class="fixed top-0 left-0 flex h-screen w-72 flex-col bg-bg font-sans text-text">
	<!-- Navbar -->
	<div class="flex items-center justify-between border-r border-b border-border px-6 py-4">
		<div class="flex items-center gap-2">
			<img src="/icon.png" alt="dictionarry" class="size-5" />
			<span class="font-accent text-lg font-semibold">dictionarry</span>
		</div>
		<div class="flex gap-1">
			{#each THEMES as t}
				<Button
					type="button"
					size="md"
					variant={theme.current === t ? 'accent' : 'default'}
					icon={themeIcons[t]}
					onclick={() => theme.set(t)} />
			{/each}
		</div>
	</div>
	<!-- Page nav -->
	<div class="flex-1 border-r border-border px-6 py-4"></div>
</div>

<main class="min-h-screen bg-bg pl-72 font-sans text-text">
	{@render children()}
</main>
