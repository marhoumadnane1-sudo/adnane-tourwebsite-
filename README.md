# NIGOR 2Transport — Morocco Private Transfer Website

A professional tourism website for NIGOR 2Transport, a licensed private transfer company operating across Morocco. Built with Next.js 14 App Router and a Moroccan-inspired design system.

## Overview

NIGOR 2Transport offers:
- **Airport transfers** from Casablanca Mohammed V Airport (CMN) to 15+ cities
- **City-to-city rides** between major Moroccan destinations
- **Private day hire** with half-day, full-day, and multi-day options

The site features a multi-step booking form, PayPal payment integration, multilingual support (English, French, Arabic with RTL), admin dashboard, and email confirmations via Resend.

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 3 |
| UI Components | Radix UI (Accordion, Dialog, Select, Tabs) |
| Animations | Framer Motion |
| State Management | Zustand (persisted to localStorage) |
| Forms | React Hook Form + Zod |
| Payments | PayPal (`@paypal/react-paypal-js`) |
| Email | Resend |
| Analytics | Plausible Analytics (consent-gated) |
| i18n | Custom translation system (EN / FR / AR + RTL) |
| Icons | Lucide React |

## Design System

Brand colors defined in `tailwind.config.ts`:

| Token | Hex | Usage |
|---|---|---|
| `terracotta` | `#B5451B` | Primary CTA, headings |
| `sand` | `#F5E6C8` | Warm backgrounds |
| `gold` | `#D4A843` | Accents, highlights |
| `charcoal` | `#1A1A2E` | Dark sections, text |
| `cream` | `#FAFAFA` | Light background |

Font: **Plus Jakarta Sans** (Latin) + **Noto Sans Arabic** (RTL).  
Pattern: Zellige SVG tile motif.  
Custom animations: `float`, `shimmer`, `pulse-slow`.

## Project Structure

```
├── app/                   # Next.js App Router pages
│   ├── layout.tsx         # Root layout (Navbar, Footer, CookieBanner, skip-to-content)
│   ├── page.tsx           # Home page
│   ├── about/             # About page
│   ├── services/          # Services overview
│   ├── prices/            # Pricing tables (all vehicles)
│   ├── contact/           # Contact form (React Hook Form + Zod + Resend)
│   ├── book/              # Multi-step booking flow (3 steps + PayPal)
│   ├── policy/            # Privacy policy & terms
│   ├── admin/             # Admin dashboard (bookings management)
│   ├── not-found.tsx      # Branded 404 page
│   ├── error.tsx          # Branded runtime error page
│   ├── sitemap.ts         # XML sitemap
│   └── robots.ts          # robots.txt rules
│
├── app/api/
│   ├── contact/route.ts   # Contact form emails (rate-limited + sanitized)
│   ├── booking/route.ts   # Booking confirmation emails (rate-limited + sanitized)
│   ├── bookings/route.ts  # Admin: list / save / update bookings
│   └── admin/             # Admin auth (login, logout)
│
├── components/
│   ├── layout/            # Navbar, Footer, WhatsAppButton, LanguageDirectionSync
│   ├── home/              # Hero, Stats, ServiceCards, Fleet, Testimonials, FAQ, etc.
│   ├── booking/           # RouteSelector, VehicleSelector, BookingDetails, PayPalButton
│   ├── admin/             # AdminLogin, AdminDashboard
│   └── ui/                # CookieBanner, VehicleImage, AddressInput
│
├── hooks/
│   ├── useTranslation.ts  # Custom i18n hook (wraps Zustand language state)
│   └── usePlausible.ts    # Plausible Analytics event tracking
│
├── lib/
│   ├── translations.ts    # All UI strings (EN / FR / AR)
│   ├── store.ts           # Zustand booking + language store
│   ├── types.ts           # TypeScript types
│   ├── prices.ts          # Pricing tables & calculators
│   ├── locations.ts       # Airport & city data
│   ├── routes.ts          # Route definitions & contact info
│   ├── rateLimit.ts       # In-memory rate limiter for API routes
│   └── sanitize.ts        # HTML-escaping for email templates
│
└── public/
    └── logo.png
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Installation

```bash
git clone https://github.com/marhoumadnane1-sudo/adnane-tourwebsite-.git
cd adnane-tourwebsite-
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
# ─── Email (Resend) ───────────────────────────────────────────────
# Sign up at https://resend.com — free tier supports 3,000 emails/month
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# The "From" address for outgoing emails
# Must be a verified domain in your Resend account
# For development you can omit this — it falls back to onboarding@resend.dev
FROM_EMAIL="NIGOR 2Transport <hello@yourdomain.com>"

