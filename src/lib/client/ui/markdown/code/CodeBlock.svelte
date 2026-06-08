<script lang="ts">
	import type { Component } from 'svelte';
	import { Copy, Check } from '@lucide/svelte';
	import Button from '$lib/client/ui/button/Button.svelte';
	import { highlight } from './highlight.js';

	interface CodeItem {
		title: string;
		code: string;
		language: string;
		icon?: Component<{ size?: number; class?: string }>;
	}

	interface Props {
		items: CodeItem[];
		overflow?: 'scroll' | 'wrap';
	}

	let { items, overflow = 'scroll' }: Props = $props();

	let activeTab = $state(0);
	let copied = $state(false);

	const highlighted = $derived(items.map((item) => highlight(item.code.trim(), item.language)));

	async function copyToClipboard() {
		const code = items[activeTab].code.trim();
		try {
			await navigator.clipboard.writeText(code);
			copied = true;
			setTimeout(() => {
				copied = false;
			}, 2000);
		} catch {
			// Clipboard API unavailable
		}
	}
</script>

<div class="code-block">
	{#if items.length > 1}
		<div class="code-header tabbed">
			<div class="code-tabs">
				{#each items as item, index (item.title)}
					<button
						type="button"
						class="code-tab"
						class:active={activeTab === index}
						onclick={() => (activeTab = index)}>
						{#if item.icon}
							{@const Icon = item.icon}
							<Icon size={14} />
						{/if}
						{item.title}
					</button>
				{/each}
			</div>
			<Button
				type="button"
				variant="default"
				size="sm"
				icon={copied ? Check : Copy}
				iconClass={copied ? 'text-success-icon' : ''}
				onclick={copyToClipboard}
				aria-label="Copy code" />
		</div>
	{:else}
		<div class="code-header">
			<div class="code-title">
				{#if items[0].icon}
					{@const Icon = items[0].icon}
					<Icon size={14} />
				{/if}
				<span>{items[0].title}</span>
			</div>
			<Button
				type="button"
				variant="default"
				size="sm"
				icon={copied ? Check : Copy}
				iconClass={copied ? 'text-success-icon' : ''}
				onclick={copyToClipboard}
				aria-label="Copy code" />
		</div>
	{/if}

	<div
		class="code-body"
		class:wrap={overflow === 'wrap'}>
		{#each highlighted as html, index (index)}
			<div
				class="code-panel"
				class:hidden={index !== activeTab}>
				<!-- eslint-disable-next-line svelte/no-at-html-tags -- highlighted code from build-time shiki -->
			{@html html}
			</div>
		{/each}
	</div>
</div>

<style>
	.code-block {
		border: 1px solid var(--theme-border);
		border-radius: var(--theme-radius-card);
		overflow: hidden;
		background: var(--theme-surface-muted);
		margin-bottom: 1.25rem;
	}

	.code-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 0.5rem 0 0;
		min-height: 2.5rem;
		border-bottom: 1px solid var(--theme-border-muted);
		background: var(--theme-surface);
	}

	.code-header.tabbed {
		padding: 0 0.5rem 0 0;
	}

	.code-tabs {
		display: flex;
	}

	.code-tab {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1rem;
		font-size: 0.8125rem;
		font-weight: 500;
		color: var(--theme-text-muted);
		background: none;
		border: none;
		border-bottom: 2px solid transparent;
		cursor: pointer;
		transition:
			color 0.15s,
			background-color 0.15s,
			border-color 0.15s;
	}

	.code-tab:hover {
		color: var(--theme-text);
		background: var(--theme-surface-hover-muted);
	}

	.code-tab.active {
		color: var(--theme-text);
		background: var(--theme-surface-hover-muted);
		border-bottom-color: var(--theme-accent-solid);
	}

	.code-title {
		display: flex;
		align-items: center;
		gap: 0.375rem;
		padding-left: 0.75rem;
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--theme-text-muted);
	}

	.code-body {
		overflow: hidden;
	}

	.code-panel {
		padding: 1rem;
		overflow-x: auto;
	}

	.code-panel.hidden {
		display: none;
	}

	.code-body.wrap .code-panel {
		overflow-x: hidden;
	}

	/* Shiki output styling */
	.code-panel :global(pre) {
		margin: 0;
		padding: 0;
		background: transparent !important;
		font-family: var(--theme-font-mono);
		font-size: 0.8125rem;
		line-height: 1.625;
	}

	.code-panel :global(code) {
		font-family: inherit;
		font-size: inherit;
		background: none;
		padding: 0;
		border-radius: 0;
	}

	.code-body.wrap .code-panel :global(pre) {
		white-space: pre-wrap;
		word-break: break-all;
		overflow-wrap: anywhere;
	}
</style>
