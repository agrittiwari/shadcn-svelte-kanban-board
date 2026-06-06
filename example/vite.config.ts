import path from 'node:path';
import { fileURLToPath } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

const rootDirectory = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [tailwindcss(), svelte()],
  root: rootDirectory,
  resolve: {
    alias: {
      $lib: path.resolve(rootDirectory, '../src/lib'),
    },
  },
  server: {
    port: 4174,
  },
});
