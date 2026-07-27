# REPO_MAP.md — Plumber Website Showcase Portal

## Folder Tree

```
plumber-website/
├── AI_CONTEXT.md                          ← AI technical context (this repo)
├── REPO_MAP.md                            ← This file
├── next.config.ts                         ← Minimal Next.js config (no special plugins)
├── tsconfig.json                          ← Strict TS, moduleResolution: bundler, @/* alias
├── postcss.config.mjs                     ← @tailwindcss/postcss only
├── package.json                           ← Dependencies (next 16.2.9, react 19, tailwind 4)
└── src/
    └── app/                               ← Next.js App Router root
        ├── layout.tsx                     ← Root Server Layout (fonts, metadata, <html>)
        ├── globals.css                    ← Tailwind v4 import + CSS variables + body base
        ├── page.tsx                       ← Root Showcase Portal (client, lists all 6 demos)
        │
        ├── demo1/
        │   └── page.tsx                   ← Emergency SPA (client, static brand vars)
        │
        ├── demo2/
        │   └── page.tsx                   ← Minimalist SPA (client, static brand vars)
        │
        ├── demo3/
        │   ├── page.tsx                   ← Classic multi-page home (client)
        │   ├── about/page.tsx             ← About subpage
        │   ├── services/page.tsx          ← Services subpage
        │   └── contact/page.tsx           ← Contact subpage
        │
        ├── demo4/
        │   ├── page.tsx                   ← Corporate home (client)
        │   ├── services/page.tsx          ← Services subpage
        │   ├── contact/page.tsx           ← Contact subpage
        │   └── contracts/page.tsx         ← SLA contracts subpage
        │
        ├── demo5/
        │   └── [[...brandName]]/
        │       ├── page.tsx               ← Server entry: reads cookie → passes isDarkModeDefault
        │       └── page-client.tsx        ← Full SPA client view (parallax, snap-scroll)
        │
        └── demo6/
            └── [[...brandName]]/
                ├── layout.tsx             ← Server entry: reads cookie → passes isDarkModeDefault
                ├── layout-client.tsx      ← Client layout: ThemeContext, header, footer, nav
                └── page.tsx              ← Client page: URL router + all 6 subpage view fns
```

---

## Key Files & Responsibilities

| File | Type | Responsibility |
|---|---|---|
| `src/app/layout.tsx` | Server | Root HTML shell; loads Geist fonts via `next/font`; sets global metadata |
| `src/app/globals.css` | CSS | Tailwind v4 import, CSS custom properties (`--background`, `--foreground`), base body styles |
| `src/app/page.tsx` | Client | Showcase dashboard; renders 6 demo cards with descriptions, features, and nav links |
| `src/app/demo1/page.tsx` | Client | Emergency high-conversion SPA; static business vars; booking modal; live dispatch cards |
| `src/app/demo2/page.tsx` | Client | Minimalist contemporary SPA; interactive price slider; postcode coverage checker |
| `src/app/demo3/page.tsx` | Client | Traditional multi-page home; top contact ribbon; inline hero quote form |
| `src/app/demo4/page.tsx` | Client | Corporate B2B home; dark slate theme; SLA plan comparison; tender upload simulation |
| `src/app/demo5/[[...brandName]]/page.tsx` | **Server** | Reads `global-theme` cookie → passes `isDarkModeDefault` prop to `page-client.tsx` |
| `src/app/demo5/[[...brandName]]/page-client.tsx` | **Client** | Full snap-scroll parallax SPA; handles `isDarkModeDefault` prop; `handleToggleDarkMode()` writes cookie + localStorage |
| `src/app/demo6/[[...brandName]]/layout.tsx` | **Server** | Reads `global-theme` cookie → passes `isDarkModeDefault` to `layout-client.tsx` |
| `src/app/demo6/[[...brandName]]/layout-client.tsx` | **Client** | `ThemeContext` provider; sticky nav; mobile menu; footer; dynamic logo icon mapping; `handleSetIsDarkMode()` writes cookie + localStorage |
| `src/app/demo6/[[...brandName]]/page.tsx` | **Client** | URL segment parser; `switch(pageName)` router; contains all 6 subpage view functions; global `slideUp` keyframe injection |

