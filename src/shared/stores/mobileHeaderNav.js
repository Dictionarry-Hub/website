import { writable } from 'svelte/store';

export const isMobileHeaderNavOpen = writable(false);

export function toggleMobileHeaderNav() {
  isMobileHeaderNavOpen.update(value => !value);
}

export function closeMobileHeaderNav() {
  isMobileHeaderNavOpen.set(false);
}

export function openMobileHeaderNav() {
  isMobileHeaderNavOpen.set(true);
}