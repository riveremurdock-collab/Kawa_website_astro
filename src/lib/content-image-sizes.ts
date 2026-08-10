// Responsive width presets for content images, shared across every block
// that renders one, plus the Markdown-image rehype plugin. Keeping these in
// one place means the numbers can only drift from the actual layout, never
// from each other.
//
// Reference point: --content-width in global.css is the media width, 1360px.
// These are hints for picking a source from the srcset — they never constrain
// the rendered size, which comes from the layout alone.

// A single Photo fills the media zone, whatever the source file's own pixel
// dimensions are, so the candidates run up to it with high-DPI headroom.
export const FULL_WIDTH_IMAGE_WIDTHS = [640, 960, 1280, 1600, 2000];
export const FULL_WIDTH_IMAGE_SIZES = '(max-width: 900px) 100vw, 1360px';

// Gallery rows are justified, so a cell's width depends on its own ratio
// relative to the rest of its row rather than on a fixed column count. A wide
// image beside a narrow one can take most of the row, so the candidates have
// to reach the full zone width; below the stacking breakpoint every cell is
// full width.
export const GALLERY_IMAGE_WIDTHS = [400, 640, 960, 1280, 1600];
export const GALLERY_IMAGE_SIZES = '(max-width: 700px) 100vw, (max-width: 1100px) 70vw, 900px';
