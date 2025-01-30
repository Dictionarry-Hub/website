// src/data/profileInfoData.tsx
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Column-based information
export type ColumnInfo = {
  info: string;
  nodes: {
    [nodeId: string]: {
      info: string;
    };
  };
};

export type Profile = {
  name: string;
  description: string;
  requirements: string[];
  tags?: string[];
};

export const columnInfo: ColumnInfo[] = [
  // Column 0 - Resolution
  {
    info: "Resolution is the number of pixels in each dimension that video displays, typically described as width x height. Higher resolutions can show more detail, but only if your display supports it and the content was actually filmed that way. While resolution is not the only factor in video quality, it's the broadest starting point.",
    nodes: {
      sd: {
        info: "Standard Definition is the most basic resolution available, originally used for DVDs and older TV content. While the picture quality will be noticeably lower than HD, SD has some important advantages: files are much smaller (great for storage), they'll play on virtually any device (since they're almost always encoded in h264), and their small sizes mean stable remote streaming. Since there are other profiles that specialise in encoding efficiency, SD should only be used when watching on small screens.",
      },
      '720p': {
        info: "720p bridges the gap between SD and Full HD. Its moderate resolution means files are notably smaller than 1080p while still providing HD quality. Best suited for laptop viewing or when streaming to mobile devices, as the quality difference from 1080p is less noticeable on smaller screens. If you're looking for efficient streaming, consider 1080p with a more efficient encoding profile instead.",
      },
      '1080p': {
        info: '1080p has become the standard resolution for modern content. It provides excellent clarity on most TV sizes and monitors while maintaining reasonable file sizes. Offers the most flexibility for different encoding options and provides good compatibility across devices. Unless you have specific needs for higher or lower resolutions, 1080p is the recommended starting point.',
      },
      '2160p': {
        info: "4K quadruples the pixel count of 1080p, offering maximum detail for content mastered above 1080p (can be 2K or 4K). While it enables HDR and other premium features, it requires significant bandwidth and storage. Best suited for home theater setups with large 4K TVs, but make sure your network and devices can handle it. If you're after quality but have bandwidth concerns, consider 1080p with quality-focused encoding instead.",
      },
    },
  },
  // Column 1 - Compression
  {
    info: 'Compression determines how the video data is reduced in size. Lossy (compressed) formats can significantly cut file sizes, sometimes even improving perceived quality by fixing source defects. Lossless formats preserve every bit of data, resulting in large files but guaranteeing exact fidelity. Consider your storage capacity, bandwidth, and whether or not incremental improvements over time matter to you.',
    nodes: {
      compressed: {
        info: 'Applies lossy compression to shrink file sizes for more efficient storage and streaming. Some detail may be lost, but well-done encodes can smooth out or even fix minor source defects, leading to a result that can sometimes look subjectively better than an unprocessed source. This option is typically sufficient for everyday viewing and mobile streaming. Dictionarry considers bluray encodes, web encodes (called WEBRips) and WEB-DLs as compressed.',
      },
      lossless: {
        info: "Retains all original data without discarding any detail. This guarantees maximum fidelity at the cost of significantly larger file sizes. Outside of perfect quality, its biggest advantage is immutability—once you have a proper remux or lossless copy (especially for 1080p content), there's often little incentive to upgrade further. Dictionarry considers remuxes as lossless. Full disc copies are also lossless, but they're not allowed in any of these profiles.",
      },
    },
  },
  // Column 2 - Encode Types
  {
    info: 'Dictionarry defines three distinct encoding approaches, catering to different user preferences regarding quality, file size, and efficiency.',
    nodes: {
      quality: {
        info: 'Prioritizes maximum transparency, sometimes sourced from high-quality masters such as 4K web releases or UHD Blu-rays (if you allow h265 w/ HDR). While file sizes are significantly larger, they provide the best possible visual fidelity for an encode. Falls back to standard web sources when no dedicated encode is available.',
      },
      balanced: {
        info: 'Optimized for a balance between quality and file size. Prefers Web-DLs for their high reliability and good compression, with a fallback to releases from streaming-optimized groups like BHDStudio and hallowed when available. If neither is an option, it defaults to transparent encodes to maintain quality standards.',
      },
      efficient: {
        info: 'Designed for users prioritizing storage and bandwidth efficiency. Prefers highly optimized encodes, often utilizing advanced codecs like HEVC (H.265) or AV1 when permitted. If unavailable, falls back to Web-DLs, then streaming-optimized groups, and finally, transparent encodes as a last resort.',
      },
    },
  },
  // Column 3 - Codecs
  {
    info: 'A video codec is a method or standard for compressing and decompressing digital video. As newer codecs appear, they tend to offer better compression (smaller file sizes or higher quality) but often require more powerful or recent hardware and can be harder to produce. This leads to fewer available encodes, especially the more recent they are. The right codec choice depends on your playback devices, available bandwidth, and desire for efficiency versus compatibility and quality.',
    nodes: {
      av1: {
        info: "AV1 is among the newest codecs, offering excellent compression efficiency. However, it's still relatively rare, as encoding can be time-consuming and hardware support remains limited to newer GPUs and certain dedicated chips. Expect a smaller selection of AV1 encodes and potential playback issues on older or less capable devices.",
      },
      h265: {
        info: 'HEVC (H.265) improves on H.264 by delivering smaller file sizes at comparable quality. However, royalty/licensing concerns have slowed its adoption, and not all devices support HEVC out of the box. Ensure your playback hardware or software is compatible before opting for H.265 to avoid potential playback issues.',
      },
      h264: {
        info: "H.264 is the most widely adopted codec, delivering broad compatibility across almost every modern device, from older TVs to mobile phones. Although it's less efficient than newer codecs, its ubiquity makes it the safest choice when you need guaranteed playback without worrying about specialized hardware support.",
      },
    },
  },
  // Column 4 - HDR
  {
    info: 'High Dynamic Range (HDR) expands color depth and brightness ranges beyond Standard Dynamic Range (SDR). HDR is generally only available with H.265 (or newer) due to bit-depth requirements. Choosing HDR can deliver vivid, lifelike images, but requires a compatible device. Dolby Vision (DoVi) is an advanced form of HDR that may include—or omit fallback HDR10 metadata for non-DoVi hardware.',
    nodes: {
      sdr: {
        info: "SDR (Standard Dynamic Range) uses lower brightness levels and typically 8-bit color. It's universal, ensuring compatibility across all devices, but lacks the richer contrast and color detail found in HDR. Best for older screens or situations where HDR playback isn't guaranteed.",
      },
      hdr: {
        info: 'HDR10 or HDR10+ utilizes 10-bit color to produce deeper blacks and brighter highlights. Dolby Vision is a premium HDR format offering dynamic metadata for scene-by-scene optimization. This options prefers Dolby Vision ONLY with HDR fallback, but also allows releases with normal HDR10/+. Make sure your device supports HDR before selecting this.',
      },
      dovi: {
        info: 'This option allows grabbing Dobly Vision that does not include regular HDR fallback. Make sure your playback device supports Dolby Vision before selecting this.',
      },
    },
  },
];

