<script>
  import { navigationItems } from '@shared/stores/navigation';
  import HeaderNavItem from './headerNavItem.svelte';
  import HoverInfo from '@ui/hoverInfo.svelte';
  import { ListTree } from 'lucide-svelte';
  import { onMount, onDestroy } from 'svelte';
  
  let activeSection = '';
  
  function sanitizeForAnchor(text) {
    return text
      .replace(/[^\w\s-]/g, '') // Remove emojis and special characters except hyphens
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-'); // Replace spaces with hyphens
  }
  
  function updateActiveSection() {
    // Check URL first
    const hash = window.location.hash;
    if (hash.includes('section=')) {
      const sectionMatch = hash.match(/section=([^&]+)/);
      if (sectionMatch) {
        activeSection = sectionMatch[1];
        return;
      }
    }
    
    // Fall back to scroll position detection
    const mainContent = document.querySelector('main');
    if (!mainContent) return;
    
    const sections = document.querySelectorAll('[id]');
    let current = '';
    
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const mainRect = mainContent.getBoundingClientRect();
      if (rect.top <= mainRect.top + 120) { // Account for navbar height + some buffer
        current = section.id;
      }
    });
    
    activeSection = current;
  }
  
  onMount(() => {
    updateActiveSection();
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.addEventListener('scroll', updateActiveSection);
    }
    window.addEventListener('hashchange', updateActiveSection);
  });
  
  onDestroy(() => {
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.removeEventListener('scroll', updateActiveSection);
    }
    window.removeEventListener('hashchange', updateActiveSection);
  });
</script>

{#if $navigationItems.items.length > 0}
<aside class="sticky top-16 w-80 h-[calc(100vh-4rem)] bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-700 overflow-y-auto">
  <div class="p-6">
    <div class="mb-6 pb-3 border-b border-neutral-200 dark:border-neutral-800">
      <div class="flex items-center gap-2.5">
        <div class="p-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-md">
          <ListTree class="w-4 h-4 text-blue-600 dark:text-blue-400" />
        </div>
        <span class="text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
          On This Page
        </span>
      </div>
    </div>
    <div>
      {#each $navigationItems.items as item, index}
        {#if typeof item === 'string'}
          <div class="mb-2">
            <HeaderNavItem href="?section={sanitizeForAnchor(item)}" label={`${index + 1}. ${item}`} isActive={activeSection === sanitizeForAnchor(item)} level={0} />
          </div>
        {:else if item.title}
          <!-- Main section -->
          <div class="mb-2">
            <HeaderNavItem href="?section={sanitizeForAnchor(item.title)}" label={`${index + 1}. ${item.title}`} isActive={activeSection === sanitizeForAnchor(item.title)} level={0} />
            
            {#if item.children}
              <div class="ml-2 mt-2 border-l-2 border-neutral-100 dark:border-neutral-800 pl-3">
                {#each item.children as child}
                  {#if typeof child === 'string'}
                    <HeaderNavItem href="?section={sanitizeForAnchor(child)}" label={child} isActive={activeSection === sanitizeForAnchor(child)} level={1} />
                  {:else if child.title}
                    <!-- Subsection -->
                    <HeaderNavItem href="?section={sanitizeForAnchor(child.title)}" label={child.title} isActive={activeSection === sanitizeForAnchor(child.title)} level={1} />
                    
                    {#if child.children}
                      <div class="ml-2 mt-1 border-l-2 border-neutral-100 dark:border-neutral-800 pl-3">
                        {#each child.children as grandchild}
                          {#if typeof grandchild === 'string'}
                            <HeaderNavItem href="?section={sanitizeForAnchor(grandchild)}" label={grandchild} isActive={activeSection === sanitizeForAnchor(grandchild)} level={2} />
                          {:else if grandchild.title}
                            <HeaderNavItem href="?section={sanitizeForAnchor(grandchild.title)}" label={grandchild.title} isActive={activeSection === sanitizeForAnchor(grandchild.title)} level={2} />
                            
                            {#if grandchild.children}
                              <div class="ml-2 mt-1 border-l-2 border-neutral-100 dark:border-neutral-800 pl-3">
                                {#each grandchild.children as greatgrandchild}
                                  <HeaderNavItem href="?section={sanitizeForAnchor(greatgrandchild)}" label={greatgrandchild} isActive={activeSection === sanitizeForAnchor(greatgrandchild)} level={3} />
                                {/each}
                              </div>
                            {/if}
                          {/if}
                        {/each}
                      </div>
                    {/if}
                  {/if}
                {/each}
              </div>
            {/if}
          </div>
        {/if}
      {/each}
    </div>
    <HoverInfo />
  </div>
</aside>
{/if}