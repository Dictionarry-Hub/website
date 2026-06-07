<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="mx-auto max-w-prose px-6 py-10">
	{@render children()}
</div>
