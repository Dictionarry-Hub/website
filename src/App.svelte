<script>
  import 'highlight.js/styles/atom-one-dark.css'
  import { Route, router } from 'tinro'
  import Navbar from './navbar/navbar.svelte'
  import Sidebar from './sidebar/sidebar.svelte'
  import Navigation from './shared/navigation.svelte'
  import Welcome from './gettingStarted/welcome.svelte'
  import ProfilarrInstallation from './gettingStarted/profilarrInstallation.svelte'
  import Development from './gettingStarted/development.svelte'
  import Profilarr101 from './gettingStarted/101.svelte'
  import Linking from './gettingStarted/linking.svelte'
  import Bridging from './gettingStarted/bridging.svelte'
  import Sync from './gettingStarted/syncing.svelte'
  import Updates from './gettingStarted/updates.svelte'
  import Customizations from './gettingStarted/customizations.svelte'
  import DevlogsLanding from './devlogs/landing/page.svelte'
  import DevlogsSlug from './devlogs/slug/page.svelte'
  import QualityProfilePage from './qualityProfile/landing/page.svelte'
  import QualityProfileSlug from './qualityProfile/slug/page.svelte'
  import CustomFormatPage from './customFormat/landing/page.svelte'
  import CustomFormatSlug from './customFormat/slug/page.svelte'
  import RegexPatternPage from './regexPattern/landing/page.svelte'
  import RegexPatternSlug from './regexPattern/slug/page.svelte'
  import MediaManagementPage from './mediaManagement/mediaManagementPage.svelte'
  import NamingPage from './mediaManagement/namingPage.svelte'
  import QualityDefinitionsPage from './mediaManagement/qualityDefinitionsPage.svelte'
  import MiscSettingsPage from './mediaManagement/miscSettingsPage.svelte'
  import WikiPage from './wiki/landing/page.svelte'
  import WikiSlug from './wiki/slug/page.svelte'
  import NotFound from '@shared/components/notFound.svelte'
  import { theme } from '@shared/stores/theme'
  import { loadSearchIndex } from '@shared/stores/search'
  import { initAnchorScrolling } from '@shared/utils/scrollToAnchor'
  import { onMount } from 'svelte'
  import { isMobileSidebarOpen, closeMobileSidebar } from '@shared/stores/mobileSidebar'
  import { fly } from 'svelte/transition'
  
  // Route configuration - single source of truth for all routes
  const routeConfig = {
    '/': Welcome,
    '/welcome': Welcome,
    '/profilarr-setup/installation': ProfilarrInstallation,
    '/profilarr-setup/101': Profilarr101,
    '/profilarr-setup/linking': Linking,
    '/profilarr-setup/bridging': Bridging,
    '/profilarr-setup/syncing': Sync,
    '/profilarr-setup/updates': Updates,
    '/profilarr-setup/customizations': Customizations,
    '/development': Development,
    '/devlogs': DevlogsLanding,
    '/quality-profile': QualityProfilePage,
    '/custom-format': CustomFormatPage,
    '/regex-pattern': RegexPatternPage,
    '/media-management': MediaManagementPage,
    '/media-management/naming': NamingPage,
    '/media-management/qualitydefinitions': QualityDefinitionsPage,
    '/media-management/misc': MiscSettingsPage,
    '/wiki': WikiPage,
  }
  
  // Dynamic route patterns
  const dynamicRoutes = [
    { pattern: /^\/devlogs\//, component: DevlogsSlug },
    { pattern: /^\/quality-profile\//, component: QualityProfileSlug },
    { pattern: /^\/custom-format\//, component: CustomFormatSlug },
    { pattern: /^\/regex-pattern\//, component: RegexPatternSlug },
    { pattern: /^\/wiki\//, component: WikiSlug },
    // Add more dynamic patterns here as needed
  ]
  
  // Helper to get component for a route
  function getRouteComponent(url) {
    // Remove section parameters for route matching
    const cleanUrl = url.split('#section=')[0]
    
    // Check static routes first
    if (routeConfig[cleanUrl]) {
      return routeConfig[cleanUrl]
    }
    
    // Check dynamic routes
    for (const route of dynamicRoutes) {
      if (route.pattern.test(cleanUrl)) {
        return route.component
      }
    }
    
    // Default to NotFound
    return NotFound
  }
  
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
    <div class="hidden xl:block">
      <Sidebar />
    </div>
    
    <!-- Mobile sidebar with slide animation -->
    {#if $isMobileSidebarOpen}
      <div class="xl:hidden fixed inset-0 top-16 z-40" transition:fly={{ x: -320, duration: 300 }}>
        <div class="w-full h-full bg-white dark:bg-neutral-900 overflow-y-auto">
          <Sidebar />
        </div>
      </div>
    {/if}
    
    <!-- Main content -->
    <main class="flex-1 overflow-y-auto {$isMobileSidebarOpen ? 'hidden xl:block' : ''}">
      <div class="universal-padding max-w-6xl mx-auto">
        <Route path="/*" let:meta>
          <svelte:component this={getRouteComponent(meta.url)} />
        </Route>
      </div>
    </main>
    
    <!-- Navigation -->
    <div class="hidden xl:block">
      <Navigation />
    </div>
  </div>
</div>