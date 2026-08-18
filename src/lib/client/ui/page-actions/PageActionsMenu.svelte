<script lang="ts">
	import {
		Check,
		ChevronDown,
		CircleAlert,
		Copy,
		Download,
		FileCode,
		FileText,
		LayoutTemplate
	} from '@lucide/svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import SiClaude from '@icons-pack/svelte-simple-icons/icons/SiClaude';
	import Button from '$lib/client/ui/button/Button.svelte';
	import Dropdown from '$lib/client/ui/dropdown/Dropdown.svelte';
	import DropdownHeader from '$lib/client/ui/dropdown/DropdownHeader.svelte';
	import DropdownItem from '$lib/client/ui/dropdown/DropdownItem.svelte';
	import OpenAiIcon from './OpenAiIcon.svelte';
	import SparkleIcon from './SparkleIcon.svelte';
	import { clickOutside } from '$lib/client/utils/clickOutside';
	import { copyArtifact, downloadArtifact } from '$lib/client/utils/artifact';
	import { assistantLink } from '$lib/shared/utils/llm/index.js';
	import type { PageFormatAction } from './types';

	interface Props {
		formatActions?: PageFormatAction[];
		artifactPath: string;
		pagePath: string;
		prompt?: string;
		viewSwitcher?: boolean;
	}

	let {
		formatActions = [],
		artifactPath,
		pagePath,
		prompt,
		viewSwitcher = false
	}: Props = $props();

	let mounted = $state(false);
	let open = $state(false);
	let triggerEl: HTMLElement | undefined = $state();
	let feedback = $state<{
		status: 'copied' | 'failed';
		label: string;
	} | null>(null);
	let timer: ReturnType<typeof setTimeout> | undefined;
	const activeView = $derived(
		mounted && page.url.searchParams.get('view') === 'yaml' ? 'yaml' : 'rich'
	);

	onMount(() => {
		mounted = true;
	});

	function showFeedback(status: 'copied' | 'failed', successLabel: string) {
		feedback = {
			status,
			label: status === 'copied' ? successLabel : 'Copy failed'
		};
		open = false;
		clearTimeout(timer);
		timer = setTimeout(() => (feedback = null), 2000);
	}

	async function runFormatAction(action: PageFormatAction) {
		if (action.kind === 'download') {
			downloadArtifact(action.url, action.filename);
			open = false;
			return;
		}

		showFeedback((await copyArtifact(action.url)) ? 'copied' : 'failed', action.successLabel);
	}

	async function copyMarkdown() {
		showFeedback((await copyArtifact(artifactPath)) ? 'copied' : 'failed', 'Markdown copied');
	}

	function openLink(href: string) {
		window.open(href, '_blank', 'noopener');
		open = false;
	}

	function toggle() {
		clearTimeout(timer);
		feedback = null;
		open = !open;
	}

	function selectView(view: 'rich' | 'yaml') {
		open = false;
		if (view === activeView) return;

		const url = new URL(page.url);
		if (view === 'yaml') {
			url.searchParams.set('view', 'yaml');
		} else {
			url.searchParams.delete('view');
		}

		void goto(`${url.pathname}${url.search}${url.hash}`, {
			keepFocus: true,
			noScroll: true
		});
	}
</script>

<div
	class="relative"
	bind:this={triggerEl}
	use:clickOutside={() => (open = false)}>
	{#if feedback}
		<Button
			type="button"
			variant="outline"
			size="md"
			icon={feedback.status === 'copied' ? Check : CircleAlert}
			iconClass={feedback.status === 'copied' ? 'text-success-icon' : 'text-danger-icon'}
			onclick={toggle}>
			{feedback.label}
		</Button>
	{:else}
		<Button
			type="button"
			variant="outline"
			size="md"
			icon={ChevronDown}
			iconPosition="right"
			onclick={toggle}>
			<span class="inline-flex items-center gap-2">
				<SparkleIcon size={16} />
				Actions
			</span>
		</Button>
	{/if}
	{#if open}
		<Dropdown
			{triggerEl}
			position="right"
			minWidth="15rem">
			{#if viewSwitcher}
				<DropdownHeader label="Page view" />
				<DropdownItem
					label="Rich view"
					icon={LayoutTemplate}
					selected={activeView === 'rich'}
					onclick={() => selectView('rich')} />
				<DropdownItem
					label="YAML view"
					icon={FileCode}
					selected={activeView === 'yaml'}
					onclick={() => selectView('yaml')} />
			{/if}
			<DropdownHeader label="Page formats" />
			{#each formatActions as action (action.label)}
				<DropdownItem
					label={action.label}
					icon={action.kind === 'copy' ? Copy : Download}
					onclick={() => runFormatAction(action)} />
			{/each}
			<DropdownItem
				label="Copy page as Markdown"
				icon={Copy}
				onclick={copyMarkdown} />
			<DropdownItem
				label="View as Markdown"
				icon={FileText}
				onclick={() => openLink(artifactPath)} />
			<DropdownHeader label="AI actions" />
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
