export const routes = [
  {
    "path": "/quality-profile/1080p-balanced",
    "type": "quality-profile",
    "data": {
      "name": "1080p Balanced",
      "description": "1080p Balanced targets consistent & immutable 1080p **WEB-DLs** with fallback to transparent x264 encodes, prioritised using the **Golden Popcorn Performance Index**.\n\n- Special considerations are given to **Balanced** groups who prioritize **streaming optimisation** over quality, falling somewhere around a tier 2 WEB-DL. This includes groups like **BHDStudio** and **hallowed**.\n- If no 1080p release can be found, the profile will fall back to SD releases - DVD remuxes  / encodes. ",
      "tags": [
        "1080p",
        "Balanced Focused",
        "Lossy Audio",
        "x264",
        "h264"
      ],
      "upgradesAllowed": true,
      "minCustomFormatScore": 2000,
      "upgradeUntilScore": 10000,
      "minScoreIncrement": 1,
      "custom_formats": [
        {
          "name": "1080p Balanced Tier 1",
          "score": 8300
        },
        {
          "name": "1080p Balanced Tier 2",
          "score": 8200
        },
        {
          "name": "1080p WEB-DL",
          "score": 8000
        },
        {
          "name": "720p WEB-DL",
          "score": 6000
        },
        {
          "name": "720p Bluray",
          "score": 5000
        },
        {
          "name": "720p WEBRip",
          "score": 5000
        },
        {
          "name": "480p WEB-DL",
          "score": 3000
        },
        {
          "name": "720p Quality Tier 1",
          "score": 2100
        },
        {
          "name": "720p Quality Tier 2",
          "score": 2000
        },
        {
          "name": "DVD",
          "score": 2000
        },
        {
          "name": "DVD Remux",
          "score": 2000
        },
        {
          "name": "720p Quality Tier 3",
          "score": 1900
        },
        {
          "name": "720p Quality Tier 4",
          "score": 1800
        },
        {
          "name": "720p Quality Tier 5",
          "score": 1700
        },
        {
          "name": "720p Golden Popcorn",
          "score": 600
        },
        {
          "name": "MA",
          "score": 500
        },
        {
          "name": "AMZN",
          "score": 400
        },
        {
          "name": "ATVP",
          "score": 400
        },
        {
          "name": "DSNP",
          "score": 400
        },
        {
          "name": "SD Golden Popcorn",
          "score": 400
        },
        {
          "name": "CRIT",
          "score": 300
        },
        {
          "name": "HMAX",
          "score": 300
        },
        {
          "name": "iT",
          "score": 300
        },
        {
          "name": "MAX",
          "score": 300
        },
        {
          "name": "NF",
          "score": 300
        },
        {
          "name": "NOW",
          "score": 300
        },
        {
          "name": "PCOK",
          "score": 300
        },
        {
          "name": "SD Quality Tier 1",
          "score": 300
        },
        {
          "name": "HTSR",
          "score": 200
        },
        {
          "name": "HULU",
          "score": 200
        },
        {
          "name": "PMTP",
          "score": 200
        },
        {
          "name": "ROKU",
          "score": 200
        },
        {
          "name": "SD Quality Tier 2",
          "score": 200
        },
        {
          "name": "SHO",
          "score": 200
        },
        {
          "name": "STAN",
          "score": 200
        },
        {
          "name": "Atmos",
          "score": 100
        },
        {
          "name": "Atmos (Missing)",
          "score": 100
        },
        {
          "name": "Special Edition",
          "score": 100
        },
        {
          "name": "WEB-DL Tier 1",
          "score": 80
        },
        {
          "name": "WEB-DL Tier 2",
          "score": 60
        },
        {
          "name": "WEB-DL Tier 3",
          "score": 40
        },
        {
          "name": "WEB-DL Tier 4",
          "score": 20
        },
        {
          "name": "Season Pack",
          "score": 10
        },
        {
          "name": "Repack3",
          "score": 8
        },
        {
          "name": "Repack2",
          "score": 7
        },
        {
          "name": "Repack1",
          "score": 6
        },
        {
          "name": "3D",
          "score": -99999
        },
        {
          "name": "AV1",
          "score": -99999
        },
        {
          "name": "B&W",
          "score": -99999
        },
        {
          "name": "Dolby Vision",
          "score": -99999
        },
        {
          "name": "Extras",
          "score": -99999
        },
        {
          "name": "Full Disc",
          "score": -99999
        },
        {
          "name": "Full Disc (Quality Match)",
          "score": -99999
        },
        {
          "name": "h265",
          "score": -99999
        },
        {
          "name": "HDR",
          "score": -99999
        },
        {
          "name": "HDR10",
          "score": -99999
        },
        {
          "name": "HDR10+",
          "score": -99999
        },
        {
          "name": "HLG",
          "score": -99999
        },
        {
          "name": "PQ",
          "score": -99999
        },
        {
          "name": "Remux",
          "score": -99999
        },
        {
          "name": "UnWanted Release Groups",
          "score": -99999
        },
        {
          "name": "UnWanted WEBRip Groups",
          "score": -99999
        },
        {
          "name": "Upscaled",
          "score": -99999
        },
        {
          "name": "VP9",
          "score": -99999
        },
        {
          "name": "VVC",
          "score": -99999
        },
        {
          "name": "x265",
          "score": -99999
        }
      ],
      "qualities": [
        {
          "id": -1,
          "name": "Balanced Capable",
          "description": "Balanced Capable releases. Typically WEB-DL would be the overwhelming majority of releases, but there are occasional streaming optimised encodes that should be preferred.",
          "qualities": [
            {
              "id": 10,
              "name": "Bluray-1080p"
            },
            {
              "id": 9,
              "name": "WEBDL-1080p"
            }
          ]
        },
        {
          "id": -2,
          "name": "720p Fallback",
          "description": "Fallback to 720p when 1080p cannot be found.",
          "qualities": [
            {
              "id": 13,
              "name": "Bluray-720p"
            },
            {
              "id": 14,
              "name": "WEBDL-720p"
            },
            {
              "id": 15,
              "name": "WEBRip-720p"
            }
          ]
        },
        {
          "id": -3,
          "name": "SD Fallback",
          "description": "Standard Definition Fallbacks",
          "qualities": [
            {
              "id": 18,
              "name": "Bluray-480p"
            },
            {
              "id": 19,
              "name": "WEBDL-480p"
            },
            {
              "id": 20,
              "name": "WEBRip-480p"
            },
            {
              "id": 22,
              "name": "DVD"
            }
          ]
        }
      ],
      "upgrade_until": {
        "id": -1,
        "name": "Balanced Capable",
        "description": "Balanced Capable releases. Typically WEB-DL would be the overwhelming majority of releases, but there are occasional streaming optimised encodes that should be preferred."
      },
      "language": "must_original"
    },
    "slug": "1080p-balanced",
    "filename": "1080p Balanced.yml",
    "category": "quality-profile"
  },
  {
    "path": "/quality-profile/1080p-quality-hdr",
    "type": "quality-profile",
    "data": {
      "name": "1080p Quality (HDR)",
      "description": "1080p Quality (HDR) utilizes the [**Golden Popcorn Performance Index**](https://dictionarry.dev/wiki/GPPi) to target **transparent x265 HDR** 1080p encodes. \n- 5 Quality tiers prioritise encodes with high 1080p GPPi scores, with fallback to the regular 1080p Quality profile (non HDR), then 1080p WEB-DLs and streaming optimised encodes (**BHDStudio & hallowed**).\n- **x265 is negated** but allowed, if and only if a reputable GPPi group has encoded it from a UHD Bluray source.\n- Non HDR x265 encodes are strictly forbidden in this profile\n- If no 1080p release can be found, the profile will fall back to SD releases - **DVD remuxes  / encodes**",
      "tags": [
        "1080p",
        "Quality Focused",
        "HDR",
        "Lossy Audio",
        "x264",
        "x265"
      ],
      "upgradesAllowed": true,
      "minCustomFormatScore": 2000,
      "upgradeUntilScore": 14000,
      "minScoreIncrement": 1,
      "custom_formats": [
        {
          "name": "UHD Bluray",
          "score": 12000
        },
        {
          "name": "UHD Bluray (Missing)",
          "score": 12000
        },
        {
          "name": "1080p WEB-DL",
          "score": 11000
        },
        {
          "name": "1080p Bluray",
          "score": 8000
        },
        {
          "name": "1080p WEBRip",
          "score": 8000
        },
        {
          "name": "720p WEB-DL",
          "score": 6000
        },
        {
          "name": "720p Bluray",
          "score": 5000
        },
        {
          "name": "720p WEBRip",
          "score": 5000
        },
        {
          "name": "1080p Quality Tier 1",
          "score": 4100
        },
        {
          "name": "1080p Quality Tier 2",
          "score": 4000
        },
        {
          "name": "1080p Quality Tier 3",
          "score": 3900
        },
        {
          "name": "1080p Quality Tier 4",
          "score": 3800
        },
        {
          "name": "1080p Quality Tier 5",
          "score": 3700
        },
        {
          "name": "1080p Balanced Tier 1",
          "score": 3300
        },
        {
          "name": "1080p Balanced Tier 2",
          "score": 3200
        },
        {
          "name": "480p WEB-DL",
          "score": 3000
        },
        {
          "name": "720p Quality Tier 1",
          "score": 2100
        },
        {
          "name": "720p Quality Tier 2",
          "score": 2000
        },
        {
          "name": "DVD",
          "score": 2000
        },
        {
          "name": "DVD Remux",
          "score": 2000
        },
        {
          "name": "720p Quality Tier 3",
          "score": 1900
        },
        {
          "name": "720p Quality Tier 4",
          "score": 1800
        },
        {
          "name": "720p Quality Tier 5",
          "score": 1700
        },
        {
          "name": "1080p Golden Popcorn",
          "score": 800
        },
        {
          "name": "720p Golden Popcorn",
          "score": 600
        },
        {
          "name": "MA",
          "score": 500
        },
        {
          "name": "AMZN",
          "score": 400
        },
        {
          "name": "ATVP",
          "score": 400
        },
        {
          "name": "DSNP",
          "score": 400
        },
        {
          "name": "SD Golden Popcorn",
          "score": 400
        },
        {
          "name": "CRIT",
          "score": 300
        },
        {
          "name": "Dolby Vision",
          "score": 300
        },
        {
          "name": "HMAX",
          "score": 300
        },
        {
          "name": "iT",
          "score": 300
        },
        {
          "name": "MAX",
          "score": 300
        },
        {
          "name": "NF",
          "score": 300
        },
        {
          "name": "NOW",
          "score": 300
        },
        {
          "name": "PCOK",
          "score": 300
        },
        {
          "name": "SD Quality Tier 1",
          "score": 300
        },
        {
          "name": "HDR10+",
          "score": 200
        },
        {
          "name": "HTSR",
          "score": 200
        },
        {
          "name": "HULU",
          "score": 200
        },
        {
          "name": "PMTP",
          "score": 200
        },
        {
          "name": "ROKU",
          "score": 200
        },
        {
          "name": "SD Quality Tier 2",
          "score": 200
        },
        {
          "name": "SHO",
          "score": 200
        },
        {
          "name": "STAN",
          "score": 200
        },
        {
          "name": "Atmos",
          "score": 100
        },
        {
          "name": "Atmos (Missing)",
          "score": 100
        },
        {
          "name": "HDR",
          "score": 100
        },
        {
          "name": "HDR10",
          "score": 100
        },
        {
          "name": "HDR10 (Missing) (1080p)",
          "score": 100
        },
        {
          "name": "HLG",
          "score": 100
        },
        {
          "name": "PQ",
          "score": 100
        },
        {
          "name": "Special Edition",
          "score": 100
        },
        {
          "name": "WEB-DL Tier 1",
          "score": 80
        },
        {
          "name": "WEB-DL Tier 2",
          "score": 60
        },
        {
          "name": "WEB-DL Tier 3",
          "score": 40
        },
        {
          "name": "WEB-DL Tier 4",
          "score": 20
        },
        {
          "name": "Season Pack",
          "score": 10
        },
        {
          "name": "Repack3",
          "score": 8
        },
        {
          "name": "Repack2",
          "score": 7
        },
        {
          "name": "Repack1",
          "score": 6
        },
        {
          "name": "x265 (Bluray)",
          "score": -9000
        },
        {
          "name": "2160p",
          "score": -99999
        },
        {
          "name": "3D",
          "score": -99999
        },
        {
          "name": "AV1",
          "score": -99999
        },
        {
          "name": "B&W",
          "score": -99999
        },
        {
          "name": "Dolby Vision (Without Fallback)",
          "score": -99999
        },
        {
          "name": "Extras",
          "score": -99999
        },
        {
          "name": "Full Disc",
          "score": -99999
        },
        {
          "name": "Full Disc (Quality Match)",
          "score": -99999
        },
        {
          "name": "h265",
          "score": -99999
        },
        {
          "name": "Remux",
          "score": -99999
        },
        {
          "name": "UnWanted Release Groups",
          "score": -99999
        },
        {
          "name": "UnWanted WEBRip Groups",
          "score": -99999
        },
        {
          "name": "Upscaled",
          "score": -99999
        },
        {
          "name": "VP9",
          "score": -99999
        },
        {
          "name": "VVC",
          "score": -99999
        },
        {
          "name": "x265 (WEB)",
          "score": -99999
        }
      ],
      "qualities": [
        {
          "id": -1,
          "name": "Transparent Capable",
          "description": "All capable of being indistinguishable from source. WEB-DL included to not allow unknown encode to trump known WEB-DL.",
          "qualities": [
            {
              "id": 10,
              "name": "Bluray-1080p"
            },
            {
              "id": 9,
              "name": "WEBDL-1080p"
            },
            {
              "id": 11,
              "name": "WEBRip-1080p"
            }
          ]
        },
        {
          "id": -2,
          "name": "720p Fallback",
          "description": "Fallback to 720p when 1080p cannot be found.",
          "qualities": [
            {
              "id": 13,
              "name": "Bluray-720p"
            },
            {
              "id": 14,
              "name": "WEBDL-720p"
            },
            {
              "id": 15,
              "name": "WEBRip-720p"
            }
          ]
        },
        {
          "id": -3,
          "name": "SD Fallback",
          "description": "Standard Definition Fallbacks",
          "qualities": [
            {
              "id": 18,
              "name": "Bluray-480p"
            },
            {
              "id": 19,
              "name": "WEBDL-480p"
            },
            {
              "id": 20,
              "name": "WEBRip-480p"
            },
            {
              "id": 22,
              "name": "DVD"
            }
          ]
        }
      ],
      "upgrade_until": {
        "id": -1,
        "name": "Transparent Capable",
        "description": "All capable of being indistinguishable from source. WEB-DL included to not allow unknown encode to trump known WEB-DL."
      },
      "language": "must_original"
    },
    "slug": "1080p-quality-hdr",
    "filename": "1080p Quality (HDR).yml",
    "category": "quality-profile"
  },
  {
    "path": "/quality-profile/1080p-quality",
    "type": "quality-profile",
    "data": {
      "name": "1080p Quality",
      "description": "1080p Quality utilizes the [**Golden Popcorn Performance Index**](https://dictionarry.dev/wiki/GPPi) to target **transparent** x264 1080p encodes. \n- 5 Quality tiers prioritise encodes with high 1080p GPPi scores, with fallback to 1080p WEB-DLs and streaming optimised encodes (**BHDStudio & hallowed**).\n- If no 1080p release can be found, the profile will fall back to SD releases - **DVD remuxes  / encodes**",
      "tags": [
        "1080p",
        "Quality Focused",
        "Lossy Audio",
        "x264",
        "h264"
      ],
      "upgradesAllowed": true,
      "minCustomFormatScore": 2000,
      "upgradeUntilScore": 14000,
      "minScoreIncrement": 1,
      "custom_formats": [
        {
          "name": "1080p WEB-DL",
          "score": 11000
        },
        {
          "name": "1080p Bluray",
          "score": 8000
        },
        {
          "name": "1080p WEBRip",
          "score": 8000
        },
        {
          "name": "720p WEB-DL",
          "score": 6000
        },
        {
          "name": "720p Bluray",
          "score": 5000
        },
        {
          "name": "720p WEBRip",
          "score": 5000
        },
        {
          "name": "1080p Quality Tier 1",
          "score": 4100
        },
        {
          "name": "1080p Quality Tier 2",
          "score": 4000
        },
        {
          "name": "1080p Quality Tier 3",
          "score": 3900
        },
        {
          "name": "1080p Quality Tier 4",
          "score": 3800
        },
        {
          "name": "1080p Quality Tier 5",
          "score": 3700
        },
        {
          "name": "1080p Balanced Tier 1",
          "score": 3300
        },
        {
          "name": "1080p Balanced Tier 2",
          "score": 3200
        },
        {
          "name": "480p WEB-DL",
          "score": 3000
        },
        {
          "name": "720p Quality Tier 1",
          "score": 2100
        },
        {
          "name": "720p Quality Tier 2",
          "score": 2000
        },
        {
          "name": "DVD",
          "score": 2000
        },
        {
          "name": "DVD Remux",
          "score": 2000
        },
        {
          "name": "720p Quality Tier 3",
          "score": 1900
        },
        {
          "name": "720p Quality Tier 4",
          "score": 1800
        },
        {
          "name": "720p Quality Tier 5",
          "score": 1700
        },
        {
          "name": "1080p Golden Popcorn",
          "score": 800
        },
        {
          "name": "720p Golden Popcorn",
          "score": 600
        },
        {
          "name": "MA",
          "score": 500
        },
        {
          "name": "AMZN",
          "score": 400
        },
        {
          "name": "ATVP",
          "score": 400
        },
        {
          "name": "DSNP",
          "score": 400
        },
        {
          "name": "SD Golden Popcorn",
          "score": 400
        },
        {
          "name": "CRIT",
          "score": 300
        },
        {
          "name": "HMAX",
          "score": 300
        },
        {
          "name": "iT",
          "score": 300
        },
        {
          "name": "MAX",
          "score": 300
        },
        {
          "name": "NF",
          "score": 300
        },
        {
          "name": "NOW",
          "score": 300
        },
        {
          "name": "PCOK",
          "score": 300
        },
        {
          "name": "SD Quality Tier 1",
          "score": 300
        },
        {
          "name": "HTSR",
          "score": 200
        },
        {
          "name": "HULU",
          "score": 200
        },
        {
          "name": "PMTP",
          "score": 200
        },
        {
          "name": "ROKU",
          "score": 200
        },
        {
          "name": "SD Quality Tier 2",
          "score": 200
        },
        {
          "name": "SHO",
          "score": 200
        },
        {
          "name": "STAN",
          "score": 200
        },
        {
          "name": "Atmos",
          "score": 100
        },
        {
          "name": "Atmos (Missing)",
          "score": 100
        },
        {
          "name": "Special Edition",
          "score": 100
        },
        {
          "name": "WEB-DL Tier 1",
          "score": 80
        },
        {
          "name": "WEB-DL Tier 2",
          "score": 60
        },
        {
          "name": "WEB-DL Tier 3",
          "score": 40
        },
        {
          "name": "WEB-DL Tier 4",
          "score": 20
        },
        {
          "name": "Season Pack",
          "score": 10
        },
        {
          "name": "Repack3",
          "score": 8
        },
        {
          "name": "Repack2",
          "score": 7
        },
        {
          "name": "Repack1",
          "score": 6
        },
        {
          "name": "3D",
          "score": -99999
        },
        {
          "name": "AV1",
          "score": -99999
        },
        {
          "name": "B&W",
          "score": -99999
        },
        {
          "name": "Dolby Vision",
          "score": -99999
        },
        {
          "name": "Extras",
          "score": -99999
        },
        {
          "name": "Full Disc",
          "score": -99999
        },
        {
          "name": "Full Disc (Quality Match)",
          "score": -99999
        },
        {
          "name": "h265",
          "score": -99999
        },
        {
          "name": "HDR",
          "score": -99999
        },
        {
          "name": "HDR10",
          "score": -99999
        },
        {
          "name": "HDR10+",
          "score": -99999
        },
        {
          "name": "HLG",
          "score": -99999
        },
        {
          "name": "PQ",
          "score": -99999
        },
        {
          "name": "Remux",
          "score": -99999
        },
        {
          "name": "UnWanted Release Groups",
          "score": -99999
        },
        {
          "name": "UnWanted WEBRip Groups",
          "score": -99999
        },
        {
          "name": "Upscaled",
          "score": -99999
        },
        {
          "name": "VP9",
          "score": -99999
        },
        {
          "name": "VVC",
          "score": -99999
        },
        {
          "name": "x265",
          "score": -99999
        }
      ],
      "qualities": [
        {
          "id": -1,
          "name": "Transparent Capable",
          "description": "All capable of being indistinguishable from source. WEB-DL included to not allow unknown encode to trump known WEB-DL.",
          "qualities": [
            {
              "id": 10,
              "name": "Bluray-1080p"
            },
            {
              "id": 9,
              "name": "WEBDL-1080p"
            },
            {
              "id": 11,
              "name": "WEBRip-1080p"
            }
          ]
        },
        {
          "id": -2,
          "name": "720p Fallback",
          "description": "Fallback to 720p when 1080p cannot be found.",
          "qualities": [
            {
              "id": 13,
              "name": "Bluray-720p"
            },
            {
              "id": 14,
              "name": "WEBDL-720p"
            },
            {
              "id": 15,
              "name": "WEBRip-720p"
            }
          ]
        },
        {
          "id": -3,
          "name": "SD Fallback",
          "description": "Standard Definition Fallbacks",
          "qualities": [
            {
              "id": 18,
              "name": "Bluray-480p"
            },
            {
              "id": 19,
              "name": "WEBDL-480p"
            },
            {
              "id": 20,
              "name": "WEBRip-480p"
            },
            {
              "id": 22,
              "name": "DVD"
            }
          ]
        }
      ],
      "upgrade_until": {
        "id": -1,
        "name": "Transparent Capable",
        "description": "All capable of being indistinguishable from source. WEB-DL included to not allow unknown encode to trump known WEB-DL."
      },
      "language": "must_original"
    },
    "slug": "1080p-quality",
    "filename": "1080p Quality.yml",
    "category": "quality-profile"
  },
  {
    "path": "/quality-profile/1080p-remux",
    "type": "quality-profile",
    "data": {
      "name": "1080p Remux",
      "description": "1080p Remux utilizes **audio tags** to prioritise high quality lossless copies of HD Blu-rays.\n\n- Unlike the encode profiles, which target releases based on a release group metric, 1080p Remux avoids this to stop *circular downloads* where no discernable upgrade is found. \n- Instead, audio metrics such TrueHD, Atmos, DTS-X, etc are used to indicate when a remux should be upgraded.\n- This also helps to grab non group tagged remuxes, which are fairly common on quite a few trackers who often have the best remux available. \n- If no 1080p Remux cannot be found, the profile falls back to **1080p WEB-DLs**.\n- If no 1080p release can be found, the profile will fall back to SD releases - DVD remuxes  / encodes. ",
      "tags": [
        "1080p",
        "Remux",
        "Lossless Audio",
        "h264"
      ],
      "upgradesAllowed": true,
      "minCustomFormatScore": 2000,
      "upgradeUntilScore": 12000,
      "minScoreIncrement": 1,
      "custom_formats": [
        {
          "name": "1080p Remux",
          "score": 10000
        },
        {
          "name": "1080p WEB-DL",
          "score": 8000
        },
        {
          "name": "720p WEB-DL",
          "score": 6000
        },
        {
          "name": "480p WEB-DL",
          "score": 3000
        },
        {
          "name": "DVD",
          "score": 2000
        },
        {
          "name": "DVD Remux",
          "score": 2000
        },
        {
          "name": "DTS-X",
          "score": 600
        },
        {
          "name": "DTS-HD MA",
          "score": 500
        },
        {
          "name": "MA",
          "score": 500
        },
        {
          "name": "TrueHD",
          "score": 500
        },
        {
          "name": "TrueHD (Missing)",
          "score": 500
        },
        {
          "name": "AMZN",
          "score": 400
        },
        {
          "name": "ATVP",
          "score": 400
        },
        {
          "name": "DSNP",
          "score": 400
        },
        {
          "name": "CRIT",
          "score": 300
        },
        {
          "name": "FLAC",
          "score": 300
        },
        {
          "name": "HMAX",
          "score": 300
        },
        {
          "name": "iT",
          "score": 300
        },
        {
          "name": "MAX",
          "score": 300
        },
        {
          "name": "NF",
          "score": 300
        },
        {
          "name": "NOW",
          "score": 300
        },
        {
          "name": "PCOK",
          "score": 300
        },
        {
          "name": "HTSR",
          "score": 200
        },
        {
          "name": "HULU",
          "score": 200
        },
        {
          "name": "PMTP",
          "score": 200
        },
        {
          "name": "ROKU",
          "score": 200
        },
        {
          "name": "SHO",
          "score": 200
        },
        {
          "name": "STAN",
          "score": 200
        },
        {
          "name": "Atmos",
          "score": 100
        },
        {
          "name": "Atmos (Missing)",
          "score": 100
        },
        {
          "name": "Special Edition",
          "score": 100
        },
        {
          "name": "Remux Tier 1",
          "score": 80
        },
        {
          "name": "WEB-DL Tier 1",
          "score": 80
        },
        {
          "name": "Remux Tier 2",
          "score": 60
        },
        {
          "name": "WEB-DL Tier 2",
          "score": 60
        },
        {
          "name": "Unknown Lossless Audio",
          "score": 50
        },
        {
          "name": "Remux Tier 3",
          "score": 40
        },
        {
          "name": "WEB-DL Tier 3",
          "score": 40
        },
        {
          "name": "Remux Tier 4",
          "score": 20
        },
        {
          "name": "WEB-DL Tier 4",
          "score": 20
        },
        {
          "name": "Season Pack",
          "score": 10
        },
        {
          "name": "Repack3",
          "score": 8
        },
        {
          "name": "Repack2",
          "score": 7
        },
        {
          "name": "Repack1",
          "score": 6
        },
        {
          "name": "3D",
          "score": -99999
        },
        {
          "name": "AV1",
          "score": -99999
        },
        {
          "name": "B&W",
          "score": -99999
        },
        {
          "name": "Dolby Vision",
          "score": -99999
        },
        {
          "name": "Dolby Vision (Without Fallback)",
          "score": -99999
        },
        {
          "name": "Extras",
          "score": -99999
        },
        {
          "name": "Full Disc",
          "score": -99999
        },
        {
          "name": "Full Disc (Quality Match)",
          "score": -99999
        },
        {
          "name": "h265",
          "score": -99999
        },
        {
          "name": "HDR",
          "score": -99999
        },
        {
          "name": "HDR10",
          "score": -99999
        },
        {
          "name": "HDR10+",
          "score": -99999
        },
        {
          "name": "HLG",
          "score": -99999
        },
        {
          "name": "PQ",
          "score": -99999
        },
        {
          "name": "UHDBits",
          "score": -99999
        },
        {
          "name": "UnWanted Release Groups",
          "score": -99999
        },
        {
          "name": "UnWanted Remux Groups",
          "score": -99999
        },
        {
          "name": "Upscaled",
          "score": -99999
        },
        {
          "name": "VP9",
          "score": -99999
        },
        {
          "name": "VVC",
          "score": -99999
        },
        {
          "name": "x265",
          "score": -99999
        }
      ],
      "qualities": [
        {
          "id": 8,
          "name": "Remux-1080p"
        },
        {
          "id": 9,
          "name": "WEBDL-1080p"
        },
        {
          "id": 14,
          "name": "WEBDL-720p"
        },
        {
          "id": -1,
          "name": "SD Fallback",
          "description": "Standard Definition Fallbacks",
          "qualities": [
            {
              "id": 22,
              "name": "DVD"
            },
            {
              "id": 19,
              "name": "WEBDL-480p"
            }
          ]
        }
      ],
      "upgrade_until": {
        "id": 8,
        "name": "Remux-1080p",
        "description": "1080p Blu-ray disc content remuxed into a playable file format"
      },
      "language": "must_original"
    },
    "slug": "1080p-remux",
    "filename": "1080p Remux.yml",
    "category": "quality-profile"
  },
  {
    "path": "/quality-profile/2160p-balanced",
    "type": "quality-profile",
    "data": {
      "name": "2160p Balanced",
      "description": "2160p Balanced targets consistent & immutable 2160p **HDR WEB-DLs w/ Lossy Audio**. \n- Special considerations are given to **Balanced** groups who prioritize **streaming optimisation** over quality, falling somewhere around a tier 2 WEB-DL. This includes groups like **BHDStudio**, **HONE** and **hallowed**.\n- If no 2160p WEB-DL can be found, the profile will fall back to the 1080p Quality Profile.\n- Transparent 2160p Encodes (à la  2160p Quality) are not allowed as fallback since they are comparatively much larger than 2160p WEB-DLs",
      "tags": [
        "2160p",
        "Balanced Focused",
        "HDR",
        "Lossy Audio",
        "x264",
        "h265"
      ],
      "upgradesAllowed": true,
      "minCustomFormatScore": 2000,
      "upgradeUntilScore": 16000,
      "minScoreIncrement": 1,
      "custom_formats": [
        {
          "name": "2160p Balanced Tier 1",
          "score": 13400
        },
        {
          "name": "2160p Balanced Tier 2",
          "score": 13200
        },
        {
          "name": "2160p WEB-DL",
          "score": 13000
        },
        {
          "name": "1080p WEB-DL",
          "score": 11000
        },
        {
          "name": "1080p Bluray",
          "score": 8000
        },
        {
          "name": "1080p WEBRip",
          "score": 8000
        },
        {
          "name": "720p WEB-DL",
          "score": 6000
        },
        {
          "name": "720p Bluray",
          "score": 5000
        },
        {
          "name": "720p WEBRip",
          "score": 5000
        },
        {
          "name": "1080p Quality Tier 1",
          "score": 4100
        },
        {
          "name": "1080p Quality Tier 2",
          "score": 4000
        },
        {
          "name": "1080p Quality Tier 3",
          "score": 3900
        },
        {
          "name": "1080p Quality Tier 4",
          "score": 3800
        },
        {
          "name": "1080p Quality Tier 5",
          "score": 3700
        },
        {
          "name": "1080p Balanced Tier 1",
          "score": 3300
        },
        {
          "name": "1080p Balanced Tier 2",
          "score": 3200
        },
        {
          "name": "480p WEB-DL",
          "score": 3000
        },
        {
          "name": "720p Quality Tier 1",
          "score": 2100
        },
        {
          "name": "720p Quality Tier 2",
          "score": 2000
        },
        {
          "name": "DVD",
          "score": 2000
        },
        {
          "name": "DVD Remux",
          "score": 2000
        },
        {
          "name": "720p Quality Tier 3",
          "score": 1900
        },
        {
          "name": "720p Quality Tier 4",
          "score": 1800
        },
        {
          "name": "720p Quality Tier 5",
          "score": 1700
        },
        {
          "name": "MA",
          "score": 500
        },
        {
          "name": "AMZN",
          "score": 400
        },
        {
          "name": "ATVP",
          "score": 400
        },
        {
          "name": "DSNP",
          "score": 400
        },
        {
          "name": "iT",
          "score": 400
        },
        {
          "name": "CRIT",
          "score": 300
        },
        {
          "name": "Dolby Vision",
          "score": 300
        },
        {
          "name": "HMAX",
          "score": 300
        },
        {
          "name": "MAX",
          "score": 300
        },
        {
          "name": "NF",
          "score": 300
        },
        {
          "name": "NOW",
          "score": 300
        },
        {
          "name": "PCOK",
          "score": 300
        },
        {
          "name": "SD Quality Tier 1",
          "score": 300
        },
        {
          "name": "HDR10+",
          "score": 200
        },
        {
          "name": "HTSR",
          "score": 200
        },
        {
          "name": "HULU",
          "score": 200
        },
        {
          "name": "PMTP",
          "score": 200
        },
        {
          "name": "ROKU",
          "score": 200
        },
        {
          "name": "SD Quality Tier 2",
          "score": 200
        },
        {
          "name": "SHO",
          "score": 200
        },
        {
          "name": "STAN",
          "score": 200
        },
        {
          "name": "DTS-X",
          "score": 150
        },
        {
          "name": "HDR",
          "score": 100
        },
        {
          "name": "HDR10",
          "score": 100
        },
        {
          "name": "HDR10 (Missing)",
          "score": 100
        },
        {
          "name": "HLG",
          "score": 100
        },
        {
          "name": "PQ",
          "score": 100
        },
        {
          "name": "Special Edition",
          "score": 100
        },
        {
          "name": "TrueHD",
          "score": 100
        },
        {
          "name": "TrueHD (Missing)",
          "score": 100
        },
        {
          "name": "WEB-DL Tier 1",
          "score": 80
        },
        {
          "name": "WEB-DL Tier 2",
          "score": 60
        },
        {
          "name": "Atmos",
          "score": 50
        },
        {
          "name": "Atmos (Missing)",
          "score": 50
        },
        {
          "name": "DTS-HD MA",
          "score": 50
        },
        {
          "name": "FLAC",
          "score": 50
        },
        {
          "name": "Unknown Lossless Audio",
          "score": 50
        },
        {
          "name": "WEB-DL Tier 3",
          "score": 40
        },
        {
          "name": "WEB-DL Tier 4",
          "score": 20
        },
        {
          "name": "Season Pack",
          "score": 10
        },
        {
          "name": "Repack3",
          "score": 8
        },
        {
          "name": "Repack2",
          "score": 7
        },
        {
          "name": "Repack1",
          "score": 6
        },
        {
          "name": "3D",
          "score": -99999
        },
        {
          "name": "AV1",
          "score": -99999
        },
        {
          "name": "B&W",
          "score": -99999
        },
        {
          "name": "Dolby Vision (Without Fallback)",
          "score": -99999
        },
        {
          "name": "Extras",
          "score": -99999
        },
        {
          "name": "Full Disc",
          "score": -99999
        },
        {
          "name": "Full Disc (Quality Match)",
          "score": -99999
        },
        {
          "name": "h265",
          "score": -99999
        },
        {
          "name": "Lossless Audio (1080p)",
          "score": -99999
        },
        {
          "name": "Remux",
          "score": -99999
        },
        {
          "name": "UHDBits",
          "score": -99999
        },
        {
          "name": "UnWanted Release Groups",
          "score": -99999
        },
        {
          "name": "UnWanted WEBRip Groups",
          "score": -99999
        },
        {
          "name": "Upscaled",
          "score": -99999
        },
        {
          "name": "VP9",
          "score": -99999
        },
        {
          "name": "VVC",
          "score": -99999
        },
        {
          "name": "x264 (2160p)",
          "score": -99999
        },
        {
          "name": "x265",
          "score": -99999
        },
        {
          "name": "x265 (WEB-DL)",
          "score": -99999
        }
      ],
      "qualities": [
        {
          "id": -1,
          "name": "2160p Balanced",
          "description": "Balanced capable releases. Typically WEB-DL would be the overwhelming majority of releases, but there are occasional streaming optimised encodes that should be preferred.",
          "qualities": [
            {
              "id": 4,
              "name": "Bluray-2160p"
            },
            {
              "id": 5,
              "name": "WEBDL-2160p"
            }
          ]
        },
        {
          "id": -2,
          "name": "1080p Transparent",
          "description": "Indistinguishable from source",
          "qualities": [
            {
              "id": 10,
              "name": "Bluray-1080p"
            },
            {
              "id": 9,
              "name": "WEBDL-1080p"
            },
            {
              "id": 11,
              "name": "WEBRip-1080p"
            }
          ]
        },
        {
          "id": -3,
          "name": "720p Fallback",
          "description": "Fallback to 720p when 1080p cannot be found.",
          "qualities": [
            {
              "id": 13,
              "name": "Bluray-720p"
            },
            {
              "id": 14,
              "name": "WEBDL-720p"
            },
            {
              "id": 15,
              "name": "WEBRip-720p"
            }
          ]
        },
        {
          "id": -4,
          "name": "SD Fallback",
          "description": "Standard Definition Fallbacks",
          "qualities": [
            {
              "id": 18,
              "name": "Bluray-480p"
            },
            {
              "id": 19,
              "name": "WEBDL-480p"
            },
            {
              "id": 20,
              "name": "WEBRip-480p"
            },
            {
              "id": 22,
              "name": "DVD"
            }
          ]
        }
      ],
      "upgrade_until": {
        "id": -1,
        "name": "2160p Balanced",
        "description": "Balanced capable releases. Typically WEB-DL would be the overwhelming majority of releases, but there are occasional streaming optimised encodes that should be preferred."
      },
      "language": "must_original"
    },
    "slug": "2160p-balanced",
    "filename": "2160p Balanced.yml",
    "category": "quality-profile"
  },
  {
    "path": "/quality-profile/2160p-quality",
    "type": "quality-profile",
    "data": {
      "name": "2160p Quality",
      "description": "2160p Quality utilizes the [**Encode Efficiency Index**](https://dictionarry.dev/wiki/EEi) metric at a 55% target ratio to prioritize **transparent** x265 4k encodes. \n\n- 4 quality tiers prioritize encodes from reputable groups, with fallback to high-quality WEB-DLs and balanced tier groups. 2 additional quality tiers are placed below for further fallback. \n- Special considerations for both **HDR** and **Lossless Audio** formats help to push lower tiered encodes over higher tier ones in cases where better sources are used.\n- If no 2160p release can be found, the profile will fall back to the 1080p Quality Profile. ",
      "tags": [
        "2160p",
        "Quality Focused",
        "HDR",
        "Lossless Audio",
        "x265",
        "h265"
      ],
      "upgradesAllowed": true,
      "minCustomFormatScore": 2000,
      "upgradeUntilScore": 22000,
      "minScoreIncrement": 1,
      "custom_formats": [
        {
          "name": "2160p Quality Tier 1",
          "score": 20200
        },
        {
          "name": "2160p Quality Tier 2",
          "score": 20100
        },
        {
          "name": "2160p Quality Tier 3",
          "score": 20000
        },
        {
          "name": "2160p Quality Tier 4",
          "score": 19900
        },
        {
          "name": "2160p Quality Tier 5",
          "score": 19800
        },
        {
          "name": "2160p Balanced Tier 1",
          "score": 14400
        },
        {
          "name": "2160p Balanced Tier 2",
          "score": 14200
        },
        {
          "name": "2160p WEB-DL",
          "score": 14000
        },
        {
          "name": "2160p Quality Tier 6",
          "score": 13100
        },
        {
          "name": "2160p Quality Tier 7",
          "score": 13000
        },
        {
          "name": "1080p WEB-DL",
          "score": 11000
        },
        {
          "name": "1080p Bluray",
          "score": 8000
        },
        {
          "name": "1080p WEBRip",
          "score": 8000
        },
        {
          "name": "720p WEB-DL",
          "score": 6000
        },
        {
          "name": "720p Bluray",
          "score": 5000
        },
        {
          "name": "720p WEBRip",
          "score": 5000
        },
        {
          "name": "1080p Quality Tier 1",
          "score": 4100
        },
        {
          "name": "1080p Quality Tier 2",
          "score": 4000
        },
        {
          "name": "1080p Quality Tier 3",
          "score": 3900
        },
        {
          "name": "1080p Quality Tier 4",
          "score": 3800
        },
        {
          "name": "1080p Quality Tier 5",
          "score": 3700
        },
        {
          "name": "1080p Balanced Tier 1",
          "score": 3300
        },
        {
          "name": "1080p Balanced Tier 2",
          "score": 3200
        },
        {
          "name": "480p WEB-DL",
          "score": 3000
        },
        {
          "name": "720p Quality Tier 1",
          "score": 2100
        },
        {
          "name": "720p Quality Tier 2",
          "score": 2000
        },
        {
          "name": "DVD",
          "score": 2000
        },
        {
          "name": "DVD Remux",
          "score": 2000
        },
        {
          "name": "720p Quality Tier 3",
          "score": 1900
        },
        {
          "name": "720p Quality Tier 4",
          "score": 1800
        },
        {
          "name": "720p Quality Tier 5",
          "score": 1700
        },
        {
          "name": "MA",
          "score": 500
        },
        {
          "name": "AMZN",
          "score": 400
        },
        {
          "name": "ATVP",
          "score": 400
        },
        {
          "name": "DSNP",
          "score": 400
        },
        {
          "name": "iT",
          "score": 400
        },
        {
          "name": "CRIT",
          "score": 300
        },
        {
          "name": "Dolby Vision",
          "score": 300
        },
        {
          "name": "HMAX",
          "score": 300
        },
        {
          "name": "MAX",
          "score": 300
        },
        {
          "name": "NF",
          "score": 300
        },
        {
          "name": "NOW",
          "score": 300
        },
        {
          "name": "PCOK",
          "score": 300
        },
        {
          "name": "SD Quality Tier 1",
          "score": 300
        },
        {
          "name": "HDR10+",
          "score": 200
        },
        {
          "name": "HTSR",
          "score": 200
        },
        {
          "name": "HULU",
          "score": 200
        },
        {
          "name": "PMTP",
          "score": 200
        },
        {
          "name": "ROKU",
          "score": 200
        },
        {
          "name": "SD Quality Tier 2",
          "score": 200
        },
        {
          "name": "SHO",
          "score": 200
        },
        {
          "name": "STAN",
          "score": 200
        },
        {
          "name": "DTS-X",
          "score": 150
        },
        {
          "name": "HDR",
          "score": 100
        },
        {
          "name": "HDR10",
          "score": 100
        },
        {
          "name": "HDR10 (Missing)",
          "score": 100
        },
        {
          "name": "HLG",
          "score": 100
        },
        {
          "name": "PQ",
          "score": 100
        },
        {
          "name": "Special Edition",
          "score": 100
        },
        {
          "name": "TrueHD",
          "score": 100
        },
        {
          "name": "TrueHD (Missing)",
          "score": 100
        },
        {
          "name": "WEB-DL Tier 1",
          "score": 80
        },
        {
          "name": "WEB-DL Tier 2",
          "score": 60
        },
        {
          "name": "Atmos",
          "score": 50
        },
        {
          "name": "Atmos (Missing)",
          "score": 50
        },
        {
          "name": "DTS-HD MA",
          "score": 50
        },
        {
          "name": "FLAC",
          "score": 50
        },
        {
          "name": "Unknown Lossless Audio",
          "score": 50
        },
        {
          "name": "WEB-DL Tier 3",
          "score": 40
        },
        {
          "name": "WEB-DL Tier 4",
          "score": 20
        },
        {
          "name": "Season Pack",
          "score": 10
        },
        {
          "name": "Repack3",
          "score": 8
        },
        {
          "name": "Repack2",
          "score": 7
        },
        {
          "name": "Repack1",
          "score": 6
        },
        {
          "name": "3D",
          "score": -99999
        },
        {
          "name": "AV1",
          "score": -99999
        },
        {
          "name": "B&W",
          "score": -99999
        },
        {
          "name": "Dolby Vision (Without Fallback)",
          "score": -99999
        },
        {
          "name": "Extras",
          "score": -99999
        },
        {
          "name": "Full Disc",
          "score": -99999
        },
        {
          "name": "Full Disc (Quality Match)",
          "score": -99999
        },
        {
          "name": "h265",
          "score": -99999
        },
        {
          "name": "Lossless Audio (1080p)",
          "score": -99999
        },
        {
          "name": "Remux",
          "score": -99999
        },
        {
          "name": "UHDBits",
          "score": -99999
        },
        {
          "name": "UnWanted Release Groups",
          "score": -99999
        },
        {
          "name": "UnWanted WEBRip Groups",
          "score": -99999
        },
        {
          "name": "Upscaled",
          "score": -99999
        },
        {
          "name": "VP9",
          "score": -99999
        },
        {
          "name": "VVC",
          "score": -99999
        },
        {
          "name": "x264 (2160p)",
          "score": -99999
        },
        {
          "name": "x265",
          "score": -99999
        },
        {
          "name": "x265 (Missing)",
          "score": -99999
        },
        {
          "name": "x265 (WEB-DL)",
          "score": -99999
        }
      ],
      "qualities": [
        {
          "id": -1,
          "name": "2160p Transparent",
          "description": "Indistinguishable from source",
          "qualities": [
            {
              "id": 4,
              "name": "Bluray-2160p"
            },
            {
              "id": 5,
              "name": "WEBDL-2160p"
            }
          ]
        },
        {
          "id": -2,
          "name": "1080p Transparent",
          "description": "Indistinguishable from source",
          "qualities": [
            {
              "id": 10,
              "name": "Bluray-1080p"
            },
            {
              "id": 9,
              "name": "WEBDL-1080p"
            },
            {
              "id": 11,
              "name": "WEBRip-1080p"
            }
          ]
        },
        {
          "id": -3,
          "name": "720p Fallback",
          "description": "Fallback to 720p when 1080p cannot be found.",
          "qualities": [
            {
              "id": 13,
              "name": "Bluray-720p"
            },
            {
              "id": 14,
              "name": "WEBDL-720p"
            },
            {
              "id": 15,
              "name": "WEBRip-720p"
            }
          ]
        },
        {
          "id": -4,
          "name": "SD Fallback",
          "description": "Standard Definition Fallbacks",
          "qualities": [
            {
              "id": 18,
              "name": "Bluray-480p"
            },
            {
              "id": 19,
              "name": "WEBDL-480p"
            },
            {
              "id": 20,
              "name": "WEBRip-480p"
            },
            {
              "id": 22,
              "name": "DVD"
            }
          ]
        }
      ],
      "upgrade_until": {
        "id": -1,
        "name": "2160p Transparent",
        "description": "Indistinguishable from source"
      },
      "language": "must_original"
    },
    "slug": "2160p-quality",
    "filename": "2160p Quality.yml",
    "category": "quality-profile"
  },
  {
    "path": "/quality-profile/2160p-remux",
    "type": "quality-profile",
    "data": {
      "name": "2160p Remux",
      "description": "2160p Remux utilizes **audio / video tags** to prioritise high quality lossless copies of UHD Blu-rays.\n\n- Unlike the encode profiles, which target releases based on a release group metric, 2160p Remux avoids this to stop *circular downloads* where no discernable upgrade is found. \n- Instead, audio / video metrics such Dolby Vision, TrueHD, Atmos, HDR10+, etc are used to indicate when a remux should be upgraded.\n- For instance, if a hybrid remux that includes some WEB DoVi layer is released, it will be upgraded over the standard non hybrid release, regardless of release group.\n- This also helps to grab non group tagged remuxes, which are fairly common on quite a few trackers who often have the best remux available. \n- If no 2160p Remux cannot be found, the profile falls back to **2160p WEB-DLs**.\n- If a 2160p WEB-DL cannot be found, the profile falls back to the **1080p Remux** profile. ",
      "tags": [
        "2160p",
        "Remux",
        "HDR",
        "Lossless Audio",
        "h265"
      ],
      "upgradesAllowed": true,
      "minCustomFormatScore": 2000,
      "upgradeUntilScore": 16000,
      "minScoreIncrement": 1,
      "custom_formats": [
        {
          "name": "2160p Remux",
          "score": 14000
        },
        {
          "name": "2160p WEB-DL",
          "score": 12000
        },
        {
          "name": "1080p Remux",
          "score": 10000
        },
        {
          "name": "1080p WEB-DL",
          "score": 8000
        },
        {
          "name": "720p WEB-DL",
          "score": 6000
        },
        {
          "name": "480p WEB-DL",
          "score": 3000
        },
        {
          "name": "DVD",
          "score": 2000
        },
        {
          "name": "DVD Remux",
          "score": 2000
        },
        {
          "name": "DTS-X",
          "score": 600
        },
        {
          "name": "DTS-HD MA",
          "score": 500
        },
        {
          "name": "MA",
          "score": 500
        },
        {
          "name": "TrueHD",
          "score": 500
        },
        {
          "name": "TrueHD (Missing)",
          "score": 500
        },
        {
          "name": "AMZN",
          "score": 400
        },
        {
          "name": "ATVP",
          "score": 400
        },
        {
          "name": "DSNP",
          "score": 400
        },
        {
          "name": "iT",
          "score": 400
        },
        {
          "name": "CRIT",
          "score": 300
        },
        {
          "name": "Dolby Vision",
          "score": 300
        },
        {
          "name": "FLAC",
          "score": 300
        },
        {
          "name": "HMAX",
          "score": 300
        },
        {
          "name": "MAX",
          "score": 300
        },
        {
          "name": "NF",
          "score": 300
        },
        {
          "name": "NOW",
          "score": 300
        },
        {
          "name": "PCOK",
          "score": 300
        },
        {
          "name": "HDR10+",
          "score": 200
        },
        {
          "name": "HTSR",
          "score": 200
        },
        {
          "name": "HULU",
          "score": 200
        },
        {
          "name": "PMTP",
          "score": 200
        },
        {
          "name": "ROKU",
          "score": 200
        },
        {
          "name": "SHO",
          "score": 200
        },
        {
          "name": "STAN",
          "score": 200
        },
        {
          "name": "Atmos",
          "score": 100
        },
        {
          "name": "Atmos (Missing)",
          "score": 100
        },
        {
          "name": "HDR",
          "score": 100
        },
        {
          "name": "HDR10",
          "score": 100
        },
        {
          "name": "HDR10 (Missing)",
          "score": 100
        },
        {
          "name": "HLG",
          "score": 100
        },
        {
          "name": "PQ",
          "score": 100
        },
        {
          "name": "Special Edition",
          "score": 100
        },
        {
          "name": "Remux Tier 1",
          "score": 80
        },
        {
          "name": "WEB-DL Tier 1",
          "score": 80
        },
        {
          "name": "Remux Tier 2",
          "score": 60
        },
        {
          "name": "WEB-DL Tier 2",
          "score": 60
        },
        {
          "name": "Unknown Lossless Audio",
          "score": 50
        },
        {
          "name": "Remux Tier 3",
          "score": 40
        },
        {
          "name": "WEB-DL Tier 3",
          "score": 40
        },
        {
          "name": "Remux Tier 4",
          "score": 20
        },
        {
          "name": "WEB-DL Tier 4",
          "score": 20
        },
        {
          "name": "Season Pack",
          "score": 10
        },
        {
          "name": "Repack3",
          "score": 8
        },
        {
          "name": "Repack2",
          "score": 7
        },
        {
          "name": "Repack1",
          "score": 6
        },
        {
          "name": "3D",
          "score": -99999
        },
        {
          "name": "AV1",
          "score": -99999
        },
        {
          "name": "B&W",
          "score": -99999
        },
        {
          "name": "Dolby Vision (Without Fallback)",
          "score": -99999
        },
        {
          "name": "Extras",
          "score": -99999
        },
        {
          "name": "Full Disc",
          "score": -99999
        },
        {
          "name": "Full Disc (Quality Match)",
          "score": -99999
        },
        {
          "name": "h265",
          "score": -99999
        },
        {
          "name": "UHDBits",
          "score": -99999
        },
        {
          "name": "UnWanted Release Groups",
          "score": -99999
        },
        {
          "name": "UnWanted Remux Groups",
          "score": -99999
        },
        {
          "name": "Upscaled",
          "score": -99999
        },
        {
          "name": "VP9",
          "score": -99999
        },
        {
          "name": "VVC",
          "score": -99999
        },
        {
          "name": "x264 (2160p)",
          "score": -99999
        },
        {
          "name": "x265",
          "score": -99999
        },
        {
          "name": "x265 (WEB-DL)",
          "score": -99999
        }
      ],
      "qualities": [
        {
          "id": 3,
          "name": "Remux-2160p"
        },
        {
          "id": 5,
          "name": "WEBDL-2160p"
        },
        {
          "id": 8,
          "name": "Remux-1080p"
        },
        {
          "id": 9,
          "name": "WEBDL-1080p"
        },
        {
          "id": 14,
          "name": "WEBDL-720p"
        },
        {
          "id": -1,
          "name": "SD Fallback",
          "description": "Standard Definition Fallbacks",
          "qualities": [
            {
              "id": 22,
              "name": "DVD"
            },
            {
              "id": 19,
              "name": "WEBDL-480p"
            }
          ]
        }
      ],
      "upgrade_until": {
        "id": 3,
        "name": "Remux-2160p",
        "description": "4K Ultra HD Blu-ray disc content remuxed into a playable file format"
      },
      "language": "must_original"
    },
    "slug": "2160p-remux",
    "filename": "2160p Remux.yml",
    "category": "quality-profile"
  },
  {
    "path": "/quality-profile/720p-quality",
    "type": "quality-profile",
    "data": {
      "name": "720p Quality",
      "description": "720p Quality utilizes the [**Golden Popcorn Performance Index**](https://dictionarry.dev/wiki/GPPi) to target **transparent** x264 720p encodes. \n- 5 Quality tiers prioritise encodes with high 720p GPPi scores, with fallback to 720p WEB-DLs\n- If no 720p release can be found, the profile will fall back to SD releases - **DVD remuxes  / encodes**",
      "tags": [
        "720p",
        "Quality Focused",
        "Lossy Audio",
        "x264",
        "h264"
      ],
      "upgradesAllowed": true,
      "minCustomFormatScore": 2000,
      "upgradeUntilScore": 8000,
      "minScoreIncrement": 1,
      "custom_formats": [
        {
          "name": "720p WEB-DL",
          "score": 6000
        },
        {
          "name": "720p Bluray",
          "score": 5000
        },
        {
          "name": "720p WEBRip",
          "score": 5000
        },
        {
          "name": "480p WEB-DL",
          "score": 3000
        },
        {
          "name": "720p Quality Tier 1",
          "score": 2100
        },
        {
          "name": "720p Quality Tier 2",
          "score": 2000
        },
        {
          "name": "DVD",
          "score": 2000
        },
        {
          "name": "DVD Remux",
          "score": 2000
        },
        {
          "name": "720p Quality Tier 3",
          "score": 1900
        },
        {
          "name": "720p Quality Tier 4",
          "score": 1800
        },
        {
          "name": "720p Quality Tier 5",
          "score": 1700
        },
        {
          "name": "720p Golden Popcorn",
          "score": 600
        },
        {
          "name": "MA",
          "score": 500
        },
        {
          "name": "AMZN",
          "score": 400
        },
        {
          "name": "ATVP",
          "score": 400
        },
        {
          "name": "DSNP",
          "score": 400
        },
        {
          "name": "SD Golden Popcorn",
          "score": 400
        },
        {
          "name": "CRIT",
          "score": 300
        },
        {
          "name": "HMAX",
          "score": 300
        },
        {
          "name": "iT",
          "score": 300
        },
        {
          "name": "MAX",
          "score": 300
        },
        {
          "name": "NF",
          "score": 300
        },
        {
          "name": "NOW",
          "score": 300
        },
        {
          "name": "PCOK",
          "score": 300
        },
        {
          "name": "SD Quality Tier 1",
          "score": 300
        },
        {
          "name": "HTSR",
          "score": 200
        },
        {
          "name": "HULU",
          "score": 200
        },
        {
          "name": "PMTP",
          "score": 200
        },
        {
          "name": "ROKU",
          "score": 200
        },
        {
          "name": "SD Quality Tier 2",
          "score": 200
        },
        {
          "name": "SHO",
          "score": 200
        },
        {
          "name": "STAN",
          "score": 200
        },
        {
          "name": "Atmos",
          "score": 100
        },
        {
          "name": "Atmos (Missing)",
          "score": 100
        },
        {
          "name": "Special Edition",
          "score": 100
        },
        {
          "name": "WEB-DL Tier 1",
          "score": 80
        },
        {
          "name": "WEB-DL Tier 2",
          "score": 60
        },
        {
          "name": "WEB-DL Tier 3",
          "score": 40
        },
        {
          "name": "WEB-DL Tier 4",
          "score": 20
        },
        {
          "name": "Season Pack",
          "score": 10
        },
        {
          "name": "Repack3",
          "score": 8
        },
        {
          "name": "Repack2",
          "score": 7
        },
        {
          "name": "Repack1",
          "score": 6
        },
        {
          "name": "3D",
          "score": -99999
        },
        {
          "name": "AV1",
          "score": -99999
        },
        {
          "name": "B&W",
          "score": -99999
        },
        {
          "name": "Dolby Vision",
          "score": -99999
        },
        {
          "name": "Extras",
          "score": -99999
        },
        {
          "name": "Full Disc",
          "score": -99999
        },
        {
          "name": "Full Disc (Quality Match)",
          "score": -99999
        },
        {
          "name": "h265",
          "score": -99999
        },
        {
          "name": "HDR",
          "score": -99999
        },
        {
          "name": "HDR10",
          "score": -99999
        },
        {
          "name": "HDR10+",
          "score": -99999
        },
        {
          "name": "HLG",
          "score": -99999
        },
        {
          "name": "PQ",
          "score": -99999
        },
        {
          "name": "Remux",
          "score": -99999
        },
        {
          "name": "UnWanted Release Groups",
          "score": -99999
        },
        {
          "name": "UnWanted WEBRip Groups",
          "score": -99999
        },
        {
          "name": "Upscaled",
          "score": -99999
        },
        {
          "name": "VP9",
          "score": -99999
        },
        {
          "name": "VVC",
          "score": -99999
        },
        {
          "name": "x265",
          "score": -99999
        }
      ],
      "qualities": [
        {
          "id": -1,
          "name": "Transparent Capable",
          "description": "All capable of being indistinguishable from source. WEB-DL included to not allow unknown encode to trump known WEB-DL.",
          "qualities": [
            {
              "id": 13,
              "name": "Bluray-720p"
            },
            {
              "id": 14,
              "name": "WEBDL-720p"
            },
            {
              "id": 15,
              "name": "WEBRip-720p"
            }
          ]
        },
        {
          "id": -2,
          "name": "SD Fallback",
          "description": "Standard Definition Fallbacks",
          "qualities": [
            {
              "id": 18,
              "name": "Bluray-480p"
            },
            {
              "id": 19,
              "name": "WEBDL-480p"
            },
            {
              "id": 20,
              "name": "WEBRip-480p"
            },
            {
              "id": 22,
              "name": "DVD"
            }
          ]
        }
      ],
      "upgrade_until": {
        "id": -1,
        "name": "Transparent Capable",
        "description": "All capable of being indistinguishable from source. WEB-DL included to not allow unknown encode to trump known WEB-DL."
      },
      "language": "must_original"
    },
    "slug": "720p-quality",
    "filename": "720p Quality.yml",
    "category": "quality-profile"
  },
  {
    "path": "/custom-format/1080p-balanced-tier-1",
    "type": "custom-format",
    "data": {
      "name": "1080p Balanced Tier 1",
      "description": "Matches release groups who fall under 1080p Balanced Tier 1",
      "tags": [
        "Release Group Tier",
        "1080p",
        "Balanced"
      ],
      "conditions": [
        {
          "name": "1080p",
          "negate": false,
          "required": true,
          "resolution": "1080p",
          "type": "resolution"
        },
        {
          "name": "Bluray",
          "negate": false,
          "required": true,
          "source": "bluray",
          "type": "source"
        },
        {
          "name": "BHDStudio",
          "negate": false,
          "pattern": "BHDStudio",
          "required": false,
          "type": "release_group"
        }
      ],
      "tests": [
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "hallowed",
              "negate": false,
              "pattern": "hallowed",
              "required": false,
              "type": "release_group"
            },
            {
              "matches": false,
              "name": "BHDStudio",
              "negate": false,
              "pattern": "BHDStudio",
              "required": false,
              "type": "release_group"
            }
          ],
          "expected": true,
          "id": 1,
          "input": "Contact.1997.BluRay.1080p.DDP.5.1.x264-hallowed",
          "lastRun": "2025-01-13T02:53:37.357699",
          "passes": true
        },
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "hallowed",
              "negate": false,
              "pattern": "hallowed",
              "required": false,
              "type": "release_group"
            },
            {
              "matches": false,
              "name": "BHDStudio",
              "negate": false,
              "pattern": "BHDStudio",
              "required": false,
              "type": "release_group"
            }
          ],
          "expected": true,
          "id": 2,
          "input": "Gladiator.2000.Extended.Cut.UHD.BluRay.2160p.DDP.7.1.DV.HDR.x265-hallowed",
          "lastRun": "2025-01-13T02:53:37.357699",
          "passes": true
        },
        {
          "conditionResults": [
            {
              "matches": false,
              "name": "hallowed",
              "negate": false,
              "pattern": "hallowed",
              "required": false,
              "type": "release_group"
            },
            {
              "matches": true,
              "name": "BHDStudio",
              "negate": false,
              "pattern": "BHDStudio",
              "required": false,
              "type": "release_group"
            }
          ],
          "expected": true,
          "id": 3,
          "input": "Yi Yi 2000 BluRay 720p DD 2 0 x264-BHDStudio",
          "lastRun": "2025-01-13T02:53:37.357699",
          "passes": true
        },
        {
          "conditionResults": [
            {
              "matches": false,
              "name": "hallowed",
              "negate": false,
              "pattern": "hallowed",
              "required": false,
              "type": "release_group"
            },
            {
              "matches": true,
              "name": "BHDStudio",
              "negate": false,
              "pattern": "BHDStudio",
              "required": false,
              "type": "release_group"
            }
          ],
          "expected": true,
          "id": 4,
          "input": "Winnie the Pooh - Blood and Honey (2023) 2160p UHD BluRay x265 DV HDR DD 5.1 English-BHDStudio",
          "lastRun": "2025-01-13T02:53:37.357699",
          "passes": true
        }
      ]
    },
    "slug": "1080p-balanced-tier-1",
    "filename": "1080p Balanced Tier 1.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/1080p-balanced-tier-2",
    "type": "custom-format",
    "data": {
      "name": "1080p Balanced Tier 2",
      "description": "Matches release groups who fall under 1080p Balanced Tier 2",
      "tags": [
        "Release Group Tier",
        "1080p",
        "Balanced"
      ],
      "conditions": [
        {
          "name": "1080p",
          "negate": false,
          "required": true,
          "resolution": "1080p",
          "type": "resolution"
        },
        {
          "name": "Bluray",
          "negate": false,
          "required": true,
          "source": "bluray",
          "type": "source"
        },
        {
          "name": "hallowed",
          "negate": false,
          "pattern": "hallowed",
          "required": false,
          "type": "release_group"
        }
      ],
      "tests": [
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "hallowed",
              "negate": false,
              "pattern": "hallowed",
              "required": false,
              "type": "release_group"
            },
            {
              "matches": false,
              "name": "BHDStudio",
              "negate": false,
              "pattern": "BHDStudio",
              "required": false,
              "type": "release_group"
            }
          ],
          "expected": true,
          "id": 1,
          "input": "Contact.1997.BluRay.1080p.DDP.5.1.x264-hallowed",
          "lastRun": "2025-01-13T02:53:37.357699",
          "passes": true
        },
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "hallowed",
              "negate": false,
              "pattern": "hallowed",
              "required": false,
              "type": "release_group"
            },
            {
              "matches": false,
              "name": "BHDStudio",
              "negate": false,
              "pattern": "BHDStudio",
              "required": false,
              "type": "release_group"
            }
          ],
          "expected": true,
          "id": 2,
          "input": "Gladiator.2000.Extended.Cut.UHD.BluRay.2160p.DDP.7.1.DV.HDR.x265-hallowed",
          "lastRun": "2025-01-13T02:53:37.357699",
          "passes": true
        },
        {
          "conditionResults": [
            {
              "matches": false,
              "name": "hallowed",
              "negate": false,
              "pattern": "hallowed",
              "required": false,
              "type": "release_group"
            },
            {
              "matches": true,
              "name": "BHDStudio",
              "negate": false,
              "pattern": "BHDStudio",
              "required": false,
              "type": "release_group"
            }
          ],
          "expected": true,
          "id": 3,
          "input": "Yi Yi 2000 BluRay 720p DD 2 0 x264-BHDStudio",
          "lastRun": "2025-01-13T02:53:37.357699",
          "passes": true
        },
        {
          "conditionResults": [
            {
              "matches": false,
              "name": "hallowed",
              "negate": false,
              "pattern": "hallowed",
              "required": false,
              "type": "release_group"
            },
            {
              "matches": true,
              "name": "BHDStudio",
              "negate": false,
              "pattern": "BHDStudio",
              "required": false,
              "type": "release_group"
            }
          ],
          "expected": true,
          "id": 4,
          "input": "Winnie the Pooh - Blood and Honey (2023) 2160p UHD BluRay x265 DV HDR DD 5.1 English-BHDStudio",
          "lastRun": "2025-01-13T02:53:37.357699",
          "passes": true
        }
      ]
    },
    "slug": "1080p-balanced-tier-2",
    "filename": "1080p Balanced Tier 2.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/1080p-bluray",
    "type": "custom-format",
    "data": {
      "name": "1080p Bluray",
      "description": "Matches 1080p Blurays that are NOT remuxes",
      "tags": [
        "Resolution"
      ],
      "conditions": [
        {
          "name": "1080p",
          "negate": false,
          "required": true,
          "resolution": "1080p",
          "type": "resolution"
        },
        {
          "name": "Bluray",
          "negate": false,
          "required": true,
          "source": "bluray",
          "type": "source"
        }
      ],
      "tests": []
    },
    "slug": "1080p-bluray",
    "filename": "1080p Bluray.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/1080p-golden-popcorn",
    "type": "custom-format",
    "data": {
      "name": "1080p Golden Popcorn",
      "description": "Matches 1080p Golden Popcorns. Only works on PassThePopcorn",
      "tags": [
        "Flag",
        "Golden Popcorn"
      ],
      "conditions": [
        {
          "name": "1080p",
          "negate": false,
          "required": true,
          "resolution": "1080p",
          "type": "resolution"
        },
        {
          "flag": "ptp_golden",
          "name": "Golden Popcorn",
          "negate": false,
          "required": true,
          "type": "indexer_flag"
        }
      ],
      "tests": []
    },
    "slug": "1080p-golden-popcorn",
    "filename": "1080p Golden Popcorn.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/1080p-quality-tier-1",
    "type": "custom-format",
    "data": {
      "name": "1080p Quality Tier 1",
      "description": "Matches release groups who fall under 1080p GPPi Tier 1",
      "tags": [
        "GPPi",
        "Release Group Tier",
        "1080p",
        "Quality"
      ],
      "conditions": [
        {
          "name": "1080p",
          "negate": false,
          "required": true,
          "resolution": "1080p",
          "type": "resolution"
        },
        {
          "name": "Not WEB-DL",
          "type": "source",
          "required": true,
          "negate": true,
          "source": "web_dl"
        },
        {
          "name": "DON",
          "negate": false,
          "pattern": "DON",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "D-Z0N3",
          "negate": false,
          "pattern": "D-Z0N3",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "EbP",
          "negate": false,
          "pattern": "EbP",
          "required": false,
          "type": "release_group"
        }
      ],
      "tests": []
    },
    "slug": "1080p-quality-tier-1",
    "filename": "1080p Quality Tier 1.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/1080p-quality-tier-2",
    "type": "custom-format",
    "data": {
      "name": "1080p Quality Tier 2",
      "description": "Matches release groups who fall under 1080p GPPi Tier 2",
      "tags": [
        "GPPi",
        "Release Group Tier",
        "1080p",
        "Quality"
      ],
      "conditions": [
        {
          "name": "1080p",
          "negate": false,
          "required": true,
          "resolution": "1080p",
          "type": "resolution"
        },
        {
          "name": "Not WEB-DL",
          "negate": true,
          "required": true,
          "source": "web_dl",
          "type": "source"
        },
        {
          "name": "c0kE",
          "negate": false,
          "pattern": "c0kE",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "CtrlHD",
          "negate": false,
          "pattern": "CtrlHD",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "Geek",
          "negate": false,
          "pattern": "Geek",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "HiFi",
          "negate": false,
          "pattern": "HiFi",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "TayTo",
          "negate": false,
          "pattern": "TayTo",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "VietHD",
          "negate": false,
          "pattern": "VietHD",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "ZoroSenpai",
          "negate": false,
          "pattern": "ZoroSenpai",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "ZQ",
          "negate": false,
          "pattern": "ZQ",
          "required": false,
          "type": "release_group"
        }
      ],
      "tests": []
    },
    "slug": "1080p-quality-tier-2",
    "filename": "1080p Quality Tier 2.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/1080p-quality-tier-3",
    "type": "custom-format",
    "data": {
      "name": "1080p Quality Tier 3",
      "description": "Matches release groups who fall under 1080p GPPi Tier 2",
      "tags": [
        "GPPi",
        "Release Group Tier",
        "1080p",
        "Quality"
      ],
      "conditions": [
        {
          "name": "1080p",
          "negate": false,
          "required": true,
          "resolution": "1080p",
          "type": "resolution"
        },
        {
          "name": "Not WEB-DL",
          "type": "source",
          "required": true,
          "negate": true,
          "source": "web_dl"
        },
        {
          "name": "CRiSC",
          "negate": false,
          "pattern": "CRiSC",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "decibeL",
          "negate": false,
          "pattern": "decibeL",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "FoRM",
          "negate": false,
          "pattern": "FoRM",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "HiDt",
          "negate": false,
          "pattern": "HiDt",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "HiP",
          "negate": false,
          "pattern": "HiP",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "iFT",
          "negate": false,
          "pattern": "iFT",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "SA89",
          "negate": false,
          "pattern": "SA89",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "WMING",
          "negate": false,
          "pattern": "WMING",
          "required": false,
          "type": "release_group"
        }
      ],
      "tests": []
    },
    "slug": "1080p-quality-tier-3",
    "filename": "1080p Quality Tier 3.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/1080p-quality-tier-4",
    "type": "custom-format",
    "data": {
      "name": "1080p Quality Tier 4",
      "description": "Matches release groups who fall under 1080p GPPi Tier 4",
      "tags": [
        "GPPi",
        "Release Group Tier",
        "1080p",
        "Quality"
      ],
      "conditions": [
        {
          "name": "1080p",
          "negate": false,
          "required": true,
          "resolution": "1080p",
          "type": "resolution"
        },
        {
          "name": "Not WEB-DL",
          "negate": true,
          "required": true,
          "source": "web_dl",
          "type": "source"
        },
        {
          "name": "BMF",
          "negate": false,
          "pattern": "BMF",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "de[42]",
          "negate": false,
          "pattern": "de[42]",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "HDMaNiAcS",
          "negate": false,
          "pattern": "HDMaNiAcS",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "IDE",
          "negate": false,
          "pattern": "IDE",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "LolHD",
          "negate": false,
          "pattern": "LolHD",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "NCmt",
          "negate": false,
          "pattern": "NCmt",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "NTb",
          "negate": false,
          "pattern": "NTb",
          "required": false,
          "type": "release_group"
        }
      ],
      "tests": []
    },
    "slug": "1080p-quality-tier-4",
    "filename": "1080p Quality Tier 4.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/1080p-quality-tier-5",
    "type": "custom-format",
    "data": {
      "name": "1080p Quality Tier 5",
      "description": "Matches release groups who fall under 1080p GPPi Tier 5",
      "tags": [
        "GPPi",
        "Release Group Tier",
        "1080p",
        "Quality"
      ],
      "conditions": [
        {
          "name": "1080p",
          "negate": false,
          "required": true,
          "resolution": "1080p",
          "type": "resolution"
        },
        {
          "name": "Not WEB-DL",
          "negate": true,
          "required": true,
          "source": "web_dl",
          "type": "source"
        },
        {
          "name": "Not DVD",
          "negate": true,
          "required": true,
          "source": "dvd",
          "type": "source"
        },
        {
          "name": "AJP69",
          "negate": false,
          "pattern": "AJP69",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "BV",
          "negate": false,
          "pattern": "BV",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "Chotab",
          "negate": false,
          "pattern": "Chotab",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "CJ",
          "negate": false,
          "pattern": "CJ",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "CRX",
          "negate": false,
          "pattern": "CRX",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "Dariush",
          "negate": false,
          "pattern": "Dariush",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "E.N.D",
          "negate": false,
          "pattern": "E.N.D",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "E1",
          "negate": false,
          "pattern": "E1",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "EDPH",
          "negate": false,
          "pattern": "EDPH",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "ESiR",
          "negate": false,
          "pattern": "ESiR",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "EXCiSION",
          "negate": false,
          "pattern": "EXCiSION",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "FilmHD",
          "negate": false,
          "pattern": "FilmHD",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "FraMeSToR",
          "negate": false,
          "pattern": "FraMeSToR",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "FTW-HD",
          "negate": false,
          "pattern": "FTW-HD",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "GALAXY",
          "negate": false,
          "pattern": "GALAXY",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "GS88",
          "negate": false,
          "pattern": "GS88",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "HANDJOB",
          "negate": false,
          "pattern": "HANDJOB",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "hdalx",
          "negate": false,
          "pattern": "hdalx",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "iON",
          "negate": false,
          "pattern": "iON",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "KASHMiR",
          "negate": false,
          "pattern": "KASHMiR",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "LEGi0N",
          "negate": false,
          "pattern": "LEGi0N",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "LiNG",
          "negate": false,
          "pattern": "LiNG",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "LoRD",
          "negate": false,
          "pattern": "LoRD",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "luvBB",
          "negate": false,
          "pattern": "luvBB",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "MTeam",
          "negate": false,
          "pattern": "MTeam",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "nmd",
          "negate": false,
          "pattern": "nmd",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "NyHD",
          "negate": false,
          "pattern": "NyHD",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "ORiGEN",
          "negate": false,
          "pattern": "ORiGEN",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "P0W4HD",
          "negate": false,
          "pattern": "P0W4HD",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "Penumbra",
          "negate": false,
          "pattern": "Penumbra",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "playHD",
          "negate": false,
          "pattern": "playHD",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "Positive",
          "negate": false,
          "pattern": "Positive",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "PTer",
          "negate": false,
          "pattern": "PTer",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "rightSIZE",
          "negate": false,
          "pattern": "rightSIZE",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "rttr",
          "negate": false,
          "pattern": "rttr",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "SaNcTi",
          "negate": false,
          "pattern": "SaNcTi",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "SbR",
          "negate": false,
          "pattern": "SbR",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "SiMPLE",
          "negate": false,
          "pattern": "SiMPLE",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "SOP",
          "negate": false,
          "pattern": "SOP",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "TBB",
          "negate": false,
          "pattern": "TBB",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "TDD",
          "negate": false,
          "pattern": "TDD",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "VLAD",
          "negate": false,
          "pattern": "VLAD",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "W4NK3R",
          "negate": false,
          "pattern": "W4NK3R",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "xander",
          "negate": false,
          "pattern": "xander",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "ZIMBO",
          "negate": false,
          "pattern": "ZIMBO",
          "required": false,
          "type": "release_group"
        }
      ],
      "tests": []
    },
    "slug": "1080p-quality-tier-5",
    "filename": "1080p Quality Tier 5.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/1080p-remux",
    "type": "custom-format",
    "data": {
      "name": "1080p Remux",
      "description": "Matches 1080p Remux",
      "tags": [
        "Resolution"
      ],
      "conditions": [
        {
          "name": "1080p",
          "negate": false,
          "required": true,
          "resolution": "1080p",
          "type": "resolution"
        },
        {
          "name": "Remux",
          "negate": false,
          "pattern": "Remux",
          "required": true,
          "type": "release_title"
        }
      ],
      "tests": []
    },
    "slug": "1080p-remux",
    "filename": "1080p Remux.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/1080p-web-dl",
    "type": "custom-format",
    "data": {
      "name": "1080p WEB-DL",
      "description": "Matches 1080p WEB-DLs.",
      "tags": [
        "Resolution"
      ],
      "conditions": [
        {
          "name": "1080p",
          "negate": false,
          "required": true,
          "resolution": "1080p",
          "type": "resolution"
        },
        {
          "name": "WEB-DL",
          "negate": false,
          "required": true,
          "source": "web_dl",
          "type": "source"
        }
      ],
      "tests": []
    },
    "slug": "1080p-web-dl",
    "filename": "1080p WEB-DL.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/1080p-webrip",
    "type": "custom-format",
    "data": {
      "name": "1080p WEBRip",
      "description": "Matches 1080p WEBRips.",
      "tags": [
        "Resolution"
      ],
      "conditions": [
        {
          "name": "1080p",
          "negate": false,
          "required": true,
          "resolution": "1080p",
          "type": "resolution"
        },
        {
          "name": "WEBRip",
          "negate": false,
          "required": true,
          "source": "webrip",
          "type": "source"
        }
      ],
      "tests": []
    },
    "slug": "1080p-webrip",
    "filename": "1080p WEBRip.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/1080p",
    "type": "custom-format",
    "data": {
      "name": "1080p",
      "description": "Full high definition resolution providing sharp detail and clarity.",
      "tags": [
        "Full High Definition",
        "Resolution"
      ],
      "conditions": [
        {
          "name": "1080p",
          "negate": false,
          "required": true,
          "resolution": "1080p",
          "type": "resolution"
        }
      ],
      "tests": []
    },
    "slug": "1080p",
    "filename": "1080p.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/2160p-balanced-tier-1",
    "type": "custom-format",
    "data": {
      "name": "2160p Balanced Tier 1",
      "description": "Matches release groups who fall under 2160p Balanced Tier 1",
      "tags": [
        "Release Group Tier",
        "2160p",
        "Balanced"
      ],
      "conditions": [
        {
          "name": "2160p",
          "negate": false,
          "required": true,
          "resolution": "2160p",
          "type": "resolution"
        },
        {
          "name": "Bluray",
          "negate": false,
          "required": true,
          "source": "bluray",
          "type": "source"
        },
        {
          "name": "HONE",
          "negate": false,
          "pattern": "HONE",
          "required": false,
          "type": "release_title"
        }
      ],
      "tests": [
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "hallowed",
              "negate": false,
              "pattern": "hallowed",
              "required": false,
              "type": "release_group"
            },
            {
              "matches": false,
              "name": "BHDStudio",
              "negate": false,
              "pattern": "BHDStudio",
              "required": false,
              "type": "release_group"
            }
          ],
          "expected": true,
          "id": 1,
          "input": "Contact.1997.BluRay.1080p.DDP.5.1.x264-hallowed",
          "lastRun": "2025-01-13T02:53:37.357699",
          "passes": true
        },
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "hallowed",
              "negate": false,
              "pattern": "hallowed",
              "required": false,
              "type": "release_group"
            },
            {
              "matches": false,
              "name": "BHDStudio",
              "negate": false,
              "pattern": "BHDStudio",
              "required": false,
              "type": "release_group"
            }
          ],
          "expected": true,
          "id": 2,
          "input": "Gladiator.2000.Extended.Cut.UHD.BluRay.2160p.DDP.7.1.DV.HDR.x265-hallowed",
          "lastRun": "2025-01-13T02:53:37.357699",
          "passes": true
        },
        {
          "conditionResults": [
            {
              "matches": false,
              "name": "hallowed",
              "negate": false,
              "pattern": "hallowed",
              "required": false,
              "type": "release_group"
            },
            {
              "matches": true,
              "name": "BHDStudio",
              "negate": false,
              "pattern": "BHDStudio",
              "required": false,
              "type": "release_group"
            }
          ],
          "expected": true,
          "id": 3,
          "input": "Yi Yi 2000 BluRay 720p DD 2 0 x264-BHDStudio",
          "lastRun": "2025-01-13T02:53:37.357699",
          "passes": true
        },
        {
          "conditionResults": [
            {
              "matches": false,
              "name": "hallowed",
              "negate": false,
              "pattern": "hallowed",
              "required": false,
              "type": "release_group"
            },
            {
              "matches": true,
              "name": "BHDStudio",
              "negate": false,
              "pattern": "BHDStudio",
              "required": false,
              "type": "release_group"
            }
          ],
          "expected": true,
          "id": 4,
          "input": "Winnie the Pooh - Blood and Honey (2023) 2160p UHD BluRay x265 DV HDR DD 5.1 English-BHDStudio",
          "lastRun": "2025-01-13T02:53:37.357699",
          "passes": true
        }
      ]
    },
    "slug": "2160p-balanced-tier-1",
    "filename": "2160p Balanced Tier 1.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/2160p-balanced-tier-2",
    "type": "custom-format",
    "data": {
      "name": "2160p Balanced Tier 2",
      "description": "Matches release groups who fall under 2160p Balanced Tier 2",
      "tags": [
        "Release Group Tier",
        "2160p",
        "Balanced"
      ],
      "conditions": [
        {
          "name": "2160p",
          "negate": false,
          "required": true,
          "resolution": "2160p",
          "type": "resolution"
        },
        {
          "name": "Bluray",
          "negate": false,
          "required": true,
          "source": "bluray",
          "type": "source"
        },
        {
          "name": "BHDStudio",
          "negate": false,
          "pattern": "BHDStudio",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "hallowed",
          "negate": false,
          "pattern": "hallowed",
          "required": false,
          "type": "release_group"
        }
      ],
      "tests": [
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "hallowed",
              "negate": false,
              "pattern": "hallowed",
              "required": false,
              "type": "release_group"
            },
            {
              "matches": false,
              "name": "BHDStudio",
              "negate": false,
              "pattern": "BHDStudio",
              "required": false,
              "type": "release_group"
            }
          ],
          "expected": true,
          "id": 1,
          "input": "Contact.1997.BluRay.1080p.DDP.5.1.x264-hallowed",
          "lastRun": "2025-01-13T02:53:37.357699",
          "passes": true
        },
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "hallowed",
              "negate": false,
              "pattern": "hallowed",
              "required": false,
              "type": "release_group"
            },
            {
              "matches": false,
              "name": "BHDStudio",
              "negate": false,
              "pattern": "BHDStudio",
              "required": false,
              "type": "release_group"
            }
          ],
          "expected": true,
          "id": 2,
          "input": "Gladiator.2000.Extended.Cut.UHD.BluRay.2160p.DDP.7.1.DV.HDR.x265-hallowed",
          "lastRun": "2025-01-13T02:53:37.357699",
          "passes": true
        },
        {
          "conditionResults": [
            {
              "matches": false,
              "name": "hallowed",
              "negate": false,
              "pattern": "hallowed",
              "required": false,
              "type": "release_group"
            },
            {
              "matches": true,
              "name": "BHDStudio",
              "negate": false,
              "pattern": "BHDStudio",
              "required": false,
              "type": "release_group"
            }
          ],
          "expected": true,
          "id": 3,
          "input": "Yi Yi 2000 BluRay 720p DD 2 0 x264-BHDStudio",
          "lastRun": "2025-01-13T02:53:37.357699",
          "passes": true
        },
        {
          "conditionResults": [
            {
              "matches": false,
              "name": "hallowed",
              "negate": false,
              "pattern": "hallowed",
              "required": false,
              "type": "release_group"
            },
            {
              "matches": true,
              "name": "BHDStudio",
              "negate": false,
              "pattern": "BHDStudio",
              "required": false,
              "type": "release_group"
            }
          ],
          "expected": true,
          "id": 4,
          "input": "Winnie the Pooh - Blood and Honey (2023) 2160p UHD BluRay x265 DV HDR DD 5.1 English-BHDStudio",
          "lastRun": "2025-01-13T02:53:37.357699",
          "passes": true
        }
      ]
    },
    "slug": "2160p-balanced-tier-2",
    "filename": "2160p Balanced Tier 2.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/2160p-bluray",
    "type": "custom-format",
    "data": {
      "name": "2160p Bluray",
      "description": "Matches 2160p Blurays that are NOT remuxes",
      "tags": [
        "Resolution"
      ],
      "conditions": [
        {
          "name": "2160p",
          "negate": false,
          "required": true,
          "resolution": "2160p",
          "type": "resolution"
        },
        {
          "name": "Bluray",
          "negate": false,
          "required": true,
          "source": "bluray",
          "type": "source"
        }
      ],
      "tests": []
    },
    "slug": "2160p-bluray",
    "filename": "2160p Bluray.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/2160p-quality-tier-1",
    "type": "custom-format",
    "data": {
      "name": "2160p Quality Tier 1",
      "description": "Matches release groups who fall under 2160p Quality Tier 1",
      "tags": [
        "Release Group Tier",
        "2160p",
        "Quality"
      ],
      "conditions": [
        {
          "name": "2160p",
          "negate": false,
          "required": true,
          "resolution": "2160p",
          "type": "resolution"
        },
        {
          "name": "Bluray",
          "negate": false,
          "required": true,
          "source": "bluray",
          "type": "source"
        },
        {
          "name": "CtrlHD",
          "negate": false,
          "pattern": "CtrlHD",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "DEPTH",
          "negate": false,
          "pattern": "DEPTH",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "DON",
          "negate": false,
          "pattern": "DON",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "HQMUX",
          "negate": false,
          "pattern": "HQMUX",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "PTer",
          "negate": false,
          "pattern": "PTer",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "SA89",
          "negate": false,
          "pattern": "SA89",
          "required": false,
          "type": "release_group"
        }
      ],
      "tests": []
    },
    "slug": "2160p-quality-tier-1",
    "filename": "2160p Quality Tier 1.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/2160p-quality-tier-2",
    "type": "custom-format",
    "data": {
      "name": "2160p Quality Tier 2",
      "description": "Matches release groups who fall under 2160p Quality Tier 2",
      "tags": [
        "Release Group Tier",
        "2160p",
        "Quality"
      ],
      "conditions": [
        {
          "name": "2160p",
          "negate": false,
          "required": true,
          "resolution": "2160p",
          "type": "resolution"
        },
        {
          "name": "Bluray",
          "negate": false,
          "required": true,
          "source": "bluray",
          "type": "source"
        },
        {
          "name": "c0kE",
          "negate": false,
          "pattern": "c0kE",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "D-Z0N3",
          "negate": false,
          "pattern": "D-Z0N3",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "MainFrame",
          "negate": false,
          "pattern": "MainFrame",
          "required": false,
          "type": "release_group"
        }
      ],
      "tests": []
    },
    "slug": "2160p-quality-tier-2",
    "filename": "2160p Quality Tier 2.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/2160p-quality-tier-3",
    "type": "custom-format",
    "data": {
      "name": "2160p Quality Tier 3",
      "description": "Matches release groups who fall under 2160p Quality Tier 3",
      "tags": [
        "Release Group Tier",
        "2160p",
        "Quality"
      ],
      "conditions": [
        {
          "name": "2160p",
          "negate": false,
          "required": true,
          "resolution": "2160p",
          "type": "resolution"
        },
        {
          "name": "Bluray",
          "negate": false,
          "required": true,
          "source": "bluray",
          "type": "source"
        },
        {
          "name": "Chotab",
          "negate": false,
          "pattern": "Chotab",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "Kitsune",
          "negate": false,
          "pattern": "Kitsune",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "REBORN",
          "negate": false,
          "pattern": "REBORN",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "W4NK3R",
          "negate": false,
          "pattern": "W4NK3R",
          "required": false,
          "type": "release_group"
        }
      ],
      "tests": []
    },
    "slug": "2160p-quality-tier-3",
    "filename": "2160p Quality Tier 3.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/2160p-quality-tier-4",
    "type": "custom-format",
    "data": {
      "name": "2160p Quality Tier 4",
      "description": "Matches release groups who fall under 2160p Quality Tier 4",
      "tags": [
        "Release Group Tier",
        "2160p",
        "Quality"
      ],
      "conditions": [
        {
          "name": "2160p",
          "negate": false,
          "required": true,
          "resolution": "2160p",
          "type": "resolution"
        },
        {
          "name": "Bluray",
          "negate": false,
          "required": true,
          "source": "bluray",
          "type": "source"
        },
        {
          "name": "b0mbardiers",
          "negate": false,
          "pattern": "b0mbardiers",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "iFT",
          "negate": false,
          "pattern": "iFT",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "NCmt",
          "negate": false,
          "pattern": "NCmt",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "SPHD",
          "negate": false,
          "pattern": "SPHD",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "TDD",
          "negate": false,
          "pattern": "TDD",
          "required": false,
          "type": "release_group"
        }
      ],
      "tests": []
    },
    "slug": "2160p-quality-tier-4",
    "filename": "2160p Quality Tier 4.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/2160p-quality-tier-5",
    "type": "custom-format",
    "data": {
      "name": "2160p Quality Tier 5",
      "description": "Matches release groups who fall under 2160p Quality Tier 5",
      "tags": [
        "Release Group Tier",
        "2160p",
        "Quality"
      ],
      "conditions": [
        {
          "name": "2160p",
          "negate": false,
          "required": true,
          "resolution": "2160p",
          "type": "resolution"
        },
        {
          "name": "Bluray",
          "negate": false,
          "required": true,
          "source": "bluray",
          "type": "source"
        },
        {
          "name": "4KDVS",
          "negate": false,
          "pattern": "4KDVS",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "BlzT",
          "negate": false,
          "pattern": "BlzT",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "BSTD",
          "negate": false,
          "pattern": "BSTD",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "DEFLATE",
          "negate": false,
          "pattern": "DEFLATE",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "JustWatch",
          "negate": false,
          "pattern": "JustWatch",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "SURCODE",
          "type": "release_group",
          "required": false,
          "negate": false,
          "pattern": "SURCODE"
        },
        {
          "name": "TnP",
          "negate": false,
          "pattern": "TnP",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "WATCHABLE",
          "negate": false,
          "pattern": "WATCHABLE",
          "required": false,
          "type": "release_group"
        }
      ],
      "tests": []
    },
    "slug": "2160p-quality-tier-5",
    "filename": "2160p Quality Tier 5.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/2160p-quality-tier-6",
    "type": "custom-format",
    "data": {
      "name": "2160p Quality Tier 6",
      "description": "Matches release groups who fall under 2160p Quality Tier 5",
      "tags": [
        "Release Group Tier",
        "2160p",
        "Quality"
      ],
      "conditions": [
        {
          "name": "2160p",
          "negate": false,
          "required": true,
          "resolution": "2160p",
          "type": "resolution"
        },
        {
          "name": "Bluray",
          "negate": false,
          "required": true,
          "source": "bluray",
          "type": "source"
        },
        {
          "name": "AAAUHD",
          "negate": false,
          "pattern": "AAAUHD",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "Absinth",
          "negate": false,
          "pattern": "Absinth",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "ADE",
          "negate": false,
          "pattern": "ADE",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "AViATOR",
          "negate": false,
          "pattern": "AViATOR",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "beAst",
          "negate": false,
          "pattern": "beAst",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "CHD",
          "negate": false,
          "pattern": "CHD",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "CMCT",
          "negate": false,
          "pattern": "CMCT",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "EDPH",
          "negate": false,
          "pattern": "EDPH",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "EMERALD",
          "negate": false,
          "pattern": "EMERALD",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "ESiR",
          "negate": false,
          "pattern": "ESiR",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "FRDS",
          "negate": false,
          "pattern": "FRDS",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "GUHZER",
          "negate": false,
          "pattern": "GUHZER",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "HD77",
          "negate": false,
          "pattern": "HD77",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "HDChina",
          "negate": false,
          "pattern": "HDChina",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "HDmux",
          "negate": false,
          "pattern": "HDmux",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "HUNTJR",
          "negate": false,
          "pattern": "HUNTJR",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "HypStu",
          "negate": false,
          "pattern": "HypStu",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "IAMABLE",
          "negate": false,
          "pattern": "IAMABLE",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "iCandy",
          "negate": false,
          "pattern": "iCandy",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "iNVANDRAREN",
          "negate": false,
          "pattern": "iNVANDRAREN",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "k00kie",
          "negate": false,
          "pattern": "k00kie",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "KAN3D2M",
          "negate": false,
          "pattern": "KAN3D2M",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "KNiVES",
          "negate": false,
          "pattern": "KNiVES",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "LAZARUS",
          "negate": false,
          "pattern": "LAZARUS",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "MiMiC",
          "negate": false,
          "pattern": "MiMiC",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "PussyFoot",
          "negate": false,
          "pattern": "PussyFoot",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "ReaLHD",
          "negate": false,
          "pattern": "ReaLHD",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "ReQuEsT",
          "negate": false,
          "pattern": "ReQuEsT",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "SMAHAWUG",
          "negate": false,
          "pattern": "SMAHAWUG",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "SoLaR",
          "negate": false,
          "pattern": "SoLaR",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "SPECTACLE",
          "negate": false,
          "pattern": "SPECTACLE",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "STRiKES",
          "negate": false,
          "pattern": "STRiKES",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "SWAGGERUHD",
          "negate": false,
          "pattern": "SWAGGERUHD",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "SWTYBLZ",
          "negate": false,
          "pattern": "SWTYBLZ",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "TERMiNAL",
          "negate": false,
          "pattern": "TERMiNAL",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "TOMBCRUISE",
          "negate": false,
          "pattern": "TOMBCRUISE",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "Tron",
          "negate": false,
          "pattern": "Tron",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "ULTRAHDCLUB",
          "negate": false,
          "pattern": "ULTRAHDCLUB",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "VALiS",
          "negate": false,
          "pattern": "VALiS",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "Whiterhino",
          "negate": false,
          "pattern": "WhiteRhino",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "WiKi",
          "negate": false,
          "pattern": "WiKi",
          "required": false,
          "type": "release_group"
        }
      ],
      "tests": []
    },
    "slug": "2160p-quality-tier-6",
    "filename": "2160p Quality Tier 6.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/2160p-quality-tier-7",
    "type": "custom-format",
    "data": {
      "name": "2160p Quality Tier 7",
      "description": "Matches release groups who fall under 2160p Quality Tier 6",
      "tags": [
        "Release Group Tier",
        "2160p",
        "Quality"
      ],
      "conditions": [
        {
          "name": "2160p",
          "negate": false,
          "required": true,
          "resolution": "2160p",
          "type": "resolution"
        },
        {
          "name": "Bluray",
          "negate": false,
          "required": true,
          "source": "bluray",
          "type": "source"
        },
        {
          "name": "BeiTai",
          "negate": false,
          "pattern": "BeiTai",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "BLUEBIRD",
          "negate": false,
          "pattern": "BLUEBIRD",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "BOREDOR",
          "negate": false,
          "pattern": "BOREDOR",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "CHAOS",
          "negate": false,
          "pattern": "CHAOS",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "dkore",
          "negate": false,
          "pattern": "dkore",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "FLAME",
          "negate": false,
          "pattern": "FLAME",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "Hares",
          "negate": false,
          "pattern": "Hares",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "LittleBakas",
          "negate": false,
          "pattern": "LittleBakas",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "Lucifer",
          "negate": false,
          "pattern": "Lucifer",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "micius",
          "negate": false,
          "pattern": "micius",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "PTH",
          "negate": false,
          "pattern": "PTH",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "THREESOME",
          "negate": false,
          "pattern": "THREESOME",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "UHDCLUBREMUX",
          "negate": false,
          "pattern": "UHDCLUBREMUX",
          "required": false,
          "type": "release_group"
        }
      ],
      "tests": []
    },
    "slug": "2160p-quality-tier-7",
    "filename": "2160p Quality Tier 7.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/2160p-remux",
    "type": "custom-format",
    "data": {
      "name": "2160p Remux",
      "description": "Matches 2160p Remux",
      "tags": [
        "Resolution"
      ],
      "conditions": [
        {
          "name": "2160p",
          "negate": false,
          "required": true,
          "resolution": "2160p",
          "type": "resolution"
        },
        {
          "name": "Remux",
          "negate": false,
          "pattern": "Remux",
          "required": true,
          "type": "release_title"
        }
      ],
      "tests": []
    },
    "slug": "2160p-remux",
    "filename": "2160p Remux.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/2160p-web-dl",
    "type": "custom-format",
    "data": {
      "name": "2160p WEB-DL",
      "description": "Matches 2160p WEB-DLs.",
      "tags": [
        "Resolution"
      ],
      "conditions": [
        {
          "name": "2160p",
          "negate": false,
          "required": true,
          "resolution": "2160p",
          "type": "resolution"
        },
        {
          "name": "WEB-DL",
          "negate": false,
          "required": true,
          "source": "web_dl",
          "type": "source"
        }
      ],
      "tests": []
    },
    "slug": "2160p-web-dl",
    "filename": "2160p WEB-DL.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/2160p-webrip",
    "type": "custom-format",
    "data": {
      "name": "2160p WEBRip",
      "description": "Matches 2160p WEBRips.",
      "tags": [
        "Resolution"
      ],
      "conditions": [
        {
          "name": "2160p",
          "negate": false,
          "required": true,
          "resolution": "2160p",
          "type": "resolution"
        },
        {
          "name": "WEBRip",
          "negate": false,
          "required": true,
          "source": "webrip",
          "type": "source"
        }
      ],
      "tests": []
    },
    "slug": "2160p-webrip",
    "filename": "2160p WEBRip.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/2160p",
    "type": "custom-format",
    "data": {
      "name": "2160p",
      "description": "Ultra high definition resolution offering maximum detail and clarity",
      "tags": [
        "Ultra High Definition",
        "4K",
        "Resolution"
      ],
      "conditions": [
        {
          "name": "2160p",
          "type": "resolution",
          "required": true,
          "negate": false,
          "resolution": "2160p"
        }
      ],
      "tests": []
    },
    "slug": "2160p",
    "filename": "2160p.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/360p",
    "type": "custom-format",
    "data": {
      "name": "360p",
      "description": "Low resolution video format typically used in older or highly compressed content.",
      "tags": [
        "Standard Definition",
        "Mobile",
        "Legacy",
        "Resolution"
      ],
      "conditions": [
        {
          "name": "360p",
          "negate": false,
          "required": true,
          "resolution": "360p",
          "type": "resolution"
        }
      ],
      "tests": []
    },
    "slug": "360p",
    "filename": "360p.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/3d",
    "type": "custom-format",
    "data": {
      "name": "3D",
      "description": "Matches the '3D' Regex Pattern",
      "tags": [
        "UnWanted",
        "Enhancement"
      ],
      "conditions": [
        {
          "name": "3D",
          "negate": false,
          "pattern": "3D",
          "required": true,
          "type": "release_title"
        }
      ],
      "tests": []
    },
    "slug": "3d",
    "filename": "3D.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/480p-web-dl",
    "type": "custom-format",
    "data": {
      "name": "480p WEB-DL",
      "description": "Matches 480p WEB-DLs.",
      "tags": [
        "Resolution"
      ],
      "conditions": [
        {
          "name": "480p",
          "negate": false,
          "required": true,
          "resolution": "480p",
          "type": "resolution"
        },
        {
          "name": "WEB-DL",
          "negate": false,
          "required": true,
          "source": "web_dl",
          "type": "source"
        }
      ],
      "tests": []
    },
    "slug": "480p-web-dl",
    "filename": "480p WEB-DL.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/480p-webrip",
    "type": "custom-format",
    "data": {
      "name": "480p WEBRip",
      "description": "Matches 480p WEBRips.",
      "tags": [
        "Resolution"
      ],
      "conditions": [
        {
          "name": "480p",
          "negate": false,
          "required": true,
          "resolution": "480p",
          "type": "resolution"
        },
        {
          "name": "WEBRip",
          "negate": false,
          "required": true,
          "source": "webrip",
          "type": "source"
        }
      ],
      "tests": []
    },
    "slug": "480p-webrip",
    "filename": "480p WEBRip.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/480p",
    "type": "custom-format",
    "data": {
      "name": "480p",
      "description": "Standard definition resolution commonly used in DVD and early web video content.",
      "tags": [
        "Standard Definition",
        "Web",
        "Legacy",
        "Resolution"
      ],
      "conditions": [
        {
          "name": "480p",
          "negate": false,
          "required": true,
          "resolution": "480p",
          "type": "resolution"
        }
      ],
      "tests": []
    },
    "slug": "480p",
    "filename": "480p.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/540p",
    "type": "custom-format",
    "data": {
      "name": "540p",
      "description": "Intermediate standard definition resolution commonly used in compressed Blu-ray encodes to save space while maintaining acceptable quality.",
      "tags": [
        "Standard Definition",
        "Resolution"
      ],
      "conditions": [
        {
          "name": "540p",
          "negate": false,
          "required": true,
          "resolution": "540p",
          "type": "resolution"
        }
      ],
      "tests": []
    },
    "slug": "540p",
    "filename": "540p.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/576p",
    "type": "custom-format",
    "data": {
      "name": "576p",
      "description": "PAL standard definition resolution found in European DVD releases and compressed Blu-ray encodes optimized for legacy display compatibility",
      "tags": [
        "Standard Definition",
        "Resolution"
      ],
      "conditions": [
        {
          "name": "576p",
          "negate": false,
          "required": true,
          "resolution": "576p",
          "type": "resolution"
        }
      ],
      "tests": []
    },
    "slug": "576p",
    "filename": "576p.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/720p-bluray",
    "type": "custom-format",
    "data": {
      "name": "720p Bluray",
      "description": "Matches 720p Blurays that are NOT remuxes",
      "tags": [
        "Resolution"
      ],
      "conditions": [
        {
          "name": "720p",
          "negate": false,
          "required": true,
          "resolution": "720p",
          "type": "resolution"
        },
        {
          "name": "Bluray",
          "negate": false,
          "required": true,
          "source": "bluray",
          "type": "source"
        }
      ],
      "tests": []
    },
    "slug": "720p-bluray",
    "filename": "720p Bluray.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/720p-golden-popcorn",
    "type": "custom-format",
    "data": {
      "name": "720p Golden Popcorn",
      "description": "Matches 720p Golden Popcorns. Only works on PassThePopcorn",
      "tags": [
        "Flag",
        "Golden Popcorn"
      ],
      "conditions": [
        {
          "name": "720p",
          "negate": false,
          "required": true,
          "resolution": "720p",
          "type": "resolution"
        },
        {
          "flag": "ptp_golden",
          "name": "Golden Popcorn",
          "negate": false,
          "required": true,
          "type": "indexer_flag"
        }
      ],
      "tests": []
    },
    "slug": "720p-golden-popcorn",
    "filename": "720p Golden Popcorn.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/720p-quality-tier-1",
    "type": "custom-format",
    "data": {
      "name": "720p Quality Tier 1",
      "description": "Matches release groups who fall under 720p Quality Tier 1",
      "tags": [
        "GPPi",
        "Release Group Tier",
        "720p",
        "Quality"
      ],
      "conditions": [
        {
          "name": "720p",
          "negate": false,
          "required": true,
          "resolution": "720p",
          "type": "resolution"
        },
        {
          "name": "Not WEB-DL",
          "negate": true,
          "required": true,
          "source": "web_dl",
          "type": "source"
        },
        {
          "name": "DON",
          "negate": false,
          "pattern": "DON",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "EbP",
          "negate": false,
          "pattern": "EbP",
          "required": false,
          "type": "release_group"
        }
      ],
      "tests": []
    },
    "slug": "720p-quality-tier-1",
    "filename": "720p Quality Tier 1.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/720p-quality-tier-2",
    "type": "custom-format",
    "data": {
      "name": "720p Quality Tier 2",
      "description": "Matches release groups who fall under 720p Quality Tier 2",
      "tags": [
        "GPPi",
        "Release Group Tier",
        "720p",
        "Quality"
      ],
      "conditions": [
        {
          "name": "720p",
          "negate": false,
          "required": true,
          "resolution": "720p",
          "type": "resolution"
        },
        {
          "name": "Not WEB-DL",
          "negate": true,
          "required": true,
          "source": "web_dl",
          "type": "source"
        },
        {
          "name": "CRiSC",
          "negate": false,
          "pattern": "CRiSC",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "CtrlHD",
          "negate": false,
          "pattern": "CtrlHD",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "HiDt",
          "negate": false,
          "pattern": "HiDt",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "HiFi",
          "negate": false,
          "pattern": "HiFi",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "IDE",
          "negate": false,
          "pattern": "IDE",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "SbR",
          "negate": false,
          "pattern": "SbR",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "TayTo",
          "negate": false,
          "pattern": "TayTo",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "VietHD",
          "negate": false,
          "pattern": "VietHD",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "ZQ",
          "negate": false,
          "pattern": "ZQ",
          "required": false,
          "type": "release_group"
        }
      ],
      "tests": []
    },
    "slug": "720p-quality-tier-2",
    "filename": "720p Quality Tier 2.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/720p-quality-tier-3",
    "type": "custom-format",
    "data": {
      "name": "720p Quality Tier 3",
      "description": "Matches release groups who fall under 720p Quality Tier 3",
      "tags": [
        "GPPi",
        "Release Group Tier",
        "720p",
        "Quality"
      ],
      "conditions": [
        {
          "name": "720p",
          "negate": false,
          "required": true,
          "resolution": "720p",
          "type": "resolution"
        },
        {
          "name": "Not WEB-DL",
          "negate": true,
          "required": true,
          "source": "web_dl",
          "type": "source"
        },
        {
          "name": "BMF",
          "negate": false,
          "pattern": "BMF",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "Geek",
          "negate": false,
          "pattern": "Geek",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "LolHD",
          "negate": false,
          "pattern": "LolHD",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "NCmt",
          "negate": false,
          "pattern": "NCmt",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "Positive",
          "negate": false,
          "pattern": "Positive",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "TBB",
          "negate": false,
          "pattern": "TBB",
          "required": false,
          "type": "release_group"
        }
      ],
      "tests": []
    },
    "slug": "720p-quality-tier-3",
    "filename": "720p Quality Tier 3.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/720p-quality-tier-4",
    "type": "custom-format",
    "data": {
      "name": "720p Quality Tier 4",
      "description": "Matches release groups who fall under 720p Quality Tier 4",
      "tags": [
        "GPPi",
        "Release Group Tier",
        "720p",
        "Quality"
      ],
      "conditions": [
        {
          "name": "720p",
          "negate": false,
          "required": true,
          "resolution": "720p",
          "type": "resolution"
        },
        {
          "name": "Not WEB-DL",
          "negate": true,
          "required": true,
          "source": "web_dl",
          "type": "source"
        },
        {
          "name": "Dariush",
          "type": "release_group",
          "required": false,
          "negate": false,
          "pattern": "Dariush"
        },
        {
          "name": "D-ZON3",
          "type": "release_group",
          "required": false,
          "negate": false,
          "pattern": "D-Z0N3"
        },
        {
          "name": "EA",
          "negate": false,
          "pattern": "EA",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "FoRM",
          "type": "release_group",
          "required": false,
          "negate": false,
          "pattern": "FoRM"
        },
        {
          "name": "NTb",
          "type": "release_group",
          "required": false,
          "negate": false,
          "pattern": "NTb"
        },
        {
          "name": "PTer",
          "type": "release_group",
          "required": false,
          "negate": false,
          "pattern": "PTer"
        },
        {
          "name": "TDD",
          "negate": false,
          "pattern": "TDD",
          "required": false,
          "type": "release_group"
        }
      ],
      "tests": []
    },
    "slug": "720p-quality-tier-4",
    "filename": "720p Quality Tier 4.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/720p-quality-tier-5",
    "type": "custom-format",
    "data": {
      "name": "720p Quality Tier 5",
      "description": "Matches release groups who fall under 720p Quality Tier 5",
      "tags": [
        "GPPi",
        "Release Group Tier",
        "720p",
        "Quality"
      ],
      "conditions": [
        {
          "name": "720p",
          "negate": false,
          "required": true,
          "resolution": "720p",
          "type": "resolution"
        },
        {
          "name": "Not WEB-DL",
          "negate": true,
          "required": true,
          "source": "web_dl",
          "type": "source"
        },
        {
          "name": "Chotab",
          "negate": false,
          "pattern": "Chotab",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "EDPH",
          "negate": false,
          "pattern": "EDPH",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "E.N.D",
          "negate": false,
          "pattern": "E.N.D",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "ESiR",
          "negate": false,
          "pattern": "ESiR",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "HDMaNiAcS",
          "negate": false,
          "pattern": "HDMaNiAcS",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "iFT",
          "negate": false,
          "pattern": "iFT",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "KASHMiR",
          "negate": false,
          "pattern": "KASHMiR",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "MTeam",
          "negate": false,
          "pattern": "MTeam",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "nmd",
          "negate": false,
          "pattern": "nmd",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "NyHD",
          "type": "release_group",
          "required": false,
          "negate": false,
          "pattern": "NyHD"
        },
        {
          "name": "ORiGEN",
          "negate": false,
          "pattern": "ORiGEN",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "playHD",
          "negate": false,
          "pattern": "playHD",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "SA89",
          "negate": false,
          "pattern": "SA89",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "SaNcTi",
          "negate": false,
          "pattern": "SaNcTi",
          "required": false,
          "type": "release_group"
        }
      ],
      "tests": []
    },
    "slug": "720p-quality-tier-5",
    "filename": "720p Quality Tier 5.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/720p-web-dl",
    "type": "custom-format",
    "data": {
      "name": "720p WEB-DL",
      "description": "Matches 720p WEB-DLs.",
      "tags": [
        "Resolution"
      ],
      "conditions": [
        {
          "name": "720p",
          "negate": false,
          "required": true,
          "resolution": "720p",
          "type": "resolution"
        },
        {
          "name": "WEB-DL",
          "negate": false,
          "required": true,
          "source": "web_dl",
          "type": "source"
        }
      ],
      "tests": []
    },
    "slug": "720p-web-dl",
    "filename": "720p WEB-DL.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/720p-webrip",
    "type": "custom-format",
    "data": {
      "name": "720p WEBRip",
      "description": "Matches 720p WEBRips.",
      "tags": [
        "Resolution"
      ],
      "conditions": [
        {
          "name": "720p",
          "negate": false,
          "required": true,
          "resolution": "720p",
          "type": "resolution"
        },
        {
          "name": "WEBRip",
          "negate": false,
          "required": true,
          "source": "webrip",
          "type": "source"
        }
      ],
      "tests": []
    },
    "slug": "720p-webrip",
    "filename": "720p WEBRip.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/720p",
    "type": "custom-format",
    "data": {
      "name": "720p",
      "description": "High definition resolution offering improved clarity over standard definition formats",
      "tags": [
        "High Definition",
        "Resolution"
      ],
      "conditions": [
        {
          "name": "720p",
          "type": "resolution",
          "required": true,
          "negate": false,
          "resolution": "720p"
        }
      ],
      "tests": []
    },
    "slug": "720p",
    "filename": "720p.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/amzn",
    "type": "custom-format",
    "data": {
      "name": "AMZN",
      "description": "Matches 'Amazon Prime' WEB-DLs. Negates any encodes.",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "conditions": [
        {
          "name": "AMZN Regex",
          "negate": false,
          "pattern": "Amazon Prime",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "WEB-DL",
          "negate": false,
          "required": true,
          "source": "web_dl",
          "type": "source"
        }
      ],
      "tests": [
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "AMZN Regex",
              "negate": false,
              "pattern": "Amazon Prime",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": true,
              "name": "x265",
              "negate": true,
              "pattern": "x265",
              "required": false,
              "type": "release_title"
            }
          ],
          "expected": false,
          "id": 1,
          "input": "The Bad Guys (2022) (1080p AMZN Webrip x265 10bit EAC3 5 1 - ArcX)[TAoE]",
          "lastRun": "2025-01-14T09:45:16.007149",
          "passes": true
        },
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "AMZN Regex",
              "negate": false,
              "pattern": "Amazon Prime",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": true,
              "name": "x265",
              "negate": true,
              "pattern": "x265",
              "required": false,
              "type": "release_title"
            }
          ],
          "expected": false,
          "id": 2,
          "input": "Top Gun Maverick (2022) IMAX (1080p AMZN WEB-DL x265 SDR DDP Atmos 5.1 English - Goki TAoE)",
          "lastRun": "2025-01-14T09:45:16.007149",
          "passes": true
        }
      ]
    },
    "slug": "amzn",
    "filename": "AMZN.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/atvp",
    "type": "custom-format",
    "data": {
      "name": "ATVP",
      "description": "Matches 'Apple TV+' WEB-DLs. Negates any encodes.",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "conditions": [
        {
          "name": "ATVP Regex",
          "negate": false,
          "pattern": "Apple TV+",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "WEB-DL",
          "negate": false,
          "required": true,
          "source": "web_dl",
          "type": "source"
        }
      ],
      "tests": [
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "APTV Regex",
              "negate": false,
              "pattern": "Apple TV+",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": true,
              "name": "x265",
              "negate": true,
              "pattern": "x265",
              "required": false,
              "type": "release_title"
            }
          ],
          "expected": false,
          "id": 2,
          "input": "Little America 2020 S01 1080p APTV Webrip x265 10bit EAC3 5 1 - Ainz",
          "lastRun": "2024-12-03T02:27:03.531343",
          "passes": true
        }
      ]
    },
    "slug": "atvp",
    "filename": "ATVP.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/av1",
    "type": "custom-format",
    "data": {
      "name": "AV1",
      "description": "Matches the 'AV1' Regex Pattern",
      "tags": [
        "Codec",
        "Bleeding Edge"
      ],
      "conditions": [
        {
          "name": "AV1",
          "negate": false,
          "pattern": "AV1",
          "required": true,
          "type": "release_title"
        }
      ],
      "tests": []
    },
    "slug": "av1",
    "filename": "AV1.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/atmos-missing",
    "type": "custom-format",
    "data": {
      "name": "Atmos (Missing)",
      "description": "Attempts to match releases which have Atmos (TrueHD 7.1) that don't label it correctly.",
      "tags": [
        "Audio",
        "Dolby"
      ],
      "conditions": [
        {
          "name": "7.1 Surround",
          "negate": false,
          "pattern": "7.1 Surround",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "TrueHD",
          "negate": false,
          "pattern": "TrueHD",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not Atmos",
          "negate": true,
          "pattern": "Atmos",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not Atmos (BTN)",
          "negate": true,
          "pattern": "BTN Atmos",
          "required": true,
          "type": "release_title"
        }
      ],
      "tests": [
        {
          "conditionResults": [
            {
              "matches": false,
              "name": "Not Atmos",
              "negate": true,
              "pattern": "Atmos",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": true,
              "name": "7.1 Surround",
              "negate": false,
              "pattern": "7.1 Surround",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": true,
              "name": "TrueHD",
              "negate": false,
              "pattern": "TrueHD",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": true,
              "name": "Not Atmos (BTN)",
              "negate": true,
              "pattern": "BTN Atmos",
              "required": true,
              "type": "release_title"
            }
          ],
          "expected": false,
          "id": 1,
          "input": "House.of.the.Dragon.S01.DV.2160p.BluRay.Remux.TrueHDA7.1.H.265-TekMUX",
          "lastRun": "2025-01-11T23:15:56.334239",
          "passes": true
        },
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "Not Atmos",
              "negate": true,
              "pattern": "Atmos",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": true,
              "name": "7.1 Surround",
              "negate": false,
              "pattern": "7.1 Surround",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": true,
              "name": "TrueHD",
              "negate": false,
              "pattern": "TrueHD",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not Atmos (BTN)",
              "negate": true,
              "pattern": "BTN Atmos",
              "required": true,
              "type": "release_title"
            }
          ],
          "expected": false,
          "id": 2,
          "input": "House of the Dragon S01 UHD BluRay 2160p TrueHD Atmos 7.1 DV HEVC REMUX-FraMeSToR",
          "lastRun": "2025-01-11T23:15:56.334239",
          "passes": true
        },
        {
          "conditionResults": [
            {
              "matches": false,
              "name": "Not Atmos",
              "negate": true,
              "pattern": "Atmos",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": true,
              "name": "7.1 Surround",
              "negate": false,
              "pattern": "7.1 Surround",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": true,
              "name": "TrueHD",
              "negate": false,
              "pattern": "TrueHD",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": true,
              "name": "Not Atmos (BTN)",
              "negate": true,
              "pattern": "BTN Atmos",
              "required": true,
              "type": "release_title"
            }
          ],
          "expected": false,
          "id": 3,
          "input": "Loki.S01.2160p.UHD.BluRay.Remux.TrueHDA.7.1.H.265-SiCFoI",
          "lastRun": "2025-01-11T23:15:56.334239",
          "passes": true
        }
      ]
    },
    "slug": "atmos-missing",
    "filename": "Atmos (Missing).yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/atmos",
    "type": "custom-format",
    "data": {
      "name": "Atmos",
      "description": "Matches 'Atmos' Regex Pattern",
      "tags": [
        "Audio",
        "Dolby"
      ],
      "conditions": [
        {
          "name": "Atmos",
          "negate": false,
          "pattern": "Atmos",
          "required": false,
          "type": "release_title"
        },
        {
          "name": "Atmos (BTN Standard)",
          "negate": false,
          "pattern": "BTN Atmos",
          "required": false,
          "type": "release_title"
        }
      ],
      "tests": [
        {
          "conditionResults": [
            {
              "matches": false,
              "name": "Atmos",
              "negate": false,
              "pattern": "Atmos",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": true,
              "name": "Atmos (BTN Standard)",
              "negate": false,
              "pattern": "BTN Atmos",
              "required": false,
              "type": "release_title"
            }
          ],
          "expected": true,
          "id": 1,
          "input": "House.of.the.Dragon.S01.DV.2160p.BluRay.Remux.TrueHDA7.1.H.265-TekMUX",
          "lastRun": "2025-01-11T23:15:49.211241",
          "passes": true
        },
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "Atmos",
              "negate": false,
              "pattern": "Atmos",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Atmos (BTN Standard)",
              "negate": false,
              "pattern": "BTN Atmos",
              "required": false,
              "type": "release_title"
            }
          ],
          "expected": true,
          "id": 2,
          "input": "\t House of the Dragon S01 UHD BluRay 2160p TrueHD Atmos 7.1 DV HEVC REMUX-FraMeSToR",
          "lastRun": "2025-01-11T23:15:49.211241",
          "passes": true
        },
        {
          "conditionResults": [
            {
              "matches": false,
              "name": "Atmos",
              "negate": false,
              "pattern": "Atmos",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": true,
              "name": "Atmos (BTN Standard)",
              "negate": false,
              "pattern": "BTN Atmos",
              "required": false,
              "type": "release_title"
            }
          ],
          "expected": true,
          "id": 3,
          "input": "Loki.S01.2160p.UHD.BluRay.Remux.TrueHDA.7.1.H.265-SiCFoI",
          "lastRun": "2025-01-11T23:15:49.211241",
          "passes": true
        }
      ]
    },
    "slug": "atmos",
    "filename": "Atmos.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/bw",
    "type": "custom-format",
    "data": {
      "name": "B&W",
      "description": "Matches the 'B&W' and 'Colour' Regex Pattern",
      "tags": [
        "UnWanted",
        "Colour Grade",
        "Enhancement"
      ],
      "conditions": [
        {
          "name": "B&W",
          "negate": false,
          "pattern": "B&W",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not Colour",
          "negate": true,
          "pattern": "Colourisation",
          "required": true,
          "type": "release_title"
        }
      ],
      "tests": [
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "B&W",
              "negate": false,
              "pattern": "B&W",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": true,
              "name": "Colour",
              "negate": true,
              "pattern": "Colour",
              "required": true,
              "type": "release_title"
            }
          ],
          "expected": false,
          "id": 1,
          "input": "Dracula (1931) B&W (Colourized Version)",
          "lastRun": "2025-02-13T13:14:54.830866",
          "passes": true
        }
      ]
    },
    "slug": "bw",
    "filename": "B&W.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/bcore",
    "type": "custom-format",
    "data": {
      "name": "BCORE",
      "description": "Matches 'Bravia Core' WEB-DLs. Negates any encodes.",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "conditions": [
        {
          "name": "BCORE Regex",
          "negate": false,
          "pattern": "Bravia Core",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "WEB-DL",
          "negate": false,
          "required": true,
          "source": "web_dl",
          "type": "source"
        }
      ],
      "tests": []
    },
    "slug": "bcore",
    "filename": "BCORE.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/bluray",
    "type": "custom-format",
    "data": {
      "name": "Bluray",
      "description": "Bluray is a digital optical disc format that succeeded DVD, offering significantly higher storage capacity and video quality. It gets its name from the blue-violet laser used to read the disc, which has a shorter wavelength than the red laser used in DVDs, allowing it to store more data in the same physical space. Standard Blurays (also known as BD-25 for single-layer and BD-50 for dual-layer) store 25GB or 50GB respectively, typically containing 1080p video encoded with H.264/AVC at bitrates up to 40Mbps, alongside high-quality audio formats like DTS-HD MA (up to 24.5Mbps) or Dolby TrueHD (up to 18Mbps). ",
      "tags": [
        "Source",
        "1080p"
      ],
      "conditions": [
        {
          "name": "Bluray",
          "negate": false,
          "required": true,
          "source": "bluray",
          "type": "source"
        },
        {
          "name": "Not Remux",
          "negate": true,
          "pattern": "Remux",
          "required": true,
          "type": "release_title"
        }
      ],
      "tests": [
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "Remux",
              "negate": true,
              "pattern": "Remux",
              "required": false,
              "type": "release_title"
            }
          ],
          "expected": false,
          "id": 1,
          "input": "1917 (2019) 2160p UHD BluRay REMUX HEVC DV HDR10+ TrueHD Atmos 7.1 English-FraMeSToR",
          "lastRun": "2024-12-07T00:14:33.451899",
          "passes": true
        },
        {
          "conditionResults": [
            {
              "matches": false,
              "name": "Remux",
              "negate": true,
              "pattern": "Remux",
              "required": false,
              "type": "release_title"
            }
          ],
          "expected": true,
          "id": 2,
          "input": "7.Seconds.2005.1080p.BluRay.DD+5.1.x264-playHD.mkv",
          "lastRun": "2024-12-07T00:14:33.451899",
          "passes": true
        }
      ]
    },
    "slug": "bluray",
    "filename": "Bluray.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/crit",
    "type": "custom-format",
    "data": {
      "name": "CRIT",
      "description": "Matches 'Criterion Channel' WEB-DLs. Negates any encodes.",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "conditions": [
        {
          "name": "CRiT Regex",
          "negate": false,
          "pattern": "Criterion Channel",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "WEB-DL",
          "negate": false,
          "required": true,
          "source": "web_dl",
          "type": "source"
        }
      ],
      "tests": []
    },
    "slug": "crit",
    "filename": "CRIT.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/dsnp",
    "type": "custom-format",
    "data": {
      "name": "DSNP",
      "description": "Matches 'Disney+' WEB-DLs. Negates any encodes.",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "conditions": [
        {
          "name": "DNSP Regex",
          "negate": false,
          "pattern": "Disney+",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "WEB-DL",
          "negate": false,
          "required": true,
          "source": "web_dl",
          "type": "source"
        }
      ],
      "tests": [
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "DNSP Regex",
              "negate": false,
              "pattern": "Disney+",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": true,
              "name": "x265",
              "negate": true,
              "pattern": "x265",
              "required": false,
              "type": "release_title"
            }
          ],
          "expected": false,
          "id": 1,
          "input": "The Simpsons (1989) S36E05 Treehouse of Horror XXXV (1080p DSNP Webrip x265 10bit EAC3 5 1 - Goki)[TAoE]",
          "lastRun": "2024-12-03T16:31:38.572151",
          "passes": true
        }
      ]
    },
    "slug": "dsnp",
    "filename": "DSNP.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/dts-hd-ma",
    "type": "custom-format",
    "data": {
      "name": "DTS-HD MA",
      "description": "Matches 'DTS-HD MA' Regex Pattern and negates any other audio types that might conflict.",
      "tags": [
        "Audio"
      ],
      "conditions": [
        {
          "name": "DTS-HD MA",
          "negate": false,
          "pattern": "DTS-HD MA",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not PCM",
          "negate": true,
          "pattern": "PCM",
          "required": false,
          "type": "release_title"
        },
        {
          "name": "Not AAC",
          "negate": true,
          "pattern": "AAC",
          "required": false,
          "type": "release_title"
        },
        {
          "name": "Not DTS-HD HRA ES",
          "negate": true,
          "pattern": "DTS-HD HRA ES",
          "required": false,
          "type": "release_title"
        },
        {
          "name": "Not FLAC",
          "negate": true,
          "pattern": "FLAC",
          "required": false,
          "type": "release_title"
        },
        {
          "name": "Not Dolby Digital +",
          "negate": true,
          "pattern": "Dolby Digital +",
          "required": false,
          "type": "release_title"
        },
        {
          "name": "Not TrueHD + Atmos",
          "negate": true,
          "pattern": "TrueHD + Atmos",
          "required": false,
          "type": "release_title"
        },
        {
          "name": "Not Dolby Digital",
          "negate": true,
          "pattern": "Dolby Digital",
          "required": false,
          "type": "release_title"
        },
        {
          "name": "Not DTS-X",
          "negate": true,
          "pattern": "DTS-X",
          "required": false,
          "type": "release_title"
        }
      ],
      "tests": []
    },
    "slug": "dts-hd-ma",
    "filename": "DTS-HD MA.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/dts-x",
    "type": "custom-format",
    "data": {
      "name": "DTS-X",
      "description": "Matches 'DTS-X' Regex Pattern and negates any other audio types that might conflict.",
      "tags": [
        "Audio"
      ],
      "conditions": [
        {
          "name": "DTS-X",
          "negate": false,
          "pattern": "DTS-X",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not PCM",
          "negate": true,
          "pattern": "PCM",
          "required": false,
          "type": "release_title"
        },
        {
          "name": "Not AAC",
          "negate": true,
          "pattern": "AAC",
          "required": false,
          "type": "release_title"
        },
        {
          "name": "Not FLAC",
          "negate": true,
          "pattern": "FLAC",
          "required": false,
          "type": "release_title"
        },
        {
          "name": "Not Dolby Digital +",
          "negate": true,
          "pattern": "Dolby Digital +",
          "required": false,
          "type": "release_title"
        },
        {
          "name": "Not TrueHD + Atmos",
          "negate": true,
          "pattern": "TrueHD + Atmos",
          "required": false,
          "type": "release_title"
        },
        {
          "name": "Not Dolby Digital",
          "negate": true,
          "pattern": "Dolby Digital",
          "required": false,
          "type": "release_title"
        },
        {
          "name": "Not DTS",
          "negate": true,
          "pattern": "DTS",
          "required": false,
          "type": "release_title"
        }
      ],
      "tests": []
    },
    "slug": "dts-x",
    "filename": "DTS-X.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/dts",
    "type": "custom-format",
    "data": {
      "name": "DTS",
      "description": "Matches 'DTS' Regex Pattern and negates any other audio types that might conflict.",
      "tags": [
        "Audio"
      ],
      "conditions": [
        {
          "name": "DTS",
          "negate": false,
          "pattern": "DTS",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not PCM",
          "negate": true,
          "pattern": "PCM",
          "required": false,
          "type": "release_title"
        },
        {
          "name": "Not AAC",
          "negate": true,
          "pattern": "AAC",
          "required": false,
          "type": "release_title"
        },
        {
          "name": "Not DTS-HD",
          "negate": true,
          "pattern": "DTS-HD",
          "required": false,
          "type": "release_title"
        },
        {
          "name": "Not DTS-HD HRA ES",
          "negate": true,
          "pattern": "DTS-HD HRA ES",
          "required": false,
          "type": "release_title"
        },
        {
          "name": "Not FLAC",
          "negate": true,
          "pattern": "FLAC",
          "required": false,
          "type": "release_title"
        },
        {
          "name": "Not Dolby Digital +",
          "negate": true,
          "pattern": "Dolby Digital +",
          "required": false,
          "type": "release_title"
        },
        {
          "name": "Not TrueHD + Atmos",
          "negate": true,
          "pattern": "TrueHD + Atmos",
          "required": false,
          "type": "release_title"
        },
        {
          "name": "Not Dolby Digital",
          "negate": true,
          "pattern": "Dolby Digital",
          "required": false,
          "type": "release_title"
        },
        {
          "name": "Not DTS-X",
          "negate": true,
          "pattern": "DTS-X",
          "required": false,
          "type": "release_title"
        }
      ],
      "tests": []
    },
    "slug": "dts",
    "filename": "DTS.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/dvd-remux",
    "type": "custom-format",
    "data": {
      "name": "DVD Remux",
      "description": "A DVD Remux is a direct rip of a DVD's content without any re-encoding, preserving the original video, audio, and subtitle quality. It retains the exact resolution, bitrate, and format of the DVD, ensuring no loss in fidelity compared to the source.",
      "tags": [
        "Source",
        "SD",
        "Lossless"
      ],
      "conditions": [
        {
          "name": "DVD",
          "negate": false,
          "required": true,
          "source": "dvd",
          "type": "source"
        },
        {
          "name": "Remux",
          "type": "release_title",
          "required": true,
          "negate": false,
          "pattern": "Remux"
        }
      ],
      "tests": [
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "Remux",
              "negate": false,
              "pattern": "Remux",
              "required": true,
              "type": "release_title"
            }
          ],
          "expected": true,
          "id": 1,
          "input": "Æon Flux AKA Aeon Flux S01 NTSC DVD DD5.1 MPEG-2 REMUX-GF",
          "lastRun": "2024-12-08T22:41:50.874176",
          "passes": true
        }
      ]
    },
    "slug": "dvd-remux",
    "filename": "DVD Remux.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/dvd",
    "type": "custom-format",
    "data": {
      "name": "DVD",
      "description": "The DVD format, or Digital Versatile Disc, is an optical disc storage medium widely used for video, audio, and data storage. It offers a standard capacity of 4.7 GB for single-layer discs and up to 8.5 GB for dual-layer discs, making it suitable for movies, software, and backups. DVDs provide a resolution of 720x480 (NTSC) or 720x576 (PAL) for video and support Dolby Digital or DTS audio for high-quality sound. They are compatible with standalone DVD players, computer drives, and gaming consoles, offering broad accessibility while requiring a physical disc for playback.",
      "tags": [
        "Source",
        "SD"
      ],
      "conditions": [
        {
          "name": "DVD",
          "negate": false,
          "required": true,
          "source": "dvd",
          "type": "source"
        }
      ],
      "tests": []
    },
    "slug": "dvd",
    "filename": "DVD.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/dolby-digital",
    "type": "custom-format",
    "data": {
      "name": "Dolby Digital +",
      "description": "Matches 'Dolby Digital +' Regex Pattern and negates any other audio types that might conflict.",
      "tags": [
        "Audio"
      ],
      "conditions": [
        {
          "name": "Dolby Digital +",
          "negate": false,
          "pattern": "Dolby Digital +",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not PCM",
          "negate": true,
          "pattern": "PCM",
          "required": false,
          "type": "release_title"
        },
        {
          "name": "Not AAC",
          "negate": true,
          "pattern": "AAC",
          "required": false,
          "type": "release_title"
        },
        {
          "name": "Not DTS",
          "negate": true,
          "pattern": "DTS",
          "required": false,
          "type": "release_title"
        },
        {
          "name": "Not TrueHD",
          "negate": true,
          "pattern": "TrueHD",
          "required": false,
          "type": "release_title"
        },
        {
          "name": "Not FLAC",
          "negate": true,
          "pattern": "FLAC",
          "required": false,
          "type": "release_title"
        }
      ],
      "tests": []
    },
    "slug": "dolby-digital",
    "filename": "Dolby Digital +.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/dolby-digital",
    "type": "custom-format",
    "data": {
      "name": "Dolby Digital",
      "description": "Matches 'Dolby Digital' Regex Pattern and negates any other audio types that might conflict.",
      "tags": [
        "Audio"
      ],
      "conditions": [
        {
          "name": "Dolby Digital",
          "negate": false,
          "pattern": "Dolby Digital",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not PCM",
          "negate": true,
          "pattern": "PCM",
          "required": false,
          "type": "release_title"
        },
        {
          "name": "Not AAC",
          "negate": true,
          "pattern": "AAC",
          "required": false,
          "type": "release_title"
        },
        {
          "name": "Not DTS",
          "negate": true,
          "pattern": "DTS",
          "required": false,
          "type": "release_title"
        },
        {
          "name": "Not TrueHD + Atmos",
          "negate": true,
          "pattern": "TrueHD + Atmos",
          "required": false,
          "type": "release_title"
        },
        {
          "name": "Not FLAC",
          "negate": true,
          "pattern": "FLAC",
          "required": false,
          "type": "release_title"
        },
        {
          "name": "Not Dolby Digital +",
          "type": "release_title",
          "required": false,
          "negate": true,
          "pattern": "Dolby Digital +"
        }
      ],
      "tests": []
    },
    "slug": "dolby-digital",
    "filename": "Dolby Digital.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/dolby-vision-without-fallback",
    "type": "custom-format",
    "data": {
      "name": "Dolby Vision (Without Fallback)",
      "description": "Matches the 'Dolby Vision (Without Fallback) Regex Pattern",
      "tags": [
        "Colour Grade",
        "HDR"
      ],
      "conditions": [
        {
          "name": "Dolby Vision (Without Fallback)",
          "negate": false,
          "pattern": "Dolby Vision (Without Fallback)",
          "required": true,
          "type": "release_title"
        }
      ],
      "tests": []
    },
    "slug": "dolby-vision-without-fallback",
    "filename": "Dolby Vision (Without Fallback).yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/dolby-vision",
    "type": "custom-format",
    "data": {
      "name": "Dolby Vision",
      "description": "Matches the 'Dolby Vision' Regex Pattern",
      "tags": [
        "Colour Grade",
        "HDR"
      ],
      "conditions": [
        {
          "name": "Dolby Vision",
          "negate": false,
          "pattern": "Dolby Vision",
          "required": true,
          "type": "release_title"
        }
      ],
      "tests": []
    },
    "slug": "dolby-vision",
    "filename": "Dolby Vision.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/extras",
    "type": "custom-format",
    "data": {
      "name": "Extras",
      "description": "Matches the 'Extras' Regex Pattern",
      "tags": [
        "UnWanted",
        "Enhancement"
      ],
      "conditions": [
        {
          "name": "Extras",
          "negate": false,
          "pattern": "Extras",
          "required": true,
          "type": "release_title"
        }
      ],
      "tests": []
    },
    "slug": "extras",
    "filename": "Extras.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/flac",
    "type": "custom-format",
    "data": {
      "name": "FLAC",
      "description": "Matches 'FLAC' Regex Pattern and negates any other audio types that might conflict.",
      "tags": [
        "Audio"
      ],
      "conditions": [
        {
          "name": "FLAC",
          "negate": false,
          "pattern": "FLAC",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not PCM",
          "negate": true,
          "pattern": "PCM",
          "required": false,
          "type": "release_title"
        },
        {
          "name": "Not AAC",
          "negate": true,
          "pattern": "AAC",
          "required": false,
          "type": "release_title"
        },
        {
          "name": "Not DTS",
          "negate": true,
          "pattern": "DTS",
          "required": false,
          "type": "release_title"
        },
        {
          "name": "Not TrueHD + Atmos",
          "negate": true,
          "pattern": "TrueHD + Atmos",
          "required": false,
          "type": "release_title"
        },
        {
          "name": "Not Dolby Digital",
          "negate": true,
          "pattern": "Dolby Digital",
          "required": false,
          "type": "release_title"
        },
        {
          "name": "Not Dolby Digital +",
          "negate": true,
          "pattern": "Dolby Digital +",
          "required": false,
          "type": "release_title"
        }
      ],
      "tests": []
    },
    "slug": "flac",
    "filename": "FLAC.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/free100",
    "type": "custom-format",
    "data": {
      "name": "Free100",
      "description": "Matches releases with 100% Freeleech",
      "tags": [
        "Freeleech",
        "Tweak",
        "Flag"
      ],
      "conditions": [
        {
          "flag": "freeleech",
          "name": "Free100",
          "negate": false,
          "required": true,
          "type": "indexer_flag"
        }
      ],
      "tests": []
    },
    "slug": "free100",
    "filename": "Free100.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/free25",
    "type": "custom-format",
    "data": {
      "name": "Free25",
      "description": "Matches releases with 25% Freeleech",
      "tags": [
        "Freeleech",
        "Tweak",
        "Flag"
      ],
      "conditions": [
        {
          "flag": "freeleech_25",
          "name": "Free25",
          "negate": false,
          "required": true,
          "type": "indexer_flag"
        }
      ],
      "tests": []
    },
    "slug": "free25",
    "filename": "Free25.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/free50",
    "type": "custom-format",
    "data": {
      "name": "Free50",
      "description": "Matches releases with 50% Freeleech",
      "tags": [
        "Freeleech",
        "Tweak",
        "Flag"
      ],
      "conditions": [
        {
          "flag": "halfleech",
          "name": "Free50",
          "negate": false,
          "required": true,
          "type": "indexer_flag"
        }
      ],
      "tests": []
    },
    "slug": "free50",
    "filename": "Free50.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/free75",
    "type": "custom-format",
    "data": {
      "name": "Free75",
      "description": "Matches releases with 75% Freeleech",
      "tags": [
        "Freeleech",
        "Tweak",
        "Flag"
      ],
      "conditions": [
        {
          "flag": "freeleech_75",
          "name": "Free75",
          "negate": false,
          "required": true,
          "type": "indexer_flag"
        }
      ],
      "tests": []
    },
    "slug": "free75",
    "filename": "Free75.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/full-disc-quality-match",
    "type": "custom-format",
    "data": {
      "name": "Full Disc (Quality Match)",
      "description": "Matches full discs using a quality modifier",
      "tags": [
        "Storage"
      ],
      "conditions": [
        {
          "name": "BRDISK",
          "type": "quality_modifier",
          "required": true,
          "negate": false,
          "qualityModifier": "brdisk"
        }
      ],
      "tests": []
    },
    "slug": "full-disc-quality-match",
    "filename": "Full Disc (Quality Match).yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/full-disc",
    "type": "custom-format",
    "data": {
      "name": "Full Disc",
      "description": "Matches the 'Full Disc' regex pattern and negates any remuxes / encodes. ",
      "tags": [
        "Storage"
      ],
      "conditions": [
        {
          "name": "Full Disc",
          "negate": false,
          "pattern": "Full Disc",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not WEB-DL",
          "negate": true,
          "required": true,
          "source": "web_dl",
          "type": "source"
        },
        {
          "name": "Not WEBRip",
          "negate": true,
          "required": true,
          "source": "webrip",
          "type": "source"
        },
        {
          "name": "Not Remux",
          "negate": true,
          "pattern": "Remux",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not x264",
          "negate": true,
          "pattern": "x264",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not x265",
          "negate": true,
          "pattern": "x265",
          "required": true,
          "type": "release_title"
        }
      ],
      "tests": [
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "Full Disc",
              "negate": false,
              "pattern": "Full Disc",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "x264",
              "negate": true,
              "pattern": "x264",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "x265",
              "negate": true,
              "pattern": "x265",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": true,
              "name": "Remux",
              "negate": true,
              "pattern": "Remux",
              "required": false,
              "type": "release_title"
            }
          ],
          "expected": false,
          "id": 1,
          "input": "Isolani 2017 1080p BluRay REMUX AVC DTS-HD MA 5.1-Parapluie",
          "lastRun": "2024-12-08T22:57:56.281360",
          "passes": true
        }
      ]
    },
    "slug": "full-disc",
    "filename": "Full Disc.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/hdr",
    "type": "custom-format",
    "data": {
      "name": "HDR",
      "description": "Matches the 'HDR' Regex Pattern",
      "tags": [
        "Colour Grade",
        "HDR"
      ],
      "conditions": [
        {
          "name": "HDR",
          "negate": false,
          "pattern": "HDR",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not SDR",
          "type": "release_title",
          "required": true,
          "negate": true,
          "pattern": "SDR"
        },
        {
          "name": "Not PQ",
          "type": "release_title",
          "required": true,
          "negate": true,
          "pattern": "PQ"
        },
        {
          "name": "Not HLG",
          "type": "release_title",
          "required": true,
          "negate": true,
          "pattern": "HLG"
        },
        {
          "name": "Not HDR10",
          "negate": true,
          "pattern": "HDR10",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not HDR10+",
          "negate": true,
          "pattern": "HDR10+",
          "required": true,
          "type": "release_title"
        }
      ],
      "tests": []
    },
    "slug": "hdr",
    "filename": "HDR.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/hdr10-missing-1080p",
    "type": "custom-format",
    "data": {
      "name": "HDR10 (Missing) (1080p)",
      "description": "Attempts to match HDR10 in 1080p x265 Encodes labelled with x265",
      "tags": [
        "Colour Grade",
        "HDR"
      ],
      "conditions": [
        {
          "name": "1080p",
          "negate": false,
          "required": true,
          "resolution": "1080p",
          "type": "resolution"
        },
        {
          "name": "Bluray",
          "negate": false,
          "required": true,
          "source": "bluray",
          "type": "source"
        },
        {
          "name": "Dolby Vision",
          "negate": false,
          "pattern": "Dolby Vision",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "x265",
          "negate": false,
          "pattern": "x265",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not SDR",
          "negate": true,
          "pattern": "SDR",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not PQ",
          "type": "release_title",
          "required": true,
          "negate": true,
          "pattern": "PQ"
        },
        {
          "name": "Not HLG",
          "type": "release_title",
          "required": true,
          "negate": true,
          "pattern": "HLG"
        },
        {
          "name": "Not HDR",
          "negate": true,
          "pattern": "HDR",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not HDR10",
          "negate": true,
          "pattern": "HDR10",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not HDR10+",
          "negate": true,
          "pattern": "HDR10+",
          "required": true,
          "type": "release_title"
        }
      ],
      "tests": []
    },
    "slug": "hdr10-missing-1080p",
    "filename": "HDR10 (Missing) (1080p).yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/hdr10-missing",
    "type": "custom-format",
    "data": {
      "name": "HDR10 (Missing)",
      "description": "Attempts to match HDR10 to groups that mislabel their releases. *This does not work properly in sonarr.*",
      "tags": [
        "Colour Grade",
        "HDR"
      ],
      "conditions": [
        {
          "name": "2160p",
          "negate": false,
          "required": true,
          "resolution": "2160p",
          "type": "resolution"
        },
        {
          "name": "Not WEB-DL",
          "negate": true,
          "required": true,
          "source": "web_dl",
          "type": "source"
        },
        {
          "name": "Not SDR",
          "negate": true,
          "pattern": "SDR",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not PQ",
          "negate": true,
          "pattern": "PQ",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not HLG",
          "negate": true,
          "pattern": "HLG",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not HDR",
          "negate": true,
          "pattern": "HDR",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not HDR10",
          "negate": true,
          "pattern": "HDR10",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not HDR10+",
          "negate": true,
          "pattern": "HDR10+",
          "required": true,
          "type": "release_title"
        }
      ],
      "tests": [
        {
          "conditionResults": [
            {
              "matches": false,
              "name": "Not HDR10",
              "negate": true,
              "pattern": "HDR10",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not HDR10+",
              "negate": true,
              "pattern": "HDR10+",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": true,
              "name": "Missing Groups",
              "negate": false,
              "pattern": "HDR10 (Missing Groups)",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not SDR",
              "negate": true,
              "pattern": "SDR",
              "required": true,
              "type": "release_title"
            }
          ],
          "expected": true,
          "id": 1,
          "input": "Barbie 2023 UHD BluRay 2160p TrueHD Atmos 7.1 DV HEVC HYBRID REMUX-FraMeSToR",
          "lastRun": "2025-01-11T22:58:21.736014",
          "passes": true
        },
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "Not HDR10",
              "negate": true,
              "pattern": "HDR10",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not HDR10+",
              "negate": true,
              "pattern": "HDR10+",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": true,
              "name": "Missing Groups",
              "negate": false,
              "pattern": "HDR10 (Missing Groups)",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not SDR",
              "negate": true,
              "pattern": "SDR",
              "required": true,
              "type": "release_title"
            }
          ],
          "expected": false,
          "id": 2,
          "input": "Barbie (2023) 2160p UHD BluRay Hybrid REMUX HEVC DV HDR TrueHD Atmos 7.1 English-FraMeSToR",
          "lastRun": "2025-01-11T22:58:21.736014",
          "passes": true
        },
        {
          "conditionResults": [
            {
              "matches": false,
              "name": "Not HDR10",
              "negate": true,
              "pattern": "HDR10",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not HDR10+",
              "negate": true,
              "pattern": "HDR10+",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": true,
              "name": "Missing Groups",
              "negate": false,
              "pattern": "HDR10 (Missing Groups)",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": true,
              "name": "Not SDR",
              "negate": true,
              "pattern": "SDR",
              "required": true,
              "type": "release_title"
            }
          ],
          "expected": false,
          "id": 3,
          "input": "For a Few Dollars More aka Per qualche dollaro in più 1965 UHD BluRay 2160p DTS-HD MA 5.1 SDR HEVC REMUX-FraMeSToR",
          "lastRun": "2025-01-11T22:58:21.736014",
          "passes": true
        }
      ]
    },
    "slug": "hdr10-missing",
    "filename": "HDR10 (Missing).yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/hdr10",
    "type": "custom-format",
    "data": {
      "name": "HDR10+",
      "description": "Matches the 'HDR10+' Regex Pattern",
      "tags": [
        "Colour Grade",
        "HDR"
      ],
      "conditions": [
        {
          "name": "HDR10+",
          "negate": false,
          "pattern": "HDR10+",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not SDR",
          "negate": true,
          "pattern": "SDR",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not PQ",
          "negate": true,
          "pattern": "PQ",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not HLG",
          "negate": true,
          "pattern": "HLG",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not HDR10",
          "type": "release_title",
          "required": true,
          "negate": true,
          "pattern": "HDR10"
        }
      ],
      "tests": []
    },
    "slug": "hdr10",
    "filename": "HDR10+.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/hdr10",
    "type": "custom-format",
    "data": {
      "name": "HDR10",
      "description": "Matches the 'HDR10' Regex Pattern",
      "tags": [
        "Colour Grade",
        "HDR"
      ],
      "conditions": [
        {
          "name": "HDR10",
          "negate": false,
          "pattern": "HDR10",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not SDR",
          "negate": true,
          "pattern": "SDR",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not PQ",
          "negate": true,
          "pattern": "PQ",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not HLG",
          "negate": true,
          "pattern": "HLG",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not HDR10+",
          "type": "release_title",
          "required": true,
          "negate": true,
          "pattern": "HDR10+"
        }
      ],
      "tests": []
    },
    "slug": "hdr10",
    "filename": "HDR10.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/hlg",
    "type": "custom-format",
    "data": {
      "name": "HLG",
      "description": "Matches the 'HLG' Regex Pattern",
      "tags": [
        "Colour Grade",
        "HDR"
      ],
      "conditions": [
        {
          "name": "HLG",
          "negate": false,
          "pattern": "HLG",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not SDR",
          "negate": true,
          "pattern": "SDR",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not PQ",
          "negate": true,
          "pattern": "PQ",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not HDR",
          "type": "release_title",
          "required": true,
          "negate": true,
          "pattern": "HDR"
        },
        {
          "name": "Not HDR10",
          "negate": true,
          "pattern": "HDR10",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not HDR10+",
          "negate": true,
          "pattern": "HDR10+",
          "required": true,
          "type": "release_title"
        }
      ],
      "tests": []
    },
    "slug": "hlg",
    "filename": "HLG.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/hmax",
    "type": "custom-format",
    "data": {
      "name": "HMAX",
      "description": "Matches 'HBO Max' WEB-DLs. Negates any encodes.",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "conditions": [
        {
          "name": "HMAX Regex",
          "negate": false,
          "pattern": "HBO Max",
          "required": false,
          "type": "release_title"
        },
        {
          "name": "HMAX Rename Regex",
          "type": "release_title",
          "required": false,
          "negate": false,
          "pattern": "HBO Max Rename"
        },
        {
          "name": "WEB-DL",
          "negate": false,
          "required": true,
          "source": "web_dl",
          "type": "source"
        }
      ],
      "tests": [
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "HMAX Regex",
              "negate": false,
              "pattern": "HBO Max",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": true,
              "name": "x265",
              "negate": true,
              "pattern": "x265",
              "required": false,
              "type": "release_title"
            }
          ],
          "expected": false,
          "id": 2,
          "input": "Young Justice S04 1080p HMAX WEBRip DD 5 1 x265-edge2020",
          "lastRun": "2024-12-06T04:51:30.887518",
          "passes": true
        }
      ]
    },
    "slug": "hmax",
    "filename": "HMAX.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/htsr",
    "type": "custom-format",
    "data": {
      "name": "HTSR",
      "description": "Matches 'Hotstar' WEB-DLs. Negates any encodes.",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "conditions": [
        {
          "name": "HTSR Regex",
          "negate": false,
          "pattern": "Hotstar",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "WEB-DL",
          "negate": false,
          "required": true,
          "source": "web_dl",
          "type": "source"
        }
      ],
      "tests": [
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "HTSR Regex",
              "negate": false,
              "pattern": "Hotstar",
              "required": true,
              "type": "release_title"
            }
          ],
          "expected": true,
          "id": 1,
          "input": "Bheeshma Parvam 2022 2160p HTSR WEB-DL DD+ 5.1 H.265-NOSiViD",
          "lastRun": "2025-04-21T20:09:07.037575",
          "passes": true
        }
      ]
    },
    "slug": "htsr",
    "filename": "HTSR.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/hulu",
    "type": "custom-format",
    "data": {
      "name": "HULU",
      "description": "Matches 'Hulu' WEB-DLs. Negates any encodes.",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "conditions": [
        {
          "name": "HULU Regex",
          "negate": false,
          "pattern": "Hulu",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "WEB-DL",
          "negate": false,
          "required": true,
          "source": "web_dl",
          "type": "source"
        }
      ],
      "tests": [
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "Hulu Regex",
              "negate": false,
              "pattern": "Hulu",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": true,
              "name": "x265",
              "negate": true,
              "pattern": "x265",
              "required": false,
              "type": "release_title"
            }
          ],
          "expected": false,
          "id": 1,
          "input": "Beverly Hills Ninja (1996) 1080p HULU WEB-DL x265 HEVC DDP 5.1-PHOCiS",
          "lastRun": "2024-12-06T05:29:49.598013",
          "passes": true
        }
      ]
    },
    "slug": "hulu",
    "filename": "HULU.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/iqiyi",
    "type": "custom-format",
    "data": {
      "name": "IQIYI",
      "description": "Matches 'IQIYI' WEB-DLs. Negates any encodes.",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "conditions": [
        {
          "name": "IQIYI Regex",
          "negate": false,
          "pattern": "iQIYI",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "WEB-DL",
          "negate": false,
          "required": true,
          "source": "web_dl",
          "type": "source"
        }
      ],
      "tests": [
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "SHO Regex",
              "negate": false,
              "pattern": "Showtime",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "SHO Rename Regex",
              "negate": false,
              "pattern": "Showtime Rename",
              "required": false,
              "type": "release_title"
            }
          ],
          "expected": true,
          "id": 1,
          "input": "Billions S06 2160p SHO WEB-DL DD+ 5.1 H.265-NTb",
          "lastRun": "2025-04-21T20:33:55.371437",
          "passes": true
        }
      ]
    },
    "slug": "iqiyi",
    "filename": "IQIYI.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/kcw",
    "type": "custom-format",
    "data": {
      "name": "KCW",
      "description": "Matches 'Kocowa' WEB-DLs. Negates any encodes.",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "conditions": [
        {
          "name": "KCW Regex",
          "negate": false,
          "pattern": "KCW",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "WEB-DL",
          "negate": false,
          "required": true,
          "source": "web_dl",
          "type": "source"
        }
      ],
      "tests": [
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "SHO Regex",
              "negate": false,
              "pattern": "Showtime",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "SHO Rename Regex",
              "negate": false,
              "pattern": "Showtime Rename",
              "required": false,
              "type": "release_title"
            }
          ],
          "expected": true,
          "id": 1,
          "input": "Billions S06 2160p SHO WEB-DL DD+ 5.1 H.265-NTb",
          "lastRun": "2025-04-21T20:33:55.371437",
          "passes": true
        }
      ]
    },
    "slug": "kcw",
    "filename": "KCW.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/lossless-audio-1080p",
    "type": "custom-format",
    "data": {
      "name": "Lossless Audio (1080p)",
      "description": "Matches any lossless audio track in a 1080p release.",
      "tags": [
        "Audio"
      ],
      "conditions": [
        {
          "name": "1080p",
          "negate": false,
          "required": true,
          "resolution": "1080p",
          "type": "resolution"
        },
        {
          "name": "DTS-HD MA",
          "negate": false,
          "pattern": "DTS-HD MA",
          "required": false,
          "type": "release_title"
        },
        {
          "name": "DTS-X",
          "negate": false,
          "pattern": "DTS-X",
          "required": false,
          "type": "release_title"
        },
        {
          "name": "PCM",
          "negate": false,
          "pattern": "PCM",
          "required": false,
          "type": "release_title"
        },
        {
          "name": "TrueHD",
          "negate": false,
          "pattern": "TrueHD",
          "required": false,
          "type": "release_title"
        }
      ],
      "tests": []
    },
    "slug": "lossless-audio-1080p",
    "filename": "Lossless Audio (1080p).yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/ma",
    "type": "custom-format",
    "data": {
      "name": "MA",
      "description": "Matches 'Movies Anywhere' WEB-DLs. Negates any encodes.",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "conditions": [
        {
          "name": "MA Regex",
          "negate": false,
          "pattern": "Movies Anywhere",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "WEB-DL",
          "negate": false,
          "required": true,
          "source": "web_dl",
          "type": "source"
        }
      ],
      "tests": []
    },
    "slug": "ma",
    "filename": "MA.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/max",
    "type": "custom-format",
    "data": {
      "name": "MAX",
      "description": "Matches 'Max' WEB-DLs. Negates any encodes.",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "conditions": [
        {
          "name": "MAX Regex",
          "negate": false,
          "pattern": "Max",
          "required": false,
          "type": "release_title"
        },
        {
          "name": "MAX Rename Regex",
          "type": "release_title",
          "required": false,
          "negate": false,
          "pattern": "Max Rename"
        },
        {
          "name": "WEB-DL",
          "negate": false,
          "required": true,
          "source": "web_dl",
          "type": "source"
        }
      ],
      "tests": [
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "MAX Regex",
              "negate": false,
              "pattern": "Max",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": true,
              "name": "x265",
              "negate": true,
              "pattern": "x265",
              "required": false,
              "type": "release_title"
            }
          ],
          "expected": false,
          "id": 1,
          "input": "Dune Prophecy (2024) S01E02 Two Wolves (2160p HDR10 DV Hybrid MAX Webrip x265 10bit EAC3 5 1 Atmos - Goki)[TAoE]",
          "lastRun": "2024-12-06T02:59:11.931629",
          "passes": true
        }
      ]
    },
    "slug": "max",
    "filename": "MAX.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/nf",
    "type": "custom-format",
    "data": {
      "name": "NF",
      "description": "Matches 'Netflix' WEB-DLs. Negates any encodes.",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "conditions": [
        {
          "name": "NF Regex",
          "negate": false,
          "pattern": "Netflix",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "WEB-DL",
          "negate": false,
          "required": true,
          "source": "web_dl",
          "type": "source"
        }
      ],
      "tests": [
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "NF Regex",
              "negate": false,
              "pattern": "Netflix",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": true,
              "name": "x265",
              "negate": true,
              "pattern": "x265",
              "required": false,
              "type": "release_title"
            }
          ],
          "expected": false,
          "id": 1,
          "input": "Arcane (2021) S02 (1080p NF WEB-DL x265 HEVC 10bit DDP 5 1 Vyndros)",
          "lastRun": "2024-12-06T05:05:09.422536",
          "passes": true
        }
      ]
    },
    "slug": "nf",
    "filename": "NF.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/now",
    "type": "custom-format",
    "data": {
      "name": "NOW",
      "description": "Matches 'Now' WEB-DLs. Negates any encodes.",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "conditions": [
        {
          "name": "NOW Regex",
          "negate": false,
          "pattern": "Now",
          "required": false,
          "type": "release_title"
        },
        {
          "name": "NOW Rename Regex",
          "negate": false,
          "pattern": "Now Rename",
          "required": false,
          "type": "release_title"
        },
        {
          "name": "WEB-DL",
          "negate": false,
          "required": true,
          "source": "web_dl",
          "type": "source"
        }
      ],
      "tests": [
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "NOW Regex",
              "negate": false,
              "pattern": "Now",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "NOW Rename Regex",
              "negate": false,
              "pattern": "Now Rename",
              "required": false,
              "type": "release_title"
            }
          ],
          "expected": true,
          "id": 1,
          "input": "Aisha 2022 1080p NOW WEB-DL DD+ 5.1 H.264-SMURF",
          "lastRun": "2025-04-21T20:24:08.521814",
          "passes": true
        }
      ]
    },
    "slug": "now",
    "filename": "NOW.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/non-retail-hdr",
    "type": "custom-format",
    "data": {
      "name": "Non Retail HDR",
      "description": "Matches groups who produce non-retail HDR10+ or Dolby Vision. ",
      "tags": [
        "UnWanted",
        "HDR"
      ],
      "conditions": [
        {
          "name": "HDR10+ or DoVi",
          "negate": false,
          "pattern": "Non Retail HDR Formats",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Groups",
          "negate": false,
          "pattern": "Non Retail HDR Groups",
          "required": true,
          "type": "release_title"
        }
      ],
      "tests": [
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "HDR10+ or DoVi",
              "negate": false,
              "pattern": "Non Retail HDR Formats",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": true,
              "name": "Groups",
              "negate": false,
              "pattern": "Non Retail HDR Groups",
              "required": true,
              "type": "release_title"
            }
          ],
          "expected": true,
          "id": 1,
          "input": "Longlegs 2024 2160p BluRay REMUX DTS-HD MA 5 1 DV HDR H 265-SasukeducK",
          "lastRun": "2025-01-06T14:48:25.564813",
          "passes": true
        },
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "HDR10+ or DoVi",
              "negate": false,
              "pattern": "Non Retail HDR Formats",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Groups",
              "negate": false,
              "pattern": "Non Retail HDR Groups",
              "required": true,
              "type": "release_title"
            }
          ],
          "expected": false,
          "id": 2,
          "input": "Longlegs 2024 UHD BluRay 2160p DTS-HD MA 5.1 HDR10+ HEVC HYBRID REMUX-126811",
          "lastRun": "2025-01-06T14:48:25.564813",
          "passes": true
        }
      ]
    },
    "slug": "non-retail-hdr",
    "filename": "Non Retail HDR.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/not-english",
    "type": "custom-format",
    "data": {
      "name": "Not English",
      "description": "Matches releases that don't include an English language track. Dual audio is allowed.",
      "tags": [
        "Language"
      ],
      "conditions": [
        {
          "exceptLanguage": true,
          "language": "english",
          "name": "Not English",
          "negate": false,
          "required": true,
          "type": "language"
        },
        {
          "exceptLanguage": false,
          "language": "english",
          "name": "Includes English",
          "negate": true,
          "required": true,
          "type": "language"
        }
      ],
      "tests": []
    },
    "slug": "not-english",
    "filename": "Not English.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/not-only-english-missing",
    "type": "custom-format",
    "data": {
      "name": "Not Only English (Missing)",
      "description": "Attempts to matches releases with mutliple audio tracks but are not parsed as \"Multi Langauge\". Instead, attempts to find regular expressions which imply the release has dual audio. \n ",
      "tags": [
        "Language"
      ],
      "conditions": [
        {
          "exceptLanguage": false,
          "language": "english",
          "name": "Includes English",
          "negate": false,
          "required": true,
          "type": "language"
        },
        {
          "name": "Dual Audio Regex",
          "negate": false,
          "pattern": "Dual Audio",
          "required": true,
          "type": "release_title"
        }
      ],
      "tests": []
    },
    "slug": "not-only-english-missing",
    "filename": "Not Only English (Missing).yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/not-only-english",
    "type": "custom-format",
    "data": {
      "name": "Not Only English",
      "description": "Matches releases that don't include an English language track. Dual audio is NOT allowed.",
      "tags": [
        "Language"
      ],
      "conditions": [
        {
          "exceptLanguage": true,
          "language": "english",
          "name": "Not English",
          "negate": false,
          "required": true,
          "type": "language"
        },
        {
          "exceptLanguage": false,
          "language": "english",
          "name": "Includes English",
          "negate": false,
          "required": true,
          "type": "language"
        }
      ],
      "tests": []
    },
    "slug": "not-only-english",
    "filename": "Not Only English.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/pcok",
    "type": "custom-format",
    "data": {
      "name": "PCOK",
      "description": "Matches 'Peacock' WEB-DLs. Negates any encodes.",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "conditions": [
        {
          "name": "PCOK Regex",
          "negate": false,
          "pattern": "Peacock TV",
          "required": false,
          "type": "release_title"
        },
        {
          "name": "PCOK Rename Regex",
          "type": "release_title",
          "required": false,
          "negate": false,
          "pattern": "Peacock TV Rename"
        },
        {
          "name": "WEB-DL",
          "negate": false,
          "required": true,
          "source": "web_dl",
          "type": "source"
        }
      ],
      "tests": [
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "PCOK Regex",
              "negate": false,
              "pattern": "Peacock TV",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": true,
              "name": "x265",
              "negate": true,
              "pattern": "x265",
              "required": false,
              "type": "release_title"
            }
          ],
          "expected": false,
          "id": 1,
          "input": "Based On A True Story S02 2160p PCOK WEB-DL DDP5 1 DV HDR x265-NTb",
          "lastRun": "2024-12-06T02:45:41.699916",
          "passes": true
        }
      ]
    },
    "slug": "pcok",
    "filename": "PCOK.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/pmtp",
    "type": "custom-format",
    "data": {
      "name": "PMTP",
      "description": "Matches 'Paramount+' WEB-DLs. Negates any encodes.",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "conditions": [
        {
          "name": "PMTP Regex",
          "negate": false,
          "pattern": "Paramount+",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "WEB-DL",
          "negate": false,
          "required": true,
          "source": "web_dl",
          "type": "source"
        }
      ],
      "tests": [
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "PMTP Regex",
              "negate": false,
              "pattern": "Paramount+",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": true,
              "name": "x265",
              "negate": true,
              "pattern": "x265",
              "required": false,
              "type": "release_title"
            }
          ],
          "expected": false,
          "id": 2,
          "input": "Evil 2019 S04 1080p PMTP WEB-DL DDP 5 1 x265 - YELLO",
          "lastRun": "2024-12-06T05:11:34.055223",
          "passes": true
        }
      ]
    },
    "slug": "pmtp",
    "filename": "PMTP.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/pq",
    "type": "custom-format",
    "data": {
      "name": "PQ",
      "description": "Matches the 'PQ' Regex Pattern",
      "tags": [
        "Colour Grade",
        "HDR"
      ],
      "conditions": [
        {
          "name": "PQ",
          "negate": false,
          "pattern": "PQ",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not SDR",
          "negate": true,
          "pattern": "SDR",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not HLG",
          "negate": true,
          "pattern": "HLG",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "HDR",
          "type": "release_title",
          "required": true,
          "negate": true,
          "pattern": "HDR"
        },
        {
          "name": "Not HDR10",
          "negate": true,
          "pattern": "HDR10",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not HDR10+",
          "negate": true,
          "pattern": "HDR10+",
          "required": true,
          "type": "release_title"
        }
      ],
      "tests": []
    },
    "slug": "pq",
    "filename": "PQ.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/roku",
    "type": "custom-format",
    "data": {
      "name": "ROKU",
      "description": "Matches 'Roku' WEB-DLs. Negates any encodes.",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "conditions": [
        {
          "name": "ROKU Regex",
          "negate": false,
          "pattern": "Roku",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "WEB-DL",
          "negate": false,
          "required": true,
          "source": "web_dl",
          "type": "source"
        }
      ],
      "tests": [
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "Roku Regex",
              "negate": false,
              "pattern": "Roku",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": true,
              "name": "x265",
              "negate": true,
              "pattern": "x265",
              "required": false,
              "type": "release_title"
            }
          ],
          "expected": false,
          "id": 2,
          "input": "Almost Heroes (1998) 1080p ROKU WEB-DL x265 HEVC AAC 2.0-PHOCiS",
          "lastRun": "2024-12-06T05:41:18.535555",
          "passes": true
        }
      ]
    },
    "slug": "roku",
    "filename": "ROKU.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/remux-tier-1",
    "type": "custom-format",
    "data": {
      "name": "Remux Tier 1",
      "description": "Matches release groups who fall under Remux Tier 1",
      "tags": [
        "Release Groups",
        "Remux"
      ],
      "conditions": [
        {
          "name": "Remux",
          "negate": false,
          "pattern": "Remux",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not DVD",
          "negate": true,
          "required": true,
          "source": "dvd",
          "type": "source"
        },
        {
          "name": "3L",
          "negate": false,
          "pattern": "3L",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "BiZKiT",
          "type": "release_group",
          "required": false,
          "negate": false,
          "pattern": "BiZKiT"
        },
        {
          "name": "BLURANiUM",
          "negate": false,
          "pattern": "BLURANiUM",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "CiNEPHiLES",
          "negate": false,
          "pattern": "CiNEPHiLES",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "WiLDCAT",
          "negate": false,
          "pattern": "WiLDCAT",
          "required": false,
          "type": "release_group"
        }
      ],
      "tests": []
    },
    "slug": "remux-tier-1",
    "filename": "Remux Tier 1.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/remux-tier-2",
    "type": "custom-format",
    "data": {
      "name": "Remux Tier 2",
      "description": "Matches release groups who fall under Remux Tier 2",
      "tags": [
        "Release Groups",
        "Remux"
      ],
      "conditions": [
        {
          "name": "Remux",
          "negate": false,
          "pattern": "Remux",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not DVD",
          "negate": true,
          "required": true,
          "source": "dvd",
          "type": "source"
        },
        {
          "name": "BMF",
          "negate": false,
          "pattern": "BMF",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "FraMeSToR",
          "negate": false,
          "pattern": "FraMeSToR",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "LM",
          "negate": false,
          "pattern": "LM",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "PmP",
          "negate": false,
          "pattern": "PmP",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "PP",
          "negate": false,
          "pattern": "PP",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "ZQ",
          "negate": false,
          "pattern": "ZQ",
          "required": false,
          "type": "release_group"
        }
      ],
      "tests": []
    },
    "slug": "remux-tier-2",
    "filename": "Remux Tier 2.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/remux-tier-3",
    "type": "custom-format",
    "data": {
      "name": "Remux Tier 3",
      "description": "Matches release groups who fall under Remux Tier 3",
      "tags": [
        "Release Groups",
        "Remux"
      ],
      "conditions": [
        {
          "name": "Remux",
          "negate": false,
          "pattern": "Remux",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not DVD",
          "negate": true,
          "required": true,
          "source": "dvd",
          "type": "source"
        },
        {
          "name": "decibeL",
          "negate": false,
          "pattern": "decibeL",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "EPSiLON",
          "negate": false,
          "pattern": "EPSiLON",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "HiFi",
          "negate": false,
          "pattern": "HiFi",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "NCmt",
          "negate": false,
          "pattern": "NCmt",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "SiCFoI",
          "type": "release_group",
          "required": false,
          "negate": false,
          "pattern": "SiCFoI"
        },
        {
          "name": "TEPES",
          "negate": false,
          "pattern": "TEPES",
          "required": false,
          "type": "release_group"
        }
      ],
      "tests": []
    },
    "slug": "remux-tier-3",
    "filename": "Remux Tier 3.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/remux-tier-4",
    "type": "custom-format",
    "data": {
      "name": "Remux Tier 4",
      "description": "Matches release groups who fall under Remux Tier 4",
      "tags": [
        "Release Groups",
        "Remux"
      ],
      "conditions": [
        {
          "name": "Remux",
          "negate": false,
          "pattern": "Remux",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not DVD",
          "negate": true,
          "required": true,
          "source": "dvd",
          "type": "source"
        },
        {
          "name": "BTN",
          "negate": false,
          "pattern": "BTN",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "iFT",
          "negate": false,
          "pattern": "iFT",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "KRaLiMaRKo",
          "negate": false,
          "pattern": "KRaLiMaRKo",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "playBD",
          "negate": false,
          "pattern": "playBD",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "PTP",
          "negate": false,
          "pattern": "PTP",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "TRiToN",
          "negate": false,
          "pattern": "TRiToN",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "ZoroSenpai",
          "type": "release_group",
          "required": false,
          "negate": false,
          "pattern": "ZoroSenpai"
        }
      ],
      "tests": []
    },
    "slug": "remux-tier-4",
    "filename": "Remux Tier 4.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/remux",
    "type": "custom-format",
    "data": {
      "name": "Remux",
      "description": "Matches Remux as a codec, not a source. Either h265 or h264.",
      "tags": [
        "Codec"
      ],
      "conditions": [
        {
          "name": "Remux",
          "negate": false,
          "pattern": "Remux",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not DVD",
          "negate": true,
          "required": true,
          "source": "dvd",
          "type": "source"
        }
      ],
      "tests": []
    },
    "slug": "remux",
    "filename": "Remux.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/repack1",
    "type": "custom-format",
    "data": {
      "name": "Repack1",
      "description": "Release groups use specific terms to indicate when they're fixing issues in releases:\nIn Scene releases, groups can only occupy one release slot, which leads to two different terms:\n- PROPER is used when a different group fixes issues in another group's release\n- REPACK is used when a group fixes issues in their own release\n\nP2P releases are simpler - REPACK is typically used whenever a group releases a fixed version.\n\nREAL / RERIP indicate similar things but their specific meaning / origin is unclear.\n\nThis custom format will catch basic level fixes (no number suffixes).",
      "tags": [
        "Flag",
        "Repack"
      ],
      "conditions": [
        {
          "name": "Repack1",
          "negate": false,
          "pattern": "Repack1",
          "required": true,
          "type": "release_title"
        }
      ],
      "tests": []
    },
    "slug": "repack1",
    "filename": "Repack1.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/repack2",
    "type": "custom-format",
    "data": {
      "name": "Repack2",
      "description": "Release groups use specific terms to indicate when they're fixing issues in releases:\nIn Scene releases, groups can only occupy one release slot, which leads to two different terms:\n- PROPER is used when a different group fixes issues in another group's release\n- REPACK is used when a group fixes issues in their own release\n\nP2P releases are simpler - REPACK is typically used whenever a group releases a fixed version.\n\nREAL / RERIP indicate similar things but their specific meaning / origin is unclear.\n\nThis custom format will catch level 2 fixes",
      "tags": [
        "Flag",
        "Repack"
      ],
      "conditions": [
        {
          "name": "Repack2",
          "negate": false,
          "pattern": "Repack2",
          "required": true,
          "type": "release_title"
        }
      ],
      "tests": []
    },
    "slug": "repack2",
    "filename": "Repack2.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/repack3",
    "type": "custom-format",
    "data": {
      "name": "Repack3",
      "description": "Release groups use specific terms to indicate when they're fixing issues in releases:\nIn Scene releases, groups can only occupy one release slot, which leads to two different terms:\n- PROPER is used when a different group fixes issues in another group's release\n- REPACK is used when a group fixes issues in their own release\n\nP2P releases are simpler - REPACK is typically used whenever a group releases a fixed version.\n\nREAL / RERIP indicate similar things but their specific meaning / origin is unclear.\n\nThis custom format will catch level 3 fixes",
      "tags": [
        "Flag",
        "Repack"
      ],
      "conditions": [
        {
          "name": "Repack3",
          "negate": false,
          "pattern": "Repack3",
          "required": true,
          "type": "release_title"
        }
      ],
      "tests": []
    },
    "slug": "repack3",
    "filename": "Repack3.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/sd-golden-popcorn",
    "type": "custom-format",
    "data": {
      "name": "SD Golden Popcorn",
      "description": "Matches SD Golden Popcorns. Only works on PassThePopcorn",
      "tags": [
        "Flag",
        "Golden Popcorn"
      ],
      "conditions": [
        {
          "flag": "ptp_golden",
          "name": "Golden Popcorn",
          "negate": false,
          "required": true,
          "type": "indexer_flag"
        },
        {
          "name": "Not 2160p",
          "negate": true,
          "required": true,
          "resolution": "2160p",
          "type": "resolution"
        },
        {
          "name": "Not 1080p",
          "negate": true,
          "required": true,
          "resolution": "1080p",
          "type": "resolution"
        },
        {
          "name": "Not 720p",
          "negate": true,
          "required": true,
          "resolution": "720p",
          "type": "resolution"
        }
      ],
      "tests": []
    },
    "slug": "sd-golden-popcorn",
    "filename": "SD Golden Popcorn.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/sd-quality-tier-1",
    "type": "custom-format",
    "data": {
      "name": "SD Quality Tier 1",
      "description": "Matches release groups who fall under SD GPPi Tier 1",
      "tags": [
        "GPPi",
        "Release Group Tier",
        "SD",
        "Quality"
      ],
      "conditions": [
        {
          "name": "DVD",
          "negate": false,
          "required": true,
          "source": "dvd",
          "type": "source"
        },
        {
          "name": "TBB",
          "negate": false,
          "pattern": "TBB",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "Dariush",
          "negate": false,
          "pattern": "Dariush",
          "required": false,
          "type": "release_group"
        }
      ],
      "tests": []
    },
    "slug": "sd-quality-tier-1",
    "filename": "SD Quality Tier 1.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/sd-quality-tier-2",
    "type": "custom-format",
    "data": {
      "name": "SD Quality Tier 2",
      "description": "Matches release groups who fall under SD GPPi Tier 2",
      "tags": [
        "GPPi",
        "Release Group Tier",
        "SD",
        "Quality"
      ],
      "conditions": [
        {
          "name": "DVD",
          "negate": false,
          "required": true,
          "source": "dvd",
          "type": "source"
        },
        {
          "name": "HANDJOB",
          "negate": false,
          "pattern": "HANDJOB",
          "required": false,
          "type": "release_group"
        }
      ],
      "tests": []
    },
    "slug": "sd-quality-tier-2",
    "filename": "SD Quality Tier 2.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/sdr",
    "type": "custom-format",
    "data": {
      "name": "SDR",
      "description": "Attempts to match Standard Dynamic Range by negating any known HDR formats",
      "tags": [
        "Colour Grade",
        "HDR"
      ],
      "conditions": [
        {
          "name": "2160p",
          "negate": false,
          "required": true,
          "resolution": "2160p",
          "type": "resolution"
        },
        {
          "name": "WEB-DL",
          "negate": false,
          "required": true,
          "source": "web_dl",
          "type": "source"
        },
        {
          "name": "Not PQ",
          "type": "release_title",
          "required": true,
          "negate": true,
          "pattern": "PQ"
        },
        {
          "name": "Not HLG",
          "type": "release_title",
          "required": true,
          "negate": true,
          "pattern": "HLG"
        },
        {
          "name": "Not HDR",
          "negate": true,
          "pattern": "HDR",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not HDR10",
          "negate": true,
          "pattern": "HDR10",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not HDR10+",
          "negate": true,
          "pattern": "HDR10+",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not Dolby Vision",
          "negate": true,
          "pattern": "Dolby Vision",
          "required": true,
          "type": "release_title"
        }
      ],
      "tests": []
    },
    "slug": "sdr",
    "filename": "SDR.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/sho",
    "type": "custom-format",
    "data": {
      "name": "SHO",
      "description": "Matches 'Showtime' WEB-DLs. Negates any encodes.",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "conditions": [
        {
          "name": "SHO Regex",
          "negate": false,
          "pattern": "Showtime",
          "required": false,
          "type": "release_title"
        },
        {
          "name": "SHO Rename Regex",
          "negate": false,
          "pattern": "Showtime Rename",
          "required": false,
          "type": "release_title"
        },
        {
          "name": "WEB-DL",
          "negate": false,
          "required": true,
          "source": "web_dl",
          "type": "source"
        }
      ],
      "tests": [
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "SHO Regex",
              "negate": false,
              "pattern": "Showtime",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "SHO Rename Regex",
              "negate": false,
              "pattern": "Showtime Rename",
              "required": false,
              "type": "release_title"
            }
          ],
          "expected": true,
          "id": 1,
          "input": "Billions S06 2160p SHO WEB-DL DD+ 5.1 H.265-NTb",
          "lastRun": "2025-04-21T20:33:55.371437",
          "passes": true
        }
      ]
    },
    "slug": "sho",
    "filename": "SHO.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/stan",
    "type": "custom-format",
    "data": {
      "name": "STAN",
      "description": "Matches 'STAN' WEB-DLs. Negates any encodes.",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "conditions": [
        {
          "name": "STAN Regex",
          "negate": false,
          "pattern": "Stan",
          "required": false,
          "type": "release_title"
        },
        {
          "name": "STAN Rename Regex",
          "negate": false,
          "pattern": "Stan Rename",
          "required": false,
          "type": "release_title"
        },
        {
          "name": "WEB-DL",
          "negate": false,
          "required": true,
          "source": "web_dl",
          "type": "source"
        }
      ],
      "tests": [
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "STAN Regex",
              "negate": false,
              "pattern": "Stan",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "STAN Rename Regex",
              "negate": false,
              "pattern": "Stan Rename",
              "required": false,
              "type": "release_title"
            }
          ],
          "expected": true,
          "id": 1,
          "input": "Scrublands S02 2160p STAN WEB-DL DD+ 5.1 Atmos H.265-RAWR",
          "lastRun": "2025-04-21T20:26:28.890603",
          "passes": true
        }
      ]
    },
    "slug": "stan",
    "filename": "STAN.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/season-pack",
    "type": "custom-format",
    "data": {
      "name": "Season Pack",
      "description": "Matches Season Pack Release Type on Sonarr",
      "tags": [
        "Enhancements"
      ],
      "conditions": [
        {
          "name": "Season Pack",
          "type": "release_type",
          "required": true,
          "negate": false,
          "releaseType": "season_pack"
        }
      ],
      "tests": []
    },
    "slug": "season-pack",
    "filename": "Season Pack.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/special-edition-unwanted",
    "type": "custom-format",
    "data": {
      "name": "Special Edition (UnWanted)",
      "description": "Matches Special Edition only for specific movies where the theatrical edition is preferred.\n\n- **Note:** This custom format doesn't work because release titles only match after the parsed movie title: https://github.com/Radarr/Radarr/issues/4859",
      "tags": [
        "UnWanted",
        "Edition"
      ],
      "conditions": [
        {
          "name": "Special Edition",
          "negate": false,
          "pattern": "Special Edition",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Better Theatricals",
          "negate": false,
          "pattern": "Better Theatricals",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not IMAX",
          "negate": true,
          "pattern": "IMAX",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not Open Matte",
          "negate": true,
          "pattern": "Open Matte",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not Theatrical Edition",
          "negate": true,
          "pattern": "Theatrical Edition",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not Extended Clip",
          "negate": true,
          "pattern": "Extended Clip",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not Sing Along",
          "negate": true,
          "pattern": "Sing Along",
          "required": true,
          "type": "release_title"
        }
      ],
      "tests": [
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "Special Edition",
              "negate": false,
              "pattern": "Special Edition",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not IMAX",
              "negate": true,
              "pattern": "IMAX",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not Open Matte",
              "negate": true,
              "pattern": "Open Matte",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not Theatrical Edition",
              "negate": true,
              "pattern": "Theatrical Edition",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not Extended Clip",
              "negate": true,
              "pattern": "Extended Clip",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not Sing Along",
              "negate": true,
              "pattern": "Sing Along",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Better Theatricals",
              "negate": false,
              "pattern": "Better Theatricals",
              "required": true,
              "type": "release_title"
            }
          ],
          "expected": false,
          "id": 1,
          "input": "Aliens.1986.Special.Edition.UHD.BluRay.2160p.TrueHD.Atmos.7.1.DV.HEVC.REMUX-FraMeSToR.mkv",
          "lastRun": "2025-02-26T05:09:24.304288",
          "passes": true
        },
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "Special Edition",
              "negate": false,
              "pattern": "Special Edition",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not IMAX",
              "negate": true,
              "pattern": "IMAX",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not Open Matte",
              "negate": true,
              "pattern": "Open Matte",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not Theatrical Edition",
              "negate": true,
              "pattern": "Theatrical Edition",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not Extended Clip",
              "negate": true,
              "pattern": "Extended Clip",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not Sing Along",
              "negate": true,
              "pattern": "Sing Along",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": true,
              "name": "Better Theatricals",
              "negate": false,
              "pattern": "Better Theatricals",
              "required": true,
              "type": "release_title"
            }
          ],
          "expected": true,
          "id": 2,
          "input": "Alien.1979.Directors.Cut.UHD.BluRay.2160p.DTS-HD.MA.5.1.HEVC.REMUX-FraMeSToR.mkv",
          "lastRun": "2025-02-26T05:09:24.304288",
          "passes": true
        },
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "Special Edition",
              "negate": false,
              "pattern": "Special Edition",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not IMAX",
              "negate": true,
              "pattern": "IMAX",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not Open Matte",
              "negate": true,
              "pattern": "Open Matte",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not Theatrical Edition",
              "negate": true,
              "pattern": "Theatrical Edition",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not Extended Clip",
              "negate": true,
              "pattern": "Extended Clip",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not Sing Along",
              "negate": true,
              "pattern": "Sing Along",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": true,
              "name": "Better Theatricals",
              "negate": false,
              "pattern": "Better Theatricals",
              "required": true,
              "type": "release_title"
            }
          ],
          "expected": true,
          "id": 3,
          "input": "Donnie.Darko.2001.Director's.Cut.UHD.BluRay.2160p.DTS-HD.MA.5.1.DV.HEVC.REMUX-FraMeSToR.mkv",
          "lastRun": "2025-02-26T05:09:24.304288",
          "passes": true
        },
        {
          "conditionResults": [
            {
              "matches": false,
              "name": "Special Edition",
              "negate": false,
              "pattern": "Special Edition",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not IMAX",
              "negate": true,
              "pattern": "IMAX",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not Open Matte",
              "negate": true,
              "pattern": "Open Matte",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not Theatrical Edition",
              "negate": true,
              "pattern": "Theatrical Edition",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not Extended Clip",
              "negate": true,
              "pattern": "Extended Clip",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not Sing Along",
              "negate": true,
              "pattern": "Sing Along",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": true,
              "name": "Better Theatricals",
              "negate": false,
              "pattern": "Better Theatricals",
              "required": true,
              "type": "release_title"
            }
          ],
          "expected": false,
          "id": 4,
          "input": "Donnie.Darko.2001.2160p.UHD.Blu-ray.Remux.HEVC.HDR.DoVi.DTS-HD.MA.5.1-ARROW4KDV.mkv",
          "lastRun": "2025-02-26T05:09:24.304288",
          "passes": true
        },
        {
          "conditionResults": [
            {
              "matches": false,
              "name": "Special Edition",
              "negate": false,
              "pattern": "Special Edition",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not IMAX",
              "negate": true,
              "pattern": "IMAX",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not Open Matte",
              "negate": true,
              "pattern": "Open Matte",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not Theatrical Edition",
              "negate": true,
              "pattern": "Theatrical Edition",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not Extended Clip",
              "negate": true,
              "pattern": "Extended Clip",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not Sing Along",
              "negate": true,
              "pattern": "Sing Along",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Better Theatricals",
              "negate": false,
              "pattern": "Better Theatricals",
              "required": true,
              "type": "release_title"
            }
          ],
          "expected": false,
          "id": 5,
          "input": " Star.Wars.4K77.2160p.UHD.No-DNR.35mm.x265-v1.4.mkv",
          "lastRun": "2025-02-26T05:09:24.304288",
          "passes": true
        },
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "Special Edition",
              "negate": false,
              "pattern": "Special Edition",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not IMAX",
              "negate": true,
              "pattern": "IMAX",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not Open Matte",
              "negate": true,
              "pattern": "Open Matte",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not Theatrical Edition",
              "negate": true,
              "pattern": "Theatrical Edition",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not Extended Clip",
              "negate": true,
              "pattern": "Extended Clip",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not Sing Along",
              "negate": true,
              "pattern": "Sing Along",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": true,
              "name": "Better Theatricals",
              "negate": false,
              "pattern": "Better Theatricals",
              "required": true,
              "type": "release_title"
            }
          ],
          "expected": true,
          "id": 6,
          "input": "Alien 1979 Directors Cut HYBRID 2160p BluRay REMUX HEVC DV-HDR10Plus DTS-HD MA 5 1-Flights",
          "lastRun": "2025-02-26T05:09:24.304288",
          "passes": true
        }
      ]
    },
    "slug": "special-edition-unwanted",
    "filename": "Special Edition (UnWanted).yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/special-edition",
    "type": "custom-format",
    "data": {
      "name": "Special Edition",
      "description": "Special editions are modified versions of movies released after the original theatrical version.\n\n• They exist because filmmakers want to present their `true vision`, `fix problems`, or because studios want to make more money\n• You'll see them with names like `Director's Cut`, `Extended Edition`, or creative marketing labels like `Ultimate Cut`\n• A single film can have `multiple special editions` as technology improves or different creative perspectives emerge",
      "tags": [
        "Edition"
      ],
      "conditions": [
        {
          "name": "Special Edition",
          "negate": false,
          "pattern": "Special Edition",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not IMAX",
          "negate": true,
          "pattern": "IMAX",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not Open Matte",
          "negate": true,
          "pattern": "Open Matte",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not Theatrical Edition",
          "negate": true,
          "pattern": "Theatrical Edition",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not Extended Clip",
          "negate": true,
          "pattern": "Extended Clip",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not Sing Along",
          "negate": true,
          "pattern": "Sing Along",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not Theatrical Preferred",
          "negate": true,
          "pattern": "Better Theatricals",
          "required": true,
          "type": "release_title"
        }
      ],
      "tests": [
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "Special Edition",
              "negate": false,
              "pattern": "Special Edition",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not IMAX",
              "negate": true,
              "pattern": "IMAX",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not Open Matte",
              "negate": true,
              "pattern": "Open Matte",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not Theatrical Edition",
              "negate": true,
              "pattern": "Theatrical Edition",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not Extended Clip",
              "negate": true,
              "pattern": "Extended Clip",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not Sing Along",
              "negate": true,
              "pattern": "Sing Along",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not Theatrical Preferred",
              "negate": true,
              "pattern": "Better Theatricals",
              "required": true,
              "type": "release_title"
            }
          ],
          "expected": true,
          "id": 1,
          "input": "Blade.Runner.The.Final.Cut.1982.BluRay.CEE.1080p.VC-1.TrueHD.5.1-Gazdi",
          "lastRun": "2025-02-26T05:09:12.646645",
          "passes": true
        },
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "Special Edition",
              "negate": false,
              "pattern": "Special Edition",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not IMAX",
              "negate": true,
              "pattern": "IMAX",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not Open Matte",
              "negate": true,
              "pattern": "Open Matte",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not Theatrical Edition",
              "negate": true,
              "pattern": "Theatrical Edition",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not Extended Clip",
              "negate": true,
              "pattern": "Extended Clip",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": true,
              "name": "Not Sing Along",
              "negate": true,
              "pattern": "Sing Along",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not Theatrical Preferred",
              "negate": true,
              "pattern": "Better Theatricals",
              "required": true,
              "type": "release_title"
            }
          ],
          "expected": false,
          "id": 2,
          "input": "Wicked 2024 Sing-Along Version 720p MA WEB-DL DDP 5.1 H.264-FLUX",
          "lastRun": "2025-02-26T05:09:12.646645",
          "passes": true
        },
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "Special Edition",
              "negate": false,
              "pattern": "Special Edition",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not IMAX",
              "negate": true,
              "pattern": "IMAX",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not Open Matte",
              "negate": true,
              "pattern": "Open Matte",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not Theatrical Edition",
              "negate": true,
              "pattern": "Theatrical Edition",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not Extended Clip",
              "negate": true,
              "pattern": "Extended Clip",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "Not Sing Along",
              "negate": true,
              "pattern": "Sing Along",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": true,
              "name": "Not Theatrical Preferred",
              "negate": true,
              "pattern": "Better Theatricals",
              "required": true,
              "type": "release_title"
            }
          ],
          "expected": false,
          "id": 3,
          "input": "Alien 1979 Directors Cut HYBRID 2160p BluRay REMUX HEVC DV-HDR10Plus DTS-HD MA 5 1-Flights",
          "lastRun": "2025-02-26T05:09:12.646645",
          "passes": true
        }
      ]
    },
    "slug": "special-edition",
    "filename": "Special Edition.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/tving",
    "type": "custom-format",
    "data": {
      "name": "TVING",
      "description": "Matches 'TVING' WEB-DLs. Negates any encodes.",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "conditions": [
        {
          "name": "TVING Regex",
          "negate": false,
          "pattern": "TVING",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "WEB-DL",
          "negate": false,
          "required": true,
          "source": "web_dl",
          "type": "source"
        }
      ],
      "tests": [
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "SHO Regex",
              "negate": false,
              "pattern": "Showtime",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "SHO Rename Regex",
              "negate": false,
              "pattern": "Showtime Rename",
              "required": false,
              "type": "release_title"
            }
          ],
          "expected": true,
          "id": 1,
          "input": "Billions S06 2160p SHO WEB-DL DD+ 5.1 H.265-NTb",
          "lastRun": "2025-04-21T20:33:55.371437",
          "passes": true
        }
      ]
    },
    "slug": "tving",
    "filename": "TVING.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/truehd-missing",
    "type": "custom-format",
    "data": {
      "name": "TrueHD (Missing)",
      "description": "Attempts to match TrueHD releases which are not labelled correctly (TRiTON, EPSiLON groups)",
      "tags": [
        "Audio"
      ],
      "conditions": [
        {
          "name": "2160p",
          "negate": false,
          "required": true,
          "resolution": "2160p",
          "type": "resolution"
        },
        {
          "name": "Remux",
          "negate": false,
          "pattern": "Remux",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "TrueHD Missing Groups",
          "negate": false,
          "pattern": "TrueHD (Missing Groups)",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not DTS-HD",
          "negate": true,
          "pattern": "DTS-HD",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not DTS-X",
          "negate": true,
          "pattern": "DTS-X",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not TrueHD",
          "negate": true,
          "pattern": "TrueHD",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not FLAC",
          "negate": true,
          "pattern": "FLAC",
          "required": true,
          "type": "release_title"
        }
      ],
      "tests": []
    },
    "slug": "truehd-missing",
    "filename": "TrueHD (Missing).yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/truehd",
    "type": "custom-format",
    "data": {
      "name": "TrueHD",
      "description": "Matches 'TrueHD' Regex Pattern and negates any other audio types that might conflict.",
      "tags": [
        "Audio"
      ],
      "conditions": [
        {
          "name": "TrueHD",
          "negate": false,
          "pattern": "TrueHD",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not DTS",
          "negate": true,
          "pattern": "DTS",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not Dolby Digital",
          "negate": true,
          "pattern": "Dolby Digital",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not FLAC",
          "negate": true,
          "pattern": "FLAC",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not Dolby Digital +",
          "negate": true,
          "pattern": "Dolby Digital +",
          "required": true,
          "type": "release_title"
        }
      ],
      "tests": []
    },
    "slug": "truehd",
    "filename": "TrueHD.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/uhd-bluray-missing",
    "type": "custom-format",
    "data": {
      "name": "UHD Bluray (Missing)",
      "description": "Attempts to match UHD Bluray as a source when not included in the release title",
      "tags": [
        "2160p",
        "Storage"
      ],
      "conditions": [
        {
          "name": "1080p",
          "negate": false,
          "required": true,
          "resolution": "1080p",
          "type": "resolution"
        },
        {
          "name": "HDR",
          "negate": false,
          "pattern": "Basic HDR Formats",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Release Groups",
          "negate": false,
          "pattern": "UHD Bluray (Missing Groups)",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "Not UHD Bluray",
          "negate": true,
          "pattern": "UHD Blu-ray",
          "required": true,
          "type": "release_title"
        }
      ],
      "tests": [
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "Release Groups",
              "negate": false,
              "pattern": "UHD Bluray (Missing Groups)",
              "required": true,
              "type": "release_group"
            },
            {
              "matches": false,
              "name": "Not UHD Blu-ray",
              "negate": true,
              "pattern": "UHD Blu-ray",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": true,
              "name": "HDR",
              "negate": false,
              "pattern": "Basic HDR Formats",
              "required": true,
              "type": "release_title"
            }
          ],
          "expected": true,
          "id": 1,
          "input": "Training Day 2001 1080p BluRay DDP 7 1 HDR x265-LEGi0N",
          "lastRun": "2025-01-14T09:32:13.794103",
          "passes": true
        }
      ]
    },
    "slug": "uhd-bluray-missing",
    "filename": "UHD Bluray (Missing).yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/uhd-bluray",
    "type": "custom-format",
    "data": {
      "name": "UHD Bluray",
      "description": "UHD Blu-ray is a digital optical disc format released in 2016. It stores 66GB on triple-layer discs or 100GB on quad-layer discs, compared to standard Blu-ray's 25GB/50GB capacity. The format delivers 3840x2160 (4K) resolution video using HEVC (H.265) encoding at bitrates up to 128Mbps. All UHD Blu-rays include HDR10 support, with some releases adding Dolby Vision or HDR10+. The format uses the BT.2020 color space and 10-bit color depth, while supporting audio formats like Dolby Atmos, DTS:X, DTS-HD MA, and Dolby TrueHD. UHD Blu-ray players require HDMI 2.0a and HDCP 2.2 compliant displays to show 4K HDR content.",
      "tags": [
        "2160p",
        "Storage"
      ],
      "conditions": [
        {
          "name": "UHD Bluray",
          "negate": false,
          "pattern": "UHD Blu-ray",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "HDR",
          "negate": false,
          "pattern": "Basic HDR Formats",
          "required": true,
          "type": "release_title"
        }
      ],
      "tests": [
        {
          "conditionResults": [
            {
              "matches": false,
              "name": "UHD Blu-ray",
              "negate": false,
              "pattern": "UHD Blu-ray",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": true,
              "name": "HDR",
              "negate": false,
              "pattern": "Basic HDR Formats",
              "required": true,
              "type": "release_title"
            }
          ],
          "expected": false,
          "id": 2,
          "input": "Avatar: The Way of Water [2022] 2160p HEVC WEB-DL HDR10+ -CMRG",
          "lastRun": "2025-01-13T08:53:49.334557",
          "passes": true
        },
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "UHD Blu-ray",
              "negate": false,
              "pattern": "UHD Blu-ray",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": true,
              "name": "HDR",
              "negate": false,
              "pattern": "Basic HDR Formats",
              "required": true,
              "type": "release_title"
            }
          ],
          "expected": true,
          "id": 3,
          "input": "Avatar.The.Way.of.Water.2022.1080p.UHD.BluRay.DDP7.1.HDR10.x265-GALAXY",
          "lastRun": "2025-01-13T08:53:49.334557",
          "passes": true
        },
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "UHD Blu-ray",
              "negate": false,
              "pattern": "UHD Blu-ray",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": true,
              "name": "HDR",
              "negate": false,
              "pattern": "Basic HDR Formats",
              "required": true,
              "type": "release_title"
            }
          ],
          "expected": true,
          "id": 4,
          "input": "Blade Runner 2049 2017 1080p UHD BluRay DTS HDR x265 D-Z0N3",
          "lastRun": "2025-01-13T08:53:49.334557",
          "passes": true
        }
      ]
    },
    "slug": "uhd-bluray",
    "filename": "UHD Bluray.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/uhdbits",
    "type": "custom-format",
    "data": {
      "name": "UHDBits",
      "description": "Matches patterns unique to the UHDBits indexer. Needed to remove remux based releases due to bad parsing",
      "tags": [
        "Private Tracker",
        "Enhancements"
      ],
      "conditions": [
        {
          "name": "Year in Brackets",
          "negate": false,
          "pattern": "Bracketed Year",
          "required": true,
          "type": "release_title"
        }
      ],
      "tests": []
    },
    "slug": "uhdbits",
    "filename": "UHDBits.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/unwanted-release-groups",
    "type": "custom-format",
    "data": {
      "name": "UnWanted Release Groups",
      "description": "Matches Release Groups that are Banned",
      "tags": [
        "UnWanted",
        "Release Group"
      ],
      "conditions": [
        {
          "name": "Release Group (Missing)",
          "negate": true,
          "pattern": "Release Group (Missing)",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "4K4U",
          "negate": false,
          "pattern": "4K4U",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "AROMA",
          "negate": false,
          "pattern": "AROMA",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "BeyondHD",
          "negate": false,
          "pattern": "BeyondHD",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "BiTOR",
          "negate": false,
          "pattern": "BiTOR",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "BOLS",
          "negate": false,
          "pattern": "BOLS",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "CREATiVE24",
          "negate": false,
          "pattern": "CREATiVE24",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "d3g",
          "negate": false,
          "pattern": "d3g",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "DepraveD",
          "negate": false,
          "pattern": "DepraveD",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "edge2020",
          "negate": false,
          "pattern": "edge2020",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "FGT",
          "negate": false,
          "pattern": "FGT",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "Flights",
          "negate": false,
          "pattern": "Flights",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "HDS",
          "type": "release_group",
          "required": false,
          "negate": false,
          "pattern": "HDS"
        },
        {
          "name": "jennaortegaUHD",
          "negate": false,
          "pattern": "jennaortegaUHD",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "KC",
          "negate": false,
          "pattern": "KC",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "LAMA",
          "negate": false,
          "pattern": "LAMA",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "MALUS",
          "negate": false,
          "pattern": "MALUS",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "MovieMan",
          "negate": false,
          "pattern": "MovieMan",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "NAHOM",
          "negate": false,
          "pattern": "NAHOM",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "NoGroup",
          "negate": false,
          "pattern": "NoGroup",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "OEPlus",
          "negate": false,
          "pattern": "OEPlus",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "PiRaTeS",
          "negate": false,
          "pattern": "PiRaTeS",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "SasukeducK",
          "negate": false,
          "pattern": "SasukeducK",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "ShieldBearer",
          "negate": false,
          "pattern": "ShieldBearer",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "SM737",
          "negate": false,
          "pattern": "SM737",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "STUTTERSHIT",
          "negate": false,
          "pattern": "STUTTERSHIT",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "tarunk9c",
          "negate": false,
          "pattern": "tarunk9c",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "TEKNO3D",
          "negate": false,
          "pattern": "TEKNO3D",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "Telly",
          "negate": false,
          "pattern": "Telly",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "VECTOR",
          "negate": false,
          "pattern": "VECTOR",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "VisionXpert",
          "negate": false,
          "pattern": "VisionXpert",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "WOU",
          "negate": false,
          "pattern": "WOU",
          "required": false,
          "type": "release_group"
        }
      ],
      "tests": []
    },
    "slug": "unwanted-release-groups",
    "filename": "UnWanted Release Groups.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/unwanted-remux-groups",
    "type": "custom-format",
    "data": {
      "name": "UnWanted Remux Groups",
      "description": "Matches otherwise unfavourable remux groups - bloated audio tracks, fake HDR, etc.",
      "tags": [
        "UnWanted",
        "Release Group"
      ],
      "conditions": [
        {
          "name": "Remux",
          "negate": false,
          "pattern": "Remux",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not DVD",
          "negate": true,
          "required": true,
          "source": "dvd",
          "type": "source"
        },
        {
          "name": "LEGi0N",
          "negate": false,
          "pattern": "LEGi0N",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "RARGB",
          "negate": false,
          "pattern": "RARGB",
          "required": false,
          "type": "release_group"
        }
      ],
      "tests": []
    },
    "slug": "unwanted-remux-groups",
    "filename": "UnWanted Remux Groups.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/unwanted-webrip-groups",
    "type": "custom-format",
    "data": {
      "name": "UnWanted WEBRip Groups",
      "description": "Matches WEBRip releases that are not from a quality tier",
      "tags": [
        "UnWanted",
        "Release Group"
      ],
      "conditions": [
        {
          "name": "WEBRip",
          "negate": false,
          "required": true,
          "source": "webrip",
          "type": "source"
        },
        {
          "name": "AJP69",
          "negate": true,
          "pattern": "AJP69",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "BMF",
          "negate": true,
          "pattern": "BMF",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "BV",
          "negate": true,
          "pattern": "BV",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "c0kE",
          "negate": true,
          "pattern": "c0kE",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "Chotab",
          "negate": true,
          "pattern": "Chotab",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "CJ",
          "negate": true,
          "pattern": "CJ",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "CRiSC",
          "negate": true,
          "pattern": "CRiSC",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "CRX",
          "negate": true,
          "pattern": "CRX",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "CtrlHD",
          "negate": true,
          "pattern": "CtrlHD",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "Dariush",
          "negate": true,
          "pattern": "Dariush",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "de[42]",
          "negate": true,
          "pattern": "de[42]",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "decibeL",
          "negate": true,
          "pattern": "decibeL",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "DON",
          "negate": true,
          "pattern": "DON",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "D-Z0N3",
          "negate": true,
          "pattern": "D-Z0N3",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "E1",
          "negate": true,
          "pattern": "E1",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "EbP",
          "negate": true,
          "pattern": "EbP",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "EDPH",
          "negate": true,
          "pattern": "EDPH",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "E.N.D",
          "negate": true,
          "pattern": "E.N.D",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "ESiR",
          "negate": true,
          "pattern": "ESiR",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "EXCiSION",
          "negate": true,
          "pattern": "EXCiSION",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "FilmHD",
          "negate": true,
          "pattern": "FilmHD",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "FoRM",
          "negate": true,
          "pattern": "FoRM",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "FraMeSToR",
          "negate": true,
          "pattern": "FraMeSToR",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "FTW-HD",
          "negate": true,
          "pattern": "FTW-HD",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "GALAXY",
          "negate": true,
          "pattern": "GALAXY",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "Geek",
          "negate": true,
          "pattern": "Geek",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "GS88",
          "negate": true,
          "pattern": "GS88",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "HANDJOB",
          "negate": true,
          "pattern": "HANDJOB",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "hdalx",
          "negate": true,
          "pattern": "hdalx",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "HDMaNiAcS",
          "negate": true,
          "pattern": "HDMaNiAcS",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "HiDt",
          "negate": true,
          "pattern": "HiDt",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "HiFi",
          "negate": true,
          "pattern": "HiFi",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "HiP",
          "negate": true,
          "pattern": "HiP",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "IDE",
          "negate": true,
          "pattern": "IDE",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "iFT",
          "negate": true,
          "pattern": "iFT",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "iON",
          "negate": true,
          "pattern": "iON",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "KASHMiR",
          "negate": true,
          "pattern": "KASHMiR",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "LEGi0N",
          "negate": true,
          "pattern": "LEGi0N",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "LiNG",
          "negate": true,
          "pattern": "LiNG",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "LolHD",
          "negate": true,
          "pattern": "LolHD",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "LoRD",
          "negate": true,
          "pattern": "LoRD",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "luvBB",
          "negate": true,
          "pattern": "luvBB",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "MTeam",
          "negate": true,
          "pattern": "MTeam",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "NCmt",
          "negate": true,
          "pattern": "NCmt",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "nmd",
          "negate": true,
          "pattern": "nmd",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "NTb",
          "negate": true,
          "pattern": "NTb",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "NyHD",
          "negate": true,
          "pattern": "NyHD",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "ORiGEN",
          "negate": true,
          "pattern": "ORiGEN",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "P0W4HD",
          "negate": true,
          "pattern": "P0W4HD",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "Penumbra",
          "negate": true,
          "pattern": "Penumbra",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "playHD",
          "negate": true,
          "pattern": "playHD",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "Positive",
          "negate": true,
          "pattern": "Positive",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "PTer",
          "negate": true,
          "pattern": "PTer",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "rightSIZE",
          "negate": true,
          "pattern": "rightSIZE",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "rttr",
          "negate": true,
          "pattern": "rttr",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "SA89",
          "negate": true,
          "pattern": "SA89",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "SaNcTi",
          "negate": true,
          "pattern": "SaNcTi",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "SbR",
          "negate": true,
          "pattern": "SbR",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "SiMPLE",
          "negate": true,
          "pattern": "SiMPLE",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "SOP",
          "negate": true,
          "pattern": "SOP",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "TayTo",
          "negate": true,
          "pattern": "TayTo",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "TBB",
          "negate": true,
          "pattern": "TBB",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "TDD",
          "negate": true,
          "pattern": "TDD",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "VietHD",
          "negate": true,
          "pattern": "VietHD",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "VLAD",
          "negate": true,
          "pattern": "VLAD",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "W4NK3R",
          "negate": true,
          "pattern": "W4NK3R",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "WMING",
          "negate": true,
          "pattern": "WMING",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "xander",
          "negate": true,
          "pattern": "xander",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "ZIMBO",
          "negate": true,
          "pattern": "ZIMBO",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "ZQ",
          "negate": true,
          "pattern": "ZQ",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "ZoroSenpai",
          "negate": true,
          "pattern": "ZoroSenpai",
          "required": true,
          "type": "release_group"
        }
      ],
      "tests": []
    },
    "slug": "unwanted-webrip-groups",
    "filename": "UnWanted WEBRip Groups.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/unknown-lossless-audio",
    "type": "custom-format",
    "data": {
      "name": "Unknown Lossless Audio",
      "description": "Matches UHD Blu-rays (remux / encode) that don't include a named audio track. Since all UHD Blu-rays include lossless audio, it's safe to assume that some lossless audio track does exist, and just isn't labelled. ",
      "tags": [
        "Audio"
      ],
      "conditions": [
        {
          "name": "2160p",
          "negate": false,
          "required": true,
          "resolution": "2160p",
          "type": "resolution"
        },
        {
          "name": "Bluray",
          "negate": false,
          "required": true,
          "source": "bluray",
          "type": "source"
        },
        {
          "name": "Not DTS-HD MA",
          "negate": true,
          "pattern": "DTS-HD MA",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not DTS-X",
          "negate": true,
          "pattern": "DTS-X",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not FLAC",
          "negate": true,
          "pattern": "FLAC",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not PCM",
          "negate": true,
          "pattern": "PCM",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not AAC",
          "negate": true,
          "pattern": "AAC",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not DTS",
          "negate": true,
          "pattern": "DTS",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not TrueHD",
          "negate": true,
          "pattern": "TrueHD",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not Dolby Digital",
          "negate": true,
          "pattern": "Dolby Digital",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not Dolby Digital +",
          "negate": true,
          "pattern": "Dolby Digital +",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not Missing Group",
          "type": "release_title",
          "required": true,
          "negate": true,
          "pattern": "TrueHD (Missing Groups)"
        }
      ],
      "tests": []
    },
    "slug": "unknown-lossless-audio",
    "filename": "Unknown Lossless Audio.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/upscaled",
    "type": "custom-format",
    "data": {
      "name": "Upscaled",
      "description": "Matches the 'Upscaled' regex pattern",
      "tags": [
        "UnWanted",
        "Enhancement"
      ],
      "conditions": [
        {
          "name": "Upscaled",
          "negate": false,
          "pattern": "Upscaled",
          "required": true,
          "type": "release_title"
        }
      ],
      "tests": []
    },
    "slug": "upscaled",
    "filename": "Upscaled.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/viki",
    "type": "custom-format",
    "data": {
      "name": "VIKI",
      "description": "Matches 'VIKI' WEB-DLs. Negates any encodes.",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "conditions": [
        {
          "name": "VIKI Regex",
          "negate": false,
          "pattern": "Viki",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "WEB-DL",
          "negate": false,
          "required": true,
          "source": "web_dl",
          "type": "source"
        }
      ],
      "tests": [
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "SHO Regex",
              "negate": false,
              "pattern": "Showtime",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "SHO Rename Regex",
              "negate": false,
              "pattern": "Showtime Rename",
              "required": false,
              "type": "release_title"
            }
          ],
          "expected": true,
          "id": 1,
          "input": "Billions S06 2160p SHO WEB-DL DD+ 5.1 H.265-NTb",
          "lastRun": "2025-04-21T20:33:55.371437",
          "passes": true
        }
      ]
    },
    "slug": "viki",
    "filename": "VIKI.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/viu",
    "type": "custom-format",
    "data": {
      "name": "VIU",
      "description": "Matches 'VIU' WEB-DLs. Negates any encodes.",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "conditions": [
        {
          "name": "VIU Regex",
          "negate": false,
          "pattern": "Viu",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "WEB-DL",
          "negate": false,
          "required": true,
          "source": "web_dl",
          "type": "source"
        }
      ],
      "tests": [
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "SHO Regex",
              "negate": false,
              "pattern": "Showtime",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "SHO Rename Regex",
              "negate": false,
              "pattern": "Showtime Rename",
              "required": false,
              "type": "release_title"
            }
          ],
          "expected": true,
          "id": 1,
          "input": "Billions S06 2160p SHO WEB-DL DD+ 5.1 H.265-NTb",
          "lastRun": "2025-04-21T20:33:55.371437",
          "passes": true
        }
      ]
    },
    "slug": "viu",
    "filename": "VIU.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/vp9",
    "type": "custom-format",
    "data": {
      "name": "VP9",
      "description": "Matches the 'VP9' Regex Pattern",
      "tags": [
        "Codec",
        "Bleeding Edge"
      ],
      "conditions": [
        {
          "name": "VP9",
          "negate": false,
          "pattern": "VP9",
          "required": true,
          "type": "release_title"
        }
      ],
      "tests": []
    },
    "slug": "vp9",
    "filename": "VP9.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/vvc",
    "type": "custom-format",
    "data": {
      "name": "VVC",
      "description": "Matches the 'VVC' Regex Pattern",
      "tags": [
        "Codec",
        "Bleeding Edge"
      ],
      "conditions": [
        {
          "name": "VVC",
          "negate": false,
          "pattern": "VVC",
          "required": true,
          "type": "release_title"
        }
      ],
      "tests": []
    },
    "slug": "vvc",
    "filename": "VVC.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/wavve",
    "type": "custom-format",
    "data": {
      "name": "WAVVE",
      "description": "Matches 'WAVVE' WEB-DLs. Negates any encodes.",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "conditions": [
        {
          "name": "WAVVE Regex",
          "negate": false,
          "pattern": "Wavve",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "WEB-DL",
          "negate": false,
          "required": true,
          "source": "web_dl",
          "type": "source"
        }
      ],
      "tests": [
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "SHO Regex",
              "negate": false,
              "pattern": "Showtime",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "SHO Rename Regex",
              "negate": false,
              "pattern": "Showtime Rename",
              "required": false,
              "type": "release_title"
            }
          ],
          "expected": true,
          "id": 1,
          "input": "Billions S06 2160p SHO WEB-DL DD+ 5.1 H.265-NTb",
          "lastRun": "2025-04-21T20:33:55.371437",
          "passes": true
        }
      ]
    },
    "slug": "wavve",
    "filename": "WAVVE.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/web-dl-tier-1",
    "type": "custom-format",
    "data": {
      "name": "WEB-DL Tier 1",
      "description": "Matches release groups who fall under WEB-DL Tier 1",
      "tags": [
        "Release Groups",
        "WEB-DL"
      ],
      "conditions": [
        {
          "name": "WEB-DL",
          "negate": false,
          "required": true,
          "source": "web_dl",
          "type": "source"
        },
        {
          "name": "FLUX",
          "negate": false,
          "pattern": "FLUX",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "NTb",
          "negate": false,
          "pattern": "NTb",
          "required": false,
          "type": "release_group"
        }
      ],
      "tests": []
    },
    "slug": "web-dl-tier-1",
    "filename": "WEB-DL Tier 1.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/web-dl-tier-2",
    "type": "custom-format",
    "data": {
      "name": "WEB-DL Tier 2",
      "description": "Matches release groups who fall under WEB-DL Tier 2",
      "tags": [
        "Release Groups",
        "WEB-DL"
      ],
      "conditions": [
        {
          "name": "WEB-DL",
          "negate": false,
          "required": true,
          "source": "web_dl",
          "type": "source"
        },
        {
          "name": "CMRG",
          "negate": false,
          "pattern": "CMRG",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "HHWEB",
          "negate": false,
          "pattern": "HHWEB",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "HONE",
          "negate": false,
          "pattern": "HONE",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "Kitsune",
          "negate": false,
          "pattern": "Kitsune",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "playWEB",
          "type": "release_group",
          "required": false,
          "negate": false,
          "pattern": "playWEB"
        },
        {
          "name": "TEPES",
          "negate": false,
          "pattern": "TEPES",
          "required": false,
          "type": "release_group"
        }
      ],
      "tests": []
    },
    "slug": "web-dl-tier-2",
    "filename": "WEB-DL Tier 2.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/web-dl-tier-3",
    "type": "custom-format",
    "data": {
      "name": "WEB-DL Tier 3",
      "description": "Matches release groups who fall under WEB-DL Tier 3",
      "tags": [
        "Release Groups",
        "WEB-DL"
      ],
      "conditions": [
        {
          "name": "WEB-DL",
          "negate": false,
          "required": true,
          "source": "web_dl",
          "type": "source"
        },
        {
          "name": "ABBIE",
          "negate": false,
          "pattern": "ABBIE",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "AJP69",
          "negate": false,
          "pattern": "AJP69",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "APEX",
          "negate": false,
          "pattern": "APEX",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "BLUTONiUM",
          "negate": false,
          "pattern": "BLUTONiUM",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "BTN",
          "negate": false,
          "pattern": "BTN",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "CRFW",
          "negate": false,
          "pattern": "CRFW",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "KiNGS",
          "negate": false,
          "pattern": "KiNGS",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "MZABI",
          "negate": false,
          "pattern": "MZABI",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "NOSiViD",
          "negate": false,
          "pattern": "NOSiViD",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "NTG",
          "negate": false,
          "pattern": "NTG",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "QOQ",
          "negate": false,
          "pattern": "QOQ",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "SbR",
          "negate": false,
          "pattern": "SbR",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "SiC",
          "negate": false,
          "pattern": "SiC",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "SMURF",
          "negate": false,
          "pattern": "SMURF",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "TOMMY",
          "negate": false,
          "pattern": "TOMMY",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "XEBEC",
          "negate": false,
          "pattern": "XEBEC",
          "required": false,
          "type": "release_group"
        }
      ],
      "tests": []
    },
    "slug": "web-dl-tier-3",
    "filename": "WEB-DL Tier 3.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/web-dl-tier-4",
    "type": "custom-format",
    "data": {
      "name": "WEB-DL Tier 4",
      "description": "Matches release groups who fall under WEB-DL Tier 4",
      "tags": [
        "Release Groups",
        "WEB-DL"
      ],
      "conditions": [
        {
          "name": "WEB-DL",
          "negate": false,
          "required": true,
          "source": "web_dl",
          "type": "source"
        },
        {
          "name": "BYNDR",
          "negate": false,
          "pattern": "BYNDR",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "Cinefeel",
          "negate": false,
          "pattern": "Cinefeel",
          "required": false,
          "type": "release_group"
        },
        {
          "name": "LAZY",
          "type": "release_group",
          "required": false,
          "negate": false,
          "pattern": "LAZY"
        }
      ],
      "tests": []
    },
    "slug": "web-dl-tier-4",
    "filename": "WEB-DL Tier 4.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/webrip",
    "type": "custom-format",
    "data": {
      "name": "WEBRip",
      "description": "A WEBRip is a video file created by capturing and potentially re-encoding content from streaming services or web platforms. It can be produced through several methods: capturing via HDMI with HDCP stripping (often at higher resolutions like 4K then encoding down to 1080p, resulting in larger file sizes due to the high-quality source), re-encoding from Web-DL sources when they offer superior quality to physical media, or through traditional web capture methods without re-encoding. Unlike Web-DLs which are direct downloads of the source file, WEBRips involve some form of capture or conversion process, which can affect quality and file size depending on the method and settings used.",
      "tags": [
        "Lossy",
        "Source"
      ],
      "conditions": [
        {
          "name": "WEBRip",
          "negate": false,
          "required": true,
          "source": "webrip",
          "type": "source"
        }
      ],
      "tests": [
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "x264",
              "negate": false,
              "pattern": "x264",
              "required": true,
              "type": "release_title"
            }
          ],
          "expected": true,
          "id": 1,
          "input": "American.Masters.S36E03.Waterman.Duke.Ambassador.of.Aloha.1080p.WEBRip.x264-BAE.mkv",
          "lastRun": "2024-12-07T00:26:59.849393",
          "passes": true
        },
        {
          "conditionResults": [
            {
              "matches": false,
              "name": "x264",
              "negate": false,
              "pattern": "x264",
              "required": true,
              "type": "release_title"
            }
          ],
          "expected": false,
          "id": 2,
          "input": "Rapunzel's Tangled Adventure S01 1080p WEBRip AAC 5.1 x265-PoF",
          "lastRun": "2024-12-07T00:26:59.849393",
          "passes": true
        },
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "x264",
              "negate": false,
              "pattern": "x264",
              "required": true,
              "type": "release_title"
            }
          ],
          "expected": true,
          "id": 3,
          "input": "Wacky Races 2017 720p S03 WEBRip DD 2.0 h264-NOGROUP",
          "lastRun": "2024-12-07T00:26:59.849393",
          "passes": true
        }
      ]
    },
    "slug": "webrip",
    "filename": "WEBRip.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/wetv",
    "type": "custom-format",
    "data": {
      "name": "WeTV",
      "description": "Matches 'WeTV' WEB-DLs. Negates any encodes.",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "conditions": [
        {
          "name": "WeTV Regex",
          "negate": false,
          "pattern": "WeTV",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "WEB-DL",
          "negate": false,
          "required": true,
          "source": "web_dl",
          "type": "source"
        }
      ],
      "tests": [
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "SHO Regex",
              "negate": false,
              "pattern": "Showtime",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "SHO Rename Regex",
              "negate": false,
              "pattern": "Showtime Rename",
              "required": false,
              "type": "release_title"
            }
          ],
          "expected": true,
          "id": 1,
          "input": "Billions S06 2160p SHO WEB-DL DD+ 5.1 H.265-NTb",
          "lastRun": "2025-04-21T20:33:55.371437",
          "passes": true
        }
      ]
    },
    "slug": "wetv",
    "filename": "WeTV.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/xvid",
    "type": "custom-format",
    "data": {
      "name": "Xvid",
      "description": "Matches 'Xvid' regex pattern.",
      "tags": [
        "Codec"
      ],
      "conditions": [
        {
          "name": "Xvid",
          "type": "release_title",
          "required": true,
          "negate": false,
          "pattern": "Xvid"
        }
      ],
      "tests": []
    },
    "slug": "xvid",
    "filename": "Xvid.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/h265",
    "type": "custom-format",
    "data": {
      "name": "h265",
      "description": "Matches 'h265' regex pattern.",
      "tags": [
        "Codec"
      ],
      "conditions": [
        {
          "name": "h265",
          "negate": false,
          "pattern": "h265",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not 2160p",
          "type": "resolution",
          "required": true,
          "negate": true,
          "resolution": "2160p"
        }
      ],
      "tests": []
    },
    "slug": "h265",
    "filename": "h265.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/it-missing",
    "type": "custom-format",
    "data": {
      "name": "iT (Missing)",
      "description": "Matches 'iTunes' WEB-DLs that are not labelled correctly. Matches when its not from another streaming service and comes from an iPT release group: EVO or CMRG",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "conditions": [
        {
          "name": "WEB-DL",
          "negate": false,
          "required": true,
          "source": "web_dl",
          "type": "source"
        },
        {
          "name": "iPT Internals",
          "negate": false,
          "pattern": "iPT Internals",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "WEBRip",
          "negate": true,
          "required": true,
          "source": "webrip",
          "type": "source"
        },
        {
          "name": "MA Regex",
          "negate": true,
          "pattern": "Movies Anywhere",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "AMZN Regex",
          "negate": true,
          "pattern": "Amazon Prime",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "APTV Regex",
          "negate": true,
          "pattern": "Apple TV+",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "DSNP Regex",
          "negate": true,
          "pattern": "Disney+",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "PCOK Regex",
          "negate": true,
          "pattern": "Peacock TV",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "MAX Regex",
          "negate": true,
          "pattern": "Max",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "HMAX Regex",
          "negate": true,
          "pattern": "HBO Max",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "NF Regex",
          "negate": true,
          "pattern": "Netflix",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "PMTP Regex",
          "negate": true,
          "pattern": "Paramount+",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "CRiT Regex",
          "negate": true,
          "pattern": "Criterion Channel",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "HULU Regex",
          "negate": true,
          "pattern": "Hulu",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "ROKU Regex",
          "negate": true,
          "pattern": "Roku",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "iTunes Regex",
          "negate": true,
          "pattern": "iTunes",
          "required": true,
          "type": "release_title"
        }
      ],
      "tests": [
        {
          "conditionResults": [
            {
              "matches": false,
              "name": "MA Regex",
              "negate": true,
              "pattern": "Movies Anywhere",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "AMZN Regex",
              "negate": true,
              "pattern": "Amazon Prime",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "APTV Regex",
              "negate": true,
              "pattern": "Apple TV+",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "DSNP Regex",
              "negate": true,
              "pattern": "Disney+",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "PCOK Regex",
              "negate": true,
              "pattern": "Peacock TV",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "MAX Regex",
              "negate": true,
              "pattern": "Max",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "HMAX Regex",
              "negate": true,
              "pattern": "HBO Max",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "NF Regex",
              "negate": true,
              "pattern": "Netflix",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "PMTP Regex",
              "negate": true,
              "pattern": "Paramount+",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "CRiT Regex",
              "negate": true,
              "pattern": "Criterion Channel",
              "required": false,
              "type": "release_group"
            },
            {
              "matches": false,
              "name": "HULU Regex",
              "negate": true,
              "pattern": "Hulu",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "ROKU Regex",
              "negate": true,
              "pattern": "Roku",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": true,
              "name": "iPT Internals",
              "negate": false,
              "pattern": "iPT Internals",
              "required": true,
              "type": "release_group"
            },
            {
              "matches": false,
              "name": "iTunes Regex",
              "negate": true,
              "pattern": "iTunes",
              "required": false,
              "type": "release_title"
            }
          ],
          "expected": true,
          "id": 1,
          "input": "Accident.Man.Hitmans.Holiday.2022.2160p.WEB-DL.DD5.1.HEVC-CMRG.mkv",
          "lastRun": "2024-12-06T06:17:52.567300",
          "passes": true
        },
        {
          "conditionResults": [
            {
              "matches": false,
              "name": "MA Regex",
              "negate": true,
              "pattern": "Movies Anywhere",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "AMZN Regex",
              "negate": true,
              "pattern": "Amazon Prime",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "APTV Regex",
              "negate": true,
              "pattern": "Apple TV+",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "DSNP Regex",
              "negate": true,
              "pattern": "Disney+",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "PCOK Regex",
              "negate": true,
              "pattern": "Peacock TV",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "MAX Regex",
              "negate": true,
              "pattern": "Max",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "HMAX Regex",
              "negate": true,
              "pattern": "HBO Max",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "NF Regex",
              "negate": true,
              "pattern": "Netflix",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "PMTP Regex",
              "negate": true,
              "pattern": "Paramount+",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "CRiT Regex",
              "negate": true,
              "pattern": "Criterion Channel",
              "required": false,
              "type": "release_group"
            },
            {
              "matches": false,
              "name": "HULU Regex",
              "negate": true,
              "pattern": "Hulu",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "ROKU Regex",
              "negate": true,
              "pattern": "Roku",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": true,
              "name": "iPT Internals",
              "negate": false,
              "pattern": "iPT Internals",
              "required": true,
              "type": "release_group"
            },
            {
              "matches": true,
              "name": "iTunes Regex",
              "negate": true,
              "pattern": "iTunes",
              "required": false,
              "type": "release_title"
            }
          ],
          "expected": false,
          "id": 2,
          "input": "American Assassin 2017 1080p iT WEB-DL DD5.1 H.264-CMRG",
          "lastRun": "2024-12-06T06:17:52.567300",
          "passes": true
        },
        {
          "conditionResults": [
            {
              "matches": false,
              "name": "MA Regex",
              "negate": true,
              "pattern": "Movies Anywhere",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "AMZN Regex",
              "negate": true,
              "pattern": "Amazon Prime",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "APTV Regex",
              "negate": true,
              "pattern": "Apple TV+",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "DSNP Regex",
              "negate": true,
              "pattern": "Disney+",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "PCOK Regex",
              "negate": true,
              "pattern": "Peacock TV",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "MAX Regex",
              "negate": true,
              "pattern": "Max",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "HMAX Regex",
              "negate": true,
              "pattern": "HBO Max",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "NF Regex",
              "negate": true,
              "pattern": "Netflix",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "PMTP Regex",
              "negate": true,
              "pattern": "Paramount+",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "CRiT Regex",
              "negate": true,
              "pattern": "Criterion Channel",
              "required": false,
              "type": "release_group"
            },
            {
              "matches": false,
              "name": "HULU Regex",
              "negate": true,
              "pattern": "Hulu",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "ROKU Regex",
              "negate": true,
              "pattern": "Roku",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": true,
              "name": "iPT Internals",
              "negate": false,
              "pattern": "iPT Internals",
              "required": true,
              "type": "release_group"
            },
            {
              "matches": false,
              "name": "iTunes Regex",
              "negate": true,
              "pattern": "iTunes",
              "required": false,
              "type": "release_title"
            }
          ],
          "expected": true,
          "id": 3,
          "input": "Alien.Covenant.2017.1080p.WEB-DL.H264.AC3-EVO.mkv",
          "lastRun": "2024-12-06T06:17:52.567300",
          "passes": true
        },
        {
          "conditionResults": [
            {
              "matches": false,
              "name": "MA Regex",
              "negate": true,
              "pattern": "Movies Anywhere",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "AMZN Regex",
              "negate": true,
              "pattern": "Amazon Prime",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "APTV Regex",
              "negate": true,
              "pattern": "Apple TV+",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "DSNP Regex",
              "negate": true,
              "pattern": "Disney+",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "PCOK Regex",
              "negate": true,
              "pattern": "Peacock TV",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "MAX Regex",
              "negate": true,
              "pattern": "Max",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "HMAX Regex",
              "negate": true,
              "pattern": "HBO Max",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "NF Regex",
              "negate": true,
              "pattern": "Netflix",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "PMTP Regex",
              "negate": true,
              "pattern": "Paramount+",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "CRiT Regex",
              "negate": true,
              "pattern": "Criterion Channel",
              "required": false,
              "type": "release_group"
            },
            {
              "matches": false,
              "name": "HULU Regex",
              "negate": true,
              "pattern": "Hulu",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "ROKU Regex",
              "negate": true,
              "pattern": "Roku",
              "required": false,
              "type": "release_title"
            },
            {
              "matches": true,
              "name": "iPT Internals",
              "negate": false,
              "pattern": "iPT Internals",
              "required": true,
              "type": "release_group"
            },
            {
              "matches": true,
              "name": "iTunes Regex",
              "negate": true,
              "pattern": "iTunes",
              "required": false,
              "type": "release_title"
            }
          ],
          "expected": false,
          "id": 4,
          "input": "American Assassin 2017 720p iT WEB-DL DD5.1 H.264-EVO",
          "lastRun": "2024-12-06T06:17:52.567300",
          "passes": true
        }
      ]
    },
    "slug": "it-missing",
    "filename": "iT (Missing).yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/it",
    "type": "custom-format",
    "data": {
      "name": "iT",
      "description": "Matches 'iTunes' WEB-DLs. Negates any encodes.",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "conditions": [
        {
          "name": "iT Regex",
          "negate": false,
          "pattern": "iTunes",
          "required": false,
          "type": "release_title"
        },
        {
          "name": "iT Rename Regex",
          "type": "release_title",
          "required": false,
          "negate": false,
          "pattern": "iTunes Rename"
        },
        {
          "name": "WEB-DL",
          "negate": false,
          "required": true,
          "source": "web_dl",
          "type": "source"
        }
      ],
      "tests": [
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "iTunes Regex",
              "negate": false,
              "pattern": "iTunes",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": true,
              "name": "x265",
              "negate": true,
              "pattern": "x265",
              "required": false,
              "type": "release_title"
            }
          ],
          "expected": false,
          "id": 1,
          "input": "Alien Romulus (2024) (1080p DS4K iT WEBRip x265 HEVC 10bit DDP Atmos 5 1 English - KaLLuKaLia)",
          "lastRun": "2024-12-06T05:49:21.811162",
          "passes": true
        }
      ]
    },
    "slug": "it",
    "filename": "iT.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/x264-2160p",
    "type": "custom-format",
    "data": {
      "name": "x264 (2160p)",
      "description": "Matches 'x264' regex pattern only when 2160p is also found. ",
      "tags": [
        "Codec"
      ],
      "conditions": [
        {
          "name": "2160p",
          "negate": false,
          "required": true,
          "resolution": "2160p",
          "type": "resolution"
        },
        {
          "name": "x264",
          "negate": false,
          "pattern": "x264",
          "required": true,
          "type": "release_title"
        }
      ],
      "tests": []
    },
    "slug": "x264-2160p",
    "filename": "x264 (2160p).yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/x264",
    "type": "custom-format",
    "data": {
      "name": "x264",
      "description": "Matches 'x264' regex pattern.",
      "tags": [
        "Codec"
      ],
      "conditions": [
        {
          "name": "x264",
          "negate": false,
          "pattern": "x264",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not WEB-DL",
          "type": "source",
          "required": false,
          "negate": true,
          "source": "web_dl"
        }
      ],
      "tests": []
    },
    "slug": "x264",
    "filename": "x264.yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/x265-bluray",
    "type": "custom-format",
    "data": {
      "name": "x265 (Bluray)",
      "description": "Matches 'x265' regex pattern.",
      "tags": [
        "Codec"
      ],
      "conditions": [
        {
          "name": "x265",
          "negate": false,
          "pattern": "x265",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Bluray",
          "type": "source",
          "required": true,
          "negate": false,
          "source": "bluray"
        }
      ],
      "tests": []
    },
    "slug": "x265-bluray",
    "filename": "x265 (Bluray).yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/x265-missing",
    "type": "custom-format",
    "data": {
      "name": "x265 (Missing)",
      "description": "Attempts to match 2160p x265 encodes that aren't labelled with any codec. ",
      "tags": [
        "Codec"
      ],
      "conditions": [
        {
          "name": "2160p",
          "negate": false,
          "required": true,
          "resolution": "2160p",
          "type": "resolution"
        },
        {
          "name": "Bluray",
          "negate": false,
          "required": true,
          "source": "bluray",
          "type": "source"
        },
        {
          "name": "Not Remux",
          "negate": true,
          "pattern": "Remux",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not x264",
          "negate": true,
          "pattern": "x264",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not x265",
          "negate": true,
          "pattern": "x265",
          "required": true,
          "type": "release_title"
        }
      ],
      "tests": [
        {
          "conditionResults": [
            {
              "matches": false,
              "name": "Not x265",
              "negate": true,
              "pattern": "x265",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": true,
              "name": "h265",
              "negate": false,
              "pattern": "h265",
              "required": true,
              "type": "release_title"
            }
          ],
          "expected": true,
          "id": 1,
          "input": "Training Day 2001 BluRay 10Bit 1080p DD5 1 H265-d3g",
          "lastRun": "2025-01-14T09:03:52.278761",
          "passes": true
        }
      ]
    },
    "slug": "x265-missing",
    "filename": "x265 (Missing).yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/x265-web",
    "type": "custom-format",
    "data": {
      "name": "x265 (WEB)",
      "description": "Matches 'x265' regex pattern.",
      "tags": [
        "Codec"
      ],
      "conditions": [
        {
          "name": "x265",
          "negate": false,
          "pattern": "x265",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Bluray",
          "negate": true,
          "required": true,
          "source": "bluray",
          "type": "source"
        }
      ],
      "tests": []
    },
    "slug": "x265-web",
    "filename": "x265 (WEB).yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/x265-web-dl",
    "type": "custom-format",
    "data": {
      "name": "x265 (WEB-DL)",
      "description": "",
      "tags": [
        "Codec"
      ],
      "conditions": [
        {
          "name": "x265",
          "negate": false,
          "pattern": "x265",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "WEB-DL",
          "negate": false,
          "required": true,
          "source": "web_dl",
          "type": "source"
        },
        {
          "name": "ABBIE",
          "negate": true,
          "pattern": "ABBIE",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "AJP69",
          "negate": true,
          "pattern": "AJP69",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "APEX",
          "negate": true,
          "pattern": "APEX",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "BLUTONIUM",
          "negate": true,
          "pattern": "BLUTONiUM",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "BTN",
          "negate": true,
          "pattern": "BTN",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "CMRG",
          "negate": true,
          "pattern": "CMRG",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "CRFW",
          "negate": true,
          "pattern": "CRFW",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "FLUX",
          "negate": true,
          "pattern": "FLUX",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "HHWEB",
          "negate": true,
          "pattern": "HHWEB",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "HONE",
          "negate": true,
          "pattern": "HONE",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "KiNGS",
          "negate": true,
          "pattern": "KiNGS",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "Kitsune",
          "negate": true,
          "pattern": "Kitsune",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "MZABI",
          "negate": true,
          "pattern": "MZABI",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "NOSiViD",
          "negate": true,
          "pattern": "NOSiViD",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "NTb",
          "negate": true,
          "pattern": "NTb",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "NTG",
          "negate": true,
          "pattern": "NTG",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "playWEB",
          "negate": true,
          "pattern": "playWEB",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "QOQ",
          "negate": true,
          "pattern": "QOQ",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "SbR",
          "negate": true,
          "pattern": "SbR",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "SiC",
          "negate": true,
          "pattern": "SiC",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "SMURF",
          "negate": true,
          "pattern": "SMURF",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "TEPES",
          "negate": true,
          "pattern": "TEPES",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "TOMMY",
          "negate": true,
          "pattern": "TOMMY",
          "required": true,
          "type": "release_group"
        },
        {
          "name": "XEBEC",
          "negate": true,
          "pattern": "XEBEC",
          "required": true,
          "type": "release_group"
        }
      ],
      "tests": [
        {
          "conditionResults": [
            {
              "matches": true,
              "name": "x265",
              "negate": false,
              "pattern": "x265",
              "required": true,
              "type": "release_title"
            },
            {
              "matches": false,
              "name": "ABBIE",
              "negate": true,
              "pattern": "ABBIE",
              "required": true,
              "type": "release_group"
            },
            {
              "matches": false,
              "name": "AJP69",
              "negate": true,
              "pattern": "AJP69",
              "required": true,
              "type": "release_group"
            },
            {
              "matches": false,
              "name": "APEX",
              "negate": true,
              "pattern": "APEX",
              "required": true,
              "type": "release_group"
            },
            {
              "matches": false,
              "name": "BLUTONIUM",
              "negate": true,
              "pattern": "BLUTONiUM",
              "required": true,
              "type": "release_group"
            },
            {
              "matches": false,
              "name": "BTN",
              "negate": true,
              "pattern": "BTN",
              "required": true,
              "type": "release_group"
            },
            {
              "matches": false,
              "name": "CMRG",
              "negate": true,
              "pattern": "CMRG",
              "required": true,
              "type": "release_group"
            },
            {
              "matches": false,
              "name": "CRFW",
              "negate": true,
              "pattern": "CRFW",
              "required": true,
              "type": "release_group"
            },
            {
              "matches": false,
              "name": "FLUX",
              "negate": true,
              "pattern": "FLUX",
              "required": true,
              "type": "release_group"
            },
            {
              "matches": false,
              "name": "HHWEB",
              "negate": true,
              "pattern": "HHWEB",
              "required": true,
              "type": "release_group"
            },
            {
              "matches": false,
              "name": "HONE",
              "negate": true,
              "pattern": "HONE",
              "required": true,
              "type": "release_group"
            },
            {
              "matches": false,
              "name": "KiNGS",
              "negate": true,
              "pattern": "KiNGS",
              "required": true,
              "type": "release_group"
            },
            {
              "matches": false,
              "name": "Kitsune",
              "negate": true,
              "pattern": "Kitsune",
              "required": true,
              "type": "release_group"
            },
            {
              "matches": false,
              "name": "MZABI",
              "negate": true,
              "pattern": "MZABI",
              "required": true,
              "type": "release_group"
            },
            {
              "matches": false,
              "name": "NOSiViD",
              "negate": true,
              "pattern": "NOSiViD",
              "required": true,
              "type": "release_group"
            },
            {
              "matches": false,
              "name": "NTb",
              "negate": true,
              "pattern": "NTb",
              "required": true,
              "type": "release_group"
            },
            {
              "matches": false,
              "name": "NTG",
              "negate": true,
              "pattern": "NTG",
              "required": true,
              "type": "release_group"
            },
            {
              "matches": false,
              "name": "playWEB",
              "negate": true,
              "pattern": "playWEB",
              "required": true,
              "type": "release_group"
            },
            {
              "matches": false,
              "name": "QOQ",
              "negate": true,
              "pattern": "QOQ",
              "required": true,
              "type": "release_group"
            },
            {
              "matches": false,
              "name": "SbR",
              "negate": true,
              "pattern": "SbR",
              "required": true,
              "type": "release_group"
            },
            {
              "matches": false,
              "name": "SiC",
              "negate": true,
              "pattern": "SiC",
              "required": true,
              "type": "release_group"
            },
            {
              "matches": false,
              "name": "SMURF",
              "negate": true,
              "pattern": "SMURF",
              "required": true,
              "type": "release_group"
            },
            {
              "matches": false,
              "name": "TEPES",
              "negate": true,
              "pattern": "TEPES",
              "required": true,
              "type": "release_group"
            },
            {
              "matches": false,
              "name": "TOMMY",
              "negate": true,
              "pattern": "TOMMY",
              "required": true,
              "type": "release_group"
            },
            {
              "matches": true,
              "name": "XEBEC",
              "negate": true,
              "pattern": "XEBEC",
              "required": true,
              "type": "release_group"
            }
          ],
          "expected": false,
          "id": 1,
          "input": "Avatar: The Way of Water 2022 2160p MAX WEB-DL DDP5.1 Atmos DV HDR x265-XEBEC",
          "lastRun": "2025-06-01T13:52:35.810829",
          "passes": true
        }
      ]
    },
    "slug": "x265-web-dl",
    "filename": "x265 (WEB-DL).yml",
    "category": "custom-format"
  },
  {
    "path": "/custom-format/x265",
    "type": "custom-format",
    "data": {
      "name": "x265",
      "description": "Matches 'x265' regex pattern.",
      "tags": [
        "Codec"
      ],
      "conditions": [
        {
          "name": "x265",
          "negate": false,
          "pattern": "x265",
          "required": true,
          "type": "release_title"
        },
        {
          "name": "Not 2160p",
          "type": "resolution",
          "required": true,
          "negate": true,
          "resolution": "2160p"
        }
      ],
      "tests": []
    },
    "slug": "x265",
    "filename": "x265.yml",
    "category": "custom-format"
  },
  {
    "path": "/regex-pattern/3d",
    "type": "regex-pattern",
    "data": {
      "name": "3D",
      "pattern": "(?<=\\b[12]\\d{3}\\b).*\\b((bluray|bd)?3d|sbs|half[ .-]ou|half[ .-]sbs)\\b",
      "description": "Matches terms related to 3D video formats:\n- `bluray3d` or `bd3d` (optional `bluray` or `bd` followed by `3d`).\n- `sbs` (side-by-side).\n- `half ou` or `half sbs` with space (` `), dot (`.`), or hyphen (`-`) as separators.",
      "tags": [
        "Enhancement",
        "UnWanted"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "Universal.Soldier.Day.of.Reckoning.2012.1080p.BluRay.3D.H-SBS.DTS.x264-BluRay3D",
          "lastRun": "2025-04-25T14:15:46.876957",
          "matchSpan": {
            "end": 55,
            "start": 53
          },
          "matchedContent": "3D",
          "matchedGroups": [
            "3D",
            null
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 2,
          "input": "Justin.And.The.Knights.Of.Valour.3D.2013.1080p.BluRay.Half-SBS.x264-BluRay3D",
          "lastRun": "2025-04-25T14:15:46.876957",
          "matchSpan": {
            "end": 35,
            "start": 33
          },
          "matchedContent": "3D",
          "matchedGroups": [
            "3D",
            null
          ],
          "passes": true
        },
        {
          "expected": false,
          "id": 3,
          "input": "Step Up 3D 2010 1080p BluRay DTS-ES 6.1 x264-xander",
          "lastRun": "2025-04-25T14:15:46.876957",
          "matchSpan": {
            "end": 10,
            "start": 8
          },
          "matchedContent": "3D",
          "matchedGroups": [
            "3D",
            null
          ],
          "passes": false
        }
      ]
    },
    "slug": "3d",
    "filename": "3D.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/3l",
    "type": "regex-pattern",
    "data": {
      "name": "3L",
      "pattern": "(?<=^|[\\s.-])3L\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Remux"
      ],
      "tests": []
    },
    "slug": "3l",
    "filename": "3L.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/4k4u",
    "type": "regex-pattern",
    "data": {
      "name": "4K4U",
      "pattern": "(?<=^|[\\s.-])4K4U\\b",
      "description": "Matches the release group `4K4U` only if it is:\n\n- Preceded by the start of the string (`^`), a whitespace character (`\\s`), a period (`.`), or a hyphen (`-`).\n- Followed by a word boundary (`\\b`), ensuring it ends cleanly without being part of a longer word. ",
      "tags": [
        "Release Group",
        "Remux"
      ],
      "tests": []
    },
    "slug": "4k4u",
    "filename": "4K4U.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/4kdvs",
    "type": "regex-pattern",
    "data": {
      "name": "4KDVS",
      "pattern": "(?<=^|[\\s.-])4KDVS\\b",
      "description": "Matches \"4KDVS\" when preceded by whitespace, a hyphen or dot",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "4kdvs",
    "filename": "4KDVS.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/71-surround",
    "type": "regex-pattern",
    "data": {
      "name": "7.1 Surround",
      "pattern": "7\\.1",
      "description": "",
      "tags": [
        "Audio",
        "Channel"
      ],
      "tests": []
    },
    "slug": "71-surround",
    "filename": "7.1 Surround.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/9volt",
    "type": "regex-pattern",
    "data": {
      "name": "9volt",
      "pattern": "(?<=^|[\\s.-])9volt\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "9volt",
    "filename": "9volt.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/aaauhd",
    "type": "regex-pattern",
    "data": {
      "name": "AAAUHD",
      "pattern": "(?<=^|[\\s.-])AAAUHD\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "aaauhd",
    "filename": "AAAUHD.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/aac",
    "type": "regex-pattern",
    "data": {
      "name": "AAC",
      "pattern": "\\bAAC(\\b|\\d)",
      "description": "",
      "tags": [
        "Audio"
      ],
      "tests": []
    },
    "slug": "aac",
    "filename": "AAC.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/abbie",
    "type": "regex-pattern",
    "data": {
      "name": "ABBIE",
      "pattern": "(?<=^|[\\s.-])ABBIE\\b",
      "description": "",
      "tags": [
        "Release Group",
        "WEB-DL"
      ],
      "tests": []
    },
    "slug": "abbie",
    "filename": "ABBIE.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/ac",
    "type": "regex-pattern",
    "data": {
      "name": "AC",
      "pattern": "(?<=^|[\\s.-])AC\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "ac",
    "filename": "AC.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/ade",
    "type": "regex-pattern",
    "data": {
      "name": "ADE",
      "pattern": "(?<=^|[\\s.-])ADE\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "ade",
    "filename": "ADE.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/ajp69",
    "type": "regex-pattern",
    "data": {
      "name": "AJP69",
      "pattern": "(?<=^|[\\s.-])AJP69\\b",
      "description": "",
      "tags": [
        "Release Group",
        "WEB-DL"
      ],
      "tests": []
    },
    "slug": "ajp69",
    "filename": "AJP69.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/ane",
    "type": "regex-pattern",
    "data": {
      "name": "ANE",
      "pattern": "(?<=^|[\\s.-])ANE\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "ane",
    "filename": "ANE.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/aomundson",
    "type": "regex-pattern",
    "data": {
      "name": "AOmundson",
      "pattern": "(?<=^|[\\s.-])AOmundson\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "aomundson",
    "filename": "AOmundson.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/apex",
    "type": "regex-pattern",
    "data": {
      "name": "APEX",
      "pattern": "(?<=^|[\\s.-])APEX\\b",
      "description": "",
      "tags": [
        "Release Group",
        "WEB-DL"
      ],
      "tests": []
    },
    "slug": "apex",
    "filename": "APEX.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/aroma",
    "type": "regex-pattern",
    "data": {
      "name": "AROMA",
      "pattern": "(?<=^|[\\s.-])AROMA\\b",
      "description": "Banned for Retagging",
      "tags": [
        "Release Group",
        "UnWanted"
      ],
      "tests": []
    },
    "slug": "aroma",
    "filename": "AROMA.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/av1",
    "type": "regex-pattern",
    "data": {
      "name": "AV1",
      "pattern": "\\b(AV1)\\b",
      "description": "AV1, or AOMedia Video 1, is a video coding format that compresses video files and streams while maintaining high quality.",
      "tags": [
        "Codec"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "Arcane S01 2160p UHD BluRay DD 5.1 DV HDR AV1-TiZU",
          "lastRun": "2025-04-15T14:50:05.552676",
          "matchSpan": {
            "end": 45,
            "start": 42
          },
          "matchedContent": "AV1",
          "matchedGroups": [
            "AV1"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 2,
          "input": "Up.2009.2160p.Bluray.AC3.HDR.DV.AV1-TiZU.mkv",
          "lastRun": "2025-04-15T14:50:05.552676",
          "matchSpan": {
            "end": 35,
            "start": 32
          },
          "matchedContent": "AV1",
          "matchedGroups": [
            "AV1"
          ],
          "passes": true
        }
      ]
    },
    "slug": "av1",
    "filename": "AV1.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/aviator",
    "type": "regex-pattern",
    "data": {
      "name": "AViATOR",
      "pattern": "(?<=^|[\\s.-])AViATOR\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "aviator",
    "filename": "AViATOR.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/absinth",
    "type": "regex-pattern",
    "data": {
      "name": "Absinth",
      "pattern": "(?<=^|[\\s.-])Absinth\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "absinth",
    "filename": "Absinth.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/amazon-prime",
    "type": "regex-pattern",
    "data": {
      "name": "Amazon Prime",
      "pattern": "\\b(?:amzn|(?:AMZN|Amazon)(?=\\s*(?:WEB-?DL|HD)))\\b",
      "description": "Amazon Prime Video, or simply Prime Video, is an American subscription video on-demand over-the-top streaming and rental service of Amazon offered both as a stand-alone service and as part of Amazon's Prime subscription.",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "Futurama.S03E01.Amazon Women in the Mood.1080p.AMZN.WEB-DL.DDP2.0.H.264-Yatogam1.mkv",
          "lastRun": "2024-12-06T01:59:08.829137",
          "matchSpan": {
            "end": 51,
            "start": 47
          },
          "matchedContent": "AMZN",
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 2,
          "input": "Futurama.S03E05.Amazon.Women.in.the.Mood.NF.WEB DL.DDP2.0.x264 CtrlSD.mkv",
          "lastRun": "2024-12-06T01:59:08.829137",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 3,
          "input": "Amazon.Women.on.the.Moon.1987.720p.BluRay.x264-HANDJOB.mkv",
          "lastRun": "2024-12-06T01:59:08.829137",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 4,
          "input": "First.Contact.Lost.Tribe.of.the.Amazon.2016.1080p.AMZN.WEB-DL.DDP2.0.H.264-Q0SWeb.mkv",
          "lastRun": "2024-12-06T01:59:08.829137",
          "matchSpan": {
            "end": 54,
            "start": 50
          },
          "matchedContent": "AMZN",
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 5,
          "input": "First.Contact.Lost.Tribe.of.the.Amazon.2016.1080p.WEB-DL.DDP2.0.H.264-Q0SWeb.mkv",
          "lastRun": "2024-12-06T01:59:08.829137",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        }
      ]
    },
    "slug": "amazon-prime",
    "filename": "Amazon Prime.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/apple-tv",
    "type": "regex-pattern",
    "data": {
      "name": "Apple TV+",
      "pattern": "\\b(atvp|aptv|Apple TV\\+)\\s*\\b",
      "description": "Apple TV+ is an American subscription OTT streaming service owned and operated by Apple Inc. Launched on November 1, 2019, it offers a selection of original production film and television series called Apple Originals.",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "Palmer.1080p.APTV.WEB-DL.DDP5.1.Atmos.H.264-EVO.mkv",
          "lastRun": "2024-12-03T02:31:55.764873",
          "passes": true
        },
        {
          "expected": true,
          "id": 2,
          "input": "Fathom.1080p.APTV.WEB-DL.DDP5.1.Atmos.H.264-CMRG.mkv",
          "lastRun": "2024-12-03T02:31:55.764873",
          "passes": true
        },
        {
          "expected": false,
          "id": 3,
          "input": "You.Are.the.Apple.of.My.Eye.2011.720p.BluRay.DD5.1.x264-EbP.mkv",
          "lastRun": "2024-12-03T02:31:55.764873",
          "passes": true
        },
        {
          "expected": true,
          "id": 4,
          "input": "Men in Black 1997 2160p Apple TV+ WEB-DL DDP 5 1 Atmos DV H 265-CHDWEB",
          "lastRun": "2024-12-03T02:31:55.764873",
          "passes": true
        }
      ]
    },
    "slug": "apple-tv",
    "filename": "Apple TV+.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/arid",
    "type": "regex-pattern",
    "data": {
      "name": "Arid",
      "pattern": "(?<=^|[\\s.-])Arid\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "arid",
    "filename": "Arid.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/asakura",
    "type": "regex-pattern",
    "data": {
      "name": "Asakura",
      "pattern": "(?<=^|[\\s.-])Asakura\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "asakura",
    "filename": "Asakura.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/atmos",
    "type": "regex-pattern",
    "data": {
      "name": "Atmos",
      "pattern": "\\bATMOS(\\b|\\d)",
      "description": "",
      "tags": [
        "Audio",
        "Enhancement"
      ],
      "tests": [
        {
          "expected": false,
          "id": 1,
          "input": "The.Last.of.Us.S01.2160p.UHD.BluRay.Remux.TrueHDA7.1.H.265-PmP",
          "lastRun": "2025-01-06T15:07:07.378833",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 2,
          "input": "The.Last.of.Us.S01.UHD.BluRay.2160p.TrueHD.Atmos.7.1.DV.HEVC.REMUX-FraMeSToR",
          "lastRun": "2025-01-06T15:07:07.378833",
          "matchSpan": {
            "end": 48,
            "start": 43
          },
          "matchedContent": "Atmos",
          "matchedGroups": [
            ""
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 3,
          "input": "The Last of Us S01 2160p MAX WEB-DL DDP 5.1 Atmos DV HDR H.265-FLUX",
          "lastRun": "2025-01-06T15:07:07.378833",
          "matchSpan": {
            "end": 49,
            "start": 44
          },
          "matchedContent": "Atmos",
          "matchedGroups": [
            ""
          ],
          "passes": true
        },
        {
          "expected": false,
          "id": 4,
          "input": "The.Last.of.Us.S01.DV.HDR.2160p.MAX.WEB-DL.DDPA5.1.H.265-FLUX",
          "lastRun": "2025-01-06T15:07:07.378833",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        }
      ]
    },
    "slug": "atmos",
    "filename": "Atmos.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/bw",
    "type": "regex-pattern",
    "data": {
      "name": "B&W",
      "pattern": "\\d{4}.*?\\bblack\\b[\\s.]*(?:and|\\&|-|\\/)?[\\s.]*\\bwhite\\b|\\bb\\&?w\\b",
      "description": "Black and White colour grading. This regex matches a 4-digit number (optionally surrounded by parentheses), followed by any amount of text, and then detects references to \"black and white\" in various formats. It supports `blackwhite` (no spaces), `black and white`, `black-white`, \"`black & white`, `black/white`, as well as shorthand `BW` and `B&W`, while excluding invalid variations like `b w`, `b-w`, or `b/w`",
      "tags": [
        "Enhancement",
        "Colour Grade",
        "UnWanted"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "The Mist Black and White 2007 2160p USA UHD Blu-ray DV HDR HEVC TrueHD 7.1 Atmos-BeyondHD",
          "lastRun": "2025-02-14T14:41:22.957835",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": false
        },
        {
          "expected": false,
          "id": 2,
          "input": "Black and White 2002 1080p Blu-ray AVC DTS-HD MA 5.1-CultFilms",
          "lastRun": "2025-02-14T14:41:22.957835",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 3,
          "input": "Pokemon the Movie: Black and White-Victini and Reshiram Zekrom 2011 1080p AUS BD50 DTS-HD MA 5.1 AVC-PHOENiX",
          "lastRun": "2025-02-14T14:41:22.957835",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 4,
          "input": "Madeo 2009 Black & White Version 1080p JPN Blu-ray AVC TrueHD 5.1-kyRLS",
          "lastRun": "2025-02-14T14:41:22.957835",
          "matchSpan": {
            "end": 24,
            "start": 6
          },
          "matchedContent": "2009 Black & White",
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 6,
          "input": "Psycho (1960) B&W",
          "lastRun": "2025-02-14T14:41:22.957835",
          "matchSpan": {
            "end": 17,
            "start": 7
          },
          "matchedContent": "(1960) B&W",
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 7,
          "input": "Citizen Kane (1941) Black.and.White",
          "lastRun": "2025-02-14T14:41:22.957835",
          "matchSpan": {
            "end": 35,
            "start": 13
          },
          "matchedContent": "(1941) Black.and.White",
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 8,
          "input": "Dracula (1931) Black-White",
          "lastRun": "2025-02-14T14:41:22.957835",
          "matchSpan": {
            "end": 26,
            "start": 8
          },
          "matchedContent": "(1931) Black-White",
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 11,
          "input": "Young Frankenstein (1974) BW DVDRip",
          "lastRun": "2025-02-14T14:41:22.957835",
          "matchSpan": {
            "end": 28,
            "start": 19
          },
          "matchedContent": "(1974) BW",
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 12,
          "input": "Jack Black & Betty White in a Comedy Special",
          "lastRun": "2025-02-14T14:41:22.957835",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        }
      ]
    },
    "slug": "bw",
    "filename": "B&W.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/bhdstudio",
    "type": "regex-pattern",
    "data": {
      "name": "BHDStudio",
      "pattern": "(?<=^|[\\s.-])BHDStudio\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "bhdstudio",
    "filename": "BHDStudio.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/bluebird",
    "type": "regex-pattern",
    "data": {
      "name": "BLUEBIRD",
      "pattern": "(?<=^|[\\s.-])BLUEBIRD\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "bluebird",
    "filename": "BLUEBIRD.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/bluranium",
    "type": "regex-pattern",
    "data": {
      "name": "BLURANiUM",
      "pattern": "(?<=^|[\\s.-])BLURANiUM\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Remux"
      ],
      "tests": []
    },
    "slug": "bluranium",
    "filename": "BLURANiUM.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/blutonium",
    "type": "regex-pattern",
    "data": {
      "name": "BLUTONiUM",
      "pattern": "(?<=^|[\\s.-])BLUTONiUM\\b",
      "description": "",
      "tags": [
        "Release Group",
        "WEB-DL"
      ],
      "tests": []
    },
    "slug": "blutonium",
    "filename": "BLUTONiUM.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/bmf",
    "type": "regex-pattern",
    "data": {
      "name": "BMF",
      "pattern": "(?<=^|[\\s.-])BMF\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Remux",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "bmf",
    "filename": "BMF.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/bols",
    "type": "regex-pattern",
    "data": {
      "name": "BOLS",
      "pattern": "(?<=^|[\\s.-])BOLS\\b",
      "description": "Banned for Retagging",
      "tags": [
        "Release Group",
        "UnWanted"
      ],
      "tests": []
    },
    "slug": "bols",
    "filename": "BOLS.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/boredor",
    "type": "regex-pattern",
    "data": {
      "name": "BOREDOR",
      "pattern": "(?<=^|[\\s.-])BOREDOR\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "boredor",
    "filename": "BOREDOR.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/bstd",
    "type": "regex-pattern",
    "data": {
      "name": "BSTD",
      "pattern": "(?<=^|[\\s.-])BSTD\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "bstd",
    "filename": "BSTD.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/btn-atmos",
    "type": "regex-pattern",
    "data": {
      "name": "BTN Atmos",
      "pattern": "\\bTrue[ .-]?HDA[ .-]?[57]\\.1|DDPA[57]\\.1\\b",
      "description": "Matches BroadcastTheNet Atmos naming convention",
      "tags": [
        "Audio"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "The.Last.of.Us.S01.2160p.UHD.BluRay.Remux.TrueHDA7.1.H.265-PmP",
          "lastRun": "2025-01-11T23:15:36.540509",
          "matchSpan": {
            "end": 52,
            "start": 42
          },
          "matchedContent": "TrueHDA7.1",
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 2,
          "input": "The.Last.of.Us.S01.UHD.BluRay.2160p.TrueHD.Atmos.7.1.DV.HEVC.REMUX-FraMeSToR",
          "lastRun": "2025-01-11T23:15:36.540509",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 3,
          "input": "The Last of Us S01 2160p MAX WEB-DL DDP 5.1 Atmos DV HDR H.265-FLUX",
          "lastRun": "2025-01-11T23:15:36.540509",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 4,
          "input": "The.Last.of.Us.S01.DV.HDR.2160p.MAX.WEB-DL.DDPA5.1.H.265-FLUX",
          "lastRun": "2025-01-11T23:15:36.540509",
          "matchSpan": {
            "end": 50,
            "start": 43
          },
          "matchedContent": "DDPA5.1",
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 5,
          "input": "Loki.S01.2160p.UHD.BluRay.Remux.TrueHDA.7.1.H.265-SiCFoI",
          "lastRun": "2025-01-11T23:15:36.540509",
          "matchSpan": {
            "end": 43,
            "start": 32
          },
          "matchedContent": "TrueHDA.7.1",
          "matchedGroups": [],
          "passes": true
        }
      ]
    },
    "slug": "btn-atmos",
    "filename": "BTN Atmos.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/btn",
    "type": "regex-pattern",
    "data": {
      "name": "BTN",
      "pattern": "(?<=^|[\\s.-])BTN\\b",
      "description": "",
      "tags": [
        "Release Group",
        "WEB-DL"
      ],
      "tests": []
    },
    "slug": "btn",
    "filename": "BTN.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/bv",
    "type": "regex-pattern",
    "data": {
      "name": "BV",
      "pattern": "(?<=^|[\\s.-])BV\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "bv",
    "filename": "BV.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/byndr",
    "type": "regex-pattern",
    "data": {
      "name": "BYNDR",
      "pattern": "(?<=^|[\\s.-])BYNDR\\b",
      "description": "",
      "tags": [
        "Release Group",
        "WEB-DL"
      ],
      "tests": []
    },
    "slug": "byndr",
    "filename": "BYNDR.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/basic-hdr-formats",
    "type": "regex-pattern",
    "data": {
      "name": "Basic HDR Formats",
      "pattern": "(?:(?<=^(?!.*\\b(HLG|PQ|SDR)(\\b|\\d)).*?)HDR)|\\b(dv(?![ .](HLG|SDR))|dovi|dolby[ .]?vision)\\b",
      "description": "Matches Dolby Vision OR HDR10. Needed to better match UHD Blurays",
      "tags": [
        "Enhancement",
        "Colour Grade",
        "HDR"
      ],
      "tests": [
        {
          "expected": true,
          "id": 5,
          "input": "MovieName.1080p.DV.mkv",
          "lastRun": "2025-01-13T08:51:12.077354",
          "matchSpan": {
            "end": 18,
            "start": 16
          },
          "matchedContent": "DV",
          "matchedGroups": [
            null,
            null,
            "DV",
            null
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 6,
          "input": "MovieName.4K.Dolby Vision.IMAX.mkv",
          "lastRun": "2025-01-13T08:51:12.077354",
          "matchSpan": {
            "end": 25,
            "start": 13
          },
          "matchedContent": "Dolby Vision",
          "matchedGroups": [
            null,
            null,
            "Dolby Vision",
            null
          ],
          "passes": true
        },
        {
          "expected": false,
          "id": 7,
          "input": "MovieName.2023.4K.DV.HLG.mkv",
          "lastRun": "2025-01-13T08:51:12.077354",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 8,
          "input": "MovieName.2023.4K.DV.SDR.mkv",
          "lastRun": "2025-01-13T08:51:12.077354",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 9,
          "input": "MovieName.4K.DV.SDR.Dovi.mkv",
          "lastRun": "2025-01-13T08:51:12.077354",
          "matchSpan": {
            "end": 24,
            "start": 20
          },
          "matchedContent": "Dovi",
          "matchedGroups": [
            null,
            null,
            "Dovi",
            null
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 10,
          "input": "Schindler's List (1993) 2160p UHD BluRay Hybrid REMUX HEVC DV HDR10+ TrueHD Atmos 7.1 English-WiLDCAT",
          "lastRun": "2025-01-13T08:51:12.077354",
          "matchSpan": {
            "end": 61,
            "start": 59
          },
          "matchedContent": "DV",
          "matchedGroups": [
            null,
            null,
            "DV",
            null
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 11,
          "input": "Avatar: The Way of Water 2022 1080p UHD BluRay DDP 7.1 HDR10 x265-GALAXY",
          "lastRun": "2025-01-13T08:51:12.077354",
          "matchSpan": {
            "end": 58,
            "start": 55
          },
          "matchedContent": "HDR",
          "matchedGroups": [
            null,
            null,
            null,
            null
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 12,
          "input": "Avatar: The Way of Water [2022] 2160p HEVC WEB-DL HDR10+ -CMRG",
          "lastRun": "2025-01-13T08:51:12.077354",
          "matchSpan": {
            "end": 53,
            "start": 50
          },
          "matchedContent": "HDR",
          "matchedGroups": [
            null,
            null,
            null,
            null
          ],
          "passes": true
        }
      ]
    },
    "slug": "basic-hdr-formats",
    "filename": "Basic HDR Formats.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/beitai",
    "type": "regex-pattern",
    "data": {
      "name": "BeiTai",
      "pattern": "(?<=^|[\\s.-])BeiTai\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "beitai",
    "filename": "BeiTai.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/better-theatricals",
    "type": "regex-pattern",
    "data": {
      "name": "Better Theatricals",
      "pattern": "^\\b(terminator.?2|alien[^s].*?1979|star.wars.*?(4k|19)(77)|.*?\\bempire.strikes.back|.*?\\breturn.of.the.jedi|apocalypse.now|the.exorcist.*?1973|donnie.darko|amadeus|payback.*?1999|payback.straight.up.*?2006|almost.famous)\\b",
      "description": "Matches movies where the `Theatrical` cut is considered the better version. Subjectively chosen, based on Dictionarry's personal preferences and major opinion. Needed to override the default special edition preference. Matches:\n- Terminator 2: Judgement Day (1991)\n- Alien (1979)\n- Star Wars OT (1977-1983)\n- Apocalypse Now (1979)\n- The Exorcist (1973)\n- Donnie Darko (2001)\n- Amadeus (1984)\n- Payback (1999)\n- Almost Famous (2000)",
      "tags": [
        "Edition"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "Terminator.2.Judgment.Day.Theatrical.Cut.1991.1080p.BluRay.DTS.x264.D-Z0N3",
          "lastRun": "2025-02-24T21:16:01.912349",
          "matchSpan": {
            "end": 12,
            "start": 0
          },
          "matchedContent": "Terminator.2",
          "matchedGroups": [
            "Terminator.2",
            null,
            null
          ],
          "passes": true
        },
        {
          "expected": false,
          "id": 2,
          "input": " Aliens.1986.Special.Edition.1080p.BluRay.DTS.x264-Geek.mkv",
          "lastRun": "2025-02-24T21:16:01.912349",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 3,
          "input": "Alien.1979.Directors.Cut.2in1.BluRay.1080p.AVC.DTS-HD.MA5.1-CHDBits",
          "lastRun": "2025-02-24T21:16:01.912349",
          "matchSpan": {
            "end": 10,
            "start": 0
          },
          "matchedContent": "Alien.1979",
          "matchedGroups": [
            "Alien.1979",
            null,
            null
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 4,
          "input": "star.wars.4K77.2160p.UHD.No-DNR.35mm.x265-v1.4.mkv",
          "lastRun": "2025-02-24T21:16:01.912349",
          "matchSpan": {
            "end": 14,
            "start": 0
          },
          "matchedContent": "star.wars.4K77",
          "matchedGroups": [
            "star.wars.4K77",
            "4K",
            "77"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 5,
          "input": "Star.Wars.Episode.IV.A.New.Hope.1977.COMPLETE.UHD.BLURAY-DIZZKNEE",
          "lastRun": "2025-02-24T21:16:01.912349",
          "matchSpan": {
            "end": 36,
            "start": 0
          },
          "matchedContent": "Star.Wars.Episode.IV.A.New.Hope.1977",
          "matchedGroups": [
            "Star.Wars.Episode.IV.A.New.Hope.1977",
            "19",
            "77"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 6,
          "input": "Star.Wars.1977.Theatrical.Cut.DVDRip.AC3.x264.mkv",
          "lastRun": "2025-02-24T21:16:01.912349",
          "matchSpan": {
            "end": 14,
            "start": 0
          },
          "matchedContent": "Star.Wars.1977",
          "matchedGroups": [
            "Star.Wars.1977",
            "19",
            "77"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 7,
          "input": "03 Empire.Strikes.Back.4K80.2160p.UHD.no-DNR.35mm.x265-v1.0.mkv",
          "lastRun": "2025-02-24T21:16:01.912349",
          "matchSpan": {
            "end": 22,
            "start": 0
          },
          "matchedContent": "03 Empire.Strikes.Back",
          "matchedGroups": [
            "03 Empire.Strikes.Back",
            null,
            null
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 8,
          "input": "Star.Wars.Episode.V.The.Empire.Strikes.Back.1980.2160p.UHD.BluRay.Remux.HDR.HEVC.Atmos-PmP.mkv",
          "lastRun": "2025-02-24T21:16:01.912349",
          "matchSpan": {
            "end": 43,
            "start": 0
          },
          "matchedContent": "Star.Wars.Episode.V.The.Empire.Strikes.Back",
          "matchedGroups": [
            "Star.Wars.Episode.V.The.Empire.Strikes.Back",
            null,
            null
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 9,
          "input": "Empire.Strikes.Back.1980.35mm.Renegade.Grindhouse.Scan.480p.DD2.0.x264.mkv",
          "lastRun": "2025-02-24T21:16:01.912349",
          "matchSpan": {
            "end": 19,
            "start": 0
          },
          "matchedContent": "Empire.Strikes.Back",
          "matchedGroups": [
            "Empire.Strikes.Back",
            null,
            null
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 10,
          "input": "Return.of.the.Jedi.4K83.2160p.UHD.35mm.x265-v1.1.mkv",
          "lastRun": "2025-02-24T21:16:01.912349",
          "matchSpan": {
            "end": 18,
            "start": 0
          },
          "matchedContent": "Return.of.the.Jedi",
          "matchedGroups": [
            "Return.of.the.Jedi",
            null,
            null
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 11,
          "input": "Star Wars Episode VI - Return of the Jedi (1983) 2160p UHD BluRay TrueHD 7.1 HDR x265-Chotab.mkv",
          "lastRun": "2025-02-24T21:16:01.912349",
          "matchSpan": {
            "end": 41,
            "start": 0
          },
          "matchedContent": "Star Wars Episode VI - Return of the Jedi",
          "matchedGroups": [
            "Star Wars Episode VI - Return of the Jedi",
            null,
            null
          ],
          "passes": true
        },
        {
          "expected": false,
          "id": 12,
          "input": "Star.Wars.Episode.IX.The.Rise.of.Skywalker.2019.UHD.BluRay.2160p.TrueHD.Atmos.7.1.HEVC.REMUX-FraMeSToR.mkv",
          "lastRun": "2025-02-24T21:16:01.912349",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 13,
          "input": "Apocalypse.Now.1979.Final.Cut.UHD.BluRay.2160p.TrueHD.Atmos.7.1.DV.HEVC.HYBRID.REMUX-FraMeSToR.mkv",
          "lastRun": "2025-02-24T21:16:01.912349",
          "matchSpan": {
            "end": 14,
            "start": 0
          },
          "matchedContent": "Apocalypse.Now",
          "matchedGroups": [
            "Apocalypse.Now",
            null,
            null
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 14,
          "input": "The.Exorcist.1973.2160p.UHD.Blu-ray.Remux.HDR.HEVC.TrueHD.7.1.Atmos-CiNEPHiLES.mkv",
          "lastRun": "2025-02-24T21:16:01.912349",
          "matchSpan": {
            "end": 17,
            "start": 0
          },
          "matchedContent": "The.Exorcist.1973",
          "matchedGroups": [
            "The.Exorcist.1973",
            null,
            null
          ],
          "passes": true
        },
        {
          "expected": false,
          "id": 15,
          "input": "The Pope's Exorcist 2023 1080p WEBRip DD+5.1 x264-HiDt.mkv",
          "lastRun": "2025-02-24T21:16:01.912349",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 16,
          "input": "The Exorcist III 1990 Theatrical 1080p BluRay DTS x264-VietHD.mkv",
          "lastRun": "2025-02-24T21:16:01.912349",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 17,
          "input": "Donnie.Darko.2001.2160p.UHD.Blu-ray.Remux.HEVC.HDR.DoVi.DTS-HD.MA.5.1-ARROW4KDV.mkv",
          "lastRun": "2025-02-24T21:16:01.912349",
          "matchSpan": {
            "end": 12,
            "start": 0
          },
          "matchedContent": "Donnie.Darko",
          "matchedGroups": [
            "Donnie.Darko",
            null,
            null
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 18,
          "input": "Amadeus.1984.Blu-Ray.1080p.DTSHD-MA.VC-1.Remux-HiFi.mkv",
          "lastRun": "2025-02-24T21:16:01.912349",
          "matchSpan": {
            "end": 7,
            "start": 0
          },
          "matchedContent": "Amadeus",
          "matchedGroups": [
            "Amadeus",
            null,
            null
          ],
          "passes": true
        },
        {
          "expected": false,
          "id": 19,
          "input": "National Theatre Live- Amadeus (2017).mkv",
          "lastRun": "2025-02-24T21:16:01.912349",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 20,
          "input": "Payback.Straight.Up.Directors.Cut.1999.Bluray-PTP",
          "lastRun": "2025-02-24T21:16:01.912349",
          "matchSpan": {
            "end": 38,
            "start": 0
          },
          "matchedContent": "Payback.Straight.Up.Directors.Cut.1999",
          "matchedGroups": [
            "Payback.Straight.Up.Directors.Cut.1999",
            null,
            null
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 21,
          "input": "Payback.1999.Theatrical.Cut.BluRay.1080p.TrueHD.5.1.VC-1.REMUX-FraMeSToR.mkv",
          "lastRun": "2025-02-24T21:16:01.912349",
          "matchSpan": {
            "end": 12,
            "start": 0
          },
          "matchedContent": "Payback.1999",
          "matchedGroups": [
            "Payback.1999",
            null,
            null
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 22,
          "input": "Payback Straight Up 2006 DC 1080p HDDVD DD5.1 x264-RightSiZE.mkv",
          "lastRun": "2025-02-24T21:16:01.912349",
          "matchSpan": {
            "end": 24,
            "start": 0
          },
          "matchedContent": "Payback Straight Up 2006",
          "matchedGroups": [
            "Payback Straight Up 2006",
            null,
            null
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 23,
          "input": "Payback.Theatrical.Cut.1999.1080p.BluRay.DD5.1.x264-REPTiLE.mkv",
          "lastRun": "2025-02-24T21:16:01.912349",
          "matchSpan": {
            "end": 27,
            "start": 0
          },
          "matchedContent": "Payback.Theatrical.Cut.1999",
          "matchedGroups": [
            "Payback.Theatrical.Cut.1999",
            null,
            null
          ],
          "passes": true
        },
        {
          "expected": false,
          "id": 24,
          "input": " Payback.2021.1080p.WEB.h264-RUMOUR.mkv",
          "lastRun": "2025-02-24T21:16:01.912349",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 25,
          "input": "Payback.DVDRip.AVC.AC3.(1995).mkv",
          "lastRun": "2025-02-24T21:16:01.912349",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 26,
          "input": "Almost.Famous.2000.Bootleg.Cut.UHD.BluRay.2160p.DTS-HD.MA.5.1.DV.HEVC.HYBRID.REMUX-FraMeSToR.mkv",
          "lastRun": "2025-02-24T21:16:01.912349",
          "matchSpan": {
            "end": 13,
            "start": 0
          },
          "matchedContent": "Almost.Famous",
          "matchedGroups": [
            "Almost.Famous",
            null,
            null
          ],
          "passes": true
        }
      ]
    },
    "slug": "better-theatricals",
    "filename": "Better Theatricals.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/beyondhd",
    "type": "regex-pattern",
    "data": {
      "name": "BeyondHD",
      "pattern": "(?<=^|[\\s.-])BeyondHD\\b",
      "description": "Banned Due to only doing Full Discs",
      "tags": [
        "Release Group",
        "UnWanted"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "Game of Thrones (2012) S02 2160p UHD Blu-ray HEVC DV HDR TrueHD Atmos 7.1 English-BeyondHD",
          "lastRun": "2024-12-13T17:46:48.251985",
          "matchSpan": {
            "end": 90,
            "start": 82
          },
          "matchedContent": "BeyondHD",
          "matchedGroups": [],
          "passes": true
        }
      ]
    },
    "slug": "beyondhd",
    "filename": "BeyondHD.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/bitor",
    "type": "regex-pattern",
    "data": {
      "name": "BiTOR",
      "pattern": "(?<=^|[\\s.-])BiTOR\\b",
      "description": "Banned for Fake DV/HDR Layer",
      "tags": [
        "Release Group",
        "UnWanted"
      ],
      "tests": []
    },
    "slug": "bitor",
    "filename": "BiTOR.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/bizkit",
    "type": "regex-pattern",
    "data": {
      "name": "BiZKiT",
      "pattern": "(?<=^|[\\s.-])BiZKiT\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Remux"
      ],
      "tests": []
    },
    "slug": "bizkit",
    "filename": "BiZKiT.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/bluraydesuyo",
    "type": "regex-pattern",
    "data": {
      "name": "BlurayDesuYo",
      "pattern": "(?<=^|[\\s.-])BlurayDesuYo\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "bluraydesuyo",
    "filename": "BlurayDesuYo.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/blzt",
    "type": "regex-pattern",
    "data": {
      "name": "BlzT",
      "pattern": "(?<=^|[\\s.-])BlzT\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "blzt",
    "filename": "BlzT.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/bracketed-year",
    "type": "regex-pattern",
    "data": {
      "name": "Bracketed Year",
      "pattern": "\\[\\d{4}\\]",
      "description": "Match a year moniker inside square brackets",
      "tags": [],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "Loki S01 [2021] 2160p HEVC Blu-Ray Remux HDR10 -SiCFoI",
          "lastRun": "2025-01-12T00:57:33.563808",
          "matchSpan": {
            "end": 15,
            "start": 9
          },
          "matchedContent": "[2021]",
          "matchedGroups": [],
          "passes": true
        }
      ]
    },
    "slug": "bracketed-year",
    "filename": "Bracketed Year.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/bravia-core",
    "type": "regex-pattern",
    "data": {
      "name": "Bravia Core",
      "pattern": "\\b(BCORE)\\b",
      "description": "Sony Pictures Core (formerly known as Bravia Core) is a video on demand service from Sony for its televisions and smartphones, launched in April 2021. The service offers the streaming of movies at up to 4K resolution provided by Sony Pictures Entertainment. CORE stands for Centre of Real Entertainment.",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "tests": []
    },
    "slug": "bravia-core",
    "filename": "Bravia Core.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/bunny-apocalypse",
    "type": "regex-pattern",
    "data": {
      "name": "Bunny-Apocalypse",
      "pattern": "(?<=^|[\\s.-])Bunny-Apocalypse\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "bunny-apocalypse",
    "filename": "Bunny-Apocalypse.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/cbt",
    "type": "regex-pattern",
    "data": {
      "name": "CBT",
      "pattern": "(?<=^|[\\s.-])CBT\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "cbt",
    "filename": "CBT.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/chaos",
    "type": "regex-pattern",
    "data": {
      "name": "CHAOS",
      "pattern": "(?<=^|[\\s.-])CHAOS\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "chaos",
    "filename": "CHAOS.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/chd",
    "type": "regex-pattern",
    "data": {
      "name": "CHD",
      "pattern": "(?<=^|[\\s.-])CHD\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "chd",
    "filename": "CHD.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/cj",
    "type": "regex-pattern",
    "data": {
      "name": "CJ",
      "pattern": "(?<=^|[\\s.-])CJ\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "cj",
    "filename": "CJ.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/cmct",
    "type": "regex-pattern",
    "data": {
      "name": "CMCT",
      "pattern": "(?<=^|[\\s.-])CMCT\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "cmct",
    "filename": "CMCT.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/cmrg",
    "type": "regex-pattern",
    "data": {
      "name": "CMRG",
      "pattern": "(?<=^|[\\s.-])CM(a)?R(io)?G\\b",
      "description": "Prolific WEB-DL group. ",
      "tags": [
        "Release Group",
        "WEB-DL"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "12 Dares of Christmas 2023 1080p AMZN WEB-DL DDP 2.0 H.264-CMRG",
          "lastRun": "2024-12-06T05:58:57.443985",
          "matchSpan": {
            "end": 63,
            "start": 59
          },
          "matchedContent": "CMRG",
          "matchedGroups": [
            null,
            null
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 2,
          "input": "The.Super.Mario.Bros.Movie.2023.1080p.MA.WEB-DL.DDP5.1.Atmos.H.264-CMaRioG.mkv",
          "lastRun": "2024-12-06T05:58:57.443985",
          "matchSpan": {
            "end": 74,
            "start": 67
          },
          "matchedContent": "CMaRioG",
          "matchedGroups": [
            "a",
            "io"
          ],
          "passes": true
        }
      ]
    },
    "slug": "cmrg",
    "filename": "CMRG.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/creative24",
    "type": "regex-pattern",
    "data": {
      "name": "CREATiVE24",
      "pattern": "(?<=^|[\\s.-])CREATiVE24\\b",
      "description": "Banned for Bloated Garbage",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "creative24",
    "filename": "CREATiVE24.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/crfw",
    "type": "regex-pattern",
    "data": {
      "name": "CRFW",
      "pattern": "(?<=^|[\\s.-])CRFW\\b",
      "description": "",
      "tags": [
        "Release Group",
        "WEB-DL"
      ],
      "tests": []
    },
    "slug": "crfw",
    "filename": "CRFW.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/crx",
    "type": "regex-pattern",
    "data": {
      "name": "CRX",
      "pattern": "(?<=^|[\\s.-])CRX\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "crx",
    "filename": "CRX.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/crisc",
    "type": "regex-pattern",
    "data": {
      "name": "CRiSC",
      "pattern": "(?<=^|[\\s.-])CRiSC\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "crisc",
    "filename": "CRiSC.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/ctr",
    "type": "regex-pattern",
    "data": {
      "name": "CTR",
      "pattern": "(?<=^|[\\s.-])CTR\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "ctr",
    "filename": "CTR.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/cait-sidhe",
    "type": "regex-pattern",
    "data": {
      "name": "Cait-Sidhe",
      "pattern": "(?<=^|[\\s.-])Cait-Sidhe\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "cait-sidhe",
    "filename": "Cait-Sidhe.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/chihiro",
    "type": "regex-pattern",
    "data": {
      "name": "Chihiro",
      "pattern": "(?<=^|[\\s.-])Chihiro\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "chihiro",
    "filename": "Chihiro.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/chotab",
    "type": "regex-pattern",
    "data": {
      "name": "Chotab",
      "pattern": "(?<=^|[\\s.-])Chotab\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "chotab",
    "filename": "Chotab.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/cinephiles",
    "type": "regex-pattern",
    "data": {
      "name": "CiNEPHiLES",
      "pattern": "(?<=^|[\\s.-])CiNEPHiLES\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Remux"
      ],
      "tests": []
    },
    "slug": "cinephiles",
    "filename": "CiNEPHiLES.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/cinefeel",
    "type": "regex-pattern",
    "data": {
      "name": "Cinefeel",
      "pattern": "(?<=^|[\\s.-])Cinefeel\\b",
      "description": "Matches \"Cinefeel\" when preceded by whitespace, a hyphen or dot",
      "tags": [
        "Release Group",
        "WEB-DL"
      ],
      "tests": []
    },
    "slug": "cinefeel",
    "filename": "Cinefeel.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/coalgirls",
    "type": "regex-pattern",
    "data": {
      "name": "CoalGirls",
      "pattern": "(?<=^|[\\s.-])CoalGirls\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "coalgirls",
    "filename": "CoalGirls.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/colourisation",
    "type": "regex-pattern",
    "data": {
      "name": "Colourisation",
      "pattern": "\\bcolou?r(i[sz]ed?|ed)?\\b",
      "description": "Colourisation (or colorization in American English) is the process of adding colour to black-and-white, sepia, or other monochrome images. Matches variations of `color` in both American and British spellings, including:\n\n- **Base forms:** `color`, `colour`\n- **Past tense/adjective forms:** `colored`, `coloured`\n- **Verb forms:** `colorize`, `colourize`, `colorise`, `colourise`\n- **Past participles:** `colorized`, `coloured`, `colourized`, `colourised`",
      "tags": [
        "Colour Grade",
        "Enhancement"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "colour",
          "lastRun": "2025-02-22T19:10:06.067266",
          "matchSpan": {
            "end": 6,
            "start": 0
          },
          "matchedContent": "colour",
          "matchedGroups": [
            null
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 3,
          "input": "coloured",
          "lastRun": "2025-02-22T19:10:06.067266",
          "matchSpan": {
            "end": 8,
            "start": 0
          },
          "matchedContent": "coloured",
          "matchedGroups": [
            "ed"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 4,
          "input": "colourise",
          "lastRun": "2025-02-22T19:10:06.067266",
          "matchSpan": {
            "end": 9,
            "start": 0
          },
          "matchedContent": "colourise",
          "matchedGroups": [
            "ise"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 7,
          "input": "colourised",
          "lastRun": "2025-02-22T19:10:06.067266",
          "matchSpan": {
            "end": 10,
            "start": 0
          },
          "matchedContent": "colourised",
          "matchedGroups": [
            "ised"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 8,
          "input": "colored",
          "lastRun": "2025-02-22T19:10:06.067266",
          "matchSpan": {
            "end": 7,
            "start": 0
          },
          "matchedContent": "colored",
          "matchedGroups": [
            "ed"
          ],
          "passes": true
        },
        {
          "expected": false,
          "id": 9,
          "input": "discolor",
          "lastRun": "2025-02-22T19:10:06.067266",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        }
      ]
    },
    "slug": "colourisation",
    "filename": "Colourisation.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/commie",
    "type": "regex-pattern",
    "data": {
      "name": "Commie",
      "pattern": "(?<=^|[\\s.-])Commie\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "commie",
    "filename": "Commie.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/criterion-channel",
    "type": "regex-pattern",
    "data": {
      "name": "Criterion Channel",
      "pattern": "\\b(CRiT)\\b",
      "description": "The Criterion Channel is a subscription-based streaming service launched on April 8, 2019, by The Criterion Collection. Available in the United States and Canada, it features a rich library of films, including Criterion Collection releases with special features, curated playlists, temporarily licensed titles, and original content such as academic overviews and introductions. The Channel also showcases Janus-owned titles not yet available on physical media and maintains a collaborative relationship with Warner Bros. Discovery's Max platform. Perfect for cinephiles, the service brings a curated cinematic experience to the digital space.",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "Wild 90 1968 480p CRiT WEB-DL AAC2 0 x264-AT3N",
          "lastRun": "2025-03-29T13:35:14.519621",
          "matchSpan": {
            "end": 22,
            "start": 18
          },
          "matchedContent": "CRiT",
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 2,
          "input": "Night Mother 1986 1080p CRiT WEB-DL AAC2 0 x264-AT3N",
          "lastRun": "2025-03-29T13:35:14.519621",
          "matchSpan": {
            "end": 28,
            "start": 24
          },
          "matchedContent": "CRiT",
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 3,
          "input": "Please Speak Continuously and Describe Your Experiences as They Come to You 2019 1080p CRIT WEB-DL AAC2 0 x264-SiGLA",
          "lastRun": "2025-03-29T13:35:14.519621",
          "matchSpan": {
            "end": 91,
            "start": 87
          },
          "matchedContent": "CRIT",
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 4,
          "input": "John Malkovich in The Music Critic 2021 720p WEB H264-LiQUiD",
          "lastRun": "2025-03-29T13:35:14.519621",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        }
      ]
    },
    "slug": "criterion-channel",
    "filename": "Criterion Channel.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/ctrlhd",
    "type": "regex-pattern",
    "data": {
      "name": "CtrlHD",
      "pattern": "(?<=^|[\\s.-])CtrlHD\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "ctrlhd",
    "filename": "CtrlHD.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/d-z0n3",
    "type": "regex-pattern",
    "data": {
      "name": "D-Z0N3",
      "pattern": "(?<=^|[\\s.-])D-Z0N3\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "d-z0n3",
    "filename": "D-Z0N3.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/deflate",
    "type": "regex-pattern",
    "data": {
      "name": "DEFLATE",
      "pattern": "(?<=^|[\\s.-])DEFLATE\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "deflate",
    "filename": "DEFLATE.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/depth",
    "type": "regex-pattern",
    "data": {
      "name": "DEPTH",
      "pattern": "(?<=^|[\\s.-])DEPTH\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "depth",
    "filename": "DEPTH.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/don",
    "type": "regex-pattern",
    "data": {
      "name": "DON",
      "pattern": "(?<=^|[\\s.-])DON\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "don",
    "filename": "DON.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/dts-hd-hra-es",
    "type": "regex-pattern",
    "data": {
      "name": "DTS-HD HRA ES",
      "pattern": "dts[-. ]?(es|(hd[. ]?)?(hr|hi))",
      "description": "",
      "tags": [
        "Audio"
      ],
      "tests": []
    },
    "slug": "dts-hd-hra-es",
    "filename": "DTS-HD HRA ES.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/dts-hd-ma",
    "type": "regex-pattern",
    "data": {
      "name": "DTS-HD MA",
      "pattern": "\\b(dts[-_. ]?(ma|hd([-_. ]?ma)?|xll))(\\b|\\d)",
      "description": "",
      "tags": [
        "Audio"
      ],
      "tests": []
    },
    "slug": "dts-hd-ma",
    "filename": "DTS-HD MA.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/dts-hd",
    "type": "regex-pattern",
    "data": {
      "name": "DTS-HD",
      "pattern": "\\b(dts[-_. ]?(ma|hd([-_. ]?ma)?|xll))\\b",
      "description": "",
      "tags": [
        "Audio"
      ],
      "tests": []
    },
    "slug": "dts-hd",
    "filename": "DTS-HD.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/dts-x",
    "type": "regex-pattern",
    "data": {
      "name": "DTS-X",
      "pattern": "\\b(dts[-_. :]?x)\\b(?!\\d)",
      "description": "",
      "tags": [
        "Audio"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "2 Fast 2 Furious (2003) 2160p MA WEB-DL H265 HDR DTS:X 7.1 English-FLUX",
          "lastRun": "2025-01-16T15:29:55.783259",
          "matchSpan": {
            "end": 54,
            "start": 49
          },
          "matchedContent": "DTS:X",
          "matchedGroups": [
            "DTS:X"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 2,
          "input": "2.Fast.2.Furious.2003.2160p.MA.WEB-DL.DTS-X.7.1.H.265-FLUX.mkv",
          "lastRun": "2025-01-16T15:29:55.783259",
          "matchSpan": {
            "end": 43,
            "start": 38
          },
          "matchedContent": "DTS-X",
          "matchedGroups": [
            "DTS-X"
          ],
          "passes": true
        }
      ]
    },
    "slug": "dts-x",
    "filename": "DTS-X.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/dts",
    "type": "regex-pattern",
    "data": {
      "name": "DTS",
      "pattern": "\\bDTS(\\b|\\d)",
      "description": "",
      "tags": [
        "Audio"
      ],
      "tests": []
    },
    "slug": "dts",
    "filename": "DTS.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/darq",
    "type": "regex-pattern",
    "data": {
      "name": "DarQ",
      "pattern": "(?<=^|[\\s.-])DarQ\\b",
      "description": "",
      "tags": [
        "Release Group",
        "HEVC"
      ],
      "tests": []
    },
    "slug": "darq",
    "filename": "DarQ.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/dariush",
    "type": "regex-pattern",
    "data": {
      "name": "Dariush",
      "pattern": "(?<=^|[\\s.-])Dariush\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "dariush",
    "filename": "Dariush.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/dekinai",
    "type": "regex-pattern",
    "data": {
      "name": "Dekinai",
      "pattern": "(?<=^|[\\s.-])Dekinai\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "dekinai",
    "filename": "Dekinai.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/depraved",
    "type": "regex-pattern",
    "data": {
      "name": "DepraveD",
      "pattern": "(?<=^|[\\s.-])DepraveD\\b",
      "description": "Banned for Fake DV/HDR Layer",
      "tags": [
        "Release Group",
        "UnWanted"
      ],
      "tests": []
    },
    "slug": "depraved",
    "filename": "DepraveD.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/disney",
    "type": "regex-pattern",
    "data": {
      "name": "Disney+",
      "pattern": "\\b(dsnp|dsny(p)?|disney\\+)\\s*\\b",
      "description": "Disney+ is an American subscription video on-demand over-the-top streaming media service that primarily distributes films and television shows produced by Walt Disney Studios and Disney Television Studios, with dedicated content hubs for Disney's flagship brands; Disney, Pixar, Marvel, Star Wars, National Geographic, ESPN, Hulu and Star.",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "Star Wars - The Clone Wars (2008) S06 (1080p DSNP WEB-DL H264 SDR DDP 5 1 English - HONE)",
          "lastRun": "2024-12-03T16:25:40.465487",
          "passes": true
        },
        {
          "expected": true,
          "id": 2,
          "input": "Pupstruction S02E09E10 The Funniest Pup in Petsburg Beddy Bye Build 720p DSNY WEB-DL AAC 2.0 H.264-4f8c4100292",
          "lastRun": "2024-12-03T16:25:40.465487",
          "passes": true
        },
        {
          "expected": true,
          "id": 3,
          "input": "Once Upon a Snowman 2020 DSNYP 1080p WEBRip X264 Atmos-EVO",
          "lastRun": "2024-12-03T16:25:40.465487",
          "passes": true
        },
        {
          "expected": false,
          "id": 4,
          "input": "How.Disney.Built.America.S01E01.1080p.WEB.h264-EDITH",
          "lastRun": "2024-12-03T16:25:40.465487",
          "passes": true
        },
        {
          "expected": true,
          "id": 5,
          "input": "High School Musical - The Musical - The Series S00E01 The Special 2160p HDR Disney+ WEBRip DD+ 5 1 x265-TrollUHD",
          "lastRun": "2024-12-03T16:25:40.465487",
          "passes": true
        },
        {
          "expected": true,
          "id": 6,
          "input": "Air Crash Investigation S18 2018 Disney+ WEB-DL 1080p H264 DDP-HDCTV",
          "lastRun": "2024-12-03T16:25:40.465487",
          "passes": true
        }
      ]
    },
    "slug": "disney",
    "filename": "Disney+.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/doki",
    "type": "regex-pattern",
    "data": {
      "name": "Doki",
      "pattern": "(?<=^|[\\s.-])Doki\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "doki",
    "filename": "Doki.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/dolby-digital",
    "type": "regex-pattern",
    "data": {
      "name": "Dolby Digital +",
      "pattern": "\\bDD[P+]|\\b(e[-_. ]?ac3)\\b",
      "description": "",
      "tags": [
        "Audio"
      ],
      "tests": []
    },
    "slug": "dolby-digital",
    "filename": "Dolby Digital +.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/dolby-digital",
    "type": "regex-pattern",
    "data": {
      "name": "Dolby Digital",
      "pattern": "\\bDD[^a-z+]|(?<!e)ac3",
      "description": "",
      "tags": [
        "Audio"
      ],
      "tests": []
    },
    "slug": "dolby-digital",
    "filename": "Dolby Digital.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/dolby-vision-without-fallback",
    "type": "regex-pattern",
    "data": {
      "name": "Dolby Vision (Without Fallback)",
      "pattern": "(?<=^(?!.*(HDR|HULU|REMUX|BLURAY)).*?)\\b(DV|Dovi|Dolby[- .]?V(ision)?)\\b",
      "description": "Matches Dolby Vision when it doesn't come with regular HDR Fallback (A Bluray Remux or a Hulu WEB-DL)",
      "tags": [
        "Enhancement",
        "Colour Grade",
        "HDR"
      ],
      "tests": [
        {
          "expected": false,
          "id": 1,
          "input": "Barbie.2023.2160p.MA.WEB-DL.DDP5.1.Atmos.DV.HDR.H.265-FLUX",
          "lastRun": "2025-06-18T11:54:10.281095",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 2,
          "input": "\t Barbie (2023) (2160p AMZN WEB-DL Hybrid H265 DV HDR10+ DDP Atmos 5.1 English - HONE)",
          "lastRun": "2025-06-18T11:54:10.281095",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 3,
          "input": "Barbie.2023.2160p.MA.WEB-DL.DDP5.1.Atmos.DV.H.265-FLUX",
          "lastRun": "2025-06-18T11:54:10.281095",
          "matchSpan": {
            "end": 43,
            "start": 41
          },
          "matchedContent": "DV",
          "matchedGroups": [
            null,
            "DV",
            null
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 4,
          "input": "Barbie.2023.2160p.MA.WEB-DL.DDP5.1.Atmos.DV.H.265-FLUX.mkv",
          "lastRun": "2025-06-18T11:54:10.281095",
          "matchSpan": {
            "end": 43,
            "start": 41
          },
          "matchedContent": "DV",
          "matchedGroups": [
            null,
            "DV",
            null
          ],
          "passes": true
        },
        {
          "expected": false,
          "id": 5,
          "input": "Killers of the Flower Moon (2023) {tmdb-466420} [iT][WEBDL-2160p][DV HDR10Plus][EAC3 Atmos 5.1][h265]-FLUX.mkv",
          "lastRun": "2025-06-18T11:54:10.281095",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        }
      ]
    },
    "slug": "dolby-vision-without-fallback",
    "filename": "Dolby Vision (Without Fallback).yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/dolby-vision",
    "type": "regex-pattern",
    "data": {
      "name": "Dolby Vision",
      "pattern": "\\b(dv(?![ .](HLG|SDR))|dovi|dolby[ .]?vision)\\b",
      "description": "Dolby Vision is a high dynamic range (HDR) video format that uses dynamic metadata to deliver enhanced brightness, contrast, and color on a scene-by-scene or frame-by-frame basis, providing superior picture quality. This pattern excludes matches where Dolby Vision is associated with SDR (Standard Dynamic Range) or HLG (Hybrid Log-Gamma), ensuring it focuses on Dolby Vision-specific terms.",
      "tags": [
        "Enhancement",
        "Colour Grade",
        "HDR"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "MovieName.2023.4K.DV.HDR.mkv",
          "lastRun": "2025-06-18T11:54:00.452053",
          "matchSpan": {
            "end": 20,
            "start": 18
          },
          "matchedContent": "DV",
          "matchedGroups": [
            "DV",
            null
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 2,
          "input": "MovieName.2023.4K.Dovi.HDR10+.mkv",
          "lastRun": "2025-06-18T11:54:00.452053",
          "matchSpan": {
            "end": 22,
            "start": 18
          },
          "matchedContent": "Dovi",
          "matchedGroups": [
            "Dovi",
            null
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 3,
          "input": "MovieName.2023.4K.Dolby.Vision.HDR.mkv",
          "lastRun": "2025-06-18T11:54:00.452053",
          "matchSpan": {
            "end": 30,
            "start": 18
          },
          "matchedContent": "Dolby.Vision",
          "matchedGroups": [
            "Dolby.Vision",
            null
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 4,
          "input": "MovieName.2023.4K.DolbyVision.HDR10+.mkv",
          "lastRun": "2025-06-18T11:54:00.452053",
          "matchSpan": {
            "end": 29,
            "start": 18
          },
          "matchedContent": "DolbyVision",
          "matchedGroups": [
            "DolbyVision",
            null
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 5,
          "input": "MovieName.1080p.DV.mkv",
          "lastRun": "2025-06-18T11:54:00.452053",
          "matchSpan": {
            "end": 18,
            "start": 16
          },
          "matchedContent": "DV",
          "matchedGroups": [
            "DV",
            null
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 6,
          "input": "MovieName.4K.Dolby Vision.IMAX.mkv",
          "lastRun": "2025-06-18T11:54:00.452053",
          "matchSpan": {
            "end": 25,
            "start": 13
          },
          "matchedContent": "Dolby Vision",
          "matchedGroups": [
            "Dolby Vision",
            null
          ],
          "passes": true
        },
        {
          "expected": false,
          "id": 7,
          "input": "MovieName.2023.4K.DV.HLG.mkv",
          "lastRun": "2025-06-18T11:54:00.452053",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 8,
          "input": "MovieName.2023.4K.DV.SDR.mkv",
          "lastRun": "2025-06-18T11:54:00.452053",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 9,
          "input": "MovieName.4K.DV.SDR.Dovi.mkv",
          "lastRun": "2025-06-18T11:54:00.452053",
          "matchSpan": {
            "end": 24,
            "start": 20
          },
          "matchedContent": "Dovi",
          "matchedGroups": [
            "Dovi",
            null
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 10,
          "input": "Killers of the Flower Moon (2023) {tmdb-466420} [iT][WEBDL-2160p][DV HDR10Plus][EAC3 Atmos 5.1][h265]-FLUX.mkv",
          "lastRun": "2025-06-18T11:54:00.452053",
          "matchSpan": {
            "end": 68,
            "start": 66
          },
          "matchedContent": "DV",
          "matchedGroups": [
            "DV",
            null
          ],
          "passes": true
        }
      ]
    },
    "slug": "dolby-vision",
    "filename": "Dolby Vision.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/drag",
    "type": "regex-pattern",
    "data": {
      "name": "Drag",
      "pattern": "(?<=^|[\\s.-])Drag\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "drag",
    "filename": "Drag.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/dual-audio",
    "type": "regex-pattern",
    "data": {
      "name": "Dual Audio",
      "pattern": "\\b((multi[^a-zA-Z]*)|(dual[\\s.-](audio|complete)))\\b",
      "description": "Matches releases with Dual Audio; Media releases that contain two language tracks - typically the original language (such as Japanese) along with an English dub, allowing viewers to switch between either audio track while watching the same video content.",
      "tags": [],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "\t The.Hunger.Games.2012.MULTi.1080p.BluRay.DTS.HD.MA.x264-HeavyWeight",
          "lastRun": "2024-12-18T11:58:49.979470",
          "matchSpan": {
            "end": 30,
            "start": 24
          },
          "matchedContent": "MULTi.",
          "matchedGroups": [
            "MULTi.",
            "MULTi.",
            null,
            null
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 2,
          "input": "The.Hunger.Games.2012.1080p.AMZN.WEB-DL.Multi.DDP5.1.H.264-DHRUB_DXD",
          "lastRun": "2024-12-18T11:58:49.979470",
          "matchSpan": {
            "end": 46,
            "start": 40
          },
          "matchedContent": "Multi.",
          "matchedGroups": [
            "Multi.",
            "Multi.",
            null,
            null
          ],
          "passes": true
        },
        {
          "expected": false,
          "id": 3,
          "input": "We Don't Die, We Multiply: The Robin Harris Story",
          "lastRun": "2024-12-18T11:58:49.979470",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 4,
          "input": "Cyberpunk 2077 Phantom Liberty MULTi19 v2 2 DINOByTES",
          "lastRun": "2024-12-18T11:58:49.979470",
          "matchSpan": {
            "end": 39,
            "start": 31
          },
          "matchedContent": "MULTi19 ",
          "matchedGroups": [
            "MULTi19 ",
            "MULTi19 ",
            null,
            null
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 5,
          "input": "Attack on Titan S04 2020 1080p USA Blu-ray AVC TrueHD 5.1 Dual Audio -ZR-",
          "lastRun": "2024-12-18T11:58:49.979470",
          "matchSpan": {
            "end": 68,
            "start": 58
          },
          "matchedContent": "Dual Audio",
          "matchedGroups": [
            "Dual Audio",
            null,
            "Dual Audio",
            "Audio"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 6,
          "input": "DanMachi Sword Oratoria Vol 01-04 2017 ANiME DUAL COMPLETE BLURAY-iFPD",
          "lastRun": "2024-12-18T11:58:49.979470",
          "matchSpan": {
            "end": 58,
            "start": 45
          },
          "matchedContent": "DUAL COMPLETE",
          "matchedGroups": [
            "DUAL COMPLETE",
            null,
            "DUAL COMPLETE",
            "COMPLETE"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 7,
          "input": "Bleach.S12.1080p.BluRay.REMUX.AVC.Dual-Audio.DTS-HD.MA.2.0-ZR-",
          "lastRun": "2024-12-18T11:58:49.979470",
          "matchSpan": {
            "end": 44,
            "start": 34
          },
          "matchedContent": "Dual-Audio",
          "matchedGroups": [
            "Dual-Audio",
            null,
            "Dual-Audio",
            "Audio"
          ],
          "passes": true
        },
        {
          "expected": false,
          "id": 8,
          "input": "Dual.2022.1080p.BluRay.DDP5.1.x264-iFT.mkv",
          "lastRun": "2024-12-18T11:58:49.979470",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 9,
          "input": "uality.A.Graffiti.Story.2022.1080p.WEB.H264-AEROHOLiCS.mkv",
          "lastRun": "2024-12-18T11:58:49.979470",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        }
      ]
    },
    "slug": "dual-audio",
    "filename": "Dual Audio.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/end",
    "type": "regex-pattern",
    "data": {
      "name": "E.N.D",
      "pattern": "(?<=^|[\\s.-])E.N.D\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "end",
    "filename": "E.N.D.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/e1",
    "type": "regex-pattern",
    "data": {
      "name": "E1",
      "pattern": "(?<=^|[\\s.-])E1\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "e1",
    "filename": "E1.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/ea",
    "type": "regex-pattern",
    "data": {
      "name": "EA",
      "pattern": "(?<=^|[\\s.-])EA\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "ea",
    "filename": "EA.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/edph",
    "type": "regex-pattern",
    "data": {
      "name": "EDPH",
      "pattern": "(?<=^|[\\s.-])EDPH\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "edph",
    "filename": "EDPH.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/emerald",
    "type": "regex-pattern",
    "data": {
      "name": "EMERALD",
      "pattern": "(?<=^|[\\s.-])EMERALD\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "emerald",
    "filename": "EMERALD.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/epsilon",
    "type": "regex-pattern",
    "data": {
      "name": "EPSiLON",
      "pattern": "(?<=^|[\\s.-])EPSiLON\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Remux"
      ],
      "tests": []
    },
    "slug": "epsilon",
    "filename": "EPSiLON.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/esir",
    "type": "regex-pattern",
    "data": {
      "name": "ESiR",
      "pattern": "(?<=^|[\\s.-])ESiR\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "esir",
    "filename": "ESiR.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/evo",
    "type": "regex-pattern",
    "data": {
      "name": "EVO",
      "pattern": "(?<=^|[\\s.-])EVO\\b",
      "description": "iPT Internal known for releasing pre-releases before anyone else. Also releases encodes of varying quality. ",
      "tags": [
        "Release Group",
        "WEB-DL"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "Aisha 2022 1080p WEB-DL DDP5 1 H 264-EVO",
          "lastRun": "2024-12-06T05:54:51.925977",
          "matchSpan": {
            "end": 40,
            "start": 37
          },
          "matchedContent": "EVO",
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 2,
          "input": "Dune AKA Dune: Part One 2021 1080p EUR Blu-ray AVC TrueHD 7.1 Atmos-EVO",
          "lastRun": "2024-12-06T05:54:51.925977",
          "matchSpan": {
            "end": 71,
            "start": 68
          },
          "matchedContent": "EVO",
          "matchedGroups": [],
          "passes": true
        }
      ]
    },
    "slug": "evo",
    "filename": "EVO.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/excision",
    "type": "regex-pattern",
    "data": {
      "name": "EXCiSION",
      "pattern": "(?<=^|[\\s.-])EXCiSION\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "excision",
    "filename": "EXCiSION.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/exp",
    "type": "regex-pattern",
    "data": {
      "name": "EXP",
      "pattern": "(?<=^|[\\s.-])EXP\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "exp",
    "filename": "EXP.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/ebp",
    "type": "regex-pattern",
    "data": {
      "name": "EbP",
      "pattern": "(?<=^|[\\s.-])EbP\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "ebp",
    "filename": "EbP.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/erai-raws",
    "type": "regex-pattern",
    "data": {
      "name": "Erai-Raws",
      "pattern": "(?<=^|[\\s.-])Erai-Raws\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "erai-raws",
    "filename": "Erai-Raws.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/exiled-destiny",
    "type": "regex-pattern",
    "data": {
      "name": "Exiled-Destiny",
      "pattern": "(?<=^|[\\s.-])Exiled-Destiny\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "exiled-destiny",
    "filename": "Exiled-Destiny.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/extended-clip",
    "type": "regex-pattern",
    "data": {
      "name": "Extended Clip",
      "pattern": "\\b(extended.?clip)\\b",
      "description": "Matches preview releases labelled as `Extended Clip`",
      "tags": [
        "Preview",
        "UnWanted"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "Killers Of The Flower Moon 2023 Extended Clip 1080p AMZN WEB-DL DDP 5.1 H 264-FLUX",
          "lastRun": "2025-02-25T22:09:00.135768",
          "matchSpan": {
            "end": 45,
            "start": 32
          },
          "matchedContent": "Extended Clip",
          "matchedGroups": [
            "Extended Clip"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 2,
          "input": "Killers.of.The.Flower.Moon.2023.Extended.Clip.1080p.AMZN.WEB-DL.DDP5.1.H.264-FLUX",
          "lastRun": "2025-02-25T22:09:00.135768",
          "matchSpan": {
            "end": 45,
            "start": 32
          },
          "matchedContent": "Extended.Clip",
          "matchedGroups": [
            "Extended.Clip"
          ],
          "passes": true
        }
      ]
    },
    "slug": "extended-clip",
    "filename": "Extended Clip.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/extras",
    "type": "regex-pattern",
    "data": {
      "name": "Extras",
      "pattern": "(?i)(?<=\\b[12]\\d{3}\\b).*(\\b|\\.)\\b(Extras?|Bonus|Extended[ ._-]Clip|Special Feature[s]?)\\b",
      "description": "Extras, Special Features, Featurettes, etc",
      "tags": [
        "UnWanted"
      ],
      "tests": [
        {
          "expected": false,
          "id": 1,
          "input": "E.T..el.ExtraTerrestre.30.Aniversario.1982.mHD.10Bits.1080p.BluRay.DD5.1.HEVC-TMd.mkv",
          "lastRun": "2025-02-07T06:19:53.936128",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        }
      ]
    },
    "slug": "extras",
    "filename": "Extras.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/fff",
    "type": "regex-pattern",
    "data": {
      "name": "FFF",
      "pattern": "(?<=^|[\\s.-])FFF\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "fff",
    "filename": "FFF.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/fgt",
    "type": "regex-pattern",
    "data": {
      "name": "FGT",
      "pattern": "(?<=^|[\\s.-])FGT\\b",
      "description": "Banned for Retagging",
      "tags": [
        "Release Group",
        "UnWanted"
      ],
      "tests": []
    },
    "slug": "fgt",
    "filename": "FGT.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/flac",
    "type": "regex-pattern",
    "data": {
      "name": "FLAC",
      "pattern": "\\bFLAC(\\b|\\d)",
      "description": "",
      "tags": [
        "Audio"
      ],
      "tests": []
    },
    "slug": "flac",
    "filename": "FLAC.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/flame",
    "type": "regex-pattern",
    "data": {
      "name": "FLAME",
      "pattern": "(?<=^|[\\s.-])FLAME\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "flame",
    "filename": "FLAME.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/flux",
    "type": "regex-pattern",
    "data": {
      "name": "FLUX",
      "pattern": "(?<=^|[\\s.-])FLUX\\b",
      "description": "",
      "tags": [
        "Release Group",
        "WEB-DL"
      ],
      "tests": []
    },
    "slug": "flux",
    "filename": "FLUX.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/frds",
    "type": "regex-pattern",
    "data": {
      "name": "FRDS",
      "pattern": "(?<=^|[\\s.-])FRDS\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "frds",
    "filename": "FRDS.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/ftw-hd",
    "type": "regex-pattern",
    "data": {
      "name": "FTW-HD",
      "pattern": "(?<=^|[\\s.-])FTW-HD\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "ftw-hd",
    "filename": "FTW-HD.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/filmhd",
    "type": "regex-pattern",
    "data": {
      "name": "FilmHD",
      "pattern": "(?<=^|[\\s.-])FilmHD\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "filmhd",
    "filename": "FilmHD.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/final8",
    "type": "regex-pattern",
    "data": {
      "name": "Final8",
      "pattern": "(?<=^|[\\s.-])Final8\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "final8",
    "filename": "Final8.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/flights",
    "type": "regex-pattern",
    "data": {
      "name": "Flights",
      "pattern": "(?<=^|[\\s.-])Flights\\b",
      "description": "Banned for Fake DV/HDR Layer",
      "tags": [
        "Release Group",
        "UnWanted"
      ],
      "tests": []
    },
    "slug": "flights",
    "filename": "Flights.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/flugel",
    "type": "regex-pattern",
    "data": {
      "name": "Flugel",
      "pattern": "(?<=^|[\\s.-])Flugel\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "flugel",
    "filename": "Flugel.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/form",
    "type": "regex-pattern",
    "data": {
      "name": "FoRM",
      "pattern": "(?<=^|[\\s.-])FoRM\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "form",
    "filename": "FoRM.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/framestor",
    "type": "regex-pattern",
    "data": {
      "name": "FraMeSToR",
      "pattern": "(?<=^|[\\s.-])FraMeSToR\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Remux"
      ],
      "tests": []
    },
    "slug": "framestor",
    "filename": "FraMeSToR.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/full-disc",
    "type": "regex-pattern",
    "data": {
      "name": "Full Disc",
      "pattern": "^(?!.*\\b((?<!HD[._ -]|HD)DVD|BDRip|MKV|XviD|WMV|d3g|BDREMUX|REMUX|^(?=.*1080p)(?=.*HEVC)|[xh][-_. ]?26[45]|German.*DL|((?<=\\d{4}).*German.*(DL)?)(?=.*\\b(AVC|HEVC|VC[-_. ]?1|MVC|MPEG[-_. ]?2)\\b))\\b)(((?=.*\\b(Blu[-_. ]?ray|BD|HD[-_. ]?DVD)\\b)(?=.*\\b(AVC|HEVC|VC[-_. ]?1|MVC|MPEG[-_. ]?2|BDMV|ISO)\\b))|^((?=.*\\b(^((?=.*\\b((.*_)?COMPLETE.*|Dis[ck])\\b)(?=.*(Blu[-_. ]?ray|HD[-_. ]?DVD)))|3D[-_. ]?BD|BR[-_. ]?DISK|Full[-_. ]?Blu[-_. ]?ray|^((?=.*((BD|UHD)[-_. ]?(25|50|66|100|ISO)))))))).*|(?i)(DVD9|DVD5|NTSC|PAL|VOB IFO|VC-1|AVC|MPEG-2|\\bCOMPLETE[-.\\s]?(?:UHD[-.\\s])?BLU[-.\\s]?RAY\\b|\\bCOMPLETE BLURAY\\b|\\bBR-Disk\\b)",
      "description": "A Full Disc release refers to a complete copy of a physical media disc, such as a DVD or Blu-ray, preserving all original content including menus, bonus features, and multiple audio or subtitle tracks. Unlike compressed or re-encoded formats, Full Disc files maintain the full structure and quality of the original disc, often stored as ISO files or folders like BDMV for Blu-rays. These releases are ideal for users seeking an authentic, unaltered experience identical to using the physical disc.",
      "tags": [
        "Storage"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "Bleach.S14.NTSC.DVD.LPCM2.0-NOGRP",
          "lastRun": "2024-12-08T22:54:52.791014",
          "matchSpan": {
            "end": 15,
            "start": 11
          },
          "matchedContent": "NTSC",
          "matchedGroups": [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            "NTSC"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 2,
          "input": "The Prisoner 2009 S01 1080i Blu-ray AVC DTS-HD MA 5.1-CultFilms™",
          "lastRun": "2024-12-08T22:54:52.791014",
          "matchSpan": {
            "end": 64,
            "start": 0
          },
          "matchedContent": "The Prisoner 2009 S01 1080i Blu-ray AVC DTS-HD MA 5.1-CultFilms™",
          "matchedGroups": [
            null,
            null,
            null,
            null,
            "",
            "",
            "Blu-ray",
            "AVC",
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 3,
          "input": "Scissor.Penis.2018.1080i.Blu-ray.AVC.DTS-HD.MA.2.0",
          "lastRun": "2024-12-08T22:54:52.791014",
          "matchSpan": {
            "end": 50,
            "start": 0
          },
          "matchedContent": "Scissor.Penis.2018.1080i.Blu-ray.AVC.DTS-HD.MA.2.0",
          "matchedGroups": [
            null,
            null,
            null,
            null,
            "",
            "",
            "Blu-ray",
            "AVC",
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 4,
          "input": "Heaven's Prisoners 1996 1080p AUS Blu-ray AVC LPCM 2.0-CultFilms™",
          "lastRun": "2024-12-08T22:54:52.791014",
          "matchSpan": {
            "end": 65,
            "start": 0
          },
          "matchedContent": "Heaven's Prisoners 1996 1080p AUS Blu-ray AVC LPCM 2.0-CultFilms™",
          "matchedGroups": [
            null,
            null,
            null,
            null,
            "",
            "",
            "Blu-ray",
            "AVC",
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 5,
          "input": "Hors-saison.2024.VOF.1080p.FRA.BluRay.AVC.DTS-HD.MA.5.1-RyanHG",
          "lastRun": "2024-12-08T22:54:52.791014",
          "matchSpan": {
            "end": 62,
            "start": 0
          },
          "matchedContent": "Hors-saison.2024.VOF.1080p.FRA.BluRay.AVC.DTS-HD.MA.5.1-RyanHG",
          "matchedGroups": [
            null,
            null,
            null,
            null,
            "",
            "",
            "BluRay",
            "AVC",
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 6,
          "input": "El.Aviso.2018.SPANiSH.COMPLETE.BLURAY-CEBCOM",
          "lastRun": "2024-12-08T22:54:52.791014",
          "matchSpan": {
            "end": 44,
            "start": 0
          },
          "matchedContent": "El.Aviso.2018.SPANiSH.COMPLETE.BLURAY-CEBCOM",
          "matchedGroups": [
            null,
            null,
            null,
            null,
            "",
            null,
            null,
            null,
            "",
            "",
            "",
            "COMPLETE.BLURAY-CEBCOM",
            null,
            "BLURAY",
            null,
            null,
            null,
            null,
            null
          ],
          "passes": true
        }
      ]
    },
    "slug": "full-disc",
    "filename": "Full Disc.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/galaxy",
    "type": "regex-pattern",
    "data": {
      "name": "GALAXY",
      "pattern": "(?<=^|[\\s.-])GALAXY\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "galaxy",
    "filename": "GALAXY.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/gnome",
    "type": "regex-pattern",
    "data": {
      "name": "GNOME",
      "pattern": "(?<=^|[\\s.-])GNOME\\b",
      "description": "Matches \"GNOME\" when preceded by whitespace, a hyphen or dot",
      "tags": [
        "Release Group",
        "WEB-DL"
      ],
      "tests": []
    },
    "slug": "gnome",
    "filename": "GNOME.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/grimm",
    "type": "regex-pattern",
    "data": {
      "name": "GRiMM",
      "pattern": "(?<=^|[\\s.-])GRiMM\\b",
      "description": "",
      "tags": [
        "Release Group",
        "HEVC"
      ],
      "tests": []
    },
    "slug": "grimm",
    "filename": "GRiMM.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/gs88",
    "type": "regex-pattern",
    "data": {
      "name": "GS88",
      "pattern": "(?<=^|[\\s.-])GS88\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "gs88",
    "filename": "GS88.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/guhzer",
    "type": "regex-pattern",
    "data": {
      "name": "GUHZER",
      "pattern": "(?<=^|[\\s.-])GUHZER\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "guhzer",
    "filename": "GUHZER.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/geek",
    "type": "regex-pattern",
    "data": {
      "name": "Geek",
      "pattern": "(?<=^|[\\s.-])Geek\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "geek",
    "filename": "Geek.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/handjob",
    "type": "regex-pattern",
    "data": {
      "name": "HANDJOB",
      "pattern": "(?<=^|[\\s.-])HANDJOB\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray",
        "DVD"
      ],
      "tests": []
    },
    "slug": "handjob",
    "filename": "HANDJOB.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/hbo-max-rename",
    "type": "regex-pattern",
    "data": {
      "name": "HBO Max Rename",
      "pattern": "\\[(HMAX)\\b|\\b(HMAX)\\]",
      "description": "HBO Max is an American subscription video-on-demand streaming service that offers a range of original programming and content from WarnerMedia's vast library, encompassing brands such as Warner Bros., CNN, Cartoon Network, TBS, and Turner Classic Movies. In mid-to-late 2023, HBO Max underwent a rebranding to \"Max\".",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "The Many Saints of Newark 2021 1080p HBOMAX WEBRiP x264 WAV-CREATiVE24",
          "lastRun": "2024-12-06T04:48:56.790473",
          "matchSpan": {
            "end": 43,
            "start": 37
          },
          "matchedContent": "HBOMAX",
          "matchedGroups": [
            "HBOMAX",
            "RiP"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 2,
          "input": "Looney Tunes Cartoons S04 1080p HBOM WEB-DL DD5.1 H.264-NTb",
          "lastRun": "2024-12-06T04:48:56.790473",
          "matchSpan": {
            "end": 36,
            "start": 32
          },
          "matchedContent": "HBOM",
          "matchedGroups": [
            "HBOM",
            "DL"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 3,
          "input": "12 oz Mouse S01 1080p HBOMax WEB-DL DDP2 x264-Mr Lahey",
          "lastRun": "2024-12-06T04:48:56.790473",
          "matchSpan": {
            "end": 28,
            "start": 22
          },
          "matchedContent": "HBOMax",
          "matchedGroups": [
            "HBOMax",
            "DL"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 4,
          "input": "Silicon Valley S01 1080p HMAX WEB-DL DD5 1 H 264-PHOENiX",
          "lastRun": "2024-12-06T04:48:56.790473",
          "matchSpan": {
            "end": 29,
            "start": 25
          },
          "matchedContent": "HMAX",
          "matchedGroups": [
            "HMAX",
            "DL"
          ],
          "passes": true
        },
        {
          "expected": false,
          "id": 5,
          "input": "A Discovery of Witches S03 1080p HBO WEB-DL AAC 2.0 H.264",
          "lastRun": "2024-12-06T04:48:56.790473",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 6,
          "input": "The Yin Yang Master Zero 2024 1080p BluRay REMUX AVC DTS-HD MA 7 1-HBO",
          "lastRun": "2024-12-06T04:48:56.790473",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        }
      ]
    },
    "slug": "hbo-max-rename",
    "filename": "HBO Max Rename.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/hbo-max",
    "type": "regex-pattern",
    "data": {
      "name": "HBO Max",
      "pattern": "\\b(hmax|hbom|hbo[ ._-]?max)\\b(?=[ ._-]web[ ._-]?(dl|rip)\\b)",
      "description": "HBO Max is an American subscription video-on-demand streaming service that offers a range of original programming and content from WarnerMedia's vast library, encompassing brands such as Warner Bros., CNN, Cartoon Network, TBS, and Turner Classic Movies. In mid-to-late 2023, HBO Max underwent a rebranding to \"Max\".",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "The Many Saints of Newark 2021 1080p HBOMAX WEBRiP x264 WAV-CREATiVE24",
          "lastRun": "2024-12-06T04:48:56.790473",
          "matchSpan": {
            "end": 43,
            "start": 37
          },
          "matchedContent": "HBOMAX",
          "matchedGroups": [
            "HBOMAX",
            "RiP"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 2,
          "input": "Looney Tunes Cartoons S04 1080p HBOM WEB-DL DD5.1 H.264-NTb",
          "lastRun": "2024-12-06T04:48:56.790473",
          "matchSpan": {
            "end": 36,
            "start": 32
          },
          "matchedContent": "HBOM",
          "matchedGroups": [
            "HBOM",
            "DL"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 3,
          "input": "12 oz Mouse S01 1080p HBOMax WEB-DL DDP2 x264-Mr Lahey",
          "lastRun": "2024-12-06T04:48:56.790473",
          "matchSpan": {
            "end": 28,
            "start": 22
          },
          "matchedContent": "HBOMax",
          "matchedGroups": [
            "HBOMax",
            "DL"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 4,
          "input": "Silicon Valley S01 1080p HMAX WEB-DL DD5 1 H 264-PHOENiX",
          "lastRun": "2024-12-06T04:48:56.790473",
          "matchSpan": {
            "end": 29,
            "start": 25
          },
          "matchedContent": "HMAX",
          "matchedGroups": [
            "HMAX",
            "DL"
          ],
          "passes": true
        },
        {
          "expected": false,
          "id": 5,
          "input": "A Discovery of Witches S03 1080p HBO WEB-DL AAC 2.0 H.264",
          "lastRun": "2024-12-06T04:48:56.790473",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 6,
          "input": "The Yin Yang Master Zero 2024 1080p BluRay REMUX AVC DTS-HD MA 7 1-HBO",
          "lastRun": "2024-12-06T04:48:56.790473",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        }
      ]
    },
    "slug": "hbo-max",
    "filename": "HBO Max.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/hd77",
    "type": "regex-pattern",
    "data": {
      "name": "HD77",
      "pattern": "(?<=^|[\\s.-])HD77\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "hd77",
    "filename": "HD77.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/hdchina",
    "type": "regex-pattern",
    "data": {
      "name": "HDChina",
      "pattern": "(?<=^|[\\s.-])HDChina\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "hdchina",
    "filename": "HDChina.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/hdmaniacs",
    "type": "regex-pattern",
    "data": {
      "name": "HDMaNiAcS",
      "pattern": "(?<=^|[\\s.-])HDMaNiAcS\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "hdmaniacs",
    "filename": "HDMaNiAcS.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/hdr",
    "type": "regex-pattern",
    "data": {
      "name": "HDR",
      "pattern": "\\b(HDR)\\b",
      "description": "This regex matches a `HDR` generalisation. This can be HDR10, HDR10+, etc. ",
      "tags": [
        "Enhancement",
        "Colour Grade",
        "HDR"
      ],
      "tests": [
        {
          "expected": true,
          "id": 2,
          "input": "HDR+",
          "lastRun": "2025-04-03T04:14:14.836165",
          "matchSpan": {
            "end": 3,
            "start": 0
          },
          "matchedContent": "HDR",
          "matchedGroups": [
            "HDR"
          ],
          "passes": true
        },
        {
          "expected": false,
          "id": 3,
          "input": "HDR10",
          "lastRun": "2025-04-03T04:14:14.836165",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 4,
          "input": "HDR10+",
          "lastRun": "2025-04-03T04:14:14.836165",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 8,
          "input": "HDR10",
          "lastRun": "2025-04-03T04:14:14.836165",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 9,
          "input": "Barbie (2023) 2160p UHD BluRay Hybrid REMUX HEVC DV HDR TrueHD Atmos 7.1 English-FraMeSToR",
          "lastRun": "2025-04-03T04:14:14.836165",
          "matchSpan": {
            "end": 55,
            "start": 52
          },
          "matchedContent": "HDR",
          "matchedGroups": [
            "HDR"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 10,
          "input": "Game of Thrones (2011) S06 2160p UHD BluRay REMUX HEVC DV HDR TrueHD Atmos 7.1 English-FraMeSToR",
          "lastRun": "2025-04-03T04:14:14.836165",
          "matchSpan": {
            "end": 61,
            "start": 58
          },
          "matchedContent": "HDR",
          "matchedGroups": [
            "HDR"
          ],
          "passes": true
        },
        {
          "expected": false,
          "id": 11,
          "input": "Liu lang di qiu 2 AKA The Wandering Earth II 2023 2160p CHN UHD Blu-ray DoVi HDR10 HEVC TrueHD 7.1 Atmos-ANKO",
          "lastRun": "2025-04-03T04:14:14.836165",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 12,
          "input": "Schindler's List (1993) 2160p UHD BluRay Hybrid REMUX HEVC DV HDR10+ TrueHD Atmos 7.1 English-WiLDCAT",
          "lastRun": "2025-04-03T04:14:14.836165",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 13,
          "input": "Schindler's List (1993) 2160p UHD BluRay Hybrid REMUX HEVC DV HDR10P TrueHD Atmos 7.1 English-WiLDCAT",
          "lastRun": "2025-04-03T04:14:14.836165",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        }
      ]
    },
    "slug": "hdr",
    "filename": "HDR.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/hdr10-missing-groups",
    "type": "regex-pattern",
    "data": {
      "name": "HDR10 (Missing Groups)",
      "pattern": "\\b(3L|CiNEPHiLES|c0kE|EDV|ElNeekster|FraMeSToR|HDH|HQMUX|Kenobi|mimic|NTb|playBD|RYU|SiCFoI|STRiKES|TekMUX|TRiToN|W4NK3R)\\b",
      "description": "Matches groups who mislabel HDR10",
      "tags": [
        "Release Group",
        "HDR"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "Loki S01 2023 2160p UHD Blu-ray Remux HEVC TrueHD 7 1 Atmos-HDS",
          "lastRun": "2025-01-12T01:22:17.490763",
          "matchSpan": {
            "end": 63,
            "start": 60
          },
          "matchedContent": "HDS",
          "matchedGroups": [
            "HDS",
            null
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 2,
          "input": "\t Loki S01 REPACK UHD BluRay 2160p TrueHD Atmos 7.1 DV HEVC HYBRID REMUX-FraMeSToR",
          "lastRun": "2025-01-12T01:22:17.490763",
          "matchSpan": {
            "end": 82,
            "start": 73
          },
          "matchedContent": "FraMeSToR",
          "matchedGroups": [
            "FraMeSToR",
            null
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 3,
          "input": "Alien Romulus 2024 BluRay 2160p UHD REMUX HEVC (10bit) DV Atmos DTS-HD MA 7 1-Aisha@RFX",
          "lastRun": "2025-01-12T01:22:17.490763",
          "matchSpan": {
            "end": 87,
            "start": 78
          },
          "matchedContent": "Aisha@RFX",
          "matchedGroups": [
            "Aisha@RFX",
            "@RFX"
          ],
          "passes": true
        }
      ]
    },
    "slug": "hdr10-missing-groups",
    "filename": "HDR10 (Missing Groups).yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/hdr10",
    "type": "regex-pattern",
    "data": {
      "name": "HDR10+",
      "pattern": "\\bHDR10.?(\\+|P(lus)?\\b)",
      "description": "This regex matches `HDR10` when followed by either a plus sign `+`, `P`, or `Plus`",
      "tags": [
        "Enhancement",
        "Colour Grade",
        "HDR"
      ],
      "tests": [
        {
          "expected": false,
          "id": 1,
          "input": "HDR",
          "lastRun": "2025-06-18T11:53:45.281996",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 2,
          "input": "HDR+",
          "lastRun": "2025-06-18T11:53:45.281996",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 3,
          "input": "HDR10",
          "lastRun": "2025-06-18T11:53:45.281996",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 4,
          "input": "HDR10+",
          "lastRun": "2025-06-18T11:53:45.281996",
          "matchSpan": {
            "end": 6,
            "start": 0
          },
          "matchedContent": "HDR10+",
          "matchedGroups": [
            "+",
            null
          ],
          "passes": true
        },
        {
          "expected": false,
          "id": 5,
          "input": "HLG HDR",
          "lastRun": "2025-06-18T11:53:45.281996",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 6,
          "input": "SDR HDR",
          "lastRun": "2025-06-18T11:53:45.281996",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 7,
          "input": "PQ HDR",
          "lastRun": "2025-06-18T11:53:45.281996",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 8,
          "input": "HDR10P",
          "lastRun": "2025-06-18T11:53:45.281996",
          "matchSpan": {
            "end": 6,
            "start": 0
          },
          "matchedContent": "HDR10P",
          "matchedGroups": [
            "P",
            null
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 9,
          "input": "HDR10Plus",
          "lastRun": "2025-06-18T11:53:45.281996",
          "matchSpan": {
            "end": 9,
            "start": 0
          },
          "matchedContent": "HDR10Plus",
          "matchedGroups": [
            "Plus",
            "lus"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 10,
          "input": "Schindler's List (1993) 2160p UHD BluRay Hybrid REMUX HEVC DV HDR10+ TrueHD Atmos 7.1 English-WiLDCAT",
          "lastRun": "2025-06-18T11:53:45.281996",
          "matchSpan": {
            "end": 68,
            "start": 62
          },
          "matchedContent": "HDR10+",
          "matchedGroups": [
            "+",
            null
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 11,
          "input": "La Maison S01 REPACK 2160p ATVP WEB-DL Dual-Audio DD+ 5.1 Atmos DV HDR10+ H.265-Kitsune",
          "lastRun": "2025-06-18T11:53:45.281996",
          "matchSpan": {
            "end": 73,
            "start": 67
          },
          "matchedContent": "HDR10+",
          "matchedGroups": [
            "+",
            null
          ],
          "passes": true
        },
        {
          "expected": false,
          "id": 12,
          "input": "Liu lang di qiu 2 AKA The Wandering Earth II 2023 2160p CHN UHD Blu-ray DoVi HDR10 HEVC TrueHD 7.1 Atmos-ANKO",
          "lastRun": "2025-06-18T11:53:45.281996",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 13,
          "input": "Schindler's List (1993) 2160p UHD BluRay Hybrid REMUX HEVC DV HDR10 Plus TrueHD Atmos 7.1 English-WiLDCAT",
          "lastRun": "2025-06-18T11:53:45.281996",
          "matchSpan": {
            "end": 72,
            "start": 62
          },
          "matchedContent": "HDR10 Plus",
          "matchedGroups": [
            "Plus",
            "lus"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 14,
          "input": "Killers of the Flower Moon (2023) {tmdb-466420} [iT][WEBDL-2160p][DV HDR10Plus][EAC3 Atmos 5.1][h265]-FLUX.mkv",
          "lastRun": "2025-06-18T11:53:45.281996",
          "matchSpan": {
            "end": 78,
            "start": 69
          },
          "matchedContent": "HDR10Plus",
          "matchedGroups": [
            "Plus",
            "lus"
          ],
          "passes": true
        }
      ]
    },
    "slug": "hdr10",
    "filename": "HDR10+.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/hdr10",
    "type": "regex-pattern",
    "data": {
      "name": "HDR10",
      "pattern": "\\bHDR10(?!\\+|Plus)\\b",
      "description": "This regex matches `HDR10` only when it *is not* followed by any HDR format specifiers like `+`, or `Plus`. ",
      "tags": [
        "Enhancement",
        "Colour Grade",
        "HDR"
      ],
      "tests": [
        {
          "expected": false,
          "id": 2,
          "input": "HDR+",
          "lastRun": "2025-04-02T20:01:38.732592",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 3,
          "input": "HDR10",
          "lastRun": "2025-04-02T20:01:38.732592",
          "matchSpan": {
            "end": 5,
            "start": 0
          },
          "matchedContent": "HDR10",
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 4,
          "input": "HDR10+",
          "lastRun": "2025-04-02T20:01:38.732592",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 5,
          "input": "HLG HDR",
          "lastRun": "2025-04-02T20:01:38.732592",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 6,
          "input": "SDR HDR",
          "lastRun": "2025-04-02T20:01:38.732592",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 7,
          "input": "PQ HDR",
          "lastRun": "2025-04-02T20:01:38.732592",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 8,
          "input": "HDR10",
          "lastRun": "2025-04-02T20:01:38.732592",
          "matchSpan": {
            "end": 5,
            "start": 0
          },
          "matchedContent": "HDR10",
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 9,
          "input": "Barbie (2023) 2160p UHD BluRay Hybrid REMUX HEVC DV HDR TrueHD Atmos 7.1 English-FraMeSToR",
          "lastRun": "2025-04-02T20:01:38.732592",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 10,
          "input": "Game of Thrones (2011) S06 2160p UHD BluRay REMUX HEVC DV HDR TrueHD Atmos 7.1 English-FraMeSToR",
          "lastRun": "2025-04-02T20:01:38.732592",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 11,
          "input": "Liu lang di qiu 2 AKA The Wandering Earth II 2023 2160p CHN UHD Blu-ray DoVi HDR10 HEVC TrueHD 7.1 Atmos-ANKO",
          "lastRun": "2025-04-02T20:01:38.732592",
          "matchSpan": {
            "end": 82,
            "start": 77
          },
          "matchedContent": "HDR10",
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 12,
          "input": "Schindler's List (1993) 2160p UHD BluRay Hybrid REMUX HEVC DV HDR10+ TrueHD Atmos 7.1 English-WiLDCAT",
          "lastRun": "2025-04-02T20:01:38.732592",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 13,
          "input": "Schindler's List (1993) 2160p UHD BluRay Hybrid REMUX HEVC DV HDR10P TrueHD Atmos 7.1 English-WiLDCAT",
          "lastRun": "2025-04-02T20:01:38.732592",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        }
      ]
    },
    "slug": "hdr10",
    "filename": "HDR10.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/hds",
    "type": "regex-pattern",
    "data": {
      "name": "HDS",
      "pattern": "(?<=^|[\\s.-])HDS\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "hds",
    "filename": "HDS.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/hdmux",
    "type": "regex-pattern",
    "data": {
      "name": "HDmux",
      "pattern": "(?<=^|[\\s.-])HDmux\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "hdmux",
    "filename": "HDmux.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/hevc",
    "type": "regex-pattern",
    "data": {
      "name": "HEVC",
      "pattern": "\\b(HEVC)\\b",
      "description": "An open source encoder that produces HEVC videos. ",
      "tags": [
        "Encoder",
        "Codec"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "Aqua Teen Hunger Force (2000) S00E13 (480p DVD x265 SDR AAC 2.0 English - r00t QxR)",
          "lastRun": "2025-01-14T10:24:52.457470",
          "matchSpan": {
            "end": 83,
            "start": 0
          },
          "matchedContent": "Aqua Teen Hunger Force (2000) S00E13 (480p DVD x265 SDR AAC 2.0 English - r00t QxR)",
          "matchedGroups": [
            "x265",
            "265"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 2,
          "input": "Planet Earth II S01 REPACK UHD BluRay 2160p DD5.1 HDR x265-BHDStudio",
          "lastRun": "2025-01-14T10:24:52.457470",
          "matchSpan": {
            "end": 68,
            "start": 0
          },
          "matchedContent": "Planet Earth II S01 REPACK UHD BluRay 2160p DD5.1 HDR x265-BHDStudio",
          "matchedGroups": [
            "x265",
            "265"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 3,
          "input": "Spider-Man Across the Spider-Verse 2023 1080p UHD BluRay DDP7 1 DoVi HDR10x265-c0kE",
          "lastRun": "2025-01-14T10:24:52.457470",
          "matchSpan": {
            "end": 83,
            "start": 0
          },
          "matchedContent": "Spider-Man Across the Spider-Verse 2023 1080p UHD BluRay DDP7 1 DoVi HDR10x265-c0kE",
          "matchedGroups": [
            "x265",
            "265"
          ],
          "passes": true
        }
      ]
    },
    "slug": "hevc",
    "filename": "HEVC.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/hhweb",
    "type": "regex-pattern",
    "data": {
      "name": "HHWEB",
      "pattern": "(?<=^|[\\s.-])HHWEB\\b",
      "description": "",
      "tags": [
        "Release Group",
        "WEB-DL"
      ],
      "tests": []
    },
    "slug": "hhweb",
    "filename": "HHWEB.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/hlg",
    "type": "regex-pattern",
    "data": {
      "name": "HLG",
      "pattern": "\\b(HLG)\\b",
      "description": "This regex matches a `HLG` generalisation. This is a basic HDR Format.",
      "tags": [
        "Enhancement",
        "Colour Grade",
        "HDR"
      ],
      "tests": []
    },
    "slug": "hlg",
    "filename": "HLG.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/hone",
    "type": "regex-pattern",
    "data": {
      "name": "HONE",
      "pattern": "(?<=^|[\\s.-])HONE\\b",
      "description": "",
      "tags": [
        "Release Group",
        "WEB-DL"
      ],
      "tests": []
    },
    "slug": "hone",
    "filename": "HONE.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/hqmux",
    "type": "regex-pattern",
    "data": {
      "name": "HQMUX",
      "pattern": "(?<=^|[\\s.-])HQMUX\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "hqmux",
    "filename": "HQMUX.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/huntjr",
    "type": "regex-pattern",
    "data": {
      "name": "HUNTJR",
      "pattern": "(?<=^|[\\s.-])HUNTJR\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "huntjr",
    "filename": "HUNTJR.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/hares",
    "type": "regex-pattern",
    "data": {
      "name": "Hares",
      "pattern": "(?<=^|[\\s.-])Hares\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "hares",
    "filename": "Hares.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/hidt",
    "type": "regex-pattern",
    "data": {
      "name": "HiDt",
      "pattern": "(?<=^|[\\s.-])HiDt\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "hidt",
    "filename": "HiDt.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/hifi",
    "type": "regex-pattern",
    "data": {
      "name": "HiFi",
      "pattern": "(?<=^|[\\s.-])HiFi\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "hifi",
    "filename": "HiFi.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/hip",
    "type": "regex-pattern",
    "data": {
      "name": "HiP",
      "pattern": "(?<=^|[\\s.-])HiP\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "hip",
    "filename": "HiP.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/horriblesubs",
    "type": "regex-pattern",
    "data": {
      "name": "HorribleSubs",
      "pattern": "(?<=^|[\\s.-])HorribleSubs\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "horriblesubs",
    "filename": "HorribleSubs.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/hotstar",
    "type": "regex-pattern",
    "data": {
      "name": "Hotstar",
      "pattern": "\\b(HTSR)\\b",
      "description": "Disney+ Hotstar, also known as JioHotstar or simply Hotstar, is an Indian subscription video-on-demand over-the-top streaming service owned by Disney Star. The brand was introduced as Hotstar for a streaming service carrying content from Disney Star's (formerly Star India) local networks, including films, television series, live sports, and original programming, as well as featuring content licensed from third parties such as Showtime among others.",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "tests": []
    },
    "slug": "hotstar",
    "filename": "Hotstar.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/hulu",
    "type": "regex-pattern",
    "data": {
      "name": "Hulu",
      "pattern": "\\b(Hulu)\\b",
      "description": "Hulu, an American subscription streaming service owned by Disney, offers recent TV episodes, full seasons of shows, original content, and live TV channels. As of December 2023, Hulu content is being integrated into Disney+, making its library accessible to Disney+ subscribers.",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "Agent Recon 2024 1080p HULU WEB-DL DDP 5 1 H 264-PiRaTeS",
          "lastRun": "2024-12-06T05:28:53.151608",
          "matchSpan": {
            "end": 27,
            "start": 23
          },
          "matchedContent": "HULU",
          "matchedGroups": [
            "HULU"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 2,
          "input": "Gullivers Travels 2010 1080p HULU WEB-DL DDP 5 1 H 264-PiRaTeS",
          "lastRun": "2024-12-06T05:28:53.151608",
          "matchSpan": {
            "end": 33,
            "start": 29
          },
          "matchedContent": "HULU",
          "matchedGroups": [
            "HULU"
          ],
          "passes": true
        }
      ]
    },
    "slug": "hulu",
    "filename": "Hulu.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/hypstu",
    "type": "regex-pattern",
    "data": {
      "name": "HypStu",
      "pattern": "(?<=^|[\\s.-])HypStu\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "hypstu",
    "filename": "HypStu.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/iamable",
    "type": "regex-pattern",
    "data": {
      "name": "IAMABLE",
      "pattern": "(?<=^|[\\s.-])IAMABLE\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "iamable",
    "filename": "IAMABLE.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/ide",
    "type": "regex-pattern",
    "data": {
      "name": "IDE",
      "pattern": "(?<=^|[\\s.-])IDE\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "ide",
    "filename": "IDE.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/ik",
    "type": "regex-pattern",
    "data": {
      "name": "IK",
      "pattern": "(?<=^|[\\s.-])IK\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "ik",
    "filename": "IK.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/imax-enhanced",
    "type": "regex-pattern",
    "data": {
      "name": "IMAX Enhanced",
      "pattern": "^(?=.*\\b((DSNP|Disney\\+|BC|B?CORE)(?=.?web.?(dl|rip)\\b)))(?=.*\\b((?<!NON.?)IMAX(.?Enhanced)?)\\b)",
      "description": "Matches IMAX releases from specific digital sources.\n\n- Checks for WEBs from `Disney+` or `Bravia Core`\n- Ensures \"IMAX\" appears (with optional \"Enhanced\" suffix) but not when preceded by \"NON\"",
      "tags": [
        "Enhancement",
        "Aspect Ratio"
      ],
      "tests": [
        {
          "expected": false,
          "id": 1,
          "input": "A.Writers.Odyssey.2021.1080p.IMAX.BluRay.REMUX.AVC.TrueHD.7.1.Atmos-BELGiAN.mkv",
          "lastRun": "2025-02-25T22:06:39.145915",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 2,
          "input": "Transformers Age Of Extinction 2014 NON-IMAX BluRay 1080p DTS AC3 x264-MgB",
          "lastRun": "2025-02-25T22:06:39.145915",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 3,
          "input": "Thor Ragnarok 2017 IMAX Enhanced 1080p HFR WEB-DL HDR10 HEVC 10bit DDP 5 1-Robo29",
          "lastRun": "2025-02-25T22:06:39.145915",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 4,
          "input": "Oppenheimer (2023) 2160p (UHD BluRay Enhanced IMAX HDR10Plus DoVi HEVC 10Bit TrueHD 5 1Ch and DTS-HD MA 5 1Ch)-ShieldBearer",
          "lastRun": "2025-02-25T22:06:39.145915",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 5,
          "input": "Thor Ragnarok 2017 IMAX Enhanced 1080p DSNP WEB-DL HDR10 HEVC 10bit DDP 5 1-Robo29",
          "lastRun": "2025-02-25T22:06:39.145915",
          "matchSpan": {
            "end": 0,
            "start": 0
          },
          "matchedContent": "",
          "matchedGroups": [
            "DSNP",
            "DSNP",
            "DL",
            "IMAX Enhanced",
            " Enhanced"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 6,
          "input": "Thor Ragnarok 2017 IMAX 1080p DSNP WEB-DL HDR10 HEVC 10bit DDP 5 1-Robo29",
          "lastRun": "2025-02-25T22:06:39.145915",
          "matchSpan": {
            "end": 0,
            "start": 0
          },
          "matchedContent": "",
          "matchedGroups": [
            "DSNP",
            "DSNP",
            "DL",
            "IMAX",
            null
          ],
          "passes": true
        },
        {
          "expected": false,
          "id": 7,
          "input": "Thor Ragnarok 2017 IMAX Enhanced 1080p WEB-DL HDR10 HEVC 10bit DDP 5 1-Robo29",
          "lastRun": "2025-02-25T22:06:39.145915",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        }
      ]
    },
    "slug": "imax-enhanced",
    "filename": "IMAX Enhanced.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/imax",
    "type": "regex-pattern",
    "data": {
      "name": "IMAX",
      "pattern": "\\b((?<!NON.?)IMAX)\\b",
      "description": "Matches any IMAX release. This includes:\n- Any movie shot with IMAX in mind and henceforth tagged as `IMAX`\n- IMAX Enchanced digital releases found on `Disney + / Bravia Core`",
      "tags": [
        "Enhancement",
        "Aspect Ratio"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "A.Writers.Odyssey.2021.1080p.IMAX.BluRay.REMUX.AVC.TrueHD.7.1.Atmos-BELGiAN.mkv",
          "lastRun": "2025-02-25T22:05:56.005325",
          "matchSpan": {
            "end": 33,
            "start": 29
          },
          "matchedContent": "IMAX",
          "matchedGroups": [
            "IMAX"
          ],
          "passes": true
        },
        {
          "expected": false,
          "id": 2,
          "input": "Transformers Age Of Extinction 2014 NON-IMAX BluRay 1080p DTS AC3 x264-MgB",
          "lastRun": "2025-02-25T22:05:56.005325",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 3,
          "input": "Thor Ragnarok 2017 IMAX Enhanced 1080p HFR WEB-DL HDR10 HEVC 10bit DDP 5 1-Robo29",
          "lastRun": "2025-02-25T22:05:56.005325",
          "matchSpan": {
            "end": 23,
            "start": 19
          },
          "matchedContent": "IMAX",
          "matchedGroups": [
            "IMAX"
          ],
          "passes": true
        }
      ]
    },
    "slug": "imax",
    "filename": "IMAX.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/iznjie-biznjie",
    "type": "regex-pattern",
    "data": {
      "name": "Iznjie Biznjie",
      "pattern": "(?<=^|[\\s.-])Iznjie Biznjie\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "iznjie-biznjie",
    "filename": "Iznjie Biznjie.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/justwatch",
    "type": "regex-pattern",
    "data": {
      "name": "JustWatch",
      "pattern": "(?<=^|[\\s.-])JustWatch\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "justwatch",
    "filename": "JustWatch.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/kan3d2m",
    "type": "regex-pattern",
    "data": {
      "name": "KAN3D2M",
      "pattern": "(?<=^|[\\s.-])KAN3D2M\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "kan3d2m",
    "filename": "KAN3D2M.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/kashmir",
    "type": "regex-pattern",
    "data": {
      "name": "KASHMiR",
      "pattern": "(?<=^|[\\s.-])KASHMiR\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "kashmir",
    "filename": "KASHMiR.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/kc",
    "type": "regex-pattern",
    "data": {
      "name": "KC",
      "pattern": "(?<=^|[\\s.-])KC\\b",
      "description": "Banned for AI Upscales",
      "tags": [
        "Release Group",
        "UnWanted"
      ],
      "tests": []
    },
    "slug": "kc",
    "filename": "KC.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/kcw",
    "type": "regex-pattern",
    "data": {
      "name": "KCW",
      "pattern": "\\b(KCW|Kocowa)\\b",
      "description": "Kocowa is an American over-the-top streaming service headquartered in Los Angeles as a joint venture between the top three Korean broadcast networks to provide Korean entertainment including K-dramas, K-reality, K-variety, and K-pop to the Americas and all with multi-language subtitles.",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "tests": []
    },
    "slug": "kcw",
    "filename": "KCW.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/kh",
    "type": "regex-pattern",
    "data": {
      "name": "KH",
      "pattern": "(?<=^|[\\s.-])KH\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "kh",
    "filename": "KH.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/knives",
    "type": "regex-pattern",
    "data": {
      "name": "KNiVES",
      "pattern": "(?<=^|[\\s.-])KNiVES\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "knives",
    "filename": "KNiVES.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/kralimarko",
    "type": "regex-pattern",
    "data": {
      "name": "KRaLiMaRKo",
      "pattern": "(?<=^|[\\s.-])KRaLiMaRKo\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Remux"
      ],
      "tests": []
    },
    "slug": "kralimarko",
    "filename": "KRaLiMaRKo.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/kaleido",
    "type": "regex-pattern",
    "data": {
      "name": "Kaleido",
      "pattern": "(?<=^|[\\s.-])Kaleido\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "kaleido",
    "filename": "Kaleido.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/kametsu",
    "type": "regex-pattern",
    "data": {
      "name": "Kametsu",
      "pattern": "(?<=^|[\\s.-])Kametsu\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "kametsu",
    "filename": "Kametsu.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/kings",
    "type": "regex-pattern",
    "data": {
      "name": "KiNGS",
      "pattern": "(?<=^|[\\s.-])KiNGS\\b",
      "description": "",
      "tags": [
        "Release Group",
        "WEB-DL"
      ],
      "tests": []
    },
    "slug": "kings",
    "filename": "KiNGS.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/kitsune",
    "type": "regex-pattern",
    "data": {
      "name": "Kitsune",
      "pattern": "(?<=^|[\\s.-])Kitsune\\b",
      "description": "",
      "tags": [
        "Release Group",
        "WEB-DL"
      ],
      "tests": []
    },
    "slug": "kitsune",
    "filename": "Kitsune.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/kotengars",
    "type": "regex-pattern",
    "data": {
      "name": "Koten_Gars",
      "pattern": "(?<=^|[\\s.-])Koten_Gars\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "kotengars",
    "filename": "Koten_Gars.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/lama",
    "type": "regex-pattern",
    "data": {
      "name": "LAMA",
      "pattern": "(?<=^|[\\s.-])LAMA\\b",
      "description": "Banned for Retagging",
      "tags": [
        "Release Group",
        "UnWanted"
      ],
      "tests": []
    },
    "slug": "lama",
    "filename": "LAMA.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/lazarus",
    "type": "regex-pattern",
    "data": {
      "name": "LAZARUS",
      "pattern": "(?<=^|[\\s.-])LAZARUS\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "lazarus",
    "filename": "LAZARUS.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/lazy",
    "type": "regex-pattern",
    "data": {
      "name": "LAZY",
      "pattern": "(?<=^|[\\s.-])LAZY\\b",
      "description": "Matches \"LAZY\" when preceded by whitespace, a hyphen or dot",
      "tags": [
        "Release Group",
        "WEB-DL"
      ],
      "tests": []
    },
    "slug": "lazy",
    "filename": "LAZY.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/legi0n",
    "type": "regex-pattern",
    "data": {
      "name": "LEGi0N",
      "pattern": "(?<=^|[\\s.-])LEGi0N\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "legi0n",
    "filename": "LEGi0N.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/lm",
    "type": "regex-pattern",
    "data": {
      "name": "LM",
      "pattern": "(?<=^|[\\s.-])LM\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Remux"
      ],
      "tests": []
    },
    "slug": "lm",
    "filename": "LM.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/lst",
    "type": "regex-pattern",
    "data": {
      "name": "LSt",
      "pattern": "(?<=^|[\\s.-])LSt\\b",
      "description": "",
      "tags": [
        "Release Group",
        "HEVC"
      ],
      "tests": []
    },
    "slug": "lst",
    "filename": "LSt.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/lys1th3a",
    "type": "regex-pattern",
    "data": {
      "name": "LYS1TH3A",
      "pattern": "(?<=^|[\\s.-])LYS1TH3A\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "lys1th3a",
    "filename": "LYS1TH3A.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/lazyremux",
    "type": "regex-pattern",
    "data": {
      "name": "LazyRemux",
      "pattern": "(?<=^|[\\s.-])LazyRemux\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "lazyremux",
    "filename": "LazyRemux.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/ling",
    "type": "regex-pattern",
    "data": {
      "name": "LiNG",
      "pattern": "(?<=^|[\\s.-])LiNG\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "ling",
    "filename": "LiNG.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/littlebakas",
    "type": "regex-pattern",
    "data": {
      "name": "LittleBakas",
      "pattern": "(?<=^|[\\s.-])LittleBakas\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "littlebakas",
    "filename": "LittleBakas.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/lord",
    "type": "regex-pattern",
    "data": {
      "name": "LoRD",
      "pattern": "(?<=^|[\\s.-])LoRD\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "lord",
    "filename": "LoRD.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/lolhd",
    "type": "regex-pattern",
    "data": {
      "name": "LolHD",
      "pattern": "(?<=^|[\\s.-])LolHD\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "lolhd",
    "filename": "LolHD.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/lucifer",
    "type": "regex-pattern",
    "data": {
      "name": "Lucifer",
      "pattern": "(?<=^|[\\s.-])Lucifer\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "lucifer",
    "filename": "Lucifer.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/lulu",
    "type": "regex-pattern",
    "data": {
      "name": "Lulu",
      "pattern": "(?<=^|[\\s.-])Lulu\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "lulu",
    "filename": "Lulu.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/malus",
    "type": "regex-pattern",
    "data": {
      "name": "MALUS",
      "pattern": "(?<=^|[\\s.-])MALUS\\b",
      "description": "",
      "tags": [
        "Release Group",
        "UnWanted"
      ],
      "tests": []
    },
    "slug": "malus",
    "filename": "MALUS.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/mtbb",
    "type": "regex-pattern",
    "data": {
      "name": "MTBB",
      "pattern": "(?<=^|[\\s.-])MTBB\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "mtbb",
    "filename": "MTBB.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/mteam",
    "type": "regex-pattern",
    "data": {
      "name": "MTeam",
      "pattern": "(?<=^|[\\s.-])MTeam\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "mteam",
    "filename": "MTeam.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/mzabi",
    "type": "regex-pattern",
    "data": {
      "name": "MZABI",
      "pattern": "(?<=^|[\\s.-])MZABI\\b",
      "description": "",
      "tags": [
        "Release Group",
        "WEB-DL"
      ],
      "tests": []
    },
    "slug": "mzabi",
    "filename": "MZABI.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/mainframe",
    "type": "regex-pattern",
    "data": {
      "name": "MainFrame",
      "pattern": "(?<=^|[\\s.-])MainFrame\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "mainframe",
    "filename": "MainFrame.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/max-rename",
    "type": "regex-pattern",
    "data": {
      "name": "Max Rename",
      "pattern": "\\[(MAX)\\b|\\b(MAX)\\]",
      "description": "Max, formerly (and in some regions still) known as HBO Max, is an American subscription video on-demand over-the-top streaming service. The platform offers content from the libraries of Warner Bros., Discovery, HBO, CNN, Cartoon Network, Adult Swim, Animal Planet, TBS, TNT, Eurosport, and their related brands.",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "Dune Prophecy S01E02 Two Wolves 1080p MAX WEB-DL DDP5 1 Atmos H 264-FLUX",
          "lastRun": "2024-12-06T02:54:31.077207",
          "matchSpan": {
            "end": 41,
            "start": 38
          },
          "matchedContent": "MAX",
          "matchedGroups": [
            "MAX",
            "DL"
          ],
          "passes": true
        },
        {
          "expected": false,
          "id": 2,
          "input": "Guardians of the Galaxy Vol. 3 (2023) IMAX (2160p MA WEB-DL Hybrid H265 DV HDR DDP Atmos 5.1 English - HONE)",
          "lastRun": "2024-12-06T02:54:31.077207",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 3,
          "input": "Max.Verstappen.Anatomy.of.a.Champion.S01E01.1080p.WEB.h264-B2B",
          "lastRun": "2024-12-06T02:54:31.077207",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 4,
          "input": "Silicon Valley S06 1080p HMAX WEB-DL DD5 1 H 264-PHOENiX",
          "lastRun": "2024-12-06T02:54:31.077207",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 5,
          "input": "Dune Prophecy S01E01 The Hidden Hand 2160p MAX WEB-DL DDP 5.1 Atmos DV HDR H.265-FLUX",
          "lastRun": "2024-12-06T02:54:31.077207",
          "matchSpan": {
            "end": 46,
            "start": 43
          },
          "matchedContent": "MAX",
          "matchedGroups": [
            "MAX",
            "DL"
          ],
          "passes": true
        }
      ]
    },
    "slug": "max-rename",
    "filename": "Max Rename.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/max",
    "type": "regex-pattern",
    "data": {
      "name": "Max",
      "pattern": "\\b((?<!hbo[ ._-])max)\\b(?=[ ._-]web[ ._-]?(dl|rip)\\b)",
      "description": "Max, formerly (and in some regions still) known as HBO Max, is an American subscription video on-demand over-the-top streaming service. The platform offers content from the libraries of Warner Bros., Discovery, HBO, CNN, Cartoon Network, Adult Swim, Animal Planet, TBS, TNT, Eurosport, and their related brands.",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "Dune Prophecy S01E02 Two Wolves 1080p MAX WEB-DL DDP5 1 Atmos H 264-FLUX",
          "lastRun": "2024-12-06T02:54:31.077207",
          "matchSpan": {
            "end": 41,
            "start": 38
          },
          "matchedContent": "MAX",
          "matchedGroups": [
            "MAX",
            "DL"
          ],
          "passes": true
        },
        {
          "expected": false,
          "id": 2,
          "input": "Guardians of the Galaxy Vol. 3 (2023) IMAX (2160p MA WEB-DL Hybrid H265 DV HDR DDP Atmos 5.1 English - HONE)",
          "lastRun": "2024-12-06T02:54:31.077207",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 3,
          "input": "Max.Verstappen.Anatomy.of.a.Champion.S01E01.1080p.WEB.h264-B2B",
          "lastRun": "2024-12-06T02:54:31.077207",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 4,
          "input": "Silicon Valley S06 1080p HMAX WEB-DL DD5 1 H 264-PHOENiX",
          "lastRun": "2024-12-06T02:54:31.077207",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 5,
          "input": "Dune Prophecy S01E01 The Hidden Hand 2160p MAX WEB-DL DDP 5.1 Atmos DV HDR H.265-FLUX",
          "lastRun": "2024-12-06T02:54:31.077207",
          "matchSpan": {
            "end": 46,
            "start": 43
          },
          "matchedContent": "MAX",
          "matchedGroups": [
            "MAX",
            "DL"
          ],
          "passes": true
        }
      ]
    },
    "slug": "max",
    "filename": "Max.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/mimic",
    "type": "regex-pattern",
    "data": {
      "name": "MiMiC",
      "pattern": "(?<=^|[\\s.-])MiMiC\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "mimic",
    "filename": "MiMiC.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/movieman",
    "type": "regex-pattern",
    "data": {
      "name": "MovieMan",
      "pattern": "(?<=^|[\\s.-])MovieMan\\b",
      "description": "",
      "tags": [
        "Release Group",
        "UnWanted"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "Blade.Runner.2049.2017.1080p.UHD.BluRay.HDR.x265.DDP.5.1-MovieMan",
          "lastRun": "2025-01-14T10:00:33.086158",
          "matchSpan": {
            "end": 65,
            "start": 57
          },
          "matchedContent": "MovieMan",
          "matchedGroups": [],
          "passes": true
        }
      ]
    },
    "slug": "movieman",
    "filename": "MovieMan.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/movies-anywhere",
    "type": "regex-pattern",
    "data": {
      "name": "Movies Anywhere",
      "pattern": "\\b(?<!dts[ .-]?hd[ .-]?)ma\\b(?=.*\\bweb[ ._-]?(dl|rip)\\b)",
      "description": "Movies Anywhere (MA) is a cloud-based digital rights locker and over-the-top streaming platform that allows users to stream and download purchased films, including digital copies redeemed from codes found in home video releases as well as digital purchases from participating services",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "Scooby-Doo.In.Wheres.My.Mummy.2005.1080p.MA.WEB-DL.DDP5.1.H264-HHWEB.mkv",
          "lastRun": "2025-01-28T07:28:30.747386",
          "matchSpan": {
            "end": 43,
            "start": 41
          },
          "matchedContent": "MA",
          "matchedGroups": [
            "DL"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 2,
          "input": "Speak.No.Evil.2024.1080p.MA.WEB-DL.DDP5.1.Atmos.H.264-FLUX.mkv",
          "lastRun": "2025-01-28T07:28:30.747386",
          "matchSpan": {
            "end": 27,
            "start": 25
          },
          "matchedContent": "MA",
          "matchedGroups": [
            "DL"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 3,
          "input": "The.Super.Mario.Bros.Movie.2023.1080p.MA.WEB-DL.DDP5.1.Atmos.H.264-CMaRioG.mkv",
          "lastRun": "2025-01-28T07:28:30.747386",
          "matchSpan": {
            "end": 40,
            "start": 38
          },
          "matchedContent": "MA",
          "matchedGroups": [
            "DL"
          ],
          "passes": true
        },
        {
          "expected": false,
          "id": 4,
          "input": "Interstellar.2014.UHD.BluRay.2160p.DTS-HD.MA.5.1.HEVC.REMUX-FraMeSToR.mkv",
          "lastRun": "2025-01-28T07:28:30.747386",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 5,
          "input": "The.Amazing.Spider-Man.2012.1080p.Remastered.BluRay.DTSHD-MA.x264.D-Z0N3.mkv",
          "lastRun": "2025-01-28T07:28:30.747386",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 6,
          "input": "[ToonsHub] Orb On the Movements of the Earth S01E01 1080p ABEMA WEB-DL AAC2.0 H.264",
          "lastRun": "2025-01-28T07:28:30.747386",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 7,
          "input": "[ToonsHub] Orb On the Movements of the Earth S01E01 1080p ABE MA WEB-DL AAC2.0 H.264",
          "lastRun": "2025-01-28T07:28:30.747386",
          "matchSpan": {
            "end": 64,
            "start": 62
          },
          "matchedContent": "MA",
          "matchedGroups": [
            "DL"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 8,
          "input": "[ToonsHub] Orb On the Movements of the Earth S01E01 1080p ABE.MA WEB-DL AAC2.0 H.264",
          "lastRun": "2025-01-28T07:28:30.747386",
          "matchSpan": {
            "end": 64,
            "start": 62
          },
          "matchedContent": "MA",
          "matchedGroups": [
            "DL"
          ],
          "passes": true
        }
      ]
    },
    "slug": "movies-anywhere",
    "filename": "Movies Anywhere.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/mysteria",
    "type": "regex-pattern",
    "data": {
      "name": "Mysteria",
      "pattern": "(?<=^|[\\s.-])Mysteria\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "mysteria",
    "filename": "Mysteria.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/nahom",
    "type": "regex-pattern",
    "data": {
      "name": "NAHOM",
      "pattern": "(?<=^|[\\s.-])NAHOM\\b",
      "description": "Banned for Poor Quality Multi",
      "tags": [
        "Release Group",
        "UnWanted"
      ],
      "tests": []
    },
    "slug": "nahom",
    "filename": "NAHOM.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/ncmt",
    "type": "regex-pattern",
    "data": {
      "name": "NCmt",
      "pattern": "(?<=^|[\\s.-])NCmt\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Remux",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "ncmt",
    "filename": "NCmt.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/nosivid",
    "type": "regex-pattern",
    "data": {
      "name": "NOSiViD",
      "pattern": "(?<=^|[\\s.-])NOSiViD\\b",
      "description": "",
      "tags": [
        "Release Group",
        "WEB-DL"
      ],
      "tests": []
    },
    "slug": "nosivid",
    "filename": "NOSiViD.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/ntg",
    "type": "regex-pattern",
    "data": {
      "name": "NTG",
      "pattern": "(?<=^|[\\s.-])NTG\\b",
      "description": "",
      "tags": [
        "Release Group",
        "WEB-DL"
      ],
      "tests": []
    },
    "slug": "ntg",
    "filename": "NTG.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/ntb",
    "type": "regex-pattern",
    "data": {
      "name": "NTb",
      "pattern": "(?<=^|[\\s.-])NTb\\b",
      "description": "",
      "tags": [
        "Release Group",
        "WEB-DL"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "Zen - Grogu and Dust Bunnies (2022) 2160p DSNP WEB-DL H265 HDR DDP 5.1 English-NTb",
          "lastRun": "2025-02-09T03:47:23.981431",
          "matchSpan": {
            "end": 82,
            "start": 79
          },
          "matchedContent": "NTb",
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 2,
          "input": "Jab.We.Met.2007.1080p.BluRay.DTS.x264-NTb.mkv",
          "lastRun": "2025-02-09T03:47:23.981431",
          "matchSpan": {
            "end": 41,
            "start": 38
          },
          "matchedContent": "NTb",
          "matchedGroups": [],
          "passes": true
        }
      ]
    },
    "slug": "ntb",
    "filename": "NTb.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/netaro",
    "type": "regex-pattern",
    "data": {
      "name": "Netaro",
      "pattern": "(?<=^|[\\s.-])Netaro\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "netaro",
    "filename": "Netaro.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/netflix",
    "type": "regex-pattern",
    "data": {
      "name": "Netflix",
      "pattern": "\\b(NF|Netflix)\\b",
      "description": "Netflix is an American subscription video on-demand over-the-top streaming service. The service primarily distributes original and acquired films and television shows from various genres, and it is available internationally in multiple languages.",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "The.Roast.of.Tom.Brady.2024.1080p.NF.WEB-DL.DDP5.1.H.264-NTb",
          "lastRun": "2024-12-06T05:02:55.281514",
          "matchSpan": {
            "end": 36,
            "start": 34
          },
          "matchedContent": "NF",
          "matchedGroups": [
            "NF"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 2,
          "input": "Penn & Teller - Fool Us S01 1080p Netflix WEB-DL DD+ 2 0 x264-TrollHD",
          "lastRun": "2024-12-06T05:02:55.281514",
          "matchSpan": {
            "end": 41,
            "start": 34
          },
          "matchedContent": "Netflix",
          "matchedGroups": [
            "Netflix"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 3,
          "input": "Anthony Jeselnik: Bones and All 2024 1080p NF WEB-DL DDP5 1 H 264-FLUX",
          "lastRun": "2024-12-06T05:02:55.281514",
          "matchSpan": {
            "end": 45,
            "start": 43
          },
          "matchedContent": "NF",
          "matchedGroups": [
            "NF"
          ],
          "passes": true
        },
        {
          "expected": false,
          "id": 4,
          "input": "Its in the Game Madden NFL S01E02 1080p WEB H264-GloriousMongoose",
          "lastRun": "2024-12-06T05:02:55.281514",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        }
      ]
    },
    "slug": "netflix",
    "filename": "Netflix.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/nogroup",
    "type": "regex-pattern",
    "data": {
      "name": "NoGroup",
      "pattern": "(?<=^|[\\s.-])NoGr(ou)?p\\b",
      "description": "",
      "tags": [
        "Release Group",
        "UnWanted"
      ],
      "tests": []
    },
    "slug": "nogroup",
    "filename": "NoGroup.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/non-retail-hdr-formats",
    "type": "regex-pattern",
    "data": {
      "name": "Non Retail HDR Formats",
      "pattern": "(?:(?<=^(?!.*\\b(HLG|PQ|SDR)(\\b|\\d)).*?)HDR10(\\+|P(lus)?))|\\b(dv(?![ .](HLG|SDR))|dovi|dolby[ .]?vision)\\b",
      "description": "Matches Dolby Vision OR HDR10+. Needed to match release groups who create custom HDR layers. ",
      "tags": [
        "Enhancement",
        "Colour Grade",
        "HDR"
      ],
      "tests": [
        {
          "expected": true,
          "id": 5,
          "input": "MovieName.1080p.DV.mkv",
          "lastRun": "2025-01-06T14:39:44.667920",
          "matchSpan": {
            "end": 18,
            "start": 16
          },
          "matchedContent": "DV",
          "matchedGroups": [
            null,
            null,
            null,
            null,
            "DV",
            null
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 6,
          "input": "MovieName.4K.Dolby Vision.IMAX.mkv",
          "lastRun": "2025-01-06T14:39:44.667920",
          "matchSpan": {
            "end": 25,
            "start": 13
          },
          "matchedContent": "Dolby Vision",
          "matchedGroups": [
            null,
            null,
            null,
            null,
            "Dolby Vision",
            null
          ],
          "passes": true
        },
        {
          "expected": false,
          "id": 7,
          "input": "MovieName.2023.4K.DV.HLG.mkv",
          "lastRun": "2025-01-06T14:39:44.667920",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 8,
          "input": "MovieName.2023.4K.DV.SDR.mkv",
          "lastRun": "2025-01-06T14:39:44.667920",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 9,
          "input": "MovieName.4K.DV.SDR.Dovi.mkv",
          "lastRun": "2025-01-06T14:39:44.667920",
          "matchSpan": {
            "end": 24,
            "start": 20
          },
          "matchedContent": "Dovi",
          "matchedGroups": [
            null,
            null,
            null,
            null,
            "Dovi",
            null
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 10,
          "input": "Schindler's List (1993) 2160p UHD BluRay Hybrid REMUX HEVC DV HDR10+ TrueHD Atmos 7.1 English-WiLDCAT",
          "lastRun": "2025-01-06T14:39:44.667920",
          "matchSpan": {
            "end": 61,
            "start": 59
          },
          "matchedContent": "DV",
          "matchedGroups": [
            null,
            null,
            null,
            null,
            "DV",
            null
          ],
          "passes": true
        }
      ]
    },
    "slug": "non-retail-hdr-formats",
    "filename": "Non Retail HDR Formats.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/non-retail-hdr-groups",
    "type": "regex-pattern",
    "data": {
      "name": "Non Retail HDR Groups",
      "pattern": "(?<=^|[\\s.-])VECTOR|BiTOR|DepraveD|SasukeducK|tarunk9c|jennaortegaUHD|VisionXpert|Flights\\b",
      "description": "Matches groups that produce non retail HDR.",
      "tags": [
        "Release Group",
        "HDR",
        "UnWanted"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "Longlegs 2024 2160p BluRay REMUX DTS-HD MA 5 1 DV HDR H 265-SasukeducK",
          "lastRun": "2025-01-11T05:45:15.414689",
          "matchSpan": {
            "end": 70,
            "start": 60
          },
          "matchedContent": "SasukeducK",
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 2,
          "input": "Blade Runner 2049 2017 2160p REMUX HEVC DV HDR10+ TrueHD 7.1 Atmos-jennaortegaUHD",
          "lastRun": "2025-01-11T05:45:15.414689",
          "matchSpan": {
            "end": 81,
            "start": 67
          },
          "matchedContent": "jennaortegaUHD",
          "matchedGroups": [],
          "passes": true
        }
      ]
    },
    "slug": "non-retail-hdr-groups",
    "filename": "Non Retail HDR Groups.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/now-rename",
    "type": "regex-pattern",
    "data": {
      "name": "Now Rename",
      "pattern": "\\[(NOW)\\b|\\b(NOW)\\]",
      "description": "Now (formerly Now TV and often stylised as NOW) is a subscription over-the-top streaming television service launched in the United Kingdom in 2012. It is operated by Sky Group in Europe, and Xfinity in the US; both owned by the American media conglomerate Comcast.",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "tests": []
    },
    "slug": "now-rename",
    "filename": "Now Rename.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/now",
    "type": "regex-pattern",
    "data": {
      "name": "Now",
      "pattern": "\\b(now)\\b[ ._-]web[ ._-]?(dl|rip)?\\b",
      "description": "Now (formerly Now TV and often stylised as NOW) is a subscription over-the-top streaming television service launched in the United Kingdom in 2012. It is operated by Sky Group in Europe, and Xfinity in the US; both owned by the American media conglomerate Comcast.",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "tests": []
    },
    "slug": "now",
    "filename": "Now.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/nyhd",
    "type": "regex-pattern",
    "data": {
      "name": "NyHD",
      "pattern": "(?<=^|[\\s.-])NyHD\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "nyhd",
    "filename": "NyHD.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/oeplus",
    "type": "regex-pattern",
    "data": {
      "name": "OEPlus",
      "pattern": "(?<=^|[\\s.-])OEPlus\\b",
      "description": "Banned for Automated Encodes",
      "tags": [
        "Release Group",
        "UnWanted"
      ],
      "tests": []
    },
    "slug": "oeplus",
    "filename": "OEPlus.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/origen",
    "type": "regex-pattern",
    "data": {
      "name": "ORiGEN",
      "pattern": "(?<=^|[\\s.-])ORiGEN\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "origen",
    "filename": "ORiGEN.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/ozr",
    "type": "regex-pattern",
    "data": {
      "name": "OZR",
      "pattern": "(?<=^|[\\s.-])OZR\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "ozr",
    "filename": "OZR.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/okay-subs",
    "type": "regex-pattern",
    "data": {
      "name": "Okay-Subs",
      "pattern": "(?<=^|[\\s.-])Okay-Subs\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "okay-subs",
    "filename": "Okay-Subs.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/open-matte",
    "type": "regex-pattern",
    "data": {
      "name": "Open Matte",
      "pattern": "\\b(open.?matte)\\b",
      "description": "Matches releases with restored widescreen aspect ratio labelled as`Open Matte`",
      "tags": [
        "Aspect Ratio",
        "Enhancement"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "Zombieland.2009.Open.Matte.1080p.WEB-DL.DD+5.1.H.264-spartanec163.mkv",
          "lastRun": "2025-02-25T22:03:36.971220",
          "matchSpan": {
            "end": 26,
            "start": 16
          },
          "matchedContent": "Open.Matte",
          "matchedGroups": [
            "Open.Matte"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 2,
          "input": "Watchmen 2009 Director's Cut Open Matte 1080p WEB-DL DDP 5.1 H.264",
          "lastRun": "2025-02-25T22:03:36.971220",
          "matchSpan": {
            "end": 39,
            "start": 29
          },
          "matchedContent": "Open Matte",
          "matchedGroups": [
            "Open Matte"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 3,
          "input": "Tron Legacy 2010 Open Matte Upscale 2160p BluRay DV HDR-X DTS-HD MA 7 1 x265-BiTOR",
          "lastRun": "2025-02-25T22:03:36.971220",
          "matchSpan": {
            "end": 27,
            "start": 17
          },
          "matchedContent": "Open Matte",
          "matchedGroups": [
            "Open Matte"
          ],
          "passes": true
        }
      ]
    },
    "slug": "open-matte",
    "filename": "Open Matte.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/p0w4hd",
    "type": "regex-pattern",
    "data": {
      "name": "P0W4HD",
      "pattern": "(?<=^|[\\s.-])P0W4HD\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "p0w4hd",
    "filename": "P0W4HD.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/pcm",
    "type": "regex-pattern",
    "data": {
      "name": "PCM",
      "pattern": "\\b(l?)PCM(\\b|\\d)",
      "description": "",
      "tags": [
        "Audio"
      ],
      "tests": []
    },
    "slug": "pcm",
    "filename": "PCM.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/phocis",
    "type": "regex-pattern",
    "data": {
      "name": "PHOCiS",
      "pattern": "(?<=^|[\\s.-])PHOCiS\\b",
      "description": "",
      "tags": [
        "Release Group",
        "HEVC"
      ],
      "tests": []
    },
    "slug": "phocis",
    "filename": "PHOCiS.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/phoenix",
    "type": "regex-pattern",
    "data": {
      "name": "PHOENiX",
      "pattern": "(?<=^|[\\s.-])PHOENiX\\b",
      "description": "Matches \"PHOENiX\" when preceded by whitespace, a hyphen or dot",
      "tags": [
        "Release Group"
      ],
      "tests": []
    },
    "slug": "phoenix",
    "filename": "PHOENiX.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/pp",
    "type": "regex-pattern",
    "data": {
      "name": "PP",
      "pattern": "(?<=^|[\\s.-])PP\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Remux"
      ],
      "tests": []
    },
    "slug": "pp",
    "filename": "PP.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/pq",
    "type": "regex-pattern",
    "data": {
      "name": "PQ",
      "pattern": "\\b(PQ|PQ10)\\b",
      "description": "This regex matches a `PQ` generalisation. This is a basic HDR Format.",
      "tags": [
        "Enhancement",
        "Colour Grade",
        "HDR"
      ],
      "tests": []
    },
    "slug": "pq",
    "filename": "PQ.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/pth",
    "type": "regex-pattern",
    "data": {
      "name": "PTH",
      "pattern": "(?<=^|[\\s.-])PTH\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "pth",
    "filename": "PTH.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/ptp",
    "type": "regex-pattern",
    "data": {
      "name": "PTP",
      "pattern": "(?<=^|[\\s.-])PTP\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Remux"
      ],
      "tests": []
    },
    "slug": "ptp",
    "filename": "PTP.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/pter",
    "type": "regex-pattern",
    "data": {
      "name": "PTer",
      "pattern": "(?<=^|[\\s.-])PTer\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": [
        {
          "expected": false,
          "id": 1,
          "input": "箱男.Hako.otoko.2024.1080p.NF.WEB-DL.x264.DDP5.1-PTerWEB",
          "lastRun": "2025-02-09T03:36:13.163388",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 2,
          "input": "Ying.Hung.Boon.Sik.1986.REPACK.1080p.UHD.BluRay.DD+7.1.DoVi.HDR10.x265-PTer",
          "lastRun": "2025-02-09T03:36:13.163388",
          "matchSpan": {
            "end": 75,
            "start": 71
          },
          "matchedContent": "PTer",
          "matchedGroups": [],
          "passes": true
        }
      ]
    },
    "slug": "pter",
    "filename": "PTer.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/pterweb",
    "type": "regex-pattern",
    "data": {
      "name": "PTerWEB",
      "pattern": "(?<=^|[\\s.-])PTerWEB\\b",
      "description": "",
      "tags": [
        "Release Group",
        "WEB-DL"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "箱男.Hako.otoko.2024.1080p.NF.WEB-DL.x264.DDP5.1-PTerWEB",
          "lastRun": "2025-02-09T03:36:19.441066",
          "matchSpan": {
            "end": 54,
            "start": 47
          },
          "matchedContent": "PTerWEB",
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 2,
          "input": "Ying.Hung.Boon.Sik.1986.REPACK.1080p.UHD.BluRay.DD+7.1.DoVi.HDR10.x265-PTer",
          "lastRun": "2025-02-09T03:36:19.441066",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        }
      ]
    },
    "slug": "pterweb",
    "filename": "PTerWEB.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/paramount",
    "type": "regex-pattern",
    "data": {
      "name": "Paramount+",
      "pattern": "\\b(PMTP|Paramount Plus)\\b",
      "description": "Paramount+ is an American subscription video on-demand over-the-top streaming service owned that offers content primarily from the libraries of CBS Media Ventures, CBS Studios, Paramount Media Networks and Paramount Pictures, while also including original series and films, live streaming sports coverage, and in the United States, live streaming of local CBS broadcast stations. ",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "Landman S01E02 Dreamers and Losers 2160p PMTP WEB-DL DDP5 1 H 265-STC",
          "lastRun": "2024-12-06T05:10:12.208630",
          "matchSpan": {
            "end": 45,
            "start": 41
          },
          "matchedContent": "PMTP",
          "matchedGroups": [
            "PMTP"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 2,
          "input": "Star Trek Lower Decks S05E03 The Best Exotic Nanite Hotel 1080p PMTP WEB-DL DDP5 1 H 264-STC",
          "lastRun": "2024-12-06T05:10:12.208630",
          "matchSpan": {
            "end": 68,
            "start": 64
          },
          "matchedContent": "PMTP",
          "matchedGroups": [
            "PMTP"
          ],
          "passes": true
        },
        {
          "expected": false,
          "id": 4,
          "input": "Gladiator 2000 Paramount Reissue Extended Cut Remastered 1080p BluRay AVC DTS-HD MA 5.1 REMUX-FraMeSToR",
          "lastRun": "2024-12-06T05:10:12.208630",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        }
      ]
    },
    "slug": "paramount",
    "filename": "Paramount+.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/peacock-tv-rename",
    "type": "regex-pattern",
    "data": {
      "name": "Peacock TV Rename",
      "pattern": "\\[(PCOK)\\b|\\b(PCOK)\\]",
      "description": "Peacock is an American over-the-top subscription streaming service owned and operated by Peacock TV, LLC, a subsidiary of NBCUniversal Media Group. The service primarily features series and film content from NBCUniversal studios and other third-party content providers (such as WWE and Hallmark Channel).",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "The Day of the Jackal S01E05 1080p PCOK WEB-DL DDP5 1 H 264-STC",
          "lastRun": "2025-03-25T16:16:33.336288",
          "matchSpan": {
            "end": 39,
            "start": 29
          },
          "matchedContent": "1080p PCOK",
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 2,
          "input": "Fight Night - The Million Dollar Heist (2024) S01E01 (2160p PCOK WEB-DL H265 SDR DDP 5.1 English - HONE)",
          "lastRun": "2025-03-25T16:16:33.336288",
          "matchSpan": {
            "end": 64,
            "start": 54
          },
          "matchedContent": "2160p PCOK",
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 3,
          "input": "Halloween Kills 2021 1080p Peacock WebDL H264 AC3 Will1869",
          "lastRun": "2025-03-25T16:16:33.336288",
          "matchSpan": {
            "end": 40,
            "start": 27
          },
          "matchedContent": "Peacock WebDL",
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 4,
          "input": "Peacock.S01.1080p.AMZN.WEB-DL.DDP2.0.H.264-Cinefeel",
          "lastRun": "2025-03-25T16:16:33.336288",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 5,
          "input": "Peacock.S02.1080p.iP.WEB-DL.AAC2.0.H.264-RNG",
          "lastRun": "2025-03-25T16:16:33.336288",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 6,
          "input": "Banana Fish S01E16 Lo The Poor Peacock WEB h264-PLUTONiUM",
          "lastRun": "2025-03-25T16:16:33.336288",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 7,
          "input": "Kingsman The Secret Service 2014 1080p PCOK WEB-DL DDP 5 1 H 264-PiRaTeS",
          "lastRun": "2025-03-25T16:16:33.336288",
          "matchSpan": {
            "end": 43,
            "start": 33
          },
          "matchedContent": "1080p PCOK",
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 8,
          "input": "Kingsman.The.Secret.Service.2014.1080p.PCOK.WEB-DL.DDP.5.1.H.264-PiRaTeS",
          "lastRun": "2025-03-25T16:16:33.336288",
          "matchSpan": {
            "end": 43,
            "start": 33
          },
          "matchedContent": "1080p.PCOK",
          "matchedGroups": [],
          "passes": true
        }
      ]
    },
    "slug": "peacock-tv-rename",
    "filename": "Peacock TV Rename.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/peacock-tv",
    "type": "regex-pattern",
    "data": {
      "name": "Peacock TV",
      "pattern": "\\b(?:(?:1080|2160|720)p(?:[ .]+)PCOK|(?:Peacock(?:[ .]+)Web-?DL|Web-?DL(?:[ .]+)Peacock))\\b",
      "description": "Peacock is an American over-the-top subscription streaming service owned and operated by Peacock TV, LLC, a subsidiary of NBCUniversal Media Group. The service primarily features series and film content from NBCUniversal studios and other third-party content providers (such as WWE and Hallmark Channel).",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "The Day of the Jackal S01E05 1080p PCOK WEB-DL DDP5 1 H 264-STC",
          "lastRun": "2025-03-25T16:16:33.336288",
          "matchSpan": {
            "end": 39,
            "start": 29
          },
          "matchedContent": "1080p PCOK",
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 2,
          "input": "Fight Night - The Million Dollar Heist (2024) S01E01 (2160p PCOK WEB-DL H265 SDR DDP 5.1 English - HONE)",
          "lastRun": "2025-03-25T16:16:33.336288",
          "matchSpan": {
            "end": 64,
            "start": 54
          },
          "matchedContent": "2160p PCOK",
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 3,
          "input": "Halloween Kills 2021 1080p Peacock WebDL H264 AC3 Will1869",
          "lastRun": "2025-03-25T16:16:33.336288",
          "matchSpan": {
            "end": 40,
            "start": 27
          },
          "matchedContent": "Peacock WebDL",
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 4,
          "input": "Peacock.S01.1080p.AMZN.WEB-DL.DDP2.0.H.264-Cinefeel",
          "lastRun": "2025-03-25T16:16:33.336288",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 5,
          "input": "Peacock.S02.1080p.iP.WEB-DL.AAC2.0.H.264-RNG",
          "lastRun": "2025-03-25T16:16:33.336288",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 6,
          "input": "Banana Fish S01E16 Lo The Poor Peacock WEB h264-PLUTONiUM",
          "lastRun": "2025-03-25T16:16:33.336288",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 7,
          "input": "Kingsman The Secret Service 2014 1080p PCOK WEB-DL DDP 5 1 H 264-PiRaTeS",
          "lastRun": "2025-03-25T16:16:33.336288",
          "matchSpan": {
            "end": 43,
            "start": 33
          },
          "matchedContent": "1080p PCOK",
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 8,
          "input": "Kingsman.The.Secret.Service.2014.1080p.PCOK.WEB-DL.DDP.5.1.H.264-PiRaTeS",
          "lastRun": "2025-03-25T16:16:33.336288",
          "matchSpan": {
            "end": 43,
            "start": 33
          },
          "matchedContent": "1080p.PCOK",
          "matchedGroups": [],
          "passes": true
        }
      ]
    },
    "slug": "peacock-tv",
    "filename": "Peacock TV.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/penumbra",
    "type": "regex-pattern",
    "data": {
      "name": "Penumbra",
      "pattern": "(?<=^|[\\s.-])Penumbra\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "penumbra",
    "filename": "Penumbra.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/pirates",
    "type": "regex-pattern",
    "data": {
      "name": "PiRaTeS",
      "pattern": "(?<=^|[\\s.-])PiRaTeS\\b",
      "description": "Banned for Mislabeling WEB-DLs as WEBRips",
      "tags": [
        "Release Group",
        "UnWanted"
      ],
      "tests": []
    },
    "slug": "pirates",
    "filename": "PiRaTeS.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/pmp",
    "type": "regex-pattern",
    "data": {
      "name": "PmP",
      "pattern": "(?<=^|[\\s.-])PmP\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Remux"
      ],
      "tests": []
    },
    "slug": "pmp",
    "filename": "PmP.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/pookie",
    "type": "regex-pattern",
    "data": {
      "name": "Pookie",
      "pattern": "(?<=^|[\\s.-])Pookie\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "pookie",
    "filename": "Pookie.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/positive",
    "type": "regex-pattern",
    "data": {
      "name": "Positive",
      "pattern": "(?<=^|[\\s.-])Positive\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "positive",
    "filename": "Positive.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/pussyfoot",
    "type": "regex-pattern",
    "data": {
      "name": "PussyFoot",
      "pattern": "(?<=^|[\\s.-])PussyFoot\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "pussyfoot",
    "filename": "PussyFoot.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/qoq",
    "type": "regex-pattern",
    "data": {
      "name": "QOQ",
      "pattern": "(?<=^|[\\s.-])QOQ\\b",
      "description": "Matches \"QOQ\" when preceded by whitespace, a hyphen or dot",
      "tags": [
        "Release Group",
        "WEB-DL"
      ],
      "tests": []
    },
    "slug": "qoq",
    "filename": "QOQ.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/quetzal",
    "type": "regex-pattern",
    "data": {
      "name": "Quetzal",
      "pattern": "(?<=^|[\\s.-])Quetzal\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "quetzal",
    "filename": "Quetzal.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/qxr",
    "type": "regex-pattern",
    "data": {
      "name": "QxR",
      "pattern": "(?<=^|[\\s.-])QxR|Tigole|FreetheFish|SAMPA|afm72|Silence|r00t|YOGI|MONOLITH|Panda|Kappa|t3nzin|RCVR|ImE|RZeroX|Garshasp|Ghost|Bandi|Natty\\b",
      "description": "",
      "tags": [
        "Release Group",
        "HEVC"
      ],
      "tests": []
    },
    "slug": "qxr",
    "filename": "QxR.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/rargb",
    "type": "regex-pattern",
    "data": {
      "name": "RARGB",
      "pattern": "(?<=^|[\\s.-])RARGB\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Remux",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "rargb",
    "filename": "RARGB.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/reborn",
    "type": "regex-pattern",
    "data": {
      "name": "REBORN",
      "pattern": "(?<=^|[\\s.-])REBORN\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "reborn",
    "filename": "REBORN.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/raizel",
    "type": "regex-pattern",
    "data": {
      "name": "Raizel",
      "pattern": "(?<=^|[\\s.-])Raizel\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "raizel",
    "filename": "Raizel.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/rasetsu",
    "type": "regex-pattern",
    "data": {
      "name": "Rasetsu",
      "pattern": "(?<=^|[\\s.-])Rasetsu\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "rasetsu",
    "filename": "Rasetsu.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/request",
    "type": "regex-pattern",
    "data": {
      "name": "ReQuEsT",
      "pattern": "(?<=^|[\\s.-])ReQuEsT\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "request",
    "filename": "ReQuEsT.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/realhd",
    "type": "regex-pattern",
    "data": {
      "name": "ReaLHD",
      "pattern": "(?<=^|[\\s.-])ReaLHD\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "realhd",
    "filename": "ReaLHD.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/release-group-missing",
    "type": "regex-pattern",
    "data": {
      "name": "Release Group (Missing)",
      "pattern": ".",
      "description": "",
      "tags": [
        "Release Group",
        "UnWanted"
      ],
      "tests": []
    },
    "slug": "release-group-missing",
    "filename": "Release Group (Missing).yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/remux",
    "type": "regex-pattern",
    "data": {
      "name": "Remux",
      "pattern": "Remux",
      "description": "A remux is a digital video file that maintains the exact quality of the original source (like a Blu-ray or DVD) by copying the video and audio streams without re-encoding them, essentially creating a perfect 1:1 copy. Think of it like carefully transferring the contents of a Blu-ray disc into a more convenient container file format (typically MKV), similar to pouring fine wine from its bottle into a decanter without changing the wine itself.",
      "tags": [
        "Codec",
        "h264",
        "h265",
        "Lossless"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "1917 (2019) 2160p UHD BluRay REMUX HEVC DV HDR10+ TrueHD Atmos 7.1 English-FraMeSToR",
          "lastRun": "2025-06-16T08:17:22.781547",
          "matchSpan": {
            "end": 34,
            "start": 29
          },
          "matchedContent": "REMUX",
          "matchedGroups": [],
          "passes": true
        }
      ]
    },
    "slug": "remux",
    "filename": "Remux.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/repack1",
    "type": "regex-pattern",
    "data": {
      "name": "Repack1",
      "pattern": "\\b(re(pack|rip)|proper)\\b",
      "description": "Matches 'PROPER' or 'REPACK' or 'RERIP' only when they appear after a year (4 digits) but not before one.\n\n* `(?<=.*?\\d{4}.*?)` - look for a 4-digit number before\n* `\\b(re(pack|rip)|proper)\\b` - match proper/repack/rerip",
      "tags": [
        "Repack",
        "Flag"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "The Zone of Interest 2023 PROPER 2160p UHD BluRay TrueHD 7.1 Atmos HDR x265-MainFrame",
          "lastRun": "2025-06-17T18:42:29.675411",
          "matchSpan": {
            "end": 32,
            "start": 26
          },
          "matchedContent": "PROPER",
          "matchedGroups": [
            "PROPER",
            null
          ],
          "passes": true
        },
        {
          "expected": false,
          "id": 2,
          "input": "Proper.Pronouns.2020.720p.WEB-DL.AAC2.0.x264-ZTR.mkv",
          "lastRun": "2025-06-17T18:42:29.675411",
          "matchSpan": {
            "end": 6,
            "start": 0
          },
          "matchedContent": "Proper",
          "matchedGroups": [
            "Proper",
            null
          ],
          "passes": false
        },
        {
          "expected": true,
          "id": 3,
          "input": "Proper.Pronouns.2020.720p.PROPER.WEB-DL.AAC2.0.x264-ZTR.mkv",
          "lastRun": "2025-06-17T18:42:29.675411",
          "matchSpan": {
            "end": 6,
            "start": 0
          },
          "matchedContent": "Proper",
          "matchedGroups": [
            "Proper",
            null
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 4,
          "input": "Sonic.the.Hedgehog.3.2024.REPACK.2160p.WEB-DL.DDP5.1.Atmos.DoVi.HDR.H.265-FLUX",
          "lastRun": "2025-06-17T18:42:29.675411",
          "matchSpan": {
            "end": 32,
            "start": 26
          },
          "matchedContent": "REPACK",
          "matchedGroups": [
            "REPACK",
            "PACK"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 5,
          "input": "roommate.wanted.2015.rerip.720p.bluray.x264-rusted.mkv",
          "lastRun": "2025-06-17T18:42:29.675411",
          "matchSpan": {
            "end": 26,
            "start": 21
          },
          "matchedContent": "rerip",
          "matchedGroups": [
            "rerip",
            "rip"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 6,
          "input": "Game of Thrones S01 REPACK 2160p MAX WEB-DL TrueHD 7.1 Atmos DV HDR H.265-Kitsune",
          "lastRun": "2025-06-17T18:42:29.675411",
          "matchSpan": {
            "end": 26,
            "start": 20
          },
          "matchedContent": "REPACK",
          "matchedGroups": [
            "REPACK",
            "PACK"
          ],
          "passes": true
        }
      ]
    },
    "slug": "repack1",
    "filename": "Repack1.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/repack2",
    "type": "regex-pattern",
    "data": {
      "name": "Repack2",
      "pattern": "\\b(real[\\s.]?(re(pack|rip)|proper)|(re(pack|rip)|proper)2)\\b",
      "description": "Matches either \"real\" (with optional space/dot) followed by proper/repack/rerip, or proper2/repack2/rerip2\n\n* `\\b(real[\\s.]?(re(pack|rip)|proper)` - match real followed by proper/repack/rerip\n* `|(re(pack|rip)|proper)2)\\b` - or match proper2/repack2/rerip2",
      "tags": [
        "Repack",
        "Flag"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "The Zone of Interest 2023 PROPER2 2160p UHD BluRay TrueHD 7.1 Atmos HDR x265-MainFrame",
          "lastRun": "2025-06-17T18:46:34.789609",
          "matchSpan": {
            "end": 33,
            "start": 26
          },
          "matchedContent": "PROPER2",
          "matchedGroups": [
            "PROPER2",
            null,
            null,
            "PROPER",
            null
          ],
          "passes": true
        },
        {
          "expected": false,
          "id": 2,
          "input": "Proper.Pronouns.2020.720p.WEB-DL.AAC2.0.x264-ZTR.mkv",
          "lastRun": "2025-06-17T18:46:34.789609",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 3,
          "input": "Proper.Pronouns.2020.720p.PROPER2.WEB-DL.AAC2.0.x264-ZTR.mkv",
          "lastRun": "2025-06-17T18:46:34.789609",
          "matchSpan": {
            "end": 33,
            "start": 26
          },
          "matchedContent": "PROPER2",
          "matchedGroups": [
            "PROPER2",
            null,
            null,
            "PROPER",
            null
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 4,
          "input": "Sonic.the.Hedgehog.3.2024.REPACK2.2160p.WEB-DL.DDP5.1.Atmos.DoVi.HDR.H.265-FLUX",
          "lastRun": "2025-06-17T18:46:34.789609",
          "matchSpan": {
            "end": 33,
            "start": 26
          },
          "matchedContent": "REPACK2",
          "matchedGroups": [
            "REPACK2",
            null,
            null,
            "REPACK",
            "PACK"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 5,
          "input": "roommate.wanted.2015.rerip2.720p.bluray.x264-rusted.mkv",
          "lastRun": "2025-06-17T18:46:34.789609",
          "matchSpan": {
            "end": 27,
            "start": 21
          },
          "matchedContent": "rerip2",
          "matchedGroups": [
            "rerip2",
            null,
            null,
            "rerip",
            "rip"
          ],
          "passes": true
        },
        {
          "expected": false,
          "id": 6,
          "input": "The Zone of Interest 2023 PROPER 2160p UHD BluRay TrueHD 7.1 Atmos HDR x265-MainFrame",
          "lastRun": "2025-06-17T18:46:34.789609",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 7,
          "input": "Sonic.the.Hedgehog.3.2024.REPACK.2160p.WEB-DL.DDP5.1.Atmos.DoVi.HDR.H.265-FLUX",
          "lastRun": "2025-06-17T18:46:34.789609",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 8,
          "input": "Yo-Kai Watch S02E17 DUBBED REAL REPACK HDTV x264-W4F",
          "lastRun": "2025-06-17T18:46:34.789609",
          "matchSpan": {
            "end": 38,
            "start": 27
          },
          "matchedContent": "REAL REPACK",
          "matchedGroups": [
            "REAL REPACK",
            "REPACK",
            "PACK",
            null,
            null
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 9,
          "input": "Game of Thrones S01 REPACK2 2160p MAX WEB-DL TrueHD 7.1 Atmos DV HDR H.265-Kitsune",
          "lastRun": "2025-06-17T18:46:34.789609",
          "matchSpan": {
            "end": 27,
            "start": 20
          },
          "matchedContent": "REPACK2",
          "matchedGroups": [
            "REPACK2",
            null,
            null,
            "REPACK",
            "PACK"
          ],
          "passes": true
        }
      ]
    },
    "slug": "repack2",
    "filename": "Repack2.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/repack3",
    "type": "regex-pattern",
    "data": {
      "name": "Repack3",
      "pattern": "\\b(real[\\s.]?real[\\s.]?(re(pack|rip)|proper)|(re(pack|rip)|proper)3)\\b",
      "description": "Matches either \"real real\" (with optional space/dot between words) followed by proper/repack/rerip, or proper3/repack3/rerip3\n\n* `\\b(real[\\s.]?real[\\s.]?(re(pack|rip)|proper)` - match real real followed by proper/repack/rerip\n* `|(re(pack|rip)|proper)3)\\b` - or match proper3/repack3/rerip3",
      "tags": [
        "Repack",
        "Flag"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "The Zone of Interest 2023 PROPER3 2160p UHD BluRay TrueHD 7.1 Atmos HDR x265-MainFrame",
          "lastRun": "2025-06-17T18:46:43.670504",
          "matchSpan": {
            "end": 33,
            "start": 26
          },
          "matchedContent": "PROPER3",
          "matchedGroups": [
            "PROPER3",
            null,
            null,
            "PROPER",
            null
          ],
          "passes": true
        },
        {
          "expected": false,
          "id": 2,
          "input": "Proper.Pronouns.2020.720p.WEB-DL.AAC2.0.x264-ZTR.mkv",
          "lastRun": "2025-06-17T18:46:43.670504",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 3,
          "input": "Proper.Pronouns.2020.720p.PROPER3.WEB-DL.AAC2.0.x264-ZTR.mkv",
          "lastRun": "2025-06-17T18:46:43.670504",
          "matchSpan": {
            "end": 33,
            "start": 26
          },
          "matchedContent": "PROPER3",
          "matchedGroups": [
            "PROPER3",
            null,
            null,
            "PROPER",
            null
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 4,
          "input": "Sonic.the.Hedgehog.3.2024.REPACK3.2160p.WEB-DL.DDP5.1.Atmos.DoVi.HDR.H.265-FLUX",
          "lastRun": "2025-06-17T18:46:43.670504",
          "matchSpan": {
            "end": 33,
            "start": 26
          },
          "matchedContent": "REPACK3",
          "matchedGroups": [
            "REPACK3",
            null,
            null,
            "REPACK",
            "PACK"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 5,
          "input": "roommate.wanted.2015.rerip3.720p.bluray.x264-rusted.mkv",
          "lastRun": "2025-06-17T18:46:43.670504",
          "matchSpan": {
            "end": 27,
            "start": 21
          },
          "matchedContent": "rerip3",
          "matchedGroups": [
            "rerip3",
            null,
            null,
            "rerip",
            "rip"
          ],
          "passes": true
        },
        {
          "expected": false,
          "id": 6,
          "input": "The Zone of Interest 2023 PROPER 2160p UHD BluRay TrueHD 7.1 Atmos HDR x265-MainFrame",
          "lastRun": "2025-06-17T18:46:43.670504",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 7,
          "input": "Sonic.the.Hedgehog.3.2024.REPACK.2160p.WEB-DL.DDP5.1.Atmos.DoVi.HDR.H.265-FLUX",
          "lastRun": "2025-06-17T18:46:43.670504",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 8,
          "input": "Yo-Kai Watch S02E17 DUBBED REAL REAL REPACK HDTV x264-W4F",
          "lastRun": "2025-06-17T18:46:43.670504",
          "matchSpan": {
            "end": 43,
            "start": 27
          },
          "matchedContent": "REAL REAL REPACK",
          "matchedGroups": [
            "REAL REAL REPACK",
            "REPACK",
            "PACK",
            null,
            null
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 9,
          "input": "Game of Thrones S01 REPACK3 2160p MAX WEB-DL TrueHD 7.1 Atmos DV HDR H.265-Kitsune",
          "lastRun": "2025-06-17T18:46:43.670504",
          "matchSpan": {
            "end": 27,
            "start": 20
          },
          "matchedContent": "REPACK3",
          "matchedGroups": [
            "REPACK3",
            null,
            null,
            "REPACK",
            "PACK"
          ],
          "passes": true
        }
      ]
    },
    "slug": "repack3",
    "filename": "Repack3.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/roku",
    "type": "regex-pattern",
    "data": {
      "name": "Roku",
      "pattern": "(?<=\\b[12]\\d{3}\\b).*\\b(ROKU)\\b",
      "description": "The Roku Channel is an over-the-top video streaming service available in the U.S., Canada, Mexico and the U.K. Launched in September 2017. The Roku Channel offers over 400 free live linear TV channels, more than 80,000 free movies and shows, and access to paid content.",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "10 Minutes Gone 2019 1080p ROKU WEB-DL DD 5 1 H 264-PiRaTeS",
          "lastRun": "2025-06-16T08:12:32.176786",
          "matchSpan": {
            "end": 31,
            "start": 20
          },
          "matchedContent": " 1080p ROKU",
          "matchedGroups": [
            "ROKU"
          ],
          "passes": true
        },
        {
          "expected": false,
          "id": 2,
          "input": "Natsume's Book of Friends S06 AKA Natsume Yuujinchou Roku 1080p BluRay FLAC 2.0 Hi10P x264-CyC",
          "lastRun": "2025-06-16T08:12:32.176786",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 3,
          "input": "Natsume's Book of Friends AKA Natsume Yuujinchou Roku S06 1080p CR WEB-DL Dubbed AAC 2.0 H.264-Yameii",
          "lastRun": "2025-06-16T08:12:32.176786",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 4,
          "input": "Flower & Garnet 2002 480p ROKU WEB-DL AAC 2.0 H.264-vase",
          "lastRun": "2025-06-16T08:12:32.176786",
          "matchSpan": {
            "end": 30,
            "start": 20
          },
          "matchedContent": " 480p ROKU",
          "matchedGroups": [
            "ROKU"
          ],
          "passes": true
        }
      ]
    },
    "slug": "roku",
    "filename": "Roku.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/sa89",
    "type": "regex-pattern",
    "data": {
      "name": "SA89",
      "pattern": "(?<=^|[\\s.-])SA89\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "sa89",
    "filename": "SA89.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/scy",
    "type": "regex-pattern",
    "data": {
      "name": "SCY",
      "pattern": "(?<=^|[\\s.-])SCY\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "scy",
    "filename": "SCY.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/sdr",
    "type": "regex-pattern",
    "data": {
      "name": "SDR",
      "pattern": "\\b(SDR)\\b",
      "description": "Explicitly matches labelled Standard Dynamic Range, i.e. \"SDR\" ",
      "tags": [
        "HDR"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "Yojimbo.1961.REPACK.2160p.UHD.Blu-ray.Remux.SDR.HEVC.FLAC.1.0-CiNEPHiLES.mkv",
          "lastRun": "2025-04-15T14:47:06.326256",
          "matchSpan": {
            "end": 47,
            "start": 44
          },
          "matchedContent": "SDR",
          "matchedGroups": [
            "SDR"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 2,
          "input": "For a Few Dollars More aka Per qualche dollaro in più 1965 UHD BluRay 2160p DTS-HD MA 5.1 SDR HEVC REMUX-FraMeSToR",
          "lastRun": "2025-04-15T14:47:06.326256",
          "matchSpan": {
            "end": 93,
            "start": 90
          },
          "matchedContent": "SDR",
          "matchedGroups": [
            "SDR"
          ],
          "passes": true
        }
      ]
    },
    "slug": "sdr",
    "filename": "SDR.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/sm737",
    "type": "regex-pattern",
    "data": {
      "name": "SM737",
      "pattern": "(?<=^|[\\s.-])SM737\\b",
      "description": "",
      "tags": [
        "Release Group",
        "UnWanted"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "Training.Day.2001.UHD.BluRay.1080p.DD+Atmos.5.1.DoVi.HDR10.x265-SM737",
          "lastRun": "2025-01-13T07:59:06.177271",
          "matchSpan": {
            "end": 69,
            "start": 64
          },
          "matchedContent": "SM737",
          "matchedGroups": [],
          "passes": true
        }
      ]
    },
    "slug": "sm737",
    "filename": "SM737.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/smahawug",
    "type": "regex-pattern",
    "data": {
      "name": "SMAHAWUG",
      "pattern": "(?<=^|[\\s.-])SMAHAWUG\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "smahawug",
    "filename": "SMAHAWUG.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/smurf",
    "type": "regex-pattern",
    "data": {
      "name": "SMURF",
      "pattern": "(?<=^|[\\s.-])SMURF\\b",
      "description": "",
      "tags": [
        "Release Group",
        "WEB-DL"
      ],
      "tests": []
    },
    "slug": "smurf",
    "filename": "SMURF.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/sop",
    "type": "regex-pattern",
    "data": {
      "name": "SOP",
      "pattern": "(?<=^|[\\s.-])SOP\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "Interstellar.2014.PROPER.1080p.BluRay.DTS.x264-SoP",
          "lastRun": "2024-12-22T20:56:46.004338",
          "matchSpan": {
            "end": 50,
            "start": 47
          },
          "matchedContent": "SoP",
          "matchedGroups": [],
          "passes": true
        }
      ]
    },
    "slug": "sop",
    "filename": "SOP.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/spectacle",
    "type": "regex-pattern",
    "data": {
      "name": "SPECTACLE",
      "pattern": "(?<=^|[\\s.-])SPECTACLE\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "spectacle",
    "filename": "SPECTACLE.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/sphd",
    "type": "regex-pattern",
    "data": {
      "name": "SPHD",
      "pattern": "(?<=^|[\\s.-])SPHD\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "sphd",
    "filename": "SPHD.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/strikes",
    "type": "regex-pattern",
    "data": {
      "name": "STRiKES",
      "pattern": "(?<=^|[\\s.-])STRiKES\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "strikes",
    "filename": "STRiKES.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/stuttershit",
    "type": "regex-pattern",
    "data": {
      "name": "STUTTERSHIT",
      "pattern": "(?<=^|[\\s.-])STUTTERSHIT\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "stuttershit",
    "filename": "STUTTERSHIT.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/surcode",
    "type": "regex-pattern",
    "data": {
      "name": "SURCODE",
      "pattern": "(?<=^|[\\s.-])SURCODE\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "surcode",
    "filename": "SURCODE.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/swaggeruhd",
    "type": "regex-pattern",
    "data": {
      "name": "SWAGGERUHD",
      "pattern": "(?<=^|[\\s.-])SWAGGERUHD\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "swaggeruhd",
    "filename": "SWAGGERUHD.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/swtyblz",
    "type": "regex-pattern",
    "data": {
      "name": "SWTYBLZ",
      "pattern": "(?<=^|[\\s.-])SWTYBLZ\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "swtyblz",
    "filename": "SWTYBLZ.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/sancti",
    "type": "regex-pattern",
    "data": {
      "name": "SaNcTi",
      "pattern": "(?<=^|[\\s.-])SaNcTi\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "sancti",
    "filename": "SaNcTi.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/saizen",
    "type": "regex-pattern",
    "data": {
      "name": "Saizen",
      "pattern": "(?<=^|[\\s.-])Saizen\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "saizen",
    "filename": "Saizen.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/sallysubs",
    "type": "regex-pattern",
    "data": {
      "name": "SallySubs",
      "pattern": "(?<=^|[\\s.-])SallySubs\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "sallysubs",
    "filename": "SallySubs.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/sasukeduck",
    "type": "regex-pattern",
    "data": {
      "name": "SasukeducK",
      "pattern": "(?<=^|[\\s.-])SasukeducK\\b",
      "description": "Banned for Fake DV/HDR Layer",
      "tags": [
        "Release Group",
        "UnWanted"
      ],
      "tests": []
    },
    "slug": "sasukeduck",
    "filename": "SasukeducK.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/sbr",
    "type": "regex-pattern",
    "data": {
      "name": "SbR",
      "pattern": "(?<=^|[\\s.-])SbR\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "sbr",
    "filename": "SbR.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/scene",
    "type": "regex-pattern",
    "data": {
      "name": "Scene",
      "pattern": "(?<=^|[\\s.-])SPARKS|DRONES|ROVERS|SPRINTER|GECKOS|SHORTBREHD|EDITH|FilmHD|POW4HD|HD4U|TENEIGHTY|ETHEL\\b",
      "description": "Matches Scene Groups",
      "tags": [],
      "tests": []
    },
    "slug": "scene",
    "filename": "Scene.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/senjou",
    "type": "regex-pattern",
    "data": {
      "name": "Senjou",
      "pattern": "(?<=^|[\\s.-])Senjou\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "senjou",
    "filename": "Senjou.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/shieldbearer",
    "type": "regex-pattern",
    "data": {
      "name": "ShieldBearer",
      "pattern": "(?<=^|[\\s.-])ShieldBearer\\b",
      "description": "Banned For AI Upscale",
      "tags": [
        "Release Group",
        "UnWanted"
      ],
      "tests": []
    },
    "slug": "shieldbearer",
    "filename": "ShieldBearer.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/showtime-rename",
    "type": "regex-pattern",
    "data": {
      "name": "Showtime Rename",
      "pattern": "\\[(SHO)\\b|\\b(SHO)\\]",
      "description": "Showtime (also known as Paramount+ with Showtime) is an American premium television network and the flagship property of Showtime Networks, a sub-division of the Paramount Media Networks division of Paramount Global. Showtime's programming includes original television series produced exclusively for the linear network and developed for the co-owned Paramount+ streaming service, theatrically released and independent motion pictures, documentaries, and occasional stand-up comedy specials, made-for-TV movies, and softcore adult programming.",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "tests": []
    },
    "slug": "showtime-rename",
    "filename": "Showtime Rename.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/showtime",
    "type": "regex-pattern",
    "data": {
      "name": "Showtime",
      "pattern": "\\b(sho|showtime)\\b[ ._-]web[ ._-]?(dl|rip)?\\b",
      "description": "Showtime (also known as Paramount+ with Showtime) is an American premium television network and the flagship property of Showtime Networks, a sub-division of the Paramount Media Networks division of Paramount Global. Showtime's programming includes original television series produced exclusively for the linear network and developed for the co-owned Paramount+ streaming service, theatrically released and independent motion pictures, documentaries, and occasional stand-up comedy specials, made-for-TV movies, and softcore adult programming.",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "tests": []
    },
    "slug": "showtime",
    "filename": "Showtime.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/sic",
    "type": "regex-pattern",
    "data": {
      "name": "SiC",
      "pattern": "(?<=^|[\\s.-])SiC\\b",
      "description": "",
      "tags": [
        "Release Group",
        "WEB-DL"
      ],
      "tests": []
    },
    "slug": "sic",
    "filename": "SiC.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/sicfoi",
    "type": "regex-pattern",
    "data": {
      "name": "SiCFoI",
      "pattern": "(?<=^|[\\s.-])SiCFoI\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Remux"
      ],
      "tests": []
    },
    "slug": "sicfoi",
    "filename": "SiCFoI.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/sigla",
    "type": "regex-pattern",
    "data": {
      "name": "SiGLA",
      "pattern": "(?<=^|[\\s.-])SiGLA\\b",
      "description": "",
      "tags": [
        "Release Group",
        "WEB-DL"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "Full.Metal.Jacket.1987.1080p.HMAX.WEB-DL.DD5.1.HEVC-SiGLA.mkv",
          "lastRun": "2024-12-11T05:23:38.079493",
          "matchSpan": {
            "end": 57,
            "start": 52
          },
          "matchedContent": "SiGLA",
          "matchedGroups": [],
          "passes": true
        }
      ]
    },
    "slug": "sigla",
    "filename": "SiGLA.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/sigma",
    "type": "regex-pattern",
    "data": {
      "name": "SiGMA",
      "pattern": "(?<=^|[\\s.-])SiGMA\\b",
      "description": "",
      "tags": [
        "Release Group",
        "WEB-DL"
      ],
      "tests": []
    },
    "slug": "sigma",
    "filename": "SiGMA.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/simple",
    "type": "regex-pattern",
    "data": {
      "name": "SiMPLE",
      "pattern": "(?<=^|[\\s.-])SiMPLE\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "simple",
    "filename": "SiMPLE.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/sing-along",
    "type": "regex-pattern",
    "data": {
      "name": "Sing Along",
      "pattern": "(?<=\\b[12]\\d{3}\\b).*\\b(Sing[-_. ]Along)\\b",
      "description": "Matches \"Sing Along\" releases when `Sing Along` is preceded by a year\n- Ensures that `Sing Along` is not matched in the movie title",
      "tags": [
        "Edition"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "Wicked 2024 Sing-Along Version 720p MA WEB-DL DDP 5.1 H.264-FLUX",
          "lastRun": "2025-02-26T04:53:02.368189",
          "matchSpan": {
            "end": 22,
            "start": 11
          },
          "matchedContent": " Sing-Along",
          "matchedGroups": [
            "Sing-Along"
          ],
          "passes": true
        }
      ]
    },
    "slug": "sing-along",
    "filename": "Sing Along.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/solar",
    "type": "regex-pattern",
    "data": {
      "name": "SoLaR",
      "pattern": "(?<=^|[\\s.-])SoLaR\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "solar",
    "filename": "SoLaR.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/special-edition",
    "type": "regex-pattern",
    "data": {
      "name": "Special Edition",
      "pattern": "(?<!^|{)\\b(extended|uncut|directors|special|unrated|uncensored|cut|version|edition)(\\b|\\d)",
      "description": "Matches any type of non theatrical edition. ",
      "tags": [
        "Edition"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "Zenimation.S01.Extended.Edition.720p.DSNP.WEB-DL.DDP5.1.H.264-LAZY",
          "lastRun": "2025-02-26T04:33:39.532784",
          "matchSpan": {
            "end": 23,
            "start": 15
          },
          "matchedContent": "Extended",
          "matchedGroups": [
            "Extended",
            ""
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 2,
          "input": "Vikings Extended S05 1080p BluRay REMUX AVC DTS-HD MA 5.1-FraMeSToR",
          "lastRun": "2025-02-26T04:33:39.532784",
          "matchSpan": {
            "end": 16,
            "start": 8
          },
          "matchedContent": "Extended",
          "matchedGroups": [
            "Extended",
            ""
          ],
          "passes": true
        },
        {
          "expected": false,
          "id": 3,
          "input": "My Very Extended Family",
          "lastRun": "2025-02-26T04:33:39.532784",
          "matchSpan": {
            "end": 16,
            "start": 8
          },
          "matchedContent": "Extended",
          "matchedGroups": [
            "Extended",
            ""
          ],
          "passes": false
        },
        {
          "expected": false,
          "id": 4,
          "input": "Pente lepta akoma AKA Extended Play",
          "lastRun": "2025-02-26T04:33:39.532784",
          "matchSpan": {
            "end": 30,
            "start": 22
          },
          "matchedContent": "Extended",
          "matchedGroups": [
            "Extended",
            ""
          ],
          "passes": false
        },
        {
          "expected": false,
          "id": 5,
          "input": "Uncut.2023.1080p.AMZN.WEB-DL.DDP2.0.H.264-LLL.mkv",
          "lastRun": "2025-02-26T04:33:39.532784",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 6,
          "input": "The Punisher (1989) Remastered Uncut 1080p BluRay x265 SDR DDP 5.1 English-Ralphy",
          "lastRun": "2025-02-26T04:33:39.532784",
          "matchSpan": {
            "end": 36,
            "start": 31
          },
          "matchedContent": "Uncut",
          "matchedGroups": [
            "Uncut",
            ""
          ],
          "passes": true
        },
        {
          "expected": false,
          "id": 7,
          "input": "The Naked Director S01 2160p NF WEB-DL Dual-Audio DD+ 5.1 H.265-HONE",
          "lastRun": "2025-02-26T04:33:39.532784",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 8,
          "input": "Midsommar.2019.PROPER.Directors.Cut.UHD.BluRay.1080p.DDP.5.1.DoVi.HDR10.x265-SM737.mkv",
          "lastRun": "2025-02-26T04:33:39.532784",
          "matchSpan": {
            "end": 31,
            "start": 22
          },
          "matchedContent": "Directors",
          "matchedGroups": [
            "Directors",
            ""
          ],
          "passes": true
        },
        {
          "expected": false,
          "id": 9,
          "input": "George.Michael.Freedom.Uncut.2022.1080p.AMZN.WEB-DL.DDP5.1.H.264-PTP.mkv",
          "lastRun": "2025-02-26T04:33:39.532784",
          "matchSpan": {
            "end": 28,
            "start": 23
          },
          "matchedContent": "Uncut",
          "matchedGroups": [
            "Uncut",
            ""
          ],
          "passes": false
        },
        {
          "expected": false,
          "id": 10,
          "input": "Tupac.Uncensored.and.Uncut.The.Lost.Prison.Tapes.2011.DVDRip.x264-HANDJOB.mkv",
          "lastRun": "2025-02-26T04:33:39.532784",
          "matchSpan": {
            "end": 16,
            "start": 6
          },
          "matchedContent": "Uncensored",
          "matchedGroups": [
            "Uncensored",
            ""
          ],
          "passes": false
        },
        {
          "expected": false,
          "id": 11,
          "input": "Friedkin.Uncut.2018.1080p.MUBI.WEB-DL.AAC2.0.H.264-BdC.mkv",
          "lastRun": "2025-02-26T04:33:39.532784",
          "matchSpan": {
            "end": 14,
            "start": 9
          },
          "matchedContent": "Uncut",
          "matchedGroups": [
            "Uncut",
            ""
          ],
          "passes": false
        },
        {
          "expected": false,
          "id": 12,
          "input": "Sniper.Special.Ops.2016.720p.BluRay.DD5.1.x264-SpaceHD",
          "lastRun": "2025-02-26T04:33:39.532784",
          "matchSpan": {
            "end": 14,
            "start": 7
          },
          "matchedContent": "Special",
          "matchedGroups": [
            "Special",
            ""
          ],
          "passes": false
        },
        {
          "expected": true,
          "id": 13,
          "input": "Revhead.Miduga.Special.Edition-SKIDROW",
          "lastRun": "2025-02-26T04:33:39.532784",
          "matchSpan": {
            "end": 22,
            "start": 15
          },
          "matchedContent": "Special",
          "matchedGroups": [
            "Special",
            ""
          ],
          "passes": true
        },
        {
          "expected": false,
          "id": 14,
          "input": "Pointless.Celebrities.S17E09.Special.720p.WEB-DL.AAC2.0.H.264-BTN",
          "lastRun": "2025-02-26T04:33:39.532784",
          "matchSpan": {
            "end": 36,
            "start": 29
          },
          "matchedContent": "Special",
          "matchedGroups": [
            "Special",
            ""
          ],
          "passes": false
        },
        {
          "expected": true,
          "id": 15,
          "input": "Land of the Dead 2005 Unrated DC REPACK SHOUT 1080p UHD BluRay DD 5 1 Atmos DV HDR x265-SQS",
          "lastRun": "2025-02-26T04:33:39.532784",
          "matchSpan": {
            "end": 29,
            "start": 22
          },
          "matchedContent": "Unrated",
          "matchedGroups": [
            "Unrated",
            ""
          ],
          "passes": true
        },
        {
          "expected": false,
          "id": 16,
          "input": "Unrated: The Movie",
          "lastRun": "2025-02-26T04:33:39.532784",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 17,
          "input": "Who Framed Roger Rabbit 1988 Uncensored 1080p HDTV DD5.1 H.264.mkv",
          "lastRun": "2025-02-26T04:33:39.532784",
          "matchSpan": {
            "end": 39,
            "start": 29
          },
          "matchedContent": "Uncensored",
          "matchedGroups": [
            "Uncensored",
            ""
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 18,
          "input": "The Veil Uncensored S01 2021 1080p WEB-DL AAC 2.0 H.264-Solonese",
          "lastRun": "2025-02-26T04:33:39.532784",
          "matchSpan": {
            "end": 19,
            "start": 9
          },
          "matchedContent": "Uncensored",
          "matchedGroups": [
            "Uncensored",
            ""
          ],
          "passes": true
        },
        {
          "expected": false,
          "id": 19,
          "input": "Uncensored 2018 S06E11 Tamela Mann 720p HDTV x264-CRiMSON",
          "lastRun": "2025-02-26T04:33:39.532784",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 20,
          "input": "Zodiac.2007.Directors.Cut.Bluray.1080p.TrueHD.5.1.AVC.REMUX-FraMeSToR.mkv",
          "lastRun": "2025-02-26T04:33:39.532784",
          "matchSpan": {
            "end": 21,
            "start": 12
          },
          "matchedContent": "Directors",
          "matchedGroups": [
            "Directors",
            ""
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 21,
          "input": "X-Men Days of Future Past 2014 The Rogue Cut 2160p MA WEB-DL TrueHD 7 1 DV HDR10+ H 265-DRX",
          "lastRun": "2025-02-26T04:33:39.532784",
          "matchSpan": {
            "end": 44,
            "start": 41
          },
          "matchedContent": "Cut",
          "matchedGroups": [
            "Cut",
            ""
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 22,
          "input": "The.Wicker.Man.The.Final.Cut.1973.UHD.BluRay.2160p.FLAC.2.0.DV.HEVC.REMUX-FraMeSToR",
          "lastRun": "2025-02-26T04:33:39.532784",
          "matchSpan": {
            "end": 28,
            "start": 25
          },
          "matchedContent": "Cut",
          "matchedGroups": [
            "Cut",
            ""
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 23,
          "input": "Twin Peaks Alternate International Version 1989 720p BluRay DTD 5.1 x264-reward",
          "lastRun": "2025-02-26T04:33:39.532784",
          "matchSpan": {
            "end": 42,
            "start": 35
          },
          "matchedContent": "Version",
          "matchedGroups": [
            "Version",
            ""
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 24,
          "input": "Trainspotting.1996.Collectors.Edition.1080P.BluRay.DD.5.1.X265-Ralphy.mkv",
          "lastRun": "2025-02-26T04:33:39.532784",
          "matchSpan": {
            "end": 37,
            "start": 30
          },
          "matchedContent": "Edition",
          "matchedGroups": [
            "Edition",
            ""
          ],
          "passes": true
        }
      ]
    },
    "slug": "special-edition",
    "filename": "Special Edition.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/stan-rename",
    "type": "regex-pattern",
    "data": {
      "name": "Stan Rename",
      "pattern": "\\[(STAN)\\b|\\b(STAN)\\]",
      "description": "Stan is an Australian over-the-top streaming service. The service offers a broad range of film and television content from both local and foreign productions, particularly from the United States and United Kingdom.",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "tests": []
    },
    "slug": "stan-rename",
    "filename": "Stan Rename.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/stan",
    "type": "regex-pattern",
    "data": {
      "name": "Stan",
      "pattern": "\\b(stan)\\b[ ._-]web[ ._-]?(dl|rip)?\\b",
      "description": "Stan is an Australian over-the-top streaming service. The service offers a broad range of film and television content from both local and foreign productions, particularly from the United States and United Kingdom.",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "tests": []
    },
    "slug": "stan",
    "filename": "Stan.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/subsplease",
    "type": "regex-pattern",
    "data": {
      "name": "SubsPlease",
      "pattern": "(?<=^|[\\s.-])SubsPlease\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "subsplease",
    "filename": "SubsPlease.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/subsplus",
    "type": "regex-pattern",
    "data": {
      "name": "SubsPlus+",
      "pattern": "(?<=^|[\\s.-])SubsPlus+\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "subsplus",
    "filename": "SubsPlus+.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/sumvision",
    "type": "regex-pattern",
    "data": {
      "name": "SumVision",
      "pattern": "(?<=^|[\\s.-])SumVision\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Remux"
      ],
      "tests": []
    },
    "slug": "sumvision",
    "filename": "SumVision.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/taoe",
    "type": "regex-pattern",
    "data": {
      "name": "TAoE",
      "pattern": "(?<=^|[\\s.-])TAoE|Goki|Frys|JBENT|DNU|Ainz|TheSickle|ANONAZ|Species180|r0b0t|xtrem3x|HxD|ArcX|WEM|Nostradamus|Erie|DUHIT|jb2049|DrainedDay|AJJMIN\\b",
      "description": "",
      "tags": [
        "Release Group",
        "HEVC"
      ],
      "tests": []
    },
    "slug": "taoe",
    "filename": "TAoE.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/tbb",
    "type": "regex-pattern",
    "data": {
      "name": "TBB",
      "pattern": "(?<=^|[\\s.-])TBB\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "tbb",
    "filename": "TBB.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/tdd",
    "type": "regex-pattern",
    "data": {
      "name": "TDD",
      "pattern": "(?<=^|[\\s.-])TDD\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "tdd",
    "filename": "TDD.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/tekno3d",
    "type": "regex-pattern",
    "data": {
      "name": "TEKNO3D",
      "pattern": "(?<=^|[\\s.-])TEKNO3D\\b",
      "description": "Banned for Fake DV/HDR Layer",
      "tags": [
        "Release Group",
        "UnWanted"
      ],
      "tests": []
    },
    "slug": "tekno3d",
    "filename": "TEKNO3D.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/tepes",
    "type": "regex-pattern",
    "data": {
      "name": "TEPES",
      "pattern": "(?<=^|[\\s.-])TEPES\\b",
      "description": "",
      "tags": [
        "Release Group",
        "WEB-DL"
      ],
      "tests": []
    },
    "slug": "tepes",
    "filename": "TEPES.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/terminal",
    "type": "regex-pattern",
    "data": {
      "name": "TERMiNAL",
      "pattern": "(?<=^|[\\s.-])TERMiNAL\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "terminal",
    "filename": "TERMiNAL.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/thora",
    "type": "regex-pattern",
    "data": {
      "name": "THORA",
      "pattern": "(?<=^|[\\s.-])THORA\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "thora",
    "filename": "THORA.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/threesome",
    "type": "regex-pattern",
    "data": {
      "name": "THREESOME",
      "pattern": "(?<=^|[\\s.-])THREESOME\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "threesome",
    "filename": "THREESOME.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/tombcruise",
    "type": "regex-pattern",
    "data": {
      "name": "TOMBCRUISE",
      "pattern": "(?<=^|[\\s.-])TOMBCRUISE\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "tombcruise",
    "filename": "TOMBCRUISE.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/tommy",
    "type": "regex-pattern",
    "data": {
      "name": "TOMMY",
      "pattern": "(?<=^|[\\s.-])TOMMY\\b",
      "description": "Matches \"TOMMY\" when preceded by whitespace, a hyphen or dot",
      "tags": [
        "Release Group",
        "WEB-DL"
      ],
      "tests": []
    },
    "slug": "tommy",
    "filename": "TOMMY.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/triton",
    "type": "regex-pattern",
    "data": {
      "name": "TRiToN",
      "pattern": "(?<=^|[\\s.-])TRiToN\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Remux"
      ],
      "tests": []
    },
    "slug": "triton",
    "filename": "TRiToN.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/ttga",
    "type": "regex-pattern",
    "data": {
      "name": "TTGA",
      "pattern": "(?<=^|[\\s.-])TTGA\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "ttga",
    "filename": "TTGA.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/tving",
    "type": "regex-pattern",
    "data": {
      "name": "TVING",
      "pattern": "\\b(TVING)\\b",
      "description": "TVING is a South Korean subscription video on-demand over-the-top streaming service operated by TVING Corporation, a joint venture made of CJ ENM Entertainment Division, Naver and JTBC by its JTBC Studios, now called SLL.",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "tests": []
    },
    "slug": "tving",
    "filename": "TVING.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/tayto",
    "type": "regex-pattern",
    "data": {
      "name": "TayTo",
      "pattern": "(?<=^|[\\s.-])TayTo\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "tayto",
    "filename": "TayTo.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/telly",
    "type": "regex-pattern",
    "data": {
      "name": "Telly",
      "pattern": "(?<=^|[\\s.-])Telly\\b",
      "description": "Banned for Retagging",
      "tags": [
        "Release Group",
        "UnWanted"
      ],
      "tests": []
    },
    "slug": "telly",
    "filename": "Telly.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/theatrical-edition",
    "type": "regex-pattern",
    "data": {
      "name": "Theatrical Edition",
      "pattern": "^(.*?)(\\d{4})(.*?)\\b(theatrical)\\b",
      "description": "Matches any type of theatrical edition.\n- Ensures that `Theatrical` comes after the year so that movies with 'Theatrical` in the title are not matched",
      "tags": [
        "Edition"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "Zodiac.2007.Theatrical.UHD.BluRay.2160p.TrueHD.5.1.DV.HEVC.REMUX-FraMeSToR.mkv",
          "lastRun": "2025-02-25T22:15:43.307902",
          "matchSpan": {
            "end": 22,
            "start": 0
          },
          "matchedContent": "Zodiac.2007.Theatrical",
          "matchedGroups": [
            "Zodiac.",
            "2007",
            ".",
            "Theatrical"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 2,
          "input": "Theatrical.Movie.2007.Theatrical.UHD.BluRay.2160p.TrueHD.5.1.DV.HEVC.REMUX-FraMeSToR.mkv",
          "lastRun": "2025-02-25T22:15:43.307902",
          "matchSpan": {
            "end": 32,
            "start": 0
          },
          "matchedContent": "Theatrical.Movie.2007.Theatrical",
          "matchedGroups": [
            "Theatrical.Movie.",
            "2007",
            ".",
            "Theatrical"
          ],
          "passes": true
        },
        {
          "expected": false,
          "id": 3,
          "input": "Theatrical.Movie.2007.UHD.BluRay.2160p.TrueHD.5.1.DV.HEVC.REMUX-FraMeSToR.mkv",
          "lastRun": "2025-02-25T22:15:43.307902",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        }
      ]
    },
    "slug": "theatrical-edition",
    "filename": "Theatrical Edition.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/tnp",
    "type": "regex-pattern",
    "data": {
      "name": "TnP",
      "pattern": "(?<=^|[\\s.-])TnP\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "tnp",
    "filename": "TnP.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/tron",
    "type": "regex-pattern",
    "data": {
      "name": "Tron",
      "pattern": "(?<=^|[\\s.-])Tron\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "tron",
    "filename": "Tron.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/truehd-missing-groups",
    "type": "regex-pattern",
    "data": {
      "name": "TrueHD (Missing Groups)",
      "pattern": "(?<=^|[\\s.-])TRiToN|EPSiLON|NoGroup|PmP\\b",
      "description": "Matches groups who mislabel TrueHD",
      "tags": [
        "Audio"
      ],
      "tests": []
    },
    "slug": "truehd-missing-groups",
    "filename": "TrueHD (Missing Groups).yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/truehd",
    "type": "regex-pattern",
    "data": {
      "name": "TrueHD",
      "pattern": "True[ .-]?HD[ .-]?",
      "description": "",
      "tags": [
        "Audio",
        "Lossless"
      ],
      "tests": []
    },
    "slug": "truehd",
    "filename": "TrueHD.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/tsundere",
    "type": "regex-pattern",
    "data": {
      "name": "Tsundere",
      "pattern": "(?<=^|[\\s.-])Tsundere\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "tsundere",
    "filename": "Tsundere.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/uhd-blu-ray",
    "type": "regex-pattern",
    "data": {
      "name": "UHD Blu-ray",
      "pattern": "\\bUHD[-_.\\s]?Blu[-]?Ray\\b",
      "description": "Matches \"UHD Bluray\" or \"UHD Blu-Ray\" with a hyphen, space, dot or underscore between them",
      "tags": [],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "Avatar: The Way of Water 2022 1080p UHD BluRay DDP 7.1 HDR10 x265-GALAXY",
          "lastRun": "2025-01-13T06:32:22.686039",
          "matchSpan": {
            "end": 46,
            "start": 36
          },
          "matchedContent": "UHD BluRay",
          "matchedGroups": [],
          "passes": true
        }
      ]
    },
    "slug": "uhd-blu-ray",
    "filename": "UHD Blu-ray.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/uhd-bluray-missing-groups",
    "type": "regex-pattern",
    "data": {
      "name": "UHD Bluray (Missing Groups)",
      "pattern": "(?<=^|[\\s.-])LEGi0N\\b",
      "description": "Match release groups who don't put UHD Bluray in their 1080p x265 HDR encodes",
      "tags": [],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "Training Day 2001 1080p BluRay DDP 7 1 HDR x265-LEGi0N",
          "lastRun": "2025-01-14T09:31:15.526804",
          "matchSpan": {
            "end": 54,
            "start": 48
          },
          "matchedContent": "LEGi0N",
          "matchedGroups": [],
          "passes": true
        }
      ]
    },
    "slug": "uhd-bluray-missing-groups",
    "filename": "UHD Bluray (Missing Groups).yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/uhdclubremux",
    "type": "regex-pattern",
    "data": {
      "name": "UHDCLUBREMUX",
      "pattern": "(?<=^|[\\s.-])UHDCLUBREMUX\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "uhdclubremux",
    "filename": "UHDCLUBREMUX.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/ultrahdclub",
    "type": "regex-pattern",
    "data": {
      "name": "ULTRAHDCLUB",
      "pattern": "(?<=^|[\\s.-])ULTRAHDCLUB\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "ultrahdclub",
    "filename": "ULTRAHDCLUB.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/upscaled",
    "type": "regex-pattern",
    "data": {
      "name": "Upscaled",
      "pattern": "(Up[-\\.\\s]?scale|Re[-\\.\\s]?Grade|\\bAIUS\\b|AI[-\\.\\s]?enhanced)",
      "description": "Matches upscales, regrades, AI Enhancements, etc. ",
      "tags": [
        "Enhancement",
        "UnWanted"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "The.Dukes.Of.Hazzard.Unrated.2005.2160p.Ai-Upscaled.10Bit.H265.DDP.5.1.RIFE.4.15-60fps-DirtyHippie",
          "lastRun": "2024-12-13T16:11:51.959589",
          "matchSpan": {
            "end": 50,
            "start": 43
          },
          "matchedContent": "Upscale",
          "matchedGroups": [
            "Upscale"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 2,
          "input": "[EG]Mobile Suit Gundam SEED 21 BD[HEVC DualAudio AI-Upscale]",
          "lastRun": "2024-12-13T16:11:51.959589",
          "matchSpan": {
            "end": 59,
            "start": 52
          },
          "matchedContent": "Upscale",
          "matchedGroups": [
            "Upscale"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 3,
          "input": "Death.Proof.2007.2160p.Ai-Upscaled.10Bit.H265.TrueHD.5.1-DirtyHippie RIFE.4.14v2-60fps.mkv",
          "lastRun": "2024-12-13T16:11:51.959589",
          "matchSpan": {
            "end": 33,
            "start": 26
          },
          "matchedContent": "Upscale",
          "matchedGroups": [
            "Upscale"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 4,
          "input": "Oi.Aparadektoi.S02E03.[FullHDAIUpscaled][Upload-Ft4U]",
          "lastRun": "2024-12-13T16:11:51.959589",
          "matchSpan": {
            "end": 38,
            "start": 31
          },
          "matchedContent": "Upscale",
          "matchedGroups": [
            "Upscale"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 5,
          "input": "Cash.Out-I.maghi.del.furto.2024.UpScaled.2160p.H265.10.bit.DV.HDR10+.ita.eng.AC3.5.1.sub.ita.eng.Licdom",
          "lastRun": "2024-12-13T16:11:51.959589",
          "matchSpan": {
            "end": 39,
            "start": 32
          },
          "matchedContent": "UpScale",
          "matchedGroups": [
            "UpScale"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 6,
          "input": "2012 (2009) UHD 4K Upscaled x264 AC3 Soup mkv",
          "lastRun": "2024-12-13T16:11:51.959589",
          "matchSpan": {
            "end": 26,
            "start": 19
          },
          "matchedContent": "Upscale",
          "matchedGroups": [
            "Upscale"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 7,
          "input": "The Martian 2015 4K UHD UPSCALED-ETRG",
          "lastRun": "2024-12-13T16:11:51.959589",
          "matchSpan": {
            "end": 31,
            "start": 24
          },
          "matchedContent": "UPSCALE",
          "matchedGroups": [
            "UPSCALE"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 8,
          "input": "WWE Smackdown 1999 S04 1080p (Upscaled) PEACOCK WEB-DL H 264 AAC 2 0",
          "lastRun": "2024-12-13T16:11:51.959589",
          "matchSpan": {
            "end": 37,
            "start": 30
          },
          "matchedContent": "Upscale",
          "matchedGroups": [
            "Upscale"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 9,
          "input": "Venom 023 (2023) (Digital) (Li'l-Empire) (HD-Upscaled)",
          "lastRun": "2024-12-13T16:11:51.959589",
          "matchSpan": {
            "end": 52,
            "start": 45
          },
          "matchedContent": "Upscale",
          "matchedGroups": [
            "Upscale"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 10,
          "input": "Natashas.Bondage.Sex.Vol.2.Upscaled",
          "lastRun": "2024-12-13T16:11:51.959589",
          "matchSpan": {
            "end": 34,
            "start": 27
          },
          "matchedContent": "Upscale",
          "matchedGroups": [
            "Upscale"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 11,
          "input": "Star Trek: Deep Space Nine S01 AI Upscale 2160p DVD AAC 2.0 H.263",
          "lastRun": "2024-12-13T16:11:51.959589",
          "matchSpan": {
            "end": 41,
            "start": 34
          },
          "matchedContent": "Upscale",
          "matchedGroups": [
            "Upscale"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 12,
          "input": "Avatar.2009.Extended.UHD.Re-Grade.4000nit.2160p.HEVC.HDR.IVACHS.ENG.ExKinoRay",
          "lastRun": "2024-12-13T16:11:51.959589",
          "matchSpan": {
            "end": 33,
            "start": 25
          },
          "matchedContent": "Re-Grade",
          "matchedGroups": [
            "Re-Grade"
          ],
          "passes": true
        },
        {
          "expected": false,
          "id": 13,
          "input": "Enhanced.2020.1080p.Bluray.DTS-HD.MA.5.1.X264-EVO",
          "lastRun": "2024-12-13T16:11:51.959589",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        }
      ]
    },
    "slug": "upscaled",
    "filename": "Upscaled.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/valis",
    "type": "regex-pattern",
    "data": {
      "name": "VALiS",
      "pattern": "(?<=^|[\\s.-])VALiS\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "valis",
    "filename": "VALiS.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/varyg",
    "type": "regex-pattern",
    "data": {
      "name": "VARYG",
      "pattern": "(?<=^|[\\s.-])VARYG\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "varyg",
    "filename": "VARYG.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/vector",
    "type": "regex-pattern",
    "data": {
      "name": "VECTOR",
      "pattern": "(?<=^|[\\s.-])VECTOR\\b",
      "description": "Banned for Fake DV/HDR Layer.",
      "tags": [
        "Release Group",
        "UnWanted"
      ],
      "tests": []
    },
    "slug": "vector",
    "filename": "VECTOR.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/vlad",
    "type": "regex-pattern",
    "data": {
      "name": "VLAD",
      "pattern": "(?<=^|[\\s.-])VLAD\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "vlad",
    "filename": "VLAD.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/vp9",
    "type": "regex-pattern",
    "data": {
      "name": "VP9",
      "pattern": "\\b(VP9)\\b",
      "description": "VP9 is an open and royalty-free video coding format developed by Google",
      "tags": [
        "Codec"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "Kedi 2016 REPACK 2160p WEB-DL DD+ 5.1 VP9-WiLDCAT",
          "lastRun": "2025-04-15T14:48:20.729485",
          "matchSpan": {
            "end": 41,
            "start": 38
          },
          "matchedContent": "VP9",
          "matchedGroups": [
            "VP9"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 2,
          "input": "Kedi.2016.Repack.2160p.WEB-DL.DDP.5.1.VP9-WiLDCAT.mkv",
          "lastRun": "2025-04-15T14:48:20.729485",
          "matchSpan": {
            "end": 41,
            "start": 38
          },
          "matchedContent": "VP9",
          "matchedGroups": [
            "VP9"
          ],
          "passes": true
        }
      ]
    },
    "slug": "vp9",
    "filename": "VP9.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/vvc",
    "type": "regex-pattern",
    "data": {
      "name": "VVC",
      "pattern": "(?<=^|[\\s.-])VVC\\b",
      "description": "VVC, or Versatile Video Coding (H.266), is a video coding format that compresses video files and streams to significantly smaller sizes than H.265 while maintaining high quality.",
      "tags": [
        "Codec"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "Aftersun.2022.1080p.BluRay.Opus.5.1.VVC-TayTO",
          "lastRun": "2024-12-13T17:44:21.546788",
          "matchSpan": {
            "end": 39,
            "start": 36
          },
          "matchedContent": "VVC",
          "matchedGroups": [],
          "passes": true
        }
      ]
    },
    "slug": "vvc",
    "filename": "VVC.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/viethd",
    "type": "regex-pattern",
    "data": {
      "name": "VietHD",
      "pattern": "(?<=^|[\\s.-])VietHD\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "viethd",
    "filename": "VietHD.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/viki",
    "type": "regex-pattern",
    "data": {
      "name": "Viki",
      "pattern": "\\b(Viki)\\b",
      "description": "Rakuten Viki is an American over-the-top subscription video on-demand streaming service. It streams videos similar to other services, but also allows users to subtitle content available in 200 languages as well as providing original programming.",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "Make Up with Mud 2024 S01E01 1080p VIKI WEB-DL AAC 2.0 H.264-DUSKLiGHT",
          "lastRun": "2025-06-01T17:53:57.847362",
          "matchSpan": {
            "end": 39,
            "start": 21
          },
          "matchedContent": " S01E01 1080p VIKI",
          "matchedGroups": [
            "VIKI"
          ],
          "passes": true
        },
        {
          "expected": false,
          "id": 2,
          "input": "Vikings S06 Part 1 1080p Blu-ray AVC DTS-HD MA 5.1-SLIPSTREAM",
          "lastRun": "2025-06-01T17:53:57.847362",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        }
      ]
    },
    "slug": "viki",
    "filename": "Viki.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/visionxpert",
    "type": "regex-pattern",
    "data": {
      "name": "VisionXpert",
      "pattern": "(?<=^|[\\s.-])VisionXpert\\b",
      "description": "Banned for Fake DV/HDR Layer",
      "tags": [
        "Release Group",
        "UnWanted"
      ],
      "tests": []
    },
    "slug": "visionxpert",
    "filename": "VisionXpert.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/viu",
    "type": "regex-pattern",
    "data": {
      "name": "Viu",
      "pattern": "\\b(Viu)\\b",
      "description": "Viu is a Hong Kong-based over-the-top video on demand streaming service from PCCW Media Group's Viu International Ltd. Viu delivers content in different genres from Asia's top content providers with local language subtitles",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "tests": []
    },
    "slug": "viu",
    "filename": "Viu.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/vodes",
    "type": "regex-pattern",
    "data": {
      "name": "Vodes",
      "pattern": "(?<=^|[\\s.-])Vodes\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "vodes",
    "filename": "Vodes.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/vyndros",
    "type": "regex-pattern",
    "data": {
      "name": "Vyndros",
      "pattern": "(?<=^|[\\s.-])Vyndros\\b",
      "description": "",
      "tags": [
        "Release Group",
        "HEVC"
      ],
      "tests": []
    },
    "slug": "vyndros",
    "filename": "Vyndros.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/w4nk3r",
    "type": "regex-pattern",
    "data": {
      "name": "W4NK3R",
      "pattern": "(?<=^|[\\s.-])W4NK3R\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "w4nk3r",
    "filename": "W4NK3R.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/watchable",
    "type": "regex-pattern",
    "data": {
      "name": "WATCHABLE",
      "pattern": "(?<=^|[\\s.-])WATCHABLE\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "watchable",
    "filename": "WATCHABLE.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/wbdp",
    "type": "regex-pattern",
    "data": {
      "name": "WBDP",
      "pattern": "(?<=^|[\\s.-])WBDP\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "wbdp",
    "filename": "WBDP.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/wming",
    "type": "regex-pattern",
    "data": {
      "name": "WMING",
      "pattern": "(?<=^|[\\s.-])WMING\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "wming",
    "filename": "WMING.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/wou",
    "type": "regex-pattern",
    "data": {
      "name": "WOU",
      "pattern": "(?<=^|[\\s.-])WOU\\b",
      "description": "",
      "tags": [
        "Release Group",
        "UnWanted"
      ],
      "tests": []
    },
    "slug": "wou",
    "filename": "WOU.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/wavve",
    "type": "regex-pattern",
    "data": {
      "name": "Wavve",
      "pattern": "\\b(Wavve)\\b",
      "description": "Wavve is an online streaming platform, that was first launched on September 18, 2019. The company was founded as a joint venture between SK Telecom and South Korea's three terrestrial broadcasters KBS, MBC, SBS.",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "tests": []
    },
    "slug": "wavve",
    "filename": "Wavve.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/wetv",
    "type": "regex-pattern",
    "data": {
      "name": "WeTV",
      "pattern": "\\b(WeTV)\\b",
      "description": "Tencent Video also called WeTV outside of China, is a Chinese video streaming website owned by Tencent. The website was launched in April 2011, and is one of China's largest online video platforms",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "tests": []
    },
    "slug": "wetv",
    "filename": "WeTV.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/whiterhino",
    "type": "regex-pattern",
    "data": {
      "name": "WhiteRhino",
      "pattern": "(?<=^|[\\s.-])WhiteRhino\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "whiterhino",
    "filename": "WhiteRhino.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/wiki",
    "type": "regex-pattern",
    "data": {
      "name": "WiKi",
      "pattern": "(?<=^|[\\s.-])WiKi\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "wiki",
    "filename": "WiKi.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/wildcat",
    "type": "regex-pattern",
    "data": {
      "name": "WiLDCAT",
      "pattern": "(?<=^|[\\s.-])WiLDCAT\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Remux"
      ],
      "tests": []
    },
    "slug": "wildcat",
    "filename": "WiLDCAT.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/xebec",
    "type": "regex-pattern",
    "data": {
      "name": "XEBEC",
      "pattern": "(?<=^|[\\s.-])XEBEC\\b",
      "description": "",
      "tags": [
        "Release Group",
        "WEB-DL"
      ],
      "tests": []
    },
    "slug": "xebec",
    "filename": "XEBEC.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/xvid",
    "type": "regex-pattern",
    "data": {
      "name": "Xvid",
      "pattern": "(?i)[-. ]Xvid",
      "description": "Xvid is a video codec based on the MPEG-4 Part 2 standard, designed for efficient compression while maintaining good visual quality. It is commonly used for encoding videos into smaller file sizes suitable for online sharing or storage, often paired with MP3 or AAC audio. ",
      "tags": [
        "Codec"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "U2.Vertigo.Live.From.Chicago.720p.AC3.5.1ch.Xvid",
          "lastRun": "2024-12-08T22:47:07.712482",
          "matchSpan": {
            "end": 48,
            "start": 43
          },
          "matchedContent": ".Xvid",
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 2,
          "input": "Britney Spears-Toxic-Hdtv-720P-Xvid.avi",
          "lastRun": "2024-12-08T22:47:07.712482",
          "matchSpan": {
            "end": 35,
            "start": 30
          },
          "matchedContent": "-Xvid",
          "matchedGroups": [],
          "passes": true
        }
      ]
    },
    "slug": "xvid",
    "filename": "Xvid.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/yawnix",
    "type": "regex-pattern",
    "data": {
      "name": "YAWNiX",
      "pattern": "(?<=^|[\\s.-])YAWNiX\\b",
      "description": "",
      "tags": [
        "Release Group",
        "HEVC"
      ],
      "tests": []
    },
    "slug": "yawnix",
    "filename": "YAWNiX.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/yello",
    "type": "regex-pattern",
    "data": {
      "name": "YELLO",
      "pattern": "(?<=^|[\\s.-])YELLO\\b",
      "description": "",
      "tags": [
        "Release Group",
        "HEVC"
      ],
      "tests": []
    },
    "slug": "yello",
    "filename": "YELLO.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/yuri",
    "type": "regex-pattern",
    "data": {
      "name": "YURI",
      "pattern": "(?<=^|[\\s.-])YURI\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "yuri",
    "filename": "YURI.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/yuki",
    "type": "regex-pattern",
    "data": {
      "name": "Yuki",
      "pattern": "(?<=^|[\\s.-])Yuki\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "yuki",
    "filename": "Yuki.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/zimbo",
    "type": "regex-pattern",
    "data": {
      "name": "ZIMBO",
      "pattern": "(?<=^|[\\s.-])ZIMBO\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "zimbo",
    "filename": "ZIMBO.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/zq",
    "type": "regex-pattern",
    "data": {
      "name": "ZQ",
      "pattern": "(?<=^|[\\s.-])ZQ\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Remux",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "zq",
    "filename": "ZQ.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/zr",
    "type": "regex-pattern",
    "data": {
      "name": "ZR",
      "pattern": "(?<=^|[\\s.-])ZR\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "zr",
    "filename": "ZR.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/zorosenpai",
    "type": "regex-pattern",
    "data": {
      "name": "ZoroSenpai",
      "pattern": "(?<=^|[\\s.-])ZoroSenpai\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "zorosenpai",
    "filename": "ZoroSenpai.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/zurako",
    "type": "regex-pattern",
    "data": {
      "name": "Zurako",
      "pattern": "(?<=^|[\\s.-])Zurako\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "zurako",
    "filename": "Zurako.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/b0mbardiers",
    "type": "regex-pattern",
    "data": {
      "name": "b0mbardiers",
      "pattern": "(?<=^|[\\s.-])b0mbardiers\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "b0mbardiers",
    "filename": "b0mbardiers.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/beast",
    "type": "regex-pattern",
    "data": {
      "name": "beAst",
      "pattern": "(?<=^|[\\s.-])beAst\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "beast",
    "filename": "beAst.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/c0ke",
    "type": "regex-pattern",
    "data": {
      "name": "c0kE",
      "pattern": "(?<=^|[\\s.-])c0kE\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "c0ke",
    "filename": "c0kE.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/d3g",
    "type": "regex-pattern",
    "data": {
      "name": "d3g",
      "pattern": "(?<=^|[\\s.-])d3g\\b",
      "description": "Banned for LQ and various Encode Issues.",
      "tags": [
        "Release Group",
        "UnWanted"
      ],
      "tests": []
    },
    "slug": "d3g",
    "filename": "d3g.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/db",
    "type": "regex-pattern",
    "data": {
      "name": "dB",
      "pattern": "(?<=^|[\\s.-])dB\\b",
      "description": "",
      "tags": [
        "Release Group",
        "WEB-DL"
      ],
      "tests": []
    },
    "slug": "db",
    "filename": "dB.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/de42",
    "type": "regex-pattern",
    "data": {
      "name": "de[42]",
      "pattern": "(?<=^|[\\s.-])de[42]\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "de42",
    "filename": "de(42).yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/deanzel",
    "type": "regex-pattern",
    "data": {
      "name": "deanzel",
      "pattern": "(?<=^|[\\s.-])deanzel\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "deanzel",
    "filename": "deanzel.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/decibel",
    "type": "regex-pattern",
    "data": {
      "name": "decibeL",
      "pattern": "(?<=^|[\\s.-])decibeL\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "decibel",
    "filename": "decibeL.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/dkore",
    "type": "regex-pattern",
    "data": {
      "name": "dkore",
      "pattern": "(?<=^|[\\s.-])dkore\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "dkore",
    "filename": "dkore.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/edge2020",
    "type": "regex-pattern",
    "data": {
      "name": "edge2020",
      "pattern": "(?<=^|[\\s.-])edge2020\\b",
      "description": "Banned for LQ, Mislabeling, and Upscale",
      "tags": [
        "Release Group",
        "UnWanted"
      ],
      "tests": []
    },
    "slug": "edge2020",
    "filename": "edge2020.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/h265",
    "type": "regex-pattern",
    "data": {
      "name": "h265",
      "pattern": "(?i)h\\s*\\.?\\s*265",
      "description": "A video compression standard that delivers higher efficiency than H.264, enabling better quality at lower bitrates, ideal for 4K and HDR content.",
      "tags": [
        "Codec"
      ],
      "tests": [
        {
          "expected": false,
          "id": 1,
          "input": "Aqua Teen Hunger Force (2000) S00E13 (480p DVD x265 SDR AAC 2.0 English - r00t QxR)",
          "lastRun": "2024-12-17T18:05:24.558038",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": false,
          "id": 2,
          "input": "Planet Earth II S01 REPACK UHD BluRay 2160p DD5.1 HDR x265-BHDStudio",
          "lastRun": "2024-12-17T18:05:24.558038",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 3,
          "input": "The Batman (2022) (1080p HMAX WEB-DL H265 SDR DDP Atmos 5.1 English - HONE)",
          "lastRun": "2024-12-17T18:05:24.558038",
          "matchSpan": {
            "end": 41,
            "start": 37
          },
          "matchedContent": "H265",
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 4,
          "input": "\t The Batman (2022) 1080p AMZN WEB-DL H265 SDR DDP 5.1 English-DarQ",
          "lastRun": "2024-12-17T18:05:24.558038",
          "matchSpan": {
            "end": 42,
            "start": 38
          },
          "matchedContent": "H265",
          "matchedGroups": [],
          "passes": true
        }
      ]
    },
    "slug": "h265",
    "filename": "h265.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/hallowed",
    "type": "regex-pattern",
    "data": {
      "name": "hallowed",
      "pattern": "(?<=^|[\\s.-])hallowed\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "Contact.1997.BluRay.1080p.DDP.5.1.x264-hallowed",
          "lastRun": "2025-01-13T02:50:54.178942",
          "matchSpan": {
            "end": 47,
            "start": 39
          },
          "matchedContent": "hallowed",
          "matchedGroups": [],
          "passes": true
        }
      ]
    },
    "slug": "hallowed",
    "filename": "hallowed.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/hchcsen",
    "type": "regex-pattern",
    "data": {
      "name": "hchcsen",
      "pattern": "(?<=^|[\\s.-])hchcsen\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "hchcsen",
    "filename": "hchcsen.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/hdalx",
    "type": "regex-pattern",
    "data": {
      "name": "hdalx",
      "pattern": "(?<=^|[\\s.-])hdalx\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "hdalx",
    "filename": "hdalx.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/icandy",
    "type": "regex-pattern",
    "data": {
      "name": "iCandy",
      "pattern": "(?<=^|[\\s.-])iCandy\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "icandy",
    "filename": "iCandy.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/ift",
    "type": "regex-pattern",
    "data": {
      "name": "iFT",
      "pattern": "(?<=^|[\\s.-])iFT\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "ift",
    "filename": "iFT.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/invandraren",
    "type": "regex-pattern",
    "data": {
      "name": "iNVANDRAREN",
      "pattern": "(?<=^|[\\s.-])iNVANDRAREN\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "invandraren",
    "filename": "iNVANDRAREN.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/ion",
    "type": "regex-pattern",
    "data": {
      "name": "iON",
      "pattern": "(?<=^|[\\s.-])iON\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "ion",
    "filename": "iON.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/ipt-internals",
    "type": "regex-pattern",
    "data": {
      "name": "iPT Internals",
      "pattern": "(?<=^|[\\s.-])CM(a)?R(io)?G|EVO\\b",
      "description": "Matches EVO / CMRG. Needed for the iTunes (Missing) CF. ",
      "tags": [
        "Release Group"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "12 Dares of Christmas 2023 1080p AMZN WEB-DL DDP 2.0 H.264-CMRG",
          "lastRun": "2024-12-06T06:14:09.421485",
          "matchSpan": {
            "end": 63,
            "start": 59
          },
          "matchedContent": "CMRG",
          "matchedGroups": [
            null,
            null
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 2,
          "input": "The.Super.Mario.Bros.Movie.2023.1080p.MA.WEB-DL.DDP5.1.Atmos.H.264-CMaRioG.mkv",
          "lastRun": "2024-12-06T06:14:09.421485",
          "matchSpan": {
            "end": 74,
            "start": 67
          },
          "matchedContent": "CMaRioG",
          "matchedGroups": [
            "a",
            "io"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 3,
          "input": "Aisha 2022 1080p WEB-DL DDP5 1 H 264-EVO",
          "lastRun": "2024-12-06T06:14:09.421485",
          "matchSpan": {
            "end": 40,
            "start": 37
          },
          "matchedContent": "EVO",
          "matchedGroups": [
            null,
            null
          ],
          "passes": true
        }
      ]
    },
    "slug": "ipt-internals",
    "filename": "iPT Internals.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/iqiyi",
    "type": "regex-pattern",
    "data": {
      "name": "iQIYI",
      "pattern": "\\b(IQIYI|IQ)\\b",
      "description": "iQIYI is a Chinese subscription video on-demand over-the-top streaming service owned by Baidu. Headquartered in Beijing, iQIYI primarily produces and distributes films and television series.",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "tests": []
    },
    "slug": "iqiyi",
    "filename": "iQIYI.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/itunes-rename",
    "type": "regex-pattern",
    "data": {
      "name": "iTunes Rename",
      "pattern": "\\[(iT)\\b|\\b(iT)\\]",
      "description": "iTunes began offering video content in October 2005 with the release of iTunes 6. At launch, the iTunes Store provided popular TV shows from ABC, Disney Channel, and other networks. Users could purchase and view video content, such as episodes of Desperate Housewives, Lost, That's So Raven, and The Suite Life of Zack & Cody.\n\nIn 2008, Apple introduced \"iTunes Digital Copy,\" a feature on select DVDs and Blu-ray discs that allowed users to obtain a digital copy of the video content in iTunes and associated media players.\n\nOver time, iTunes expanded its video offerings and became a significant platform for purchasing, organizing, and viewing movies and TV shows.",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "tests": [
        {
          "expected": false,
          "id": 1,
          "input": "The 1975-iTunes Music Festival London (2013)-CONVERT-1080p-x264-2013-SRPx",
          "lastRun": "2024-12-06T05:44:57.921957",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 2,
          "input": "Armour of God 1987 iTunes WEB-DL 4k HEVC HDR AAC-AREY",
          "lastRun": "2024-12-06T05:44:57.921957",
          "matchSpan": {
            "end": 25,
            "start": 19
          },
          "matchedContent": "iTunes",
          "matchedGroups": [
            "iTunes",
            "DL"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 3,
          "input": "The Celluloid Closet 1995 1080p iTunes WEB-DL H 264 AAC",
          "lastRun": "2024-12-06T05:44:57.921957",
          "matchSpan": {
            "end": 38,
            "start": 32
          },
          "matchedContent": "iTunes",
          "matchedGroups": [
            "iTunes",
            "DL"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 4,
          "input": "752.is.Not.A.Number.2022.2160p.iT.WEB-DL.DD5.1.HEVC-NTb.mkv",
          "lastRun": "2024-12-06T05:44:57.921957",
          "matchSpan": {
            "end": 33,
            "start": 31
          },
          "matchedContent": "iT",
          "matchedGroups": [
            "iT",
            "DL"
          ],
          "passes": true
        },
        {
          "expected": false,
          "id": 5,
          "input": "Bring It On All or Nothing 2006 1080p BluRay DDP 5 1 x265-edge2020",
          "lastRun": "2024-12-06T05:44:57.921957",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        }
      ]
    },
    "slug": "itunes-rename",
    "filename": "iTunes Rename.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/itunes",
    "type": "regex-pattern",
    "data": {
      "name": "iTunes",
      "pattern": "\\b(it|itunes)\\b(?=[ ._-]web[ ._-]?(dl|rip)\\b)",
      "description": "iTunes began offering video content in October 2005 with the release of iTunes 6. At launch, the iTunes Store provided popular TV shows from ABC, Disney Channel, and other networks. Users could purchase and view video content, such as episodes of Desperate Housewives, Lost, That's So Raven, and The Suite Life of Zack & Cody.\n\nIn 2008, Apple introduced \"iTunes Digital Copy,\" a feature on select DVDs and Blu-ray discs that allowed users to obtain a digital copy of the video content in iTunes and associated media players.\n\nOver time, iTunes expanded its video offerings and became a significant platform for purchasing, organizing, and viewing movies and TV shows.",
      "tags": [
        "Streaming Service",
        "WEB-DL"
      ],
      "tests": [
        {
          "expected": false,
          "id": 1,
          "input": "The 1975-iTunes Music Festival London (2013)-CONVERT-1080p-x264-2013-SRPx",
          "lastRun": "2024-12-06T05:44:57.921957",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 2,
          "input": "Armour of God 1987 iTunes WEB-DL 4k HEVC HDR AAC-AREY",
          "lastRun": "2024-12-06T05:44:57.921957",
          "matchSpan": {
            "end": 25,
            "start": 19
          },
          "matchedContent": "iTunes",
          "matchedGroups": [
            "iTunes",
            "DL"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 3,
          "input": "The Celluloid Closet 1995 1080p iTunes WEB-DL H 264 AAC",
          "lastRun": "2024-12-06T05:44:57.921957",
          "matchSpan": {
            "end": 38,
            "start": 32
          },
          "matchedContent": "iTunes",
          "matchedGroups": [
            "iTunes",
            "DL"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 4,
          "input": "752.is.Not.A.Number.2022.2160p.iT.WEB-DL.DD5.1.HEVC-NTb.mkv",
          "lastRun": "2024-12-06T05:44:57.921957",
          "matchSpan": {
            "end": 33,
            "start": 31
          },
          "matchedContent": "iT",
          "matchedGroups": [
            "iT",
            "DL"
          ],
          "passes": true
        },
        {
          "expected": false,
          "id": 5,
          "input": "Bring It On All or Nothing 2006 1080p BluRay DDP 5 1 x265-edge2020",
          "lastRun": "2024-12-06T05:44:57.921957",
          "matchSpan": null,
          "matchedContent": null,
          "matchedGroups": [],
          "passes": true
        }
      ]
    },
    "slug": "itunes",
    "filename": "iTunes.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/jennaortegauhd",
    "type": "regex-pattern",
    "data": {
      "name": "jennaortegaUHD",
      "pattern": "(?<=^|[\\s.-])jennaortega(UHD)?\\b",
      "description": "Banned for Fake DV/HDR Layer",
      "tags": [
        "Release Group",
        "UnWanted"
      ],
      "tests": []
    },
    "slug": "jennaortegauhd",
    "filename": "jennaortegaUHD.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/k00kie",
    "type": "regex-pattern",
    "data": {
      "name": "k00kie",
      "pattern": "(?<=^|[\\s.-])k00kie\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "k00kie",
    "filename": "k00kie.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/kmplx",
    "type": "regex-pattern",
    "data": {
      "name": "kmplx",
      "pattern": "(?<=^|[\\s.-])kmplx\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "kmplx",
    "filename": "kmplx.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/kuchikirukia",
    "type": "regex-pattern",
    "data": {
      "name": "kuchikirukia",
      "pattern": "(?<=^|[\\s.-])kuchikirukia\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "kuchikirukia",
    "filename": "kuchikirukia.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/luvbb",
    "type": "regex-pattern",
    "data": {
      "name": "luvBB",
      "pattern": "(?<=^|[\\s.-])luvBB\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "luvbb",
    "filename": "luvBB.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/micius",
    "type": "regex-pattern",
    "data": {
      "name": "micius",
      "pattern": "(?<=^|[\\s.-])micius\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "micius",
    "filename": "micius.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/mkv",
    "type": "regex-pattern",
    "data": {
      "name": "mkv",
      "pattern": ".mkv|.mp4",
      "description": "Matches MKV and MP4 containers. Helps to differentiate file names from torrent names.",
      "tags": [
        "Container"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "Full.Metal.Jacket.1987.1080p.HMAX.WEB-DL.DD5.1.HEVC-SiGLA.mkv",
          "lastRun": "2024-12-11T05:19:13.022900",
          "matchSpan": {
            "end": 61,
            "start": 57
          },
          "matchedContent": ".mkv",
          "matchedGroups": [],
          "passes": true
        },
        {
          "expected": true,
          "id": 2,
          "input": "Don’t Move “Directed by Anthony Melton”_HD_1920x1080_tt2846600.mp4",
          "lastRun": "2024-12-11T05:19:13.022900",
          "matchSpan": {
            "end": 66,
            "start": 62
          },
          "matchedContent": ".mp4",
          "matchedGroups": [],
          "passes": true
        }
      ]
    },
    "slug": "mkv",
    "filename": "mkv.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/monkee",
    "type": "regex-pattern",
    "data": {
      "name": "monkee",
      "pattern": "(?<=^|[\\s.-])monkee\\b",
      "description": "Matches \"monkee\" when preceded by whitespace, a hyphen or dot",
      "tags": [
        "Release Group",
        "WEB-DL"
      ],
      "tests": []
    },
    "slug": "monkee",
    "filename": "monkee.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/nmd",
    "type": "regex-pattern",
    "data": {
      "name": "nmd",
      "pattern": "(?<=^|[\\s.-])nmd\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "nmd",
    "filename": "nmd.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/playbd",
    "type": "regex-pattern",
    "data": {
      "name": "playBD",
      "pattern": "(?<=^|[\\s.-])playBD\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Remux"
      ],
      "tests": []
    },
    "slug": "playbd",
    "filename": "playBD.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/playhd",
    "type": "regex-pattern",
    "data": {
      "name": "playHD",
      "pattern": "(?<=^|[\\s.-])playHD\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "playhd",
    "filename": "playHD.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/playweb",
    "type": "regex-pattern",
    "data": {
      "name": "playWEB",
      "pattern": "(?<=^|[\\s.-])playWEB\\b",
      "description": "",
      "tags": [
        "Release Group",
        "WEB-DL"
      ],
      "tests": []
    },
    "slug": "playweb",
    "filename": "playWEB.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/pog42",
    "type": "regex-pattern",
    "data": {
      "name": "pog42",
      "pattern": "(?<=^|[\\s.-])pog42\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "pog42",
    "filename": "pog42.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/rightsize",
    "type": "regex-pattern",
    "data": {
      "name": "rightSIZE",
      "pattern": "(?<=^|[\\s.-])rightSIZE\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "rightsize",
    "filename": "rightSIZE.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/rttr",
    "type": "regex-pattern",
    "data": {
      "name": "rttr",
      "pattern": "(?<=^|[\\s.-])rttr\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "rttr",
    "filename": "rttr.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/sam",
    "type": "regex-pattern",
    "data": {
      "name": "sam",
      "pattern": "(?<=^|[\\s.-])sam\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "sam",
    "filename": "sam.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/smol",
    "type": "regex-pattern",
    "data": {
      "name": "smol",
      "pattern": "(?<=^|[\\s.-])smol\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Anime"
      ],
      "tests": []
    },
    "slug": "smol",
    "filename": "smol.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/tarunk9c",
    "type": "regex-pattern",
    "data": {
      "name": "tarunk9c",
      "pattern": "(?<=^|[\\s.-])tarunk9c\\b",
      "description": "Banned for Fake DV/HDR Layer",
      "tags": [
        "Release Group",
        "UnWanted"
      ],
      "tests": []
    },
    "slug": "tarunk9c",
    "filename": "tarunk9c.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/x264",
    "type": "regex-pattern",
    "data": {
      "name": "x264",
      "pattern": "^(?!.*(?i:remux)).*([xh](\\.?264)|DVDRip)",
      "description": "An open source encoder that produces H.264 videos. ",
      "tags": [
        "Encoder",
        "Codec"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "Dan Da Dan AKA Dandadan S01E10 1080p CR WEB-DL AAC 2.0 x264-SubsPlease",
          "lastRun": "2024-12-07T00:22:39.865345",
          "matchSpan": {
            "end": 59,
            "start": 0
          },
          "matchedContent": "Dan Da Dan AKA Dandadan S01E10 1080p CR WEB-DL AAC 2.0 x264",
          "matchedGroups": [
            "x264",
            "264"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 2,
          "input": "Life of Pi 2012 1080p BluRay x264-SPARKS",
          "lastRun": "2024-12-07T00:22:39.865345",
          "matchSpan": {
            "end": 33,
            "start": 0
          },
          "matchedContent": "Life of Pi 2012 1080p BluRay x264",
          "matchedGroups": [
            "x264",
            "264"
          ],
          "passes": true
        },
        {
          "expected": false,
          "id": 3,
          "input": "Scrubs (2001) S04 REPACK (1080p AIUS DVDRip x265 10bit AC3 5 1 English - JBENT)[TAoE]",
          "lastRun": "2024-12-07T00:22:39.865345",
          "matchSpan": {
            "end": 43,
            "start": 0
          },
          "matchedContent": "Scrubs (2001) S04 REPACK (1080p AIUS DVDRip",
          "matchedGroups": [
            "DVDRip",
            null
          ],
          "passes": false
        },
        {
          "expected": false,
          "id": 4,
          "input": "Wallander UK S01-S04 DVDRip XviD BDRip x264-Scene (2008-2016)",
          "lastRun": "2024-12-07T00:22:39.865345",
          "matchSpan": {
            "end": 43,
            "start": 0
          },
          "matchedContent": "Wallander UK S01-S04 DVDRip XviD BDRip x264",
          "matchedGroups": [
            "x264",
            "264"
          ],
          "passes": false
        },
        {
          "expected": false,
          "id": 5,
          "input": "Rugrats S05 480p DVDRip Opus 2.0 AV1-Jenkins",
          "lastRun": "2024-12-07T00:22:39.865345",
          "matchSpan": {
            "end": 23,
            "start": 0
          },
          "matchedContent": "Rugrats S05 480p DVDRip",
          "matchedGroups": [
            "DVDRip",
            null
          ],
          "passes": false
        },
        {
          "expected": true,
          "id": 6,
          "input": "_Summer S00 JAPANESE 480p DVDRip DD 2.0 x264-Tsundere",
          "lastRun": "2024-12-07T00:22:39.865345",
          "matchSpan": {
            "end": 44,
            "start": 0
          },
          "matchedContent": "_Summer S00 JAPANESE 480p DVDRip DD 2.0 x264",
          "matchedGroups": [
            "x264",
            "264"
          ],
          "passes": true
        }
      ]
    },
    "slug": "x264",
    "filename": "x264.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/x265",
    "type": "regex-pattern",
    "data": {
      "name": "x265",
      "pattern": "^(?!.*(?i:remux))(?=.*([x]\\s?(\\.?265)\\b|HEVC|\\bDS4K\\b)).*$",
      "description": "An open source encoder that produces H.265 videos. ",
      "tags": [
        "Encoder",
        "Codec"
      ],
      "tests": [
        {
          "expected": true,
          "id": 1,
          "input": "Aqua Teen Hunger Force (2000) S00E13 (480p DVD x265 SDR AAC 2.0 English - r00t QxR)",
          "lastRun": "2025-01-14T10:24:52.457470",
          "matchSpan": {
            "end": 83,
            "start": 0
          },
          "matchedContent": "Aqua Teen Hunger Force (2000) S00E13 (480p DVD x265 SDR AAC 2.0 English - r00t QxR)",
          "matchedGroups": [
            "x265",
            "265"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 2,
          "input": "Planet Earth II S01 REPACK UHD BluRay 2160p DD5.1 HDR x265-BHDStudio",
          "lastRun": "2025-01-14T10:24:52.457470",
          "matchSpan": {
            "end": 68,
            "start": 0
          },
          "matchedContent": "Planet Earth II S01 REPACK UHD BluRay 2160p DD5.1 HDR x265-BHDStudio",
          "matchedGroups": [
            "x265",
            "265"
          ],
          "passes": true
        },
        {
          "expected": true,
          "id": 3,
          "input": "Spider-Man Across the Spider-Verse 2023 1080p UHD BluRay DDP7 1 DoVi HDR10x265-c0kE",
          "lastRun": "2025-01-14T10:24:52.457470",
          "matchSpan": {
            "end": 83,
            "start": 0
          },
          "matchedContent": "Spider-Man Across the Spider-Verse 2023 1080p UHD BluRay DDP7 1 DoVi HDR10x265-c0kE",
          "matchedGroups": [
            "x265",
            "265"
          ],
          "passes": true
        }
      ]
    },
    "slug": "x265",
    "filename": "x265.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/regex-pattern/xander",
    "type": "regex-pattern",
    "data": {
      "name": "xander",
      "pattern": "(?<=^|[\\s.-])xander\\b",
      "description": "",
      "tags": [
        "Release Group",
        "Bluray"
      ],
      "tests": []
    },
    "slug": "xander",
    "filename": "xander.yml",
    "category": "regex-pattern"
  },
  {
    "path": "/media-management/misc",
    "type": "media-management",
    "data": {
      "radarr": {
        "propersRepacks": "doNotPrefer",
        "enableMediaInfo": true
      },
      "sonarr": {
        "propersRepacks": "doNotPrefer",
        "enableMediaInfo": true
      }
    },
    "slug": "misc",
    "filename": "misc.yml",
    "category": "media-management"
  },
  {
    "path": "/media-management/naming",
    "type": "media-management",
    "data": {
      "radarr": {
        "rename": true,
        "movieFormat": "{Movie CleanTitle} {(Release Year)} {tmdb-{TmdbId}} {edition-{Edition Tags}} {[Custom Formats]}{[Quality Full]}{[MediaInfo 3D]}{[MediaInfo VideoDynamicRangeType]}{[Mediainfo AudioCodec}{ Mediainfo AudioChannels]}{[Mediainfo VideoCodec]}{-Release Group}",
        "movieFolderFormat": "{Movie CleanTitle} ({Release Year}) {tmdb-{TmdbId}}",
        "replaceIllegalCharacters": false,
        "colonReplacementFormat": "smart"
      },
      "sonarr": {
        "rename": true,
        "standardEpisodeFormat": "{Series TitleYear} - S{season:00}E{episode:00} - {Episode CleanTitle} {[Custom Formats]}{[Quality Full]}{[MediaInfo VideoDynamicRangeType]}{[Mediainfo AudioCodec}{ Mediainfo AudioChannels]}{[MediaInfo VideoCodec]}{-Release Group}",
        "dailyEpisodeFormat": "{Series TitleYear} - {Air-Date} - {Episode CleanTitle} {[Custom Formats]}{[Quality Full]}{[MediaInfo VideoDynamicRangeType]}{[Mediainfo AudioCodec}{ Mediainfo AudioChannels]}{[MediaInfo VideoCodec]}{-Release Group}",
        "animeEpisodeFormat": "{Series TitleYear} - S{season:00}E{episode:00} - {absolute:000} - {Episode CleanTitle} {[Custom Formats]}{[Quality Full]}{[MediaInfo VideoDynamicRangeType]}[{MediaInfo VideoBitDepth}bit]{[MediaInfo VideoCodec]}[{Mediainfo AudioCodec} { Mediainfo AudioChannels}]{MediaInfo AudioLanguages}{-Release Group}",
        "seriesFolderFormat": "{Series TitleYear} {tvdb-{TvdbId}}",
        "seasonFolderFormat": "Season {season:00}",
        "replaceIllegalCharacters": false,
        "colonReplacementFormat": 4,
        "customColonReplacementFormat": "",
        "multiEpisodeStyle": 5
      }
    },
    "slug": "naming",
    "filename": "naming.yml",
    "category": "media-management"
  },
  {
    "path": "/media-management/qualitydefinitions",
    "type": "media-management",
    "data": {
      "qualityDefinitions": {
        "radarr": {
          "BR-DISK": {
            "max": 2000,
            "min": 0,
            "preferred": 1990
          },
          "Bluray-1080p": {
            "max": 2000,
            "min": 0,
            "preferred": 1990
          },
          "Bluray-2160p": {
            "max": 2000,
            "min": 0,
            "preferred": 1990
          },
          "Bluray-480p": {
            "max": 2000,
            "min": 0,
            "preferred": 1990
          },
          "Bluray-576p": {
            "max": 2000,
            "min": 0,
            "preferred": 1990
          },
          "Bluray-720p": {
            "max": 2000,
            "min": 0,
            "preferred": 1990
          },
          "CAM": {
            "max": 2000,
            "min": 0,
            "preferred": 1990
          },
          "DVD": {
            "max": 2000,
            "min": 0,
            "preferred": 1990
          },
          "DVD-R": {
            "max": 2000,
            "min": 0,
            "preferred": 1990
          },
          "DVDSCR": {
            "max": 2000,
            "min": 0,
            "preferred": 1990
          },
          "HDTV-1080p": {
            "max": 2000,
            "min": 0,
            "preferred": 1990
          },
          "HDTV-2160p": {
            "max": 2000,
            "min": 0,
            "preferred": 1990
          },
          "HDTV-720p": {
            "max": 2000,
            "min": 0,
            "preferred": 1990
          },
          "REGIONAL": {
            "max": 2000,
            "min": 0,
            "preferred": 1990
          },
          "Raw-HD": {
            "max": 2000,
            "min": 0,
            "preferred": 1990
          },
          "Remux-1080p": {
            "max": 2000,
            "min": 0,
            "preferred": 1990
          },
          "Remux-2160p": {
            "max": 2000,
            "min": 0,
            "preferred": 1990
          },
          "SDTV": {
            "max": 2000,
            "min": 0,
            "preferred": 1990
          },
          "TELECINE": {
            "max": 2000,
            "min": 0,
            "preferred": 1990
          },
          "TELESYNC": {
            "max": 2000,
            "min": 0,
            "preferred": 1990
          },
          "Unknown": {
            "max": 2000,
            "min": 0,
            "preferred": 1990
          },
          "WEBDL-1080p": {
            "max": 2000,
            "min": 0,
            "preferred": 1990
          },
          "WEBDL-2160p": {
            "max": 2000,
            "min": 0,
            "preferred": 1990
          },
          "WEBDL-480p": {
            "max": 2000,
            "min": 0,
            "preferred": 1990
          },
          "WEBDL-720p": {
            "max": 2000,
            "min": 0,
            "preferred": 1990
          },
          "WEBRip-1080p": {
            "max": 2000,
            "min": 0,
            "preferred": 1990
          },
          "WEBRip-2160p": {
            "max": 2000,
            "min": 0,
            "preferred": 1990
          },
          "WEBRip-480p": {
            "max": 2000,
            "min": 0,
            "preferred": 1990
          },
          "WEBRip-720p": {
            "max": 2000,
            "min": 0,
            "preferred": 1990
          },
          "WORKPRINT": {
            "max": 2000,
            "min": 0,
            "preferred": 1990
          }
        },
        "sonarr": {
          "Bluray-1080p": {
            "max": 1000,
            "min": 0,
            "preferred": 990
          },
          "Bluray-1080p Remux": {
            "max": 1000,
            "min": 0,
            "preferred": 990
          },
          "Bluray-2160p": {
            "max": 1000,
            "min": 0,
            "preferred": 990
          },
          "Bluray-2160p Remux": {
            "max": 1000,
            "min": 0,
            "preferred": 990
          },
          "Bluray-480p": {
            "max": 1000,
            "min": 0,
            "preferred": 990
          },
          "Bluray-576p": {
            "max": 1000,
            "min": 0,
            "preferred": 990
          },
          "Bluray-720p": {
            "max": 1000,
            "min": 0,
            "preferred": 990
          },
          "DVD": {
            "max": 1000,
            "min": 0,
            "preferred": 990
          },
          "HDTV-1080p": {
            "max": 1000,
            "min": 0,
            "preferred": 990
          },
          "HDTV-2160p": {
            "max": 1000,
            "min": 0,
            "preferred": 990
          },
          "HDTV-720p": {
            "max": 1000,
            "min": 0,
            "preferred": 990
          },
          "Raw-HD": {
            "max": 1000,
            "min": 0,
            "preferred": 990
          },
          "SDTV": {
            "max": 1000,
            "min": 0,
            "preferred": 990
          },
          "Unknown": {
            "max": 1000,
            "min": 0,
            "preferred": 990
          },
          "WEBDL-1080p": {
            "max": 1000,
            "min": 0,
            "preferred": 990
          },
          "WEBDL-2160p": {
            "max": 1000,
            "min": 0,
            "preferred": 990
          },
          "WEBDL-480p": {
            "max": 1000,
            "min": 0,
            "preferred": 990
          },
          "WEBDL-720p": {
            "max": 1000,
            "min": 0,
            "preferred": 990
          },
          "WEBRip-1080p": {
            "max": 1000,
            "min": 0,
            "preferred": 990
          },
          "WEBRip-2160p": {
            "max": 1000,
            "min": 0,
            "preferred": 990
          },
          "WEBRip-480p": {
            "max": 1000,
            "min": 0,
            "preferred": 990
          },
          "WEBRip-720p": {
            "max": 1000,
            "min": 0,
            "preferred": 990
          }
        }
      }
    },
    "slug": "qualitydefinitions",
    "filename": "quality_definitions.yml",
    "category": "media-management"
  },
  {
    "path": "/wiki/eei",
    "type": "markdown",
    "frontmatter": {
      "title": "Encode Efficiency Index",
      "slug": "EEi",
      "author": "santiagosayshey",
      "created": "2024-12-28T00:00:00.000Z",
      "tags": [
        "wiki",
        "efficiency",
        "encode"
      ],
      "blurb": "A data-driven metric that measures how well release groups balance file size and quality in their encodes, helping users find releases that match their storage and quality preferences."
    },
    "html": "<p>This metric is aimed at identifying and ranking release groups based on their propensity to release <strong>encodes that meet certain compression ratios</strong>, with particular focus on <strong>HEVC</strong> releases where optimal efficiency occurs in specific bitrate ranges. By ranking these groups, we effectively prioritize releases that maximize HEVC&#39;s compression capabilities while maintaining quality at minimal file sizes.</p>\n<h2 id=\"what-is-a-compression-ratio\">What is a Compression Ratio?</h2>\n<p>A compression ratio is a (made up) metric that evaluates encodes against their sources. We express this as the <strong>encoded file size as a percentage of its source size</strong> (typically a <strong>remux</strong> or <strong>WEB-DL</strong>).</p>\n<p>For example:</p>\n<table>\n<thead>\n<tr>\n<th>Movie</th>\n<th>Source (Remux)</th>\n<th>Encode</th>\n<th>Compression Ratio</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>Movie A</td>\n<td>40 GB</td>\n<td>10 GB</td>\n<td>25%</td>\n</tr>\n<tr>\n<td>Movie B</td>\n<td>30 GB</td>\n<td>6 GB</td>\n<td>20%</td>\n</tr>\n<tr>\n<td>Movie C</td>\n<td>50 GB</td>\n<td>15 GB</td>\n<td>30%</td>\n</tr>\n</tbody></table>\n<h2 id=\"why-is-this-important\">Why Is This Important?</h2>\n<p>Understanding compression ratios helps balance two competing needs: <strong>maintaining high video quality while minimizing file size</strong>. Modern codecs like <strong>HEVC</strong> have a <strong>&quot;sweet spot&quot;</strong> where they deliver excellent quality with significant size savings. Finding this optimal point is crucial because:</p>\n<ul>\n<li>Storage and bandwidth are always <strong>limited resources</strong></li>\n<li>Going beyond certain bitrates provides <strong>diminishing quality returns</strong></li>\n<li>Different codecs have different <strong>efficiency curves</strong></li>\n<li>Release groups need clear standards for <strong>quality vs. size trade-offs</strong></li>\n</ul>\n<h2 id=\"what-ratio-is-best\">What Ratio is Best?</h2>\n<p>There&#39;s no one-size-fits-all answer when it comes to choosing the perfect compression ratio. The &quot;best&quot; ratio <strong>depends entirely on your specific needs</strong>. At 1080p:</p>\n<ul>\n<li>Space-conscious users might prefer <strong>smaller files (5-10% of source)</strong> with quality trade-offs</li>\n<li>Quality-focused users might push towards <strong>higher quality (30-40% of source)</strong> for transparency</li>\n<li>Most users find a sweet spot in the middle</li>\n</ul>\n<p>However, there are technical limits - files larger than <strong>40% for 1080p</strong> and <strong>60% for 2160p</strong> provide no meaningful benefits.</p>\n<h2 id=\"why-set-maximum-ratios-of-40-and-60\">Why Set Maximum Ratios of 40% and 60%?</h2>\n<p>The compression ratio ceilings are set based on different factors for 1080p and 2160p content:</p>\n<h3 id=\"1080p-40-maximum\">1080p (40% Maximum)</h3>\n<p>The 40% ceiling for 1080p exists because we can roughly measure where <strong>HEVC stops being efficient compared to AVC</strong>. We do this using two key video quality metrics:</p>\n<ul>\n<li><strong>VMAF</strong> - analyzes how humans perceive video quality and scores it from 0-100</li>\n<li><strong>BD-Rate</strong> - tells us how much smaller one encode is compared to another while maintaining the same quality level</li>\n</ul>\n<p>Using these tools together shows us that:</p>\n<ul>\n<li>HEVC achieves <strong>20-40% smaller files</strong> in the mid-bitrate range (~2-10 Mbps for 1080p)</li>\n<li>These space savings are consistent across different quality levels</li>\n<li>Beyond this point, both codecs achieve <strong>near identical quality</strong></li>\n<li>At ratios above 40%, <strong>AVC becomes preferred</strong> due to better tooling and quality control</li>\n</ul>\n<h3 id=\"2160p-60-maximum\">2160p (60% Maximum)</h3>\n<p>The 60% ceiling for 2160p content is based on different considerations:</p>\n<ul>\n<li>This is approximately where <strong>visual transparency</strong> becomes achievable</li>\n<li>Higher ratios provide <strong>diminishing returns</strong></li>\n<li>At this compression level, content achieves <strong>VMAF scores above 95</strong></li>\n<li><strong>Storage efficiency</strong> becomes critical due to larger base file sizes</li>\n<li>Quality improvements become <strong>increasingly subtle</strong> beyond this point</li>\n</ul>\n<p>Read these articles to better understand how VMAF and BD-Rate tell us how efficient a codec is[^1][^2]:</p>\n<h2 id=\"how-do-we-apply-this-index\">How Do We Apply This Index?</h2>\n<p>The ranking system works by calculating how close each Release Group / Streaming Service comes to achieving a user&#39;s desired compression ratio. This is done through a few key steps:</p>\n<ol>\n<li><p><strong>Delta Calculation</strong>: We calculate the absolute difference (delta) between a group&#39;s average compression ratio and the target ratio. For example, if a group averages 25% compression and our target is 20%, their delta would be |25 - 20| = 5 percentage points.</p>\n</li>\n<li><p><strong>K-means Clustering</strong>: We use k-means clustering to automatically group release groups into tiers based on their deltas. K-means works by:</p>\n<ul>\n<li>Starting with k random cluster centers</li>\n<li>Assigning each group to its nearest center</li>\n<li>Recalculating centers based on group assignments</li>\n<li>Repeating until stable</li>\n</ul>\n</li>\n</ol>\n<h1 id=\"example-rankings\">Example Rankings</h1>\n<h2 id=\"1080p-examples\">1080p Examples</h2>\n<h3 id=\"example-1-users-prioritizing-storage-efficiency-10-target\">Example 1: Users prioritizing storage efficiency (10% target)</h3>\n<p>Users might choose this very aggressive compression target when:</p>\n<ul>\n<li>Managing large libraries on limited storage</li>\n<li>Collecting complete series where total size is a major concern</li>\n<li>Primarily viewing on mobile devices or smaller screens</li>\n<li>Dealing with bandwidth caps or slow internet connections</li>\n</ul>\n<table>\n<thead>\n<tr>\n<th>Tier</th>\n<th>Group</th>\n<th>Efficiency</th>\n<th>Delta</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>1</td>\n<td>iVy</td>\n<td>9.37%</td>\n<td>0.63</td>\n</tr>\n<tr>\n<td>1</td>\n<td>PSA</td>\n<td>7.89%</td>\n<td>2.11</td>\n</tr>\n<tr>\n<td>2</td>\n<td>Vyndros</td>\n<td>16.08%</td>\n<td>6.08</td>\n</tr>\n<tr>\n<td>2</td>\n<td>Chivaman</td>\n<td>16.80%</td>\n<td>6.80</td>\n</tr>\n<tr>\n<td>2</td>\n<td>Amazon Prime (H.265)</td>\n<td>16.15%</td>\n<td>6.15</td>\n</tr>\n<tr>\n<td>3</td>\n<td>Disney+ (H.265)</td>\n<td>20.32%</td>\n<td>10.32</td>\n</tr>\n<tr>\n<td>3</td>\n<td>TAoE</td>\n<td>22.78%</td>\n<td>12.78</td>\n</tr>\n<tr>\n<td>3</td>\n<td>QxR</td>\n<td>23.25%</td>\n<td>13.25</td>\n</tr>\n<tr>\n<td>3</td>\n<td>BRiAN</td>\n<td>25.16%</td>\n<td>15.16</td>\n</tr>\n<tr>\n<td>3</td>\n<td>Movies Anywhere (H.265)</td>\n<td>26.05%</td>\n<td>16.05</td>\n</tr>\n<tr>\n<td>4</td>\n<td>MainFrame</td>\n<td>37.63%</td>\n<td>27.63</td>\n</tr>\n<tr>\n<td>4</td>\n<td>NAN0</td>\n<td>37.71%</td>\n<td>27.71</td>\n</tr>\n</tbody></table>\n<h3 id=\"example-2-users-seeking-balanced-quality-and-size-25-target\">Example 2: Users seeking balanced quality and size (25% target)</h3>\n<p>This moderate compression target appeals to users who:</p>\n<ul>\n<li>Have reasonable storage capacity but still want efficiency</li>\n<li>Watch on mid to large screens where quality becomes more noticeable</li>\n<li>Want a good balance between visual quality and practical file sizes</li>\n</ul>\n<table>\n<thead>\n<tr>\n<th>Tier</th>\n<th>Group</th>\n<th>Efficiency</th>\n<th>Delta</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>1</td>\n<td>BRiAN</td>\n<td>25.16%</td>\n<td>0.16</td>\n</tr>\n<tr>\n<td>1</td>\n<td>Movies Anywhere (H.265)</td>\n<td>26.05%</td>\n<td>1.05</td>\n</tr>\n<tr>\n<td>1</td>\n<td>QxR</td>\n<td>23.25%</td>\n<td>1.75</td>\n</tr>\n<tr>\n<td>1</td>\n<td>TAoE</td>\n<td>22.78%</td>\n<td>2.22</td>\n</tr>\n<tr>\n<td>2</td>\n<td>Disney+ (H.265)</td>\n<td>20.32%</td>\n<td>4.68</td>\n</tr>\n<tr>\n<td>3</td>\n<td>Amazon Prime (H.265)</td>\n<td>16.15%</td>\n<td>8.85</td>\n</tr>\n<tr>\n<td>3</td>\n<td>Chivaman</td>\n<td>16.80%</td>\n<td>8.20</td>\n</tr>\n<tr>\n<td>3</td>\n<td>Vyndros</td>\n<td>16.08%</td>\n<td>8.92</td>\n</tr>\n<tr>\n<td>3</td>\n<td>MainFrame</td>\n<td>37.63%</td>\n<td>12.63</td>\n</tr>\n<tr>\n<td>3</td>\n<td>NAN0</td>\n<td>37.71%</td>\n<td>12.71</td>\n</tr>\n<tr>\n<td>4</td>\n<td>iVy</td>\n<td>9.37%</td>\n<td>15.63</td>\n</tr>\n<tr>\n<td>4</td>\n<td>PSA</td>\n<td>7.89%</td>\n<td>17.11</td>\n</tr>\n</tbody></table>\n<h2 id=\"2160p-examples\">2160p Examples</h2>\n<h3 id=\"example-3-extreme-space-saving-20-target\">Example 3: Extreme Space Saving (20% target)</h3>\n<p>This aggressive 2160p compression appeals to users who:</p>\n<ul>\n<li>Want to maintain a 4K library on limited storage</li>\n<li>Primarily view content at typical viewing distances where subtle quality differences are less noticeable</li>\n<li>Need to conserve bandwidth while still enjoying 4K resolution</li>\n<li>Have a large collection of 4K content and need to balance quality with practical storage constraints</li>\n</ul>\n<p>TODO: EXAMPLES</p>\n<h3 id=\"example-4-balanced-4k-40-target\">Example 4: Balanced 4K (40% target)</h3>\n<p>This middle-ground approach is ideal for users who:</p>\n<ul>\n<li>Have decent storage capacity but still want reasonable efficiency</li>\n<li>Watch on larger screens where quality differences become more apparent</li>\n<li>Want to maintain high quality while still keeping files manageable</li>\n<li>Need reliable HDR performance without excessive file sizes</li>\n</ul>\n<p>TODO: EXAMPLES</p>\n<h3 id=\"example-5-near-transparent-quality-60-target\">Example 5: Near Transparent Quality (60% target)</h3>\n<p>This higher bitrate target is chosen by users who:</p>\n<ul>\n<li>Have ample storage and prioritize maximum quality consciously</li>\n<li>Watch on high-end displays where subtle quality differences are noticeable</li>\n<li>Want to maintain archive-quality collections</li>\n<li>Focus on difficult-to-encode content where compression artifacts are more visible</li>\n</ul>\n<p>TODO: EXAMPLES</p>\n<p>These examples demonstrate how different groups excel at different target ratios, and how streaming services tend to maintain consistent compression approaches regardless of user preferences. The rankings help users quickly identify which releases will best match their specific quality and size requirements.</p>\n<h2 id=\"frequently-asked-questions\">Frequently Asked Questions</h2>\n<table>\n<thead>\n<tr>\n<th>Question</th>\n<th>Answer</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>Why not just detect h265/x265 releases? Isn&#39;t that simpler?</td>\n<td>This is a common misconception that &quot;HEVC = smaller = better&quot;. While it&#39;s true that HEVC/x265 <em>can</em> achieve better compression than AVC/x264, simply detecting the codec tells us nothing about the actual efficiency of the specific encode. A poorly encoded HEVC release can be larger and lower quality than a well-tuned x264 encode. By focusing on compression ratio instead of codec detection, we measure what actually matters - how efficiently the release uses storage space while maintaining quality. This approach has several advantages:<br><br>- It rewards efficient encodes regardless of codec choice<br>- It catches inefficient HEVC encodes that waste space<br>- It avoids the complexity of parsing inconsistent HEVC labeling (h265/x265)<br>- It future-proofs the system for newer codecs like AV1, where we can simply adjust our codec ranking priorities (AV1 &gt; HEVC &gt; AVC) while still maintaining the core efficiency metric<br><br>Think of it this way: users don&#39;t actually care what codec is used - they care about getting high quality video at reasonable file sizes. Our metric measures this directly instead of using codec choice as an unreliable proxy.</td>\n</tr>\n<tr>\n<td>But doesn&#39;t this ignore quality?</td>\n<td>The current encoding landscape places tremendous emphasis on maximizing absolute quality, often treating file size as a secondary concern. This metric aims to challenge that, or at least find a middle ground - we care about quality (hence why we use proper sources as our baseline and consider VMAF scores), but we acknowledge that most users only care about getting file sizes they actually want, and not the marginal quality improvements you get from encoding from a remux, compared to a web-dl. Rather than taking either extreme position - &quot;quality above all&quot; or &quot;smaller is always better&quot; - we focus on <em>efficiency</em>: getting the best practical quality for any given file size target. This approach <strong>will not</strong> satisfy quality enthusiasts, but it better serves the needs of most users.</td>\n</tr>\n<tr>\n<td>What if the source is not a 1080p remux? How do you tell?</td>\n<td>This metric, like any data-driven system, will never achieve 100% accuracy. However, we can parse various indicators beyond just the release group or streaming service to identify non-remux sources. For example, we can identify when a non-DS4K WEB-DL or non-webrip from a reputable group is likely sourced from another lossy encode rather than a remux. We also maintain a manual tagging system to downrank certain release groups known for reencoding from non-high-quality sources. Groups like PSA and MeGusta will be ranked lower in the system, regardless of their efficiency scores, due to their known practices.</td>\n</tr>\n<tr>\n<td>How do you prefer HEVC?</td>\n<td>We actually approach this from the opposite direction - instead of preferring HEVC, we downrank AVC. This is because HEVC naming conventions are inconsistent (groups use x265 and h265 interchangeably), making them difficult to parse reliably. In contrast, AVC is almost always labeled consistently as either x264 or h264, making it much easier to identify and downrank these releases.</td>\n</tr>\n<tr>\n<td>Why not consider releases above 40% efficiency?</td>\n<td>For standard 1080p non-HDR content, above 40% compression ratio, x264 and x265 perform nearly identically in terms of VMAF scores, eliminating HEVC&#39;s key advantages. At this point, x264 becomes the preferred choice across all metrics - the encodes are easier to produce, far more common, and typically undergo more rigorous quality control. There&#39;s simply no compelling reason to use HEVC at these higher bitrates for standard 1080p content.</td>\n</tr>\n<tr>\n<td>What about animated content?</td>\n<td>Animated content typically has different compression characteristics than live action - it often achieves excellent quality at much lower bitrates due to its unique properties (flat colors, sharp edges, less grain). Ideally, we would use higher target ratios for live action and lower ones for animation. However, reliably detecting animated content programmatically is extremely challenging. While we can sometimes identify anime by certain keywords or release group patterns, western animation, partial animation, and CGI-heavy content create too many edge cases for reliable detection. For now, we treat all content with the same metric, acknowledging this as a known limitation of the system. Users seeking optimal results for animated content may want to target lower compression ratios than they would for live action material, perhaps via a duplicate profile at a different compression target.</td>\n</tr>\n<tr>\n<td>Why does transparency require 60% at 2160p compared to 40% at 1080p?</td>\n<td>The higher ratio requirement for 2160p content stems from several technical factors that compound to demand more data for achieving transparency:<br><br>1. <strong>Increased Color Depth</strong>: Most 2160p content uses 10-bit color depth compared to 8-bit for standard 1080p content. This 25% increase in bit depth requires more data to maintain precision in color gradients and prevent banding.<br><br>2. <strong>HDR Requirements</strong>: 2160p content often includes HDR metadata, which demands more precise encoding of brightness levels and color information. The expanded dynamic range means we need to preserve more subtle variations in both very bright and very dark scenes.<br><br>3. <strong>Resolution Scaling</strong>: While 2160p has 4x the pixels of 1080p, compression efficiency doesn&#39;t scale linearly. Higher resolution reveals more subtle details and film grain, which require more data to preserve accurately.<br><br>These factors combine multiplicatively rather than additively, which is why we need a 50% increase in the compression ratio ceiling (from 40% to 60%) to achieve similar perceptual transparency.</td>\n</tr>\n<tr>\n<td>Do all 2160p releases need 60% for transparency?</td>\n<td>No, the actual requirements vary significantly based on several factors:<br><br>1. <strong>Content Type</strong>:<br>- Animation might achieve transparency at 30-40%<br>- Digital source material (like CGI-heavy films) often requires less<br>- Film-based content with heavy grain needs the full 60%<br><br>2. <strong>HDR Implementation</strong>:<br>- SDR 2160p content can often achieve transparency at lower ratios<br>- Dolby Vision adds additional overhead compared to HDR10<br>- Some HDR grades are more demanding than others<br><br>3. <strong>Source Quality</strong>:<br>- Digital intermediate resolution (2K vs 4K)<br>- Film scan quality and grain structure<br>- Original master&#39;s bit depth and color space<br><br>4. <strong>Scene Complexity</strong>:<br>- High motion scenes need more data<br>- Complex textures and patterns require higher bitrates<br>- Dark scenes with subtle gradients are particularly demanding</td>\n</tr>\n</tbody></table>\n<p>[^1]: Shen, Y. (2020). &quot;Bjontegaard Delta Rate Metric&quot;. Medium Innovation Labs Blog. <a href=\"https://medium.com/innovation-labs-blog/bjontegaard-delta-rate-metric-c8c82c1bc42c\">https://medium.com/innovation-labs-blog/bjontegaard-delta-rate-metric-c8c82c1bc42c</a><br>[^2]: Ling, N.; Antier, M.; Liu, Y.; Yang, X.; Li, Z. (2024). &quot;Video Quality Assessment: From FR to NR&quot;. Electronics, 13(5), 953. <a href=\"https://www.mdpi.com/2079-9292/13/5/953\">https://www.mdpi.com/2079-9292/13/5/953</a></p>\n",
    "slug": "eei",
    "category": "wiki",
    "navigation": [
      {
        "title": "What is a Compression Ratio?",
        "children": []
      },
      {
        "title": "Why Is This Important?",
        "children": []
      },
      {
        "title": "What Ratio is Best?",
        "children": []
      },
      {
        "title": "Why Set Maximum Ratios of 40% and 60%?",
        "children": [
          "1080p (40% Maximum)",
          "2160p (60% Maximum)"
        ]
      },
      {
        "title": "How Do We Apply This Index?",
        "children": []
      },
      {
        "title": "Example Rankings",
        "children": [
          {
            "title": "1080p Examples",
            "children": [
              "Example 1: Users prioritizing storage efficiency (10% target)",
              "Example 2: Users seeking balanced quality and size (25% target)"
            ]
          },
          {
            "title": "2160p Examples",
            "children": [
              "Example 3: Extreme Space Saving (20% target)",
              "Example 4: Balanced 4K (40% target)",
              "Example 5: Near Transparent Quality (60% target)"
            ]
          },
          "Frequently Asked Questions"
        ]
      }
    ]
  },
  {
    "path": "/wiki/faq",
    "type": "markdown",
    "frontmatter": {
      "title": "FAQ",
      "slug": "faq",
      "author": "santiagosayshey",
      "created": "2025-02-02T00:00:00.000Z",
      "tags": [
        "wiki",
        "faq"
      ],
      "blurb": "Frequently asked questions pertaining to Dictionarry / Profillar and all of its tooling."
    },
    "html": "<p>This entry is dedicated to providing answers to the most frequently asked questions about Dictionarry / Profilarr.</p>\n<table>\n<thead>\n<tr>\n<th>Question</th>\n<th>Answer</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>Why isn&#39;t the highest scored release being grabbed?</td>\n<td>You may have prefer propers and repacks on. This option forces releases with a proper / repack flag to be grabbed, even if it&#39;s Custom Format score is not the highest. To turn it off, navigate to Settings &gt; Media Management &gt; File Management and set Prefer Propers / Repacks to Do Not Prefer.</td>\n</tr>\n<tr>\n<td>What&#39;s the difference between h264, x264, AVC, h265, x265 and HEVC?</td>\n<td><strong>H.264 (AVC)</strong>: A video compression standard.<br><strong>x264</strong>: An open source encoder that produces H.264 videos.<br><strong>H.265 (HEVC)</strong>: A more advanced video compression standard than H.264, offering better compression and quality for 4K and higher resolutions.<br><strong>x265</strong>: An open source encoder that produces H.265 videos.<br><br><strong>Key Points</strong>:<br>- HEVC/AVC refers to the codec in general<br>- H.264/5 refers to a lossless rip (WEB-DL or remux)<br>- x264/5 refers to encoded content (WEBRip or Blu-ray encode)<br><br><em>Note: Many HEVC files are mislabeled, making it challenging to distinguish between lossless and lossy releases based on release names alone.</em></td>\n</tr>\n<tr>\n<td>What quality settings should I use?</td>\n<td>It&#39;s suggested that you should set everything to min / max since Profilarr uses custom formats to do the major selections. However you might run into the occasional sample download if you use lots of usenet indexers. If you do find that these are being grabbed, then you can set the minimum to be 1-2gb per hour for whatever quality you need it in.</td>\n</tr>\n<tr>\n<td>What does &quot;Transparency&quot; mean?</td>\n<td>Audiovisual transparency refers to the degree to which an encoded audio or video signal is indistinguishable from the original source signal. The term &quot;transparency&quot; stems from the idea that the encoding and decoding processes are imperceptible, as if the system were <em>transparent</em>.<br><br>- An audio codec with high transparency will produce an encoded signal that, when decoded, is identical to the original audio source, without any discernible differences in frequency response, dynamic range, or noise floor.<br><br>- A video codec exhibiting transparency will generate an encoded signal that, upon decoding, results in a picture that is visually indistinguishable from the source video in terms of resolution, color space, and pixel-level detail.<br><br>Objective metrics, such as <a href=\"https://en.wikipedia.org/wiki/Video_Multimethod_Assessment_Fusion\">VMAF (Video Multi-Method Assessment Fusion)</a>, are sometimes used to measure transparency by comparing the encoded signal to the original source and calculating a numerical score that quantifies the perceptual similarity between the two, with higher scores indicating greater transparency.</td>\n</tr>\n</tbody></table>\n",
    "slug": "faq",
    "category": "wiki",
    "navigation": []
  },
  {
    "path": "/wiki/gppi",
    "type": "markdown",
    "frontmatter": {
      "title": "Golden Popcorn Performance Index",
      "slug": "GPPi",
      "author": "santiagosayshey",
      "created": "2023-04-20T00:00:00.000Z",
      "tags": [
        "wiki",
        "quality",
        "encode"
      ],
      "blurb": "A data-driven metric that identifies high-quality release groups by analyzing their Golden Popcorn track record."
    },
    "html": "<h2 id=\"what-are-golden-popcorns\">What are Golden Popcorns?</h2>\n<p><strong><em>Golden Popcorns</em></strong> are <em>very high quality encodes</em>, marked as such by one of the best private torrent trackers. These releases are manually reviewed by a dedicated, experienced team of <em>Golden Popcorn</em> checkers. Golden Popcorns are the simplest way to quantify a subjective <em>best</em> encode.</p>\n<h2 id=\"the-decision-engine\">The Decision Engine</h2>\n<p>The Golden Popcorn Performance Index, or GPPI, is a calculated metric, pivotal to the <a href=\"../Profiles/1080p%20Transparent.md\">Transparent</a> profile&#39;s decision-making process. It&#39;s engineered to rank release groups based on their propensity to release a Golden Popcorn encode at any given resolution $r$.</p>\n<h2 id=\"formula\">Formula</h2>\n<p>On first glance, it seems the most obvious way to determine which release groups are most likely to release golden popcorns is to find their Golden Popcorn Ratio, i.e. The number of Golden Popcorns divided by the total number of encodes for any given resolution <em>r</em>.</p>\n<p>However, If we were to take Golden Popcorn ratio at face value, we might incorrectly prioritise a release group who has a high GP ratio, but a low number of encodes. On the opposite spectrum, if we take the raw number of Golden Popcorns for any group, we might incorrectly prioritise a group with a low GP ratio.</p>\n<p>So instead, we multiply the number of Golden Popcorns at resolution $r$ for a given release group, by a factor of said release group&#39;s Golden Popcorn Ratio. This essentially limits both metrics as a factor of each other.</p>\n<p>For any given resolution <em>r</em>, the GPPI is defined as:</p>\n<p>$$<br>\\begin{aligned}<br>\\text{GPPI}_r &amp;= GPE_r \\cdot \\left( \\frac{GPE_r}{E_r} \\right) \\<br>              &amp;= \\frac{GPE_r^2}{E_r}<br>\\end{aligned}<br>$$</p>\n<p>Where:</p>\n<ul>\n<li>$\\text{GPPI}_r$ is the Golden Popcorn Performance Index at resolution $r$</li>\n<li>$GPE_r$ is the number of Golden Popcorns at resolution $r$</li>\n<li>$E_r$ is the total number of encodes at resolution $r$</li>\n</ul>\n",
    "slug": "gppi",
    "category": "wiki",
    "navigation": [
      "What are Golden Popcorns?",
      "The Decision Engine",
      "Formula"
    ]
  },
  {
    "path": "/wiki/rgp",
    "type": "markdown",
    "frontmatter": {
      "title": "Release Group Philosophy",
      "slug": "RGP",
      "author": "santiagosayshey",
      "created": "2025-01-26T00:00:00.000Z",
      "tags": [
        "home",
        "wiki",
        "release_group",
        "philosophy"
      ],
      "blurb": "Explore Dictionarry's release group abstraction philosophy and what it actually means to simplify media automation."
    },
    "html": "<h2 id=\"so-how-does-dictionarry-_actually-simplify-media-automation_\">So, how does Dictionarry _actually simplify media automation?_</h2>\n<p>Well, first we need to understand that we&#39;re trying to <strong>automate the subjective analysis of how &quot;good&quot; a release is</strong>. To do that, we need to first define <strong>what &quot;good&quot; even means</strong>. To some people, it could mean how well something looks on their screen, or sounds through speakers; we define this as <em>quality</em>. To others, it means how many releases they can download while still maintaining some kind of quality standard; we define this as <em>efficiency</em>.</p>\n<p>So, that leads us to a new question - <em>how do we measure quality and efficiency</em>? You might think we&#39;d want to parse releases and find their technical properties; resolution, bitrate, video / audio codecs, hdr, etc.</p>\n<pre><code class=\"hljs\"><span class=\"hljs-attribute\">Release</span> <span class=\"hljs-number\">1</span> (<span class=\"hljs-number\">25</span>.<span class=\"hljs-number\">2</span> GiB): Blockbuster Movie A <span class=\"hljs-number\">2022</span> Hybrid <span class=\"hljs-number\">1080</span>p WEBRip DDPA5.<span class=\"hljs-number\">1</span> x264-group A\n\n<span class=\"hljs-attribute\">Release</span> <span class=\"hljs-number\">2</span> (<span class=\"hljs-number\">27</span>.<span class=\"hljs-number\">3</span> GiB): Blockbuster Movie A.<span class=\"hljs-number\">1080</span>p.WEBRip.DD+<span class=\"hljs-number\">7</span>.<span class=\"hljs-number\">1</span>.x264-group B\n</code></pre>\n<p>Looking at these two releases, you&#39;ll notice that they both have the EXACT same technical specification and would rank equally. But they&#39;re different sizes... so which is better? Using audio / video properties to measure quality / efficiency can be effective, but is largely <strong>limited by the information that they convey</strong>. You can&#39;t adequately answer which is better just by looking at these releases in isolation. So how do we not look at these releases in isolation? Or rather, how do we <em>extrapolate information that isn&#39;t already there?</em></p>\n<h3 id=\"group-tags\">Group Tags</h3>\n<p>Our answer lies in the little bit of information at the end of every release - it&#39;s <strong>group tag</strong>. Dictionarry tracks historic release group data in order to <strong>rank groups based on their propensity to reach quantifiable levels of quality and efficiency</strong>. We do this using two metrics:</p>\n<ol>\n<li>Golden Popcorn Performance Index (GPPi): How many golden popcorns a release group has, as a ratio of their total number of releases</li>\n<li>Encode Efficiency Index (EEi): The average size of a release group&#39;s encode compared to it&#39;s likely source.</li>\n</ol>\n<p>These metrics are <strong>evidence based, data driven and objective</strong>.</p>\n<h3 id=\"tldr\">TL;DR</h3>\n<p>TL;DR: Dictionarry <strong>simplifies media automation by prioritizing release groups that achieve quantifiable levels of quality and efficiency through objective measurement</strong>. These release group rankings are built and maintained as custom formats to be scored in their respective quality profiles. You can review these group rankings below.</p>\n",
    "slug": "rgp",
    "category": "wiki",
    "navigation": [
      {
        "title": "So, how does Dictionarry _actually simplify media automation?_",
        "children": [
          "Group Tags",
          "TL;DR"
        ]
      }
    ]
  },
  {
    "path": "/wiki/development",
    "type": "markdown",
    "frontmatter": {
      "title": "Development Setup",
      "slug": "development-setup",
      "author": "santiagosayshey",
      "created": "2025-03-19T00:00:00.000Z",
      "tags": [
        "home",
        "wiki",
        "setup",
        "install",
        "develop"
      ],
      "blurb": "Comprehensive guide for setting up Profilarr for database development"
    },
    "html": "<p>Profilarr functions as both a synchronization tool for end users and a complete development platform for developers. While most users will simply connect to existing databases to receive updates, Profilarr&#39;s development capabilities allow for creating, testing, and contributing custom media configurations back to the community through its Git integration.</p>\n<h2 id=\"setting-up-your-database-repository\">Setting Up Your Database Repository</h2>\n<p>To use Profilarr&#39;s development features, you&#39;ll need a GitHub repository for your database. You have two options:</p>\n<h3 id=\"option-1-fork-a-psf-database\">Option 1: Fork a PSF Database</h3>\n<ol>\n<li>Go to <a href=\"https://github.com/Dictionarry-Hub/database\">https://github.com/Dictionarry-Hub/database</a> (or any other Profilarr Standard Format Database)</li>\n<li>Click the &quot;Fork&quot; button in the top-right corner</li>\n<li>Follow the prompts to complete the fork process</li>\n<li>Your forked repository will now be ready to use with Profilarr</li>\n</ol>\n<h3 id=\"option-2-create-a-new-database-repository\">Option 2: Create a New Database Repository</h3>\n<ol>\n<li>Click the &quot;+&quot; in the top-right corner and select &quot;New repository&quot;</li>\n<li>Give your repository a name (like &quot;profilarr-database&quot;)</li>\n<li>Set visibility to public or private as needed (it needs to be public if you intend to share it)</li>\n<li>Click &quot;Create repository&quot;</li>\n<li>Clone the repository to your local machine</li>\n<li>Create three folders: <code>custom_formats</code>, <code>regex_patterns</code>, and <code>profiles</code></li>\n<li>Add a <code>.gitkeep</code> file in each folder (this empty file is necessary to ensure Git tracks these folders; otherwise, they won’t be included in the repository, which may cause errors in Profilarr)</li>\n<li>Commit and push these changes to your repository</li>\n</ol>\n<h2 id=\"development-configuration\">Development Configuration</h2>\n<h3 id=\"generate-a-github-personal-access-token-pat\">Generate a GitHub Personal Access Token (PAT)</h3>\n<p>To allow Profilarr to connect and push to your remote database, you&#39;ll need to generate a GitHub Personal Access Token (PAT). This token gives Profilarr permission to access and update your GitHub repository.</p>\n<ol>\n<li>Sign in to your GitHub account</li>\n<li>Go to Settings &gt; Developer settings &gt; Personal access tokens</li>\n<li>Click &quot;Generate new token&quot;</li>\n<li>Choose <strong>Fine-grained</strong></li>\n<li>Give your token a descriptive name (e.g., &quot;Profilarr Development&quot;)</li>\n<li>Apply the following permissions:<ul>\n<li><strong>Repository access:</strong> Select your database repository</li>\n<li><strong>Permissions:</strong> Set <code>contents</code> and <code>metadata</code> to <strong>Read &amp; Write</strong></li>\n</ul>\n</li>\n<li>Click &quot;Generate token&quot;</li>\n<li>Copy your new token (make sure to save it somewhere safe, as you won’t be able to see it again)</li>\n</ol>\n<h3 id=\"configure-your-user-information\">Configure Your User Information</h3>\n<p>You&#39;ll also need to provide a username and email for Git. These will be associated with any commits you make to the database:</p>\n<ul>\n<li><strong>Username</strong>: This will appear in commit logs and will be visible to other contributors</li>\n<li><strong>Email</strong>: This will be used for Git commits and may be visible in public repositories</li>\n</ul>\n<h3 id=\"create-an-environment-file\">Create an Environment File</h3>\n<p>Create a <code>.env</code> file with the following information. This is required for database contributions:</p>\n<pre><code class=\"hljs\"><span class=\"hljs-attr\">GIT_USER_NAME</span>=your_username\n<span class=\"hljs-attr\">GIT_USER_EMAIL</span>=your_email\n<span class=\"hljs-attr\">PROFILARR_PAT</span>=your_github_pat\n</code></pre>\n<p>⚠ <strong>Security Note:</strong> Avoid committing <code>.env</code> files containing secrets to public repositories. If working on a shared system, store credentials in a separate <code>.env.local</code> file or configure them directly in Docker. To ensure these files are ignored by Git, add the following entry to your <code>.gitignore</code> file:</p>\n<pre><code class=\"hljs\"><span class=\"hljs-selector-class\">.env</span>\n<span class=\"hljs-selector-class\">.env</span><span class=\"hljs-selector-class\">.local</span>\n</code></pre>\n<h2 id=\"setup\">Setup</h2>\n<p>With your credentials configured, you can now deploy Profilarr for development.</p>\n<h3 id=\"docker-compose-recommended\">Docker Compose (recommended)</h3>\n<pre><code class=\"hljs language-yaml\"><span class=\"hljs-attr\">services:</span>\n  <span class=\"hljs-attr\">profilarr:</span>\n    <span class=\"hljs-attr\">image:</span> <span class=\"hljs-string\">santiagosayshey/profilarr:latest</span> <span class=\"hljs-comment\"># or :beta for pre-release versions</span>\n    <span class=\"hljs-attr\">container_name:</span> <span class=\"hljs-string\">profilarr</span>\n    <span class=\"hljs-attr\">ports:</span>\n      <span class=\"hljs-bullet\">-</span> <span class=\"hljs-number\">6868</span><span class=\"hljs-string\">:6868</span>\n    <span class=\"hljs-attr\">volumes:</span>\n      <span class=\"hljs-bullet\">-</span> <span class=\"hljs-string\">/path/to/your/data:/config</span>\n    <span class=\"hljs-attr\">environment:</span>\n      <span class=\"hljs-bullet\">-</span> <span class=\"hljs-string\">TZ=UTC</span> <span class=\"hljs-comment\"># Set your timezone</span>\n    <span class=\"hljs-attr\">env_file:</span>\n      <span class=\"hljs-bullet\">-</span> <span class=\"hljs-string\">.env</span> <span class=\"hljs-comment\"># Required for database contributions</span>\n    <span class=\"hljs-attr\">restart:</span> <span class=\"hljs-string\">unless-stopped</span>\n</code></pre>\n<h3 id=\"docker-cli\">Docker CLI</h3>\n<pre><code class=\"hljs language-bash\">docker run -d \\\n  --name=profilarr \\\n  -p 6868:6868 \\\n  -v /path/to/your/data:/config \\\n  -e TZ=UTC \\\n  --env-file .<span class=\"hljs-built_in\">env</span> \\\n  --restart unless-stopped \\\n  santiagosayshey/profilarr:latest <span class=\"hljs-comment\"># or :beta for pre-release versions</span>\n</code></pre>\n<h3 id=\"unraid\">Unraid</h3>\n<p>For Unraid users, the Profilarr Community App includes placeholders for required environment variables. To enable development mode, you must replace these placeholders with your actual credentials:</p>\n<ul>\n<li><code>GIT_USER_NAME</code></li>\n<li><code>GIT_USER_EMAIL</code></li>\n<li><code>PROFILARR_PAT</code></li>\n</ul>\n<h2 id=\"verification\">Verification</h2>\n<p>To confirm that everything is set up correctly, check the startup logs for Git user initialization. The logs should include entries similar to the following:</p>\n<pre><code class=\"hljs\"><span class=\"hljs-attribute\">profilarr</span>   | <span class=\"hljs-number\">2025</span>-<span class=\"hljs-number\">03</span>-<span class=\"hljs-number\">18</span> <span class=\"hljs-number\">20</span>:<span class=\"hljs-number\">08</span>:<span class=\"hljs-number\">35</span> - app.init - INFO - Initializing Git user\n<span class=\"hljs-attribute\">profilarr</span>   | <span class=\"hljs-number\">2025</span>-<span class=\"hljs-number\">03</span>-<span class=\"hljs-number\">18</span> <span class=\"hljs-number\">20</span>:<span class=\"hljs-number\">08</span>:<span class=\"hljs-number\">35</span> - app.init - INFO - Configuring Git user\n<span class=\"hljs-attribute\">profilarr</span>   | <span class=\"hljs-number\">2025</span>-<span class=\"hljs-number\">03</span>-<span class=\"hljs-number\">18</span> <span class=\"hljs-number\">20</span>:<span class=\"hljs-number\">08</span>:<span class=\"hljs-number\">35</span> - app.init - DEBUG - Retrieved Git config: Name - santiagosayshey, Email - user@example.com\n<span class=\"hljs-attribute\">profilarr</span>   | <span class=\"hljs-number\">2025</span>-<span class=\"hljs-number\">03</span>-<span class=\"hljs-number\">18</span> <span class=\"hljs-number\">20</span>:<span class=\"hljs-number\">08</span>:<span class=\"hljs-number\">35</span> - app.db.queries.settings - DEBUG - PAT status verified\n<span class=\"hljs-attribute\">profilarr</span>   | <span class=\"hljs-number\">2025</span>-<span class=\"hljs-number\">03</span>-<span class=\"hljs-number\">18</span> <span class=\"hljs-number\">20</span>:<span class=\"hljs-number\">08</span>:<span class=\"hljs-number\">35</span> - app.init - INFO - Git user configuration completed\n<span class=\"hljs-attribute\">profilarr</span>   | <span class=\"hljs-number\">2025</span>-<span class=\"hljs-number\">03</span>-<span class=\"hljs-number\">18</span> <span class=\"hljs-number\">20</span>:<span class=\"hljs-number\">08</span>:<span class=\"hljs-number\">35</span> - app.init - INFO - Git user initialized successfully\n</code></pre>\n<h2 id=\"troubleshooting\">Troubleshooting</h2>\n<p>If you encounter issues with your development setup:</p>\n<table>\n<thead>\n<tr>\n<th>Issue</th>\n<th>Possible Solution</th>\n</tr>\n</thead>\n<tbody><tr>\n<td><strong>GitHub token not working</strong></td>\n<td>Verify your PAT has <code>contents</code> and <code>metadata</code> read/write permissions</td>\n</tr>\n<tr>\n<td><strong>Profilarr fails to access the repository</strong></td>\n<td>Ensure your repository is public (or your token has access to private repositories)</td>\n</tr>\n<tr>\n<td><strong>Git username/email not recognized</strong></td>\n<td>Run <code>git config --global user.name</code> and <code>git config --global user.email</code> to verify</td>\n</tr>\n<tr>\n<td><strong>Cannot push to repository</strong></td>\n<td>Ensure your container has network access to GitHub (try <code>ping github.com</code>)</td>\n</tr>\n<tr>\n<td><strong>Updated <code>.env</code> not applied</strong></td>\n<td>Remove and recreate the container to reload environment variables</td>\n</tr>\n</tbody></table>\n<p>For additional help or to contribute to Profilarr, join our community on <a href=\"https://github.com/santiagosayshey/profilarr\">GitHub</a> or <a href=\"https://discord.gg/Y9TYP6jeYZ\">Discord</a>.</p>\n<h2 id=\"contributing-to-databases\">Contributing to Databases</h2>\n<ol>\n<li><p><strong>Link Your Fork in Profilarr</strong></p>\n<ul>\n<li>Open Profilarr and navigate to the database settings.</li>\n<li>Enter the GitHub repository URL of your forked database.</li>\n</ul>\n</li>\n<li><p><strong>Make Changes in Profilarr</strong></p>\n<ul>\n<li>Use Profilarr&#39;s built-in tools to modify or add database entries.</li>\n<li>Profilarr will handle formatting and validation automatically.</li>\n</ul>\n</li>\n<li><p><strong>Commit and Push Changes</strong></p>\n<ul>\n<li>Profilarr provides actions to <strong>revert, stage, commit, and push</strong> changes.</li>\n<li>After making changes, stage them using the <strong>Stage</strong> button.</li>\n<li>Once staged, commit the changes with a commit message.</li>\n<li>Finally, use the <strong>Push</strong> button to send your changes to your GitHub fork.</li>\n<li>Roll back any unwanted changes using the <strong>Revert</strong> button.</li>\n</ul>\n</li>\n<li><p><strong>Create a Pull Request (PR)</strong></p>\n<ul>\n<li>Go to your fork on GitHub and navigate to the &quot;Pull Requests&quot; tab.</li>\n<li>Click &quot;New pull request&quot; and select your fork and branch.</li>\n<li>Provide a clear description of the changes and submit the PR.</li>\n<li>Wait for review and approval before merging.</li>\n</ul>\n</li>\n</ol>\n<h3 id=\"editing-databases-directly\">⚠ Editing Databases Directly</h3>\n<p>While it&#39;s possible to edit database files manually in an IDE or on GitHub, this is not recommended unless you fully understand Profilarr’s formatting and validation rules. Profilarr enforces constraints to ensure data integrity, and bypassing these safeguards can lead to:</p>\n<ul>\n<li>Corrupted or invalid files that Profilarr cannot process correctly.</li>\n<li>Unexpected behavior when syncing with Profilarr.</li>\n<li>Inconsistent formatting, leading to rejected updates.</li>\n</ul>\n<p>To make modifications, it&#39;s strongly advised to use Profilarr’s built-in editing tools whenever possible. If direct edits are necessary, always validate the changes in a local instance of Profilarr before pushing them to the repository.</p>\n",
    "slug": "development",
    "category": "wiki",
    "navigation": [
      {
        "title": "Setting Up Your Database Repository",
        "children": [
          "Option 1: Fork a PSF Database",
          "Option 2: Create a New Database Repository"
        ]
      },
      {
        "title": "Development Configuration",
        "children": [
          "Generate a GitHub Personal Access Token (PAT)",
          "Configure Your User Information",
          "Create an Environment File"
        ]
      },
      {
        "title": "Setup",
        "children": [
          "Docker Compose (recommended)",
          "Docker CLI",
          "Unraid"
        ]
      },
      {
        "title": "Verification",
        "children": []
      },
      {
        "title": "Troubleshooting",
        "children": []
      },
      {
        "title": "Contributing to Databases",
        "children": [
          "⚠ Editing Databases Directly"
        ]
      }
    ]
  },
  {
    "path": "/wiki/edition",
    "type": "markdown",
    "frontmatter": {
      "title": "Edition Philosophy",
      "slug": "edtion-philosophy",
      "author": "santiagosayshey",
      "created": "2025-02-26T00:00:00.000Z",
      "tags": [
        "wiki",
        "edition",
        "extras"
      ],
      "blurb": "A comparison of theatrical vs. special edition cuts and which movies benefit from each format."
    },
    "html": "<p>By default, Dictionarry&#39;s profiles prefer the <a href=\"https://dictionarry.dev/formats/special-edition\">&#39;Special&#39; Edition</a> of each movie. This is because these editions are often considered the more &#39;definitive&#39; version of the movie because they contain the director&#39;s complete creative vision without studio interference or runtime constraints, and are often recommended over their theatrical counterparts.</p>\n<table>\n<thead>\n<tr>\n<th>Movie</th>\n<th>Preferred Version</th>\n<th>Reasons</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>Aliens (1986)</td>\n<td>Special</td>\n<td>James Cameron&#39;s Special Edition enhances the film with crucial character development, particularly the scenes about Ripley&#39;s daughter which add emotional depth to her relationship with Newt. While the theatrical cut has tighter pacing, the added content like the sentry gun sequences adds valuable world-building and tension. The colony scenes provide important context that enriches rather than spoils the story.</td>\n</tr>\n<tr>\n<td>Blade Runner (1982)</td>\n<td>Final Cut</td>\n<td>The Final Cut (2007) is considered the definitive version over theatrical, workprint, and Director&#39;s Cut releases. It removes the theatrical&#39;s controversial voice-over narration and &quot;happy ending&quot; that were studio-mandated and disliked by cast and crew. It preserves the original&#39;s ambiguous ending about Deckard&#39;s nature while fixing numerous continuity errors and technical issues. Key improvements include: cleaned up wire removal in spinner scenes, fixed lip sync in Zhora&#39;s death scene, digital correction of the obvious stunt double&#39;s face, properly matching the number of replicants mentioned to those shown, correction of the dove release scene&#39;s obvious day-for-night shooting, improved color timing that better matches Jordan Cronenweth&#39;s original cinematography, and restoration of the full unicorn dream sequence that better supports the film&#39;s central mysteries. While some defend elements of other versions (particularly the 1992 Director&#39;s Cut), the Final Cut represents Ridley Scott&#39;s complete creative vision with modern technical capabilities to properly realize it.</td>\n</tr>\n<tr>\n<td>The Lord of the Rings Trilogy (2001-2003)</td>\n<td>Extended Editions</td>\n<td>Each film&#39;s Extended Edition adds crucial character development, world-building and plot points that enrich the story: Fellowship adds the gift-giving scene and more Lothlorien. Two Towers expands Boromir/Faramir&#39;s backstory, adds Theodred&#39;s funeral for deeper Rohan culture. Return of the King adds the Witch King destroying Gandalf&#39;s staff, Saruman&#39;s fate, and House of Healing. The additional 30-50 minutes per film are so seamlessly integrated that many fans consider these the definitive versions.</td>\n</tr>\n<tr>\n<td>Batman v Superman: Dawn of Justice (2016)</td>\n<td>Ultimate Edition</td>\n<td>The 3-hour cut restores crucial plot threads that explain character motivations and fill plot holes. Added scenes show Superman actually helping people, Lex&#39;s manipulation of both heroes, and clearer reasons for the African incident blamed on Superman. The extended cut makes the story more coherent while better developing both protagonists&#39; perspectives.</td>\n</tr>\n<tr>\n<td>The Abyss (1989)</td>\n<td>Special Edition</td>\n<td>The extended version restores a crucial tidal wave sequence that better explains the aliens&#39; motivations and adds a stronger environmental message to the ending. Additional scenes provide more context for the NTIs (non-terrestrial intelligence) and their purpose, while expanding character relationships. Most notably, the restored ending gives the film a more impactful and complete conclusion that Cameron originally intended.</td>\n</tr>\n<tr>\n<td>Midsommar (2019)</td>\n<td>Director&#39;s Cut</td>\n<td>The 171-minute version adds key scenes that provide deeper insight into the relationship dynamics, particularly Christian&#39;s gaslighting of Dani. Additional folk-horror rituals and customs make the Hårga community feel more developed and their practices more grounded. The added character moments make the emotional climax more impactful.</td>\n</tr>\n<tr>\n<td>I Am Legend (2007)</td>\n<td>Alternate Version</td>\n<td>This version&#39;s different ending completely changes the meaning of the title and stays truer to Richard Matheson&#39;s novel. Instead of Smith&#39;s character killing himself to stop the creatures, he realizes they are actually intelligent beings protecting their own, making him the monster of their legends - their &quot;legend.&quot; This ending better serves the film&#39;s themes about humanity and perspective.</td>\n</tr>\n<tr>\n<td>Watchmen (2009)</td>\n<td>Director&#39;s Cut</td>\n<td>The 186-minute version adds essential character depth and crucial plot elements from the graphic novel, including more of Hollis Mason and his death scene. The extended cut better develops the complexity of the alternate 1985 setting and the moral ambiguity of its characters. The Ultimate Cut, which adds the Tales of the Black Freighter animation, is considered by some fans to be even more complete, though the Director&#39;s Cut is the most widely preferred version.</td>\n</tr>\n<tr>\n<td>Superman II (1980/2006)</td>\n<td>The Richard Donner Cut</td>\n<td>Released 26 years after the theatrical version, Donner&#39;s cut restores his original vision before he was replaced by Richard Lester. It removes the slapstick comedy, restores Marlon Brando&#39;s scenes as Jor-El, and features a different ending that ties better to the first film. The more serious tone and stronger character development make it the preferred version for most fans.</td>\n</tr>\n</tbody></table>\n<p>However, while special editions often expand and enrich films, theatrical versions have their own merits that many cinephiles and critics prefer. Theatrical cuts typically offer tighter pacing, maintain the mystery of intentional ambiguity, and preserve the historical significance of films as they were originally experienced by audiences. Here&#39;s why some prefer theatrical versions:</p>\n<table>\n<thead>\n<tr>\n<th>Movie</th>\n<th>Preferred Version</th>\n<th>Key Reasons</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>Terminator 2: Judgment Day (1991)</td>\n<td>Theatrical</td>\n<td>The theatrical cut is nearly perfect in pacing and storytelling. The extended cut&#39;s additional scenes (like T-1000 glitching after freezing, John reprogramming the T-800) are interesting but unnecessary. The theatrical version maintains better tension and momentum. Most notably, the &quot;happy ending&quot; playground scene in the theatrical cut is preferred to the extended cut&#39;s darker alternate ending.</td>\n</tr>\n<tr>\n<td>Alien (1979)</td>\n<td>Theatrical</td>\n<td>The theatrical version is considered a masterpiece of pacing. The Director&#39;s Cut adds scenes that, while interesting (like Ripley finding Dallas in the cocoon), actually harm the rapid-fire tension of the final act. Scott himself has stated he prefers the theatrical cut.</td>\n</tr>\n<tr>\n<td>Star Wars (1977)</td>\n<td>Theatrical</td>\n<td>The original theatrical cut is considered more pure and less cluttered than later &quot;Special Editions&quot;. Fans particularly dislike added CGI elements and the infamous &quot;Han shot first&quot; change. The pacing of the theatrical cut is also tighter.</td>\n</tr>\n<tr>\n<td>The Empire Strikes Back (1980)</td>\n<td>Theatrical</td>\n<td>Like A New Hope, fans strongly prefer the unaltered theatrical version. The Special Edition&#39;s added CGI and altered effects (like the Emperor hologram replacement, added windows in Cloud City) are considered unnecessary changes to a perfect film. The original practical effects and cinematography are considered superior.</td>\n</tr>\n<tr>\n<td>Return of the Jedi (1983)</td>\n<td>Theatrical</td>\n<td>The theatrical version is preferred over the Special Edition&#39;s controversial additions, particularly the changed ending music and added CGI celebration scenes. The &quot;Jedi Rocks&quot; musical number in Jabba&#39;s Palace is one of the most criticized Special Edition changes. The original Ewok celebration song &quot;Yub Nub&quot; is often preferred to the new ending.</td>\n</tr>\n<tr>\n<td>Apocalypse Now (1979)</td>\n<td>Theatrical</td>\n<td>While Redux (2001) and the Final Cut add interesting material, many feel the additions (especially the French plantation sequence) harm the pacing and dilute the core narrative. The theatrical cut maintains better tension and forward momentum.</td>\n</tr>\n<tr>\n<td>The Exorcist (1973)</td>\n<td>Theatrical</td>\n<td>&quot;The Version You&#39;ve Never Seen&quot; adds the famous &quot;spider walk&quot; scene and several other moments, but the theatrical cut&#39;s pacing is superior. The original version better maintains its sense of building dread.</td>\n</tr>\n<tr>\n<td>Donnie Darko (2001)</td>\n<td>Theatrical</td>\n<td>The Director&#39;s Cut over-explains the film&#39;s mythology through added scenes and graphics, removing much of the mystery that made the original so compelling. The theatrical cut&#39;s ambiguity encourages viewer interpretation.</td>\n</tr>\n<tr>\n<td>Amadeus (1984)</td>\n<td>Theatrical</td>\n<td>The theatrical cut maintains better pacing and tighter focus on the central Salieri-Mozart conflict. Director&#39;s Cut adds 20 minutes of historical context and servant relationships that, while interesting, don&#39;t enhance the core psychological drama. The theatrical version better preserves the opera-like structure of the narrative.</td>\n</tr>\n<tr>\n<td>Payback (1999)</td>\n<td>Theatrical</td>\n<td>The theatrical version&#39;s blue-tinted color scheme better fits the neo-noir tone. The original ending with Kris Kristofferson provides a more satisfying conclusion than the Director&#39;s Cut (&quot;Straight Up&quot; version&quot;). Mel Gibson&#39;s voice-over is more engaging, and the slightly lighter tone makes Porter more sympathetic while maintaining the film&#39;s edge. Despite extensive studio interference, the theatrical cut became more commercially and critically successful.</td>\n</tr>\n<tr>\n<td>Almost Famous (2000)</td>\n<td>Theatrical</td>\n<td>While the &quot;Untitled: The Bootleg Cut&quot; adds interesting character moments and music scenes, the theatrical cut&#39;s tighter 122-minute runtime provides better pacing and more focused storytelling. Cameron Crowe&#39;s theatrical version better captures the whirlwind feeling of being on tour, while the 40 extra minutes in the extended cut, though enjoyable for fans, can make the journey feel too leisurely.</td>\n</tr>\n</tbody></table>\n<p>A <a href=\"https://dictionarry.dev/formats/special-edition-(unwanted)\">Custom Format: Special Edition (Unwanted)</a> has been created to negate special editions for these specific movies, but does not yet work due to radarr/sonarr&#39;s parsing of release titles. The parsed &#39;Title&#39; is removed from the release title, so you can&#39;t actually identify movies from custom formats (yet). Once this becomes possible, a single profile will be able to selectively prefer theatrical releases over special ones.</p>\n<p>To mimic this behaviour in the current system, you have to copy the profile you want to use and set it&#39;s <code>Special Edition</code> score to the negative of whatever it was. Then apply the profile to whatever movie you want in it&#39;s theatrical version.</p>\n",
    "slug": "edition",
    "category": "wiki",
    "navigation": []
  },
  {
    "path": "/",
    "type": "markdown",
    "frontmatter": {
      "title": "home",
      "slug": "home",
      "author": "santiagosayshey",
      "created": "2025-01-21T00:00:00.000Z",
      "tags": [
        "home",
        "wiki"
      ]
    },
    "html": "<h1 id=\"hey\">👋 Hey!</h1>\n<p>Welcome to Dictionarry! This project aims to wiki-fy and <strong>simplify media automation</strong> in Radarr / Sonarr through extensive, data driven documentation, custom formats and quality profiles.</p>\n<h2 id=\"motivation\">💡 Motivation</h2>\n<p>Navigating the world of media automation and coming across quality terms like &quot;Remux&quot;, or &quot;HEVC&quot; or &quot;Dolby Vision&quot; can be quite daunting when all you want to do is setup a media server to watch some content. It often <strong>feels like you need a masters in audio / video just to grab the latest blockbuster.</strong> Dictionarry aims not to explain these concepts in detail, but <strong>abstract them into more approachable ideas</strong> that don&#39;t require extensive knowledge or experience.</p>\n<p>Dictionarry leverages two key features of Radarr and Sonarr to simplify media automation:</p>\n<ol>\n<li><p>Custom Formats - Think of these as smart filters that scan release titles for specific patterns. They help <strong>identify important characteristics</strong> of your media, such as:</p>\n<ul>\n<li>Video quality (4K, HDR, Dolby Vision)</li>\n<li>Audio formats (Atmos, DTS, TrueHD)</li>\n<li>Source types (Remux, Web-DL, Blu-ray)</li>\n<li>Potential issues (upscaled content, poor encodes)</li>\n</ul>\n</li>\n<li><p>Quality Profiles - These act like a scoring system that <strong>ranks releases</strong> based on their Custom Format matches. You can:</p>\n<ul>\n<li>Prioritize what matters most to you</li>\n<li>Automatically upgrade to better versions</li>\n<li>Avoid problematic releases</li>\n</ul>\n</li>\n</ol>\n<p>Think of Dictionarry as your personal car-buying expert: Instead of researching every technical specification and test-driving dozens of vehicles, you get access to a curated showroom of pre-vetted options that match what you&#39;re looking for. Whether you want:</p>\n<ul>\n<li>2160p Remux - <strong>Maximum Quality</strong> 4K HDR remuxes with lossless audio and Dolby Vision</li>\n<li>2160p Quality - <strong>Transparent 4K</strong> HDR encodes selected using the Encode Efficiency Index</li>\n<li>1080p Quality - <strong>Transparent 1080p</strong> encodes optimized using the Golden Popcorn Performance Index</li>\n<li>1080p Efficient - <strong>Efficient x265 1080p</strong> Encodes optimized to save space using the Encode Efficiency Index</li>\n</ul>\n<p><img src=\"https://i.imgur.com/nZQzN9I.png\" alt=\"Profile Preview\"></p>\n<p>Dictionarry&#39;s database of tested profiles and formats handles the technical decisions for you.</p>\n<h2 id=\"profilarr\">⚙️ Profilarr</h2>\n<p>The database by itself does nothing. Custom Formats and Quality Profiles <strong>need to be imported</strong> and configured in your individual arr installations. Rather than leaving you to manually create everything yourself based on our guides, we&#39;ve created <strong>Profilarr</strong> to automate this process.</p>\n<p>Profilarr is a <strong>configuration management tool</strong> for Radarr and Sonarr that can interface with <strong>ANY remote configuration database</strong> (not just Dictionarry&#39;s!). It automatically:</p>\n<ul>\n<li><strong>Pulls</strong> new updates from your chosen database</li>\n<li><strong>Compiles</strong> the database format into specific arr formats</li>\n<li><strong>Imports</strong> them to your arr installations</li>\n<li>Manages version control of your configurations</li>\n</ul>\n<p>Built on top of git, Profilarr treats your configurations like code, allowing you to:</p>\n<ul>\n<li>Track changes over time</li>\n<li>Maintain your own customizations while still receiving database updates</li>\n<li>Resolve conflicts between local / remote changes when they arise</li>\n</ul>\n<p>The architecture was specifically built like this to <strong>put user choice first</strong>. We believe that:</p>\n<ul>\n<li><strong>Your media setup should reflect your needs, not our opinions</strong></li>\n<li>Updates should enhance your configuration, not override it</li>\n<li>Different users have different requirements (storage constraints, hardware capabilities, quality preferences)</li>\n<li>The ability to customize should never be sacrificed for convenience</li>\n</ul>\n<p>Profilarr empowers you to use Dictionarry&#39;s database (or anyone elses!) as a foundation while maintaining the freedom to adapt it to your specific needs.</p>\n<h2 id=\"development-notice\">🔨 Development Notice</h2>\n<p>Profilarr 1.0.0 is out now in open beta! <a href=\"https://dictionarry.dev/wiki/profilarr-setup\">https://dictionarry.dev/wiki/profilarr-setup</a></p>\n",
    "slug": "home",
    "category": "wiki",
    "navigation": [
      {
        "title": "👋 Hey!",
        "children": [
          "💡 Motivation",
          "⚙️ Profilarr",
          "🔨 Development Notice"
        ]
      }
    ]
  },
  {
    "path": "/wiki/profilarr-casaos",
    "type": "markdown",
    "frontmatter": {
      "title": "Casa OS - Profilarr Installation Guide",
      "slug": "profilarr-casaos",
      "author": "lawgics",
      "created": "2025-02-26T00:00:00.000Z",
      "tags": [
        "wiki",
        "casaos",
        "installation",
        "profilarr",
        "docker",
        "containers"
      ],
      "blurb": "A simple guide to install Profilarr in Casa OS as a custom app."
    },
    "html": "<p>This guide will walk you through the process of installing Profilarr as a custom app in Casa OS.</p>\n<h2 id=\"prerequisites\">Prerequisites</h2>\n<ul>\n<li>A working Casa OS installation (this guide uses v0.4.15).</li>\n<li>Basic knowledge of using the Casa OS interface.</li>\n<li>Access to <a href=\"https://github.com/Dictionarry-Hub/Profilarr\">https://github.com/Dictionarry-Hub/Profilarr</a> for install file.</li>\n</ul>\n<h2 id=\"step-by-step-installation\">Step-by-Step Installation</h2>\n<ol>\n<li><strong>Add a Custom App to Casa OS:</strong><ul>\n<li>Open your web browser and navigate to your Casa OS dashboard.</li>\n<li>Find and click on the &quot;+&quot; icon in the top right corner of the App section.</li>\n<li>Select “Install a customized app”</li>\n<li>Select “Import” in the top right corner of the Settings page</li>\n</ul>\n</li>\n<li><strong>Import Docker Compose File:</strong><ul>\n<li>Navigate to <a href=\"https://github.com/Dictionarry-Hub/Profilarr\">https://github.com/Dictionarry-Hub/Profilarr</a></li>\n<li>Scroll down to the “Installation” section</li>\n<li>You will see a **Docker Compose (recommended) **code block</li>\n<li>Copy the Docker Compose file code</li>\n<li>Navigate back to Casa OS to the Import Docker Compose page and paste the code into the empty text box<ul>\n<li>Note: if you are not contributing to a database, delete the following section or Casa OS will throw an error that the file is missing:<ul>\n<li><code>env_file:</code></li>\n<li><code>- .env # Optional: Only needed if contributing to a database</code></li>\n</ul>\n</li>\n</ul>\n</li>\n<li>Click on “Submit” and click “OK” to the warning</li>\n</ul>\n</li>\n<li><strong>Profilarr App Details:</strong><ul>\n<li>You can leave most settings as default unless you have a specific reason to change them, like customizing to your network/system (Network, Port, Volumes, etc..) otherwise just change your Time Zone in Environmental Variables</li>\n<li><strong>Name:</strong> “Profilarr” - but you can change it if you want</li>\n<li><strong>Icon:</strong> (Optional) You can upload an icon for the app.</li>\n<li><strong>Web UI:</strong> Should be your host device IP address</li>\n<li><strong>Network:</strong> Should be bridge</li>\n<li><strong>Port:</strong> Should be 6868 TCP</li>\n<li><strong>Volumes:</strong> Leave this as default unless you want to change the host path to a specific location</li>\n<li><strong>Environment Variables:</strong> (Only TZ is required, the others are optional)<ul>\n<li>TZ = Your Timezone (e.g., America/New_York)</li>\n<li>GIT_USER_NAME = GitHub username for contributing</li>\n<li>GIT_USER_EMAIL = GitHub email for contributing</li>\n<li>PROFILARR_PAT = GitHub Personal Access Token for contributing</li>\n</ul>\n</li>\n</ul>\n</li>\n<li><strong>Install the App:</strong><ul>\n<li>Once you&#39;ve filled in all the necessary details, click on the &quot;Install&quot; button.</li>\n</ul>\n</li>\n<li><strong>Wait for Installation:</strong><ul>\n<li>Casa OS will now download and install the app. This might take a few minutes.</li>\n</ul>\n</li>\n<li><strong>Access Profilarr:</strong><ul>\n<li>After installation is complete, you should be able to find Profilarr on your Casa OS dashboard. Click on it to launch the app.</li>\n</ul>\n</li>\n</ol>\n",
    "slug": "profilarr-casaos",
    "category": "wiki",
    "navigation": [
      "Prerequisites",
      "Step-by-Step Installation"
    ]
  },
  {
    "path": "/wiki/profilarr-setup",
    "type": "markdown",
    "frontmatter": {
      "title": "Profilarr Setup",
      "slug": "profilarr-setup",
      "author": "santiagosayshey",
      "created": "2025-03-01T00:00:00.000Z",
      "tags": [
        "home",
        "wiki",
        "setup",
        "install"
      ],
      "blurb": "Comprehensive setup and usage guide for Profilarr."
    },
    "html": "<p>Profilarr is a <strong>custom format / quality profile management tool</strong> that acts as a middleman between a configuration database and your radarr/sonarr installations. It automatically:</p>\n<ul>\n<li><strong>Pulls</strong> new updates from your chosen database</li>\n<li><strong>Compiles</strong> the database format into specific arr formats</li>\n<li><strong>Imports</strong> them to your arr installations</li>\n<li>Manages <strong>version control</strong> of your configurations</li>\n</ul>\n<h2 id=\"installation\">Installation</h2>\n<p>Profilarr follows the GitFlow workflow for development:</p>\n<ul>\n<li>New features are first merged into the <code>develop</code> branch for testing</li>\n<li>Once stable, these features move to the <code>main</code> branch</li>\n<li>For early access to new features, use <code>santiagosayshey/profilarr:beta</code></li>\n<li>For stable use, use <code>santiagosayshey/profilarr:latest</code></li>\n</ul>\n<p>Once installed, you can visit the web UI at <code>http://[address]:6868</code> and begin the setup process.</p>\n<h3 id=\"docker\">Docker</h3>\n<h4 id=\"docker-compose-recommended\">Docker Compose (recommended)</h4>\n<pre><code class=\"hljs language-yaml\"><span class=\"hljs-attr\">services:</span>\n  <span class=\"hljs-attr\">profilarr:</span>\n    <span class=\"hljs-attr\">image:</span> <span class=\"hljs-string\">santiagosayshey/profilarr:latest</span> <span class=\"hljs-comment\"># or :beta</span>\n    <span class=\"hljs-attr\">container_name:</span> <span class=\"hljs-string\">profilarr</span>\n    <span class=\"hljs-attr\">ports:</span>\n      <span class=\"hljs-bullet\">-</span> <span class=\"hljs-number\">6868</span><span class=\"hljs-string\">:6868</span>\n    <span class=\"hljs-attr\">volumes:</span>\n      <span class=\"hljs-bullet\">-</span> <span class=\"hljs-string\">/path/to/your/data:/config</span>\n    <span class=\"hljs-attr\">environment:</span>\n      <span class=\"hljs-bullet\">-</span> <span class=\"hljs-string\">TZ=UTC</span> <span class=\"hljs-comment\"># Set your timezone</span>\n    <span class=\"hljs-attr\">env_file:</span>\n      <span class=\"hljs-bullet\">-</span> <span class=\"hljs-string\">.env</span> <span class=\"hljs-comment\"># Optional: Only needed if contributing to a database</span>\n    <span class=\"hljs-attr\">restart:</span> <span class=\"hljs-string\">unless-stopped</span>\n</code></pre>\n<h4 id=\"docker-cli\">Docker CLI</h4>\n<pre><code class=\"hljs language-bash\">docker run -d \\\n  --name=profilarr \\\n  -p 6868:6868 \\\n  -v /path/to/your/data:/config \\\n  -e TZ=UTC \\\n  --env-file .<span class=\"hljs-built_in\">env</span> \\ <span class=\"hljs-comment\"># Optional: Only needed if contributing to a database</span>\n  --restart unless-stopped \\\n  santiagosayshey/profilarr:latest  <span class=\"hljs-comment\"># or :beta</span>\n</code></pre>\n<h4 id=\"volumes\">Volumes</h4>\n<p>When configuring the volume mount (<code>/path/to/your/data:/config</code>):</p>\n<ul>\n<li>Replace <code>/path/to/your/data</code> with the actual path on your host system</li>\n<li><strong>Windows users:</strong> The database is case-sensitive. Use a docker volume or the WSL file system directly to avoid issues<ul>\n<li>Docker volume example: <code>profilarr_data:/config</code></li>\n<li>WSL filesystem example: <code>/home/username/docker/profilarr:/config</code></li>\n</ul>\n</li>\n</ul>\n<h3 id=\"casaos\">CasaOS</h3>\n<p>View lawgics&#39; CasaOS setup guide <a href=\"https://dictionarry.dev/wiki/profilarr-casaos\">here:</a></p>\n<h3 id=\"development\">Development</h3>\n<p>In addition to being a &#39;sync&#39; tool for end users, Profilarr also acts as a development platform for people to work on, and contribute to, a remote database. Read <a href=\"https://dictionarry.dev/wiki/development-setup\">here</a> to learn more on how to setup Profilarr for development.</p>\n<h2 id=\"usage\">Usage</h2>\n<h3 id=\"credentials-setup\">Credentials Setup</h3>\n<p>The first time you visit the web UI at <code>http://[address]:6868</code>, you&#39;ll be prompted to setup login credentials.</p>\n<ul>\n<li>Make sure you keep note of these credentials, as you won&#39;t be able to reset the password if you forget it later on (unless you have access to the filesystem and can interact with the docker container.)</li>\n</ul>\n<p><img src=\"https://i.imgur.com/uhZWeHe.png\" alt=\"\"></p>\n<h3 id=\"configuration-workflows\">Configuration Workflows</h3>\n<p>Once you&#39;ve setup your user credentials you can start working on your media configurations. You have the choice to either:</p>\n<ol>\n<li>Connect to an external database, make changes, receive updates and handle change conflicts.<ul>\n<li>This is what most people will be using if they don&#39;t want to build configurations from scratch.</li>\n</ul>\n</li>\n<li>Use Profilarr completely locally, without a database.<ul>\n<li>This option is left for people who want the advantages of Profilarr&#39;s compilation system (single definition profiles, tweaks, better management, etc), but don&#39;t want to be tied to any one database. Skip ahead to <a href=\"#making-changes\">Making Changes</a></li>\n</ul>\n</li>\n</ol>\n<h4 id=\"connecting-to-a-database\">Connecting to a Database</h4>\n<p>Profilarr leverages Git to create an open-source configuration sharing system. To get started, navigate to <code>Settings -&gt; Database</code>, and link a repository.</p>\n<p><img src=\"https://i.imgur.com/OpArP4z.png\" alt=\"\"></p>\n<table>\n<thead>\n<tr>\n<th>#</th>\n<th>Feature</th>\n<th>Description</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>1</td>\n<td>Database information</td>\n<td>Contains basic information about the database - Name, Owner, Stars/Issues/PRs</td>\n</tr>\n<tr>\n<td>2</td>\n<td>Status Container</td>\n<td>- View outgoing changes (any local changes you&#39;ve made to the database)<br>- View incoming changes (any changes pushed to a remote database that haven&#39;t been applied to your local one)<br>- View merge conflicts (when you&#39;ve made changes to a file that also has incoming changes)</td>\n</tr>\n<tr>\n<td>3</td>\n<td>Commit / Change Log</td>\n<td>- View logs of all prior changes applied to your database<br>- If your HEAD is out of date with the remote, it will only show commits after the commit diversion</td>\n</tr>\n<tr>\n<td>4</td>\n<td>Unlink Repo</td>\n<td>- Remove the currently linked repo<br>- Choose to either keep the current files and stop receiving updates<br>- Or remove all files and sync to a completely different database instead</td>\n</tr>\n<tr>\n<td>5</td>\n<td>Current Branch</td>\n<td>- Databases may choose to maintain stable / beta versions of their configurations via branches<br>- You would choose your preferred configuration path here (must will just use stable)</td>\n</tr>\n<tr>\n<td>6</td>\n<td>Auto Sync</td>\n<td>- Option to let Profilarr automatically pull in new updates without consulting you first.<br>- Useful if you want to connect to a database, receive updates and forget about it after<br>- If a pull causes a merge conflict, Profilarr will pause mid merge and let your resolve the conflicts manually before continuing</td>\n</tr>\n</tbody></table>\n<p><strong>NOTE</strong>: The database must adhere to the Profilarr standard format to work correctly with Profilarr (ie configurations must be made / edited inside profilarr and not externally).</p>\n<ul>\n<li>Profilarr does not ensure that every public database will adhere to this format, nor work properly with them (only our own - the Dictionarry database).</li>\n</ul>\n<p>The following sections will use the <a href=\"https://github.com/Dictionarry-Hub/database\">Dictionarry Database</a> for demonstration purposes.</p>\n<h4 id=\"getting-updates\">Getting Updates</h4>\n<p>Databases are likely to change overtime; they might receive new features such as edition formats, or new quality profiles targeting anime releases. They might fix bugs with regex patterns, or improve descriptions and tags. Since Profilarr connects to a Git repository, it can take advantage of Git&#39;s version control capabilities to show when your local database is out of sync with the remote database.</p>\n<p>When updates are available, Profilarr will display them in the Status Container section of the Database page (provided you don&#39;t have auto pull enabled):</p>\n<p><img src=\"https://imgur.com/gimLQU7.png\" alt=\"\"></p>\n<ol>\n<li><strong>Incoming Changes</strong>: Shows all changes that have been pushed to the remote database but haven&#39;t yet been applied to your local installation<ul>\n<li>Each change will show a single file each</li>\n<li>Changes will usually be marked as tweaks, additions, removals, renames, etc.</li>\n<li>You can the &#39;View Changes&#39; button, which will open a modal that shows the associated commit + message, and the exact fields that have changed</li>\n</ul>\n</li>\n</ol>\n<p><img src=\"https://i.imgur.com/qjfqMfQ.png\" alt=\"\"></p>\n<ol start=\"2\">\n<li><p><strong>Update Process</strong>:</p>\n<ul>\n<li>Click the &quot;Pull Changes&quot; button to apply all incoming changes to your local database</li>\n<li>Profilarr will automatically merge these changes with your local setup</li>\n<li>If you&#39;ve enabled Auto Sync in settings, these updates will be applied automatically</li>\n<li>Once pulled, your database will go back to being in sync</li>\n<li>It is currently not possible to pick and choose updates yet, but this feature will be looked at in future</li>\n</ul>\n</li>\n<li><p><strong>Update History</strong>:</p>\n<ul>\n<li>All successfully applied updates are logged in the Commit/Change Log section</li>\n<li>This provides a complete history of changes applied to your database</li>\n<li>You can use this log to track when specific features were added or modified</li>\n<li>While technically feasibly, Profilarr does NOT allow you to go back to a certain commit for interoperability reasons.</li>\n</ul>\n</li>\n</ol>\n<h4 id=\"making-changes\">Making Changes</h4>\n<p>Databases are meant to act as &#39;starting points&#39; for your setup:</p>\n<ul>\n<li>Some may be broad and have a variety of profiles to use</li>\n<li>Others might be incredibly niche and focus on small but important philosophies.</li>\n<li>Even Dictionarry&#39;s database, that aims to be both broad and niche at the same time is also just a starting point.</li>\n</ul>\n<p>You have the power to make changes to <em>whatever</em> you want, and still receive updates from a database. To make changes, you simply interact with the configs you want to change and save them - just as you would in Radarr / Sonarr.</p>\n<ul>\n<li>You can change file names, regex patterns, descriptions, format scores, quality groups - whatever you want.</li>\n<li>You can view these changes in the database tab just as you would see incoming changes.</li>\n</ul>\n<p><img src=\"https://i.imgur.com/m0t5u3C.png\" alt=\"\"></p>\n<p>From this point, you have a few choices. You can either:</p>\n<ul>\n<li><strong>Revert changes.</strong> Have you ever made changes to your quality profiles and wanted to change it back but couldnt because you couldn&#39;t remember what it used to be? Well since we operate within Git, you can revert a file back to it&#39;s previous &#39;stable&#39; state using <code>git revert</code>. It&#39;s as simple as pressing a button now.</li>\n<li><strong>Commit Changes</strong>. When you&#39;re satisfied with your modifications and want to preserve them, you need to stage and commit them to your local Git repository. This creates a permanent record of your customizations that Profilarr can reference when pulling updates from the remote database.</li>\n</ul>\n<p><img src=\"https://i.imgur.com/RTvo2Ud.png\" alt=\"\"></p>\n<table>\n<thead>\n<tr>\n<th>#</th>\n<th>Action</th>\n<th>Description</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>1</td>\n<td>Stage</td>\n<td>- Marks modified files to be included in your next commit<br>- This is the preparation step before saving changes permanently<br>- You can select which specific files to stage, allowing you to group related changes together<br>- Staged files appear in a separate section in the interface<br>- Files must be staged before they can be committed (Git&#39;s two-phase commit process ensures you review changes before finalizing them)</td>\n</tr>\n<tr>\n<td>2</td>\n<td>Unstage</td>\n<td>- Removes files from the staging area that you previously staged<br>- Useful when you accidentally stage files or decide not to include certain changes in your commit<br>- The file remains modified in your working directory, but won&#39;t be included in the next commit<br>- You can only select and unstage files that are currently in the staging area</td>\n</tr>\n<tr>\n<td>3</td>\n<td>Commit</td>\n<td>- Permanently saves all staged changes to your local Git repository<br>- Requires a commit message that describes what changes were made and why<br>- Creates a checkpoint you can revert to later if needed<br>- <strong>Important</strong>: All staged files will be committed, not just selected ones<br>- After committing, these changes become part of your local configuration history<br>- This is the crucial step that allows Profilarr to track your customizations separately from the original database</td>\n</tr>\n<tr>\n<td>4</td>\n<td>Revert</td>\n<td>- Returns a file to its previous state before your modifications<br>- Especially useful when you&#39;ve made changes you no longer want to keep<br>- You can only revert non committed changes<br>- This preserves the history of changes while effectively canceling out unwanted modifications</td>\n</tr>\n<tr>\n<td>5</td>\n<td>Push</td>\n<td>- Sends your local commits to the remote database<br>- <strong>Only relevant for database contributors and developers</strong><br>- Requires appropriate permissions to the remote repository<br>- Regular users don&#39;t need to worry about this action</td>\n</tr>\n</tbody></table>\n<h5 id=\"why-commits\">Why Commits?</h5>\n<p>You might wonder: &quot;Why do I need to manually stage and commit changes? Why doesn&#39;t Profilarr just save them automatically?&quot; The answer lies in Profilarr&#39;s core philosophy of balancing customization with ongoing updates:</p>\n<p><strong>Breaking the &quot;All or Nothing&quot; Model</strong>: Traditional tools force you to choose - either use their configurations exactly as provided, or be cut off from future updates once you make changes. When you commit in Profilarr, you&#39;re creating clear markers that tell the system &quot;these parts are my customizations.&quot; This allows Profilarr to know exactly which parts to preserve when new updates arrive and which parts can be safely updated.</p>\n<p>Technically, Git is creating snapshots of your configurations at specific points in time. When you commit changes, Git records the exact differences between the original file and your modified version. Later, when pulling updates, Git analyzes these differences alongside the incoming changes and intelligently determines how to combine both sets of modifications without losing either. Without these explicit commit markers, there would be no reliable way to perform this merge operation.</p>\n<p>While Profilarr could theoretically automate the staging and committing process, we&#39;ve deliberately kept it manual. This is because Profilarr also serves as a development platform, and developers need precise control over when and how their changes are saved. Automatic commits would be frustrating for database contributors who are testing various configurations and don&#39;t want every experimental change permanently recorded. This manual approach gives both end users and developers the flexibility they need without compromising functionality.</p>\n<p>While the extra step might seem clunky at first, it&#39;s the mechanism that enables Profilarr&#39;s unique ability to let you personalize configurations while still receiving ongoing improvements. The alternative would be returning to the &quot;use our configs exactly as provided or you&#39;re on your own&quot; approach of other tools.</p>\n<h4 id=\"handling-merge-conflicts\">Handling Merge Conflicts</h4>\n<p>Even with Git&#39;s intelligent merging, sometimes you&#39;ll encounter situations where both you and the remote database have modified the same parts of the same files. When this happens, Profilarr needs your help to determine which changes to keep.</p>\n<h5 id=\"when-conflicts-occur\">When Conflicts Occur</h5>\n<p>Merge conflicts might arise in such scenarios like this:</p>\n<ul>\n<li>You&#39;ve customized a quality profile to allow AV1 encodes</li>\n<li>Meanwhile, the remote database has updated the same profile to allow AV1 encodes, but at a reduced score pushed up by other formats</li>\n<li>Both changes affect the same file.</li>\n</ul>\n<p>When incoming changes affect files you&#39;ve modified, Profilarr will mark them with a &quot;Potential Conflict&quot; label in the Status Container&#39;s incoming changes.</p>\n<p><img src=\"https://i.imgur.com/JS8gfn4.png\" alt=\"\"></p>\n<p>When you attempt to pull these changes, the database will enter a &quot;Merge Conflict&quot; state.</p>\n<ul>\n<li>At any point, you can choose to abort the merge and go back to your previous database state.</li>\n<li>You will not however, be able to pull in any new updates until the merge conflict has been resolved.</li>\n</ul>\n<p><img src=\"https://i.imgur.com/miuLkzw.png\" alt=\"\"></p>\n<h5 id=\"resolving-conflicts\">Resolving Conflicts</h5>\n<p>In the Merge Conflict state:</p>\n<ol>\n<li>Profilarr prevents you from making changes to other files until all conflicts are resolved</li>\n<li>The interface displays each conflicting field side-by-side, showing &quot;Yours&quot; (your version) and &quot;Theirs&quot; (remote version)</li>\n<li>You must resolve conflicts field-by-field, file-by-file</li>\n<li>For each field, you choose whether to keep your version or adopt the remote changes</li>\n<li>After resolving a conflict (but before completing the merge), you can edit your choices in case you change your mind</li>\n</ol>\n<p><img src=\"https://i.imgur.com/bJH7dJr.png\" alt=\"\"></p>\n<p>Here, the user has chosen to:</p>\n<ul>\n<li>Accept the incoming changes for two custom formats (360p and 2160p Quality Tier 5)</li>\n<li>Keep their local score change for AV1</li>\n</ul>\n<h5 id=\"after-resolution\">After Resolution</h5>\n<p>Once you&#39;ve resolved all conflicts for all files, you can commit the merge changes:</p>\n<p><img src=\"https://i.imgur.com/bd5hjBr.png\" alt=\"\"></p>\n<ol>\n<li>Non-conflicting files that were part of the pull are automatically merged</li>\n<li>Your resolved files maintain the exact choices you made during conflict resolution</li>\n<li>Your local database returns to a &quot;in sync&quot; state with the remote</li>\n<li>Normal operations can resume until the next update or change</li>\n</ol>\n<p>This process ensures you get the best of both worlds - keeping your important customizations while still benefiting from improvements in the remote database. While it may seem complex at first, this approach gives you complete control over how updates are integrated with your personalized setup.</p>\n<h4 id=\"profilarr-quirks\">Profilarr Quirks</h4>\n<p>Profilarr has made some changes to the way custom formats and quality profiles are built. Here&#39;s a basic overview of the biggest differences compared to standard Radarr/Sonarr configurations:</p>\n<table>\n<thead>\n<tr>\n<th>Feature</th>\n<th>Description</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>Reusable Regex Patterns</td>\n<td>- Regex patterns are now separate from custom formats and referenced by name<br>- This allows reusing the same pattern in multiple places<br>- Changes to a pattern automatically apply everywhere it&#39;s used<br>- At compile time, pattern names are resolved to their actual regex expressions for the *arr apps</td>\n</tr>\n<tr>\n<td>Conditional Format Import</td>\n<td>- Custom formats with a score of 0 are not included in profiles (unless specifically added in selective mode)<br>- This helps keep your profiles cleaner by excluding unused formats</td>\n</tr>\n<tr>\n<td>Enhanced Sorting</td>\n<td>- Additional methods for sorting, scoring, and searching files</td>\n</tr>\n<tr>\n<td>Language Handling</td>\n<td>- Complete overhaul of language management<br>- All profiles set language to &quot;Any&quot; and use language custom formats based on preferences<br>- Options include:<br> • &quot;Any&quot; - No language filtering<br> • &quot;Must Include&quot; - Ensures releases contain at least your preferred language<br> • &quot;Must Only Be&quot; - Ensures releases contain ONLY your preferred language</td>\n</tr>\n<tr>\n<td>Documentation-Focused</td>\n<td>- Tags and descriptions are stored in Profilarr but removed during compilation<br>- These elements are purely for documentation and organization</td>\n</tr>\n<tr>\n<td>Integrated Testing</td>\n<td>- Regex patterns and custom formats include testing functionality<br>- Used in continuous integration to ensure changes don&#39;t break existing functionality<br>- Helps maintain compatibility as configurations evolve</td>\n</tr>\n<tr>\n<td>Single Definition</td>\n<td>- Profiles and custom formats are defined once in Profilarr<br>- Automatically converted to appropriate Radarr/Sonarr syntax at compile time<br>- Eliminates need to maintain separate definitions unless different logic is required</td>\n</tr>\n</tbody></table>\n<h4 id=\"git-gud\">Git Gud</h4>\n<p>Profilarr attempts to make Git accessible to all users. However, there are some aspects of it that can&#39;t be completely simplified or safeguarded against. Understanding these key concepts will help you avoid common pitfalls and get the most out of the system, even if you&#39;ve never used Git before.</p>\n<table>\n<thead>\n<tr>\n<th>Topic</th>\n<th>Guidance</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>Commit Messages</td>\n<td>- Write clear, descriptive commit messages that explain what you changed and why<br>- Good messages help you track your history and understand changes months later<br>- Examples: &quot;Adjusted AV1 score to prioritize quality over filesize&quot;, &quot;Added support for anime dual-audio formats&quot;</td>\n</tr>\n<tr>\n<td>Avoiding File Deletion</td>\n<td>- Deleting files should be a last resort, not a go-to solution<br>- When you delete a file that exists in the remote database, it will cause merge conflicts when that file receives updates<br>- Instead of deleting, consider:<br> • Disabling formats you don&#39;t want to import<br> • Renaming files to indicate they&#39;re not in use<br> • Using comments to note why you&#39;re not using certain configurations</td>\n</tr>\n<tr>\n<td>Commit Size</td>\n<td>- Smaller commits that focus on specific changes are easier to manage<br>- They make conflict resolution simpler when conflicts occur<br>- Example: Commit changes to anime profiles separately from changes to movie profiles</td>\n</tr>\n<tr>\n<td>Reviewing Changes</td>\n<td>- Always review what you&#39;re about to stage using the &quot;View Changes&quot; feature<br>- Make sure each change is intentional and correct<br>- This helps prevent accidental modifications from being committed</td>\n</tr>\n<tr>\n<td>Backups</td>\n<td>- Before making significant changes, consider exporting your configurations<br>- This provides a fallback if something goes wrong<br>- Most issues can be resolved, but having a backup gives peace of mind</td>\n</tr>\n<tr>\n<td>Abandoned Changes</td>\n<td>- If you have unstaged changes you no longer want, use the &quot;Revert&quot; option<br>- Don&#39;t leave unwanted changes hanging around - they&#39;ll complicate future operations</td>\n</tr>\n</tbody></table>\n<h3 id=\"importing\">Importing</h3>\n<p>Once you&#39;ve setup your media configuration workflow you can setup external apps which Profilarr will attempt to sync with. You need to setup:</p>\n<p><img src=\"https://i.imgur.com/2ZqjGKg.png\" alt=\"\"></p>\n<h4 id=\"type-server\">Type / Server</h4>\n<p>There can sometimes be API changes that break Profilarr&#39;s import functionality, so version limits on the apps it can import to are enforced - these are often rare and are usually fixed quickly.</p>\n<h4 id=\"sync-settings\">Sync Settings</h4>\n<table>\n<thead>\n<tr>\n<th>Sync Method</th>\n<th>Description</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>Manual</td>\n<td>- Go to the format/profile page and enter select mode (button in top right toolbar or Ctrl+A)<br>- Select specific files you want to import and where you want to import them<br>- Gives you full control over what configurations are synced to which applications<br>- Best for users who want to carefully manage what gets imported</td>\n</tr>\n<tr>\n<td>On Pull</td>\n<td>- Automatically syncs selected files whenever the database receives an update<br>- When combined with Auto Pull, allows Profilarr to work completely autonomously</td>\n</tr>\n<tr>\n<td>On Schedule</td>\n<td>- Similar to On Pull, but runs on a schedule of your choosing<br>- Set specific times/intervals for Profilarr to check for changes and import them<br>- Useful for controlling when system resources are used for synchronization<br>- Good compromise between automation and control<br>- Creates a scheduled task that you can also trigger manually anytime you want</td>\n</tr>\n<tr>\n<td>Import as Unique</td>\n<td>- Works with any of the sync choices above<br>- Appends a unique identifier to imported files<br>- Allows you to use your Profilarr database alongside different tools/configs<br>- Example: Run TRaSH guides + Notifiarr configurations simultaneously with your Profilarr configs<br>- Prevents name conflicts when using multiple configuration sources</td>\n</tr>\n</tbody></table>\n<h4 id=\"external-app-setup\">External App Setup</h4>\n<p>In future updates (hopefully soon), Profilarr will handle a quick setup sync (changing media management, quality slider settings, etc), but for now you need to change these things manually.</p>\n<table>\n<thead>\n<tr>\n<th>Setting</th>\n<th>Recommendation</th>\n<th>Explanation</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>Propers and Repacks</td>\n<td>Set to &quot;Do Not Prefer&quot;</td>\n<td>Other options will override custom formats and make Radarr/Sonarr grab things we don&#39;t want</td>\n</tr>\n<tr>\n<td>Quality Sliders</td>\n<td>Set min/max for everything</td>\n<td>Custom formats will do 99% of the ranking and using any other settings just gets in the way usually</td>\n</tr>\n</tbody></table>\n<p><img src=\"https://i.imgur.com/IyJLvfR.png\" alt=\"\"> <img src=\"https://i.imgur.com/zws00bj.png\" alt=\"\"></p>\n",
    "slug": "profilarr-setup",
    "category": "wiki",
    "navigation": [
      {
        "title": "Installation",
        "children": [
          {
            "title": "Docker",
            "children": [
              {
                "title": "Docker Compose (recommended)",
                "children": []
              },
              {
                "title": "Docker CLI",
                "children": []
              },
              {
                "title": "Volumes",
                "children": []
              }
            ]
          },
          {
            "title": "CasaOS",
            "children": []
          },
          {
            "title": "Development",
            "children": []
          }
        ]
      },
      {
        "title": "Usage",
        "children": [
          {
            "title": "Credentials Setup",
            "children": []
          },
          {
            "title": "Configuration Workflows",
            "children": [
              {
                "title": "Connecting to a Database",
                "children": []
              },
              {
                "title": "Getting Updates",
                "children": []
              },
              {
                "title": "Making Changes",
                "children": [
                  "Why Commits?"
                ]
              },
              {
                "title": "Handling Merge Conflicts",
                "children": [
                  "When Conflicts Occur",
                  "Resolving Conflicts",
                  "After Resolution"
                ]
              },
              "Profilarr Quirks",
              "Git Gud"
            ]
          },
          {
            "title": "Importing",
            "children": [
              "Type / Server",
              "Sync Settings",
              "External App Setup"
            ]
          }
        ]
      }
    ]
  },
  {
    "path": "/dev-logs/architecture-overhaul",
    "type": "markdown",
    "frontmatter": {
      "title": "Architecture Overhaul",
      "slug": "architecture_overhaul",
      "author": "santiagosayshey",
      "created": "2024-8-13",
      "tags": [
        "devlog",
        "architecture"
      ]
    },
    "html": "<p>Hey @everyone, here&#39;s a small update on what I&#39;ve been working on lately:</p>\n<p>As the project has grown bigger, it&#39;s gotten quite difficult to keep track of and manage a billion different custom formats, quality profiles, etc. To help improve development productivity, I&#39;ve planned a complete overhaul of Dictionarry&#39;s architecture. This starts with separating things into modules - namely a separate database which powers the website and the profilarr tool.</p>\n<p>Next up is standardizing the actual entries inside the database. The biggest issue in development right now is making / editing / updating the same thing multiple times. If you have the same regex pattern for multiple CFs, it needs to be updated for each one of them. Quality profiles across different apps have miniscule differences in syntax (eg. web-dl in radarr vs web in sonarr), which means we need multiple files with tiny differences.</p>\n<p>Working in this system is extremely error prone and time consuming. To fix this, I&#39;m creating a standard unique to dictionarry based on a <strong>single definition format</strong>, i.e. Regex patterns, Custom Formats and Quality Profiles are defined once, and repeated in other places using foreign keys. I don&#39;t know exactly <em>how</em> this will look, but the plan is simplicity above all. Outside of improving productivity, I hope this standard helps encourage people who feel less confident with custom formats / quality profiles make more intuitive changes to their own setups.</p>\n<p>Now, the problem with this new and improved standard is - the arrs won&#39;t be able to read the files anymore. Solution: A compiler! This is where the fun begins; we take our simple, easy-to-develop-for files and push them through the compiler. Out pops the required syntax, with those weird naming rules (web-dl for radarr, web for sonarr), without the developer needing to ever worry about it!</p>\n<p>Here&#39;s a canvas page I made in Obsidian which visualizes this architecture:</p>\n<p><img src=\"https://i.imgur.com/HcXFNHU.png\" alt=\"Archiecture Diagram\"></p>\n<h1 id=\"profile-selector\">Profile Selector</h1>\n<p>Here&#39;s an updated look at the new profile selector (WIP) in action. I&#39;ll leave explaining the selection algorithm for another day (because I&#39;m still not quite happy with it), but I think it&#39;s still pretty cool to look at as is.</p>\n<p><img src=\"https://streamable.com/bhi7h6\" alt=\"Selection Algorithm v1\"></p>\n",
    "slug": "architecture-overhaul",
    "category": "dev-logs",
    "navigation": [
      "Profile Selector"
    ]
  },
  {
    "path": "/dev-logs/markdown-test",
    "type": "markdown",
    "frontmatter": {
      "title": "Markdown Formatting Test",
      "date": "2024-12-30",
      "description": "A comprehensive test of all markdown formatting features"
    },
    "html": "<h1 id=\"h1-header---main-title\">H1 Header - Main Title</h1>\n<p>This is a paragraph under the main header. It should have proper spacing and use the neutral color palette for both light and dark modes.</p>\n<h2 id=\"h2-header---section-title\">H2 Header - Section Title</h2>\n<p>Here&#39;s another paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit. This text should wrap nicely and have good line height for readability.</p>\n<h3 id=\"h3-header---subsection\">H3 Header - Subsection</h3>\n<p>Even more text here to test the h3 styling. The headers should have proper hierarchy and spacing between them.</p>\n<h4 id=\"h4-header---subsubsection\">H4 Header - SubSubsection</h4>\n<p>Even more text here to test the h4 styling. The headers should have proper hierarchy and spacing between them.</p>\n<h2 id=\"paragraph-and-text-formatting\">Paragraph and Text Formatting</h2>\n<p>This is a <strong>bold text</strong> example and this is <em>italic text</em>. You can also combine them like <em><strong>bold and italic</strong></em> text.</p>\n<p>Here&#39;s a new paragraph with some inline <code>code</code> formatting. The code should have a background color and monospace font.</p>\n<h2 id=\"lists\">Lists</h2>\n<h3 id=\"unordered-list\">Unordered List</h3>\n<ul>\n<li>First item in the list</li>\n<li>Second item with more text</li>\n<li>Third item<ul>\n<li>Nested item</li>\n<li>Another nested item</li>\n</ul>\n</li>\n<li>Back to main levels</li>\n</ul>\n<h3 id=\"ordered-list\">Ordered List</h3>\n<ol>\n<li>First numbered item</li>\n<li>Second numbered item</li>\n<li>Third numbered item<ol>\n<li>Nested numbered item</li>\n<li>Another nested numbered item</li>\n</ol>\n</li>\n<li>Back to main level</li>\n</ol>\n<h2 id=\"code-blocks\">Code Blocks</h2>\n<p>Here&#39;s a code block with syntax:</p>\n<pre><code class=\"hljs language-javascript\"><span class=\"hljs-keyword\">function</span> <span class=\"hljs-title function_\">testFunction</span>(<span class=\"hljs-params\"></span>) {\n  <span class=\"hljs-keyword\">const</span> message = <span class=\"hljs-string\">&quot;Hello, world!&quot;</span>;\n  <span class=\"hljs-variable language_\">console</span>.<span class=\"hljs-title function_\">log</span>(message);\n  \n  <span class=\"hljs-keyword\">if</span> (<span class=\"hljs-literal\">true</span>) {\n    <span class=\"hljs-keyword\">return</span> <span class=\"hljs-string\">&quot;This is a test&quot;</span>;\n  }\n}\n</code></pre>\n<p>And here&#39;s a simple code block:</p>\n<pre><code class=\"hljs\">This is just plain <span class=\"hljs-keyword\">text</span>\n<span class=\"hljs-keyword\">in</span> <span class=\"hljs-keyword\">a</span> code block\n<span class=\"hljs-keyword\">with</span> multiple <span class=\"hljs-keyword\">lines</span>\n</code></pre>\n<h2 id=\"blockquotes\">Blockquotes</h2>\n<blockquote>\n<p>This is a blockquote. It should have a left border and italic styling.</p>\n<p>It can span multiple lines and should look distinct from regular paragraphs.</p>\n</blockquote>\n<blockquote>\n<p>Here&#39;s another blockquote to test spacing between them.</p>\n</blockquote>\n<h2 id=\"links\">Links</h2>\n<p>Here&#39;s a <a href=\"https://example.com\">link to example.com</a> and another <a href=\"https://example.com\" title=\"Example Site\">link with title</a>.</p>\n<h2 id=\"images\">Images</h2>\n<p>Here&#39;s an image (this will show as broken since it&#39;s a placeholder):<br><img src=\"https://via.placeholder.com/300x200.png?text=Test+Image\" alt=\"Alt text for image\"></p>\n<h2 id=\"tables-github-flavored-markdown\">Tables (GitHub Flavored Markdown)</h2>\n<table>\n<thead>\n<tr>\n<th>Header 1</th>\n<th>Header 2</th>\n<th>Header 3</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>Row 1, Col 1</td>\n<td>Row 1, Col 2</td>\n<td>Row 1, Col 3</td>\n</tr>\n<tr>\n<td>Row 2, Col 1</td>\n<td>Row 2, Col 2</td>\n<td>Row 2, Col 3</td>\n</tr>\n<tr>\n<td>Row 3, Col 1</td>\n<td>Row 3, Col 2</td>\n<td>Row 3, Col 3</td>\n</tr>\n</tbody></table>\n<h2 id=\"horizontal-rule\">Horizontal Rule</h2>\n<p>Here&#39;s text before a horizontal rule.</p>\n<hr>\n<p>And here&#39;s text after the horizontal rule.</p>\n<h2 id=\"line-breaks\">Line Breaks</h2>\n<p>This line should break<br>right here (two spaces at end of line).</p>\n<p>This is a new paragraph after the line break test.</p>\n<h2 id=\"mixed-content-test\">Mixed Content Test</h2>\n<p>Here&#39;s a paragraph with <strong>bold</strong>, <em>italic</em>, and <code>inline code</code> all together. It also has a <a href=\"https://example.com\">link</a> in the middle.</p>\n<h3 id=\"list-with-code-and-links\">List with Code and Links</h3>\n<ol>\n<li>First item with <code>inline code</code></li>\n<li>Second item with <a href=\"https://example.com\">a link</a></li>\n<li>Third item with <strong>bold text</strong></li>\n<li>Fourth item with <em>italic text</em></li>\n</ol>\n<h3 id=\"blockquote-with-formatting\">Blockquote with Formatting</h3>\n<blockquote>\n<p>This blockquote contains <strong>bold text</strong>, <em>italic text</em>, and <code>inline code</code>.</p>\n<p>It also has a <a href=\"https://example.com\">link</a> and multiple paragraphs to test<br>complex formatting within blockquotes.</p>\n</blockquote>\n<h2 id=\"final-notes\">Final Notes</h2>\n<p>This test file should demonstrate all the major markdown formatting features. Each element should be properly styled with the neutral color palette and appropriate spacing for both light and dark modes.</p>\n<p>The styling should be consistent and readable across all elements.</p>\n",
    "slug": "markdown-test",
    "category": "dev-logs",
    "navigation": [
      {
        "title": "H1 Header - Main Title",
        "children": [
          {
            "title": "H2 Header - Section Title",
            "children": [
              {
                "title": "H3 Header - Subsection",
                "children": [
                  "H4 Header - SubSubsection"
                ]
              }
            ]
          },
          {
            "title": "Paragraph and Text Formatting",
            "children": []
          },
          {
            "title": "Lists",
            "children": [
              "Unordered List",
              "Ordered List"
            ]
          },
          {
            "title": "Code Blocks",
            "children": []
          },
          {
            "title": "Blockquotes",
            "children": []
          },
          {
            "title": "Links",
            "children": []
          },
          {
            "title": "Images",
            "children": []
          },
          {
            "title": "Tables (GitHub Flavored Markdown)",
            "children": []
          },
          {
            "title": "Horizontal Rule",
            "children": []
          },
          {
            "title": "Line Breaks",
            "children": []
          },
          {
            "title": "Mixed Content Test",
            "children": [
              "List with Code and Links",
              "Blockquote with Formatting"
            ]
          },
          "Final Notes"
        ]
      }
    ]
  },
  {
    "path": "/dev-logs/modular-choices",
    "type": "markdown",
    "frontmatter": {
      "title": "Modular Choices",
      "slug": "modular_choices",
      "author": "santiagosayshey",
      "created": "2024-12-3",
      "tags": [
        "devlog",
        "architecture",
        "user_choice"
      ]
    },
    "html": "<p>Hey @everyone, here&#39;s a small (but very important) post on the new update system!</p>\n<h2 id=\"current-profilarr\">Current Profilarr</h2>\n<p>Currently, there is 0 support for updates in Profilarr. This is obviously not ideal; it&#39;s a nightmare to keep up to date with changes and almost certainly breaks any custom changes you make.</p>\n<h2 id=\"profilarr-v1\">Profilarr v1</h2>\n<p>Users will be able to view incoming and outgoing changes, as well as resolve any conflicts between the two. To achieve this, a user friendly GUI has been built on top of Git&#39;s merge functionality and allows fine control over what should be merged / ignored. More specifically, this functionality allows us to make custom changes and choose to retain them once a new update comes around.</p>\n<ul>\n<li>As an example, let&#39;s say you&#39;ve made the Dolby Vision custom formats negative because your TV doesn&#39;t support it. A new update has come out which shuffles around HDR scores, and this leads to a merge conflict between the two custom format scores.</li>\n<li>In the settings page, you can choose to accept the incoming change or retain your local changes. Profilarr will &#39;remember&#39; your choice and stop prompting you to update this custom format until a new update comes out, in which case, the situation repeats. Keep local or accept incoming.</li>\n</ul>\n<h3 id=\"settings-page\">Settings Page</h3>\n<p>Profilarr now includes a dedicated page for &#39;Sync Settings&#39;. It allows you to link / unlink a database repository, view and change branches as well as deal with incoming / outgoing changes and their conflicts. This page has been planned for developers too; you can add an authenticated github dev token to your environment and you have the ability to make changes directly to Profilarr&#39;s database (not to stable, obviously).</p>\n<h1 id=\"beta-release\">Beta Release</h1>\n<ul>\n<li>Still not quite ready yet, but I&#39;m working hard to get it out! Stay tuned :hearts:</li>\n</ul>\n<p>Here&#39;s a screenshot of this new Conflict Resolver in action (Ignore the date modified row, it will be removed for actual use)</p>\n<p><img src=\"https://i.imgur.com/0EZrumU.png\" alt=\"Conflict Resolver\"></p>\n",
    "slug": "modular-choices",
    "category": "dev-logs",
    "navigation": [
      {
        "title": "Current Profilarr",
        "children": []
      },
      {
        "title": "Profilarr v1",
        "children": [
          "Settings Page"
        ]
      },
      "Beta Release"
    ]
  },
  {
    "path": "/dev-logs/profilarr-is-in-beta",
    "type": "markdown",
    "frontmatter": {
      "title": "Profilarr is in Beta 🚀",
      "slug": "profilarr_is_in_beta",
      "author": "santiagosayshey",
      "created": "2025-4-1",
      "tags": [
        "devlog",
        "profilarr",
        "database",
        "housekeeping"
      ]
    },
    "html": "<p>hey @everyone, long awaited dev log :)</p>\n<h2 id=\"whats-new\">What's New? 👈</h2>\n<p>Many people are already aware, but I thought I should formally announce here on discord that <strong>Profilarr is out in beta!</strong> I&#39;ve been working on it since around July last year and put in a massive effort over the Christmas break to get it working. Even though it&#39;s not nearly as stable as I would like it to be, it implements the core architecture I first talked about <a href=\"https://dictionarry.dev/devlog/architecture_overhaul\">here</a>. There is still so (x10) much to be done in terms of bugs &amp; polish &amp; new features, but I&#39;m happy sharing it as is. Hopefully you can all find some benefit in using it too :) </p>\n<p>You can read our setup guide <a href=\"https://dictionarry.dev/wiki/profilarr-setup\">here</a>. It&#39;s available as a community app on Unraid, and as a Docker image for both ARM (Apple Silicon, Raspberry Pi) and x86.</p>\n<h3 id=\"database\">Database 💾</h3>\n<p>Along with Profilarr, the Dictionarry database has also got an overhaul. We introduced the new encode efficiency index, 2160p Quality and Balanced profiles as well as other small improvements like editions, repacks and freeleech. Here are some scattered thoughts that you might also be interested in: </p>\n<ul>\n<li>@Seraphys has been working on a scoring refactor that introduces 720p fallback, fixes streaming service names, and groups similar releases together better. It&#39;s a huge change that I haven&#39;t been able to fully test myself, but I&#39;ve merged it into a separate branch because I know people are pretty antsy to start testing themselves. Anyone is free to give it a try, you just have to switch to the <code>scoring-refactor</code> branch in Profilarr. Please direct any issues / improvements to the database&#39;s <a href=\"https://github.com/Dictionarry-Hub/database\">Issue Tracker</a>.</li>\n<li>I&#39;m personally not too happy with the state of the current database - poorly named files and renames/imports weren&#39;t taken into enough consideration and it&#39;s causing way too many download loops. I&#39;m still trying to figure out exactly how I want to tackle these problems but I just want people to know that it is on my mind and it will be improved in future.</li>\n</ul>\n<h3 id=\"tweaks\">Tweaks 🔧</h3>\n<p>I talked about tweaks in detail <a href=\"https://dictionarry.dev/devlog/profile_tweaks\">here</a> and had actually implemented some of them into Profilarr, but decided to remove them at the last minute. On paper, it&#39;s an interesting system. In practice, it&#39;s confusing and really hard to program for. It&#39;s meant to be a database agnostic feature, but was hardcoded into Profilarr&#39;s profile system. I&#39;m going to keep this feature on the roadmap as a maybe for now, but I&#39;m going to have to completely rethink how to implement it from the ground up. </p>\n<h2 id=\"whats-next\">What's Next? 👉</h2>\n<p>Here&#39;s a (non comprehensive) list of what you can expect me to work on now that Profilarr is in beta. </p>\n<h3 id=\"profilarr\">Profilarr</h3>\n<ul>\n<li>Media Management Sync - Databases will be able to implement their own media management settings (quality sliders, rename templates, delay profiles, etc) and use profilarr to sync them</li>\n<li>Multi Database Support - Refactoring the database to use a dependency system that allows databases to act as layers and depend on layers above them. This lets profile databases exist independently of format databases and that independently of regex databases. This way, you&#39;ll be able to connect to multiple at once and build off them as you please (or just link a complete one). </li>\n<li>Everything on the issue tracker: <a href=\"https://github.com/Dictionarry-Hub/profilarr/issues\">https://github.com/Dictionarry-Hub/profilarr/issues</a></li>\n</ul>\n<h3 id=\"database\">Database</h3>\n<ul>\n<li>Efficiency Profiles - 1080p Efficient (10%), 1080p Efficient (22.5%) and 2160p Efficient will use the <a href=\"https://dictionarry.dev/wiki/EEi\">Encode Efficiency Index</a> to prioritise HEVC releases. </li>\n<li>Anime Support - Likely just quality profiles, but I also want to explore alternative options that better support dynamic needs. We likely want to make release group tiers, but also figure out a way to prioritise releases from newer &amp; better sources. I&#39;m not personally into that much anime, so I&#39;m going to need as much input as I can get from you guys ~ please start those conversations if you want something to be considered (some have already asked, I&#39;ll get back to you when I can!)</li>\n<li>Better Streaming Service Grab Logic - This is already partially improved in Seraphys&#39; refactor, but I would also like to add support for more streaming services and revise the interaction between release groups and sources.</li>\n</ul>\n<h2 id=\"housekeeping\">Housekeeping 🧹</h2>\n<p>We&#39;ve had an influx of new members over the past couple weeks, so I&#39;d like to welcome you all to our discord 👋 Come say hey in #general if you haven&#39;t already. </p>\n<h3 id=\"moderation-wiki-support\">Moderation, Wiki, Support 🤝</h3>\n<ul>\n<li>I&#39;d like to introduce @Seraphys as our first moderator and designated detail devotee 🤣 Big claps all around. </li>\n<li>The rules, faq, links (among others) are very out of date and will be getting a refresh soon, stay tuned for those updates. </li>\n<li>I will likely be closing the support post channels soon and replacing them with a single, simpler text channel and removing the bot integration. For any basic support, please message us over there, but for any major issues please redirect your queries to our issue trackers on GitHub from now on. <a href=\"https://github.com/Dictionarry-Hub/profilarr/issues\">here</a> and <a href=\"https://github.com/Dictionarry-Hub/database\">here</a></li>\n</ul>\n<h3 id=\"donations\">Donations 💸</h3>\n<p>If you&#39;ve donated and would like a special &#39;Donor&#39; role badge here on discord, please shoot me a PM. </p>\n<h3 id=\"taking-a-break\">Taking a Break ⏸️</h3>\n<p>I want to let everyone know that I&#39;ll be taking a break for a little while ~ I spent the majority of the past 4-5 months working on Profilarr and I&#39;m quite burnt out. I&#39;m trying very hard to balance full time study with development, but they unfortunately just don&#39;t mesh the way I hoped they would. I can&#39;t not work at 100% for either, so something had to give and for the past month or so, that&#39;s been my sleep and sanity. I unfortunately can&#39;t delay my semester (as much as I want to), so I&#39;m going to have to dial down the time I spend on Dictionarry/Profilarr. I think I&#39;m going to do a proper break (no dev at all) for a couple weeks at least ~ until my easter break, then I&#39;ll slowly pick up speed again. Couple of specific points I want to mention here:</p>\n<ul>\n<li>I&#39;m going to stop giving ETAs for things. They always take longer than I expect them to, which puts pressure on me and probably disappoints you guys when something inevitably doesn&#39;t happen on time. The defacto answer to any ETA questions from now on will be &quot;when it&#39;s ready&quot;. </li>\n<li>I&#39;ve been pretty scatterbrained lately, so if someone is waiting on a message from me  just know that I haven&#39;t forgotten about you and will get back when I have the time. If it&#39;s been a while, shoot me a PM or something as a reminder ~ I&#39;ll still be active on discord during my break.</li>\n</ul>\n<h3 id=\"thank-you\">Thank You 🙏</h3>\n<p>This project has grown tremendously in scope in the last year and that&#39;s not possible without a community, so big thanks from me to all of you. I&#39;m still figuring all of this out as I go along so it&#39;s kind of unbelievable how many people are using a tool that once only existed in my head. </p>\n<p>Cheers, everyone. </p>\n",
    "slug": "profilarr-is-in-beta",
    "category": "dev-logs",
    "navigation": [
      {
        "title": "What's New? 👈",
        "children": [
          "Database 💾",
          "Tweaks 🔧"
        ]
      },
      {
        "title": "What's Next? 👉",
        "children": [
          "Profilarr",
          "Database"
        ]
      },
      {
        "title": "Housekeeping 🧹",
        "children": [
          "Moderation, Wiki, Support 🤝",
          "Donations 💸",
          "Taking a Break ⏸️",
          "Thank You 🙏"
        ]
      }
    ]
  },
  {
    "path": "/dev-logs/profile-selector-v3",
    "type": "markdown",
    "frontmatter": {
      "title": "Profile Selector v3",
      "slug": "profile_selector_v3",
      "author": "santiagosayshey",
      "created": "2024-6-2",
      "tags": [
        "devlog",
        "profile_selector",
        "website"
      ]
    },
    "html": "<p>hey @everyone , thought I&#39;d make a channel to share some development logs.</p>\n<p>I&#39;ve been feeling pretty inspired code wise the past few days, so I&#39;ve actually made some progress despite saying I would take a break...</p>\n<p>Anyways, after designing Profile Selector v3 in Figma for the past couple months, I started work on actually implementing it. Let me tell you that drawing shapes is much, much easier than coding them. After a couple days of regretting not paying attention in high school trigonometry, I have the basic functionality in place! We have three data points which represent each of the requirements - quality, efficiency, compatibility. The user can select points on each of the axes, and each combination is used to recommend a profile. It&#39;s not hooked up to the database yet, so random strings are being used as a placeholder.</p>\n<p>The good thing about this design is that it&#39;s really modular. Once I finish the &#39;beginner&#39; version of it, I&#39;ll be able to add an advanced mode which can be used to select any kind of requirement. Resolution, HDR, Audio, etc.</p>\n<p>Here&#39;s how it looks right now (obvious disclaimer that final version will look much much better):</p>\n<p><img src=\"https://streamable.com/2uprnl\" alt=\"Selector Proof of Concept\"></p>\n<p>Here&#39;s a funny tidbit from development:</p>\n<p>I tried writing some animation styling to make the inner polygon look like its stretching (as opposed to instant, static movement). It didn&#39;t quite work..</p>\n<p>Behold: Frankenstein&#39;s Triangle.</p>\n<p><img src=\"https://streamable.com/z70sj8\" alt=\"Frankenstein's Triangle\"></p>\n",
    "slug": "profile-selector-v3",
    "category": "dev-logs",
    "navigation": []
  },
  {
    "path": "/dev-logs/profile-tweaks",
    "type": "markdown",
    "frontmatter": {
      "title": "Profile Tweaks",
      "slug": "profile_tweaks",
      "author": "santiagosayshey",
      "created": "2024-12-3",
      "tags": [
        "devlog",
        "architecture",
        "user_choice"
      ]
    },
    "html": "<p>Hey @everyone, I&#39;ve been hard at work on the next Profilarr version over the past few weeks and have new stuff to show off!</p>\n<p>The profiles we make are meant to be (really good) starting points, not a strict standard on what you <em>should</em> be grabbing. Up until now, profiles existed as singular entities that don&#39;t respect custom changes. Merge conflict resolution was a big step in the right direction for this (read more in the last dev log), but it&#39;s a bit more hands on, and not something I expect most people to engage with.</p>\n<p>Enter &#39;Profile Tweaks&#39;. These are simple check boxes you can enable / disable and are unique to YOUR profiles. They will ALWAYS be respected, regardless of what updates we make to the base profile. For now, these tweaks include:</p>\n<ul>\n<li>Prefer Freeleech</li>\n<li>Allow Prereleases (CAMS, Screeners, etc)</li>\n<li>Language Strictness</li>\n<li>Allow Lossless audio</li>\n<li>Allow Dolby Vision without Fallback</li>\n<li>Allow bleeding edge codecs (AV-1, H266)</li>\n</ul>\n<p>(Some are only available for specific profiles, eg lossless audio for 1080p Encode profiles).</p>\n<p>If anyone has any tweak ideas (even super specific ones), please let me know and I&#39;ll work on getting it integrated! Here&#39;s an image of the Tweaks Tab:</p>\n<h2 id=\"profilarr-progress\">Profilarr Progress</h2>\n<ul>\n<li>Progress is steady, I&#39;ve been working on it every day since my semester ended. It&#39;s taken way, way longer than I&#39;ve expected (sorry!) but I&#39;m happy with how it&#39;s starting to look.</li>\n<li>Git integration is complete and working, but needs lots of testing.</li>\n<li>Data modules (custom formats, regex patterns, quality profiles) are complete and fully implement the existing logic from Radarr / Sonarr.</li>\n<li>I am currently in the progress of porting existing data to the new database (<a href=\"https://github.com/Dictionarry-Hub/database/tree/stable\">https://github.com/Dictionarry-Hub/database/tree/stable</a>) in the new profilarr standard format. This is going to take a while, as I have to write descriptions, add tags, test cases, etc.</li>\n<li>Finally, I am starting to work on the compilation engine (<a href=\"https://discord.com/channels/1202375791556431892/1246504849265266738/1272756617041154049\">https://discord.com/channels/1202375791556431892/1246504849265266738/1272756617041154049</a>) and the import module. Once these things are complete, and I&#39;m confident we won&#39;t run into massive bugs, I&#39;ll release a beta docker image. ETA? I really don&#39;t know, but I&#39;m working as hard as I can.</li>\n</ul>\n<p>If anyone has any tweak ideas (even super specific ones), please let me know and I&#39;ll work on getting it integrated! Here&#39;s an image of the Tweaks Tab:</p>\n<p><img src=\"https://i.imgur.com/fzbmJSn.png\" alt=\"Profile Tweaks\"></p>\n",
    "slug": "profile-tweaks",
    "category": "dev-logs",
    "navigation": [
      "Profilarr Progress"
    ]
  },
  {
    "path": "/dev-logs/shiny-new-stuff",
    "type": "markdown",
    "frontmatter": {
      "title": "Shiny New Stuff",
      "slug": "shiny_new_stuff",
      "author": "santiagosayshey",
      "created": "2024-8-19",
      "tags": [
        "devlog",
        "architecture"
      ]
    },
    "html": "<p>hey @everyone, hope you guys are well. Here&#39;s another update!</p>\n<h1 id=\"motivation\">Motivation</h1>\n<p>I&#39;ve been really struggling to work on this project for a few months now - I&#39;ll finally get some time at the end of the week but feel completely unmotivated to work on it for more than an hour. Well... after cracking the architecture problem last week and seeing all the support from you guys, I&#39;ve felt especially motivated to dive back in.</p>\n<h1 id=\"profilarr-v2-not-really-v2-but-it-sounded-cool\">Profilarr v2 (not really v2 but it sounded cool)</h1>\n<p>Profilarr is getting some really nice upgrades. Here&#39;s an outline of the most important ones:</p>\n<h2 id=\"its-now-a-full-stack-application\">It's now a full stack application.</h2>\n<p>This means we have a frontend: a site that users can visit to adjust, import, and export regexes, custom formats, and quality profiles. It&#39;s built in a way that aims to &#39;remaster&#39; how it&#39;s implemented in Radarr/Sonarr. All the existing functionality is there, but with some really nice quality of life features:</p>\n<ul>\n<li><strong>Single definition format</strong>: As outlined in the previous dev log, Profilarr&#39;s version of this system will use a single definition format. Notably, this allows you to set regex patterns ONCE, then add that regex as a condition inside a custom format.</li>\n<li><strong>Sorting and Filtering</strong>: You can now sort and filter items by title, date modified, etc.</li>\n<li><strong>Exporting/Importing</strong>: The standard format now allows <em>everyone</em> to import/export regexes, custom formats, and quality profiles freely - no need to query APIs to do this anymore.</li>\n<li><strong>Syncing</strong>: Instead of clogging up everyone&#39;s arrs with unused custom formats, the sync functionality now only imports <em>used</em> items.</li>\n<li><strong>Mass selection</strong>: You can mass select items to import/export/sync/delete.</li>\n<li><strong>Tags</strong>: Instead of manual selection, you can set tags on specific custom formats/quality profiles that should be synced. This works similar to how Prowlarr uses tags to selectively sync indexers. Since we are also using the same database for the website, tags can also be used for little tidbits of information too. Like where a release group is an internal at!</li>\n<li><strong>Testing</strong>: Developers can now permalink regexes to regex101. This makes it really easy to develop and test simultaneously.</li>\n<li><strong>Descriptions</strong>: You can now explain what specific items are for. No need to look it up on the website to see what it does.</li>\n</ul>\n<h2 id=\"backend-improvements\">Backend Improvements</h2>\n<p>The backend is essentially what Profilarr is right now - a tool to sync some JSON files to your arrs. However, this also has some major improvements:</p>\n<ul>\n<li><strong>Git integration</strong>: You can select a remote repository to connect to and:<ul>\n<li>Add, commit, and push files; branch off; merge into. This isn&#39;t that useful for end users, but I cannot stress enough how much time and suffering this has saved me. Being able to revert regex/custom format/quality profiles to the last commit is my favorite thing I&#39;ve ever coded.</li>\n<li><strong>Branching</strong>: You can have different branches for different things. Of course, this is useful for development, but it also allows you to do things like: separate setups for Radarr/Sonarr/Lidarr. Most importantly, it allows us developers to set stable, dev, and feature branches.</li>\n<li><strong>Pulling</strong>: You can now pull in changes from specific branches from a remote repository. You can view differences and decide if you want to pull these changes in. You can set it to be automatic and only alert on merge conflicts (you change something, but an incoming change for that item exists as well). You can choose to get the most stable branch or the latest features merged into develop.</li>\n<li><strong>External sources</strong>: You can set your own repo of regexes, custom formats, and quality profiles and share it with whoever you want. As I mentioned in my last dev log, I&#39;ll be working on a compiler to convert our standard Profilarr format with the existing arr format. The really cool thing about this is it works both ways. This means the git integration + compiler will allow you to use Profilarr with the trash guides. It&#39;ll probably take some tweaking, but I know it&#39;s definitely possible now.</li>\n</ul>\n</li>\n</ul>\n<h2 id=\"containerisation\">Containerisation</h2>\n<p>Profilarr will FINALLY be dockerised.</p>\n<h1 id=\"development\">Development</h1>\n<p>With these changes in place, it has massively improved and sped up development. Working in a proprietary tool now allows me the freedom to just implement a feature whenever I want to. Want to filter custom formats with the release tier tag? Boom, implemented. Want to auto-apply scores to custom formats in quality profiles based on tags? Boom, implemented.</p>\n<h2 id=\"machine-learning\">Machine Learning</h2>\n<p>This part is mostly speculation and rambling - nothing concrete yet. I really want to incorporate some kind of AI help into Profilarr. A button you can press to auto-generate regex or a custom format. I&#39;ve read countless Reddit posts of someone unfamiliar with regex/custom formats/profiles asking for help in trying to learn. &quot;How do I write a custom format that matches x265 releases under size x?&quot; It&#39;s so easily solved using AI.</p>\n<p>I want to implement this one day, I just don&#39;t have enough knowledge or experience to do it yet. The best I&#39;ve come up with is something that sends a request to OpenAI&#39;s API with a prompt. The results are less than ideal. But just imagine the future where some kind of machine learning tool has access to an entire database of regexes, custom formats, and quality profiles curated by hundreds of people, and can use that knowledge to predict patterns and truly tailor stuff to suit people&#39;s needs. Who knows if it ever gets to that point, but that&#39;s my vision for Dictionarry.</p>\n<p>Ramble over, as you can tell I&#39;ve been feeling pretty motivated lately!</p>\n<p>Anyway, here&#39;s some images of profilarr v2.</p>\n<p><strong>Regex Page</strong>:</p>\n<p><img src=\"https://i.imgur.com/kMZ9qII.png\" alt=\"Regex Page\"></p>\n<p><strong>Custom Format Page</strong>:</p>\n<p><img src=\"https://i.imgur.com/mCyDxId.png\" alt=\"Custom Format Page\"></p>\n<p><strong>Status Page</strong>:</p>\n<p><img src=\"https://i.imgur.com/ZleeOEF.png\" alt=\"Status Page\"></p>\n<p>Of course, everything is still a heavy work in progress.</p>\n<p>That&#39;s all for today!</p>\n",
    "slug": "shiny-new-stuff",
    "category": "dev-logs",
    "navigation": [
      {
        "title": "Motivation",
        "children": []
      },
      {
        "title": "Profilarr v2 (not really v2 but it sounded cool)",
        "children": [
          "It's now a full stack application.",
          "Backend Improvements",
          "Containerisation"
        ]
      },
      {
        "title": "Development",
        "children": [
          "Machine Learning"
        ]
      }
    ]
  },
  {
    "path": "/dev-logs/vision-almost-realised",
    "type": "markdown",
    "frontmatter": {
      "title": "Vision (Almost) Realised",
      "slug": "vision_almost_realised",
      "author": "santiagosayshey",
      "created": "2024-12-24T00:00:00.000Z",
      "tags": [
        "devlog",
        "architecture",
        "gppi"
      ]
    },
    "html": "<p>Hey @everyone, small log for today!</p>\n<pre><code class=\"hljs language-bash\">$ python profile_compile.py &amp;#39;profiles/1080p Encode.yml&amp;#39; &amp;#39;1080p Encode (sonarr - master).json&amp;#39; -s\nConverted profile saved to: 1080p Encode (sonarr - master).json\n\n$ python importarr.py\nImporting Quality Profiles to sonarr : Master\nUpdating &amp;#39;1080p Encode&amp;#39; quality profile : SUCCESS\n</code></pre>\n<p>These two commands are the culmination of the architecture overhaul I talked about in August: <a href=\"https://discord.com/channels/1202375791556431892/1246504849265266738/1272756617041154049\">https://discord.com/channels/1202375791556431892/1246504849265266738/1272756617041154049</a>. The Profilarr standard format <em><strong>works</strong></em>. A typical profile is now about 300 lines (down from 1000 each for radarr / sonarr), is able to be compiled from PSF to Radarr OR Sonarr (and back!). Regex patterns allow format resolution, so no more editing the same thing 5, 10... 20 times.</p>\n<p>I&#39;m currently in the process of hooking up the database to the new website, and that&#39;s looking pretty cool too. I cannot even explain how good it feels to be able to edit a profile once inside Profilarr, push those changes directly from Profilarr, have those changes reflected as incoming changes for end users, and as updated information on the website all in one fell swoop.</p>\n<p>It&#39;s taken a huge effort the past 4 months, and I still have to actually connect it to the backend, but I&#39;m fairly happy with how it&#39;s turned out. The changes won&#39;t be all that evident right away for you guys, but it&#39;s going to save me (and anyone who wants to contribute) hours upon hours of development time for everything that I have planned.</p>\n<h2 id=\"golden-popcorn-performance-index-changes\">Golden Popcorn Performance Index Changes</h2>\n<p>The current GPPi algorithm is strong, but fundamentally flawed. It does not take into consideration release groups who have no data. There are terrific new groups (ZoroSenpai for example) who should be tier ~2 at least, but aren&#39;t simply because they have no data. How do we fix this?</p>\n<h3 id=\"popularity\">Popularity</h3>\n<p>For every encode at a specific resolution for a movie / tv show that is currently <em>popular</em>, a release group receives +1 score to their GPPi. At the end of every month, the score is reset, and the previous score is normalized (tbd on how) and added to their permanent GPPi score (up to a certain point and probably never past tier ~3)</p>\n<p>This process will be completely automatic and will hopefully solve the problem of new good release groups.</p>\n<h3 id=\"grouping\">Grouping</h3>\n<p>The previous &#39;tiers&#39; for release groups was just natural intuitive grouping. Humans are surprisingly very, very good at pattern recognition so it was never really a problem. However, it was manual, and we dont like manual around here. Enter &#39;K Means Clustering&#39;. Essentially it&#39;s just a fancy algorithm that finds natural break points between groups of numbers. Using K means, I&#39;ve dropped the number of 1080p Tiers from 7 down to 5 which in turn has increased immutability. Small changes, but will be important in the long run.</p>\n<h2 id=\"thank-you\">Thank You!</h2>\n<p>That&#39;s all for today, I hope everyone&#39;s doing alright and enjoying the holidays :grinning:</p>\n",
    "slug": "vision-almost-realised",
    "category": "dev-logs",
    "navigation": [
      {
        "title": "Golden Popcorn Performance Index Changes",
        "children": [
          "Popularity",
          "Grouping"
        ]
      },
      "Thank You!"
    ]
  },
  {
    "path": "/dev-logs/website-20",
    "type": "markdown",
    "frontmatter": {
      "title": "Website 2.0",
      "slug": "website2.0",
      "author": "santiagosayshey",
      "created": "2025-02-02T00:00:00.000Z",
      "tags": [
        "devlog",
        "website",
        "profile_builder",
        "eei",
        "2160p",
        "quality"
      ]
    },
    "html": "<p>Hey everyone, medium-ish update today.</p>\n<h2 id=\"website-20\">Website 2.0</h2>\n<p>I&#39;ve wanted to transition away from the old site / mkdocs for a while now as its quite hard to maintain and keep everything up to date, so I built a new site using Next.js that uses ISR to rebuild its content using the dictionarry database. Basically this just means:</p>\n<ul>\n<li>Database gets an update -&gt; Website sees its data is stale -&gt; Website rebuilds itself with new data -&gt; Santiago smiles in not needing to do anything</li>\n</ul>\n<p>This all ties into the whole &quot;write once&quot; philosophy that I instilled with Profilarr and has made development much easier. There are still quite a few layout issues and perhaps a devlog refactor I need to fit in somewhere, but I&#39;m happy to share it with you guys as it is.</p>\n<p><a href=\"https://dictionarry.dev/\">Website 2.0</a></p>\n<p><img src=\"https://i.imgur.com/eORTwml.png\" alt=\"website2.0\"></p>\n<p>The old site will go down soon, sorry if I broke anyone&#39;s workflows D:</p>\n<h3 id=\"profile-selector\">Profile Selector?</h3>\n<p>This idea has gone through many iterations since i started Dictionarry last year.</p>\n<ol>\n<li>A static flowchart with not nearly enough information / choice: <a href=\"https://github.com/santiagosayshey/website/blob/030f3631b4f6fffdb7fa9f4696e5d12defc84a46/docs/Profiles/flowchart.png\">https://github.com/santiagosayshey/website/blob/030f3631b4f6fffdb7fa9f4696e5d12defc84a46/docs/Profiles/flowchart.png</a></li>\n<li>The &quot;Profile Selector&quot; (terrible name): <a href=\"https://selectarr.pages.dev/\">https://selectarr.pages.dev/</a></li>\n<li>Frankenstein&#39;s triangle: <a href=\"https://discord.com/channels/1202375791556431892/1246504849265266738/1246536424925171925\">Discord Link</a></li>\n</ol>\n<p>Frankenstein&#39;s triangle was supposed to be what i shipped with the new website (and I actually finished it too!). It worked by calculating the area of the efficiency/quality/compatibility triangle using some formula named after some guy i forget, to guesstimate user choice based on their previous selection. It did this by normalizing the &quot;score&quot; of each profile on each of it&#39;s axes and finding the best fitting triangle that used the axis that was changed.</p>\n<p>Results were pretty good but I felt that it abstracted <em>too much</em> of what made any user choice meaningful so I decided to scrap it.</p>\n<h3 id=\"profile-builder\">Profile Builder!</h3>\n<p>In it&#39;s place is the &quot;Profile Builder&quot; (maybe also a terrible name). It still attempts to abstract audio/video down into more quantifiable groupings, but limits itself to explanations of certain things where more abstraction is detrimental. It&#39;s pretty self explanatory once you use it, but basically you choose through increasingly niche groupings -&gt; resolution -&gt; compression -&gt; encode type -&gt; codec -&gt; HDR. At each step, a list of recommended profiles will be shown. I think this new system helps to fix the &quot;trying to get the profile I want&quot; issue as it starts pretty broad and gets increasingly more specific the more things you choose. It&#39;s up now, give it a playwith; let me know if its good / bad / needs changes: <a href=\"https://dictionarry.dev/builder\">Profile Buider</a></p>\n<p><img src=\"https://i.imgur.com/ka8KSHl.png\" alt=\"Profile Builder\"></p>\n<h2 id=\"encode-efficiency-index\">Encode Efficiency Index</h2>\n<p>Here we go, meat and potatoes. This is another release group metric just like the Golden Popcorn Performance Index. Heres&#39;s the play-by-play:</p>\n<ul>\n<li>It evaluates release groups on their average compression ratio (how big their encode is compared to a source), to discern quality and/or efficiency.</li>\n<li>It can discern transparency by targeting ratios at which a codec begins to &quot;saturate&quot;</li>\n<li>It can discern efficiency by targeting ratios at which a codec reaches it&#39;s &quot;efficiency apex&quot;</li>\n</ul>\n<p>This is a heavily watered down explanation of the metric, you can read about it (with examples), in very heavy detail <a href=\"https://dictionarry.dev/wiki/EEi\">here</a>. Months of research and iteration has gone into this, and I really think this is Dictionarry&#39;s biggest asset so far. When AV1 profiles become a thing, this metric is ready for it.</p>\n<h4 id=\"no-more-parsing-codecs\">No More Parsing Codecs!!!!</h4>\n<p>If you parse the efficiency of a release group directly, then you know youre getting something at a file size you want. This means we don&#39;t have to use h265 / x265 as a ridiculous proxy baseline to find content we want anymore. We can just downrank all h264 instead which is much more reliable</p>\n<h4 id=\"2160p-quality-encode-profile-release-group-tierlist\">2160p Quality (Encode) Profile + Release Group Tierlist!!!!!!!!</h4>\n<p>Using EEI, we target 4k release groups at 55% target ratio to discern transparency. No golden popcorns needed, no complex trump parsing crap. No &quot;popular&quot; vote. Whenever something isn&#39;t documented, we simply add that movie / tv show to the data source and groupings update automatically. It&#39;s almost like magic.</p>\n<p>This metric has made the 2160p Quality profile possible and i dare say it&#39;s the most comprehensive one I&#39;ve worked on thus far. Give the quality profile and tier lists a read here:</p>\n<ul>\n<li><a href=\"https://dictionarry.dev/profiles/2160p-quality\">216p Quality Profile</a></li>\n<li><a href=\"https://dictionarry.dev/tiers/2160p/quality\">2160p Quality Release Group Tiers</a></li>\n</ul>\n<h4 id=\"thanks\">Thanks</h4>\n<ul>\n<li>Thanks to @seraphys for helping out with the profile creation / giving constant feedback.</li>\n<li>Thanks to @erphise for being a tester / the catalyst for the creation of this metric. If they hadn&#39;t been testing out the HEVC profile, we never would have talked about compression ratios which never meant I got the idea for the metric in the first place.</li>\n</ul>\n<p>Show them some love.</p>\n<h2 id=\"profilarr\">Profilarr</h2>\n<p>Almost done, I took a break for a couple weeks to finish up the website but I&#39;m gonna get rolling again soon. I just finalized authentication, database migrations and the pull module. The only major thing left is getting everything ready for production. This means setting up the docker image, unraid template, etc, etc. It&#39;s hard to say how long this is gonna take since I&#39;m basically learning it all on the fly so bare with me on this. But, it&#39;s almost done and a beta test will be out soon (hopefully)</p>\n",
    "slug": "website-20",
    "category": "dev-logs",
    "navigation": [
      {
        "title": "Website 2.0",
        "children": [
          {
            "title": "Profile Selector?",
            "children": []
          },
          {
            "title": "Profile Builder!",
            "children": []
          }
        ]
      },
      "Encode Efficiency Index",
      "No More Parsing Codecs!!!!",
      "2160p Quality (Encode) Profile + Release Group Tierlist!!!!!!!!",
      "Thanks",
      "Profilarr"
    ]
  }
];