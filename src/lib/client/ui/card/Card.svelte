<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'default' | 'ghost' | 'outline';
		rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
		padding?: 'none' | 'sm' | 'md' | 'lg';
		as?: string;
		header?: Snippet;
		children: Snippet;
		footer?: Snippet;
		class?: string;
		[key: string]: unknown;
	}

	let {
		variant = 'default',
		rounded = 'xl',
		padding = 'md',
		as = 'div',
		header,
		children,
		footer,
		class: className,
		...rest
	}: Props = $props();

	const roundedClasses: Record<NonNullable<Props['rounded']>, string> = {
		none: 'rounded-none',
		sm: 'rounded-control-sm',
		md: 'rounded-control',
		lg: 'rounded-card',
		xl: 'rounded-xl'
	};

	const paddingClasses: Record<NonNullable<Props['padding']>, string> = {
		none: '',
		sm: 'px-3 py-2',
		md: 'px-4 py-3',
		lg: 'px-5 py-4'
	};

	const dividerClasses: Record<NonNullable<Props['padding']>, string> = {
		none: '',
		sm: 'mx-3',
		md: 'mx-4',
		lg: 'mx-5'
	};

	const variantClasses: Record<NonNullable<Props['variant']>, string> = {
		default: 'border border-border bg-surface shadow-card',
		outline: 'border border-border',
		ghost: ''
	};
</script>

<svelte:element
	this={as}
	class="flex flex-col overflow-hidden {variantClasses[variant!]} {roundedClasses[rounded!]} {className ?? ''}"
	{...rest}>
	{#if header}
		<div class={paddingClasses[padding!]}>
			{@render header()}
		</div>
		<div class="border-t border-border-muted {dividerClasses[padding!]}"></div>
	{/if}

	<div class="flex flex-1 flex-col {paddingClasses[padding!]}">
		{@render children()}
	</div>

	{#if footer}
		<div class="border-t border-border-muted {dividerClasses[padding!]}"></div>
		<div class={paddingClasses[padding!]}>
			{@render footer()}
		</div>
	{/if}
</svelte:element>
