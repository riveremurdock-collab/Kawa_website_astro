# Layout audit

Phase 0 of the blog & portfolio layout cleanup. Records the state of the block
system, every `PhotoInline` usage due for retirement, and where the current
widths are set. Phases 1–3 read this file and `image-manifest.json` rather than
re-deriving any of it.

Image dimensions are available at build time — every content image is a local
import through `astro:assets` — but `image-manifest.json` is written anyway so
layout decisions can be made without a build. It covers 61 images: 24 portrait,
14 landscape, 14 panoramic, 9 square-ish.

---

## Block components

All live in `src/components/blocks/` and are registered in
`src/components/blocks/registry.ts`. Registration is the only wiring; no page
imports a block directly.

| Block | Props | Renders | Articles | Portfolio |
|---|---|---|---|---|
| `LeadImage` | `src`, `alt` | One image, uncropped, `max-height: 80vh`, `loading="eager"` | 0 | 5 |
| `Gallery` | `images[{src, alt, caption?}]` | Grid of images at natural proportions | 0 | 4 |
| `PhotoInline` | `src`, `alt`, `text?`, `caption?` | Image beside text, two equal columns | 12 | 0 |
| `RouteMap` | `gpxFile`, `title?`, `showElevation?`, `height?` | GPX map, elevation profile, distance/elevation stats | 1 | 0 |
| `InstagramEmbed` | `url` | One Instagram post, centred, 480px | 0 | 0 |
| `InstagramInline` | `url`, `text` | Instagram post beside text, two equal columns | 0 | 0 |

Everything except `RouteMap` and the two Instagram blocks marks its images
`data-lightbox-group="page"` and so joins the page's lightbox sequence.

### Not block components

- **Plain Markdown images** — 22 across both collections. Not a shortfall in
  the block system: `src/lib/rehype-lightbox-images.ts` deliberately gives them
  the same lightbox marker and responsive `srcset` the blocks apply, and tags
  their wrapping `<p>` with `.content-image-block` so the stylesheet can treat
  that paragraph as a picture frame rather than prose.
- **Hand-written HTML** — none. Every content file is Markdown plus blocks.

---

## PhotoInline usages

All 12, in document order. `text` is reproduced verbatim; this is the prose that
Phase 2 relocates into the document body, character-identical.

### `articles/about/index.mdx`

**Line 14** — `src=kawaDisplay`, 117 words, no caption
`alt`: "Kawa Designs gear display"

> I first got into making bags about nine years ago when I was in high school. I grew up in Moab, Utah and would often go on canyoneering, backpacking, and bikepacking trips out in the desert. The rugged and rocky terrain is hard on gear, and things get quickly destroyed, so designing and making gear that could hold up to that environment was an appealing challenge. My good friends in town, the Nicholaisens, owned the gear company Nunatak and would let me use their industrial machines to learn how to sew. I made my first canyoneering backpack out of scrap material from around the shop, and was hooked. I have been making my own gear ever since.

### `articles/piolet-bike-check/index.mdx`

**Line 25** — `src=piolet12`, 101 words, no caption
`alt`: "Full bike shot showing the custom muted green paint against red desert terrain"

> The first thing I did when I got my frame was repaint it. I wanted to give it some more character and had the idea to give it a pitted metal look after seeing a similar paint job done on a classic track bike. I made the underlying color a muted green, in the sunlight it looks like a mossy boulder, but my favorite part of the new paint is the nice pebble texture it has. I tried to find as many other natural colored parts to match the aesthetic, like brown anodized Wolf Tooth cages and brown cotton grip tape.

**Line 31** — `src=piolet22`, 123 words, caption "Pebble paint texture and dynamo light detail"
`alt`: "Close-up of the fork and headtube showing the pebble paint texture and Sinewave dynamo light"

> I chose the Velo Orange Campeur rack for its solid attachment and fender integration, but it also looks great. I have Tanaka fenders mounted to the underside of the rack, cut extra short for off-road use. My dynamo hub and Sinewave light add to the bike's self-reliability, on long rides and tours I'm able to create my own power and never need to charge my light. For brakes I wanted to make the best feeling mechanical system I could, so I could feel more confident while loaded on steep descents. I'm using Paul levers and Growtac brake calipers with Jagwire Elite Link housing. With this setup I get more than enough power, and it honestly feels better than many hydraulic brakes I've used.

**Line 41** — `src=piolet16`, 141 words, no caption
`alt`: "Close-up of the waxed canvas pannier with the leather framebag visible behind"

