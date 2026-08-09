import { visit } from 'unist-util-visit';
import type { Root, Element } from 'hast';

/**
 * Marks every <img> produced by Markdown image syntax (![]()) with the
 * same data-lightbox-group attribute blocks apply to their own images —
 * so gallery.js has one marker to read, not a second scheme to special-case.
 *
 * Runs as an MDX rehype plugin, before @astrojs/mdx's own image-to-component
 * conversion (rehype-images-to-component.js). That conversion generically
 * copies every existing property on an <img> node onto the <Image> component
 * call it generates, so this marker survives unchanged through to the final
 * optimized <img> output.
 *
 * An image the author wants excluded from the lightbox should be written as
 * an explicit <Image> component instead of ![]() — see BLOCKS.md. That's a
 * different node type at the point this plugin runs, so it's structurally
 * skipped, the same way RouteMap/InstagramEmbed opt out by simply not
 * marking themselves.
 */
export function rehypeLightboxImages() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName !== 'img') return;
      node.properties['data-lightbox-group'] = 'page';
    });
  };
}
