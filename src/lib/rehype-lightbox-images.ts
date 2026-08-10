import { visit } from 'unist-util-visit';
import type { Root, Element } from 'hast';
import { FULL_WIDTH_IMAGE_WIDTHS, FULL_WIDTH_IMAGE_SIZES } from './content-image-sizes';

/**
 * Marks every <img> produced by Markdown image syntax (![]()) with the
 * same data-lightbox-group attribute blocks apply to their own images —
 * so gallery.js has one marker to read, not a second scheme to special-case.
 * Also gives it a bounded responsive srcset, since plain Markdown images
 * have no props an author could set one through directly.
 *
 * Runs as an MDX rehype plugin, before @astrojs/mdx's own image-to-component
 * conversion (rehype-images-to-component.js). That conversion generically
 * copies every existing property on an <img> node onto the <Image> component
 * call it generates — `widths` specifically gets space-split into an array,
 * everything else (including `sizes`) passes through as a plain string prop
 * — so these all survive unchanged through to the final optimized output.
 *
 * An image the author wants excluded from the lightbox (and this sizing)
 * should be written as an explicit <Image> component instead of ![]() — see
 * BLOCKS.md. That's a different node type at the point this plugin runs, so
 * it's structurally skipped, the same way RouteMap/InstagramEmbed opt out of
 * the lightbox marker by simply not marking themselves.
 */
export function rehypeLightboxImages() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element, _index, parent) => {
      if (node.tagName !== 'img') return;
      node.properties['data-lightbox-group'] = 'page';
      node.properties['width'] = String(FULL_WIDTH_IMAGE_WIDTHS.at(-1));
      node.properties['widths'] = FULL_WIDTH_IMAGE_WIDTHS.join(' ');
      node.properties['sizes'] = FULL_WIDTH_IMAGE_SIZES;

      // Markdown wraps a lone image in a paragraph. That paragraph is a
      // picture frame, not prose, and the stylesheet has to tell the two
      // apart to give it the full content width instead of the reading
      // measure. Tagging it here is what makes that distinction explicit —
      // the alternative, matching `p:has(> img)` in CSS, is a selector the
      // minifier is free to rewrite, and did.
      if (
        parent?.type === 'element' &&
        parent.tagName === 'p' &&
        parent.children.every(
          child =>
            child === node ||
            (child.type === 'text' && child.value.trim() === '')
        )
      ) {
        parent.properties ??= {};
        parent.properties['class'] = 'content-image-block';
      }
    });
  };
}
