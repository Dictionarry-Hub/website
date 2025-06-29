<script>
  import { Route, router } from 'tinro'
  import Navbar from './navbar/navbar.svelte'
  import { theme } from '@shared/stores/theme'
  import { onMount } from 'svelte'
  
  // Enable hash-based routing for SPA
  router.mode.hash()
  // Scroll to top on route change
  router.subscribe(() => window.scrollTo(0, 0))
  
  // Initialize theme on app mount
  onMount(() => {
    theme.init()
  })
</script>

<Navbar />

<main>
  
</main>