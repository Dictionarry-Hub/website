<script>
  import { Route, router } from 'tinro'
  import Navbar from './navbar/navbar.svelte'
  import Sidebar from './sidebar/sidebar.svelte'
  import Navigation from './shared/navigation.svelte'
  import Welcome from './gettingStarted/welcome.svelte'
  import ProfilarrSetup from './gettingStarted/profilarrSetup.svelte'
  import Development from './gettingStarted/development.svelte'
  import NotFound from '@shared/components/notFound.svelte'
  import { theme } from '@shared/stores/theme'
  import { loadSearchIndex } from '@shared/stores/search'
  import { initAnchorScrolling } from '@shared/utils/scrollToAnchor'
  import { onMount } from 'svelte'
  import { isMobileSidebarOpen, closeMobileSidebar } from '@shared/stores/mobileSidebar'
  
  // Import generated routes at build time
  import { routes } from './generated/routes'
  
  // Create route mapping
  const routeMap = {}
  routes.forEach(route => {
    routeMap[route.path] = route
  })
  
  // Enable hash-based routing for SPA
  router.mode.hash()
  // Scroll to top on route change, but handle section parameters
  router.subscribe(() => {
    // Close mobile sidebar on route change
    closeMobileSidebar();
    
    const hash = window.location.hash;
    if (hash.includes('section=')) {
      const sectionMatch = hash.match(/section=([^&]+)/);
      if (sectionMatch) {
        const targetId = sectionMatch[1];
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            const navbarHeight = 80;
            const elementPosition = element.offsetTop - navbarHeight;
            window.scrollTo({
              top: elementPosition,
              behavior: 'smooth'
            });
          }
        }, 300);
        return;
      }
    }
    window.scrollTo(0, 0);
  })
  
  // Initialize theme and search index on app mount
  onMount(async () => {
    theme.init()
    await loadSearchIndex()
  })
</script>

<div class="min-h-screen flex flex-col">
  <Navbar />
  <div class="flex flex-1 relative">
    <!-- Desktop sidebar -->
    <div class="hidden lg:block">
      <Sidebar />
    </div>
    
    <!-- Mobile sidebar overlay -->
    {#if $isMobileSidebarOpen}
      <div class="lg:hidden fixed inset-0 top-16 z-40 flex">
        <!-- Backdrop -->
        <div 
          class="fixed inset-0 bg-black bg-opacity-50" 
          on:click={closeMobileSidebar}
        />
        
        <!-- Sidebar panel -->
        <div class="relative flex w-full bg-white dark:bg-neutral-900">
          <Sidebar />
        </div>
      </div>
    {/if}
    
    <!-- Main content -->
    <main class="flex-1 {$isMobileSidebarOpen ? 'hidden lg:block' : ''}">
      <Route path="/*" let:meta>
        {#if (meta.url === "/" || meta.url === "" || meta.url === "/welcome") || (meta.url.includes("section=") && meta.url.split('#section=')[0] === '/')}
          <Welcome />
        {:else if meta.url === "/profilarr-setup" || (meta.url.includes("section=") && meta.url.split('#section=')[0] === '/profilarr-setup')}
          <ProfilarrSetup />
        {:else if meta.url === "/development" || (meta.url.includes("section=") && meta.url.split('#section=')[0] === '/development')}
          <Development />
        {:else}
          <NotFound />
        {/if}
      </Route>
    </main>
    
    <!-- Navigation -->
    <div class="{$isMobileSidebarOpen ? 'hidden' : ''} hidden lg:block">
      <Navigation />
    </div>
  </div>
</div>