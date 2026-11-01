# SAAJ – Threads of Tradition

E-commerce frontend for SAAJ handloom sarees, built with Next.js 16 (App Router, Cache Components) and Tailwind CSS 4.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Where things live

| Path | What it is |
| --- | --- |
| `src/lib/site.ts` | Brand info, contact details, announcement bar, nav, `showPlaceholderNotes` flag |
| `src/lib/products.ts` | Product catalogue and collections (swap for a CMS or commerce API) |
| `src/lib/instagram.ts` | Saree photographs from Instagram |
| `src/lib/reels.ts` | Reels list; `reels.server.ts` detects video files in `public/reels/` |
| `src/app/globals.css` | Brand palette (sampled from the logo), fonts and shared utilities |
| `src/components/store/StoreProvider.tsx` | Cart and wishlist state (stored in localStorage) |
| `public/ig/`, `public/brand/` | Images saved from @saaj_threadsoftradition |
| `public/hero/` | Original AI-generated mood imagery for the home hero (decorative, not a product photo). Alternates: `navy-buti-folds`, `navy-pallu-tassels`, `layered-sheer-waves` |

## Brand palette (from the logo)

| Token | Hex | Source in logo | Use |
| --- | --- | --- | --- |
| `navy-800` | `#1d2a4f` | Roundel background | Primary: buttons, headings, hero, footer |
| `gold-500` | `#c5a059` | Line-art figure, "Threads of Tradition" | Accents, rules, CTA on navy |
| `rose-600` | `#a8265d` | Saree | Highlights, active states, focus ring |
| `ivory-50` | `#fcf9f3` | Wordmark | Page background |

Gold text on ivory doesn't meet contrast requirements, so gold is decorative on light backgrounds. Use `gold-700` when you need gold-toned text there.

## Verified vs placeholder content

**Verified** (from the public Instagram profile, Oct 2026):
- Bio line "The Warmth of Handloom, The Grace of You".
- WhatsApp contact number +91 84469 69189, email saajthreadsoftradition@gmail.com and address Sanquelim, Goa (all confirmed by the brand).
- Policies: Shipping PAN India, DM for order, No COD, No return.
- Diwali exhibition details: Krantivira Maidan, Ponda, Stall 70, 28 Oct – 1 Nov, 11am–8pm. The announcement hides itself after the event.
- All photographs.

**Not available, so marked as placeholders.** With `site.showPlaceholderNotes = true`, these show as dashed rose labels:
- Product names: descriptive working titles based on the photos.
- Prices: shown as "Price on request".
- Fabric, weave, length, blouse piece and care: shown as "Details on request".
- Founder story, meaning of the name "SAAJ", and artisan or weaving-cluster details.
- Testimonials.
- Delivery timelines and payment methods.
- Privacy policy and terms, which also need legal review.
- Collection names: a draft grouping based on the photos.

## Launch checklist

- [ ] **Reel videos:** add MP4s to `public/reels/` named by reel code (see `public/reels/README.md`). They then autoplay in the "SAAJ in motion" stage. Without them, reels play through Instagram's player in the full-screen viewer.
- [ ] Replace `/public/brand/saaj-logo.jpg` (150px avatar) with the original vector or high-res logo.
- [ ] Replace the 640px Instagram images with full-resolution product photos (several angles per saree for the gallery).
- [ ] Fill in real product data in `products.ts`, or connect a backend (Shopify Storefront API, Medusa, WooCommerce…).
- [ ] Payment: checkout currently sends the order to WhatsApp, matching how SAAJ takes orders today. Add a payment gateway such as Razorpay if wanted (see the TODO in `CartContents.tsx`).
- [ ] Newsletter: connect a provider (see the TODO in `Newsletter.tsx`).
- [ ] Contact form: it opens WhatsApp today. Optionally also post to email or a form service.
- [ ] Instagram: connect the Graph API or a feed service so the gallery updates automatically.
- [ ] Set `site.url` to the real domain (used for canonical URLs, sitemap and JSON-LD).
- [ ] Replace every placeholder, then set `showPlaceholderNotes: false`.
