import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Determine the base path based on environment and mode
  let base = '/'
  
  if (mode === 'demo') {
    // Check if we're building on Netlify
    if (process.env.NETLIFY) {
      base = '/' // Netlify serves from root
    } else {
      base = '/adminizer-demo/' // GitHub Pages serves from subfolder
    }
  }

  return {
    plugins: [react()],
    base,
    build: {
      outDir: 'dist',
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
            ui: ['lucide-react', 'date-fns']
          }
        }
      }
    }
  }
})