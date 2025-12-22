#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getAllRoutes } from './getRoutes.js';
import { generateSitemap } from './generateSitemap.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Ensure directory exists
function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function prerender() {
  console.log('🚀 Starting prerendering...');
  
  const distPath = path.join(__dirname, '../dist');
  const indexPath = path.join(distPath, 'index.html');
  
  // Read the base index.html
  if (!fs.existsSync(indexPath)) {
    console.error('❌ Build the project first with: npm run build');
    process.exit(1);
  }
  
  const indexHtml = fs.readFileSync(indexPath, 'utf-8');
  const routes = getAllRoutes();
  
  console.log(`📋 Creating HTML files for ${routes.length} routes...`);
  
  // For each route, create an HTML file
  let created = 0;
  for (const route of routes) {
    if (route === '/') continue; // Skip root, it already exists
    
    // Create directory and copy index.html
    const routePath = path.join(distPath, route, 'index.html');
    ensureDir(routePath);
    
    // For now, just copy the index.html
    // The app will handle routing client-side
    fs.writeFileSync(routePath, indexHtml);
    
    created++;
    if (created % 100 === 0) {
      console.log(`  ✓ Created ${created}/${routes.length - 1} routes`);
    }
  }
  
  // Create 404.html for GitHub Pages
  console.log('📄 Creating 404.html...');
  fs.writeFileSync(path.join(distPath, '404.html'), indexHtml);
  
  // Generate sitemap
  generateSitemap();

  // Copy robots.txt if it exists
  const robotsSource = path.join(__dirname, '../public/robots.txt');
  const robotsDest = path.join(distPath, 'robots.txt');
  if (fs.existsSync(robotsSource) && !fs.existsSync(robotsDest)) {
    fs.copyFileSync(robotsSource, robotsDest);
    console.log('📄 Copied robots.txt');
  }
  
  console.log(`\n✅ Prerendering complete!`);
  console.log(`  • Routes created: ${created}`);
  console.log(`  • 404.html created`);
  console.log(`  • Sitemap generated`);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  prerender().catch(error => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });
}

export { prerender };