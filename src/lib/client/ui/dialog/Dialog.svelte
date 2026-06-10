<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		/** Bindable. The dialog opens modally (focus trap, inert background). */
		open?: boolean;
		/** Fires on any close: Escape, backdrop click, or open set to false. */
		onclose?: () => void;
		ariaLabel?: string;
		class?: string;
		/** Fixed region above the scrollable content, separated by a border. */
		header?: Snippet;
		/** Fixed region below the scrollable content, separated by a border. */
		footer?: Snippet;
		children: Snippet;
	}

	let {
		open = $bindable(false),
		onclose,
		ariaLabel,
		class: className = '',
		header,
		footer,
		children
	}: Props = $props();

	let dialogEl: HTMLDialogElement | undefined = $state();

	$effect(() => {
		if (!dialogEl) return;
		if (open && !dialogEl.open) {
			dialogEl.showModal();
		} else if (!open && dialogEl.open) {
			dialogEl.close();
		}
	});

	// showModal() makes the background inert but not scroll-proof: lock the
	// document while open.
	$effect(() => {
		if (!open) return;
		const root = document.documentElement;
		const previous = root.style.overflow;
		root.style.overflow = 'hidden';
		return () => {
			root.style.overflow = previous;
		};
	});

	// Native close (Escape key) syncs state back.
	function handleClose() {
		open = false;
		onclose?.();
	}

	// A click whose target is the <dialog> itself landed on the backdrop
	// (content fills the panel, so inside clicks target children).
	function handleClick(event: MouseEvent) {
		if (event.target === dialogEl) {
			open = false;
			onclose?.();
		}
	}
</script>

<!--
	Minimal modal shell on the native <dialog>: top-layer rendering, focus
	trap, and Escape come from the browser. No chrome, no padding, no width:
	consumers compose those. Default position is centered; override with
	margin utilities via class (margin longhands beat the m-auto shorthand).
	When height is constrained via class (e.g. max-h-*), the children region
	scrolls while header and footer stay fixed.
-->
<dialog
	bind:this={dialogEl}
	onclose={handleClose}
	onclick={handleClick}
	aria-label={ariaLabel}
	class="m-auto overflow-hidden rounded-xl border border-border bg-bg p-0 text-text shadow-card backdrop:bg-bg/50 backdrop:backdrop-blur-[2px] {className}">
	<!-- Opaque bg-bg base above, translucent bg-surface layer here, so the
	     backdrop and page never bleed through (matches Dropdown). -->
	<div class="flex min-h-0 flex-1 flex-col bg-surface">
		{#if header}
			<div class="shrink-0 border-b border-border">
				{@render header()}
			</div>
		{/if}
		<div class="min-h-0 flex-1 overflow-y-auto">
			{@render children()}
		</div>
		{#if footer}
			<div class="shrink-0 border-t border-border">
				{@render footer()}
			</div>
		{/if}
	</div>
</dialog>

<style>
	/* Entry animation via @starting-style. Close is deliberately instant
	   (palette convention; the CSS exit-transition path proved unreliable
	   and was removed). Browsers without @starting-style simply snap. */
	dialog[open] {
		display: flex;
		flex-direction: column;
		transition:
			opacity 150ms ease,
			transform 150ms ease;
	}

	@starting-style {
		dialog[open] {
			opacity: 0;
			transform: translateY(0.5rem) scale(0.98);
		}
	}

	dialog[open]::backdrop {
		transition: opacity 150ms ease;
	}

	@starting-style {
		dialog[open]::backdrop {
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		dialog[open],
		dialog[open]::backdrop {
			transition: none;
		}
	}
</style>
