import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
const path = require('path');

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
//   base: '/app/',
//   resolve: {
//     alias: { '@': path.resolve(__dirname, './src') },
//     extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
//   },
//   css: {
//     preprocessorOptions: {
//       scss: {
//         additionalData: "@import '@/common/css/base.scss';",
//       },
//     },
//   },
//   server: {
//     host: '0.0.0.0',
//     hmr: true,
//     open: true,
//   },
// });
export default ({ mode }) => {
  return defineConfig({
    plugins: [vue()],
    base: mode === 'development' ? '' : '/app/',
    // base: '/app',
    resolve: {
      alias: { '@': path.resolve(__dirname, './src') },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: "@import '@/common/css/base.scss';",
        },
      },
    },
    server: {
      host: '0.0.0.0',
      hmr: true,
      open: true,
    },
  });
};
