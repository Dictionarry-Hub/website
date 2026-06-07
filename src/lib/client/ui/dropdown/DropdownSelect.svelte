<script lang="ts">
	import type { Component } from 'svelte';
	import { ChevronDown, ChevronUp } from '@lucide/svelte';
	import { clickOutside } from '$lib/client/utils/clickOutside';
	import Button from '$lib/client/ui/button/Button.svelte';
	import Dropdown from './Dropdown.svelte';
	import DropdownItem from './DropdownItem.svelte';

	interface Props {
		label?: string;
		value: string;
		options: {
			value: string;
			label: string;
			icon?: Component<{ size?: number; class?: string }>;
		}[];
		placeholder?: string;
		minWidth?: string;
		position?: 'left' | 'right' | 'middle';
		placement?: 'auto' | 'bottom' | 'top';
		disabled?: boolean;
		iconOnly?: boolean;
		onchange?: (value: string) => void;
	}

	let {
		label,
		value = $bindable(),
		options,
		placeholder = 'Select...',
		minWidth = '8rem',
		position = 'left',
		placement = 'auto',
		disabled = false,
		iconOnly = false,
		onchange
	}: Props = $props();

	let open = $state(false);
	let triggerEl: HTMLElement | undefined = $state();
	let resolvedPlacement: 'bottom' | 'top' = $state('bottom');

	const matchedOption = $derived(options.find((o) => o.value === value));
	const currentLabel = $derived(matchedOption?.label ?? placeholder);
	const currentIcon = $derived(matchedOption?.icon);
	const isPlaceholder = $derived(!matchedOption);
	const chevronIcon = $derived(open && resolvedPlacement === 'top' ? ChevronUp : ChevronDown);

	function select(optionValue: string) {
		value = optionValue;
		onchange?.(optionValue);
		open = false;
	}
</script>

<div class="flex items-center gap-2">
	{#if label}
		<span class="text-sm text-text-muted">{label}</span>
	{/if}
	<div class="relative" bind:this={triggerEl} use:clickOutside={() => (open = false)}>
		{#if iconOnly && currentIcon}
			<Button
				type="button"
				icon={currentIcon}
				{disabled}
				onclick={() => !disabled && (open = !open)} />
		{:else}
			<Button
				type="button"
				icon={chevronIcon}
				iconPosition="right"
				{disabled}
				class={isPlaceholder ? 'text-text-muted' : ''}
				onclick={() => !disabled && (open = !open)}>
				{currentLabel}
			</Button>
		{/if}
		{#if open}
			<Dropdown
				{position}
				{placement}
				{minWidth}
				{triggerEl}
				onplacementchange={(p) => (resolvedPlacement = p)}>
				{#each options as option}
					<DropdownItem
						label={option.label}
						icon={option.icon}
						selected={value === option.value}
						onclick={() => select(option.value)} />
				{/each}
			</Dropdown>
		{/if}
	</div>
</div>
