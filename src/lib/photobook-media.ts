// Lets photo book blocks take a plain filename (src="./IMG_3505.jpg")
// instead of needing an import line per photo. The file is looked up in the
// folder of the post being rendered — the post's URL slug is its folder
// name, so the page URL is enough to find it.

import path from 'node:path';
import type { ImageMetadata } from 'astro';
import sharp from 'sharp';

// Not eager: a file is only loaded when a page actually names it. (Loading
// them all up front copies every photo in every post folder into the built
// site, used or not.)
const images = import.meta.glob<{ default: ImageMetadata }>(
  '/src/content/articles/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
);

const videos = import.meta.glob<string>(
  '/src/content/articles/**/*.{mp4,webm,MP4,WEBM}',
  { query: '?url', import: 'default' },
);

function postFolder(pageUrl: URL): string {
  // /articles/ha-giang-loop/ → ha-giang-loop
  const slug = pageUrl.pathname.split('/').filter(Boolean)[1];
  return `/src/content/articles/${slug}`;
}

function notFound(kind: string, file: string, folder: string, available: string[]): never {
  const names = available.map(k => k.slice(folder.length + 1)).join(', ') || '(none)';
  throw new Error(`Photo book: can't find ${kind} "${file}" in ${folder}/. Check the spelling, including the extension. Files there: ${names}`);
}

/** The photo's path in the project (checking it exists), without loading it. */
export function imageKey(src: string, pageUrl: URL): string {
  const folder = postFolder(pageUrl);
  const key = `${folder}/${src.replace(/^\.\//, '')}`;
  if (!images[key]) notFound('image', src, folder, Object.keys(images).filter(k => k.startsWith(folder + '/')));
  return key;
}

export async function resolveImage(src: string | ImageMetadata, pageUrl: URL) {
  if (typeof src !== 'string') return { image: src, key: null as string | null };
  const key = imageKey(src, pageUrl);
  const mod = await images[key]();
  return { image: mod.default, key };
}

export async function resolveVideo(src: string, pageUrl: URL): Promise<string> {
  if (/^(https?:)?\//.test(src)) return src;
  const folder = postFolder(pageUrl);
  const key = `${folder}/${src.replace(/^\.\//, '')}`;
  if (!videos[key]) notFound('video', src, folder, Object.keys(videos).filter(k => k.startsWith(folder + '/')));
  return videos[key]();
}

const toneCache = new Map<string, 'light' | 'dark'>();

// Where the page text sits over the photo, as a box on a 30 × 30 grid.
// Desktop: the bottom-left. Phones: the top of the top row (y ≈ 3–7) —
// text starts at the top of its cell, and short captions go no lower.
// A tall phone shows only the middle band of a landscape photo, x ≈ 10–20:
// text in the top-right cell sits over the right of that band (15–20);
// text spanning the row starts at its left edge, and short captions never
// reach far across, so that's weighted left (10–18).
const TEXT_REGIONS = {
  desktop: { x0: 0, x1: 10, y0: 15, y1: 30 },
  'phone-right': { x0: 15, x1: 20, y0: 3, y1: 7 },
  'phone-wide': { x0: 10, x1: 18, y0: 3, y1: 7 },
};

/**
 * Is the part of a photo behind the page text bright or dark?
 * 'light' → use dark text, 'dark' → use white text.
 */
export async function imageTone(
  key: string | null,
  layout: keyof typeof TEXT_REGIONS = 'desktop',
): Promise<'light' | 'dark'> {
  if (!key) return 'dark';
  const cacheKey = `${layout}:${key}`;
  const cached = toneCache.get(cacheKey);
  if (cached) return cached;
  const { data } = await sharp(path.join(process.cwd(), key))
    .rotate()
    .resize(30, 30, { fit: 'fill' })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { x0, x1, y0, y1 } = TEXT_REGIONS[layout];
  let sum = 0, n = 0;
  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) {
      const i = (y * 30 + x) * 3;
      sum += 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
      n++;
    }
  }
  // Leans toward white text: white with its soft shadow stays readable on
  // mid-tones, so dark text is only picked for genuinely bright corners.
  const tone = sum / n > 165 ? 'light' : 'dark';
  toneCache.set(cacheKey, tone);
  return tone;
}

// Phones and portrait tablets: the photo book's stacked layout (matches the
// breakpoint in photobook.css).
const PHONE_MEDIA = ['(max-width: 768px)', '(orientation: portrait) and (max-width: 1024px)'];

/**
 * A `sizes` value for a photo cropped to fill a box (object-fit: cover).
 * Cropping draws the photo wider than its box whenever the photo is wider in
 * shape than the box, so sizing it to the box alone makes the browser pick a
 * file that's too small. Each box is a share of the window: w of its width,
 * h of its height. Layouts are tried in order; the last one is the default.
 */
export function coverSizes(
  image: ImageMetadata,
  layouts: { media?: string; w: number; h: number }[],
): string {
  const aspect = image.width / image.height;
  const parts: string[] = [];
  for (const { media, w, h } of layouts) {
    // The window shape at which the box is exactly as wide (in shape) as the
    // photo: any wider and the photo fits the box's width.
    const ratio = Math.round(((aspect * h) / w) * 1000);
    const and = media ? `${media} and ` : '';
    parts.push(`${and}(min-aspect-ratio: ${ratio}/1000) ${Math.ceil(w * 100)}vw`);
    const tall = `${Math.ceil(aspect * h * 100)}vh`;
    parts.push(media ? `${media} ${tall}` : tall);
  }
  return parts.join(', ');
}

/** Phone layouts first, then desktop, for boxes of the given shares. */
export function photoBookSizes(
  image: ImageMetadata,
  desktop: { w: number; h: number },
  phone: { w: number; h: number },
): string {
  return coverSizes(image, [...PHONE_MEDIA.map(media => ({ media, ...phone })), desktop]);
}
