<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'default' | 'outline';
		size?: 'sm' | 'md';
		class?: string;
		children: Snippet;
	}

	let { variant = 'default', size = 'sm', class: className, children }: Props = $props();

	const variantClasses: Record<NonNullable<Props['variant']>, string> = {
		default: 'border border-border bg-surface-muted',
		outline: 'border border-border'
	};

	const sizeClasses: Record<NonNullable<Props['size']>, string> = {
		sm: 'min-w-5 px-1.5 py-1 text-[10px]',
		md: 'min-w-6 px-2 py-1 text-xs'
	};
</script>

<!-- Semantic keyboard-key hint, styled as a keycap in Badge's visual language. -->
<kbd
	class="inline-flex items-center justify-center rounded-control-sm font-mono text-text-soft {variantClasses[
		variant!
	]} {sizeClasses[size!]} {className ?? ''}">
	{@render children()}
</kbd>
