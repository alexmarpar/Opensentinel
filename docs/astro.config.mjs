// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import starlight from '@astrojs/starlight';
// https://astro.build/config

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    
  },
  site: 'https://alexmarpar.github.io',
	base: '/Opensentinel',
  integrations: [
    starlight({
      title: 'OpenSentinel',
    }),
  ],
});