# ─── PayPal ───────────────────────────────────────────────────────
# Create a PayPal Developer app at https://developer.paypal.com
# Use Sandbox client ID for development, Live for production
NEXT_PUBLIC_PAYPAL_CLIENT_ID=Axxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# ─── Admin Dashboard ──────────────────────────────────────────────
# Secret password for the /admin route
# Choose a strong random string (e.g. openssl rand -hex 32)
ADMIN_SECRET=your_very_secret_admin_password_here
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
npm run build
npm start
```

## Features

### Booking Flow (3 Steps)
1. **Route Selector** — service type, airport/cities, date & time, passengers & luggage
2. **Vehicle Selector** — Skoda Superb, Mercedes E-Class, Mercedes Vito, Mercedes Sprinter
3. **Booking Details** — personal info, payment method (cash on arrival or PayPal)

On submit: booking reference generated → confirmation email sent (Resend) → booking saved to `data/bookings.json`.

### Multilingual (EN / FR / AR)
- Language toggle in the Navbar
- Full Arabic support with automatic RTL layout via `LanguageDirectionSync`
- All strings in `lib/translations.ts` — structured by section (`nav`, `hero`, `booking`, etc.)

### Analytics (Plausible)
- Consent-gated: Plausible script only loads after the user accepts cookies
- Custom events: `booking_started`, `booking_completed`, `contact_submitted`
- Hook: `hooks/usePlausible.ts`

### RGPD / Cookie Consent
- Banner appears on first visit (`components/ui/CookieBanner.tsx`)
- Choice persisted in `localStorage` under key `n2t-cookie-consent`
- Accept → loads Plausible script
- Decline → no tracking, no scripts

### Security
- Rate limiting on all public API routes (`lib/rateLimit.ts` — in-memory)
- Input sanitization before embedding user data in HTML email templates (`lib/sanitize.ts`)
- Security headers: `X-Frame-Options`, `X-Content-Type-Options`, `X-XSS-Protection`, `Referrer-Policy`
- Admin routes protected by httpOnly cookie (`ADMIN_SECRET`)

### SEO
- Per-page `metadata` exports (title, description, keywords, Open Graph, Twitter Card)
- JSON-LD `LocalBusiness` schema in root layout
- `sitemap.xml` at `/sitemap.ts`
- `robots.txt` at `/robots.ts` (blocks `/admin`, `/api/`, `/data/`)

### Admin Dashboard
- Login at `/admin/login` with `ADMIN_SECRET` password
- View all bookings with status (pending / confirmed / completed / cancelled)
- Update booking status in one click
- Session cookie expires after 8 hours

## Deployment (Vercel)

1. Push your code to GitHub.
2. Import the repository at [vercel.com/new](https://vercel.com/new).
3. Add all environment variables from `.env.local` in the Vercel project settings.
4. Deploy — Vercel auto-detects Next.js and builds accordingly.

**Important notes for production:**
- Set `ADMIN_SECRET` to a strong random value
- Use a verified Resend domain for `FROM_EMAIL`
- Switch `NEXT_PUBLIC_PAYPAL_CLIENT_ID` to your Live PayPal client ID
- The `data/bookings.json` file is written to the server filesystem — on Vercel (serverless), this resets on each deployment. For persistent storage, migrate to a database (e.g. PlanetScale, Supabase, or Vercel KV).

## License

Private / All rights reserved — NIGOR 2Transport / Carolina Prestige Travel  
License N° 1754/T/2018 — Ain Borja, Casablanca, Morocco
