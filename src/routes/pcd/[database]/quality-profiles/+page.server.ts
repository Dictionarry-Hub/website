import { pcdDatabaseEntries } from '$lib/shared/utils/pcd/prerender.js';
import type { EntryGenerator } from './$types';

export const entries: EntryGenerator = pcdDatabaseEntries;
