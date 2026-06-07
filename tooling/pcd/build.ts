import Database from 'better-sqlite3';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

export function compileDatabase(schemaOpsDir: string, baseOpsDir: string): Database.Database {
	const db = new Database(':memory:');
	db.pragma('journal_mode = WAL');
	db.pragma('foreign_keys = ON');

	executeOpsInOrder(db, schemaOpsDir);
	executeOpsInOrder(db, baseOpsDir);

	return db;
}

function executeOpsInOrder(db: Database.Database, opsDir: string): void {
	const files = readdirSync(opsDir)
		.filter((f) => f.endsWith('.sql'))
		.sort(byNumericPrefix);

	for (const file of files) {
		const sql = readFileSync(join(opsDir, file), 'utf-8');
		db.exec(sql);
	}
}

function byNumericPrefix(a: string, b: string): number {
	const numA = parseInt(a.match(/^(\d+)/)?.[1] ?? '0', 10);
	const numB = parseInt(b.match(/^(\d+)/)?.[1] ?? '0', 10);
	return numA - numB;
}