// Define all available profiles
export const profiles: Profile[] = [
  {
    name: 'DVD Remux',
    description: 'This profile is a work in progress, check back later!',
    requirements: ['sd', 'lossless'],
    tags: ['SD', 'Remux', 'Lossless Audio'],
  },
  {
    name: 'SD Quality',
    description: 'This profile is a work in progress, check back later!',
    requirements: ['sd', 'compressed', 'quality', 'h264', 'sdr'],
    tags: ['SD', 'x264', 'Lossy Audio'],
  },
  {
    name: '720p Quality',
    description: 'This profile is a work in progress, check back later!',
    requirements: ['720p', 'compressed', 'quality', 'h264', 'sdr'],
    tags: ['720p', 'x264', 'Lossy Audio'],
  },
  {
    name: '1080p Efficient',
    description: 'This profile is a work in progress, check back later!',
    requirements: ['1080p', 'compressed', 'efficient', 'h265', 'av1', 'sdr', 'hdr', 'dovi'],
    tags: ['1080p', 'x265', 'AV1', 'Efficient Focused'],
  },
  {
    name: '1080p Balanced',
    description:
      '1080p Balanced targets consistent & immutable 1080p WEB-DLs with fallback to transparent x264 encodes, prioritised using the Golden Popcorn Performance Index. Special considerations are given to Balanced groups who prioritize streaming optimisation over quality.',
    requirements: ['1080p', 'compressed', 'balanced', 'h264', 'sdr'],
    tags: ['1080p', 'x264', 'Lossy Audio', 'Balanced Focused'],
  },
  {
    name: '1080p Quality',
    description:
      '1080p Quality utilizes the Golden Popcorn Performance Index to target transparent x264 1080p encodes with 5 quality tiers prioritising encodes with high GPPi scores.',
    requirements: ['1080p', 'compressed', 'quality', 'h264', 'sdr'],
    tags: ['1080p', 'x264', 'Lossy Audio', 'Quality Focused'],
  },
  {
    name: '1080p Quality (HDR)',
    description:
      '1080p Quality (HDR) utilizes the Golden Popcorn Performance Index to target transparent x265 HDR 1080p encodes from UHD Bluray sources, with fallback to regular 1080p Quality profile.',
    requirements: ['1080p', 'compressed', 'quality', 'h265', 'hdr'],
    tags: ['1080p', 'x264', 'x265', 'HDR', 'Lossy Audio', 'Quality Focused'],
  },
  {
    name: '1080p Remux',
    description:
      '1080p Remux utilizes audio tags to prioritise high quality lossless copies of HD Blu-rays. Focuses on audio metrics such as TrueHD, Atmos, DTS-X for determining upgrades.',
    requirements: ['1080p', 'lossless', 'sdr', 'h264'],
    tags: ['1080p', 'Remux', 'Lossless Audio', 'h264'],
  },
  {
    name: '2160p Balanced',
    description:
      '2160p Balanced targets consistent & immutable 2160p HDR WEB-DLs with lossy audio. Special considerations for Balanced groups who prioritize streaming optimisation.',
    requirements: ['2160p', 'compressed', 'balanced', 'h265', 'hdr', 'dovi'],
    tags: ['2160p', 'HDR', 'x264', 'h265', 'Lossy Audio', 'Balanced Focused'],
  },
  {
    name: '2160p Quality',
    description:
      '2160p Quality utilizes the Encode Efficiency Index metric at a 55% target ratio to prioritize transparent x265 4k encodes. Features 4 quality tiers for reputable groups with HDR and lossless audio considerations.',
    requirements: ['2160p', 'compressed', 'quality', 'h265', 'hdr'],
    tags: ['2160p', 'HDR', 'x265', 'Encode', 'Lossless Audio', 'Quality Focused'],
  },
  {
    name: '2160p Remux',
    description:
      '2160p Remux utilizes audio/video tags to prioritise high quality lossless copies of UHD Blu-rays, using metrics like Dolby Vision, TrueHD, Atmos, and HDR10+ for upgrade decisions.',
    requirements: ['2160p', 'lossless', 'h265', 'hdr'],
    tags: ['2160p', 'Remux', 'HDR', 'Lossless Audio', 'h265'],
  },
];

