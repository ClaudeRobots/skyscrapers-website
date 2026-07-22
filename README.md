# Jarvis — Real Estate Website

A fast, responsive, multi-page marketing website built with plain HTML, CSS, and JavaScript. No build step, no dependencies — deployable straight to GitHub Pages.

## Pages
- `index.html` — Home (hero, stats, featured projects, CTA)
- `projects.html` — Project portfolio with category filters
- `about.html` — Company story and values
- `contact.html` — Contact form (client-side validation) and details

## Structure
```
jarvis-website/
├── index.html
├── projects.html
├── about.html
├── contact.html
├── css/styles.css
├── js/main.js
└── .nojekyll
```

## Run locally
Just open `index.html` in a browser, or serve the folder:
```
npx serve .
```

## Deploy (GitHub Pages)
1. Push this repo to GitHub.
2. Repo → **Settings → Pages** → Source: `main` branch, `/ (root)`.
3. Your site goes live at `https://<username>.github.io/<repo>/`.

The `.nojekyll` file tells GitHub Pages to serve files as-is (no Jekyll processing).

---
Content and figures are placeholders for design purposes.
