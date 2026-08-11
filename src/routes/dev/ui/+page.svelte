<script lang="ts">
	import SEO from '$lib/client/ui/utils/SEO.svelte';
	import Button from '$lib/client/ui/button/Button.svelte';
	import { Save } from '@lucide/svelte';
	import Tooltip from '$lib/client/ui/tooltip/Tooltip.svelte';
	import Card from '$lib/client/ui/card/Card.svelte';
	import Dialog from '$lib/client/ui/dialog/Dialog.svelte';
	import Kbd from '$lib/client/ui/kbd/Kbd.svelte';
	import DropdownSelect from '$lib/client/ui/dropdown/DropdownSelect.svelte';
	import Dropdown from '$lib/client/ui/dropdown/Dropdown.svelte';
	import DropdownItem from '$lib/client/ui/dropdown/DropdownItem.svelte';
	import DropdownHeader from '$lib/client/ui/dropdown/DropdownHeader.svelte';
	import DropdownFooter from '$lib/client/ui/dropdown/DropdownFooter.svelte';
	import { clickOutside } from '$lib/client/utils/clickOutside';
	import { Apple, Cherry, Citrus, Star, CircleAlert, FlaskConical } from '@lucide/svelte';
	import Badge from '$lib/client/ui/badge/Badge.svelte';
	import CopyMarkdown from '$lib/client/ui/copy-markdown/CopyMarkdown.svelte';
	import DateTime from '$lib/client/ui/datetime/DateTime.svelte';
	import Author from '$lib/client/ui/author/Author.svelte';
	import Table from '$lib/client/ui/table/Table.svelte';
	import AdaptiveList from '$lib/client/ui/adaptive-list/AdaptiveList.svelte';
	import PageActionsMenu from '$lib/client/ui/page-actions/PageActionsMenu.svelte';
	import type { Column } from '$lib/client/ui/table/types';

	interface DemoRow {
		name: string;
		role: string;
		status: string;
		[key: string]: unknown;
	}

	const tableData: DemoRow[] = [
		{ name: 'Alice', role: 'Engineer', status: 'Active' },
		{ name: 'Bob', role: 'Designer', status: 'Away' },
		{ name: 'Charlie', role: 'Manager', status: 'Active' },
		{ name: 'Diana', role: 'Engineer', status: 'Offline' }
	];

	const tableColumns: Column<DemoRow>[] = [
		{ key: 'name', header: 'Name', sortable: true },
		{ key: 'role', header: 'Role', sortable: true },
		{ key: 'status', header: 'Status', align: 'center' }
	];

	let dialogOpen = $state(false);
	let dialogSlotsOpen = $state(false);
	let basicValue = $state('');
	let labelValue = $state('');
	let iconValue = $state('');
	let emojiValue = $state('');
	let emojiOnlyValue = $state('apple');
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

	const emojiOptions = [
		{ value: 'apple', label: 'Apple', emoji: '🍎' },
		{ value: 'cherry', label: 'Cherry', emoji: '🍒' },
		{ value: 'citrus', label: 'Citrus', emoji: '🍋' }
	];
</script>

<SEO title="UI Showcase" />

<!--
	Each row varies ONE prop and uses defaults for everything else.
	e.g. "Variants" shows all variants at default size (md).
	"Sizes" shows all sizes at default variant (default).
-->

