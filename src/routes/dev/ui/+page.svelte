<script lang="ts">
	import SEO from '$lib/client/ui/utils/SEO.svelte';
	import Button from '$lib/client/ui/button/Button.svelte';
	import { theme, THEMES } from '$lib/client/ui/theme/theme.svelte';
	import { Save } from '@lucide/svelte';
</script>

<SEO title="UI Showcase" />

<!--
	Each row varies ONE prop and uses defaults for everything else.
	e.g. "Variants" shows all variants at default size (md).
	"Sizes" shows all sizes at default variant (default).
-->

<div class="mx-auto max-w-3xl space-y-12 p-8">
	<header class="space-y-4">
		<h1 class="text-2xl font-bold">UI Showcase</h1>
		<div class="flex gap-2">
			{#each THEMES as t}
				<Button
					type="button"
					variant={theme.current === t ? 'accent' : 'default'}
					onclick={() => theme.set(t)}>
					{t}
				</Button>
			{/each}
		</div>
	</header>

	<section class="space-y-4">
		<h2 class="text-lg font-semibold">Button</h2>

		<div class="space-y-6">
			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Variants</h3>
				<div class="flex flex-wrap items-center gap-3">
					<Button type="button" variant="default">Default</Button>
					<Button type="button" variant="accent">Accent</Button>
					<Button type="button" variant="danger">Danger</Button>
					<Button type="button" variant="outline">Outline</Button>
					<Button type="button" variant="ghost">Ghost</Button>
				</div>
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Sizes</h3>
				<div class="flex flex-wrap items-center gap-3">
					<Button type="button" size="sm">Small</Button>
					<Button type="button" size="md">Medium</Button>
					<Button type="button" size="lg">Large</Button>
				</div>
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Disabled</h3>
				<div class="flex flex-wrap items-center gap-3">
					<Button type="button">Enabled</Button>
					<Button type="button" disabled>Disabled</Button>
				</div>
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Icon</h3>
				<div class="flex flex-wrap items-center gap-3">
					<Button type="button">No icon</Button>
					<Button type="button" icon={Save}>With icon</Button>
				</div>
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Icon position</h3>
				<div class="flex flex-wrap items-center gap-3">
					<Button type="button" icon={Save}>Left</Button>
					<Button type="button" icon={Save} iconPosition="right">Right</Button>
				</div>
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Icon only</h3>
				<div class="flex flex-wrap items-center gap-3">
					<Button type="button" icon={Save} />
				</div>
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Icon color</h3>
				<div class="flex flex-wrap items-center gap-3">
					<Button type="button" icon={Save}>Default</Button>
					<Button type="button" icon={Save} iconClass="text-accent-text">Custom</Button>
				</div>
			</div>
		</div>
	</section>
</div>
