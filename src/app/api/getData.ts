// src/app/api/getData.ts

export interface Condition {
  name: string;
  negate: boolean;
  required: boolean;
  type: string;
  pattern?: string;
  source?: string;
  resolution?: string;
}

export interface TestConditionResult {
  matches: boolean;
  name: string;
  negate: boolean;
  pattern: string;
  required: boolean;
  type: string;
}

export interface Test {
  conditionResults: TestConditionResult[];
  expected: boolean;
  id: number;
  input: string;
  lastRun: string;
  passes: boolean;
}

export interface TierInfo {
  name: string;
  description: string;
  conditions: Condition[];
  tags: string[];
  tests: Test[];
  _id: string;
  tierNumber: number;
}

export interface TypeTiers {
  [key: string]: TierInfo[];
}

export interface ResolutionTypes {
  [key: string]: TypeTiers;
}

export interface ReleaseGroupTiers {
  resolutions: ResolutionTypes;
}

export async function getVersion() {
  try {
    const response = await fetch(
      'https://raw.githubusercontent.com/Dictionarry-Hub/database/stable/bundles/version.json',
      { next: { revalidate: 86400 } }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch version: ${response.status}`);
    }

    const version = await response.json();
    return version;
  } catch (error) {
    console.error('Error fetching version:', error);
    return null;
  }
}

export async function getContent(type: string) {
  try {
    const response = await fetch(
      `https://raw.githubusercontent.com/Dictionarry-Hub/database/stable/bundles/${type}.json`,
      {
        next: { revalidate: 86400 },
        cache: 'force-cache',
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch ${type} content: ${response.status}`);
    }

    const text = await response.text();

    try {
      const data = JSON.parse(text);
      return data;
    } catch (parseError) {
      console.error(`Error parsing ${type} JSON:`, parseError);
      console.error('Raw response:', text.slice(0, 200));
      throw new Error(`Invalid JSON in ${type} response`);
    }
  } catch (error) {
    console.error(`Error fetching ${type} content:`, error);
    return null;
  }
}

export async function getHomeContent() {
  try {
    const response = await fetch(
      'https://raw.githubusercontent.com/Dictionarry-Hub/database/stable/bundles/wiki.json',
      {
        next: {
          revalidate: 86400,
        },
        cache: 'force-cache',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch');
    }

    const data = await response.json();

    interface WikiEntry {
      _id: string;
      content?: string;
      author?: string;
      last_modified?: string;
    }

    const homeEntry = data.find((entry: WikiEntry) => entry._id === 'home');

    if (!homeEntry) {
      return null;
    }

    return {
      id: homeEntry._id,
      content: homeEntry.content || '',
      author: homeEntry.author || 'Unknown',
      last_modified: homeEntry.last_modified || null,
    };
  } catch (error) {
    console.error('Error fetching home content:', error);
    return null;
  }
}
export async function getReleaseGroupTiers(): Promise<ReleaseGroupTiers | null> {
  try {
    const response = await fetch(
      `https://raw.githubusercontent.com/Dictionarry-Hub/database/stable/bundles/custom_formats.json`,
      {
        next: { revalidate: 86400 },
        cache: 'force-cache',
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch custom formats: ${response.status}`);
    }

    const data = await response.json();
    if (!data) return null;

    // Case-insensitive regex with normalized output
    const tierRegex = /^(SD|720p|1080p|2160p)\s+(quality|efficient)\s+tier\s+(\d+)$/i;
    const tiers: ReleaseGroupTiers = {
      resolutions: {},
    };

    data.forEach((item: TierInfo) => {
      const match = item.name.match(tierRegex);
      if (match) {
        const resolution = match[1];
        const type = match[2];
        const tierNumber = match[3];
        const normalizedType = type.toLowerCase();

        if (!tiers.resolutions[resolution]) {
          tiers.resolutions[resolution] = {};
        }

        if (!tiers.resolutions[resolution][normalizedType]) {
          tiers.resolutions[resolution][normalizedType] = [];
        }

        tiers.resolutions[resolution][normalizedType].push({
          ...item,
          tierNumber: parseInt(tierNumber),
        });
      }
    });

    Object.values(tiers.resolutions).forEach((resolutionTypes) => {
      Object.values(resolutionTypes).forEach((typeTiers) => {
        typeTiers.sort((a, b) => a.tierNumber - b.tierNumber);
      });
    });

    return tiers;
  } catch (error) {
    console.error('Error fetching release group tiers:', error);
    return null;
  }
}