<div class="space-y-8">
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
					<Button
						type="button"
						variant="default">Default</Button>
					<Button
						type="button"
						variant="accent">Accent</Button>
					<Button
						type="button"
						variant="danger">Danger</Button>
					<Button
						type="button"
						variant="outline">Outline</Button>
					<Button
						type="button"
						variant="ghost">Ghost</Button>
				</div>
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Sizes</h3>
				<div class="flex flex-wrap items-center gap-3">
					<Button
						type="button"
						size="sm">Small</Button>
					<Button
						type="button"
						size="md">Medium</Button>
					<Button
						type="button"
						size="lg">Large</Button>
				</div>
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Disabled</h3>
				<div class="flex flex-wrap items-center gap-3">
					<Button type="button">Enabled</Button>
					<Button
						type="button"
						disabled>Disabled</Button>
				</div>
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Icon</h3>
				<div class="flex flex-wrap items-center gap-3">
					<Button type="button">No icon</Button>
					<Button
						type="button"
						icon={Save}>With icon</Button>
				</div>
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Icon position</h3>
				<div class="flex flex-wrap items-center gap-3">
					<Button
						type="button"
						icon={Save}>Left</Button>
					<Button
						type="button"
						icon={Save}
						iconPosition="right">Right</Button>
				</div>
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Icon only</h3>
				<div class="flex flex-wrap items-center gap-3">
					<Button
						type="button"
						icon={Save} />
				</div>
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Icon color</h3>
				<div class="flex flex-wrap items-center gap-3">
					<Button
						type="button"
						icon={Save}>Default</Button>
					<Button
						type="button"
						icon={Save}
						iconClass="text-accent-text">Custom</Button>
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
					<Tooltip
						text="Appears above"
						position="top">
						<Button type="button">Top</Button>
					</Tooltip>
					<div></div>
					<Tooltip
						text="Appears left"
						position="left">
						<Button type="button">Left</Button>
					</Tooltip>
					<div></div>
					<Tooltip
						text="Appears right"
						position="right">
						<Button type="button">Right</Button>
					</Tooltip>
					<div></div>
					<Tooltip
						text="Appears below"
						position="bottom">
						<Button type="button">Bottom</Button>
					</Tooltip>
					<div></div>
				</div>
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Alignment</h3>
				<div class="flex items-center justify-between">
					<Tooltip
						text="Anchored to left edge"
						position="bottom"
						align="left">
						<Button type="button">Left</Button>
					</Tooltip>
					<Tooltip
						text="Centered on trigger"
						position="bottom"
						align="middle">
						<Button type="button">Middle</Button>
					</Tooltip>
					<Tooltip
						text="Anchored to right edge"
						position="bottom"
						align="right">
						<Button type="button">Right</Button>
					</Tooltip>
				</div>
			</div>
		</div>
	</Card>

	<Card>
		{#snippet header()}
			<h2 class="text-lg font-semibold">Kbd</h2>
		{/snippet}

		<div class="space-y-6">
			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Variants</h3>
				<div class="flex items-center gap-3">
					<Kbd>⌘K</Kbd>
					<Kbd variant="outline">⌘K</Kbd>
				</div>
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Sizes</h3>
				<div class="flex items-center gap-3">
					<Kbd size="sm">⌘K</Kbd>
					<Kbd size="md">⌘K</Kbd>
				</div>
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">In context</h3>
				<div class="flex items-center gap-4 text-xs text-text-muted">
					<span class="flex items-center gap-1.5"><Kbd>↑↓</Kbd> navigate</span>
					<span class="flex items-center gap-1.5"><Kbd>↵</Kbd> open</span>
					<span class="flex items-center gap-1.5"><Kbd>esc</Kbd> close</span>
				</div>
			</div>
		</div>
	</Card>

	<Card>
		{#snippet header()}
			<h2 class="text-lg font-semibold">Dialog</h2>
		{/snippet}

		<div class="space-y-6">
			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Modal</h3>
				<Button
					type="button"
					onclick={() => (dialogOpen = true)}>Open dialog</Button>
				<Dialog
					bind:open={dialogOpen}
					ariaLabel="Example dialog"
					class="w-full max-w-md">
					<div class="space-y-4 p-6">
						<h3 class="text-lg font-semibold">A modal dialog</h3>
						<p class="text-sm text-text-soft">
							Escape, backdrop click, or the button below all close it. Focus is
							trapped by the native element, and the page behind cannot scroll.
						</p>
						<Button
							type="button"
							variant="accent"
							onclick={() => (dialogOpen = false)}>Close</Button>
					</div>
				</Dialog>
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Header and footer slots</h3>
				<Button
					type="button"
					onclick={() => (dialogSlotsOpen = true)}>Open with slots</Button>
				<Dialog
					bind:open={dialogSlotsOpen}
					ariaLabel="Dialog with header and footer"
					class="max-h-[60vh] w-full max-w-md">
					{#snippet header()}
						<div class="px-6 py-4">
							<h3 class="text-lg font-semibold">Fixed header</h3>
						</div>
					{/snippet}
					<div class="space-y-3 p-6">
						{#each Array.from({ length: 20 }, (_, i) => i + 1) as n (n)}
							<p class="text-sm text-text-soft">
								Scrollable content row {n}. Header and footer stay put.
							</p>
						{/each}
					</div>
					{#snippet footer()}
						<div class="flex justify-end px-6 py-3">
							<Button
								type="button"
								size="sm"
								onclick={() => (dialogSlotsOpen = false)}>Close</Button>
						</div>
					{/snippet}
				</Dialog>
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
				<h3 class="text-sm font-medium text-text-muted">With emoji</h3>
				<DropdownSelect
					bind:value={emojiValue}
					options={emojiOptions}
					placeholder="Pick a fruit" />
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Emoji only trigger</h3>
				<DropdownSelect
					bind:value={emojiOnlyValue}
					options={emojiOptions}
					header="Fruit"
					iconOnly />
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
					<Button
						type="button"
						onclick={() => (groupedOpen = !groupedOpen)}>
						{groupedSelected || 'Pick an action'}
					</Button>
					{#if groupedOpen}
						<Dropdown
							triggerEl={groupedTriggerEl}
							minWidth="14rem">
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
							<DropdownItem
								label="Disabled option"
								disabled />
							<DropdownFooter label="3 actions" />
						</Dropdown>
					{/if}
				</div>
			</div>
		</div>
	</Card>

	<Card>
		{#snippet header()}
			<h2 class="text-lg font-semibold">PageActionsMenu</h2>
		{/snippet}

		<div class="space-y-6">
			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Default</h3>
				<div class="flex flex-wrap items-center gap-3">
					<PageActionsMenu
						artifactPath="/api/v1.md"
						pagePath="/api/v1" />
				</div>
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Custom prompt</h3>
				<div class="flex flex-wrap items-center gap-3">
					<PageActionsMenu
						artifactPath="/api/v1.md"
						pagePath="/api/v1"
						prompt={'Read {url} and help me use this API.'} />
				</div>
			</div>
		</div>
	</Card>

	<Card>
		{#snippet header()}
			<h2 class="text-lg font-semibold">CopyMarkdown</h2>
		{/snippet}

		<div class="space-y-6">
			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Icon only (outline, default)</h3>
				<div class="flex flex-wrap items-center gap-3">
					<Tooltip text="Copy as Markdown">
						<CopyMarkdown url="/api/v1.md" />
					</Tooltip>
				</div>
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Labeled</h3>
				<div class="flex flex-wrap items-center gap-3">
					<CopyMarkdown
						url="/api/v1.md"
						label="Copy page"
						variant="default" />
				</div>
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">
					Failure state (missing artifact)
				</h3>
				<div class="flex flex-wrap items-center gap-3">
					<CopyMarkdown
						url="/does-not-exist.md"
						label="Copy page"
						variant="default" />
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
					<Badge
						variant="solid"
						color="neutral">Neutral</Badge>
					<Badge
						variant="solid"
						color="accent">Accent</Badge>
					<Badge
						variant="solid"
						color="success">Success</Badge>
					<Badge
						variant="solid"
						color="warning">Warning</Badge>
					<Badge
						variant="solid"
						color="danger">Danger</Badge>
					<Badge
						variant="solid"
						color="info">Info</Badge>
				</div>
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Colors (outline)</h3>
				<div class="flex flex-wrap items-center gap-3">
					<Badge
						variant="outline"
						color="neutral">Neutral</Badge>
					<Badge
						variant="outline"
						color="accent">Accent</Badge>
					<Badge
						variant="outline"
						color="success">Success</Badge>
					<Badge
						variant="outline"
						color="warning">Warning</Badge>
					<Badge
						variant="outline"
						color="danger">Danger</Badge>
					<Badge
						variant="outline"
						color="info">Info</Badge>
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
					<Badge
						icon={CircleAlert}
						color="warning">Warning</Badge>
				</div>
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Icon color</h3>
				<div class="flex flex-wrap items-center gap-3">
					<Badge
						icon={FlaskConical}
						iconColor="text-info-icon">Default icon color</Badge>
					<Badge
						icon={Star}
						iconColor="text-warning-icon">Custom icon color</Badge>
				</div>
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Link</h3>
				<div class="flex flex-wrap items-center gap-3">
					<Badge link>With external icon</Badge>
					<Badge
						variant="outline"
						icon={FlaskConical}
						iconColor="text-info-icon"
						link
						pill>regex101</Badge>
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
				<DateTime
					date="2026-05-17"
					format="short" />
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
				<Author
					name="santiagosayshey"
					avatar="https://github.com/santiagosayshey.png" />
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
					<Author
						name="santiagosayshey"
						avatar="https://github.com/santiagosayshey.png"
						size="sm" />
					<Author
						name="santiagosayshey"
						avatar="https://github.com/santiagosayshey.png"
						size="md" />
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
					<Card
						variant="default"
						class="text-center text-sm">default</Card>
					<Card
						variant="outline"
						class="text-center text-sm">outline</Card>
					<Card
						variant="ghost"
						class="text-center text-sm">ghost</Card>
				</div>
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Padding</h3>
				<div class="grid grid-cols-4 gap-3">
					<Card
						padding="none"
						class="text-center text-sm">none</Card>
					<Card
						padding="sm"
						class="text-center text-sm">sm</Card>
					<Card
						padding="md"
						class="text-center text-sm">md</Card>
					<Card
						padding="lg"
						class="text-center text-sm">lg</Card>
				</div>
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Rounded</h3>
				<div class="grid grid-cols-5 gap-3">
					<Card
						rounded="none"
						class="text-center text-sm">none</Card>
					<Card
						rounded="sm"
						class="text-center text-sm">sm</Card>
					<Card
						rounded="md"
						class="text-center text-sm">md</Card>
					<Card
						rounded="lg"
						class="text-center text-sm">lg</Card>
					<Card
						rounded="xl"
						class="text-center text-sm">xl</Card>
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
					<Card
						as="section"
						class="text-sm">section</Card>
					<Card
						as="nav"
						class="text-sm">nav</Card>
					<Card
						as="aside"
						class="text-sm">aside</Card>
				</div>
			</div>
		</div>
	</Card>

	<Card>
		{#snippet header()}
			<h2 class="text-lg font-semibold">Table</h2>
		{/snippet}

		<div class="space-y-6">
			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Basic (sortable)</h3>
				<Table
					data={tableData}
					columns={tableColumns} />
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Clickable rows</h3>
				<Table
					data={tableData}
					columns={tableColumns}
					href={() => '#'} />
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">Expandable</h3>
				<Table
					data={tableData}
					columns={tableColumns}>
					{#snippet expanded(row)}
						<p class="text-sm text-text-soft">
							Expanded content for <strong>{row.name}</strong>. This can contain
							anything.
						</p>
					{/snippet}
				</Table>
			</div>
		</div>
	</Card>

	<Card>
		{#snippet header()}
			<h2 class="text-lg font-semibold">Adaptive List</h2>
		{/snippet}

		<div class="space-y-6">
			<div class="space-y-2">
				<h3 class="text-sm font-medium text-text-muted">
					Table on desktop, cards on mobile
				</h3>
				<AdaptiveList
					data={tableData}
					columns={tableColumns}
					href={() => '#'}>
					{#snippet card(row)}
						<p class="text-sm font-medium">{row.name}</p>
						<p class="text-xs text-text-muted">{row.role}</p>
						<Badge
							size="sm"
							class="mt-2">{row.status}</Badge>
					{/snippet}
				</AdaptiveList>
			</div>
		</div>
	</Card>
</div>
