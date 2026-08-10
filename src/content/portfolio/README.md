# Portfolio — Authoring Guide

This guide explains how to add and edit projects in the portfolio section of the site. It assumes no prior knowledge of Markdown or code. If something isn't working, see the section on errors at the bottom.

For everything about images, imports, and blocks (galleries, route maps, Instagram embeds), see [`src/content/BLOCKS.md`](../BLOCKS.md) — this guide covers the parts specific to portfolio projects.

---

## Where a new project folder goes

Every project lives in its own folder inside:

```
src/content/portfolio/
```

That folder contains one text file named `index.mdx` and the images the project uses.

---

## Folder and file naming rules

The folder name becomes the URL of the project page. Rules:

- Use **lowercase letters and hyphens only** — no spaces, no punctuation, no capital letters.
- Choose something descriptive that won't change. Renaming the folder later breaks any links to the project.
- The main text file inside the folder must always be named `index.mdx` (not `.md` — see BLOCKS.md for why).

Example: a project called "Trail Camera Rig" would go in a folder named `trail-camera-rig`, and the URL would be `yoursite.com/portfolio/trail-camera-rig`.

Copy `TEMPLATE.mdx` in this folder as a starting point for a new project.

---

## Which image formats are accepted

- **JPEG / JPG** — best for photographs
- **PNG** — best for images with transparency or sharp edges
- **WebP** — smaller file size, works in all modern browsers

Avoid very large files (over 8MB per image). The site will resize and optimize images automatically, but starting from a huge file wastes build time.

Do not use HEIC files (the default format from iPhone when set to "High Efficiency"). Export or convert to JPEG first using your phone's sharing options or the macOS Photos app.

---

## How to fill in each frontmatter field

At the top of every `index.mdx` is a block between two lines of `---`. This is called the frontmatter. Each line sets one piece of information about the project.

**`title`**
The project name. Appears on the grid tile and at the top of the project page.
```
title: Trail Camera Rig
```

**`date`**
The date used to sort projects on the grid — newer dates appear first. Use the format `YYYY-MM-DD`. If you only know the year, use January 1.
```
date: 2025-01-01
```

**`client`**
Who the project was made for. Shown on the detail page.
```
client: Personal Project
```

**`tags`**
One or more tags that describe the project type. Tags drive the filter buttons on the portfolio page. Unlike some fields, tags are **restricted to a known list** — this catches typos before they turn into a broken-looking phantom filter button. The current list lives in `src/content/config.ts` and is currently: `Product Design`, `Graphic Design`. A project can have more than one.
```
tags:
  - Product Design
```
Or for multiple tags:
```
tags:
  - Product Design
  - Photography
```
If you need a genuinely new tag (not currently on the list, not a typo of an existing one), it has to be added to `config.ts` first — a one-line edit, or ask for help with it. Writing a tag that isn't on the list will fail the build with an error naming the field and the file.

**`cover`**
The image used as the square thumbnail on the grid. Must be a file in the same folder as `index.mdx`, referenced with a `./` prefix. The site crops it to a square automatically, using the center of the image.
```
cover: ./01.jpg
```

**`draft`**
Set to `true` to hide the project from the grid while you're still working on it. Set to `false` when you're ready to publish. If you leave this line out entirely, it defaults to `false`.
```
draft: false
```

A complete frontmatter block looks like this:
```
---
title: Trail Camera Rig
date: 2025-01-01
client: Personal Project
tags:
  - Product Design
cover: ./01.jpg
draft: false
---
```

---

## How images and layout work now

Unlike before, a project page is **not locked to a fixed template**. Below the frontmatter, you write the description as plain paragraphs and then place images and blocks in whatever order makes sense for that project — full reference and copy-paste examples are in [`BLOCKS.md`](../BLOCKS.md).

The pattern used by every current project, and a reasonable default for a new one: one full-width `<Photo>` right after the description, then the remaining photos in a `<Gallery>`. But nothing requires that shape anymore — you could put a `<Gallery>` first, break up the description with images in between, or anything else that reads well for that project.

