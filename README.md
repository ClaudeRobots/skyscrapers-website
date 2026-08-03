# SkyScrapers — Cartoon Real Estate Website

A playful, hand-drawn-feeling marketing site for a fictional real-estate brand. Plain HTML, CSS and vanilla JavaScript — no build step, no framework, no dependencies. Deployable straight to GitHub Pages.

Every bit of artwork is inline SVG drawn in code, so the whole site is a few tens of KB and nothing loads from a CDN except the Fredoka webfont.

## The fun bits

- **A day-to-night scroll journey.** The page sits inside one continuous cartoon sky. Scroll and it runs sunrise → noon → dusk → night: the sun arcs over and sets, the moon rises, stars fade in, and the windows on every building light up.
- **Skye, the mascot.** A house-headed robot who bobs, blinks, follows your cursor with its eyes, waves when you tap it — and dances if you tap it five times.
- **Doors that open.** Hover any project card and the front door swings open with a warm glow behind it.
- **A 4-step booking wizard.** Progress is a road with a little car driving along it. Pick a home type, drag the budget slider and watch the house grow from hut to mansion, choose a day and a morning/evening slot, then leave your number. Confetti on submit.
- Swinging price tags, a flapping SOLD OUT ribbon, spinning filter transitions, bouncing stat counters, drifting clouds, and a car that putters across the hero.

## Pages

- `index.html` — hero, why-us, featured homes, stats, testimonials, CTA
- `projects.html` — six projects with category filters
- `about.html` — story timeline and numbers
- `contact.html` — the booking wizard inline, plus office details

## Structure

```
jarvis-website/
├── index.html
├── projects.html
├── about.html
├── contact.html
├── css/styles.css      ← all design tokens live at the top
├── js/main.js          ← artwork, sky engine, mascot, booking wizard
└── .nojekyll
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```
python -m http.server 8531
```

## Booking form

The wizard posts to [Formspree](https://formspree.io) (form `xlgqwdeg`) and **really does send mail**. Each enquiry carries the home type, budget, requested date and time slot, and which project card the visitor clicked. Swap `ENDPOINT` in `js/main.js` to point it at your own inbox.

## Deploy (GitHub Pages)

1. Push to GitHub.
2. Repo → **Settings → Pages** → Source: `main` branch, `/ (root)`.
3. Live at `https://<username>.github.io/<repo>/`.

`.nojekyll` tells Pages to serve files as-is (no Jekyll processing).

## Versions

- `v1` tag — the original navy-and-gold corporate design, from when the brand was called "Jarvis".
- `main` / `cartoon` — this one. The repo and Pages URL still use the old `jarvis-website` name.

---
Content, prices, names and figures are all placeholders. Built for fun.
