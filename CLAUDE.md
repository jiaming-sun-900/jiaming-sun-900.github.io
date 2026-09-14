# CLAUDE.md

Guidance for Claude Code (claude.ai/code) when working in this repository.

## Overview

Static personal CV site for Jiaming Sun, deployed via GitHub Pages. No build
system, package manager, or framework. Hand-written HTML, CSS, and JS.

The repository was deliberately cleared in commit `568c996` and is being rebuilt
from nothing. The previous design (dark background, Libre Baskerville,
orange/teal accents, animated star canvas, four separate pages) is gone. Do not
revive any of it. Only `washu_logo.png` and `rdfz_logo.png` were kept.

## Local Development

```bash
python3 -m http.server
```

Then visit `http://localhost:8000`. Deploy by pushing to `main`. GitHub Pages
serves the repo root.

## What This Site Is

A single-page CV. A visitor arrives knowing nothing about Jiaming and should
leave knowing who he is, where he studies, what he has worked on, and how to
reach him. It is not a blog or a writing archive.

Design reference: [darioamodei.com](https://www.darioamodei.com), for its
palette, typeface, and restraint. It is a reference, not a template. Three
places where copying it would be wrong, all learned the hard way:

- **That site is an essay archive with one content type.** Its 620px column
  suits long prose, not short CV entries.
- **Its author's name is set small** (`1.44em`, weight 600) because he does not
  need to introduce himself. Jiaming's name is the anchor of a CV and is set
  large.
- **It uses light gray for secondary text.** This site does not (see Palette).

When citing a value from that site, read it out of its stylesheet rather than
guessing from a screenshot or from the swatch names. Its background is
`ivory-medium`, not the lighter `ivory-light` that the name suggests; that
mistake shipped once already.

## Design System

### Palette

**Two colors. That is the entire palette.**

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#f0eee6` warm ivory | `#1f1e1d` near-black ink |
| `--text` | `#1f1e1d` | `#f0eee6` |

Dark mode swaps the two. There is no third color, no gray for secondary text, no
accent, and never pure `#fff` or `#000`. The warmth of the ivory is where the
elegance comes from.

Where something needs to read as secondary (dates, location), use **italic** or
a lighter weight, not a lighter color. Do not reintroduce `--text-muted` or
`--text-faint`.

### Typography

**Newsreader** (Production Type, free on Google Fonts) for everything. It is a
variable font with an optical-size (`opsz`) axis, so set `font-variation-settings`
to roughly match each element's pixel size.

```html
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400..700;1,6..72,400..700&display=swap" rel="stylesheet">
```

Scale (rem base 16px):

| Role | Size | Weight |
|---|---|---|
| Name (`h1`) | 48px | 600 |
| Section heading (`h2`) | 28px | 600 |
| Entry title (`h3`) | 22px | 600 |
| Intro prose, body | 22px | 400 |
| Entry description | 20px | 400 |

**Section headings must be larger than body text.** An earlier version set them
to 15px uppercase, smaller than everything around them; it was rejected on
sight. Nothing on the page is smaller than the entry description.

Body line height is 1.65. The intro paragraph is capped at 32em so long lines do
not run to the right edge of the column.

### Measure

Content column is **760px**, wider than the reference's 620px. 620px is the
optimum for running prose; this site is mostly short entries, which look thin
and stranded in a column that narrow.

**Everything lives inside that column**, including the theme toggle. Nothing is
pinned to the viewport edge.

### Copy Rules

- **Never use an em dash on this site.** Use a colon, a period, or rewrite.
- Same for the en dash in prose. Ranges of years may use a plain hyphen.
- **Never use contractions.** Write "I am", not "I'm"; "do not", not "don't".

### Restraint Rules

- No animated backgrounds, no scroll-triggered effects, no back-to-top button,
  no cards, no shadows, no boxes.
- Icons are inline SVG using `currentColor`. Never an icon font.
- Hierarchy comes from type size, weight, and space. That is the whole toolkit.

## Theme Toggle

A single icon button at the **top right of the content column**, vertically
centered against the name, on the same line as it. A moon in light mode, a sun
in dark mode, 30px, line-style, `currentColor`, held at `opacity: 0.55` until
hover. Not fixed to the viewport, not a pill switch.

On hover both icons scale to 1.15; the moon also tilts slightly, and the sun's
rays rotate 45 degrees on a springy easing curve.

The theme change itself is pure CSS: `body` transitions `background-color` and
`color` on the same duration and curve (`--fade`, `--ease`), so ink and ground
trade places together. They necessarily meet at one shared value halfway
through, where the text is briefly invisible; the easing crosses that midpoint
quickly, which is why it is not `linear`.

- Honors `prefers-color-scheme` on first visit; remembers an explicit choice in
  `localStorage` under the key `theme`.
- The initial theme is set by an inline `<head>` script before first paint, to
  avoid a flash of the wrong theme. The external `script.js` only handles clicks.
- Honors `prefers-reduced-motion`.

Two richer transitions were built and rejected. Do not reintroduce either:

- A draggable aircraft window shade borrowed from [mikes.cv](https://www.mikes.cv):
  too much for this page.
- A diagonal wipe sweeping a band of the incoming color across the screen: it
  covered the page in flat color and read as a curtain rather than a change of
  light.

## Page Structure

One page, `index.html`, read top to bottom:

1. **Intro**: name (with the theme toggle beside it), then three or four
   sentences of real prose. Personality lives here, and this is the only prose
   on the page. The name and the intro share the first screen; a first screen
   holding nothing but a name reads as unprofessional.
2. **Projects**
3. **Work Experience**
4. **Education**
5. **Music**, only if it earns its place. Two or three entries at most.
6. **Contact**: LinkedIn, GitHub, email, with inline SVG icons.

Content per section is still being decided; the direction is to trim rather than
carry everything over from the old site. Leave `TODO:` comments where content is
pending instead of inventing filler.

## Files

- `index.html`: the entire site.
- `styles.css`: all styling. No inline `<style>` blocks.
- `script.js`: theme toggle only.
- `washu_logo.png`, `rdfz_logo.png`: kept from the old site, not yet used.

`<footer>` sits outside `<main>`, since a footer inside it would belong to that
section rather than to the page; both carry the column width. There is a
`@media print` block that forces the light palette, because a CV gets printed.

Still missing, all of which need the real copy first: a meta description, Open
Graph tags, and a favicon.

## Working Agreement

Discuss and settle design decisions before writing code. Jiaming wants to reason
through the design, not receive a finished page and react to it. Verify claimed
values against the source rather than asserting them from memory.
