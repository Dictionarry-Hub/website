import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function getAllRoutes() {
  // Static routes 
  const staticRoutes = [
    '/',
    '/profilarr-setup/installation',
    '/profilarr-setup/101',
    '/profilarr-setup/linking',
    '/profilarr-setup/bridging',
    '/profilarr-setup/syncing',
    '/profilarr-setup/updates',
    '/profilarr-setup/customizations',
    '/profilarr-setup/development',
    '/devlogs',
    '/quality-profile',
    '/custom-format',
    '/regex-pattern',
    '/media-management',
    '/media-management/naming',
    '/media-management/qualitydefinitions',
    '/media-management/misc',
    '/wiki'
  ];

  // Get dynamic routes from the generated content database
  const dynamicRoutes = [];
  
  try {
    const dbPath = path.join(__dirname, '../src/generated/contentDatabase.ts');
    if (fs.existsSync(dbPath)) {
      const content = fs.readFileSync(dbPath, 'utf-8');
      
      // Extract all paths using regex
      const pathMatches = content.matchAll(/"path":\s*"([^"]+)"/g);
      for (const match of pathMatches) {
        const route = match[1];
        if (!staticRoutes.includes(route)) {
          dynamicRoutes.push(route);
        }
      }
    }
  } catch (error) {
    console.warn('Could not read content database:', error.message);
  }

  return [...staticRoutes, ...dynamicRoutes];
}

// If run directly, print routes
if (import.meta.url === `file://${process.argv[1]}`) {
  const routes = getAllRoutes();
  console.log(`Found ${routes.length} routes`);
  console.log(JSON.stringify(routes, null, 2));
}