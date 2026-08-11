import { slugify } from '$lib/shared/utils/slug';
import type { CompiledDatabase, ProfileScore } from '$lib/types/pcd';

export type RegularExpressionReference = {
	name: string;
	slug: string;
	tags: string[];
	[key: string]: unknown;
};

export type QualityProfileReference = {
	name: string;
	slug: string;
	scores: {
		radarr: number | null;
		sonarr: number | null;
	};
	[key: string]: unknown;
};

export function regularExpressionReferences(
	data: CompiledDatabase,
	regularExpressionName: string
): RegularExpressionReference[] {
	return data.customFormats
		.filter((format) =>
			format.conditions.some(
				(condition) =>
					(condition.data.type === 'release_title' ||
						condition.data.type === 'release_group' ||
						condition.data.type === 'edition') &&
					condition.data.regularExpressionName === regularExpressionName
			)
		)
		.map((format) => ({
			name: format.name,
			slug: slugify(format.name),
			tags: format.tags
		}));
}

export function customFormatProfileReferences(
	data: CompiledDatabase,
	customFormatName: string
): QualityProfileReference[] {
	return data.qualityProfiles
		.flatMap((profile) => {
			const scoring = profile.scoring.filter(
				(entry) => entry.customFormatName === customFormatName
			);
			const fallback = scoreFor(scoring, 'all');
			const radarr = scoreFor(scoring, 'radarr') ?? fallback;
			const sonarr = scoreFor(scoring, 'sonarr') ?? fallback;

			if (radarr === null && sonarr === null) return [];

			return [
				{
					name: profile.name,
					slug: slugify(profile.name),
					scores: { radarr, sonarr }
				}
			];
		})
		.sort((a, b) => a.name.localeCompare(b.name));
}

function scoreFor(scoring: ProfileScore[], arrType: string): number | null {
	return scoring.find((entry) => entry.arrType === arrType)?.score ?? null;
}

export function formatProfileScore(score: number): string {
	const formatted = score.toLocaleString('en-US');
	return score > 0 ? `+${formatted}` : formatted;
}
