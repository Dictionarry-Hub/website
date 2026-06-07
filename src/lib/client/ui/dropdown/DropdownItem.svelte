<script lang="ts">
	import type { Component } from 'svelte';
	import { Check } from '@lucide/svelte';

	interface Props {
		label: string;
		icon?: Component<{ size?: number; class?: string }>;
		selected?: boolean;
		disabled?: boolean;
		danger?: boolean;
		onclick?: () => void;
	}

	let {
		label,
		icon,
		selected = false,
		disabled = false,
		danger = false,
		onclick
	}: Props = $props();

	const stateClasses = $derived(
		disabled
			? 'cursor-not-allowed text-text-subtle'
			: danger
				? 'text-danger-text hover:bg-danger-bg'
				: 'text-text hover:bg-surface-hover'
	);
</script>

<div class="flex w-full items-center border-b border-border-subtle last:border-b-0">
	<button
		type="button"
		class="flex min-w-0 flex-1 cursor-pointer items-center gap-3 px-3 py-2 text-left text-sm transition-colors {stateClasses}"
		{disabled}
		{onclick}>
		{#if icon}
			{@const Icon = icon}
			<Icon size={16} />
		{/if}
		<span class="flex-1">{label}</span>
		{#if selected}
			<Check size={16} class="text-accent-solid" />
		{/if}
	</button>
</div>
