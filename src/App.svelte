<script>
  import 'highlight.js/styles/atom-one-dark.css'
  import { Route, router } from 'tinro'
  import Navbar from './navbar/navbar.svelte'
  import Sidebar from './sidebar/sidebar.svelte'
  import Navigation from './shared/navigation.svelte'
  import Welcome from './gettingStarted/welcome.svelte'
  import ProfilarrSetup from './gettingStarted/profilarrSetup.svelte'
  import Development from './gettingStarted/development.svelte'
  import DevLogTimeline from './devLogs/devLogTimeline.svelte'
  import DevLogPage from './devLogs/devLogPage.svelte'
  import QualityProfilePage from './qualityProfile/qualityProfilePage.svelte'
  import MediaManagementPage from './mediaManagement/mediaManagementPage.svelte'
  import NamingPage from './mediaManagement/namingPage.svelte'
  import QualityDefinitionsPage from './mediaManagement/qualityDefinitionsPage.svelte'
  import MiscSettingsPage from './mediaManagement/miscSettingsPage.svelte'
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
            const mainContent = document.querySelector('main');
            if (mainContent) {
              const mainContentRect = mainContent.getBoundingClientRect();
              const elementRect = element.getBoundingClientRect();
              const scrollTop = mainContent.scrollTop;
              const targetScrollTop = scrollTop + elementRect.top - mainContentRect.top - 20;
              
              mainContent.scrollTo({
                top: targetScrollTop,
                behavior: 'smooth'
              });
            }
          }
        }, 100);
        return;
      }
    }
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.scrollTo(0, 0);
    }
  })
  
  // Initialize theme and search index on app mount
  onMount(async () => {
    theme.init()
    await loadSearchIndex()
    
  })
</script>

<div class="h-screen flex flex-col">
  <Navbar />
  <div class="flex flex-1 relative overflow-hidden">
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
    <main class="flex-1 overflow-y-auto {$isMobileSidebarOpen ? 'hidden lg:block' : ''}">
      <Route path="/*" let:meta>
        {#if (meta.url === "/" || meta.url === "" || meta.url === "/welcome") || (meta.url.includes("section=") && meta.url.split('#section=')[0] === '/')}
          <Welcome />
        {:else if meta.url === "/profilarr-setup" || (meta.url.includes("section=") && meta.url.split('#section=')[0] === '/profilarr-setup')}
          <ProfilarrSetup />
        {:else if meta.url === "/development" || (meta.url.includes("section=") && meta.url.split('#section=')[0] === '/development')}
          <Development />
        {:else if meta.url === "/dev-logs" || (meta.url.includes("section=") && meta.url.split('#section=')[0] === '/dev-logs')}
          <DevLogTimeline />
        {:else if meta.url.startsWith("/dev-logs/")}
          <DevLogPage />
        {:else if meta.url === "/quality-profile" || (meta.url.includes("section=") && meta.url.split('#section=')[0] === '/quality-profile')}
          <QualityProfilePage />
        {:else if meta.url === "/media-management" || (meta.url.includes("section=") && meta.url.split('#section=')[0] === '/media-management')}
          <MediaManagementPage />
        {:else if meta.url === "/media-management/naming" || (meta.url.includes("section=") && meta.url.split('#section=')[0] === '/media-management/naming')}
          <NamingPage />
        {:else if meta.url === "/media-management/qualitydefinitions" || (meta.url.includes("section=") && meta.url.split('#section=')[0] === '/media-management/qualitydefinitions')}
          <QualityDefinitionsPage />
        {:else if meta.url === "/media-management/misc" || (meta.url.includes("section=") && meta.url.split('#section=')[0] === '/media-management/misc')}
          <MiscSettingsPage />
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