import { writable } from 'svelte/store';

// Stores
export const isMobileSidebarOpen = writable(false);
export const isMobileHeaderNavOpen = writable(false);

// Sidebar functions
export function toggleMobileSidebar() {
  // Close header nav if open
  isMobileHeaderNavOpen.set(false);
  isMobileSidebarOpen.update(value => !value);
}

export function closeMobileSidebar() {
  isMobileSidebarOpen.set(false);
}

export function openMobileSidebar() {
  // Close header nav if open
  isMobileHeaderNavOpen.set(false);
  isMobileSidebarOpen.set(true);
}

// Header nav functions
export function toggleMobileHeaderNav() {
  // Close sidebar if open
  isMobileSidebarOpen.set(false);
  isMobileHeaderNavOpen.update(value => !value);
}

export function closeMobileHeaderNav() {
  isMobileHeaderNavOpen.set(false);
}

export function openMobileHeaderNav() {
  // Close sidebar if open
  isMobileSidebarOpen.set(false);
  isMobileHeaderNavOpen.set(true);
}

// Close all mobile navigation
export function closeAllMobileNav() {
  isMobileSidebarOpen.set(false);
  isMobileHeaderNavOpen.set(false);
}