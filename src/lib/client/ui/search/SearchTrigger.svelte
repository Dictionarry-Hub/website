<script lang="ts">
	import { browser } from '$app/environment';
	import { Search } from '@lucide/svelte';
	import Kbd from '$lib/client/ui/kbd/Kbd.svelte';

	interface Props {
		onclick?: () => void;
		class?: string;
	}

	let { onclick, class: className = '' }: Props = $props();

	// browser-guarded: navigator does not exist at prerender time, so the
	// prerendered HTML shows the Ctrl form briefly on Apple platforms.
	const isMac = $derived(browser && /Mac|iPhone|iPad/i.test(navigator.platform));
</script>

<!-- A button dressed as an input: the docs-site search affordance. -->
<button
	type="button"
	{onclick}
	class="flex w-full cursor-pointer items-center gap-2 rounded-control border border-border bg-surface px-3 py-1.5 text-sm text-text-muted shadow-control transition-colors hover:bg-surface-hover {className}">
	<Search
		size={14}
		class="shrink-0" />
	<span class="flex-1 text-left">Search...</span>
	<Kbd variant="outline">{isMac ? '⌘K' : 'Ctrl K'}</Kbd>
</button>
