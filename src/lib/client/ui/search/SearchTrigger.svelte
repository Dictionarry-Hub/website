<script lang="ts">
	import { Search } from '@lucide/svelte';
	import Kbd from '$lib/client/ui/kbd/Kbd.svelte';

	interface Props {
		onclick?: () => void;
		class?: string;
	}

	let { onclick, class: className = '' }: Props = $props();

	// Resolved client-side; prerendered HTML shows the Ctrl form briefly.
	let isMac = $state(false);

	$effect(() => {
		isMac = /Mac|iPhone|iPad/i.test(navigator.platform);
	});
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