> I wanted to give my bike the same timeless sturdy feeling and look, and was interested to test how far you could push natural fabrics like cotton and leather. I designed my panniers to look and function like many of the horse panniers I have used, with a flap covered rolltop, waxed canvas, metal hardware, and dowels in the back keeping structure. Part of the reason I liked the Piolet geometry is the extra long chainstays, which keeps panniers more stable. I made them wider than normal to use some of the extra length of the frame, but also kept them low profile. This shape gives the panniers a large volume but also makes it easy to walk next to the bike and keeps them from getting caught on brush. So far they have been solid and stable on any terrain.

**Line 45** — `src=piolet09`, 113 words, caption "Custom leather framebag"
`alt`: "Close-up of the custom leather framebag laced to the Piolet frame"

> For the framebag I decided to go with leather, a first for me, as I had never worked with leather before. It was definitely tricky to learn, but it was a super fun bag to make and I will definitely be working with leather more after this. One of the hardest parts was the final step of turning the bag inside out. With the thick leather and reinforced edges it was a real workout to get everything in place. After sewing it I waxed it to condition it and help keep it waterproof. I've taken the bags on quite a few trips so far and they have exceeded my expectations for natural materials.

**Line 53** — `src=piolet06`, 57 words, caption "Resting against the sandstone"
`alt`: "The Piolet laid on its side against a towering red sandstone wall"

> Riding over that landscape gave me the same feeling of exploration and independence that made me fall in love with biking in the first place. The bike rolled smoothly beneath me, letting me take in the miles of redrock passing by, and brought me back at the end of a long day ready for the next ride.

### `articles/ragslod-attempt/index.mdx`

**Line 28** — `src=ragslod9`, 156 words, no caption
`alt`: "Thomas biking"

> The crew for this mission was my friend Thomas and myself. Thomas has plenty of experience doing painful long rides, so naturally it was his idea. Not only would we be doing this extremely long ride in one day, but also during Winter. We would have minimal daylight, cold temperatures, and questionable weather. I was skeptical of doing the ride at first, for many good reasons, but as a type two fun enjoyer myself I was eventually persuaded to join Thomas on the ride. Thomas had attempted this ride with a group last year, but due to a few factors, including him falling in the lake, they weren't able to complete the ride. They were attempting to do the ride in two days — we hoped that having less gear to carry would let us do the ride easier than that attempt. This would also hopefully let us stay in the cold temps for less time.

**Line 42** — `src=ragslod8`, 50 words, caption "Rivers Crosscheck"
`alt`: "Rivers Crosscheck loaded up for the ride"

> For my bag setup I sewed a new mini framebag to carry tools and snacks, and used one of my micro panniers as a saddlebag to carry jackets and extra food. On my bars I had a small bar bag with accessories like gloves, sunglasses, sunscreen, and some more snacks.

**Line 48** — `src=ragslod7`, 143 words, caption "Thomas biking on a dirt road"
`alt`: "Thomas biking on a dirt road outside Delle"

> After a couple hours of riding on frontage roads, the sky started lighting up, and the mists started to evaporate. The morning mists still clung to the hills and rock formations as we passed, creating fantastical looking environments that looked like something from the Lord of the Rings. Even though we had just left the city it was starting to feel like we were leaving civilization. Eventually we reached our last resupply point, the Delle gas station. This was 60 miles into our ride, and was the start of the dirt roads. We stopped here for a while to warm up, dry off, and eat a delicious breakfast of gas station coffee, candy bars, and cold tamales. After finishing breakfast, and getting some funny stares from some of the Delle locals, we got back on the bikes and started down a sandy road.

**Line 62** — `src=ragslod3`, 156 words, no caption
`alt`: "Blood-red pools and white salt flats on the lakebed seen from the causeway"

> The landscape around me kept getting more and more alien as we neared the other side of the causeway. Pure white salt flats were cut by blood red pools and streams of water, in the far distance mountain tops rose over the lake. The landscape was like looking at an ancient dying animal, majestic and somber. Finally we reached the other side, rising up to meet us at the end was the West Desert Pumping Station. This giant now abandoned pump station was built in the 80s — at this time record rainfall caused lake levels to grow beyond normal levels, flooding towns like Farmington on the lake edge. As an emergency project the government built the giant pump station to empty the lake into the next basin, reducing flooding. It has not been used since, and now sits miles from the lakeshore, looking out of place in the middle of a mostly dry desert landscape.

**Line 64** — `src=ragslod4`, 86 words, caption "Far side of the causeway"
`alt`: "Resting at the far end of the causeway"

> I was relieved to finally leave the rocky surface of the causeway and get onto some smooth dirt roads. We rode up onto a hill overlooking the tracks and sat down for a much needed stretch and food break. As I ate my packet of tuna and some bars I felt much better, but I also had the realization that there was no turning back now. We were as far away from civilization as we could get, and the only way out was to keep going.

