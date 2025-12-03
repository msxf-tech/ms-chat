import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import requireTransform from 'vite-plugin-require-transform';
import svgLoader from 'vite-svg-loader';

// import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
    define: {
      'process.env.NODE_ENV': JSON.stringify('production'),
    },
    plugins: [vue(), vueJsx({}), requireTransform({}), svgLoader()],

    // plugins: [
    //   vue(), vueJsx({}), requireTransform({}), svgLoader()
      // visualizer({
      //   open: true,      // 打包后自动打开报告
      //   filename: 'stats.html', // 生成文件名
      //   gzipSize: true,  // 显示gzip压缩后体积
      //   brotliSize: true // 显示brotli压缩后体积
      // })
    // ],
    resolve: {
      alias: {
        '@': '/src/',
      },
    },
    server: {
      proxy: {
        '/openapi': {
          target: 'http://ai-gateway.maipuat.msxf.test', // 目标服务器地址
          changeOrigin: true // 是否改变源地址
        },
        '/fin': {
          target: 'http://fmp-ctest3.msxf.msxfyun.test/',
          changeOrigin: true,
        },
        '/api': {
          target: 'http://gbi-core-zhangfubing-8080.msxf.msxfyun.test/',
          changeOrigin: true,
        }
      }
    },
    // entry: resolve(__dirname, 'src/sdk/main.ts'),
    build: {
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
        external: [
          'vue'
        ],
        output: {
          format: 'esm',
          exports: 'named',
          globals: {
            vue: 'Vue'
          },
        }
      },
      emptyOutDir: false,
    },
  });
