<script>
  import { navigationItems } from '@shared/stores/navigation';
  import NavigationSection from './navigationSection.svelte';
  import NavigationItem from './navigationItem.svelte';
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
    const sections = document.querySelectorAll('[id]');
    let current = '';
    
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 120) { // Account for navbar height + some buffer
        current = section.id;
      }
    });
    
    activeSection = current;
  }
  
  onMount(() => {
    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection);
    window.addEventListener('hashchange', updateActiveSection);
  });
  
  onDestroy(() => {
    window.removeEventListener('scroll', updateActiveSection);
    window.removeEventListener('hashchange', updateActiveSection);
  });
</script>

{#if $navigationItems.items.length > 0}
<aside class="sticky top-16 w-80 h-[calc(100vh-4rem)] bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-700 overflow-y-auto">
  <div class="p-4">
    <div class="space-y-1">
      {#each $navigationItems.items as item}
        {#if typeof item === 'string'}
          <NavigationItem href="#section={sanitizeForAnchor(item)}" label={item} isActive={activeSection === sanitizeForAnchor(item)} />
        {:else if item.title}
          <!-- Main section -->
          <div class="mb-3">
            <NavigationItem href="#section={sanitizeForAnchor(item.title)}" label={item.title} isActive={activeSection === sanitizeForAnchor(item.title)} />
            
            {#if item.children}
              <div class="ml-4 mt-1 space-y-0.5">
                {#each item.children as child}
                  {#if typeof child === 'string'}
                    <NavigationItem href="#section={sanitizeForAnchor(child)}" label={child} isActive={activeSection === sanitizeForAnchor(child)} />
                  {:else if child.title}
                    <!-- Subsection -->
                    <div class="ml-2">
                      <NavigationItem href="#section={sanitizeForAnchor(child.title)}" label={child.title} isActive={activeSection === sanitizeForAnchor(child.title)} />
                      
                      {#if child.children}
                        <div class="ml-4 mt-0.5 space-y-0.5">
                          {#each child.children as grandchild}
                            {#if typeof grandchild === 'string'}
                              <NavigationItem href="#section={sanitizeForAnchor(grandchild)}" label={grandchild} isActive={activeSection === sanitizeForAnchor(grandchild)} />
                            {:else if grandchild.title}
                              <div class="ml-2">
                                <NavigationItem href="#section={sanitizeForAnchor(grandchild.title)}" label={grandchild.title} isActive={activeSection === sanitizeForAnchor(grandchild.title)} />
                                
                                {#if grandchild.children}
                                  <div class="ml-4 mt-0.5 space-y-0.5">
                                    {#each grandchild.children as greatgrandchild}
                                      <NavigationItem href="#section={sanitizeForAnchor(greatgrandchild)}" label={greatgrandchild} isActive={activeSection === sanitizeForAnchor(greatgrandchild)} />
                                    {/each}
                                  </div>
                                {/if}
                              </div>
                            {/if}
                          {/each}
                        </div>
                      {/if}
                    </div>
                  {/if}
                {/each}
              </div>
            {/if}
          </div>
        {/if}
      {/each}
    </div>
  </div>
</aside>
{/if}