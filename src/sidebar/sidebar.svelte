<script>
  import SidebarSection from './sidebarSection.svelte';
  import SidebarItem from './sidebarItem.svelte';
  import { routes } from '../generated/routes';
  import { router } from 'tinro';
  
  // Get current path for active state
  $: currentPath = $router.path;
  
  // Filter routes by category at build time
  const devLogRoutes = routes
    .filter(route => route.category === 'dev-logs')
    .sort((a, b) => a.slug.localeCompare(b.slug));
  
  const wikiRoutes = routes
    .filter(route => route.category === 'wiki')
    .sort((a, b) => a.slug.localeCompare(b.slug));
  
  const qualityProfileRoutes = routes
    .filter(route => route.type === 'quality-profile')
    .sort((a, b) => a.data.name.localeCompare(b.data.name));
  
  const customFormatRoutes = routes
    .filter(route => route.type === 'custom-format')
    .sort((a, b) => a.data.name.localeCompare(b.data.name));
  
  const regexPatternRoutes = routes
    .filter(route => route.type === 'regex-pattern')
    .sort((a, b) => a.data.name.localeCompare(b.data.name));
  
  const mediaManagementRoutes = routes
    .filter(route => route.type === 'media-management')
    .sort((a, b) => {
      // Custom sort order for media management
      const order = ['naming', 'qualitydefinitions', 'misc'];
      const aOrder = order.indexOf(a.slug);
      const bOrder = order.indexOf(b.slug);
      return aOrder - bOrder;
    });
</script>

<aside class="sticky top-16 w-80 h-[calc(100vh-4rem)] bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-700 overflow-y-auto">
  <div class="p-4">
    <!-- Getting Started Section -->
    <SidebarSection title="🚀 Getting Started">
      <SidebarItem href="/" label="Welcome!" isActive={currentPath === "/"} />
      <SidebarItem href="/profilarr-setup" label="Profilarr Setup" isActive={currentPath === "/profilarr-setup"} />
      <SidebarItem href="/development" label="Development" isActive={currentPath === "/development"} />
    </SidebarSection>
  
    <!-- Quality Profiles Section -->
    <SidebarSection title="Quality Profiles" href="/quality-profile" isActive={currentPath === "/quality-profile"}>
      {#each qualityProfileRoutes as route}
        <SidebarItem 
          href={route.path} 
          label={route.data.name}
          isActive={currentPath === route.path}
        />
      {/each}
    </SidebarSection>

    <!-- Development Log Section -->
    <SidebarSection title="Development Log" href="/dev-logs" isActive={currentPath === "/dev-logs"}>
      {#each devLogRoutes as route}
        <SidebarItem 
          href={route.path} 
          label={route.frontmatter?.title || route.slug}
          isActive={currentPath === route.path}
        />
      {/each}
    </SidebarSection>
    
    <!-- Wiki Section -->
    <SidebarSection title="Wiki" href="/wiki" isActive={currentPath === "/wiki"}>
      {#each wikiRoutes as route}
        <SidebarItem 
          href={route.path} 
          label={route.frontmatter?.title || route.slug}
          isActive={currentPath === route.path}
        />
      {/each}
    </SidebarSection>
    
    <!-- Custom Formats Section -->
    <SidebarSection title="Custom Formats" href="/custom-format" isActive={currentPath === "/custom-format"}>
      {#each customFormatRoutes as route}
        <SidebarItem 
          href={route.path} 
          label={route.data.name}
          isActive={currentPath === route.path}
        />
      {/each}
    </SidebarSection>
    
    <!-- Regex Patterns Section -->
    <SidebarSection title="Regex Patterns" href="/regex-pattern" isActive={currentPath === "/regex-pattern"}>
      {#each regexPatternRoutes as route}
        <SidebarItem 
          href={route.path} 
          label={route.data.name}
          isActive={currentPath === route.path}
        />
      {/each}
    </SidebarSection>
    
    <!-- Media Management Section -->
    <SidebarSection title="Media Management" href="/media-management" isActive={currentPath === "/media-management"}>
      {#each mediaManagementRoutes as route}
        <SidebarItem 
          href={route.path} 
          label={route.slug === 'naming' ? 'Naming Settings' : 
                 route.slug === 'qualitydefinitions' ? 'Quality Definitions' : 
                 route.slug === 'misc' ? 'Misc Settings' : route.data?.name || route.slug}
          isActive={currentPath === route.path}
        />
      {/each}
    </SidebarSection>
  </div>
</aside>