import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// BASE_PATH: '/roentgen-am-kai-homepage/' für GitHub Pages (Staging, Default),
// '/' sobald die eigene Domain (röntgen-am-kai.at) auf GitHub Pages zeigt.
const base = process.env.BASE_PATH || '/roentgen-am-kai-homepage/'

// https://vitejs.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // React/Router/Framer ändern sich selten → eigener Chunk, bleibt bei Content-Updates im Browser-Cache
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
})
