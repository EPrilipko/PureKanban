import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        generated: path.resolve(__dirname, 'generated/'),
      },
    },
    server: {
      proxy: {
        '^/graphql': {
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/graphql/, ''),
          target: env.VITE_GRAPHQL_URL,
          secure: false,
        },
        '^/ws': {
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/ws/, ''),
          target: env.VITE_GRAPHQL_WS_URL,
          secure: false,
          ws: true,
        },
      },
    },
  };
});
