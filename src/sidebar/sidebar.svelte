<script>
  import SidebarSection from './sidebarSection.svelte';
  import SidebarItem from './sidebarItem.svelte';
  import { contentDatabase } from '../generated/contentDatabase';
  import { router } from 'tinro';
  
  // Get current path for active state
  $: currentPath = $router.path;
  
  // Filter entries by category/type at build time
  const devLogEntries = contentDatabase.entries
    .filter(entry => entry.category === 'dev-logs' && entry.type !== 'static')
    .sort((a, b) => a.slug.localeCompare(b.slug));
  
  const wikiEntries = contentDatabase.entries
    .filter(entry => entry.category === 'wiki')
    .sort((a, b) => a.slug.localeCompare(b.slug));
  
  const qualityProfileEntries = contentDatabase.entries
    .filter(entry => entry.type === 'quality-profile')
    .sort((a, b) => a.title.localeCompare(b.title));
  
  const customFormatEntries = contentDatabase.entries
    .filter(entry => entry.type === 'custom-format')
    .sort((a, b) => a.title.localeCompare(b.title));
  
  const regexPatternEntries = contentDatabase.entries
    .filter(entry => entry.type === 'regex-pattern')
    .sort((a, b) => a.title.localeCompare(b.title));
  
  const mediaManagementEntries = contentDatabase.entries
    .filter(entry => entry.type === 'media-management')
    .sort((a, b) => {
      // Custom sort order for media management
      const order = ['naming', 'qualitydefinitions', 'misc'];
      const aOrder = order.indexOf(a.slug);
      const bOrder = order.indexOf(b.slug);
      return aOrder - bOrder;
    });
</script>

<aside class="sticky top-16 w-full lg:w-80 h-[calc(100vh-4rem)] bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-700 overflow-y-auto">
  <div class="p-4">
    <!-- Getting Started Section -->
    <SidebarSection title="🚀 Getting Started" href="/" isActive={currentPath === "/"}>
      <SidebarItem href="/profilarr-setup/installation" label="Installation" isActive={currentPath === "/profilarr-setup/installation"} />
      <SidebarItem href="/profilarr-setup/101" label="Profilarr 101" isActive={currentPath === "/profilarr-setup/101"} />
      <SidebarItem href="/profilarr-setup/linking" label="Linking" isActive={currentPath === "/profilarr-setup/linking"} />
      <SidebarItem href="/profilarr-setup/bridging" label="Bridging" isActive={currentPath === "/profilarr-setup/bridging"} />
      <SidebarItem href="/profilarr-setup/syncing" label="Syncing" isActive={currentPath === "/profilarr-setup/syncing"} />
      <SidebarItem href="/profilarr-setup/updates" label="Updates" isActive={currentPath === "/profilarr-setup/updates"} />
      <SidebarItem href="/development" label="Development" isActive={currentPath === "/development"} />
    </SidebarSection>
  
    <!-- Quality Profiles Section -->
    <SidebarSection title="⚡ Quality Profiles" href="/quality-profile" isActive={currentPath === "/quality-profile"}>
      {#each qualityProfileEntries as entry}
        <SidebarItem 
          href={entry.path} 
          label={entry.title}
          isActive={currentPath === entry.path}
        />
      {/each}
    </SidebarSection>

    <!-- Development Log Section -->
    <SidebarSection title="📝 Development Log" href="/dev-logs" isActive={currentPath === "/dev-logs"} isOpen={false}>
      {#each devLogEntries as entry}
        <SidebarItem 
          href={entry.path} 
          label={entry.title}
          isActive={currentPath === entry.path}
        />
      {/each}
    </SidebarSection>
    
    <!-- Wiki Section -->
    <SidebarSection title="📚 Wiki" href="/wiki" isActive={currentPath === "/wiki"} isOpen={false}>
      {#each wikiEntries as entry}
        <SidebarItem 
          href={entry.path} 
          label={entry.title}
          isActive={currentPath === entry.path}
        />
      {/each}
    </SidebarSection>
    
    <!-- Custom Formats Section -->
    <SidebarSection title="🎨 Custom Formats" href="/custom-format" isActive={currentPath === "/custom-format"}>
      {#each customFormatEntries as entry}
        <SidebarItem 
          href={entry.path} 
          label={entry.title}
          isActive={currentPath === entry.path}
        />
      {/each}
    </SidebarSection>
    
    <!-- Regex Patterns Section -->
    <SidebarSection title="🔍 Regex Patterns" href="/regex-pattern" isActive={currentPath === "/regex-pattern"}>
      {#each regexPatternEntries as entry}
        <SidebarItem 
          href={entry.path} 
          label={entry.title}
          isActive={currentPath === entry.path}
        />
      {/each}
    </SidebarSection>
    
    <!-- Media Management Section -->
    <SidebarSection title="📁 Media Management" href="/media-management" isActive={currentPath === "/media-management"}>
      {#each mediaManagementEntries as entry}
        <SidebarItem 
          href={entry.path} 
          label={entry.title}
          isActive={currentPath === entry.path}
        />
      {/each}
    </SidebarSection>
  </div>
</aside>