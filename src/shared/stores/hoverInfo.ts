import { writable } from 'svelte/store';

export interface HoverInfoContent {
  term: string;
  description: string;
}

export interface HoverInfoState {
  isVisible: boolean;
  content: HoverInfoContent | null;
}

export const hoverInfoStore = writable<HoverInfoState>({
  isVisible: false,
  content: null
});

export function showHoverInfo(term: string, description: string) {
  hoverInfoStore.set({
    isVisible: true,
    content: { term, description }
  });
}

export function hideHoverInfo() {
  hoverInfoStore.set({
    isVisible: false,
    content: null
  });
}