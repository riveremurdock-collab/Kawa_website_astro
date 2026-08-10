# Blog — Authoring Guide

This guide explains how to add and edit posts in the blog. It assumes no prior knowledge of Markdown or code. If something isn't working, see the section on errors at the bottom.

For everything about images, imports, and blocks (galleries, route maps, Instagram embeds), see [`src/content/BLOCKS.md`](../BLOCKS.md) — this guide covers the parts specific to blog posts.

---

## Where a new post folder goes

Every post lives in its own folder inside:

```
src/content/articles/
```

That folder contains one text file named `index.mdx` and the images the post uses.

---

## Folder and file naming rules

The folder name becomes the URL of the post. Rules:

- Use **lowercase letters and hyphens only** — no spaces, no punctuation, no capital letters.
- Choose something descriptive that won't change. Renaming the folder later breaks any links to the post.
- The main text file inside the folder must always be named `index.mdx`.

Example: a post called "Winter Bikepacking Trip" would go in a folder named `winter-bikepacking-trip`, and the URL would be `yoursite.com/articles/winter-bikepacking-trip`.

Copy `TEMPLATE.mdx` in this folder as a starting point for a new post.

---

## Which image formats are accepted

- **JPEG / JPG** — best for photographs
- **PNG** — best for images with transparency or sharp edges
- **WebP** — smaller file size, works in all modern browsers

Avoid very large files (over 8MB per image). The site will resize and optimize images automatically, but starting from a huge file wastes build time.

Do not use HEIC files (the default format from iPhone when set to "High Efficiency"). Export or convert to JPEG first using your phone's sharing options or the macOS Photos app.

---

## How to fill in each frontmatter field

At the top of every `index.mdx` is a block between two lines of `---`. This is called the frontmatter.

**`title`**
The post title. Appears at the top of the post, on its grid tile on the blog index, and in the sidebar list on other posts' pages.
```
title: My Winter Bikepacking Trip
```

**`date`**
The date used to sort posts — newer dates appear first in the sidebar. Format `YYYY-MM-DD`.
```
date: 2026-01-15
```

**`excerpt`**
One or two sentences summarizing the post. This is what shows up in search engine results and link previews (e.g. when the link is shared on social media) — it's not shown directly on the page itself, so it's worth writing deliberately rather than just reusing the first sentence.
```
excerpt: A three-day winter bikepacking trip through the desert, and everything that went wrong with the water filter.
```

**`tags`**
One or more tags describing the post. Drives both the filter box on the blog index grid and the sidebar tag filter shown on other posts' pages. Restricted to a known list — this catches typos before they turn into a broken filter. The current list lives in `src/content/config.ts` and is currently: `about`, `cool-bikes`, `trip-report`, `utah`, `biking`.
```
tags:
  - trip-report
  - utah
```
If you need a genuinely new tag, it has to be added to `config.ts` first. Writing a tag that isn't on the list fails the build with an error naming the field and the file.

**`cover`**
The square thumbnail image shown on the post's tile on the blog index. Must be a file in the same folder as `index.mdx`, referenced with a `./` prefix — same convention as portfolio's `cover` field. The site crops it to a square automatically, using the center of the image.
```
cover: ./01.jpg
```

**`draft`**
Set to `true` to hide the post from the blog while you're still working on it. Set to `false` (or leave it out — it defaults to `false`) when ready to publish. The post's page still exists at its URL either way, useful for previewing.
```
draft: false
```

A complete frontmatter block looks like this:
```
---
title: My Winter Bikepacking Trip
date: 2026-01-15
excerpt: A three-day winter bikepacking trip through the desert, and everything that went wrong with the water filter.
tags:
  - trip-report
  - utah
cover: ./01.jpg
draft: false
---
```

---

## Writing the post

Below the frontmatter, write plain paragraphs — leave a blank line between them. Use `###` for a subheading. Drop in images and blocks wherever they make sense in the writing; there's no fixed template to follow. See [`BLOCKS.md`](../BLOCKS.md) for the full list of blocks and copy-paste examples, including:

- A plain photo inside the text (standard Markdown, optimized automatically, and part of the clickable lightbox automatically too — no import line needed just to get that)
- `<Photo>` — one photo on its own, with an optional caption, part of the lightbox
- `<Gallery>` — a grid of several photos, part of the lightbox
- `<RouteMap>` — an interactive map + elevation chart for a GPX route. Put the `.gpx` file in `public/gpx/` and reference it by path — see BLOCKS.md.
- `<InstagramEmbed>` / `<InstagramInline>` — an embedded Instagram post

---

## What alt text is and why it matters

The text in `alt:` for each image does three things:

1. **Screen readers** read it aloud for people who can't see the image.
2. **Search engines** use it to understand what the image shows.
3. **Broken image fallback** — if the image fails to load, this text is shown instead.

Write alt text as a short, factual description of what the image actually shows.

---

## What to do when the build reports an error

**An error naming an `import` line and a file that doesn't resolve**
A filename in an `import` line doesn't match any file in that post's folder — see BLOCKS.md for a real example of what this looks like. Check the spelling exactly, including the file extension.

**"Required field missing" or a Zod error naming a file**
A required frontmatter field (`title`, `date`, `excerpt`, `cover`) is missing or blank. Open that `index.mdx` and add it.

**An error about `tags` and "invalid enum value"**
A tag isn't on the approved list. Check the spelling against `src/content/config.ts`.

**"Invalid date format"**
The `date:` field isn't in `YYYY-MM-DD` format.

**Something else**
Copy the error message and look for a filename near the top — that's usually the file with the problem.

---

## Quick checklist for a new post

- [ ] Create a new folder in `src/content/articles/` with a lowercase, hyphenated name
- [ ] Copy `TEMPLATE.mdx` into it and rename to `index.mdx`
- [ ] Fill in all required frontmatter fields: `title`, `date`, `excerpt`, `tags`, `cover`
- [ ] Add image files to the folder
- [ ] Add an `import` line for each image you'll use with a block
- [ ] Write the post, placing images/blocks where they read best
- [ ] Write alt text for every image
- [ ] Set `draft: false` when ready to publish
- [ ] Run the build and check for errors
