<script>
  import Search from './search.svelte';
  import Group from './group.svelte';
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  let searchTerm = '';
  
  function handleSearch(event) {
    searchTerm = event.detail;
    dispatch('search', searchTerm);
  }
  
  function handleGroupChange(event) {
    dispatch('groupChange', event.detail);
  }
</script>

<div class="mb-4 flex items-center">
  <Search bind:searchTerm on:search={handleSearch} />
  <Group on:groupChange={handleGroupChange} />
</div>