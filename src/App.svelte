<script lang="ts">
  import { Route, router } from 'tinro'
  import Navbar from './navbar/navbar.svelte'
  
  // Enable hash-based routing for SPA
  router.mode.hash()
  // Scroll to top on route change
  router.subscribe(() => window.scrollTo(0, 0))
</script>

<Navbar />

<main>
  
</main>