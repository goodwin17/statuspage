import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "127.0.0.1",
    port: "5173"
  },
  resolve: {
    alias: {
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@helpers': '/src/helpers',
      '@contexts': '/src/contexts',
      '@hooks': '/src/hooks',
      '@api': '/src/api'
    }
  }
});
