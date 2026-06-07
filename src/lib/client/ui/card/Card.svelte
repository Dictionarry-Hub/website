<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
		as?: string;
		children: Snippet;
		class?: string;
		[key: string]: unknown;
	}

	let { rounded = 'xl', as = 'div', children, class: className, ...rest }: Props = $props();

	const roundedClasses: Record<NonNullable<Props['rounded']>, string> = {
		none: 'rounded-none',
		sm: 'rounded-control-sm',
		md: 'rounded-control',
		lg: 'rounded-card',
		xl: 'rounded-xl'
	};
</script>

<svelte:element
	this={as}
	class="border border-border bg-surface shadow-card {roundedClasses[rounded!]} {className ?? ''}"
	{...rest}>
	{@render children()}
</svelte:element>
