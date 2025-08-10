import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    svelte(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@pages': resolve(__dirname, './src/pages'),
      '@shared': resolve(__dirname, './src/shared'),
      '@ui': resolve(__dirname, './src/shared/ui'),
      '@db': resolve(__dirname, './src/generated/contentDatabase.ts'),
    }
  },
  base: '/',
  // Handle client-side routing in dev server
  server: {
    historyApiFallback: true
  }
})