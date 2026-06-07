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
	Both images render in the DOM. CSS hides the wrong one based on data-theme.
	The inline script in app.html sets data-theme before first paint, so no flash.

	Default (no attribute) = light.
	Dark themes: dark, velouria.
-->
<img src={light} {alt} class="theme-img theme-img-light {className ?? ''}" />
<img src={dark} {alt} class="theme-img theme-img-dark {className ?? ''}" />

<style>
	.theme-img-dark {
		display: none;
	}

	:global([data-theme='dark']) .theme-img-dark,
	:global([data-theme='velouria']) .theme-img-dark {
		display: revert;
	}

	:global([data-theme='dark']) .theme-img-light,
	:global([data-theme='velouria']) .theme-img-light {
		display: none;
	}
</style>
