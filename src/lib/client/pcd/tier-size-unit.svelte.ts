import { TIER_SIZE_UNIT_LABELS, type TierSizeUnit } from '$lib/shared/utils/pcd/format';

const STORAGE_KEY = 'tier-size-unit';
const DEFAULT: TierSizeUnit = 'mb-min';

let current = $state<TierSizeUnit>(DEFAULT);

function isValidUnit(value: string): value is TierSizeUnit {
	return value in TIER_SIZE_UNIT_LABELS;
}

function set(unit: TierSizeUnit) {
	current = unit;
	localStorage.setItem(STORAGE_KEY, unit);
}

function init() {
	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored && isValidUnit(stored)) {
		current = stored;
	} else {
		current = DEFAULT;
	}
}

export const tierSizeUnit = {
	get current() {
		return current;
	},
	set,
	init,
	isValidUnit
};
