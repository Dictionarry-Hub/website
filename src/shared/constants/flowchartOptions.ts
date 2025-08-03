export interface FlowchartItem {
  label: string;
  icon?: string; // Lucide icon name
}

export interface FlowchartColumn {
  id: string;
  name: string;
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
    items: [
      { label: 'Lossless', icon: 'Package' },
      { label: 'Compressed', icon: 'PackageOpen' }
    ]
  },
  {
    id: 'col3',
    name: 'Type',
    items: [
      { label: 'Quality', icon: 'Sparkles' },
      { label: 'Balanced', icon: 'Scale' },
      { label: 'Efficient', icon: 'Zap' }
    ]
  },
  {
    id: 'col4',
    name: 'Codec',
    items: [
      { label: 'AV1', icon: 'FileVideo' },
      { label: 'h265', icon: 'FileVideo' },
      { label: 'h264', icon: 'FileVideo' }
    ]
  },
  {
    id: 'col5',
    name: 'HDR',
    items: [
      { label: 'DV + HDR10', icon: 'Sun' },
      { label: 'Dolby Vision', icon: 'Sunrise' },
      { label: 'SDR', icon: 'CloudSun' }
    ]
  }
];

// Define allowed edges (connections between items)
// Format: 'columnId:itemIndex' -> ['nextColumnId:itemIndex', ...]
export const flowchartEdges: FlowchartEdges = {
  // Column 1 connections
  'col1:0': ['col2:0', 'col2:1'],        // Item 1A can go to 2A or 2B
  'col1:1': ['col2:1', 'col2:2'],        // Item 1B can go to 2B or 2C
  'col1:2': ['col2:0', 'col2:1', 'col2:2'], // Item 1C can go to any in col2
  
  // Column 2 connections
  'col2:0': ['col3:0', 'col3:1'],
  'col2:1': ['col3:1'],
  'col2:2': ['col3:1', 'col3:2'],
  
  // Column 3 connections
  'col3:0': ['col4:0'],
  'col3:1': ['col4:0', 'col4:1', 'col4:2'],
  'col3:2': ['col4:2'],
  
  // Column 4 connections
  'col4:0': ['col5:0', 'col5:1'],
  'col4:1': ['col5:1'],
  'col4:2': ['col5:1', 'col5:2'],
  
  // Column 5 has no outgoing connections (final column)
};