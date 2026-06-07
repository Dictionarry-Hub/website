import { mkdtempSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execSync } from 'node:child_process';

const schemaCache = new Map<string, string>();

export function fetchRepo(repo: string, ref: string): string {
	const url = `https://api.github.com/repos/${repo}/tarball/${ref}`;
	const tmp = mkdtempSync(join(tmpdir(), 'pcd-'));

	execSync(`curl -sL "${url}" | tar -xz -C "${tmp}"`, { stdio: 'pipe' });

	// Tarball extracts into a single directory named {owner}-{repo}-{hash}
	const entries = readdirSync(tmp);
	if (entries.length !== 1) {
		throw new Error(`Expected single directory in tarball for ${repo}@${ref}, got ${entries.length}`);
	}

	return join(tmp, entries[0]);
}

export function fetchSchema(repo: string, version: string): string {
	const cached = schemaCache.get(version);
	if (cached) return cached;

	const path = fetchRepo(repo, version);
	schemaCache.set(version, path);
	return path;
}

export function resolveSchemaVersion(manifest: { dependencies: Record<string, string> }): {
	repo: string;
	version: string;
} {
	// Dependencies use full GitHub URL as key, exact version as value
	// e.g. "https://github.com/Dictionarry-Hub/schema": "1.1.0"
	for (const [url, version] of Object.entries(manifest.dependencies)) {
		const match = url.match(/github\.com\/([^/]+\/[^/]+)/);
		if (match) {
			return { repo: match[1], version };
		}
	}
	throw new Error('No schema dependency found in manifest');
}

export function getOpsDir(repoPath: string): string {
	const opsPath = join(repoPath, 'ops');
	if (!existsSync(opsPath)) {
		throw new Error(`No ops/ directory found in ${repoPath}`);
	}
	return opsPath;
}

export function cleanupTempDirs(): void {
	// The OS will clean up temp dirs, but we clear the cache to free references
	schemaCache.clear();
}
