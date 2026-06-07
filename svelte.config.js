import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import rehypeSlug from 'rehype-slug';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		// Force runes mode for the project, except for libraries and mdsvex files.
		// mdsvex emits `export let` for frontmatter, which is invalid in runes mode.
		// Can be removed in svelte 6.
		runes: ({ filename }) => {
			if (filename.split(/[/\\]/).includes('node_modules')) return undefined;
			if (filename.endsWith('.md') || filename.endsWith('.svx')) return undefined;
			return true;
		}
	},
	kit: { adapter: adapter() },
	preprocess: [
		mdsvex({
			extensions: ['.svx', '.md'],
			rehypePlugins: [rehypeSlug],
			layout: {
				'dev-logs': resolve(__dirname, 'src/lib/layouts/DevLog.svelte'),
				_: resolve(__dirname, 'src/lib/layouts/Default.svelte')
			}
		})
	],
	extensions: ['.svelte', '.svx', '.md']
};

export default config;
