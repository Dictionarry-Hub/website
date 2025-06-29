export interface SearchEntry {
  title: string;
  type: 'wiki' | 'dev_log' | 'regex_pattern' | 'custom_format' | 'profile';
  description: string;
  author?: string;
  created?: string;
  tags: string[];
  content?: string;
  pattern?: string;
  slug?: string;
}

export const testSearchData: SearchEntry[] = [
  {
    title: "FAQ",
    type: "wiki",
    description: "Frequently asked questions pertaining to Dictionarry / Profilarr and all of its tooling.",
    author: "santiagosayshey",
    created: "2025-02-02",
    tags: ["wiki", "faq"],
    content: "This entry is dedicated to providing answers to the most frequently asked questions about Dictionarry / Profilarr.",
    slug: "faq"
  },
  {
    title: "Website 2.0",
    type: "dev_log",
    description: "Medium-ish update on the new website transition from mkdocs to Next.js with ISR.",
    author: "santiagosayshey", 
    created: "2025-02-02",
    tags: ["devlog", "website", "profile_builder", "eei", "2160p", "quality"],
    content: "I've wanted to transition away from the old site / mkdocs for a while now as its quite hard to maintain and keep everything up to date, so I built a new site using Next.js that uses ISR to rebuild its content using the dictionarry database."
  },
  {
    title: "x265",
    type: "regex_pattern",
    description: "An open source encoder that produces H.265 videos.",
    tags: ["Encoder", "Codec"],
    pattern: "^(?!.*(?i:remux))(?=.*([x]\\s?(\\.?265)\\b|HEVC|\\bDS4K\\b)).*$",
    content: "Matches x265 encoded content excluding remuxes. Tests against various release formats."
  },
  {
    title: "1080p Quality Tier 1",
    type: "custom_format",
    description: "Matches release groups who fall under 1080p GPPi Tier 1",
    tags: ["GPPi", "Release Group Tier", "1080p", "Quality"],
    content: "High quality 1080p release groups with excellent encoding standards."
  },
  {
    title: "1080p Quality",
    type: "profile",
    description: "1080p Quality utilizes the Golden Popcorn Performance Index to target transparent x264 1080p encodes.",
    tags: ["1080p", "x264", "Lossy Audio", "Quality Focused"],
    content: "5 Quality tiers prioritise encodes with high 1080p GPPi scores, with fallback to 1080p WEB-DLs and streaming optimised encodes."
  },
  {
    title: "Dolby Vision",
    type: "regex_pattern", 
    description: "Matches releases with Dolby Vision HDR technology",
    tags: ["HDR", "Dolby Vision", "Video Quality"],
    pattern: "(?i)\\b(dv|dovi|dolby.?vision)\\b",
    content: "Identifies content with Dolby Vision high dynamic range technology for enhanced viewing experience."
  },
  {
    title: "2160p Remux",
    type: "profile",
    description: "Targets 2160p UHD remuxes with lossless video and audio",
    tags: ["2160p", "4K", "UHD", "Remux", "Lossless"],
    content: "Premium profile for 4K UHD remuxes maintaining original quality from disc sources."
  },
  {
    title: "Golden Popcorn Performance Index",
    type: "wiki",
    description: "Comprehensive guide to the GPPi rating system for release quality assessment",
    author: "santiagosayshey",
    created: "2025-01-15", 
    tags: ["wiki", "GPPi", "quality", "rating"],
    content: "The Golden Popcorn Performance Index (GPPi) is a comprehensive rating system designed to evaluate the quality of video releases.",
    slug: "GPPi"
  }
];

export const searchFilters = [
  "All Types",
  "Wiki Articles", 
  "Development Logs",
  "Regex Patterns",
  "Custom Formats", 
  "Quality Profiles"
];