# Rishi Ragavendra R — Portfolio

Dark blue / violet engineering portfolio. Zero build step — plain HTML, CSS and vanilla JS with
self-hosted fonts. No framework, no bundler, no npm install.

---

## 1. Run it (one double-click)

**Windows** — double-click **`run.bat`**

**macOS / Linux** — double-click **`run.sh`** (or `./run.sh` in a terminal)

It starts a local server on `http://localhost:5500/` and opens your browser automatically.
Keep the console window open while browsing; close it to stop the server.

The launcher uses Python if it's installed, falls back to Node (`npx serve`), and if neither
exists it just opens `index.html` directly — so it works either way.

---

## 2. Make the contact form deliver email (2 minutes — do this once)

The form posts through **Web3Forms**, which delivers straight to your inbox with no backend.

1. Go to <https://web3forms.com>
2. Enter **rishrag18@gmail.com** → *Create Access Key*
3. Open that inbox and copy the access key (a UUID)
4. Open `js/config.js` and replace:

```js
WEB3FORMS_ACCESS_KEY: "REPLACE_WITH_YOUR_WEB3FORMS_ACCESS_KEY",
```

with your key. Done — messages now arrive at rishrag18@gmail.com.

**Is it safe in frontend code?** Yes. A Web3Forms access key is a public identifier, not a
secret: it can only deliver a message to *your own verified inbox* and can't read anything.
This is the documented, intended usage. There are no other keys or environment variables in
this project.

**Until you set the key**, the Send button still works — it validates the form and opens the
visitor's mail client with the message pre-filled, so it's never a dead button. A hidden
honeypot field silently drops bot submissions.

---

## 3. Deploy

### GitHub Pages
```bash
git init
git add .
git commit -m "Portfolio"
git branch -M main
git remote add origin https://github.com/rishiragavendra/rishiragavendra.github.io.git
git push -u origin main
```
Then **Settings → Pages → Source: main / root**. Live at `https://rishiragavendra.github.io/`.

### Netlify / Vercel
Drag the folder onto Netlify Drop, or import the repo. No build command; publish directory =
project root.

After deploying, update the `canonical` and `og:url` values at the top of `index.html` if your
domain differs.

---

## 4. Structure

```
run.bat / run.sh           one-click local launcher
index.html                 single page, semantic sections
css/
  fonts.css                self-hosted Outfit + JetBrains Mono
  tokens.css               design tokens — colours, type, spacing, motion
  base.css                 reset, typography, reveal system
  components.css           header, nav, buttons, chips, section headings, footer
  sections.css             every section's layout
  responsive.css           breakpoint layouts (1100 / 880 / 700 / 480 / 360)
js/
  config.js                ← your Web3Forms key goes here
  data.js                  domain-panel and skill-panel content (edit text here)
  main.js                  nav island, smooth scroll, reveal, scroll-spy, tabs, hero canvas
  contact.js               form validation, states and submission
assets/
  Rishi_Ragavendra_R_Resume.pdf
  img/rishi.jpg + .webp    portrait (WebP served first)
  img/og-cover.png         social sharing preview (1200×630)
  img/favicon.svg
  fonts/                   woff2 files (SIL Open Font License)
```

## 5. Editing what you'll actually want to change

| Change | Where |
|---|---|
| Accent colours | `css/tokens.css` → `--blue`, `--violet`, `--blue-rgb`, `--violet-rgb` |
| Resume PDF | replace `assets/Rishi_Ragavendra_R_Resume.pdf` (keep the filename) |
| Portrait | replace `assets/img/rishi.jpg` **and** `rishi.webp` |
| Domain / skill panel text | `js/data.js` → `DOMAIN_DATA` and `SKILL_DATA` |
| Any text | `index.html` |
| Add a project | copy an `<article class="pitem">` block inside `.plist` |

## 6. Built in

- Floating glass nav island with a sliding active-section pill and gradient progress bar
- Full-screen hero with drifting gradient orbs, a node-network canvas and a tech marquee
- Bento-grid About section, tabbed Domains console and a split Skills explorer
  (both tab groups are keyboard-navigable with arrow keys / Home / End)
- Sticky-rail flagship case study, numbered project index, rank-row achievements
- Animated hero canvas pauses off-screen and on tab hide; scroll-reveal via `IntersectionObserver`
- Mobile menu with Escape-to-close, scroll lock and auto-close on resize
- Semantic HTML, skip link, alt text, ARIA on the menu, visible focus rings
- SEO: title, description, Open Graph + Twitter cards, JSON-LD `Person`, favicon
