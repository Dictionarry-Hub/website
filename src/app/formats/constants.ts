// src/app/formats/constants.ts

export interface FormatCategory {
  id: string;
  label: string;
  tags: string[];
}

export const FORMAT_CATEGORIES: FormatCategory[] = [
  {
    id: "audio",
    label: "Audio",
    tags: ["Audio"],
  },
  {
    id: "hdr",
    label: "HDR",
    tags: ["HDR"],
  },
  {
    id: "release-groups",
    label: "Release Groups",
    tags: ["Release Group"],
  },
  {
    id: "streaming",
    label: "Streaming Services",
    tags: ["Streaming Service"],
  },
  {
    id: "codecs",
    label: "Codecs",
    tags: ["Codec"],
  },
  {
    id: "storage",
    label: "Storage",
    tags: ["Storage"],
  },
  {
    id: "tiers",
    label: "Tiers",
    tags: ["Quality", "Efficient", "Balanced"],
  },
  {
    id: "resolution",
    label: "Resolution",
    tags: ["Resolution"],
  },
  {
    id: "language",
    label: "Language",
    tags: ["Language"],
  },
  {
    id: "source",
    label: "Source",
    tags: ["Source"],
  },
] as const;
