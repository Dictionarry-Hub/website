<script lang="ts">
	import { ExternalLink } from '@lucide/svelte';
	import type { Component, Snippet } from 'svelte';

	interface Props {
		variant?: 'subtle' | 'solid' | 'outline';
		color?: 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info';
		size?: 'sm' | 'md';
		pill?: boolean;
		icon?: Component<{ size?: number; class?: string }>;
		iconColor?: string;
		link?: boolean;
		children: Snippet;
		class?: string;
	}

	let {
		variant = 'solid',
		color = 'neutral',
		size = 'sm',
		pill = false,
		icon,
		iconColor,
		link = false,
		children,
		class: className
	}: Props = $props();

	const colorMap: Record<
		NonNullable<Props['color']>,
		Record<NonNullable<Props['variant']>, string>
	> = {
		neutral: {
			subtle: 'bg-surface-muted text-text-soft',
			solid: 'bg-surface text-text border border-border shadow-control',
			outline: 'border border-border text-text-soft'
		},
		accent: {
			subtle: 'bg-accent-bg text-accent-text',
			solid: 'bg-accent-solid text-on-accent',
			outline: 'border border-accent-border text-accent-text'
		},
		success: {
			subtle: 'bg-success-bg text-success-text',
			solid: 'bg-success-bg text-success-text border border-success-border',
			outline: 'border border-success-border text-success-text'
		},
		warning: {
			subtle: 'bg-warning-bg text-warning-text',
			solid: 'bg-warning-bg text-warning-text border border-warning-border',
			outline: 'border border-warning-border text-warning-text'
		},
		danger: {
			subtle: 'bg-danger-bg text-danger-text',
			solid: 'bg-danger-bg text-danger-text border border-danger-border',
			outline: 'border border-danger-border text-danger-text'
		},
		info: {
			subtle: 'bg-info-bg text-info-text',
			solid: 'bg-info-bg text-info-text border border-info-border',
			outline: 'border border-info-border text-info-text'
		}
	};

	const sizeClasses: Record<NonNullable<Props['size']>, string> = {
		sm: 'px-2 py-0.5 text-xs gap-1',
		md: 'px-2.5 py-1 text-sm gap-1.5'
	};

	const iconSizes: Record<NonNullable<Props['size']>, number> = {
		sm: 12,
		md: 14
	};
</script>

<span
	class="inline-flex items-center font-medium {colorMap[color!][variant!]} {sizeClasses[size!]} {pill ? 'rounded-pill' : 'rounded-control-sm'} {className ?? ''}">
	{#if icon}
		{@const Icon = icon}
		<Icon size={iconSizes[size!]} class={iconColor ?? ''} />
	{/if}
	{@render children()}
	{#if link}
		<ExternalLink size={iconSizes[size!]} class="text-text-muted" />
	{/if}
</span>
