<script lang="ts">
	import {
		Info,
		TriangleAlert,
		OctagonAlert,
		Lightbulb,
		StickyNote,
		Quote
	} from '@lucide/svelte';
	import type { Component, Snippet } from 'svelte';

	type CalloutType = 'info' | 'warning' | 'danger' | 'tip' | 'note' | 'quote';

	interface Props {
		type?: CalloutType;
		cite?: string;
		year?: number;
		children: Snippet;
	}

	let { type = 'info', cite, year, children }: Props = $props();

	const config: Record<
		CalloutType,
		{ icon: Component<{ size?: number; class?: string }>; label: string }
	> = {
		info: { icon: Info, label: 'Info' },
		warning: { icon: TriangleAlert, label: 'Warning' },
		danger: { icon: OctagonAlert, label: 'Danger' },
		tip: { icon: Lightbulb, label: 'Tip' },
		note: { icon: StickyNote, label: 'Note' },
		quote: { icon: Quote, label: 'Quote' }
	};

	const Icon = $derived(config[type].icon);
	const label = $derived(config[type].label);
</script>

<div
	class="callout callout-{type} overflow-hidden rounded-xl"
	role="note">
	<div class="callout-header">
		<Icon size={16} />
		<span>{label}</span>
	</div>
	<div class="callout-body">
		{@render children()}
	</div>
	{#if cite}
		<div class="callout-cite">
			{cite}{#if year}, {year}{/if}
		</div>
	{/if}
</div>

<style>
	.callout {
		--callout-accent-width: max(6px, var(--theme-radius-xl));
		position: relative;
		padding: 0.75rem 1rem;
		padding-inline-start: calc(var(--callout-accent-width) + 1rem);
		margin-bottom: 1rem;
	}

	.callout::before {
		content: '';
		position: absolute;
		inset-block: 0;
		inset-inline-start: 0;
		width: var(--callout-accent-width);
		background: var(--callout-accent);
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

	/* Markdown content arrives as block elements (p, ul) whose prose
	   margins would otherwise pad the callout bottom. */
	.callout-body > :global(:last-child) {
		margin-bottom: 0;
	}

	.callout-info {
		--callout-accent: var(--theme-info-border);
		background: color-mix(in srgb, var(--theme-info-bg) 50%, transparent);
	}

	.callout-info .callout-header {
		color: var(--theme-info-text);
	}

	.callout-warning {
		--callout-accent: var(--theme-warning-border);
		background: color-mix(in srgb, var(--theme-warning-bg) 50%, transparent);
	}

	.callout-warning .callout-header {
		color: var(--theme-warning-text);
	}

	.callout-danger {
		--callout-accent: var(--theme-danger-border);
		background: color-mix(in srgb, var(--theme-danger-bg) 50%, transparent);
	}

	.callout-danger .callout-header {
		color: var(--theme-danger-text);
	}

	.callout-tip {
		--callout-accent: var(--theme-success-border);
		background: color-mix(in srgb, var(--theme-success-bg) 50%, transparent);
	}

	.callout-tip .callout-header {
		color: var(--theme-success-text);
	}

	.callout-note {
		--callout-accent: var(--theme-border);
		background: color-mix(in srgb, var(--theme-surface-muted) 50%, transparent);
	}

	.callout-note .callout-header {
		color: var(--theme-text);
	}

	.callout-quote {
		--callout-accent: var(--theme-border);
		background: color-mix(in srgb, var(--theme-surface-muted) 50%, transparent);
	}

	.callout-quote .callout-header {
		color: var(--theme-text-muted);
	}

	.callout-quote .callout-body {
		font-style: italic;
	}

	.callout-cite {
		margin-top: 0.5rem;
		font-size: 0.8125rem;
		font-weight: 500;
		color: var(--theme-text-muted);
	}
</style>
