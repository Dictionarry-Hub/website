<script lang="ts">
	import './layout.css'
	import favicon from '$lib/assets/favicon.svg'

	let { children } = $props()
	export const prerender = true 
	export const trailingSlash = 'always'
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}
