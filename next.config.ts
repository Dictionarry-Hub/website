// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/website' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/website/' : '',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.buymeacoffee.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
