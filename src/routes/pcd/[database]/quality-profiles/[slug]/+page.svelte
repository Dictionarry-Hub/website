<script lang="ts">
	import SEO from '$lib/client/ui/utils/SEO.svelte';

	let { data } = $props();
</script>

<SEO
	title={data.profile.name}
	description={data.profile.description ?? undefined} />
