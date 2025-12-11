import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/openapi': {
        target: 'http://ai-gateway.maipuat.msxf.test',
        changeOrigin: true,
      },
    },
  },
});
