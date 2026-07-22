# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static marketing website for "Jarvis" (a real-estate brand). Plain HTML, CSS, and vanilla JavaScript — **no build step, no framework, no dependencies, no package.json**. It is deployed to GitHub Pages straight from the `main` branch root.

## Commands

There is nothing to build or compile. To work on the site:

- **Preview:** open any `.html` file directly in a browser, or serve the folder for correct relative paths: `npx serve .` (or `python -m http.server`).
- **Deploy:** commit and `git push` to `origin/main`. GitHub Pages rebuilds automatically (~1–2 min). Live at `https://clauderobots.github.io/jarvis-website/`.
- **Check the live Pages build** (requires GitHub CLI auth): `gh api repos/ClaudeRobots/jarvis-website/pages/builds/latest`.

There are no tests, linters, or CI.

## Architecture

Four sibling pages — `index.html`, `projects.html`, `about.html`, `contact.html` — that each link the **same** `css/styles.css` and `js/main.js`. There is no templating, so shared chrome (the `<header>` nav and `<footer>`) is **duplicated verbatim in every page**. When editing nav links, the footer, or brand markup, apply the identical change to all four files.

**`css/styles.css` is the single source of truth for the design.** It is a token-driven system: the `:root` CSS custom properties (colors like `--cyan`/`--violet`, `--glow-*` shadows, `--panel`, `--radius`, `--wrap`) define the futuristic dark/glassmorphism theme. Change the look by editing these variables rather than hardcoding values in rules. The animated backdrop (aurora gradients + drifting grid) is drawn with `body::before` / `body::after` and respects `prefers-reduced-motion`.

**`js/main.js` is one IIFE containing independent feature modules**, each guarded by a check for the DOM elements it needs (e.g. `if (form && note)`). This is what lets a single script run across all pages — a module simply no-ops on pages lacking its markup. Current modules: footer year stamp, mobile nav toggle, IntersectionObserver-driven stat counters, project category filter, and contact-form validation. Add new interactive behavior as another self-guarded block in this same pattern.

## Conventions that matter

- **Project cards** set their accent color via an inline `style="--h:#..."` CSS variable consumed by `.card-media`. The **projects-page filter** keys off `data-type="residential|commercial"` on each `.card`, matched against the `data-filter` on `.chip` buttons — keep these attributes in sync when adding projects.
- **Animated stat counters** read their target from `data-count` on `.num` elements; the displayed `0` is replaced on scroll-into-view.
- **The contact form is client-side only.** It validates and shows a confirmation message but sends nothing — GitHub Pages has no backend. Wiring real submissions requires an external service (e.g. Formspree). Do not imply the current form delivers mail.
- `.nojekyll` must stay present so Pages serves files as-is without Jekyll processing.
- All content (project names, prices, phone, email, stats) is **placeholder** data.
- Files are UTF-8 with non-ASCII glyphs (— · ₹ ©). Avoid bulk find/replace through Windows PowerShell `Get-Content`/`Set-Content`, which corrupts these into mojibake; edit with tools that preserve UTF-8.
