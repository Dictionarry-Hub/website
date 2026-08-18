<script lang="ts">
	import { page } from '$app/state';
	import { SITE_URL } from '$lib/shared/utils/llm/site.js';

	const DEFAULT_DESCRIPTION =
		'Documentation and resources for the Dictionarry media automation project.';
	const DEFAULT_IMAGE =
		'https://raw.githubusercontent.com/Dictionarry-Hub/dictionarry.dev/develop/static/icon.png';
	const THEME_COLOR = '#597B91';

	interface Props {
		title: string;
		description?: string;
		image?: string;
	}

	let { title, description = DEFAULT_DESCRIPTION, image = DEFAULT_IMAGE }: Props = $props();
	const canonicalUrl = $derived(`${SITE_URL}${page.url.pathname}`);
</script>

<svelte:head>
	<title>{title}</title>
	<link
		rel="canonical"
		href={canonicalUrl} />
	<meta
		name="description"
		content={description} />
	<meta
		name="theme-color"
		content={THEME_COLOR} />
	<meta
		property="og:type"
		content="website" />
	<meta
		property="og:site_name"
		content="Dictionarry" />
	<meta
		property="og:title"
		content={title} />
	<meta
		property="og:description"
		content={description} />
	<meta
		property="og:image"
		content={image} />
	<meta
		name="twitter:card"
		content="summary" />
	<meta
		name="twitter:title"
		content={title} />
	<meta
		name="twitter:description"
		content={description} />
	<meta
		name="twitter:image"
		content={image} />
</svelte:head>
