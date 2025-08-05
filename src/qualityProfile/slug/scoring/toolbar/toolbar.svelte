<script>
  import Search from './search.svelte';
  import Group from './group.svelte';
  import Value from './value.svelte';
  import { createEventDispatcher } from 'svelte';
  
  export let rangeMin = 0;
  export let rangeMax = 0;
  export let minValue = rangeMin;
  export let maxValue = rangeMax;
  
  const dispatch = createEventDispatcher();
  
  let searchTerm = '';
  
  function handleSearch(event) {
    searchTerm = event.detail;
    dispatch('search', searchTerm);
  }
  
  function handleGroupChange(event) {
    dispatch('groupChange', event.detail);
  }
  
  function handleValueChange(event) {
    dispatch('valueChange', event.detail);
  }
</script>

<div class="mb-4 flex items-center">
  <Search bind:searchTerm on:search={handleSearch} />
  <Group on:groupChange={handleGroupChange} />
  <Value {rangeMin} {rangeMax} {minValue} {maxValue} on:change={handleValueChange} />
</div>