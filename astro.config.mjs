import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { rehypeLightboxImages } from './src/lib/rehype-lightbox-images';

export default defineConfig({
  integrations: [mdx({ rehypePlugins: [rehypeLightboxImages] })],
  site: 'https://kawadesign.us',
  // Photo Inker replaced the Stipple Tool; old links land on the new page.
  redirects: {
    '/stipple-tool': '/photo-inker',
  },
  build: {
    assets: 'assets'
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },
});
