// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  root: '.', // raíz del proyecto (donde está index.html)
  base: './', // base relativa para producción
  publicDir: 'public', // puedes dejar esto igual
  server: {
    port: 5173,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});