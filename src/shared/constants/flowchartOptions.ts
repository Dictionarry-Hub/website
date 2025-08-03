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

export interface FlowchartEdges {
  [itemId: string]: string[]; // Array of allowed next items
}

// Define the columns and their items
export const flowchartColumns: FlowchartColumn[] = [
  {
    id: 'col1',
    name: 'Resolution',
    description: 'The number of pixels in a video. Higher resolutions like 1080p or 4K offer more detail but use more space than 720p or SD.',
    items: [
      { label: 'SD', icon: 'Square' },
      { label: '720p', icon: 'LayoutPanelTop' },
      { label: '1080p', icon: 'Grid2x2' },
      { label: '2160p', icon: 'Grid3x3' }
    ]
  },
  {
    id: 'col2',
    name: 'Compression',
    description: 'How video data is stored. Lossless preserves all data for perfect quality at the cost of large files. Compressed uses smart encoding to reduce file size with minimal quality loss.',
    items: [
      { label: 'Lossless', icon: 'Package' },
      { label: 'Compressed', icon: 'PackageOpen' }
    ]
  },
  {
    id: 'col3',
    name: 'Focus',
    description: 'Determines the primary goal: maximum quality, a balanced approach, or smallest file size.',
    items: [
      { label: 'Quality', icon: 'Sparkles' },
      { label: 'Balanced', icon: 'Scale' },
      { label: 'Efficient', icon: 'Zap' }
    ]
  },
  {
    id: 'col4',
    name: 'Codec',
    description: 'The algorithm used to compress video. H.265 (HEVC) offers excellent compression and enables HDR support. H.264 (AVC) is the most compatible but limited to SDR.',
    items: [
      { label: 'h265', icon: 'FileVideo' },
      { label: 'h264', icon: 'FileVideo' }
    ]
  },
  {
    id: 'col5',
    name: 'HDR',
    description: 'High Dynamic Range enhances color and brightness for supported displays. HDR content includes Dolby Vision with HDR10 fallback for maximum compatibility. SDR is standard dynamic range without enhanced color or brightness.',
    items: [
      { label: 'HDR', icon: 'Sun' },
      { label: 'SDR', icon: 'CloudSun' }
    ]
  }
];

// Define allowed edges (connections between items)
// Format: 'columnId:itemIndex' -> ['nextColumnId:itemIndex', ...]
export const flowchartEdges: FlowchartEdges = {
  // Column 1 connections
  'col1:0': ['col2:0', 'col2:1'], // SD -> Lossless, Compressed
  'col1:1': ['col2:1'],          // 720p -> Compressed
  'col1:2': ['col2:0', 'col2:1'], // 1080p -> Lossless, Compressed
  'col1:3': ['col2:0', 'col2:1'], // 2160p -> Lossless, Compressed
  
  // Column 2 connections
  'col2:0': ['col4:0', 'col4:1', 'col4:2'], // Lossless -> Skips Type to Codec
  'col2:1': ['col3:0', 'col3:1', 'col3:2'], // Compressed -> Quality, Balanced, Efficient
  
  // Column 3 connections (Focus -> Codec)
  'col3:0': ['col4:0', 'col4:1'], // Quality -> h265, h264
  'col3:1': ['col4:1'],           // Balanced -> h264
  'col3:2': ['col4:0'],           // Efficient -> h265
  
  // Column 4 connections (Codec -> HDR)
  'col4:0': ['col5:0', 'col5:1'], // h265 -> HDR, SDR
  'col4:1': ['col5:1'],           // h264 -> SDR only
  
  // Column 5 has no outgoing connections (final column)
};