import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    excerpt: z.string(),
    images: z.array(z.object({
      src: z.union([image(), z.string()]),
      alt: z.string(),
      caption: z.string().optional(),
    })).optional(),
    gpxRoute: z.object({
      file: z.string().optional(),
      title: z.string().optional(),
      showElevation: z.boolean().default(true),
      mapHeight: z.string().default("450px"),
    }).optional(),
  }),
});

export const collections = { articles };
