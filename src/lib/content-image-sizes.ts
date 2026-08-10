// Responsive width presets for content images, shared across every block
// that renders one, plus the Markdown-image rehype plugin. Keeping these in
// one place means the numbers can only drift from the actual layout, never
// from each other.
//
// Reference point: --content-max-width in global.css caps the content
// column at 1400px; PhotoInline splits that column in half.

// Full-width images (LeadImage, plain Markdown images): up to the content
// column's full width, with headroom for high-DPI screens.
export const FULL_WIDTH_IMAGE_WIDTHS = [640, 960, 1280, 1600, 2000];
export const FULL_WIDTH_IMAGE_SIZES = '(max-width: 900px) 100vw, 1400px';

// PhotoInline: image sits in one half of a two-column row above 700px,
// full width below it (the layout's own stacking breakpoint).
export const INLINE_IMAGE_WIDTHS = [400, 600, 800, 1100];
export const INLINE_IMAGE_SIZES = '(max-width: 700px) 100vw, 700px';

// Gallery: square grid tiles, typically 240–420px depending on column
// count. Sized generously enough to stay sharp at 2 columns on mobile.
export const GALLERY_IMAGE_WIDTHS = [300, 450, 600, 900];
export const GALLERY_IMAGE_SIZES = '(max-width: 600px) 45vw, (max-width: 1000px) 30vw, 400px';
