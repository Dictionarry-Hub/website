<script lang="ts">
	import { Copy, Check, CircleAlert } from '@lucide/svelte';
	import Button from '$lib/client/ui/button/Button.svelte';
	import { copyMarkdownArtifact } from './copy.js';

	interface Props {
		url: string;
		label?: string;
		/** Accessible name for the icon-only form. Should state the copy scope,
		 * matching the surrounding Tooltip text. */
		ariaLabel?: string;
		variant?: 'default' | 'outline' | 'ghost';
		size?: 'sm' | 'md';
	}

	let { url, label, ariaLabel, variant = 'outline', size = 'sm' }: Props = $props();

	let status = $state<'idle' | 'copied' | 'failed'>('idle');
	let timer: ReturnType<typeof setTimeout> | undefined;

	const icon = $derived(status === 'copied' ? Check : status === 'failed' ? CircleAlert : Copy);
	const iconClass = $derived(
		status === 'copied' ? 'text-success-icon' : status === 'failed' ? 'text-danger-icon' : ''
	);

	async function copy() {
		status = (await copyMarkdownArtifact(url)) ? 'copied' : 'failed';
		clearTimeout(timer);
		timer = setTimeout(() => (status = 'idle'), 2000);
	}
</script>

{#if label}
	<Button
		type="button"
		{variant}
		{size}
		{icon}
		{iconClass}
		onclick={copy}>
		{label}
	</Button>
{:else}
	<Button
		type="button"
		{variant}
		{size}
		{icon}
		iconClass="size-3.5 p-px {iconClass}"
		onclick={copy}
		aria-label={ariaLabel ?? 'Copy as Markdown'} />
{/if}
