import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves from /careergraph-ai/ — base must match the repo name
  base: '/careergraph-ai/',
  server: {
    port: 3000,
    host: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,     // No source maps in production (security)
    rollupOptions: {
      output: {
        // Stable chunk names for better caching
        manualChunks: {
          vendor: ['react', 'react-dom'],
          zustand: ['zustand'],
        },
      },
    },
  },
});
