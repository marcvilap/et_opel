# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Astro 5 + Tailwind CSS 4 static marketing site for an Opel Corsa Hybrid campaign (Spanish language, es-ES). Single-page site with 10 section components, video backgrounds, scroll-linked animations, and a tab system.

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run preview` — Preview production build
- `npm run check` — TypeScript/Astro type checking
- `npm run format` — Prettier formatting (all files)
- `npm run cleanup` — Remove `.astro/`, `dist/`, `node_modules/`

## Architecture

**Stack:** Astro 5.17 (static output), Tailwind CSS 4 via Vite plugin, TypeScript (strict mode).

**Path alias:** `@/*` → `./src/*`

**Page structure:** Single page (`src/pages/index.astro`) imports `Layout.astro` and 10 section components (`Section01`–`Section10`). Sections 3–10 live inside a scroll-wrapper div for horizontal scroll animation on xl+ screens.

**Layout:** `src/layouts/Layout.astro` assembles `NavElTiempo` → `Header` → `<slot />` → `Footer`, plus `Head.astro` (Didomi consent, Google Tag Manager, content protection scripts).

**Client-side JS** (`src/main.ts`):
- **Scroll reveal:** IntersectionObserver toggles `reveal`/`revealed` classes on `.group.reveal` elements to trigger CSS transitions.
- **Tab system:** Buttons with `[data-tab]` toggle visibility of `#tab-*` divs.

## CSS & Animation Patterns

Tailwind theme is configured in `src/main.css` (not `tailwind.config`):
- Custom breakpoints: sm(28rem), md(48rem), lg(64rem), xl(80rem)
- Fonts: Manrope (sans), Playfair Display (serif) — variable WOFF2 in `public/`
- Accent color: lime (`#f7ff14`)
- Custom variants `reveal` and `revealed` drive staggered entrance animations via `group-reveal:*` / `group-revealed:delay-*` utility classes
- Horizontal scroll animation uses CSS `view-timeline` API, active only at xl+ (80rem)

## Section Component Pattern

Every section follows the same structure:

```astro
---
import { Image } from 'astro:assets'
import img from '@/assets/images/...'
---
<section class="flex items-center bg-[color] py-12 xl:min-h-screen">
  <div class="group reveal container">
    <!-- content with group-reveal:/group-revealed: animation classes -->
  </div>
</section>
```

Images use Astro's `<Image>` component with `densities` prop. Videos use native `<video>` with autoplay/loop/muted.

## Code Style

- Prettier: no semicolons, single quotes, tabs, 160 char width
- Astro + Tailwind class sorting plugins active
- Format on save configured in `.vscode/settings.json`
