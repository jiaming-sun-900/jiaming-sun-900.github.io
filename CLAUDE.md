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

All pages share a single `styles.css` and `script.js`. There is no templating system; nav, header, and footer are duplicated in each HTML file.

`script.js` handles two behaviors used across all pages:
- **Animated star background**: drawn on a full-screen `<canvas id="vectorField">` fixed behind the page content
- **Back-to-top button**: `#backToTop`, shown after scrolling 300px

## Design System

CSS custom properties defined at the top of `styles.css`:

| Variable | Value | Usage |
|---|---|---|
| `--bg-deep-black` | `#0A0A0A` | Page background |
| `--card-anthropic` | `#F9F6F0` | Card/section backgrounds |
| `--text-main` | `#1A1A1A` | Dark text on cards |
| `--text-light` | `#FDFCF8` | Light text on dark background |
| `--accent-orange` | `#FF4F00` | Accent color, links, dots |

Font: **Libre Baskerville** (serif), loaded from Google Fonts.

## Work in Progress

`research.html`, `experience.html`, and `music.html` are incomplete drafts that are intentionally not being worked on right now. They may have inconsistent nav structures, missing font imports, and placeholder content. Do not treat these as errors or attempt to fix them unless explicitly asked. Only `index.html` and `education.html` are actively maintained.

## Known Inconsistencies

- **Two nav structures coexist**: `index.html` and `education.html` use a flat `<nav>` with `.nav-left` / `.nav-right` divs. `research.html`, `experience.html`, and `music.html` use a hamburger-style nav with `.nav-logo`, `.nav-hamburger`, and `<ul class="nav-links">` — but the hamburger toggle JS is not implemented in `script.js`.
- **Google Fonts missing on inner pages**: `research.html`, `experience.html`, and `music.html` do not include the Google Fonts `<link>` tag, unlike `index.html` and `education.html`.
- **`music.html` has placeholder content**: The album grid and guitar grid sections contain template placeholder text intended to be replaced with real content.
- **`music.html` nav links to `about.html`**, which does not exist in the repository.
