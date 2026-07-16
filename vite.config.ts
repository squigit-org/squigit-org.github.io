import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

const projectRoot = __dirname;
const siteRoot = path.resolve(projectRoot, 'site');
const staticRoot = path.resolve(projectRoot, 'static');

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, projectRoot, '');
  return {
    root: siteRoot,
    envDir: projectRoot,
    publicDir: staticRoot,
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(projectRoot, 'src'),
      },
    },
    build: {
      outDir: path.resolve(projectRoot, 'dist'),
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: path.resolve(siteRoot, 'index.html'),
          authPopup: path.resolve(siteRoot, 'login/popup-google-auth/index.html'),
          privacy: path.resolve(siteRoot, 'legal/privacy/index.html'),
          terms: path.resolve(siteRoot, 'legal/terms/index.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      fs: {
        allow: [projectRoot],
      },
    },
  };
});
