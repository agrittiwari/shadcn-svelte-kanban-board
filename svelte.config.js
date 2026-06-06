import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/package').Config} */
const config = {
  extensions: ['.svelte'],
  preprocess: vitePreprocess(),
  compilerOptions: {
    runes: true,
  },
};

export default config;
