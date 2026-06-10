import { THEME_DEFINITIONS, type Theme } from './themes';

const STORAGE_KEY = 'theme';
export const THEMES: readonly Theme[] = THEME_DEFINITIONS.map((d) => d.id);
export type { Theme };

let current = $state<Theme>('system');

function resolveSystem(): 'light' | 'dark' {
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyToDOM(t: Theme) {
	const resolved = t === 'system' ? resolveSystem() : t;
	if (resolved === 'light') {
		document.documentElement.removeAttribute('data-theme');
	} else {
		document.documentElement.setAttribute('data-theme', resolved);
	}
}

function set(t: Theme) {
	current = t;
	applyToDOM(t);
	localStorage.setItem(STORAGE_KEY, t);
}

function init() {
	const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
	if (stored && THEMES.includes(stored)) {
		current = stored;
	} else {
		current = 'system';
	}
	applyToDOM(current);

	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
		if (current === 'system') {
			applyToDOM('system');
		}
	});
}

export const theme = {
	get current() {
		return current;
	},
	set,
	init,
	THEMES
};
