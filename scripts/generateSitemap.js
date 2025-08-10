#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getAllRoutes } from './getRoutes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function generateSitemap() {
  console.log('🗺️  Generating sitemap...');
  
  const routes = getAllRoutes();
  const baseUrl = 'https://dictionarry.dev';
  const today = new Date().toISOString().split('T')[0];
  
  // Add special high-priority routes with query parameters
  const specialRoutes = [
    '/quality-profile?section=profile-wizard'  // Profile wizard is very important
  ];
  
  // Combine regular routes with special ones
  const allRoutes = [...routes, ...specialRoutes];
  
  // Priority routes (most important pages)
  const priorityRoutes = new Set([
    '/',
    '/profilarr-setup/installation',
    '/quality-profile',
    '/quality-profile?section=profile-wizard',  // Give wizard high priority
    '/custom-format',
    '/regex-pattern',
    '/wiki',
    '/media-management'
  ]);
  
  // Generate sitemap entries
  const entries = allRoutes.map(route => {
    let priority = '0.5';
    let changefreq = 'monthly';
    
    if (route === '/') {
      priority = '1.0';
      changefreq = 'yearly';  // Homepage rarely changes
    } else if (route === '/quality-profile?section=profile-wizard') {
      priority = '0.95';  // Profile wizard is VERY important - higher than installation
      changefreq = 'monthly';
    } else if (route === '/profilarr-setup/installation') {
      priority = '0.9';
      changefreq = 'monthly';  // Important but stable
    } else if (route === '/quality-profile' || route === '/custom-format' || route === '/regex-pattern') {
      priority = '0.8';
      changefreq = 'weekly';  // Landing pages update when DB updates
    } else if (priorityRoutes.has(route)) {
      priority = '0.7';
      changefreq = 'monthly';  // Other important pages
    } else if (route.startsWith('/profilarr-setup')) {
      priority = '0.7';
      changefreq = 'yearly';  // Setup guides are stable
    } else if (route.startsWith('/wiki')) {
      priority = '0.6';
      changefreq = 'monthly';  // Wiki pages occasionally update
    } else if (route.startsWith('/devlogs')) {
      priority = '0.5';
      changefreq = 'never';  // Old devlogs don't change
    } else if (route.includes('/')) {
      // Individual format/pattern pages (slugs)
      priority = '0.6';
      changefreq = 'weekly';  // Update with database changes
    }
    
    return `  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join('\n');
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`;
  
  // Write sitemap
  const outputPath = path.join(__dirname, '../dist/sitemap.xml');
  fs.writeFileSync(outputPath, sitemap);
  
  console.log(`✅ Sitemap generated with ${routes.length} URLs`);
  
  // Also create robots.txt if it doesn't exist
  const robotsPath = path.join(__dirname, '../dist/robots.txt');
  if (!fs.existsSync(robotsPath)) {
    // Copy from public if it exists
    const publicRobotsPath = path.join(__dirname, '../public/robots.txt');
    if (fs.existsSync(publicRobotsPath)) {
      fs.copyFileSync(publicRobotsPath, robotsPath);
      console.log('✅ Copied robots.txt to dist');
    }
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateSitemap();
}

export { generateSitemap };