import { writable } from 'svelte/store';

export const isMobileSidebarOpen = writable(false);

export function toggleMobileSidebar() {
  isMobileSidebarOpen.update(value => !value);
}

export function closeMobileSidebar() {
  isMobileSidebarOpen.set(false);
}

export function openMobileSidebar() {
  isMobileSidebarOpen.set(true);
}