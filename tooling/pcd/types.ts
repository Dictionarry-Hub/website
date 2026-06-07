export interface PcdConfig {
	schema: {
		repo: string;
	};
	databases: DatabaseEntry[];
}

export interface DatabaseEntry {
	id: string;
	name: string;
	repo: string;
	branch: string;
}

export interface PcdManifest {
	name: string;
	version: string;
	description: string;
	arr_types?: string[];
	dependencies: Record<string, string>;
	authors?: { name: string; email?: string }[];
	license?: string;
	repository?: string;
	tags?: string[];
	links?: Record<string, string>;
	profilarr?: { minimum_version: string };
}

export interface FetchedRepo {
	path: string;
	manifest: PcdManifest;
}
