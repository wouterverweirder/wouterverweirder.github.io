import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.aboutme.be',
  integrations: [mdx(), sitemap(), image({
    serviceEntryPoint: '@astrojs/image/sharp'
  })]
});