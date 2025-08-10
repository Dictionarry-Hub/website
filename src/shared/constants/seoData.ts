export interface SeoData {
  title: string;
  description: string;
  image?: string;
}

// Default SEO data for pages that don't have a specific entry.
export const defaultSeo: SeoData = {
  title: 'Dictionarry',
  description: 'An open standard for media server configurations.',
  image: '/logo-no-cog.svg',
};

// SEO data for specific routes.
const seoData: Record<string, SeoData> = {
  '/': {
    title: 'Home',
    description: 'An open standard for media server configurations.',
  },
  '/profilarr-setup/installation': {
    title: 'Installation',
    description: 'A guide to installing Profilarr via Docker, Unraid, or CasaOS.',
  },
  '/profilarr-setup/101': {
    title: 'Profilarr 101',
    description: 'An overview of the core Link, Bridge, and Sync workflow.',
  },
  '/profilarr-setup/linking': {
    title: 'Linking',
    description: 'Connect Profilarr to a configuration database on GitHub.',
  },
  '/profilarr-setup/bridging': {
    title: 'Bridging',
    description: 'Connect Profilarr to your Radarr and Sonarr instances.',
  },
  '/profilarr-setup/syncing': {
    title: 'Syncing',
    description: 'An overview of the manual, on-pull, and scheduled sync methods.',
  },
  '/profilarr-setup/updates': {
    title: 'Updates',
    description: 'Learn how Profilarr manages updates from database maintainers.',
  },
  '/profilarr-setup/customizations': {
    title: 'Customizations',
    description: 'Make local changes to configurations while staying connected to updates.',
  },
  '/profilarr-setup/development': {
    title: 'Development',
    description: 'A guide for developers on contributing to a Profilarr Database.',
  },
  '/quality-profile': {
    title: 'Quality Profiles',
    description: 'Browse and discover Quality Profiles for your media server.',
  },
  '/custom-format': {
    title: 'Custom Formats',
    description: 'Browse and discover Custom Formats to fine-tune your media collection.',
  },
  '/regex-pattern': {
    title: 'RegEx Patterns',
    description: 'Browse and test regular expressions for filtering and managing your media.',
  },
  '/devlogs': {
    title: 'Devlogs',
    description: 'Follow the development journey and latest updates for Dictionarry and Profilarr.',
  },
  '/wiki': {
    title: 'Wiki',
    description: 'A collection of articles and guides on media management and automation.',
  },
  '/media-management': {
    title: 'Media Management',
    description: 'Configure media naming, quality definitions, and miscellaneous settings for your media server.',
  },
  '/media-management/misc': {
    title: 'Miscellaneous Settings',
    description: 'Adjust miscellaneous settings for Radarr and Sonarr, including propers/repacks and MediaInfo.',
  },
  '/media-management/naming': {
    title: 'Naming Configuration',
    description: 'Define how your media files are renamed and organized in your library for Radarr and Sonarr.',
  },
  '/media-management/qualitydefinitions': {
    title: 'Quality Definitions',
    description: 'Set file size limits for different video qualities like 720p, 1080p, and 4K in Radarr and Sonarr.',
  },
};

export function getSeoData(path: string): SeoData {
  const route = Object.keys(seoData).find(key => path === key);
  return route ? seoData[route] : defaultSeo;
}