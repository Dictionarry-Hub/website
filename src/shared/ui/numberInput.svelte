<script>
  import { createEventDispatcher } from 'svelte';
  
  export let value = 0;
  export let min = undefined;
  export let max = undefined;
  export let placeholder = '';
  export let width = 'w-20';
  export let disabled = false;
  
  const dispatch = createEventDispatcher();
  
  let inputElement;
  
  function handleInput(event) {
    const inputValue = event.target.value;
    
    // Allow empty string, negative sign alone, or valid numbers
    if (inputValue === '' || inputValue === '-') {
      value = inputValue;
      dispatch('input', value);
      return;
    }
    
    // Parse as number
    const numValue = parseFloat(inputValue);
    
    // Check if it's a valid number
    if (!isNaN(numValue)) {
      // Apply min/max constraints
      if (min !== undefined && numValue < min) {
        value = min;
      } else if (max !== undefined && numValue > max) {
        value = max;
      } else {
        value = numValue;
      }
      
      dispatch('input', value);
    } else {
      // Reset to previous value if invalid
      event.target.value = value;
    }
  }
  
  function handleKeydown(event) {
    // Allow: backspace, delete, tab, escape, enter
    if ([8, 9, 27, 13, 46].includes(event.keyCode) ||
      // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
      (event.keyCode === 65 && event.ctrlKey === true) ||
      (event.keyCode === 67 && event.ctrlKey === true) ||
      (event.keyCode === 86 && event.ctrlKey === true) ||
      (event.keyCode === 88 && event.ctrlKey === true) ||
      // Allow: home, end, left, right
      (event.keyCode >= 35 && event.keyCode <= 39)) {
      // Let it happen
      return;
    }
    
    // Allow minus sign at the beginning
    if (event.key === '-' && event.target.selectionStart === 0 && !event.target.value.includes('-')) {
      return;
    }
    
    // Allow decimal point
    if (event.key === '.' && !event.target.value.includes('.')) {
      return;
    }
    
    // Ensure that it is a number and stop other keys
    if ((event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) && (event.keyCode < 96 || event.keyCode > 105)) {
      event.preventDefault();
    }
  }
  
  function handleBlur() {
    // Clean up value on blur
    if (value === '' || value === '-') {
      value = min !== undefined ? min : 0;
      dispatch('input', value);
    }
  }
</script>

<input
  bind:this={inputElement}
  type="text"
  {value}
  {placeholder}
  {disabled}
  on:input={handleInput}
  on:keydown={handleKeydown}
  on:blur={handleBlur}
  class="{width} px-2 py-1 text-sm border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
  style="appearance: textfield; -moz-appearance: textfield; -webkit-appearance: none;"
/>

<style>
  /* Hide spinner buttons */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>