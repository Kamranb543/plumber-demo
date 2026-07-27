# AI_CONTEXT.md — Plumber Website Showcase Portal

## 1. Core Tech Stack & Versions

| Package | Version | Role |
|---|---|---|
| next | 16.2.9 | App Router, SSR, Server Components |
| react | 19.2.4 | UI rendering |
| react-dom | 19.2.4 | DOM binding |
| tailwindcss | ^4.x | Utility CSS (v4 syntax — `@import "tailwindcss"`) |
| @tailwindcss/postcss | ^4.x | PostCSS integration for Tailwind v4 |
| lucide-react | ^1.21.0 | All icons (no other icon library used) |
| typescript | ^5.x | Strict mode enabled |
| eslint-config-next | 16.2.9 | Linting |

**Runtime:** Node.js (Windows). Dev: `npm run dev` → Turbopack. No Webpack.  
**Path alias:** `@/*` → `./src/*`  
**JSX mode:** `react-jsx` (no explicit React import needed except when using JSX types)

---

## 2. System Architecture & Data Flow

### Overall Project Purpose
A **website template showcase portal** for UK plumbing businesses. Six independent demo templates, each a complete standalone layout. A root selection page (`/`) lets clients browse and preview. Demos 5 and 6 support dynamic branding via URL parameters.

### App Router Structure
```
/ (root)               → Static client page listing all 6 demos
/demo1                 → Full SPA client page (static brand vars)
/demo2                 → Full SPA client page (static brand vars)
/demo3                 → Multi-page client page (static brand vars)
/demo4                 → Multi-page client page (static brand vars)
/demo5/[[...brandName]] → Dynamic brand SPA (server entry → client view)
/demo6/[[...brandName]] → Dynamic brand multipage (server layout → client layout → client page)
```

### Dynamic Branding Data Flow (Demo 5 & 6)

```
URL: /demo6/big-boss-plumbers/services
        │
        ▼
layout.tsx [Server Component]
  - Reads cookies() → "global-theme" cookie
  - Resolves isDarkModeDefault: boolean (default: false = light)
  - Renders <LayoutClient isDarkModeDefault={...}>
        │
        ▼
layout-client.tsx [Client Component "use client"]
  - Owns ThemeContext (createContext → Provider)
  - Parses useParams() → brandParam array
  - Segment 0 = brandSlug ("big-boss-plumbers")
  - Segment 1 = pageName ("services")
  - Formats brandSlug → BRAND_NAME ("Big Boss Plumbers")
  - Renders sticky header, footer, mobile menu
  - handleSetIsDarkMode() → sets state + writes cookie + writes localStorage
        │
        ▼
page.tsx [Client Component "use client"]
  - Calls useTheme() from layout-client.tsx context
  - Reads useParams() independently to parse brandSlug + pageName
  - Switch on pageName → renders subpage view component
  - Passes {brandName, isDarkMode, brandSlug} as props to subviews
        │
        ▼
Demo6Home | Demo6About | Demo6Services | Demo6Projects | Demo6Blog | Demo6Contact
  - Pure display components (no state)
  - Receive isDarkMode + brandName + brandSlug as props
  - linkPrefix = brandSlug ? `/demo6/${brandSlug}` : "/demo6"
```

### Theme System (Global Master Variable)

**Cookie:** `global-theme` (`"dark"` | `"light"`) — path `/`, max-age 1 year  
**Storage:** `localStorage["global-theme"]` (secondary sync)  
**Default:** Light mode (`isDarkModeDefault = theme === "dark"` — falsy if cookie absent)  
**Flow on toggle:**
1. Client handler calls `handleSetIsDarkMode(val)` / `handleToggleDarkMode()`
2. Sets React state immediately (instant UI update)
3. Writes `document.cookie` with `global-theme` value
4. Writes `localStorage.setItem("global-theme", ...)`
5. On next navigation: Server Component reads cookie → passes correct default → no flash

**Scope:** Demo 5 and Demo 6 share the same `"global-theme"` cookie key. Demos 1–4 have no theme system.

