import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  resolve: {
    alias: {
      '@': '/src/',
    },
  },
  build: {
    commonjsOptions: {
      esmExternals: true,
    },
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ms-chat-core',
      formats: ['es', 'cjs'],
      fileName: (format: string) => `ms-chat-core.${format}.js`,
    },
    rollupOptions: {
      external: [
        'lodash-es'
      ],
      output: {
        format: 'esm',
        exports: 'named'
      }
    },
  },
  plugins: [dts()],
});
