# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static marketing website for "SkyScrapers" (a fictional real-estate brand). Plain HTML, CSS, and vanilla JavaScript — **no build step, no framework, no package.json**. The only external request is a Google Fonts stylesheet (Fredoka). Deployed to GitHub Pages from the branch root.

Two designs live in git history:

- **`v1` tag** — the original navy-and-gold corporate look, back when the brand was called "Jarvis". A folder copy also sits beside the repo at `../Jarvis Website v1 (navy-gold)`.
- **`main` / `cartoon` branches** — the current cartoon redesign described below. Both point at the same commits; `main` is what GitHub Pages serves.

The repo was renamed from `jarvis-website` to `skyscrapers-website` on 3 Aug 2026, so the live URL moved to `https://clauderobots.github.io/skyscrapers-website/`.

Note the asymmetry, confirmed after the rename: `github.com/ClaudeRobots/jarvis-website` and the old git remote URL **do** redirect, but the old **Pages** URL (`clauderobots.github.io/jarvis-website/`) now returns a hard 404 — github.io addresses are not redirected after a rename. Any link shared before 3 Aug 2026 is dead and has to be reissued.

## Commands

Nothing to build or compile.

- **Preview:** `python -m http.server 8531` then open `http://localhost:8531/` (open the files directly and relative paths still work, but a server is closer to production).
- **Deploy:** commit and `git push` to `origin/main`. GitHub Pages rebuilds automatically (~1–2 min). Live at `https://clauderobots.github.io/skyscrapers-website/`.
- **Check the live Pages build** (needs GitHub CLI auth): `gh api repos/ClaudeRobots/skyscrapers-website/pages/builds/latest`.

There are no tests, linters, or CI. To smoke-test changes, drive headless Chrome over CDP with Node's built-in `WebSocket` (no npm install — the corporate TLS proxy blocks the registry):

```
chrome.exe --headless=new --remote-debugging-port=9222 --window-size=1440,900 about:blank
# then fetch http://127.0.0.1:9222/json/list and script Page.navigate / Runtime.evaluate / Page.captureScreenshot
```

## Architecture

Four sibling pages — `index.html`, `projects.html`, `about.html`, `contact.html` — each linking the **same** `css/styles.css` and `js/main.js`. There is no templating, so the `<header>` nav and `<footer>` are **duplicated verbatim in every page**. When editing nav links, the footer, or brand markup, apply the identical change to all four files.

**`css/styles.css` is the single source of truth for the design.** Token-driven: the `:root` custom properties (`--ink`, `--cream`, `--sun`, `--coral`, `--mint`, `--sky`, `--grape`, `--leaf`, plus `--line`, `--radius`, `--pop*`, `--jelly`) define the whole cartoon look. Change the look by editing these, not by hardcoding values in rules. The cartoon feel comes from three repeated moves: a thick `var(--line)` ink outline, a hard offset shadow (`--pop`), and a `--jelly` overshoot easing on every hover/press.

**`js/main.js` is one IIFE of independent, self-guarded modules** (`if (form && note)`-style checks), which is what lets a single script run across all pages — a module no-ops on pages lacking its markup. It also **generates most of the artwork**, so the HTML stays readable:

- `ART.skye()`, `ART.car`, `ART.house(variant)` return inline SVG strings.
- The whole sky is built by JS and injected as `body`'s first child.

Current modules: sky builder, scroll journey, cursor parallax, footer year, mobile nav, headline letter-split, artwork injection, scroll reveals, stat counters, project filter, Skye behaviour, floating actions, brochure nudge, booking wizard.

## Conventions that matter

- **The day-to-night scroll journey is the signature.** A fixed `.sky` holds four stacked gradient layers (dawn/day/dusk/night). On scroll, JS writes `--l-dawn/--l-day/--l-dusk/--l-night` opacities, a `--night` value (0→1), and the `--sun-x/--sun-y` and `--moon-x/--moon-y` arcs. **Anything that should react to nightfall reads `var(--night)` in CSS** — that's how the skyline and footer windows light up. Never animate the sky from JS frame by frame; just set the variables.
- **Project cards** set their accent via inline `style="--h:#..."`, consumed by `.house .wall` and the card media. `data-house="cottage|tower|villa|shop"` picks the artwork. The projects-page filter keys off `data-type="residential|commercial"` matched against `data-filter` on `.chip` buttons — keep both attributes in sync when adding a project.
- **The booking wizard is the lead capture and it is real.** `initWizard()` builds the whole 4-step form (type → budget → date → details) into a host element. Two mount points: a modal created on demand, opened by **any element with `data-book`** (optional `data-project` / `data-source` attributes), and an inline mount on the contact page via `<div id="bookInline">`. There is only one copy of this markup — do not hand-write a second form.
- **Submissions go to Formspree** (`ENDPOINT` in `js/main.js`, form `xlgqwdeg`) and really do send mail. Hidden fields carry `looking_for`, `budget`, `visit_date`, `visit_time`, `project`, `came_from` and `page` so the enquiry email says which card the visitor clicked. If you add a wizard step, add its hidden field too or the answer never reaches the inbox.
- **Animated stat counters** read `data-count` (and optional `data-suffix`) on `.num`; the easing deliberately overshoots the target before settling, so a mid-animation screenshot showing a larger number is expected.
- `body` attributes are page-level switches: `data-phone` feeds the WhatsApp/call buttons, `data-no-peek` suppresses the Skye nudge and brochure card (used on the contact page), `data-no-floaters` hides the floating buttons.
- **Motion is opt-out.** `prefers-reduced-motion` is honoured in CSS *and* read as `calm` in JS to skip confetti and counter animation. Keep new animation to `transform`/`opacity` so mobile scrolling stays smooth.
- `.nojekyll` must stay present so Pages serves files as-is without Jekyll processing.
- All content (project names, prices, phone, email, stats, testimonials) is **placeholder** data.
- Files are UTF-8 with non-ASCII glyphs (— · ₹ © and emoji). Avoid bulk find/replace through PowerShell `Get-Content`/`Set-Content`, which corrupts these into mojibake; edit with tools that preserve UTF-8.
