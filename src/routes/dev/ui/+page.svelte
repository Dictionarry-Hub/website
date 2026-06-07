<script lang="ts">
	import SEO from '$lib/client/ui/utils/SEO.svelte';
	import Button from '$lib/client/ui/button/Button.svelte';
	import { theme, THEMES } from '$lib/client/ui/theme/theme.svelte';
	import { Save } from '@lucide/svelte';
	import Tooltip from '$lib/client/ui/tooltip/Tooltip.svelte';
	import Card from '$lib/client/ui/card/Card.svelte';
</script>

<SEO title="UI Showcase" />

<!--
	Each row varies ONE prop and uses defaults for everything else.
	e.g. "Variants" shows all variants at default size (md).
	"Sizes" shows all sizes at default variant (default).
-->

<div class="mx-auto max-w-3xl space-y-12 p-8 pb-48">
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

	<section class="space-y-4">
		<h2 class="text-lg font-semibold">Tooltip</h2>

		<div class="space-y-6">
			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Position</h3>
				<div class="grid grid-cols-3 place-items-center gap-4">
					<div></div>
					<Tooltip text="Appears above" position="top">
						<Button type="button">Top</Button>
					</Tooltip>
					<div></div>
					<Tooltip text="Appears left" position="left">
						<Button type="button">Left</Button>
					</Tooltip>
					<div></div>
					<Tooltip text="Appears right" position="right">
						<Button type="button">Right</Button>
					</Tooltip>
					<div></div>
					<Tooltip text="Appears below" position="bottom">
						<Button type="button">Bottom</Button>
					</Tooltip>
					<div></div>
				</div>
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Alignment</h3>
				<div class="flex items-center justify-between">
					<Tooltip text="Anchored to left edge" position="bottom" align="left">
						<Button type="button">Left</Button>
					</Tooltip>
					<Tooltip text="Centered on trigger" position="bottom" align="middle">
						<Button type="button">Middle</Button>
					</Tooltip>
					<Tooltip text="Anchored to right edge" position="bottom" align="right">
						<Button type="button">Right</Button>
					</Tooltip>
				</div>
			</div>
		</div>
	</section>

	<section class="space-y-4">
		<h2 class="text-lg font-semibold">Card</h2>

		<div class="space-y-6">
			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Rounded</h3>
				<div class="grid grid-cols-5 gap-3">
					<Card rounded="none" class="p-4 text-center text-sm">none</Card>
					<Card rounded="sm" class="p-4 text-center text-sm">sm</Card>
					<Card rounded="md" class="p-4 text-center text-sm">md</Card>
					<Card rounded="lg" class="p-4 text-center text-sm">lg</Card>
					<Card rounded="xl" class="p-4 text-center text-sm">xl</Card>
				</div>
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">As element</h3>
				<div class="flex flex-wrap items-start gap-3">
					<Card class="p-4 text-sm">div (default)</Card>
					<Card as="section" class="p-4 text-sm">section</Card>
					<Card as="nav" class="p-4 text-sm">nav</Card>
					<Card as="aside" class="p-4 text-sm">aside</Card>
				</div>
			</div>
		</div>
	</section>
</div>
