import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default defineConfig({
  plugins: [
    react({ jsxRuntime: 'automatic' }),
    dts({
      exclude: ['demo'],
      insertTypesEntry: true,
      bundledPackages: [], // ① 4.x 新字段，代替 rollupTypes
    }),
  ],
  build: {
    target: 'es2019',
    commonjsOptions: {
      esmExternals: true,
    },
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ms-chat',
      formats: ['es', 'umd'],
      fileName: (format: string) => `ms-chat.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'react-rnd'],
      output: {
        exports: 'named',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
          'react-rnd': 'ReactRnd',
        },
      },
      plugins: [
        // 👈 允许解析 Node 子路径
        // @ts-ignore - 忽略类型检查错误
        nodeResolve({
          preferBuiltins: false,
        }),
      ],
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
          return;
        }
        if (
          warning.code === 'UNRESOLVED_IMPORT' &&
          warning.exporter?.startsWith('#')
        ) {
          return;
        }
        warn(warning);
      },
    },
    sourcemap: false, // 生成 sourcemap
  },
});
