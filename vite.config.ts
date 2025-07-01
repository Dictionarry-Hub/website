import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

// Plugin to regenerate routes when markdown files change
function regenerateRoutesPlugin() {
  return {
    name: 'regenerate-routes',
    buildStart() {
      // Initial generation
      this.addWatchFile('public/database/**/*.md')
      this.addWatchFile('public/database/**/*.yml')
      this.addWatchFile('public/database/**/*.yaml')
    },
    async handleHotUpdate({ file, server }) {
      if (file.includes('public/database/') && (file.endsWith('.md') || file.endsWith('.yml') || file.endsWith('.yaml'))) {
        console.log('📝 Markdown/YAML file changed, regenerating routes...')
        try {
          await execAsync('npm run generate-routes')
          await execAsync('npm run build-search-index')
          console.log('✅ Routes and search index regenerated')
          // Trigger full reload since routes changed
          server.ws.send({
            type: 'full-reload'
          })
        } catch (error) {
          console.error('❌ Failed to regenerate routes:', error)
        }
      }
    }
  }
}

export default defineConfig({
  plugins: [
    svelte(),
    tailwindcss(),
    regenerateRoutesPlugin()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@pages': resolve(__dirname, './src/pages'),
      '@shared': resolve(__dirname, './src/shared'),
      '@ui': resolve(__dirname, './src/shared/ui'),
    }
  },
  base: './' // For static site deployment
})