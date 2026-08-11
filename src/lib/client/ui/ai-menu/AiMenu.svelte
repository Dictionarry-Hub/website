<script lang="ts">
	import { Copy, Check, CircleAlert, FileText } from '@lucide/svelte';
	import SiClaude from '@icons-pack/svelte-simple-icons/icons/SiClaude';
	import Button from '$lib/client/ui/button/Button.svelte';
	import OpenAiIcon from './OpenAiIcon.svelte';
	import SparkleIcon from './SparkleIcon.svelte';
	import Dropdown from '$lib/client/ui/dropdown/Dropdown.svelte';
	import DropdownItem from '$lib/client/ui/dropdown/DropdownItem.svelte';
	import Tooltip from '$lib/client/ui/tooltip/Tooltip.svelte';
	import { clickOutside } from '$lib/client/utils/clickOutside';
	import { copyArtifact } from '$lib/client/utils/artifact';
	import { assistantLink } from '$lib/shared/utils/llm/index.js';

	interface Props {
		/** Path of the markdown artifact, e.g. /api/v1.md */
		artifactPath: string;
		/** Path of the HTML page, e.g. /api/v1 */
		pagePath: string;
		/** Prompt template for assistant links. `{url}` is replaced per assistant. */
		prompt?: string;
	}

	let { artifactPath, pagePath, prompt }: Props = $props();

	let open = $state(false);
	let triggerEl: HTMLElement | undefined = $state();
	let copyStatus = $state<'idle' | 'copied' | 'failed'>('idle');
	let timer: ReturnType<typeof setTimeout> | undefined;

	const copyLabel = $derived(
		copyStatus === 'copied'
			? 'Copied!'
			: copyStatus === 'failed'
				? 'Failed to copy'
				: 'Copy page as Markdown'
	);
	const copyIcon = $derived(
		copyStatus === 'copied' ? Check : copyStatus === 'failed' ? CircleAlert : Copy
	);

	async function copyPage() {
		copyStatus = (await copyArtifact(artifactPath)) ? 'copied' : 'failed';
		clearTimeout(timer);
		timer = setTimeout(() => {
			copyStatus = 'idle';
			open = false;
		}, 1200);
	}

	function openLink(href: string) {
		window.open(href, '_blank', 'noopener');
		open = false;
	}
</script>

<div
	class="relative"
	bind:this={triggerEl}
	use:clickOutside={() => (open = false)}>
	<Tooltip
		text="AI actions"
		position="top">
		<Button
			type="button"
			variant="outline"
			size="md"
			icon={SparkleIcon}
			onclick={() => (open = !open)}
			aria-label="AI actions" />
	</Tooltip>
	{#if open}
		<Dropdown
			{triggerEl}
			position="right"
			minWidth="15rem">
			<DropdownItem
				label={copyLabel}
				icon={copyIcon}
				onclick={copyPage} />
			<DropdownItem
				label="View as Markdown"
				icon={FileText}
				onclick={() => openLink(artifactPath)} />
			<DropdownItem
				label="Open in Claude"
				icon={SiClaude}
				onclick={() =>
					openLink(assistantLink('claude', { artifactPath, pagePath }, prompt))} />
			<DropdownItem
				label="Open in ChatGPT"
				icon={OpenAiIcon}
				onclick={() =>
					openLink(assistantLink('chatgpt', { artifactPath, pagePath }, prompt))} />
		</Dropdown>
	{/if}
</div>
