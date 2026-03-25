import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'
import Database from 'better-sqlite3'

// --- Types ---

interface PcdDatabaseSource {
	name: string
	repo: string
	branch: string
}

interface PcdConfig {
	databases: PcdDatabaseSource[]
}

interface PcdManifest {
	name: string
	version: string
	dependencies?: Record<string, string>
}

// --- Constants ---

const ROOT = path.resolve(import.meta.dirname, '..')
const CONFIG_PATH = path.join(ROOT, 'pcd.config.json')
const CACHE_DIR = path.join(ROOT, '.pcd-cache')
const OUTPUT_DIR = path.join(ROOT, 'src', 'data')

// --- Helpers ---

function log(msg: string): void {
	console.log(`[pcd] ${msg}`)
}

function git(args: string[], cwd?: string): string {
	try {
		return execSync(`git ${args.join(' ')}`, {
			cwd,
			stdio: 'pipe',
			encoding: 'utf-8'
		})
	} catch (err: unknown) {
		const execErr = err as { stderr?: string; message: string }
		throw new Error(execErr.stderr?.trim() || execErr.message, { cause: err })
	}
}

function ensureDir(dir: string): void {
	fs.mkdirSync(dir, { recursive: true })
}

function repoNameFromUrl(url: string): string {
	const name = url
		.replace(/\.git$/, '')
		.split('/')
		.pop()
	if (!name) throw new Error(`Cannot derive repo name from URL: ${url}`)
	return name
}

function sortOpsFiles(files: string[]): string[] {
	return files
		.filter((f) => f.endsWith('.sql'))
		.sort((a, b) => {
			const numA = parseInt(a.split('.')[0], 10)
			const numB = parseInt(b.split('.')[0], 10)
			return numA - numB
		})
}

function readJsonFile<T>(filePath: string): T {
	const raw = fs.readFileSync(filePath, 'utf-8')
	return JSON.parse(raw) as T
}

// --- Core functions ---

function cloneOrPull(cacheDir: string, url: string, branch?: string): void {
	const gitDir = path.join(cacheDir, '.git')

	if (fs.existsSync(gitDir)) {
		log(`  Updating ${url}`)
		git(['fetch', 'origin'], cacheDir)
		if (branch) {
			git(['checkout', branch], cacheDir)
			git(['reset', '--hard', `origin/${branch}`], cacheDir)
		}
	} else {
		const args = ['clone', url, cacheDir]
		if (branch) args.push('--branch', branch)
		log(`  Cloning ${url}${branch ? ` (branch: ${branch})` : ''}`)
		git(args)
	}
}

function checkoutTag(dir: string, tag: string): void {
	git(['fetch', 'origin', '--tags'], dir)
	try {
		git(['checkout', tag], dir)
	} catch {
		const tags = git(['tag', '--list'], dir).trim()
		throw new Error(`Tag "${tag}" not found in ${dir}. Available tags: ${tags || '(none)'}`)
	}
}

function replayOps(db: InstanceType<typeof Database>, opsDir: string, label: string): void {
	if (!fs.existsSync(opsDir)) {
		throw new Error(`No ops/ directory found in ${path.dirname(opsDir)}`)
	}

	const files = sortOpsFiles(fs.readdirSync(opsDir))

	if (files.length === 0) {
		log(`  No ${label} files to replay`)
		return
	}

	log(`  Replaying ${label} (${files.length} files)`)

	db.exec('BEGIN')
	try {
		for (const file of files) {
			log(`    ${file}`)
			const sql = fs.readFileSync(path.join(opsDir, file), 'utf-8')
			db.exec(sql)
		}
		db.exec('COMMIT')
	} catch (err: unknown) {
		db.exec('ROLLBACK')
		throw err
	}
}

// --- Main ---

function main(): void {
	if (!fs.existsSync(CONFIG_PATH)) {
		console.error('[pcd] Missing pcd.config.json in project root')
		process.exit(1)
	}

	const config = readJsonFile<PcdConfig>(CONFIG_PATH)

	if (!Array.isArray(config.databases) || config.databases.length === 0) {
		console.error('[pcd] pcd.config.json must have a non-empty "databases" array')
		process.exit(1)
	}

	ensureDir(CACHE_DIR)
	ensureDir(OUTPUT_DIR)

	for (const source of config.databases) {
		if (!source.name || !source.repo || !source.branch) {
			console.error(`[pcd] Invalid database entry: ${JSON.stringify(source)}`)
			process.exit(1)
		}

		log(`Building database: ${source.name}`)

		// Clone or update database repo
		const dbCacheDir = path.join(CACHE_DIR, source.name)
		cloneOrPull(dbCacheDir, source.repo, source.branch)

		// Read manifest and resolve schema dependency
		const manifestPath = path.join(dbCacheDir, 'pcd.json')
		if (!fs.existsSync(manifestPath)) {
			console.error(`[pcd] No pcd.json found in ${dbCacheDir}`)
			process.exit(1)
		}

		const manifest = readJsonFile<PcdManifest>(manifestPath)
		const deps = manifest.dependencies ?? {}
		const schemaEntries = Object.entries(deps)

		if (schemaEntries.length === 0) {
			console.error(`[pcd] No dependencies in ${manifestPath}`)
			process.exit(1)
		}

		// Resolve each dependency (currently just schema)
		const schemaDirs: string[] = []
		for (const [url, version] of schemaEntries) {
			const schemaName = repoNameFromUrl(url)
			const schemaCacheDir = path.join(CACHE_DIR, schemaName)

			log(`  Resolving dependency: ${schemaName}@${version}`)
			cloneOrPull(schemaCacheDir, url)
			checkoutTag(schemaCacheDir, version)
			schemaDirs.push(schemaCacheDir)
		}

		// Create fresh database
		const dbPath = path.join(OUTPUT_DIR, `${source.name}.db`)
		if (fs.existsSync(dbPath)) {
			fs.unlinkSync(dbPath)
		}

		const db = new Database(dbPath)
		db.pragma('journal_mode = WAL')
		db.pragma('foreign_keys = ON')

		try {
			// Replay schema ops
			for (const schemaDir of schemaDirs) {
				replayOps(db, path.join(schemaDir, 'ops'), 'schema ops')
			}

			// Replay database ops
			replayOps(db, path.join(dbCacheDir, 'ops'), 'database ops')

			// Switch back to delete journal mode so output is a single file
			db.pragma('journal_mode = delete')
		} finally {
			db.close()
		}

		log(`  Saved to src/data/${source.name}.db`)
	}

	log('Done.')
}

try {
	main()
} catch (err: unknown) {
	const msg = err instanceof Error ? err.message : String(err)
	console.error(`[pcd] ${msg}`)
	process.exit(1)
}
