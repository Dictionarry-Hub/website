<script lang="ts">
	// Emoji stand-in matching the lucide icon contract (size/class props) so
	// Button treats it like any other icon. The box stays at the given size;
	// the glyph renders slightly smaller inside it.
	interface Props {
		size?: number;
		class?: string;
	}

	let { size = 16, class: className = '' }: Props = $props();
</script>

<span
	class="inline-flex items-center justify-center leading-none {className}"
	style="width: {size}px; height: {size}px; font-size: {size - 2}px"
	aria-hidden="true">✨</span>
