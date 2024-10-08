import { defineConfig } from 'vite'
import shopify from 'vite-plugin-shopify'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'url'
import webfontDownload from 'vite-plugin-webfont-dl';
import { imagetools } from 'vite-imagetools'

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
  plugins: [
    shopify(),
    react(),
    webfontDownload(["https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap"]),
    imagetools()
  ],
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
