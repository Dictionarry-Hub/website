<script lang="ts">
	import { page } from '$app/state';
	import type { Component, Snippet } from 'svelte';

	interface Props {
		label: string;
		href: string;
		icon?: Component<{ size?: number; class?: string }>;
		image?: string;
		badge?: number;
		activePattern?: string | RegExp;
	}

	let { label, href, icon, image, badge = 0, activePattern }: Props = $props();

	const isActive = $derived.by(() => {
		const pathname = page.url.pathname;

		if (activePattern) {
			if (typeof activePattern === 'string') {
				return pathname.includes(activePattern);
			}
			return activePattern.test(pathname);
		}

		return pathname === href || pathname.startsWith(href + '/');
	});
</script>

<a
	{href}
	class="flex items-center gap-2 rounded-control border py-1.5 pr-2 pl-3 text-sm font-semibold transition-colors
		{isActive
		? 'bg-surface text-text border-border shadow-control'
		: 'border-transparent text-text-muted hover:bg-surface-hover hover:text-text'}">
	{#if icon}
		{@const Icon = icon}
		<Icon size={14} />
	{/if}
	{#if image}
		<img src={image} alt="" class="size-3.5" />
	{/if}
	<span class="flex-1">{label}</span>
	{#if badge > 0}
		<span
			class="inline-flex min-w-5 items-center justify-center rounded-pill bg-accent-solid px-1.5 py-0.5 text-xs font-medium text-on-accent">
			{badge}
		</span>
	{/if}
</a>
