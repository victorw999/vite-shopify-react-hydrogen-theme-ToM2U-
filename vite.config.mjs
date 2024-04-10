import { defineConfig } from 'vite'
import shopify from 'vite-plugin-shopify'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'url'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      // "@": path.resolve(__dirname, "./frontend"),
      {
        find: '@shadcn',
        replacement: fileURLToPath(
          new URL('./frontend/entrypoints/', import.meta.url)
        )
      }
    ]
  },
  plugins: [shopify(), react()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: '[name].[hash].min.js',
        chunkFileNames: '[name].[hash].min.js',
        assetFileNames: '[name].[hash].min[extname]'
      }
    }
  }
})
