<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { database } from '$lib/client/ui/database/database.svelte';
	import SEO from '$lib/client/ui/utils/SEO.svelte';

	onMount(() => {
		database.init();
		goto(`/pcd/${database.current}/`, { replaceState: true });
	});
</script>

<SEO title="PCD Browser" description="Browse Profilarr Compliant Database entities." />
