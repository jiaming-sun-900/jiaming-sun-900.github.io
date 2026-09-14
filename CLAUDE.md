# CLAUDE.md

Guidance for Claude Code (claude.ai/code) when working in this repository.

## Overview

Static personal CV site for Jiaming Sun, deployed via GitHub Pages. No build
system, package manager, or framework — hand-written HTML, CSS, and JS.

The repository was deliberately cleared in commit `568c996` and is being rebuilt
from nothing. The previous design (dark background, Libre Baskerville,
orange/teal accents, animated star canvas, four separate pages) is gone. Do not
revive any of it. Only `washu_logo.png` and `rdfz_logo.png` were kept.

## Local Development

```bash
python3 -m http.server
```

Then visit `http://localhost:8000`. Deploy by pushing to `main` — GitHub Pages
serves the repo root.

## What This Site Is

A single-page CV. A visitor arrives knowing nothing about Jiaming and should
leave knowing who he is, where he studies, what he has worked on, and how to
reach him. It is not a blog or a writing archive.

Design reference: [darioamodei.com](https://www.darioamodei.com), for its
palette, typeface, and restraint. It is a reference, not a template. Two places
where copying it would be wrong, both learned the hard way:

- **That site is an essay archive with one content type.** Its 620px column and
  flat all-lists structure suit long prose, not short CV entries.
- **Its author's name is set small** (`1.44em`, weight 600) because he does not
  need to introduce himself — visitors arrive already knowing him. Jiaming's name
  is the anchor of a CV and should be set large.

## Design System

### Palette

Warm neutrals only. Never pure `#fff` or pure `#000` — the warmth is where the
elegance comes from. There is **no accent color**. Links are distinguished by
underline, not by hue. Any orange, teal, or other chromatic accent is a
regression.

Every color is a CSS custom property that swaps between themes, so nothing
outside the theme block needs to know which mode is active.

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#faf9f5` ivory-light | `#1f1e1d` slate-dark |
| `--bg-subtle` | `#f0eee6` ivory-medium | `#3d3d3a` slate-medium |
| `--border` | `#e8e6dc` ivory-dark | `#5e5d59` slate-light |
| `--text` | `#1f1e1d` slate-dark | `#faf9f5` ivory-light |
| `--text-muted` | `#5e5d59` slate-light | `#b0aea5` cloud-medium |
| `--text-faint` | `#87867f` cloud-dark | `#87867f` cloud-dark |

Dark mode is the light palette with foreground and background exchanged — not an
inversion, and not a second design.

### Typography

**Newsreader** (Production Type, free on Google Fonts) for everything. It is a
variable font with an optical-size (`opsz`) axis — use it. Large text takes a
higher `opsz` (tighter spacing, more stroke contrast); body text takes the text
cut. This is a large part of why the reference site reads as considered.

```html
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400..700;1,6..72,400..700&display=swap" rel="stylesheet">
```

Scale (rem base 16px):

| Role | Size | Weight | Line height |
|---|---|---|---|
| Name | 48px | 600 | 1.05 |
| Intro prose, body | 22px | 400 | 1.65 |
| Section heading | 15px, uppercase, ~0.1em tracking | 500 | — |
| Entry title | 22px | 600 | 1.3 |
| Entry description | 19px | 400 | 1.6 |
| Date / meta | 16px | 400 | — |

Section headings ("Education", "Experience") are deliberately the *smallest*
text on the page — small, uppercase, tracked out, in `--text-faint`. Giving the
visual weight to the entries instead of the labels is what separates the five
sections without resorting to rules, cards, or color. Do not make them large.

Nothing should be smaller than 15px.

### Measure

Content column is **~760px**, wider than the reference's 620px. 620px is the
optimum for running prose; this site is mostly short entries, which look thin
and stranded in a column that narrow.

### Restraint Rules

- No animated backgrounds, no scroll-triggered effects, no back-to-top button,
  no cards, no shadows, no boxes.
- Icons are **inline SVG** using `currentColor` so they follow the theme
  automatically. Never an icon font.
- Hierarchy comes from type size, weight, and space. That is the whole toolkit.

## Theme Toggle

A single icon button in the top right: a moon in light mode, a sun in dark mode,
around 20px, line-style, drawn in `currentColor`. Clicking swaps the theme.
Not a pill switch — one element instead of two, and the glyph makes the
affordance obvious on its own.

- Honors `prefers-color-scheme` on first visit; remembers an explicit choice in
  `localStorage`.
- Set the initial theme in an inline `<head>` script, before first paint, to
  avoid a flash of the wrong theme.
- Honors `prefers-reduced-motion`.

An earlier idea — a draggable aircraft window shade, borrowed from
[mikes.cv](https://www.mikes.cv) — was tried and rejected as too much for this
page. Do not reintroduce it.

## Page Structure

One page, `index.html`, read top to bottom:

1. **Intro** — name, then two to four sentences of real prose. Personality lives
   here, and this is the only prose on the page. The name and the intro must
   share the first screen: a first screen holding nothing but a name reads as
   unprofessional.
2. **Education**
3. **Experience**
4. **Projects**
5. **Music**
6. **Contact** — LinkedIn, GitHub, email, with inline SVG icons.

Content per section is still being decided; the direction is to trim rather than
carry everything over from the old site. Leave `TODO` comments where content is
pending instead of inventing filler.

## Files

- `index.html` — the entire site.
- `styles.css` — all styling. No inline `<style>` blocks.
- `script.js` — theme toggle only.
- `washu_logo.png`, `rdfz_logo.png` — kept from the old site, not yet used.

## Working Agreement

Discuss and settle design decisions before writing code. Jiaming wants to reason
through the design, not receive a finished page and react to it.
