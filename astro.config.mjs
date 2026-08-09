import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { rehypeLightboxImages } from './src/lib/rehype-lightbox-images';

export default defineConfig({
  integrations: [mdx({ rehypePlugins: [rehypeLightboxImages] })],
  site: 'https://kawadesign.us',
  build: {
    assets: 'assets'
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },
});
