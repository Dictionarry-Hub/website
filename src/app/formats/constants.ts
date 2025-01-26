// src/app/formats/constants.ts
import {
  Volume2,
  Sun,
  Users,
  Play,
  Code2,
  HardDrive,
  BarChart3,
  Monitor,
  Languages,
  Film,
} from "lucide-react";

export interface FormatCategory {
  id: string;
  label: string;
  tags: string[];
  icon: any; // Lucide icon component
  accentColor?: {
    light: string;
    dark: string;
    bg: string;
    darkBg: string;
  };
}

export const FORMAT_CATEGORIES: FormatCategory[] = [
  {
    id: "audio",
    label: "Audio",
    tags: ["Audio"],
    icon: Volume2,
    accentColor: {
      light: "text-purple-600",
      dark: "text-purple-400",
      bg: "bg-purple-50",
      darkBg: "dark:bg-purple-900/20",
    },
  },
  {
    id: "hdr",
    label: "HDR",
    tags: ["HDR"],
    icon: Sun,
    accentColor: {
      light: "text-amber-600",
      dark: "text-amber-400",
      bg: "bg-amber-50",
      darkBg: "dark:bg-amber-900/20",
    },
  },
  {
    id: "release-groups",
    label: "Release Groups",
    tags: ["Release Group"],
    icon: Users,
    accentColor: {
      light: "text-blue-600",
      dark: "text-blue-400",
      bg: "bg-blue-50",
      darkBg: "dark:bg-blue-900/20",
    },
  },
  {
    id: "streaming",
    label: "Streaming Services",
    tags: ["Streaming Service"],
    icon: Play,
    accentColor: {
      light: "text-red-600",
      dark: "text-red-400",
      bg: "bg-red-50",
      darkBg: "dark:bg-red-900/20",
    },
  },
  {
    id: "codecs",
    label: "Codecs",
    tags: ["Codec"],
    icon: Code2,
    accentColor: {
      light: "text-emerald-600",
      dark: "text-emerald-400",
      bg: "bg-emerald-50",
      darkBg: "dark:bg-emerald-900/20",
    },
  },
  {
    id: "storage",
    label: "Storage",
    tags: ["Storage"],
    icon: HardDrive,
    accentColor: {
      light: "text-cyan-600",
      dark: "text-cyan-400",
      bg: "bg-cyan-50",
      darkBg: "dark:bg-cyan-900/20",
    },
  },
  {
    id: "tiers",
    label: "Tiers",
    tags: ["Quality", "Efficient", "Balanced"],
    icon: BarChart3,
    accentColor: {
      light: "text-indigo-600",
      dark: "text-indigo-400",
      bg: "bg-indigo-50",
      darkBg: "dark:bg-indigo-900/20",
    },
  },
  {
    id: "resolution",
    label: "Resolution",
    tags: ["Resolution"],
    icon: Monitor,
    accentColor: {
      light: "text-rose-600",
      dark: "text-rose-400",
      bg: "bg-rose-50",
      darkBg: "dark:bg-rose-900/20",
    },
  },
  {
    id: "language",
    label: "Language",
    tags: ["Language"],
    icon: Languages,
    accentColor: {
      light: "text-teal-600",
      dark: "text-teal-400",
      bg: "bg-teal-50",
      darkBg: "dark:bg-teal-900/20",
    },
  },
  {
    id: "source",
    label: "Source",
    tags: ["Source"],
    icon: Film,
    accentColor: {
      light: "text-orange-600",
      dark: "text-orange-400",
      bg: "bg-orange-50",
      darkBg: "dark:bg-orange-900/20",
    },
  },
];
