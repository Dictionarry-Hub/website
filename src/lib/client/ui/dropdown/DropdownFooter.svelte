<script lang="ts">
	interface Props {
		label: string;
	}

	let { label }: Props = $props();
</script>

<div class="flex w-full items-center border-t border-border-subtle px-3 py-1.5 text-xs">
	<span class="text-text-muted">{label}</span>
</div>
