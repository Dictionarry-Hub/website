<script lang="ts">
	import {
		BookOpen,
		CalendarDays,
		Flag,
		HardDrive,
		Languages,
		Monitor,
		Radio,
		Regex,
		ScanText,
		SlidersHorizontal,
		Tags,
		Users
	} from '@lucide/svelte';
	import type { Component } from 'svelte';
	import Badge from '$lib/client/ui/badge/Badge.svelte';
	import Button from '$lib/client/ui/button/Button.svelte';
	import Card from '$lib/client/ui/card/Card.svelte';
	import Tooltip from '$lib/client/ui/tooltip/Tooltip.svelte';
	import { formatConditionType } from '$lib/shared/utils/pcd/format';
	import type { ConditionType } from '$lib/types/pcd';

	interface Props {
		name: string;
		type: ConditionType;
		value: string;
		regularExpressionHref?: string;
		arrType: string;
		required: boolean;
		negated: boolean;
	}

	let { name, type, value, regularExpressionHref, arrType, required, negated }: Props = $props();

	const conditionIcons: Record<ConditionType, Component> = {
		release_title: ScanText,
		release_group: Users,
		edition: BookOpen,
		language: Languages,
		source: Radio,
		resolution: Monitor,
		quality_modifier: SlidersHorizontal,
		release_type: Tags,
		indexer_flag: Flag,
		size: HardDrive,
		year: CalendarDays
	};

	const typeLabel = $derived(formatConditionType(type));
	const appliesToRadarr = $derived(arrType === 'all' || arrType === 'radarr');
	const appliesToSonarr = $derived(arrType === 'all' || arrType === 'sonarr');
	const TypeIcon = $derived(conditionIcons[type]);
</script>

<Card
	as="article"
	class="h-full">
	{#snippet header()}
		<div class="flex items-start justify-between gap-3">
			<h3 class="text-base font-semibold text-text">{name}</h3>
			<Tooltip
				text={typeLabel}
				position="top">
				<Button
					type="button"
					variant="ghost"
					size="sm"
					icon={TypeIcon}
					aria-label="Condition type: {typeLabel}"
					class="shrink-0 text-text-muted" />
			</Tooltip>
		</div>
	{/snippet}

	<dl class="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-2 text-sm">
		<dt class="text-text-muted">
			{regularExpressionHref ? 'Regular expression' : 'Value'}
		</dt>
		<dd class="min-w-0 font-medium break-words">
			{#if regularExpressionHref}
				<a
					href={regularExpressionHref}
					aria-label="View regular expression: {value}"
					class="inline-flex items-center gap-1.5 rounded-control-sm text-link-text underline decoration-transparent underline-offset-4 transition-colors hover:decoration-current focus-visible:decoration-current focus-visible:ring-2 focus-visible:ring-accent-border focus-visible:outline-none">
					<Regex
						size={16}
						aria-hidden="true" />
					<span>{value}</span>
				</a>
			{:else}
				{value}
			{/if}
		</dd>
		<dt class="text-text-muted">Applies to</dt>
		<dd class="flex items-center gap-2">
			{#if appliesToRadarr}
				<img
					src="/radarr.svg"
					alt="Radarr"
					class="size-5" />
			{/if}
			{#if appliesToSonarr}
				<img
					src="/sonarr.svg"
					alt="Sonarr"
					class="size-5" />
			{/if}
		</dd>
	</dl>

	{#snippet footer()}
		<div class="flex flex-wrap gap-2">
			<Badge
				color={required ? 'info' : 'neutral'}
				variant="solid">
				{required ? 'Required' : 'Optional'}
			</Badge>
			{#if negated}
				<Badge
					color="danger"
					variant="solid">Negated</Badge>
			{/if}
		</div>
	{/snippet}
</Card>
