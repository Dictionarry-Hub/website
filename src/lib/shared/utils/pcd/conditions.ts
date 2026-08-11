import type { ConditionType } from '$lib/types/pcd';

const CONDITION_TYPE_ORDER: ConditionType[] = [
	'resolution',
	'source',
	'quality_modifier',
	'release_title',
	'release_group',
	'edition',
	'language',
	'release_type',
	'indexer_flag',
	'size',
	'year'
];

const typeOrder = new Map<string, number>(
	CONDITION_TYPE_ORDER.map((conditionType, index) => [conditionType, index])
);

function statusPriority(required: boolean, negate: boolean): number {
	if (required && !negate) return 0;
	if (negate) return 1;
	return 2;
}

export function sortConditions<
	T extends { name: string; type: string; required: boolean; negate: boolean }
>(conditions: readonly T[]): T[] {
	return [...conditions].sort((a, b) => {
		const statusDifference =
			statusPriority(a.required, a.negate) - statusPriority(b.required, b.negate);
		if (statusDifference !== 0) return statusDifference;

		const typeDifference = (typeOrder.get(a.type) ?? 999) - (typeOrder.get(b.type) ?? 999);
		if (typeDifference !== 0) return typeDifference;

		return a.name.localeCompare(b.name);
	});
}
