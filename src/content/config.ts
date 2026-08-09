import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const ARTICLE_TAGS = ['about', 'cool-bikes', 'trip-report', 'utah', 'biking'] as const;
const PORTFOLIO_TAGS = ['Product Design', 'Graphic Design'] as const;

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
  schema: () => z.object({
    ...basePageFields(ARTICLE_TAGS),
    excerpt: z.string(),
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
