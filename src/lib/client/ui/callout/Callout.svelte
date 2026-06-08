<script lang="ts">
	import { Info, TriangleAlert, OctagonAlert, Lightbulb, StickyNote } from '@lucide/svelte';
	import type { Component, Snippet } from 'svelte';

	type CalloutType = 'info' | 'warning' | 'danger' | 'tip' | 'note';

	interface Props {
		type?: CalloutType;
		children: Snippet;
	}

	let { type = 'info', children }: Props = $props();

	const config: Record<CalloutType, { icon: Component<{ size?: number; class?: string }>; label: string }> = {
		info: { icon: Info, label: 'Info' },
		warning: { icon: TriangleAlert, label: 'Warning' },
		danger: { icon: OctagonAlert, label: 'Danger' },
		tip: { icon: Lightbulb, label: 'Tip' },
		note: { icon: StickyNote, label: 'Note' }
	};

	const Icon = $derived(config[type].icon);
	const label = $derived(config[type].label);
</script>

<div class="callout callout-{type}" role="note">
	<div class="callout-header">
		<Icon size={16} />
		<span>{label}</span>
	</div>
	<div class="callout-body">
		{@render children()}
	</div>
</div>

<style>
	.callout {
		border-left: 4px solid;
		border-radius: 0;
		padding: 0.75rem 1rem;
		margin-bottom: 1rem;
	}

	.callout-header {
		display: flex;
		align-items: center;
		gap: 0.375rem;
		font-size: 0.8125rem;
		font-weight: 600;
		margin-bottom: 0.375rem;
	}

	.callout-body {
		font-size: 0.875rem;
		color: var(--theme-text-soft);
	}

	.callout-info {
		background: color-mix(in srgb, var(--theme-info-bg) 50%, transparent);
		border-color: var(--theme-info-border);
	}

	.callout-info .callout-header {
		color: var(--theme-info-text);
	}

	.callout-warning {
		background: color-mix(in srgb, var(--theme-warning-bg) 50%, transparent);
		border-color: var(--theme-warning-border);
	}

	.callout-warning .callout-header {
		color: var(--theme-warning-text);
	}

	.callout-danger {
		background: color-mix(in srgb, var(--theme-danger-bg) 50%, transparent);
		border-color: var(--theme-danger-border);
	}

	.callout-danger .callout-header {
		color: var(--theme-danger-text);
	}

	.callout-tip {
		background: color-mix(in srgb, var(--theme-success-bg) 50%, transparent);
		border-color: var(--theme-success-border);
	}

	.callout-tip .callout-header {
		color: var(--theme-success-text);
	}

	.callout-note {
		background: color-mix(in srgb, var(--theme-surface-muted) 50%, transparent);
		border-color: var(--theme-border);
	}

	.callout-note .callout-header {
		color: var(--theme-text);
	}
</style>
