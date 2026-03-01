import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.',
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) return 'vendor';
          if (id.includes('/src/data/')) return 'data-packs';
          if (id.includes('/src/systems/')) return 'game-systems';
          if (id.includes('/src/utils/')) return 'game-utils';
          if (id.includes('/src/config/')) return 'game-config';
          return undefined;
        },
      },
    },
  },
  server: {
    port: 3000,
    open: false,
  },
});
