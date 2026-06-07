export interface FileEntry {
	path: string;
	content: string;
}

export interface Violation {
	rule: string;
	file: string;
	message: string;
	line?: number;
	column?: number;
}

export interface LintRule {
	name: string;
	description: string;
	category: string;
	severity: 'error' | 'warn';
	files: string;
	check(files: FileEntry[]): Violation[];
}
