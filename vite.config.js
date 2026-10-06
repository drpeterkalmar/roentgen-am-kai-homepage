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
        // React/Router ändern sich selten → eigener vendor-Chunk, bleibt bei Content-Updates im Browser-Cache
        // (jsx-runtime/scheduler gehören dazu)
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (/node_modules\/(react|react-dom|react-router|react-router-dom|scheduler|@remix-run)\//.test(id)) return 'vendor';
          return undefined;
        },
      },
    },
  },
})
