<script lang="ts">
	import type { Snippet } from 'svelte';
	import { tick } from 'svelte';

	interface Props {
		text?: string;
		position?: 'top' | 'bottom' | 'left' | 'right';
		align?: 'left' | 'middle' | 'right';
		class?: string;
		children: Snippet;
	}

	let {
		text = '',
		position = 'bottom',
		align = 'middle',
		class: className = '',
		children
	}: Props = $props();

	const PADDING = 8;

	let visible = $state(false);
	let hovered = false;
	let focused = false;
	let style = $state('');
	let wrapperEl: HTMLDivElement | undefined = $state();
	let tooltipEl: HTMLDivElement | undefined = $state();

	async function show() {
		if (!text || !wrapperEl) return;
		const rect = wrapperEl.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;

		if (position === 'top') {
			if (align === 'left') {
				style = `left:${rect.left}px;top:${rect.top}px;transform:translateY(-100%) translateY(-8px)`;
			} else if (align === 'right') {
				style = `right:${window.innerWidth - rect.right}px;top:${rect.top}px;transform:translateY(-100%) translateY(-8px)`;
			} else {
				style = `left:${centerX}px;top:${rect.top}px;transform:translate(-50%,-100%) translateY(-8px)`;
			}
		} else if (position === 'right') {
			style = `left:${rect.right}px;top:${rect.top + rect.height / 2}px;transform:translate(8px,-50%)`;
		} else if (position === 'left') {
			style = `right:${window.innerWidth - rect.left + 8}px;top:${rect.top + rect.height / 2}px;transform:translateY(-50%)`;
		} else {
			if (align === 'left') {
				style = `left:${rect.left}px;top:${rect.bottom}px;transform:translateY(8px)`;
			} else if (align === 'right') {
				style = `right:${window.innerWidth - rect.right}px;top:${rect.bottom}px;transform:translateY(8px)`;
			} else {
				style = `left:${centerX}px;top:${rect.bottom}px;transform:translate(-50%,0) translateY(8px)`;
			}
		}
		visible = true;

		await tick();
		if (!tooltipEl) return;
		const tip = tooltipEl.getBoundingClientRect();
		const vw = window.innerWidth;
		const vh = window.innerHeight;

		let left: number;
		if (position === 'right') {
			left = rect.right + 8;
			if (left + tip.width > vw - PADDING) left = rect.left - tip.width - 8;
			left = Math.max(PADDING, Math.min(left, vw - tip.width - PADDING));
		} else if (position === 'left') {
			left = rect.left - tip.width - 8;
			if (left < PADDING) left = rect.right + 8;
			left = Math.max(PADDING, Math.min(left, vw - tip.width - PADDING));
		} else {
			if (align === 'left') {
				left = rect.left;
			} else if (align === 'right') {
				left = rect.right - tip.width;
			} else {
				left = centerX - tip.width / 2;
			}
			left = Math.max(PADDING, Math.min(left, vw - tip.width - PADDING));
		}

		let top: number;
		if (position === 'right' || position === 'left') {
			top = rect.top + rect.height / 2 - tip.height / 2;
			top = Math.max(PADDING, Math.min(top, vh - tip.height - PADDING));
		} else if (position === 'top') {
			top = rect.top - tip.height - 8;
			if (top < PADDING) top = rect.bottom + 8;
		} else {
			top = rect.bottom + 8;
			if (top + tip.height > vh - PADDING) top = rect.top - tip.height - 8;
		}

		style = `left:${left}px;top:${top}px;width:${tip.width}px`;
	}

	function enter() {
		hovered = true;
		show();
	}

	function leave() {
		hovered = false;
		if (!focused) visible = false;
	}

	function focusIn() {
		focused = true;
		show();
	}

	function focusOut() {
		focused = false;
		if (!hovered) visible = false;
	}

	function portal(node: HTMLElement) {
		document.body.appendChild(node);
		return {
			destroy() {
				node.parentNode?.removeChild(node);
			}
		};
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="inline-flex {className}"
	bind:this={wrapperEl}
	onmouseenter={enter}
	onmouseleave={leave}
	onfocusin={focusIn}
	onfocusout={focusOut}>
	{@render children()}
	{#if text && visible}
		<div
			use:portal
			bind:this={tooltipEl}
			role="tooltip"
			class="pointer-events-none fixed z-[110]"
			{style}>
			<div class="overflow-hidden rounded-control border border-border bg-bg shadow-card">
				<div class="bg-surface px-2 py-1 text-xs font-medium whitespace-pre-wrap text-text">
					{text}
				</div>
			</div>
		</div>
	{/if}
</div>
