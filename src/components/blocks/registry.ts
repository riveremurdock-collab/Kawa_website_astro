// Every block available in MDX content. To add a new one:
//   1. Create src/components/blocks/NewBlock.astro
//   2. Import it below and add it to blockRegistry
// That's the whole process — no page ever imports a block directly.

import Photo from './Photo.astro';
import Gallery from './Gallery.astro';
import RouteMap from './RouteMap.astro';
import InstagramEmbed from './InstagramEmbed.astro';
import InstagramInline from './InstagramInline.astro';
// Photo book blocks — only meaningful in a post with `format: photobook`.
import BookPage from './BookPage.astro';
import BookBackground from './BookBackground.astro';
import BookText from './BookText.astro';
import BookMedia from './BookMedia.astro';
import BookRoute from './BookRoute.astro';

export const blockRegistry = {
  Photo,
  Gallery,
  RouteMap,
  InstagramEmbed,
  InstagramInline,
  BookPage,
  BookBackground,
  BookText,
  BookMedia,
  BookRoute,
};
