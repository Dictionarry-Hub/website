<script lang="ts">
	import SEO from '$lib/client/ui/utils/SEO.svelte';
	import Button from '$lib/client/ui/button/Button.svelte';
	import { theme } from '$lib/client/ui/theme/theme.svelte';
	import { Save } from '@lucide/svelte';
	import Tooltip from '$lib/client/ui/tooltip/Tooltip.svelte';
	import Card from '$lib/client/ui/card/Card.svelte';
	import DropdownSelect from '$lib/client/ui/dropdown/DropdownSelect.svelte';
	import Dropdown from '$lib/client/ui/dropdown/Dropdown.svelte';
	import DropdownItem from '$lib/client/ui/dropdown/DropdownItem.svelte';
	import DropdownHeader from '$lib/client/ui/dropdown/DropdownHeader.svelte';
	import DropdownFooter from '$lib/client/ui/dropdown/DropdownFooter.svelte';
	import { clickOutside } from '$lib/client/utils/clickOutside';
	import { Apple, Cherry, Citrus, Star, CircleAlert, FlaskConical } from '@lucide/svelte';
	import Badge from '$lib/client/ui/badge/Badge.svelte';
	import DateTime from '$lib/client/ui/datetime/DateTime.svelte';
	import Author from '$lib/client/ui/author/Author.svelte';

	let basicValue = $state('');
	let labelValue = $state('');
	let iconValue = $state('');
	let posLeftValue = $state('');
	let posMiddleValue = $state('');
	let posRightValue = $state('');
	let groupedOpen = $state(false);
	let groupedTriggerEl: HTMLElement | undefined = $state();
	let groupedSelected = $state('');

	const fruitOptions = [
		{ value: 'apple', label: 'Apple' },
		{ value: 'banana', label: 'Banana' },
		{ value: 'cherry', label: 'Cherry' },
		{ value: 'dragonfruit', label: 'Dragonfruit' }
	];

	const iconOptions = [
		{ value: 'apple', label: 'Apple', icon: Apple },
		{ value: 'cherry', label: 'Cherry', icon: Cherry },
		{ value: 'citrus', label: 'Citrus', icon: Citrus }
	];
</script>

<SEO title="UI Showcase" />

<!--
	Each row varies ONE prop and uses defaults for everything else.
	e.g. "Variants" shows all variants at default size (md).
	"Sizes" shows all sizes at default variant (default).
-->

