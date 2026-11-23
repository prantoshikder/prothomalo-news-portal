# নবকণ্ঠ (Nobokontho) — Bangla News Portal

A Bangla newspaper-style news portal built with **Next.js 16 (App Router, Cache Components)**, **React 19**, **Tailwind CSS v4** and **TypeScript**.

The layout takes inspiration from classic Bangla dailies (masthead + date, category nav,
lead story with a “সর্বশেষ / সর্বাধিক পঠিত” sidebar, category columns), but the brand, palette,
typography and most components are original.

> All articles, names and quotes in `src/lib/data.ts` are **fictional demo content**.
> Images are random placeholders from picsum.photos.

## Features

- Home: lead story, secondary stories, latest/popular tabs, category columns, opinion band, sports, video band, mini category columns, education strip
- Breaking-news ticker (pauses on hover, respects reduced motion)
- Category pages (`/category/[slug]`), article pages (`/news/[slug]`), latest (`/latest`), search (`/search?q=`)
- Article page: reading-progress bar, font-size control, Web Share / copy link, print, tags, related stories, JSON-LD `NewsArticle`
- Dark mode (saved in localStorage, no flash on load), mobile drawer menu, back-to-top
- Bangla digits & dates, Hind Siliguri + Noto Serif Bengali fonts via `next/font`
- SEO: per-page metadata, Open Graph, `sitemap.xml`, `robots.txt`
- All article/category pages statically prerendered

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint
```

## Structure

```
src/app/            routes (page, category/[slug], news/[slug], latest, search, sitemap, robots)
src/components/     Header, Footer, cards, sidebar, client widgets
src/lib/data.ts     demo dataset + query helpers (swap for a CMS/API later)
src/lib/utils.ts    Bangla digit/date helpers
```

To connect a real backend, replace the helpers in `src/lib/data.ts` (`getArticle`, `getArticlesByCategory`, …)
with API calls. If you fetch at request time, wrap the data in `"use cache"` or `<Suspense>` (Cache Components is enabled).