// Helper function to create URL-friendly profile names
const createSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// Render a single profile recommendation
const ProfileCard: React.FC<{ profile: Profile }> = ({ profile }) => {
  const slug = createSlug(profile.name);

  return (
    <Link
      href={`/profiles/${slug}`}
      className="group block p-4 mb-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 
        hover:bg-blue-50 dark:hover:bg-blue-900/10 hover:border-blue-200 dark:hover:border-blue-800
        transition-all duration-200 relative"
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <h4 className="text-md font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {profile.name}
            </h4>
            <ArrowRight
              className="h-4 w-4 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 
              -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200"
            />
          </div>

          <p className="text-gray-600 dark:text-gray-300 text-sm">{profile.description}</p>

          {profile.tags && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {profile.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 text-xs font-medium rounded-full
                    bg-gray-100 dark:bg-gray-700 
                    text-gray-600 dark:text-gray-300
                    group-hover:bg-blue-100 group-hover:text-blue-700
                    dark:group-hover:bg-blue-900/30 dark:group-hover:text-blue-300
                    transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export const getRecommendations = (selectedNodes: string[]): React.ReactNode => {
  const filteredSelections = selectedNodes.filter(Boolean);

  if (filteredSelections.length === 0) {
    return <p className="text-gray-600 dark:text-gray-300 text-sm">Make a selection to see recommendations</p>;
  }

  // Find all profiles that match the current selections
  const matchingProfiles = profiles.filter((profile) => {
    // Check if all selected nodes are part of the profile's requirements
    return (
      filteredSelections.every((selection) => profile.requirements.includes(selection)) &&
      // Check if the profile matches the resolution if one is selected
      (!filteredSelections.some((sel) => ['2160p', '1080p', '720p'].includes(sel)) ||
        profile.requirements.some((req) => filteredSelections.includes(req)))
    );
  });

  if (matchingProfiles.length === 0) {
    return (
      <div className="text-center p-4">
        <p className="text-gray-600 dark:text-gray-300 text-sm">No matching profiles for current selections</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {matchingProfiles.map((profile, index) => (
        <ProfileCard key={index} profile={profile} />
      ))}
    </div>
  );
};
