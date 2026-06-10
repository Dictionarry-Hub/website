<script lang="ts">
	import { slide } from 'svelte/transition';
	import type { Component, Snippet } from 'svelte';
	import { clickOutside } from '$lib/client/utils/clickOutside';
	import Dropdown from '$lib/client/ui/dropdown/Dropdown.svelte';
	import DropdownHeader from '$lib/client/ui/dropdown/DropdownHeader.svelte';
	import DropdownItem from '$lib/client/ui/dropdown/DropdownItem.svelte';
	import Tooltip from '$lib/client/ui/tooltip/Tooltip.svelte';

	interface Props {
		value: string;
		options: {
			value: string;
			label: string;
			icon?: Component<{ size?: number; class?: string }>;
			emoji?: string;
		}[];
		header?: string;
		tooltip?: string;
		open?: boolean;
		children?: Snippet;
		onchange?: (value: string) => void;
	}

	let {
		value = $bindable(),
		options,
		header,
		tooltip = 'Click to switch',
		open = true,
		children,
		onchange
	}: Props = $props();

	let toggled = $state<boolean | null>(null);
	const isOpen = $derived(toggled ?? open);

	let menuOpen = $state(false);
	let triggerEl: HTMLElement | undefined = $state();

	const matchedOption = $derived(options.find((o) => o.value === value));
	const currentLabel = $derived(matchedOption?.label ?? 'Select...');
	const currentEmoji = $derived(matchedOption?.emoji);
	const currentIcon = $derived(matchedOption?.icon);

	function toggleOpen() {
		toggled = !isOpen;
	}

	function select(optionValue: string) {
		value = optionValue;
		onchange?.(optionValue);
		menuOpen = false;
	}
</script>

<!-- NavGroup's split-header language, with the link side replaced by a
     select trigger: left picks the context, right chevron collapses the
     subtree it controls. -->
<div class="mb-4">
	<div
		class="group/header relative flex items-center rounded-control border border-transparent transition-colors"
		bind:this={triggerEl}
		use:clickOutside={() => (menuOpen = false)}>
		<Tooltip
			text={tooltip}
			position="bottom"
			align="left"
			class="min-w-0 flex-1">
			<button
				type="button"
				onclick={() => (menuOpen = !menuOpen)}
				aria-label={tooltip}
				class="flex w-full min-w-0 cursor-pointer items-center gap-2 rounded-l-control py-1.5 pr-2 pl-3 text-left text-sm font-semibold text-text-soft transition-colors group-hover/header:bg-surface-hover">
				{#if currentEmoji}
					<span class="w-4 text-center leading-none">{currentEmoji}</span>
				{:else if currentIcon}
					{@const Icon = currentIcon}
					<Icon
						size={16}
						class="shrink-0" />
				{/if}
				<span class="flex-1 truncate">{currentLabel}</span>
			</button>
		</Tooltip>

		{#if children}
			<button
				type="button"
				onclick={toggleOpen}
				class="flex cursor-pointer items-center self-stretch rounded-r-control pr-1.5 pl-1.5 transition-colors group-hover/header:bg-surface-hover hover:!bg-surface-hover-muted"
				aria-label={isOpen ? 'Collapse group' : 'Expand group'}>
				<svg
					class="size-4 text-text-muted transition-transform {isOpen ? 'rotate-90' : ''}"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 5l7 7-7 7" />
				</svg>
			</button>
		{/if}

		{#if menuOpen}
			<Dropdown
				{triggerEl}
				width={triggerEl ? `${triggerEl.offsetWidth}px` : undefined}>
				{#if header}
					<DropdownHeader label={header} />
				{/if}
				{#each options as option (option.value)}
					<DropdownItem
						label={option.label}
						icon={option.icon}
						emoji={option.emoji}
						selected={value === option.value}
						onclick={() => select(option.value)} />
				{/each}
			</Dropdown>
		{/if}
	</div>

	<!-- Children with vertical connector, matching NavGroup -->
	{#if isOpen && children}
		<div
			class="mt-2 grid grid-cols-[auto_1fr]"
			transition:slide={{ duration: 200 }}>
			<div class="flex justify-center px-5">
				<div class="w-0.5 rounded-pill bg-border-muted"></div>
			</div>
			<div class="-ml-3 flex flex-col gap-1">
				{@render children()}
			</div>
		</div>
	{/if}
</div>
