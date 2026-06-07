<script lang="ts">
	interface Props {
		label: string;
	}

	let { label }: Props = $props();
</script>

<div class="flex w-full items-center border-b border-border-subtle px-3 py-2 text-xs">
	<span class="text-text-muted">{label}</span>
</div>
