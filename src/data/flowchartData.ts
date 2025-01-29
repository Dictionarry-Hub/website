// src/data/recruitmentFlowData.ts

import {
  Proportions, // for resolution
  Shrink, // for compression
  Scale, // for balanced
  Zap, // for efficient
  Blend, // for quality
  CodeIcon, // for codec
  SunMedium, // for HDR
} from 'lucide-react';

// Then create a mapping
export const nodeTypeToIcon = {
  resolution: Proportions,
  compression: Shrink,
  quality: Blend,
  balanced: Scale,
  efficient: Zap,
  codec: CodeIcon,
  hdr: SunMedium,
} as const;

export interface Node {
  id: string;
  label: string;
  column: number;
  type: keyof typeof nodeTypeToIcon;
  typeLabel: string;
}

export interface ConditionalEdge {
  from: string;
  to: string;
  condition?: (selectedNodes: string[]) => boolean; // must be true to render
}

export interface GraphData {
  nodes: Node[];
  edges: ConditionalEdge[];
}

export const QualityProfileData: GraphData = {
  nodes: [
    // Resolutions
    { id: 'sd', label: 'SD', column: 0, type: 'resolution', typeLabel: 'Resolution' },
    { id: '720p', label: '720p', column: 0, type: 'resolution', typeLabel: 'Resolution' },
    { id: '1080p', label: '1080p', column: 0, type: 'resolution', typeLabel: 'Resolution' },
    { id: '2160p', label: '2160p', column: 0, type: 'resolution', typeLabel: 'Resolution' },
    // Compression
    { id: 'compressed', label: 'Compressed', column: 1, type: 'compression', typeLabel: 'Compression' },
    { id: 'lossless', label: 'Lossless', column: 1, type: 'compression', typeLabel: 'Compression' },
    // Encode Types
    { id: 'quality', label: 'Quality', column: 2, type: 'quality', typeLabel: 'Encode Type' },
    { id: 'balanced', label: 'Balanced', column: 2, type: 'balanced', typeLabel: 'Encode Type' },
    { id: 'efficient', label: 'Efficient', column: 2, type: 'efficient', typeLabel: 'Encode Type' },
    // Codecs
    { id: 'av1', label: 'AV1', column: 3, type: 'codec', typeLabel: 'Codec' },
    { id: 'h265', label: 'h265', column: 3, type: 'codec', typeLabel: 'Codec' },
    { id: 'h264', label: 'h264', column: 3, type: 'codec', typeLabel: 'Codec' },
    // HDR
    { id: 'sdr', label: 'SDR', column: 4, type: 'hdr', typeLabel: 'HDR Type' },
    { id: 'hdr', label: 'DoVi + HDR Fallback', column: 4, type: 'hdr', typeLabel: 'HDR Type' },
    { id: 'dovi', label: 'DoVi No Fallback', column: 4, type: 'hdr', typeLabel: 'HDR Type' },
  ],

  edges: [
    // resolutions -> compressions
    { from: 'sd', to: 'compressed' },
    { from: 'sd', to: 'lossless' },
    { from: '720p', to: 'compressed' },
    { from: '1080p', to: 'compressed' },
    { from: '1080p', to: 'lossless' },
    { from: '2160p', to: 'compressed' },
    { from: '2160p', to: 'lossless' },

    // compressions -> encode types
    { from: 'compressed', to: 'quality' },
    {
      from: 'compressed',
      to: 'balanced',
      condition: (selectedNodes) => selectedNodes.includes('1080p') || selectedNodes.includes('2160p'),
    },
    {
      from: 'compressed',
      to: 'efficient',
      condition: (selectedNodes) => selectedNodes.includes('1080p') || selectedNodes.includes('2160p'),
    },

    // compressions -> codecs
    {
      from: 'lossless',
      to: 'h264',
      condition: (selectedNodes) => selectedNodes.includes('1080p'),
    },
    {
      from: 'lossless',
      to: 'h265',
      condition: (selectedNodes) => selectedNodes.includes('2160p'),
    },

    // compressed types -> codecs
    {
      from: 'quality',
      to: 'h264',
      condition: (selectedNodes) => !selectedNodes.includes('2160p'),
    },
    {
      from: 'quality',
      to: 'h265',
      condition: (selectedNodes) => selectedNodes.includes('1080p') || selectedNodes.includes('2160p'),
    },
    {
      from: 'balanced',
      to: 'h264',
      condition: (selectedNodes) => selectedNodes.includes('1080p'),
    },
    {
      from: 'balanced',
      to: 'h265',
      condition: (selectedNodes) => selectedNodes.includes('2160p'),
    },
    { from: 'efficient', to: 'h265' },
    {
      from: 'efficient',
      to: 'av1',
      condition: (selectedNodes) => !selectedNodes.includes('2160p'),
    },

    // codecs -> hdr
    { from: 'h264', to: 'sdr' },
    {
      from: 'h265',
      to: 'sdr',
      condition: (selectedNodes) => selectedNodes.includes('efficient'),
    },
    { from: 'h265', to: 'hdr' },
    {
      from: 'h265',
      to: 'dovi',
      condition: (selectedNodes) =>
        (selectedNodes.includes('2160p') && selectedNodes.includes('balanced')) || selectedNodes.includes('efficient'),
    },
    { from: 'av1', to: 'sdr' },

    //
  ],
};
