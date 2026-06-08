<script lang="ts">
	import { page } from '$app/state';
	import SEO from '$lib/client/ui/utils/SEO.svelte';
	import Button from '$lib/client/ui/button/Button.svelte';
	import { House } from '@lucide/svelte';

	interface ErrorContent {
		title: string;
		message: string;
		gif: string | null;
	}

	const ERROR_CONTENT: Record<number, ErrorContent> = {
		404: {
			title: 'Page Not Found',
			message: "You look lost. This page doesn't exist.",
			gif: '/errors/404.gif'
		},
		403: {
			title: 'Forbidden',
			message: 'You shall not pass.',
			gif: '/errors/403.gif'
		},
		500: {
			title: 'Internal Server Error',
			message: 'This is fine. Everything is fine.',
			gif: '/errors/500.gif'
		}
	};

	const FALLBACK: ErrorContent = {
		title: 'Something Went Wrong',
		message: "We're not sure what happened, but it wasn't good.",
		gif: null
	};

	const status = $derived(page.status);
	const content = $derived(ERROR_CONTENT[status] ?? FALLBACK);
</script>

<SEO title="{status} - {content.title}" />

<div class="flex min-h-[60vh] items-center justify-center">
	<div class="flex max-w-sm flex-col items-center text-center">
		<p class="text-6xl font-bold text-text-muted">{status}</p>
		<h1 class="mt-2 text-2xl font-bold">{content.title}</h1>
		<p class="mt-2 text-text-muted">{content.message}</p>

		{#if content.gif}
			<div class="mt-8 aspect-video w-72 overflow-hidden rounded-card bg-surface-muted">
				<img
					src={content.gif}
					alt={content.title}
					class="h-full w-full object-contain" />
			</div>
		{/if}

		<div class="mt-8">
			<Button
				type="button"
				variant="accent"
				icon={House}
				onclick={() => (window.location.href = '/')}>
				Go Home
			</Button>
		</div>
	</div>
</div>
