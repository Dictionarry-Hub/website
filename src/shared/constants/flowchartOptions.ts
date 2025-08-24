export interface FlowchartItem {
  label: string;
  icon?: string; // Lucide icon name
}

export interface FlowchartColumn {
  id: string;
  name: string;
  description?: string;
  items: FlowchartItem[];
}

export interface QualityProfile {
  name: string;
  path: string[]; // e.g., ["1080p", "Compressed", "Quality", "h264", "SDR"]
  url?: string; // Link to the profile page
  available: boolean; // true if available, false if coming soon
  icon?: string;
}

export const flowchartColumns: FlowchartColumn[] = [
  {
    id: "col1",
    name: "Resolution",
    description: "The number of pixels in a video. Higher resolutions like 1080p or 4K offer more detail but use more space than 720p or SD.",
    items: [
      { label: "SD", icon: "Square" },
      { label: "720p", icon: "LayoutPanelTop" },
      { label: "1080p", icon: "Grid2x2" },
      { label: "2160p", icon: "Grid3x3" }
    ]
  },
  {
    id: "col2",
    name: "Compression",
    description: "How video data is stored. Lossless preserves all data for perfect quality at the cost of large files. Compressed uses smart encoding to reduce file size with minimal quality loss.",
    items: [
      { label: "Lossless", icon: "Package" },
      { label: "Compressed", icon: "PackageOpen" }
    ]
  },
  {
    id: "col3",
    name: "Focus",
    description: "Determines the primary goal: maximum quality, a balanced approach, or smallest file size.",
    items: [
      { label: "Quality", icon: "Sparkles" },
      { label: "Balanced", icon: "Scale" },
      { label: "Efficient", icon: "Zap" }
    ]
  },
  {
    id: "col4",
    name: "Codec",
    description: "The algorithm used to compress video. H.265 (HEVC) offers excellent compression and enables HDR support. H.264 (AVC) is the most compatible but limited to SDR.",
    items: [
      { label: "h265", icon: "FileVideo" },
      { label: "h264", icon: "FileVideo" }
    ]
  },
  {
    id: "col5",
    name: "HDR",
    description: "High Dynamic Range enhances color and brightness for supported displays. HDR content includes Dolby Vision with HDR10 fallback for maximum compatibility. SDR is standard dynamic range without enhanced color or brightness.",
    items: [
      { label: "HDR", icon: "Sun" },
      { label: "SDR", icon: "CloudSun" }
    ]
  }
];

export const qualityProfiles: QualityProfile[] = [
  {
    name: "1080p Balanced",
    path: ["1080p", "Compressed", "Balanced", "h264", "SDR"],
    url: "/quality-profile/1080p-balanced",
    available: true
  },
  {
    name: "1080p Balanced Plus",
    path: ["1080p", "Compressed", "Balanced", "h265", "SDR"],
    url: "/quality-profile/1080p-balanced-plus",
    available: true
  },
  {
    name: "1080p Efficient",
    path: ["1080p", "Compressed", "Efficient", "h265", "SDR"],
    url: "/quality-profile/1080p-efficient",
    available: true
  },
  {
    name: "1080p Efficient Plus",
    path: ["1080p", "Compressed", "Efficient", "h265", "SDR"],
    url: "/quality-profile/1080p-efficient-plus",
    available: false
  },
  {
    name: "1080p Quality",
    path: ["1080p", "Compressed", "Quality", "h264", "SDR"],
    url: "/quality-profile/1080p-quality",
    available: true
  },
  {
    name: "1080p Quality (HDR)",
    path: ["1080p", "Compressed", "Quality", "h265", "HDR"],
    url: "/quality-profile/1080p-quality-hdr",
    available: true
  },
  {
    name: "1080p Remux",
    path: ["1080p", "Lossless", "Quality", "h264", "SDR"],
    url: "/quality-profile/1080p-remux",
    available: true
  },
  {
    name: "2160p Balanced",
    path: ["2160p", "Compressed", "Balanced", "h265", "HDR"],
    url: "/quality-profile/2160p-balanced",
    available: true
  },
  {
    name: "2160p Quality",
    path: ["2160p", "Compressed", "Quality", "h265", "HDR"],
    url: "/quality-profile/2160p-quality",
    available: true
  },
  {
    name: "2160p Remux",
    path: ["2160p", "Lossless", "Quality", "h265", "HDR"],
    url: "/quality-profile/2160p-remux",
    available: true
  },
  {
    name: "720p Quality",
    path: ["720p", "Compressed", "Quality", "h264", "SDR"],
    url: "/quality-profile/720p-quality",
    available: true
  },
  {
    name: "DVD Remux",
    path: ["SD", "Lossless", "Quality", "h264", "SDR"],
    url: "/quality-profile/dvd-remux",
    available: false
  },
  {
    name: "SD Quality",
    path: ["SD", "Compressed", "Quality", "h264", "SDR"],
    url: "/quality-profile/sd-quality",
    available: false
  }
];


// Helper function to get available options for the next column based on current selections
export function getAvailableOptions(selections: Record<number, number>, columnIndex: number): string[] {
  // Build the current partial path from selections
  const currentPath: string[] = [];
  for (let i = 1; i < columnIndex; i++) {
    if (selections[i]) {
      const colIdx = i - 1;
      const itemIdx = selections[i] - 1;
      const column = flowchartColumns[colIdx];
      if (column && column.items[itemIdx]) {
        currentPath.push(column.items[itemIdx].label);
      }
    }
  }
  
  const pathIndex = columnIndex - 1;
  
  // Find all profiles that match the current path
  const matchingProfiles = qualityProfiles.filter(profile => {
    // Check if profile path starts with current selections
    for (let i = 0; i < currentPath.length; i++) {
      if (profile.path[i] !== currentPath[i]) return false;
    }
    return true;
  });
  
  // Extract unique options for the current column
  const availableOptions = new Set<string>();
  matchingProfiles.forEach(profile => {
    if (profile.path[pathIndex]) {
      availableOptions.add(profile.path[pathIndex]);
    }
  });
  
  return Array.from(availableOptions);
}

// Helper function to get matching profile based on complete selections
export function getMatchingProfile(selections: Record<number, number>): QualityProfile | null {
  const path: string[] = [];
  
  for (let i = 1; i <= 5; i++) {
    if (selections[i]) {
      const columnIndex = i - 1;
      const itemIndex = selections[i] - 1;
      const column = flowchartColumns[columnIndex];
      if (column && column.items[itemIndex]) {
        path.push(column.items[itemIndex].label);
      }
    }
  }
  
  // Find profile with matching path
  return qualityProfiles.find(profile => {
    if (profile.path.length !== path.length) return false;
    for (let i = 0; i < path.length; i++) {
      if (profile.path[i] !== path[i]) return false;
    }
    return true;
  }) || null;
}