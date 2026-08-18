import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import type { Plugin } from 'vite';
import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';

const DEVELOPMENT_SITE_URL = 'http://localhost:5173';
const TEST_SITE_URL = 'https://profilarr.com';

function resolveSiteUrl(mode: string): { configured: boolean; value: string } {
	const environment = loadEnv(mode, process.cwd(), 'PUBLIC_');
	const configuredValue = process.env.PUBLIC_SITE_URL ?? environment.PUBLIC_SITE_URL;
	const value =
		configuredValue ||
		(mode === 'development'
			? DEVELOPMENT_SITE_URL
			: mode === 'test'
				? TEST_SITE_URL
				: TEST_SITE_URL);

	let url: URL;
	try {
		url = new URL(value);
	} catch {
		throw new Error('PUBLIC_SITE_URL must be a valid absolute URL.');
	}

	if (
		(url.protocol !== 'http:' && url.protocol !== 'https:') ||
		url.username ||
		url.password ||
		url.pathname !== '/' ||
		url.search ||
		url.hash
	) {
		throw new Error('PUBLIC_SITE_URL must be an HTTP or HTTPS origin without a path or query.');
	}

	return { configured: Boolean(configuredValue), value: url.origin };
}

function requireProductionSiteUrl(configured: boolean): Plugin {
	return {
		name: 'require-production-site-url',
		apply: 'build',
		buildStart() {
			if (!configured) {
				throw new Error('PUBLIC_SITE_URL is required for production builds.');
			}
		}
	};
}

export default defineConfig(({ mode }) => {
	const siteUrl = resolveSiteUrl(mode);

	return {
		define: {
			'import.meta.env.PUBLIC_SITE_URL': JSON.stringify(siteUrl.value)
		},
		plugins: [requireProductionSiteUrl(siteUrl.configured), tailwindcss(), sveltekit()],
		test: {
			include: ['tests/**/*.test.ts']
		}
	};
});
