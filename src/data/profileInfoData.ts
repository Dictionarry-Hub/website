// src/data/profileInfoData.ts

// Column-based information
export type ColumnInfo = {
  info: string;
  nodes: {
    [nodeId: string]: {
      info: string;
    };
  };
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
        info: "SDR (Standard Dynamic Range) uses lower brightness levels and typically 8-bit color. It's universal, ensuring compatibility across all devices, but lacks the richer contrast and color detail found in HDR. Best for older screens or situations where HDR playback isn’t guaranteed.",
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

// Recommendations based on combinations
export const getRecommendation = (selectedNodes: string[]): string => {
  // This function will analyze the combination of selected nodes
  // and return appropriate recommendations
  // Example logic:
  if (selectedNodes.includes('2160p') && selectedNodes.includes('efficient')) {
    return 'Consider using h265 with SDR for better compatibility';
  }

  return 'Make a selection to see recommendations';
};