---

## Demo Feature Matrix

| Demo | Route Type | Theme | Branding | Layout |
|---|---|---|---|---|
| demo1 | Static single-page | Light only | Hardcoded | SPA |
| demo2 | Static single-page | Light only | Hardcoded | SPA |
| demo3 | Static multi-page | Light only | Hardcoded | Multi-page (App Router) |
| demo4 | Static multi-page | Light only | Hardcoded | Multi-page (App Router) |
| demo5 | Dynamic `[[...brandName]]` | Light/Dark (cookie) | URL slug → brand name | SPA (snap-scroll, parallax) |
| demo6 | Dynamic `[[...brandName]]` | Light/Dark (cookie) | URL slug → brand name | Multi-page (client-side switch) |

---

## Component Relationships

### Demo 6 (Most Complex)
```
layout.tsx [Server]
  └── layout-client.tsx [Client — "use client"]
        ├── ThemeContext.Provider
        │     ├── isDarkMode: boolean
        │     └── setIsDarkMode: (val: boolean) => void
        ├── Sticky Header (logo, nav links, toggle button, CTA)
        ├── Mobile Menu (conditional, closes on pathname change)
        ├── <main>{children}</main>  ←── page.tsx renders here
        └── Footer (contact, nav shortcuts, copyright)

page.tsx [Client — "use client"]
  ├── useTheme() ← from layout-client.tsx ThemeContext
  ├── useParams() → parses brandSlug + pageName
  └── switch(pageName) renders one of:
        ├── Demo6Home({ brandName, isDarkMode, brandSlug })
        ├── Demo6About({ brandName, isDarkMode, brandSlug })
        ├── Demo6Services({ brandName, isDarkMode, brandSlug })
        │     └── Interactive Symptom Diagnostics Widget (useState)
        ├── Demo6Projects({ brandName, isDarkMode, brandSlug })
        │     └── Before/After Toggle per project (useState)
        ├── Demo6Blog({ brandName, isDarkMode, brandSlug })
        └── Demo6Contact({ brandName, isDarkMode, brandSlug })
              ├── Booking Form (useState for fields, errors, submit)
              └── Cost Estimator Widget (useState for serviceType, propertySize)
```

### Demo 5
```
page.tsx [Server]
  └── page-client.tsx [Client — "use client"]
        ├── isDarkMode: useState(isDarkModeDefault)
        ├── handleToggleDarkMode() → cookie + localStorage
        ├── containerRef + scrollY state (parallax)
        └── Full single-page sections (Hero, How It Works, About, Services, Reviews, Contact)
```

### Root Portal
```
src/app/page.tsx [Client]
  └── Renders 6 demo cards
        └── Each card: Link → /demo1..6 (or /demo5/[[brand]], /demo6/[[brand]])
```

---

## Theme Cookie Data Flow (Sequence)

```
User clicks toggle
  → handleSetIsDarkMode(true)
  → setIsDarkMode(true)                          [instant React re-render]
  → document.cookie = "global-theme=dark; ..."   [browser cookie set]
  → localStorage.setItem("global-theme","dark")  [localStorage backup]

User navigates to /demo6/brand/about
  → layout.tsx [Server Component]
  → cookieStore.get("global-theme").value === "dark"
  → isDarkModeDefault = true
  → <LayoutClient isDarkModeDefault={true}>       [no hydration flash]
  → useState(true) → correct initial render
```

---

## Naming Conventions

| Pattern | Example |
|---|---|
| Demo subpage view function | `Demo6Home`, `Demo6About`, `Demo6Services` |
| Server entry files | `layout.tsx`, `page.tsx` (no "use client") |
| Client component files | `layout-client.tsx`, `page-client.tsx` |
| Business config constants | `CONTACT_PHONE`, `BRAND_NAME`, `GAS_SAFE_REG` |
| Theme cookie key | `"global-theme"` |
| Link prefix variable | `linkPrefix = brandSlug ? /demo6/${brandSlug} : "/demo6"` |
| Dynamic icon getter | `getDynamicIcon()` → returns Lucide component |
| Slug formatter | `formatBrandName(slug)` → kebab/snake → Title Case |
