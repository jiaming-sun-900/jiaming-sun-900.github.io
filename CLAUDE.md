# CLAUDE.md

Guidance for Claude Code (claude.ai/code) when working in this repository.

## Overview

Static personal site for Jiaming Sun, deployed via GitHub Pages. No build
system, package manager, or framework. Hand-written HTML, CSS, and JS.

The repository was deliberately cleared in commit `568c996` and rebuilt from
nothing. The previous design (dark background, Libre Baskerville, orange/teal
accents, animated star canvas, four separate pages) is gone. Do not revive any
of it.

## Local Development

```bash
python3 -m http.server
```

Then visit `http://localhost:8000`. Deploy by pushing to `main`. GitHub Pages
serves the repo root.

## What This Site Is

**A portfolio with a person attached, not a resume.** Jiaming has a resume and a
LinkedIn profile already; this site exists because neither of those can carry
taste. A duplicate of them would have no reason to exist.

What follows from that, and it has already changed the page once:

- **Projects lead.** They are the reason to visit. Each gets two or three
  sentences, not the one line a resume allots, and links to the running thing.
- **There is no Work Experience section.** It was written, then deleted. Listing
  every lab and internship is exactly what makes a site indistinguishable from a
  LinkedIn export. Education stays, because it is two lines and it is the only
  place the page states a plain fact about who he is.
- **The prose is his, not a summary.** Guitar and aviation are in the intro on
  purpose. Cut a claim before a specific: "I love naming aircraft types from the
  window seat" survives where "aviation enthusiast" does not.
- **Every claim on the page is checkable in one click.** Project descriptions
  are read out of the project repositories, never from memory or from the
  resume. The resume said Omni Geo Quiz had seven modes; the home screen offers
  five, and five is what the page says.

It is not a blog or a writing archive.

