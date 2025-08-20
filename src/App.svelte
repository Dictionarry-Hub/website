<script>
  import 'highlight.js/styles/atom-one-dark.css'
  import { Route, router } from 'tinro'
  import Navbar from './navigation/navbar/navbar.svelte'
  import Footer from './footer/footer.svelte'
  import PageNav from './navigation/pageNav/pageNav.svelte'
  import HeaderNav from './navigation/headerNav/headerNav.svelte'
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
  import NotFound from './pages/404/404.svelte'
  import { theme } from '@shared/stores/theme'
  import { loadSearchIndex } from '@shared/stores/search'
  import { onMount } from 'svelte'
  import { isMobileSidebarOpen, closeMobileSidebar } from '@shared/stores/mobileSidebar'
  import { isMobileHeaderNavOpen, closeMobileHeaderNav } from '@shared/stores/mobileHeaderNav'
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
    '/profilarr-setup/development': Development,
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
    let cleanUrl = url.split('?section=')[0]
    
    // Remove trailing slash if present (except for root path)
    if (cleanUrl.length > 1 && cleanUrl.endsWith('/')) {
      cleanUrl = cleanUrl.slice(0, -1)
    }
    
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
  
  // Enable path-based routing for better SEO
  router.mode.history()
  
  // Normalize URLs to remove trailing slashes
  router.subscribe((route) => {
    const path = window.location.pathname
    if (path.length > 1 && path.endsWith('/')) {
      const normalizedPath = path.slice(0, -1)
      const search = window.location.search
      const hash = window.location.hash
      // Use router.goto for proper navigation instead of just replacing state
      router.goto(normalizedPath + search + hash)
    }
  })
  
  // Scroll to top on route change, but handle section parameters
  router.subscribe(() => {
    // Close mobile sidebar and header nav on route change
    closeMobileSidebar();
    closeMobileHeaderNav();
    
    // Track page view in Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('config', 'G-TN66960SGE', {
        page_path: window.location.pathname
      });
    }
    
    // Check for section query parameter
    const params = new URLSearchParams(window.location.search);
    const section = params.get('section');
    if (section) {
      setTimeout(() => {
        const element = document.getElementById(section);
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
      <PageNav />
    </div>
    
    <!-- Mobile PageNav with slide animation -->
    {#if $isMobileSidebarOpen}
      <div class="xl:hidden fixed inset-0 top-16 z-40" transition:fly={{ x: -320, duration: 300 }}>
        <div class="w-full h-full bg-white dark:bg-neutral-900 overflow-y-auto">
          <PageNav />
        </div>
      </div>
    {/if}
    
    <!-- Mobile HeaderNav with slide animation from right -->
    {#if $isMobileHeaderNavOpen}
      <div class="xl:hidden fixed inset-0 top-16 z-40" transition:fly={{ x: 320, duration: 300 }}>
        <div class="w-full h-full bg-white dark:bg-neutral-900 overflow-y-auto">
          <HeaderNav />
        </div>
      </div>
    {/if}
    
    <!-- Main content -->
    <main class="flex-1 overflow-y-auto {$isMobileSidebarOpen || $isMobileHeaderNavOpen ? 'hidden xl:block' : ''}">
      <div class="universal-padding max-w-6xl mx-auto">
        <Route path="/*" let:meta>
          <svelte:component this={getRouteComponent(meta.url)} />
        </Route>
      </div>
    </main>
    
    <!-- HeaderNav -->
    <div class="hidden xl:block">
      <HeaderNav />
    </div>
  </div>
  <!-- Footer only on desktop -->
  <div class="hidden sm:block">
    <Footer />
  </div>
</div>