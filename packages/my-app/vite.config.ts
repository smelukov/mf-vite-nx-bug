/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { federation } from '@module-federation/vite';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/packages/my-app',

  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [
    react(),
    federation({
      name: 'fff',
      remotes: {},
      shared: {
        'react/': {
          singleton: true,
        },
      },
      exposes: {
        './fff': './src/fff',
      },
      filename: 'fff-bundle.js',
    }),
    nxViteTsPaths(),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  build: {
    outDir: '../../dist/packages/my-app',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
