import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const ARTICLE_TAGS = ['about', 'cool-bikes', 'trip-report', 'utah', 'biking'] as const;
const PORTFOLIO_TAGS = ['Product Design', 'Graphic Design', 'Photography'] as const;

// Fields every content page shares. Tags are constrained per collection —
// articles and portfolio use different, unrelated vocabularies, so each
// collection passes in its own set of allowed values rather than sharing one.
function basePageFields<T extends readonly [string, ...string[]]>(tagValues: T) {
  return {
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.enum(tagValues)).default([]),
    draft: z.boolean().default(false),
  };
}

const articles = defineCollection({
  loader: glob({ pattern: '**/index.mdx', base: './src/content/articles' }),
  schema: ({ image }) => z.object({
    ...basePageFields(ARTICLE_TAGS),
    excerpt: z.string(),
    cover: image(),
    // 'photobook' renders the post as full-screen photo pages you slide
    // between (BookPage blocks) instead of a scrolling article.
    // (Not called `layout`: in MDX frontmatter that name is reserved for a layout file path.)
    format: z.enum(['standard', 'photobook']).default('standard'),
  }),
});

const portfolio = defineCollection({
  loader: glob({ pattern: '**/index.mdx', base: './src/content/portfolio' }),
  schema: ({ image }) => z.object({
    ...basePageFields(PORTFOLIO_TAGS),
    client: z.string(),
    cover: image(),
  }),
});

export const collections = { articles, portfolio };
