<script>
  import { setNavigationItems, clearNavigation } from '@shared/stores/navigation';
  import { onMount, onDestroy } from 'svelte';
  
  onMount(() => {
    setNavigationItems([
      { 
        title: 'Profilarr Setup', 
        children: [
          'Installation',
          { title: 'Usage', children: [
            'Credentials Setup',
            'Configuration Workflows',
            'Connecting to a Database',
            'Getting Updates',
            'Making Changes',
            'Handling Merge Conflicts',
            'Profilarr Quirks',
            'Git Gud'
          ]},
          { title: 'Importing', children: [
            'Type / Server',
            'Sync Settings',
            'External App Setup'
          ]}
        ]
      }
    ], '');
  });
  
  onDestroy(() => {
    clearNavigation();
  });
</script>

<div class="p-6 max-w-4xl mx-auto">

</div>