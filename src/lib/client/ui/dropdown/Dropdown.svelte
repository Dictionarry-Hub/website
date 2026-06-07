<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		position?: 'left' | 'right' | 'middle';
		minWidth?: string;
		width?: string;
		placement?: 'auto' | 'bottom' | 'top';
		triggerEl?: HTMLElement;
		children: Snippet;
		onplacementchange?: (placement: 'bottom' | 'top') => void;
	}

	let {
		position = 'left',
		minWidth = '12rem',
		width,
		placement = 'auto',
		triggerEl,
		children,
		onplacementchange
	}: Props = $props();

	const GAP = 8;

	let dropdownEl: HTMLElement | undefined = $state();
	let fixedStyle = $state('');

	function updatePosition() {
		if (!triggerEl || !dropdownEl) return;

		const rect = triggerEl.getBoundingClientRect();
		const resolvedPlacement =
			placement !== 'auto'
				? placement
				: rect.top + rect.height / 2 > window.innerHeight / 2
					? 'top'
					: 'bottom';

		onplacementchange?.(resolvedPlacement);

		const vertical =
			resolvedPlacement === 'top'
				? `bottom: ${window.innerHeight - rect.top + GAP}px;`
				: `top: ${rect.bottom + GAP}px;`;

		let left: number;
		if (position === 'right') {
			left = rect.right - dropdownEl.offsetWidth;
		} else if (position === 'middle') {
			left = rect.left + rect.width / 2 - dropdownEl.offsetWidth / 2;
		} else {
			left = rect.left;
		}

		fixedStyle = `${vertical} left: ${left}px;`;
	}

	$effect(() => {
		if (triggerEl && dropdownEl) {
			updatePosition();
		}
	});

	function portal(node: HTMLElement) {
		document.body.appendChild(node);
		return {
			destroy() {
				node.parentNode?.removeChild(node);
			}
		};
	}
</script>

<div
	use:portal
	bind:this={dropdownEl}
	class="fixed z-50 overflow-hidden rounded-card border border-border bg-bg shadow-card"
	style="min-width: {minWidth}; {width ? `width: ${width};` : ''} {fixedStyle}">
	<div class="bg-surface">
		{@render children()}
	</div>
</div>
