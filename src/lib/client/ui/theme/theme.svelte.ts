const STORAGE_KEY = 'theme';
export const THEMES = ['light', 'dark', 'retro'] as const;
export type Theme = (typeof THEMES)[number];

let current = $state<Theme>('light');

function set(t: Theme) {
	current = t;
	if (t === 'light') {
		document.documentElement.removeAttribute('data-theme');
	} else {
		document.documentElement.setAttribute('data-theme', t);
	}
	localStorage.setItem(STORAGE_KEY, t);
}

function init() {
	const attr = document.documentElement.getAttribute('data-theme');
	if (attr === 'dark' || attr === 'retro') {
		current = attr;
	} else {
		const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
		if (stored && THEMES.includes(stored)) {
			current = stored;
		}
	}
}

export const theme = {
	get current() {
		return current;
	},
	set,
	init,
	THEMES
};
