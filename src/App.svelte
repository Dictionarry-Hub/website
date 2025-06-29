<script lang="ts">
  import { Route, router } from 'tinro'
  
  // Enable hash-based routing for SPA
  router.mode.hash()
  // Scroll to top on route change
  router.subscribe(() => window.scrollTo(0, 0))
</script>

<main>
  hello
</main>