<div class="max-w-3xl space-y-8 p-8 pb-48">
	<header>
		<h1 class="text-2xl font-bold">UI Showcase</h1>
	</header>

	<Card>
		{#snippet header()}
			<h2 class="text-lg font-semibold">Button</h2>
		{/snippet}

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
	</Card>

	<Card>
		{#snippet header()}
			<h2 class="text-lg font-semibold">Tooltip</h2>
		{/snippet}

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
	</Card>

	<Card>
		{#snippet header()}
			<h2 class="text-lg font-semibold">Dropdown</h2>
		{/snippet}

		<div class="space-y-6">
			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Basic</h3>
				<DropdownSelect
					bind:value={basicValue}
					options={fruitOptions}
					placeholder="Pick a fruit" />
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">With label</h3>
				<DropdownSelect
					label="Fruit"
					bind:value={labelValue}
					options={fruitOptions}
					placeholder="Pick a fruit" />
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">With icons</h3>
				<DropdownSelect
					bind:value={iconValue}
					options={iconOptions}
					placeholder="Pick a fruit" />
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Position</h3>
				<div class="flex items-center justify-between">
					<DropdownSelect
						bind:value={posLeftValue}
						options={fruitOptions}
						position="left"
						placeholder="Left" />
					<DropdownSelect
						bind:value={posMiddleValue}
						options={fruitOptions}
						position="middle"
						placeholder="Middle" />
					<DropdownSelect
						bind:value={posRightValue}
						options={fruitOptions}
						position="right"
						placeholder="Right" />
				</div>
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Disabled</h3>
				<DropdownSelect
					value=""
					options={fruitOptions}
					placeholder="Can't touch this"
					disabled />
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Header / Footer (raw Dropdown)</h3>
				<div
					class="relative"
					bind:this={groupedTriggerEl}
					use:clickOutside={() => (groupedOpen = false)}>
					<Button type="button" onclick={() => (groupedOpen = !groupedOpen)}>
						{groupedSelected || 'Pick an action'}
					</Button>
					{#if groupedOpen}
						<Dropdown triggerEl={groupedTriggerEl} minWidth="14rem">
							<DropdownHeader label="Actions" />
							<DropdownItem
								label="Save"
								icon={Save}
								selected={groupedSelected === 'Save'}
								onclick={() => {
									groupedSelected = 'Save';
									groupedOpen = false;
								}} />
							<DropdownItem
								label="Delete"
								danger
								onclick={() => {
									groupedSelected = 'Delete';
									groupedOpen = false;
								}} />
							<DropdownItem label="Disabled option" disabled />
							<DropdownFooter label="3 actions" />
						</Dropdown>
					{/if}
				</div>
			</div>
		</div>
	</Card>

	<Card>
		{#snippet header()}
			<h2 class="text-lg font-semibold">Badge</h2>
		{/snippet}

		<div class="space-y-6">
			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Variants</h3>
				<div class="flex flex-wrap items-center gap-3">
					<Badge variant="subtle">Subtle</Badge>
					<Badge variant="solid">Solid</Badge>
					<Badge variant="outline">Outline</Badge>
				</div>
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Colors</h3>
				<div class="flex flex-wrap items-center gap-3">
					<Badge color="neutral">Neutral</Badge>
					<Badge color="accent">Accent</Badge>
					<Badge color="success">Success</Badge>
					<Badge color="warning">Warning</Badge>
					<Badge color="danger">Danger</Badge>
					<Badge color="info">Info</Badge>
				</div>
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Colors (solid)</h3>
				<div class="flex flex-wrap items-center gap-3">
					<Badge variant="solid" color="neutral">Neutral</Badge>
					<Badge variant="solid" color="accent">Accent</Badge>
					<Badge variant="solid" color="success">Success</Badge>
					<Badge variant="solid" color="warning">Warning</Badge>
					<Badge variant="solid" color="danger">Danger</Badge>
					<Badge variant="solid" color="info">Info</Badge>
				</div>
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Colors (outline)</h3>
				<div class="flex flex-wrap items-center gap-3">
					<Badge variant="outline" color="neutral">Neutral</Badge>
					<Badge variant="outline" color="accent">Accent</Badge>
					<Badge variant="outline" color="success">Success</Badge>
					<Badge variant="outline" color="warning">Warning</Badge>
					<Badge variant="outline" color="danger">Danger</Badge>
					<Badge variant="outline" color="info">Info</Badge>
				</div>
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Sizes</h3>
				<div class="flex flex-wrap items-center gap-3">
					<Badge size="sm">Small</Badge>
					<Badge size="md">Medium</Badge>
				</div>
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Pill</h3>
				<div class="flex flex-wrap items-center gap-3">
					<Badge>Default</Badge>
					<Badge pill>Pill</Badge>
				</div>
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">With icon</h3>
				<div class="flex flex-wrap items-center gap-3">
					<Badge icon={Star}>Featured</Badge>
					<Badge icon={CircleAlert} color="warning">Warning</Badge>
				</div>
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Icon color</h3>
				<div class="flex flex-wrap items-center gap-3">
					<Badge icon={FlaskConical} iconColor="text-info-icon">Default icon color</Badge>
					<Badge icon={Star} iconColor="text-warning-icon">Custom icon color</Badge>
				</div>
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Link</h3>
				<div class="flex flex-wrap items-center gap-3">
					<Badge link>With external icon</Badge>
					<Badge variant="outline" icon={FlaskConical} iconColor="text-info-icon" link pill>regex101</Badge>
				</div>
			</div>
		</div>
	</Card>

	<Card>
		{#snippet header()}
			<h2 class="text-lg font-semibold">DateTime</h2>
		{/snippet}

		<div class="space-y-6">
			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Long (default)</h3>
				<DateTime date="2026-05-17" />
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Short</h3>
				<DateTime date="2026-05-17" format="short" />
			</div>
		</div>
	</Card>

	<Card>
		{#snippet header()}
			<h2 class="text-lg font-semibold">Author</h2>
		{/snippet}

		<div class="space-y-6">
			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Name only</h3>
				<Author name="santiagosayshey" />
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">With avatar</h3>
				<Author name="santiagosayshey" avatar="https://github.com/santiagosayshey.png" />
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">With link</h3>
				<Author
					name="santiagosayshey"
					avatar="https://github.com/santiagosayshey.png"
					href="https://github.com/santiagosayshey" />
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Sizes</h3>
				<div class="flex flex-wrap items-center gap-6">
					<Author name="santiagosayshey" avatar="https://github.com/santiagosayshey.png" size="sm" />
					<Author name="santiagosayshey" avatar="https://github.com/santiagosayshey.png" size="md" />
				</div>
			</div>
		</div>
	</Card>

	<Card>
		{#snippet header()}
			<h2 class="text-lg font-semibold">Card</h2>
		{/snippet}

		<div class="space-y-6">
			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Variants</h3>
				<div class="grid grid-cols-3 gap-3">
					<Card variant="default" class="text-center text-sm">default</Card>
					<Card variant="outline" class="text-center text-sm">outline</Card>
					<Card variant="ghost" class="text-center text-sm">ghost</Card>
				</div>
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Padding</h3>
				<div class="grid grid-cols-4 gap-3">
					<Card padding="none" class="text-center text-sm">none</Card>
					<Card padding="sm" class="text-center text-sm">sm</Card>
					<Card padding="md" class="text-center text-sm">md</Card>
					<Card padding="lg" class="text-center text-sm">lg</Card>
				</div>
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Rounded</h3>
				<div class="grid grid-cols-5 gap-3">
					<Card rounded="none" class="text-center text-sm">none</Card>
					<Card rounded="sm" class="text-center text-sm">sm</Card>
					<Card rounded="md" class="text-center text-sm">md</Card>
					<Card rounded="lg" class="text-center text-sm">lg</Card>
					<Card rounded="xl" class="text-center text-sm">xl</Card>
				</div>
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Header / Footer</h3>
				<Card>
					{#snippet header()}
						<span class="text-sm font-medium">Card header</span>
					{/snippet}
					<span class="text-sm">Card body</span>
					{#snippet footer()}
						<span class="text-sm text-text-muted">Card footer</span>
					{/snippet}
				</Card>
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">As element</h3>
				<div class="flex flex-wrap items-start gap-3">
					<Card class="text-sm">div (default)</Card>
					<Card as="section" class="text-sm">section</Card>
					<Card as="nav" class="text-sm">nav</Card>
					<Card as="aside" class="text-sm">aside</Card>
				</div>
			</div>
		</div>
	</Card>
</div>
