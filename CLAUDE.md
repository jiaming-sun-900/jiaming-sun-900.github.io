# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static personal portfolio website for Jiaming Sun, deployed via GitHub Pages. No build system, package manager, or framework — pure HTML, CSS, and JavaScript.

## Local Development

Open any HTML file directly in a browser, or serve locally with:

```bash
python3 -m http.server
```

Then visit `http://localhost:8000`. Deploy by pushing to `main` — GitHub Pages serves the repo root automatically.

## Architecture

All pages share a single `styles.css` and `script.js`. There is no templating system; nav, header, and footer are duplicated in each HTML file. Inner pages (`education.html`, `projects.html`, `music.html`) add page-specific rules in an inline `<style>` block in their `<head>`. `index.html` has **no** inline styles — all of its styling lives in `styles.css` as reusable classes.

`script.js` handles two behaviors used across all pages:
- **Animated star background**: drawn on a full-screen `<canvas id="vectorField">` fixed behind the page content
- **Back-to-top button**: `#backToTop`, shown after scrolling 300px

### Responsive Layout

`index.html` and its `styles.css` rules are tuned to work from ~768px (iPad portrait) up to 2560px (large monitor); phones are intentionally out of scope. Two techniques:

- **Fluid type via `clamp()`**: font sizes (`h1`, `.sub-headline`, `.bio`, `.entry-role`, `.links a`, card padding) scale smoothly, with each `clamp()` max pinned to the original large-screen value so the design is unchanged at the high end.
- **`--side-gap` token**: the shared left/right page inset (header nav, hero card, `.section-container`, footer) steps down from `18%` → `12%` (≤1500px) → `7%` (≤1100px). The hero stacks vertically below 860px.

## Design System

CSS custom properties defined at the top of `styles.css`:

| Variable | Value | Usage |
|---|---|---|
| `--bg-deep-black` | `#0A0A0A` | Page background |
| `--card-anthropic` | `#F9F6F0` | Card/section backgrounds |
| `--text-main` | `#1A1A1A` | Dark text on cards |
| `--text-light` | `#FDFCF8` | Light text on dark background |
| `--accent-orange` | `#FF4F00` | Accent: link hovers, `@` separators, sub-headline, active nav indicators, image border, dots |
| `--accent-music` | `#4ECDC4` | Teal accent for the Music nav/footer link |
| `--side-gap` | `18%` | Shared left/right page inset (responsive — see Responsive Layout) |

Font: **Libre Baskerville** (serif), loaded from Google Fonts.

**Orange consistency**: all orange uses `var(--accent-orange)` (`#FF4F00`) — never a literal hex. On `index.html`, the hero contact links (LinkedIn / GitHub / email) and the info-card lab/project links share one subtle style: no underline, pointer cursor, and a hover that eases to `--accent-orange`. Nav and footer links are styled separately and are not part of this. The only other orange is `#e04500`, a deliberate darker hover-darken for orange buttons (`#backToTop`, the projects "Play" button).

## Pages

- **`index.html`** — homepage: hero card (headshot with hover image-swap) plus "Currently" and "Previously" info cards built from `.entry` / `.entry-role` / `.entry-at` blocks. Actively maintained.
- **`education.html`** — education timeline. Actively maintained.
- **`projects.html`** — projects page (renamed from the old `research.html`); features the Omni Geo Quiz project. Actively maintained.
- **`music.html`** — Band Career, Guitars, and Performances tabs.

Nav and footer on every page link to `index.html`, `education.html`, `projects.html`, and `music.html` (the Music link rendered in `--accent-music` teal).

## Known Inconsistencies

- **`music.html` Guitars tab**: The Guitars panel contains placeholder text ("Guitar photos coming soon").
