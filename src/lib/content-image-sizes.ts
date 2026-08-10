// Responsive width presets for content images, shared across every block
// that renders one, plus the Markdown-image rehype plugin. Keeping these in
// one place means the numbers can only drift from the actual layout, never
// from each other.
//
// Reference point: --content-width in global.css is the media width, 1240px.

// Full-width images (Photo, plain Markdown images): up to the media width,
// with headroom for high-DPI screens.
export const FULL_WIDTH_IMAGE_WIDTHS = [640, 960, 1280, 1600, 2000];
export const FULL_WIDTH_IMAGE_SIZES = '(max-width: 900px) 100vw, 1240px';

// Gallery: tiles keep their natural proportions in a grid of at most three
// columns, so the widest a tile gets is a third of the content column (~420px)
// — or the full column when a narrow screen drops it to one across. The
// breakpoints here mirror Gallery.astro's own.
export const GALLERY_IMAGE_WIDTHS = [300, 450, 600, 900];
export const GALLERY_IMAGE_SIZES = '(max-width: 560px) 100vw, (max-width: 900px) 46vw, 420px';
