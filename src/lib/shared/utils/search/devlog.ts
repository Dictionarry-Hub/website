import type { DevLogIndexEntry } from '../llm/devlog.js';
import { BASELINE_ELO, type SearchEntry } from './types.js';

export function buildDevLogEntry(devLog: DevLogIndexEntry): SearchEntry {
	return {
		title: devLog.title,
		url: `/dev-logs/${devLog.slug}`,
		type: 'dev-log',
		blurb: devLog.blurb ?? '',
		keywords: [...(devLog.tags ?? []), 'dev log'],
		elo: BASELINE_ELO
	};
}