To use an image with `<Photo>` or `<Gallery>`, it needs an `import` line first — see BLOCKS.md for exactly what that means and why. A plain image can still be dropped in with standard Markdown (`![alt text](./01.jpg)`), no import needed, and it's part of the clickable fullscreen lightbox automatically — the one thing it won't have is a caption in the lightbox viewer (that needs `<Photo>` or `<Gallery>`, both of which accept one).

---

## How to name image files

Name images with two-digit sequential numbers:

```
01.jpg
02.jpg
03.jpg
```

The numbers no longer dictate display order by themselves (you control that by where you place each image in the body) — this is just a simple, consistent naming convention. Use the correct file extension for the format: `.jpg` for JPEGs, `.png` for PNGs.

---

## How the filter buttons work

The portfolio index page shows filter buttons for "Graphic Design," "Product Design," and any other tag on the approved list (see the `tags` field above) that appears on at least one published project. You do not need to manage a list of tiles anywhere — the site builds the buttons automatically from the tags in your project files. The buttons sit centered below the bio text.

Clicking a filter button hides non-matching tiles and reflows the grid closed — the grid never leaves empty gaps where hidden tiles used to be.

---

## The project grid is a shared component

The grid itself lives in `src/components/ProjectGrid.astro`, not in the portfolio page — it takes a list of items as input rather than reading the portfolio folder directly. This is so the blog index can use the same grid look and behavior in the future. Doesn't change anything about how you author a project.

---

## What alt text is and why it matters

The text in `alt:` for each image does three things:

1. **Screen readers** read it aloud for people who can't see the image.
2. **Search engines** use it to understand what the image shows.
3. **Broken image fallback** — if the image fails to load, this text is shown instead.

Write alt text as a short, factual description of what the image actually shows.

Good: `The finished pannier mounted on the rear rack of a touring bike`
Too vague: `Image`
Too long: `A beautiful photo of the waxed canvas pannier that I sewed myself, shown on my touring bicycle in the mountains`

---

## Using the draft flag

Setting `draft: true` hides the project from the portfolio grid and from the previous/next navigation between projects. The project page itself still exists at its URL — useful for previewing before publishing.

When you're ready to make a project public, change `draft: true` to `draft: false` and rebuild the site.

---

## What to do when the build reports an error

When the build fails, the error message tells you exactly what went wrong and where. Read it top to bottom.

**An error naming an `import` line and a file that doesn't resolve**
A filename in an `import` line doesn't match any file in that project folder — see BLOCKS.md for a real example of exactly what this looks like. Check the spelling exactly, including the file extension — filenames are case-sensitive on most systems.

**"Required field missing" or a Zod error naming a file**
A required frontmatter field (`title`, `date`, `client`, `cover`) is missing or blank in the file it names. Open that `index.mdx`, find the missing field, and add it.

**An error about `tags` and "invalid enum value"**
A tag isn't on the approved list. Check the spelling against `src/content/config.ts`, or see the `tags` section above about adding a genuinely new one.

**"Invalid date format"**
The `date:` field isn't in `YYYY-MM-DD` format. Example of the right format: `2025-01-01`.

**Something else**
Copy the error message and look for a filename near the top — that's usually the file with the problem. If the error mentions a line number, open that file and go to that line.

---

## Quick checklist for a new project

- [ ] Create a new folder in `src/content/portfolio/` with a lowercase, hyphenated name
- [ ] Copy `TEMPLATE.mdx` into it and rename to `index.mdx`
- [ ] Fill in all required frontmatter fields: `title`, `date`, `client`, `tags`, `cover`
- [ ] Add image files to the folder
- [ ] Add an `import` line for each image you'll use in the body
- [ ] Write the description, then place `<Photo>` / `<Gallery>` (or other blocks) in the body
- [ ] Write alt text for every image
- [ ] Set `draft: false` when ready to publish
- [ ] Run the build and check for errors
