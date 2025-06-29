import { writable } from 'svelte/store';

export interface NavigationItem {
  title?: string;
  children?: (string | NavigationItem)[];
}

export interface NavigationData {
  items: (string | NavigationItem)[];
  basePath: string;
}

export const navigationItems = writable<NavigationData>({ items: [], basePath: '' });

export function setNavigationItems(items: (string | NavigationItem)[], basePath: string = '') {
  navigationItems.set({ items, basePath });
}

export function clearNavigation() {
  navigationItems.set({ items: [], basePath: '' });
}