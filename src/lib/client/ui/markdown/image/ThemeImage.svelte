<script lang="ts">
	interface Props {
		dark: string;
		light: string;
		alt: string;
		class?: string;
	}

	let { dark, light, alt, class: className }: Props = $props();
</script>

<!--
	Both images render in the DOM. CSS hides the wrong one based on the
	--theme-image-* display tokens every theme declares, so this component
	never enumerates themes. The inline script in app.html sets data-theme
	before first paint, so no flash. Fallbacks match :root (light).
-->
<img
	src={light}
	{alt}
	class="theme-img theme-img-light {className ?? ''}" />
<img
	src={dark}
	{alt}
	class="theme-img theme-img-dark {className ?? ''}" />

<style>
	.theme-img-light {
		display: var(--theme-image-light, inline);
	}

	.theme-img-dark {
		display: var(--theme-image-dark, none);
	}
</style>
