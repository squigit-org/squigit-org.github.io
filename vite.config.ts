import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv, type Plugin} from 'vite';

const projectRoot = __dirname;
const siteRoot = path.resolve(projectRoot, 'site');
const srcRoot = path.resolve(projectRoot, 'src');
const staticRoot = path.resolve(projectRoot, 'static');
const srcRootUrl = `/@fs/${srcRoot.replace(/\\/g, '/')}/`;

function routeRepoSrcInDev(): Plugin {
  return {
    name: 'route-repo-src-in-dev',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (req.url?.startsWith('/src/')) {
          req.url = req.url.replace('/src/', srcRootUrl);
        }

        next();
      });
    },
  };
}

function relaxAuthPopupCspInDev(): Plugin {
  return {
    name: 'relax-auth-popup-csp-in-dev',
    apply: 'serve',
    enforce: 'post',
    transformIndexHtml(html, context) {
      if (
        context.path !== '/login/popup-google-auth/' &&
        context.path !== '/login/popup-google-auth/index.html'
      ) {
        return html;
      }

      return html.replace(
        "script-src 'self';",
        "script-src 'self' 'unsafe-inline';",
      );
    },
  };
}

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, projectRoot, '');
  return {
    root: siteRoot,
    envDir: projectRoot,
    publicDir: staticRoot,
    plugins: [
      routeRepoSrcInDev(),
      react(),
      tailwindcss(),
      relaxAuthPopupCspInDev(),
    ],
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
