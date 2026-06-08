<script lang="ts">
	import { User, ExternalLink } from '@lucide/svelte';

	interface Props {
		name: string;
		avatar?: string;
		href?: string;
		size?: 'sm' | 'md';
		class?: string;
	}

	let { name, avatar, href, size = 'sm', class: className }: Props = $props();

	const avatarSizes: Record<NonNullable<Props['size']>, string> = {
		sm: 'size-4',
		md: 'size-5'
	};

	const iconSizes: Record<NonNullable<Props['size']>, number> = {
		sm: 12,
		md: 14
	};

	const textSizes: Record<NonNullable<Props['size']>, string> = {
		sm: 'text-xs',
		md: 'text-sm'
	};

	const pillClasses = $derived(
		`inline-flex items-center gap-1.5 rounded-pill bg-surface-muted px-2.5 py-1 ${className ?? ''}`
	);
</script>

{#if href}
	<a
		{href}
		rel="external"
		class="{pillClasses} text-text-soft transition-colors hover:bg-surface-hover">
		{#if avatar}
			<img
				src={avatar}
				alt={name}
				class="rounded-pill object-cover {avatarSizes[size!]}" />
		{:else}
			<User size={iconSizes[size!]} />
		{/if}
		<span class="font-medium {textSizes[size!]}">{name}</span>
		<ExternalLink
			size={iconSizes[size!]}
			class="text-text-muted" />
	</a>
{:else}
	<span class="{pillClasses} text-text-soft">
		{#if avatar}
			<img
				src={avatar}
				alt={name}
				class="rounded-pill object-cover {avatarSizes[size!]}" />
		{:else}
			<User size={iconSizes[size!]} />
		{/if}
		<span class="font-medium {textSizes[size!]}">{name}</span>
	</span>
{/if}