Design reference: [darioamodei.com](https://www.darioamodei.com), for its
palette, typeface, and restraint. It is a reference, not a template. Three
places where copying it would be wrong, all learned the hard way:

- **That site is an essay archive with one content type.** Its 620px column
  suits long prose, not a mix of prose and project entries.
- **Its author's name is set small** (`1.44em`, weight 600) because he does not
  need to introduce himself. Jiaming's name is the anchor of this page and is
  set large.
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

The scale is multiplicative, not a set of offsets. Each step is a ratio of the
body size, and if the body size changes every other size and the whitespace are
recomputed from it. An earlier request to "add 4px to everything" was carried
out and then reverted: a flat offset pulled the name from 2.40x body down to
2.17x and flattened the whole hierarchy.

| Role | Size | Ratio | Weight | `opsz` |
|---|---|---|---|---|
| Name (`h1`) | 58px | 2.40x | 600 | 60 |
| Section heading (`h2`) | 38px | 1.60x | 600 | 24 |
| Entry title (`h3`) | 29px | 1.20x | 600 | 24 |
| Body, everything else | 24px | 1.00x | 400 | 24 |

Below 700px the body is **20px** and the scale is recomputed from it:
40 / 32 / 24 / 20, or 2.00x / 1.60x / 1.20x / 1.00x. `h2` and `h3` keep their
desktop ratios exactly; only the name drops, from 2.40x to 2.00x, because at
2.40x it collides with the theme toggle on a 375px screen.

Two wrong versions came first, both worth remembering. Shrinking only the name
left `h1` at 40px against an `h2` still at 38px, five percent apart, and the
name stopped reading as the anchor. Holding the body at 24px on a phone set
about 27 characters to the line in a 327px column, well under the 35 to 40 that
reads as prose, so every line broke early.

**Bold inside body text is a run-in lead, not a highlighter.** Each project
paragraph opens with its first phrase in weight 600, and that is the only bold
in any body copy on the page. Because it is in the same position every time it
reads as structure, the way a dictionary entry does. The rejected version was
the resume's habit, keywords picked out of the middle of sentences: technology
names, numbers, award titles. A recruiter scanning for six seconds needs that;
a visitor reading three sentences does not, and it is the single most
resume-like move available to a page whose whole premise is that it is not one.
Never bold a stack name.

**Section headings must be larger than body text.** An earlier version set them
to 15px uppercase, smaller than everything around them; it was rejected on
sight.

**Nothing is smaller than the body**, including the things a resume would
shrink: source links, dates, the colophon. If something needs to recede,
italicise it or drop its opacity; do not shrink it. The body itself is 24px on a
desktop and 20px below 700px, and those are the two floors. The rule is that
there is one text size per breakpoint, not that 24 is sacred.

Body line height is 1.6, headings 1.1 to 1.2. Do not set
`-webkit-font-smoothing: antialiased`: it thins the strokes on macOS and made
this page read lighter than the reference, which does not set it on body text.

### Measure

Content column is **860px**, wider than the reference's 620px. 620px is the
optimum for running prose; this page mixes prose with entries, which look thin
and stranded in a column that narrow. At 24px, 860px is roughly 62 characters,
still inside the comfortable range.

**Everything lives inside that column**, including the theme toggle. Nothing is
pinned to the viewport edge.

### Copy Rules

- **Never use an em dash on this site.** Use a colon, a period, or rewrite.
- Same for the en dash in prose. Ranges of years may use a plain hyphen.
- **Never use contractions.** Write "I am", not "I'm"; "do not", not "don't".
- **Every link off this site opens in a new tab**: `target="_blank"` with
  `rel="noopener noreferrer"`. A visitor who clicks washu.edu should not lose the
  page. `mailto:` links are exempt.

### Restraint Rules

- No animated backgrounds, no scroll-triggered effects, no cards, no shadows,
  no boxes.
- There is a back-to-top link, but read the shape before changing it: a plain
  anchor to `#top`, 36px, hung on the **right edge of the column** level with the
  last line of the colophon, always present. It is the bottom of the line the
  theme toggle and the repository marks make down that edge, so every glyph on
  the page sits on one axis. What was rejected is the other kind, a pill that
  floats in a corner of the viewport and appears once you scroll. That one breaks
  two rules at once.
- Icons are inline SVG using `currentColor`. Never an icon font.
- Hierarchy comes from type size, weight, and space. That is the whole toolkit.

## Theme Toggle

There is exactly **one** `<meta name="theme-color">`, and both scripts keep it in
step with the page. Do not split it into a pair keyed to `prefers-color-scheme`:
the theme comes from three sources, a saved choice, then the hour, then the
system, so a media-keyed meta leaves the browser chrome ivory while the page is
ink. That shipped once.

A single icon button at the **top right of the content column**, vertically
centered against the name, on the same line as it. A moon in light mode, a sun
in dark mode, 36px, line-style, `currentColor`, held at `opacity: 0.55` until
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
3. **Education**
4. **Music**, only if it earns its place. Two or three entries at most.
5. **Contact**: LinkedIn, GitHub, email, with inline SVG icons.

There is no Work Experience section, by decision. See What This Site Is.

A project entry is an `h3` holding two links and nothing else: the title, which
carries a mark and goes to the running project, and a GitHub mark pushed to the
right edge of the column, in line with the theme toggle above it. Below it sits
one paragraph of two or three sentences.

The third entry, **Personal Website**, is the one exception, and the exception is
deliberate. Its running thing is the page you are already on, so its title is a
`span` rather than an anchor and carries no underline: an underline that leads
nowhere would be the only broken promise on the page. The repository mark beside
it is the only door. Its own mark is three lines cut out of the disc, the last
one short, a paragraph seen from far enough away.

The marks are drawn, not borrowed, and both are the same shape at the same
weight: a filled disc with something cut out of it by an SVG `mask`, so the
cut-out is the real background showing through and never has to be recolored for
dark mode. Greenlight's cut is a highlight; Omni Geo Quiz's is a tilted compass
needle; this site's is three lines of a paragraph. A stroked globe was drawn four ways first, flat-lined, curved into a
real graticule, ringed, inverted, and every version read lighter than Greenlight
beside it. Matching the weight mattered more than being literal about the
subject. Emoji were tried first and
dropped, since they are full color and render differently on every platform.
Raster logos are not an option for the same reason, plus they need a second
version for dark mode and do not scale with the type.

Leave `TODO:` comments where content is pending instead of inventing filler.

## Files

- `index.html`: the entire site.
- `styles.css`: all styling. No inline `<style>` blocks.
- `script.js`: theme toggle only.

- `og.html` and `og.png`: the link preview card and its source. See below.

`washu_logo.png` was deleted: every mark on this page is drawn, scales with the
type, and needs no second version for dark mode, so a raster logo would have
been the one thing breaking that rule. `og.png` is the single exception to
"nothing on this page is a raster", and it is not on this page: it is the card
other sites render, where a raster is the only format accepted.

`<footer>` sits outside `<main>`, since a footer inside it would belong to that
section rather than to the page; both carry the column width. There is a
`@media print` block that forces the light palette. Nobody is expected to print
this page; the block is cheap insurance, not a requirement.

The colophon carries the city and a hand-written **Last updated** date, centered
under the contact row. **Update that date whenever the content changes.** A date
that has gone stale is worse than no date at all, and nothing in the build will
catch it, because there is no build.

The favicon is an inline SVG data URI in `<head>`, so the palette lives in one
place and there is nothing to regenerate if the palette changes.

`og.png` is the link preview card, 1200x630, and `og.html` is the source it is
rendered from: the same two colors, the real Newsreader, the name and the one
line from `og:description`. It is the page's first screen, not a graphic
invented for social media, which is the only way this design can produce a
raster honestly. Regenerate it after changing `og.html`, never by hand:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new \
  --disable-gpu --hide-scrollbars --force-device-scale-factor=2 \
  --window-size=1200,630 --virtual-time-budget=6000 \
  --screenshot=og@2x.png file://$PWD/og.html
sips -Z 1200 og@2x.png --out og.png && rm og@2x.png
```

It renders at 2x and downsamples, because text screenshotted at 1x reads soft
once a platform scales the card. `og.html` is not linked from anywhere; it is
committed so the image stays reproducible.

## Working Agreement

Discuss and settle design decisions before writing code. Jiaming wants to reason
through the design, not receive a finished page and react to it.

Verify claimed values against the source rather than asserting them from memory.
This applies to the design reference's stylesheet, to the project repositories
that the copy describes, and to counts and numbers of every kind.

Give a real opinion when asked, including the reason a request might be a bad
idea, and then do what he decides. Several of the better calls on this page came
from him pushing back, and several came from a stated objection being overruled.
