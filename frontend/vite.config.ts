import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    },
  },
  server: {
    port: 3000,
    // cors: {
    //   // the origin you will be accessing via browser
    //   origin: 'http://localhost:8081/',
    //   credentials: true,
    // },
    // Ensure Vite treats your workspace package as source code for HMR
    fs: {
      allow: ['..'], // Allows Vite to serve files from outside the app directory
    },
  },
  plugins: [reactRouter(), tsconfigPaths()],
  optimizeDeps: {
    // This tells Vite: "Don't try to pre-bundle this; just let me import it."
    exclude: ['@shared'],
  },
});
