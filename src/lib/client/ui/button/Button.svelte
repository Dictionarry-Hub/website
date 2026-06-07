<script lang="ts">
	import type { Snippet, Component } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		variant?: 'accent' | 'default' | 'danger' | 'ghost' | 'outline';
		size?: 'sm' | 'md' | 'lg';
		icon?: Component<{ size?: number; class?: string }>;
		iconPosition?: 'left' | 'right';
		iconClass?: string;
		children?: Snippet;
	}

	let {
		variant = 'default',
		size = 'md',
		icon,
		iconPosition = 'left',
		iconClass = '',
		children,
		class: className,
		...rest
	}: Props = $props();

	const variantClasses: Record<NonNullable<Props['variant']>, string> = {
		accent: [
			'bg-accent-bg text-accent-text border border-accent-border',
			'hover:bg-accent-hover',
			'shadow-control active:shadow-control-active'
		].join(' '),
		default: [
			'bg-surface text-text border border-border',
			'hover:bg-surface-hover',
			'shadow-control active:shadow-control-active'
		].join(' '),
		danger: [
			'bg-danger-bg text-danger-text border border-danger-border',
			'hover:bg-danger-hover',
			'shadow-control active:shadow-control-active'
		].join(' '),
		outline: [
			'border border-border text-text',
			'hover:bg-surface-hover',
			'shadow-control active:shadow-control-active'
		].join(' '),
		ghost: ['text-text', 'hover:bg-surface-hover'].join(' ')
	};

	const isIconOnly = $derived(icon && !children);

	const sizeClasses: Record<NonNullable<Props['size']>, string> = {
		sm: 'gap-1.5 px-2 py-0.5 text-sm rounded-control-sm',
		md: 'gap-2 px-3 py-1.5 text-sm rounded-control',
		lg: 'gap-2 px-4 py-2 text-base rounded-control'
	};

	const iconOnlySizeClasses: Record<NonNullable<Props['size']>, string> = {
		sm: 'p-1 text-sm rounded-control-sm',
		md: 'p-1.5 text-sm rounded-control',
		lg: 'p-2 text-base rounded-control'
	};

	const iconSizes: Record<NonNullable<Props['size']>, number> = {
		sm: 14,
		md: 16,
		lg: 18
	};
</script>

<button
	class="inline-flex cursor-pointer items-center justify-center font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 {variantClasses[variant!]} {isIconOnly ? iconOnlySizeClasses[size!] : sizeClasses[size!]} {className ?? ''}"
	{...rest}>
	{#if icon && iconPosition === 'left'}
		{@const Icon = icon}
		<Icon size={iconSizes[size!]} class={iconClass} />
	{/if}
	{#if children}
		{@render children()}
	{/if}
	{#if icon && iconPosition === 'right'}
		{@const Icon = icon}
		<Icon size={iconSizes[size!]} class={iconClass} />
	{/if}
</button>
