# Aryan Mandavgode — Personal Portfolio

Premium minimalist portfolio for **Aryan Mandavgode** — Full-Stack Developer & Founder of [ARYONIX](https://www.aryonix.in/).

Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS 4**, and **shadcn/ui**. Single-page layout with smooth-scroll navigation, subtle Framer Motion transitions (with full reduced-motion support), SEO + Open Graph metadata, JSON-LD structured data, and a working contact form backed by Formspree.

## Quick start

```bash
bun install
bun run dev
```

Open http://localhost:3000

## Project structure

```
src/
├── app/
│   ├── layout.tsx              # Fonts, SEO/OG metadata, JSON-LD
│   ├── page.tsx                # Page assembly (all sections)
│   ├── globals.css             # Design tokens + reduced-motion rules
│   ├── icon.svg                # Favicon (monogram)
│   └── api/contact/route.ts    # Formspree-backed contact endpoint
├── components/portfolio/
│   ├── site-header.tsx         # Fixed nav, scrollspy, mobile menu
│   ├── hero.tsx                # Hero + availability indicator
│   ├── about.tsx               # About + quick facts
│   ├── skills.tsx              # Skill categories
│   ├── projects.tsx            # Featured + grid project cards
│   ├── experience.tsx          # Experience & education
│   ├── contact.tsx             # Contact info + validated form
│   ├── site-footer.tsx         # Sticky footer
│   ├── section-heading.tsx     # Shared section header
│   └── reveal.tsx              # Scroll-reveal (reduced-motion aware)
├── lib/portfolio.ts            # Single source of truth for content
└── public/
    ├── images/                 # Project cards + OG image
    └── resume-aryan-mandavgode.pdf
```

All site content (links, projects, skills, contact details) is centralized in **`src/lib/portfolio.ts`** — edit there, and every section updates.

## Contact form setup (Formspree)

The form posts to `/api/contact`, which forwards validated submissions to Formspree. Without configuration the endpoint returns an honest 503 (it never fakes success) and the UI shows a direct-email fallback.

1. Create a free account at [formspree.io](https://formspree.io) → **New form**.
2. Copy the form ID from the endpoint, e.g. `https://formspree.io/f/xldjkqwe` → `xldjkqwe`.
3. Add it to `.env` (or your hosting provider's environment variables):

```bash
FORMSPREE_FORM_ID=xldjkqwe
```

4. Restart the dev server (or redeploy). Test by submitting the form once — Formspree will email you a confirmation to activate the form the first time.

Formspam protection is built in: a honeypot field, server-side validation, and per-IP rate limiting (5 requests/minute).

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `FORMSPREE_FORM_ID` | For the contact form | Formspree form ID (see above) |
| `NEXT_PUBLIC_SITE_URL` | Recommended in production | Canonical site URL used for SEO/OG metadata (e.g. `https://your-domain.vercel.app`) |

## Deploy to GitHub

```bash
git init
git add .
git commit -m "Portfolio: initial release"
git branch -M main
git remote add origin https://github.com/<your-username>/portfolio.git
git push -u origin main
```

> Tip: `resume_gen.py` is only needed to regenerate the resume PDF — you can keep it in the repo or remove it.

## Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and **Import** the GitHub repository.
2. Framework preset is auto-detected as **Next.js** — leave build settings as default.
3. Under **Environment Variables**, add:
   - `FORMSPREE_FORM_ID` = your Formspree form ID
   - `NEXT_PUBLIC_SITE_URL` = `https://<your-project>.vercel.app` (or your custom domain)
4. Click **Deploy**. Every push to `main` now auto-deploys.
5. (Optional) Add a custom domain from **Settings → Domains** — Vercel provisions HTTPS automatically.

## Pre-flight checklist (already verified)

- [x] All navigation anchors resolve (`#about`, `#skills`, `#projects`, `#experience`, `#contact`)
- [x] External links verified: ARYONIX site, LinkedIn, GitHub (no fabricated links)
- [x] Contact form validates client- and server-side; sends via Formspree once `FORMSPREE_FORM_ID` is set
- [x] Responsive across mobile / tablet / desktop; no horizontal overflow
- [x] Accessible: semantic landmarks, skip link, ARIA labels, keyboard navigation, focus states
- [x] `prefers-reduced-motion` respected (animations + smooth scroll disabled)
- [x] SEO metadata, Open Graph/Twitter cards, JSON-LD Person schema, robots.txt
