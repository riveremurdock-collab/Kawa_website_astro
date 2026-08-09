# Blocks — reference and how imports work

This applies to both collections — blog articles (`src/content/articles/`) and
portfolio projects (`src/content/portfolio/`). Both are `.mdx` files: plain
Markdown text, plus "blocks" (small reusable pieces like an image gallery or
a route map) that you can drop in anywhere by writing a tag like
`<Gallery images={[...]} />`.

---

## What an import line is, and why you need one

At the top of the body (after the closing `---` of the frontmatter), you'll
see lines like this:

```
import img01 from './01.jpg';
```

This tells the page "the word `img01` means this exact file, right here in
this folder." You then use `img01` inside a block later in the same file:

```
<LeadImage src={img01} alt="Vest pack technical mockup in Adobe Illustrator" />
```

**Why this exists instead of just writing a filename in quotes:** if you
misspell a filename in an import line, the build fails immediately with an
error naming the exact file and line — before the site ever goes live. If
blocks accepted plain filenames as text instead, a typo would just silently
show a broken image, and you might not notice until a visitor tells you.
The import line is what makes a typo a loud, immediate error instead of a
quiet, easy-to-miss one.

**How to add one when adding an image:**

1. Put the image file in the same folder as the project's `index.mdx`.
2. Add one line near the top of the body:
   `import myImageName from './the-filename.jpg';`
   (Name it whatever's clear to you — `img05`, `heroShot`, `detailClose`,
   doesn't matter, as long as it's a valid variable name with no spaces.)
3. Use `myImageName` as the `src` for a block below it.

**What the error looks like when a filename is wrong.** This is a real one —
captured by actually misspelling a filename and running the build:

```
[ERROR] [vite] Build failed.
Could not resolve "./01-typo.jpg" from "src/content/portfolio/vest-pack/index.mdx"
file: .../src/content/portfolio/vest-pack/index.mdx
```

The build stops, and the error names the exact file and the exact bad path.
Fix the filename in the `import` line (or rename the actual file to match),
save, and it resolves.

---

## Plain images vs. blocks — when to use which

For a photo inside a paragraph of writing, you can still just write normal
Markdown, no import needed:

```
![A description of the photo](./ragslod-2.jpg "Optional caption")
```

This is fully optimized automatically, same as everything else, **and it's
part of the fullscreen lightbox automatically too** — no import line, no
block, no extra step. Every image written as plain Markdown takes its place
in the lightbox sequence in the order it appears on the page, mixed in
correctly with any block images (`LeadImage`, `Gallery`, `PhotoInline`) on
the same page.

One thing plain Markdown images don't get: a caption in the lightbox
viewer. That comes from a `<figcaption>`, which only blocks produce — the
text after the filename in `![alt](src "this part")` is a native browser
tooltip on hover, not a lightbox caption. If you want a caption to show up
in the lightbox, use `<Gallery>` (which accepts one) instead.

**If you want one specific image to *not* be part of the lightbox** — a
small decorative photo, say — write it as an `<Image>` component instead of
Markdown syntax:

```mdx
import { Image } from 'astro:assets';
import quietPhoto from './quiet-photo.jpg';

<Image src={quietPhoto} alt="A short description" />
```

Still fully optimized, just not clickable. This needs both import lines
shown above (`Image` from `astro:assets`, plus your photo) since it's a
genuine opt-out, not the default — reach for it rarely.

---

## Available blocks

### `LeadImage` — one full-width image

For a single hero-style image, like the main image at the top of a project.
Part of the lightbox.

```mdx
import mainShot from './01.jpg';

<LeadImage src={mainShot} alt="Waxed canvas touring panniers mounted on bike" />
```

| Prop | Type | Required | Notes |
|---|---|---|---|
| `src` | imported image | yes | |
| `alt` | text | yes | |

### `Gallery` — a grid of images

For a set of photos shown together in a responsive grid. Every image is
part of the lightbox, in the order listed.

```mdx
import detail from './02.jpg';
import mounted from './03.jpg';

<Gallery images={[
  { src: detail, alt: "Close-up of the hardware" },
  { src: mounted, alt: "Mounted on the bike", caption: "Optional caption" },
]} />
```

| Prop | Type | Required | Notes |
|---|---|---|---|
| `images` | array of `{ src, alt, caption? }` | yes | `caption` is optional |

### `PhotoInline` — one image beside a paragraph

Pairs a photo with a block of text side-by-side (stacks on mobile). Part of
the lightbox.

```mdx
import framebagShot from './piolet-09.jpg';

<PhotoInline
  src={framebagShot}
  alt="Close-up of the custom leather framebag"
  text="For the framebag I decided to go with leather, a first for me..."
/>
```

| Prop | Type | Required | Notes |
|---|---|---|---|
| `src` | imported image | yes | |
| `alt` | text | yes | |
| `text` | text | yes | The paragraph shown next to the image |
| `caption` | text | no | Small caption under the image itself |

### `RouteMap` — an interactive GPX route map

Renders a map of a bike/hike route from a GPX file, with an elevation
profile and distance/elevation stats. Loads everything it needs on its own
— no separate setup required. Not part of the lightbox.

```mdx
<RouteMap gpxFile="/gpx/ragslod-attempt.gpx" title="RAGSLOD Attempt" />
```

The GPX file itself goes in `public/gpx/`, not next to `index.mdx` — it's
referenced by an absolute site path (`/gpx/...`), not an import.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `gpxFile` | text (path under `/gpx/`) | yes | |
| `title` | text | no | Defaults to "Route Map" |
| `showElevation` | true/false | no | Defaults to `true` |
| `height` | text (CSS height) | no | Defaults to `"450px"` |

### `InstagramEmbed` — a standalone Instagram post

```mdx
<InstagramEmbed url="https://www.instagram.com/p/XXXXXXXXXXX/" />
```

| Prop | Type | Required |
|---|---|---|
| `url` | text | yes |

### `InstagramInline` — an Instagram post beside a paragraph

Same idea as `PhotoInline`, but embeds an Instagram post instead of a photo.

```mdx
<InstagramInline url="https://www.instagram.com/p/XXXXXXXXXXX/" text="Some context about the post." />
```

| Prop | Type | Required |
|---|---|---|
| `url` | text | yes |
| `text` | text | yes |

---

## Adding a new block later

Two steps, always:

1. Create `src/components/blocks/YourBlockName.astro`, following the pattern
   of an existing block — typed props, loads its own dependencies if it has
   any, marks its own images with `data-lightbox-group="page"` if it should
   be part of the lightbox (skip this if it shouldn't — e.g. decorative or
   embed content).
2. Open `src/components/blocks/registry.ts`, add one import line and one
   entry to the `blockRegistry` object.

That's it — no page needs to import it, no other file changes. It's
available in every `.mdx` file immediately.