**Line 70** — `src=ragslod2`, 83 words, caption "The Hogup Mountains"
`alt`: "The Hogup Mountains at dusk"

> Since noon it had been a pleasant warm temperature, probably in the mid 50s, but after dropping down the pass the temperature started to quickly drop. After riding for a while longer along shore, the light started to dim as the sun went down. The sky made a beautiful gradient above the sagebrush desert as it transitioned into night. At this point we were at around mile 140, still with over 100 miles to go if we were going to finish the loop.

---

## Positional language

Scanned all 12 `text` values for words that describe where something sits:
*left, right, beside, alongside, next to, adjacent, pictured, shown here, seen
here, above, below, this photo, this image, this shot, here you can see, top,
bottom, opposite.*

**Three matches, all false positives.** No usage refers to the layout, so
nothing here is broken by stacking and **no file needs manual correction.**
Listed so the finding can be confirmed rather than taken on trust:

| File | Line | Term | Context | Reading |
|---|---|---|---|---|
| `piolet-bike-check` | 41 | next to | "makes it easy to walk **next to** the bike" | Walking beside the bike, not layout |
| `ragslod-attempt` | 48 | left | "we had just **left** the city" | Past tense of *leave* |
| `ragslod-attempt` | 70 | above | "a beautiful gradient **above** the sagebrush desert" | Describes the sky |

---

## Current widths

| Thing | Width | Set in |
|---|---|---|
| Page content box | `1400px`, padding `52px 80px` → 1240px inner | `--content-max-width`, `InnerPageLayout.astro` |
| Text column | `900px`, centred | `--content-text-width`, `global.css` |
| Running prose | `70ch`, at the text column's left edge | `--content-measure`, `global.css` |
| `PhotoInline` | Text column width, split two equal columns | `global.css` + `PhotoInline.astro` |
| Photos, grids, map | Full 1240px | `grid-column: 1 / -1`, `global.css` |
| Image height cap | `80vh` | `--content-image-max-height`, `global.css` |

`.article-body` is a three-track grid — `minmax(0,1fr) / min(900px,100%) /
minmax(0,1fr)` — with media opting into `grid-column: 1 / -1`.

**Three widths are in play (1240 / 900 / 70ch), where the target model wants
two.** Phase 1 collapses these: media takes `--content-width`, text takes
`--measure`, derived from it.

Dead rule worth knowing about: `.article { max-width: 800px }` in `global.css`
matches nothing — `PostLayout.astro` renders a bare `<article>` with no class.

## Grid column count

`Gallery` derives columns from child count, capped at three:

| Children | 1 | 2 | 3 | 4 | 5 | 6 | 7+ |
|---|---|---|---|---|---|---|---|
| Columns | 1 | 2 | 3 | 2 | 3 | 3 | 3 |

Four goes to 2×2 rather than 3+1, since a row of one reads as a mistake. Counts
that can't divide evenly leave a short final row, which centres — the layout is
flex, not grid, precisely so that row centres instead of leaving a hole. Steps
to two columns at 900px and one at 560px. Images keep their own proportions;
nothing is cropped.

---

## Files in scope

| File | Lead | Gallery (imgs) | PhotoInline | Markdown imgs | RouteMap |
|---|---|---|---|---|---|
| `articles/about` | 0 | 0 | **1** | 0 | 0 |
| `articles/piolet-bike-check` | 0 | 0 | **5** | 4 | 0 |
| `articles/ragslod-attempt` | 0 | 0 | **6** | 2 | 1 |
| `portfolio/crs-brochure` | 1 | 0 | 0 | 14 | 0 |
| `portfolio/custom-panniers` | 1 | 1 (3) | 0 | 0 | 0 |
| `portfolio/kawa-logo-design` | 1 | 1 (2) | 0 | 1 | 0 |
| `portfolio/kawa-x-hitch` | 1 | 1 (15) | 0 | 0 | 0 |
| `portfolio/vest-pack` | 1 | 1 (2) | 0 | 1 | 0 |

All 12 `PhotoInline` usages are in the blog; the portfolio has none. Portfolio
block usage already satisfies the Phase 3 rules — panoramas stand alone, no
single-image grids, no grids of clashing ratios.

## Caption convention

`caption` is a real convention: 7 of 12 `PhotoInline` usages carry one, and
`Gallery` accepts one per image (though no portfolio gallery currently uses it).
It renders as a `<figcaption>` and is the only caption text the lightbox shows.

Separately, all 22 Markdown images carry title text — `![alt](src "title")` —
which renders as a browser tooltip only, never a visible caption and never in
the lightbox. Two half-conventions rather than one.
