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
<Photo src={img01} alt="Vest pack technical mockup in Adobe Illustrator" />
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

## Two ways to place a photo, and nothing else

Every image on the site is either a `<Photo>` (one photo on its own) or a
cell in a `<Gallery>` (a row of photos side by side). That's the whole
vocabulary. **Markdown image syntax — `![alt](./photo.jpg)` — is no longer
used anywhere**; if you're copying from an old post, convert it to `<Photo>`.

**You never import the blocks themselves.** `Photo`, `Gallery`, `RouteMap`
and the Instagram blocks are registered once in
`src/components/blocks/registry.ts` and are available in every `.mdx` file
automatically. The only thing a file imports is its *images* — one `import`
line per photo, as described above.

Three things that will trip you up if you get them wrong:

**1. `src` takes an expression, in curly braces — not a quoted filename.**

```mdx
<Photo src={img01} alt="…" />     ✅  the name from the import line
<Photo src="./01.jpg" alt="…" />  ❌  will not work
```

`alt`, `caption` and `title` are ordinary text and *do* take quotes. Only
`src` is different, because it refers to the imported image rather than
naming a file.

**2. Leave a blank line above and below every block.**

```mdx
Some paragraph of writing.

<Photo src={img01} alt="…" />

The next paragraph.
```

Without the blank lines the block and the text run together and the page
either fails to build or renders the tag as literal text.

**3. Every photo is in the fullscreen lightbox automatically**, in the order
it appears on the page — `<Photo>` and `<Gallery>` images mixed together in
one sequence. There's no step to opt in.

**If you want one specific image to *not* be part of the lightbox** — a
small decorative photo, say — write it as an `<Image>` component:

```mdx
import { Image } from 'astro:assets';
import quietPhoto from './quiet-photo.jpg';

<Image src={quietPhoto} alt="A short description" />
```

Still fully optimized, just not clickable. This one needs two import lines
(`Image` from `astro:assets`, plus your photo) since it's a genuine opt-out,
not the default — reach for it rarely.

---

## Available blocks

### `Photo` — one photo on its own

The way to place a single image in the flow, anywhere on the page. Part of
the lightbox.

```mdx
import mainShot from './01.jpg';

<Photo src={mainShot} alt="Waxed canvas touring panniers mounted on bike" />
```

With a caption, and set to load immediately because it's the first thing on
the page:

```mdx
<Photo
  src={mainShot}
  alt="Waxed canvas touring panniers mounted on bike"
  caption="The finished panniers, mounted"
  eager
/>
```

| Prop | Type | Required | Notes |
|---|---|---|---|
| `src` | imported image, in `{ }` | yes | The name from the `import` line |
| `alt` | text | yes | |
| `title` | text | no | Hover tooltip. Not visible on the page and not shown in the lightbox — this is the text that used to go after the filename in Markdown image syntax |
| `caption` | text | no | Visible under the photo, and in the lightbox viewer. Nothing on the site currently uses one |
| `eager` | true/false | no | Defaults to `false`. Add it for the photo at the very top of a page, so it loads immediately instead of waiting to be scrolled to. Leave it off everywhere else — otherwise a page with six photos downloads all six before the reader has seen any of them |

A photo fills the full width of the image area whatever the size of the
original file, and is never cropped. The one exception is a very tall photo:
those are capped at a little over one screen high, and a photo that hits the
cap sits narrower than the rest, centred. Pairing a tall photo with another
in a `<Gallery>` is usually the nicer fix.

### `Gallery` — a grid of images

Photos side by side in a row. Every image is part of the lightbox, in the
order listed.

**Rows are justified.** Every photo in a row is scaled to the same height and
the row fills the full width exactly, edge to edge — wider photos take
proportionally more of the row, taller ones less. Nothing is cropped,
stretched or letterboxed to make that work, so **you can put any photos
together regardless of orientation**; a portrait beside a landscape is fine
and looks deliberate.

Up to three per row: two images make one row of two, four make two rows of
two, and anything more goes three across. Row heights differ between rows —
a row of two portraits is much taller than a row of two landscapes — and
that's expected. On a phone, rows stack into a single column.

The one thing to keep out of a gallery is a **panorama**. A very wide photo
next to a normal one squeezes its neighbour to a sliver; put panoramas on
their own with `<Photo>`.

Note the shape of the `images` value: square brackets around the list, curly
braces around each photo, a comma after each one. `src` takes the imported
name with no quotes; the text fields are quoted.

```mdx
import detail from './02.jpg';
import mounted from './03.jpg';

<Gallery images={[
  { src: detail, alt: "Close-up of the hardware" },
  { src: mounted, alt: "Mounted on the bike", title: "Optional hover tooltip" },
]} />
```

| Prop | Type | Required | Notes |
|---|---|---|---|
| `images` | array of `{ src, alt, title?, caption? }` | yes | `src` and `alt` are required on every entry; `title` and `caption` are optional and mean the same as they do on `<Photo>` |

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

Puts an Instagram post beside a paragraph of text.

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
