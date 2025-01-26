import {
  Hash,
  Users,
  Star,
  Globe,
  Flag,
  Film,
  Monitor,
  Zap,
  HardDrive,
  PlayCircle,
  Calendar,
  LucideIcon,
} from "lucide-react";

type ConditionType =
  | "release_title"
  | "release_group"
  | "edition"
  | "language"
  | "indexer_flag"
  | "source"
  | "resolution"
  | "quality_modifier"
  | "size"
  | "release_type"
  | "year";

type ColorConfig = {
  bg: string;
  darkBg: string;
  text: string;
  darkText: string;
};

type ConditionMetadata = {
  icon: LucideIcon;
  color: ColorConfig;
};

export const CONDITION_METADATA: Record<ConditionType, ConditionMetadata> = {
  release_title: {
    icon: Hash,
    color: {
      bg: "bg-blue-100",
      darkBg: "dark:bg-blue-900/30",
      text: "text-blue-600",
      darkText: "dark:text-blue-400",
    },
  },
  release_group: {
    icon: Users,
    color: {
      bg: "bg-purple-100",
      darkBg: "dark:bg-purple-900/30",
      text: "text-purple-600",
      darkText: "dark:text-purple-400",
    },
  },
  edition: {
    icon: Star,
    color: {
      bg: "bg-yellow-100",
      darkBg: "dark:bg-yellow-900/30",
      text: "text-yellow-600",
      darkText: "dark:text-yellow-400",
    },
  },
  language: {
    icon: Globe,
    color: {
      bg: "bg-green-100",
      darkBg: "dark:bg-green-900/30",
      text: "text-green-600",
      darkText: "dark:text-green-400",
    },
  },
  indexer_flag: {
    icon: Flag,
    color: {
      bg: "bg-red-100",
      darkBg: "dark:bg-red-900/30",
      text: "text-red-600",
      darkText: "dark:text-red-400",
    },
  },
  source: {
    icon: Film,
    color: {
      bg: "bg-indigo-100",
      darkBg: "dark:bg-indigo-900/30",
      text: "text-indigo-600",
      darkText: "dark:text-indigo-400",
    },
  },
  resolution: {
    icon: Monitor,
    color: {
      bg: "bg-cyan-100",
      darkBg: "dark:bg-cyan-900/30",
      text: "text-cyan-600",
      darkText: "dark:text-cyan-400",
    },
  },
  quality_modifier: {
    icon: Zap,
    color: {
      bg: "bg-amber-100",
      darkBg: "dark:bg-amber-900/30",
      text: "text-amber-600",
      darkText: "dark:text-amber-400",
    },
  },
  size: {
    icon: HardDrive,
    color: {
      bg: "bg-rose-100",
      darkBg: "dark:bg-rose-900/30",
      text: "text-rose-600",
      darkText: "dark:text-rose-400",
    },
  },
  release_type: {
    icon: PlayCircle,
    color: {
      bg: "bg-teal-100",
      darkBg: "dark:bg-teal-900/30",
      text: "text-teal-600",
      darkText: "dark:text-teal-400",
    },
  },
  year: {
    icon: Calendar,
    color: {
      bg: "bg-orange-100",
      darkBg: "dark:bg-orange-900/30",
      text: "text-orange-600",
      darkText: "dark:text-orange-400",
    },
  },
};