### URL Parsing Logic (Demo 5 & 6)
```typescript
// brandParam = useParams().brandName → string[]
if (length === 1) {
  if (isPageName(p1)) pageName = p1;      // /demo6/about
  else brandSlug = p1;                     // /demo6/big-boss-plumbers
} else if (length >= 2) {
  brandSlug = brandParam[0];               // /demo6/big-boss-plumbers/about
  pageName = brandParam[1];
}
```

### Dynamic Logo Icon Mapping
```typescript
// Keyword → Lucide icon (getDynamicIcon() in layout-client.tsx)
"heat"|"boiler"|"fire"|"gas"|"flame" → Flame
"water"|"flow"|"leak"|"droplet"|"drain" → Droplet
"safe"|"shield"|"audit"|"secure" → ShieldCheck
(fallback) → Wrench
```

---

## 3. Coding Standards & Constraints

### Component Boundaries
- **Server Components** (entry `layout.tsx`/`page.tsx` for Demo 5/6): ONLY read cookies + pass props. No JSX UI.
- **Client Components** (`layout-client.tsx`, `page-client.tsx`, demos 1–4 `page.tsx`): All UI, state, hooks.
- NEVER use `"use client"` on Server Component entry files.
- NEVER import `cookies()` from `next/headers` in a client component.

### Tailwind v4 Rules
- Import: `@import "tailwindcss"` (NOT `@tailwind base/components/utilities`)
- Custom tokens: `@theme inline { --color-*: ...; }` syntax
- Custom animation classes defined in `<style jsx global>` blocks in page/layout files
- NEVER use non-standard Tailwind scale values as reliable classes (e.g., `bg-indigo-650`)
- NEVER use `@tailwind` directive — it's v3 syntax

### Routing Constraints (CRITICAL)
- `[[...brandName]]` must be the **terminal leaf** directory. NEVER nest static subdirs inside it.
- Nesting `about/`, `services/` etc. under `[[...brandName]]/` causes fatal Turbopack error.
- All Demo 6 subpages are client-side via `switch(pageName)` in single `page.tsx`.

### State Management
- No Redux, Zustand, or external state libraries. Local `useState` only.
- Theme default: ALWAYS `useState(isDarkModeDefault)` from server prop. NEVER `useState(true)`.
- ThemeContext is scoped to Demo 6 only (in `layout-client.tsx`). Demo 5 uses direct prop drilling.

### TypeScript
- `"strict": true`. All props explicitly typed. No implicit `any`.
- `useParams()` returns `Record<string, string | string[]>` — always `Array.isArray()` check before accessing array elements.

### Business Config Pattern
- Module-level `const` at file top: `const BUSINESS_NAME = "..."`, `const CONTACT_PHONE = "..."`
- Demo 5/6: brand name derived from URL slug at runtime — never hardcoded.

### Icon Library
- ONLY `lucide-react`. No FontAwesome, Heroicons, etc.
- Per-file named imports only. No barrel re-exports.

### Images
- All photography: Unsplash CDN URLs (`images.unsplash.com`). No local assets.
- Demos 5/6 use raw `<img>` tags. Demos 1–4 import `next/image`.

### Animation Pattern (Demo 6)
```tsx
// Inline in page.tsx via <style jsx global>
.animate-slide-up { opacity:0; animation: slideUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards; }
.delay-100 through .delay-700 { animation-delay: Nms; }
// Applied: className="animate-slide-up delay-200"
```

### Things AI Must NEVER Do
1. Nest static routes under `[[...brandName]]/` — breaks Turbopack fatally
2. Use `localStorage` or `document.cookie` in Server Components
3. Use `cookies()` from `next/headers` in `"use client"` files
4. Initialize dark mode as `useState(true)` — must use `useState(isDarkModeDefault)` from prop
5. Use Tailwind v3 directives (`@tailwind base`, etc.)
6. Import from `./layout` in Demo 6 `page.tsx` — must import from `./layout-client`
7. Create separate page files for Demo 6 subpages — all views are functions in single `page.tsx`
8. Use any CSS framework other than Tailwind v4
9. Use `next/font` in client components — font setup is in root `src/app/layout.tsx`
10. Hardcode brand names in Demo 5/6 — derived from URL slug only
