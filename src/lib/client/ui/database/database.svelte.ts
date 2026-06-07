const STORAGE_KEY = 'pcd-database';

export const DATABASES = [
	{ id: 'dictionarry', name: 'Dictionarry' },
	{ id: 'trash', name: 'TRaSH' },
	{ id: 'trash-french', name: 'TRaSH French' },
	{ id: 'trash-german', name: 'TRaSH German' },
	{ id: 'dumpstarr', name: 'Dumpstarr' }
] as const;

export type DatabaseId = (typeof DATABASES)[number]['id'];

const DEFAULT: DatabaseId = DATABASES[0].id;

let current = $state<DatabaseId>(DEFAULT);

function set(id: DatabaseId) {
	current = id;
	localStorage.setItem(STORAGE_KEY, id);
}

function init() {
	const stored = localStorage.getItem(STORAGE_KEY) as DatabaseId | null;
	if (stored && DATABASES.some((d) => d.id === stored)) {
		current = stored;
	} else {
		current = DEFAULT;
	}
}

export const database = {
	get current() {
		return current;
	},
	set,
	init,
	DATABASES
};
