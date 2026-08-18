<script lang="ts">
	import { page } from '$app/state';
	import { onMount, type Snippet } from 'svelte';
	import Button from '$lib/client/ui/button/Button.svelte';
	import CodeBlock from '$lib/client/ui/markdown/code/CodeBlock.svelte';

	interface Props {
		yamlPath: string;
		rich: Snippet;
	}

	let { yamlPath, rich }: Props = $props();

	let mounted = $state(false);
	let requestedPath = $state<string | null>(null);
	let loadedPath = $state<string | null>(null);
	let yaml = $state<string | null>(null);
	let loading = $state(false);
	let failed = $state(false);
	let requestId = 0;

	const yamlActive = $derived(mounted && page.url.searchParams.get('view') === 'yaml');

	onMount(() => {
		mounted = true;
	});

	async function loadYaml(path: string, force = false) {
		if (!force && requestedPath === path) return;

		const currentRequest = ++requestId;
		requestedPath = path;
		loading = true;
		failed = false;

		try {
			const response = await fetch(path);
			if (!response.ok) throw new Error(`${response.status} fetching ${path}`);
			const source = await response.text();

			if (currentRequest !== requestId) return;
			yaml = source;
			loadedPath = path;
		} catch {
			if (currentRequest !== requestId) return;
			yaml = null;
			loadedPath = null;
			failed = true;
		} finally {
			if (currentRequest === requestId) loading = false;
		}
	}

	function retry() {
		void loadYaml(yamlPath, true);
	}

	$effect(() => {
		if (!yamlActive) return;

		if (loadedPath !== yamlPath) {
			yaml = null;
			failed = false;
		}

		void loadYaml(yamlPath);
	});
</script>

{#if yamlActive}
	{#if yaml !== null && loadedPath === yamlPath}
		<CodeBlock items={[{ title: 'YAML', code: yaml, language: 'yaml' }]} />
	{:else if loading}
		<p
			class="py-8 text-center text-sm text-text-muted"
			role="status">
			Loading YAML...
		</p>
	{:else if failed}
		<div
			class="flex flex-col items-center gap-3 py-8 text-center"
			role="alert">
			<p class="text-sm text-text-muted">Unable to load YAML.</p>
			<Button
				type="button"
				variant="outline"
				size="sm"
				onclick={retry}>Retry</Button>
		</div>
	{/if}
{:else}
	{@render rich()}
{/if}
