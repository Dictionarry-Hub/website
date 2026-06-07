<script lang="ts">
	import './layout.css';
	import { theme } from '$lib/client/ui/theme/theme.svelte';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		theme.init();
	});
</script>

<div class="min-h-screen bg-bg font-sans text-text">
	{@render children()}
</div>
