# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static marketing website for "SkyScrapers" (a fictional real-estate brand), styled as a hand-drawn cartoon. Plain HTML, CSS and vanilla JavaScript — **no build step, no framework, no package.json, no dependencies**. The only external request is a Google Fonts stylesheet (Fredoka). Served by GitHub Pages from the branch root.

- Live: `https://clauderobots.github.io/skyscrapers-website/`
- Remote: `ClaudeRobots/skyscrapers-website`
- **`v1` tag** — the earlier navy-and-gold corporate design, from when the brand was called "Jarvis". A folder copy also sits beside the repo at `../Jarvis Website v1 (navy-gold)`.
- **`main` and `cartoon`** — the current design. They are kept identical; `main` is what Pages serves.

The repo was renamed from `jarvis-website` on 3 Aug 2026. `github.com/<old-name>` and the old git remote redirect fine, but the old **Pages** URL returns a hard 404 — github.io addresses are *not* redirected on rename. Don't hand out any pre-rename link.

## Commands

Nothing to build or compile.

```powershell
# Preview (relative paths work when opening files directly too, but a server is closer to production)
python -m http.server 8531        # then http://localhost:8531/

# Deploy: Pages rebuilds automatically, ~1-2 min
git push origin main
git branch -f cartoon main; git push origin cartoon   # keep the branches in sync

# Confirm the live build picked up your commit (needs gh auth)
gh api repos/ClaudeRobots/skyscrapers-website/pages/builds/latest
```

There are no tests, linters or CI. `node --check js/main.js` is the only static check available.

**Verifying changes visually.** The corporate TLS proxy blocks the npm registry (`UNABLE_TO_VERIFY_LEAF_SIGNATURE`), so jsdom/puppeteer cannot be installed — don't waste time trying. Chrome is at `C:\Program Files\Google\Chrome\Application\chrome.exe`. For one screenshot:

```powershell
& $chrome --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=4000 `
          --window-size=1440,900 --screenshot="out.png" "http://localhost:8531/index.html"
```

For anything interactive (opening the wizard, clicking through steps, reading console errors), start Chrome with `--remote-debugging-port=9222 --user-data-dir=<temp>` and drive CDP from a Node script using Node's **built-in** `WebSocket` — no packages needed. Fetch `http://127.0.0.1:9222/json/list` for the target, then use `Page.navigate`, `Runtime.evaluate`, `Page.captureScreenshot`, and subscribe to `Runtime.exceptionThrown` / `Network.responseReceived` to catch JS errors and 404s.

## Architecture

Four sibling pages — `index.html`, `projects.html`, `about.html`, `contact.html` — each linking the **same** `css/styles.css` and `js/main.js`. There is no templating, so the `<head>` block, the `<header>` nav and the `<footer>` (including its inline night-houses SVG) are **duplicated verbatim in all four files**. Any change to nav links, footer, brand markup, favicon or font links must be applied four times.

**`css/styles.css` is the single source of truth for the design.** Token-driven: the `:root` custom properties (`--ink`, `--cream`, `--sun`, `--coral`, `--mint`, `--sky`, `--grape`, `--leaf`, plus `--line`, `--radius`, `--pop*`, `--jelly`) define the whole look. Change the look by editing these, not by hardcoding values in rules. The cartoon feel is three repeated moves: a thick `var(--line)` ink outline, a hard offset shadow (`--pop`), and the `--jelly` overshoot easing on every hover/press.

**`js/main.js` is one IIFE of independent, self-guarded modules** (`if (form && note)`-style checks). That guard pattern is what lets a single script run on every page — a module simply no-ops where its markup is absent. Add new behaviour as another self-guarded block, not as a new file.

The JS also **generates most of the artwork**, which is why the HTML stays readable: `ART.skye()`, `ART.car` and `ART.house(variant)` return inline SVG strings, and the entire sky is built and injected as `body`'s first child. There are no image assets anywhere in the repo.

Modules, in file order: sky builder, scroll journey, cursor parallax, footer year, mobile nav, headline letter-split, artwork injection, scroll reveals, stat counters, project filter, Skye behaviour, floating actions, brochure nudge, booking wizard.

## Conventions and traps

- **The day-to-night scroll journey is the signature feature.** A fixed `.sky` holds four stacked gradient layers (dawn/day/dusk/night). On scroll, JS writes the `--l-dawn/--l-day/--l-dusk/--l-night` cross-fade opacities, a `--night` value (0→1), and the `--sun-x/--sun-y` and `--moon-x/--moon-y` arcs. **Anything that should react to nightfall reads `var(--night)` in CSS** — that is how the skyline and footer windows light up. Never animate the sky frame-by-frame from JS; only set the variables.
- **`.sky`, `.skyline` and `.skye` are three unrelated things** — the fixed backdrop, the hero buildings, and the mascot. Grepping for `sky` hits all three, and a careless rename breaks the others. The mascot was renamed from "Jarvi" during the rebrand, hence the near-collision.
- **The wordmark is fragile.** `.brand` is an `inline-flex` container, so `Sky` and `<span>Scrapers</span>` are *separate flex items*. Adding `gap` to `.brand` splits the wordmark into two visible words; the house mark carries its own `margin-right` instead. Verify the logo visually after touching `.brand`.
- **The booking wizard is the lead capture and it really sends mail.** `initWizard()` builds the whole 4-step form (type → budget → date → details) into a host element. Two mount points: a modal created on demand, opened by **any element with `data-book`** (with optional `data-project` / `data-source`), and an inline mount on the contact page via `<div id="bookInline">`. There is exactly one copy of this markup — never hand-write a second form.
- **Submissions go to Formspree** (`ENDPOINT` in `js/main.js`, form `xlgqwdeg`). Hidden fields carry `looking_for`, `budget`, `visit_date`, `visit_time`, `project`, `came_from` and `page`, so the enquiry email records which card the visitor clicked. Add a wizard step → add its hidden field, or that answer never reaches the inbox.
- **Project cards** set their accent via inline `style="--h:#..."`, consumed by `.house .wall`. `data-house="cottage|tower|villa|shop"` picks the artwork. The projects-page filter matches `data-type="residential|commercial"` on `.card` against `data-filter` on `.chip` — keep both attributes in sync when adding a project.
- **Stat counters** read `data-count` (and optional `data-suffix`) on `.num`. The easing deliberately overshoots the target before settling, so a screenshot taken mid-animation showing a *larger* number is expected, not a bug.
- **`body` attributes are page-level switches:** `data-phone` feeds the WhatsApp/call buttons and mobile bar, `data-no-peek` suppresses the Skye nudge and brochure card (used on the contact page), `data-no-floaters` hides the floating buttons.
- **Motion is opt-out.** `prefers-reduced-motion` is honoured in CSS *and* read into a `calm` flag in JS to skip confetti and counter animation. Keep new animation to `transform`/`opacity` so mobile scrolling stays smooth.
- `.nojekyll` must stay present so Pages serves files as-is without Jekyll processing.
- All content — project names, prices, phone, email, stats, testimonials — is **placeholder** data. The phone number is still `+91 00000 00000`, so the call/WhatsApp buttons currently go nowhere.
- **Files are UTF-8 with non-ASCII glyphs** (— · ₹ © and emoji), and the headline letter-split relies on a literal non-breaking space (U+00A0). Bulk find/replace via PowerShell `Get-Content`/`Set-Content` mojibakes these; use `[System.IO.File]::ReadAllText/WriteAllText` with `UTF8Encoding($false)`, or an editor that preserves UTF-8.
