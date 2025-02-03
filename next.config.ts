// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
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
