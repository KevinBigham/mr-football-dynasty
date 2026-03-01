import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/mr-football-dynasty/',
  root: '.',
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // React runtime — cached separately, rarely changes
          vendor: ['react', 'react-dom'],
          // All extracted game systems — changes on module swaps
          systems: ['./src/systems/index.js'],
          // Config & theme tokens — changes infrequently
          config: ['./src/config/index.js'],
          // Data files (narrative text, names, templates) — rarely changes
          data: ['./src/data/index.js'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: false,
  },
});
