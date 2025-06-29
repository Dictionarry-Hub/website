<script>
  import { Route, router } from 'tinro'
  import Navbar from './navbar/navbar.svelte'
  import Sidebar from './sidebar/sidebar.svelte'
  import Welcome from './gettingStarted/welcome.svelte'
  import ProfilarrSetup from './gettingStarted/profilarrSetup.svelte'
  import Development from './gettingStarted/development.svelte'
  import NotFound from '@shared/components/notFound.svelte'
  import { theme } from '@shared/stores/theme'
  import { loadSearchIndex } from '@shared/stores/search'
  import { onMount } from 'svelte'
  
  // Import generated routes at build time
  import { routes } from './generated/routes'
  
  // Create route mapping
  const routeMap = {}
  routes.forEach(route => {
    routeMap[route.path] = route
  })
  
  // Enable hash-based routing for SPA
  router.mode.hash()
  // Scroll to top on route change
  router.subscribe(() => window.scrollTo(0, 0))
  
  // Initialize theme and search index on app mount
  onMount(async () => {
    theme.init()
    await loadSearchIndex()
  })
</script>

<div class="h-screen flex flex-col">
  <Navbar />
  <div class="flex flex-1">
    <Sidebar />
    <main class="flex-1 overflow-y-auto">
      <Route path="/*" let:meta>
        {#if meta.url === "/" || meta.url === ""}
          <Welcome />
        {:else if meta.url === "/profilarr-setup"}
          <ProfilarrSetup />
        {:else if meta.url === "/development"}
          <Development />
        {:else}
          <NotFound />
        {/if}
      </Route>
    </main>
  </div>
</div>