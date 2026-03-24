# Portfolio Redesign — High-Contrast Brutalist

**Date:** 2026-03-23
**Author:** Jackson Moores + Claude
**Status:** Draft

## Overview

Complete redesign of jackportfolio from a generic dark-theme template into a distinctive high-contrast brutalist personal website. The site should feel intentional, confident, and anti-template — immediately distinguishable from AI-generated portfolio sites.

This is a full visual teardown. All existing color accents (blue-500), rounded corners, gradients, blurs, and shadows in the current codebase should be removed and replaced with the brutalist design system defined below.

## Visual Identity

### Design Language: High-Contrast Brutalist

- **Color:** Black and white only. No color accents. The entire palette is `#000`, `#fff`, and greys for secondary text/borders.
- **Typography:** Inter variable font (already loaded) at weight 900 for headings with tight negative letter-spacing. `Courier New` / monospace for all metadata, labels, navigation links, and secondary text. Remove any other font imports.
- **Layout:** Grid-based but intentionally asymmetric. Heavy use of horizontal rules (2px black for major dividers, 1px grey for sub-dividers). No rounded corners, no gradients, no shadows, no decorative elements. Content container: full-bleed with no `max-width` on structural elements (nav, section headers, project rows, stats). Text-heavy content areas (About bio, project write-ups) use `max-width: 680px` for comfortable reading line length. Sections use `padding: 0 48px` for horizontal gutting.
- **Density:** Generous whitespace in hero/header areas, tight data-dense rows for project lists and experience.

### Dark/Light Mode Toggle

A simple color inversion. Since the design is purely black-and-white, toggling swaps via CSS custom properties:

| Element          | CSS Variable       | Light Mode | Dark Mode |
|------------------|--------------------|-----------|-----------|
| Background       | `--bg`             | `#fff`    | `#0a0a0a` |
| Primary text     | `--fg`             | `#000`    | `#fff`    |
| Secondary text   | `--text-secondary` | `#555`    | `#aaa`    |
| Metadata text    | `--text-muted`     | `#767676` | `#888`    |
| Major borders    | `--border`         | `#000`    | `#fff`    |
| Minor borders    | `--border-subtle`  | `#ddd`    | `#222`    |
| Hover bg         | `--hover-bg`       | `#000`    | `#fff`    |
| Hover text       | `--hover-fg`       | `#fff`    | `#000`    |
| Subtle bg areas  | `--bg-subtle`      | `#f5f5f5` | `#111`    |

Toggle button in the nav — small, monospace, brutalist (e.g. `◐` or `DARK`/`LIGHT` text). Preference persisted in `localStorage`. Respects `prefers-color-scheme` as default.

**Flash prevention:** Inject a blocking `<script>` in `<head>` (via `layout.tsx`) that reads `localStorage` and applies the `.dark` class before first paint. Do not use `useEffect` — that causes a flash of wrong theme.

### Interactions & Animations

Style: **deliberate and snappy** — animations exist but feel intentional, not decorative.

- **Scroll animations:** Elements translate Y by 8-12px and fade in with `duration: 0.15s, ease: [0.25, 0.1, 0.25, 1]` (CSS ease equivalent). No directional variants, no bounce/spring.
- **Hover states:** Bold and immediate. Project rows and selector items fully invert (bg ↔ text) on hover with ~0.12s transition. Arrow icons appear on hover.
- **Page transitions:** Sharp, minimal. No sliding or morphing.
- **No animation:** Magnetic cursors, parallax, floating elements, or decorative motion.

### Accessibility

- **Contrast:** Metadata text uses `#767676` in light mode (exactly 4.5:1 against white, meeting WCAG AA). Dark mode metadata uses `#888` (4.6:1 against `#0a0a0a`).
- **Reduced motion:** Wrap all Framer Motion animations in a check for `prefers-reduced-motion: reduce`. When enabled, disable scroll entry animations — elements appear immediately.
- **Focus indicators:** 2px solid outline using `var(--fg)` with 2px offset. Consistent with the brutalist border language.
- **ARIA:** `aria-label` on theme toggle button ("Toggle dark mode"), mobile menu button ("Open menu" / "Close menu"), and `<nav>` landmarks.
- **Keyboard:** All interactive elements (project rows, selector boxes, nav links) are focusable and operable via Enter/Space.

## Site Structure

### Pages

1. **Homepage** (`/`) — single-page scroll with all main sections
2. **Projects** (`/projects`) — dedicated project page with selector and detail view

### Homepage Sections (scroll order)

#### 1. Navigation (sticky)
- Left: Name in uppercase, 900 weight, letter-spaced
- Right: Section links in monospace uppercase, resume download button (filled black/inverted), dark/light toggle
- Nav links and their targets:
  - **Projects** → navigates to `/projects`
  - **About** → scrolls to `#about` on homepage
  - **Experience** → scrolls to `#experience` on homepage
  - **Contact** → scrolls to `#contact` on homepage
  - **Resume ↓** → downloads PDF from `/public/resume.pdf` (separate element, not part of the nav links array)
- Bottom border: 2px black
- Sticky on scroll

#### 2. Hero
- Monospace uppercase tagline (e.g. field of study, university)
- Massive headline: 900 weight, ~64-72px, tight letter-spacing, line-height ~0.88
- Bottom row: short monospace description left, "Scroll ↓" text indicator right (static monospace text, no animation — clicking it smooth-scrolls to the next section)
- Bottom border: 2px black

#### 3. Selected Work
- Section header bar: "Selected Work" label left, project count right
- Project rows: numbered (01, 02, etc.), project name in bold, tech stack in monospace right-aligned, arrow appears on hover
- Full row inverts black on hover
- Clicking a row navigates to `/projects?project=<slug>` with that project pre-selected
- Bottom border: 2px black after last row

#### 4. About
- Two-column grid split by 1px vertical border
- Left column: bio paragraphs in 15px, comfortable line-height, max-width 680px
- Right column: skills organized by category with bordered monospace tags
- Bottom border: 2px black

#### 5. Experience
- Flexible row layout: year | role + company | brief description
- Designed for easy content addition — data-driven from `src/data/experience.ts`
- Placeholder rows initially, populated from resume when available
- Bottom border: 2px black after last row

#### 6. Education
- Single row: school name (bold, left) and program + graduation date (monospace, right)
- Education is not a navigable section in the nav — it lives between Experience and Contact as a brief informational row
- Hardcoded directly in the component (single row, not data-driven)
- Bottom border: 2px black

#### 7. Contact
- Centered layout
- Bold uppercase heading
- Monospace subtitle (open to opportunities message)
- Links as underlined monospace text: Email, GitHub, LinkedIn
- No form — just direct links

#### 8. Footer
- Minimal: copyright left, "Built with Next.js" right
- Monospace, uppercase, letter-spaced
- Top border: 2px black

### Projects Page (`/projects`)

#### Page Header
- Big "PROJECTS" title (~64px, 900 weight)
- One-line monospace description underneath
- Bottom border: 2px black

#### Project Selector
- "Select a project" label bar
- 4-column grid of project boxes (2-column on tablet, single-column on mobile)
- Each box: number, name, tech stack
- Active project: inverted (black bg, white text)
- Hover: subtle grey background
- Clicking a box swaps the project content below in place (no page navigation)
- URL updates to `/projects?project=<slug>` so selections are linkable
- When no `?project=` parameter is present, the first project is selected by default
- Bottom border: 2px black

#### Project Detail (below selector)

**Project Hero:**
- Large project title (~48px, 900 weight)
- Metadata row: status, timeline, role, GitHub link
- Tech tags with bordered monospace styling

**Key Stats:**
- 3-column grid with large stat numbers and monospace labels
- Borders between columns

**Visual Area:**
- Screenshot, diagram, or visualization for the project
- Placeholder initially — can add real images later

**Detailed Write-up:**
- Two-column: sticky sidebar navigation left (Overview, Approach, Results, Learnings), content right (max-width 680px)
- Sidebar nav items are anchor links that smooth-scroll within the content area
- All sections are rendered; sidebar highlights the currently visible section via Intersection Observer (threshold ~0.5). Active sidebar link styled with `var(--hover-bg)` background and `var(--hover-fg)` text, consistent with the inversion pattern used elsewhere.
- On mobile: sidebar moves above content as a horizontal scrollable row
- Content in comfortable reading typography (15px, 1.8 line-height)
- Placeholder content is acceptable for initial implementation — detailed write-ups can be added later

## Data Models

### Project

```typescript
interface Project {
  slug: string;              // Manually defined, kebab-case (e.g. "derivative-modelling", "homesafe")
  title: string;             // Display title
  description: string;       // Short description for homepage row
  tags: string[];            // Tech stack tags
  status: string;            // Freeform: "In Progress", "Complete", "QHacks 2024 — 6th Place", etc.
  timeline: string;          // e.g. "2025 — Present"
  role: string;              // e.g. "Solo Developer"
  githubUrl?: string;        // Optional GitHub link
  stats: { value: string; label: string }[];  // Key stats (3 items)
  image?: string;            // Optional path to screenshot/diagram in /public
  sections: {                // Detailed write-up content
    overview: string;
    approach: string;
    results: string;
    learnings: string;
  };
}
```

### Experience

```typescript
interface Experience {
  year: string;        // e.g. "2025"
  role: string;        // e.g. "Software Engineering Intern"
  company: string;     // e.g. "Company Name"
  description: string; // Brief 1-2 sentence description
}
```

### Skills (restructured)

```typescript
// Replaces the existing flat SKILLS string array
const SKILLS: { category: string; items: string[] }[] = [
  { category: "Languages", items: ["Python", "C++", "C", "Java", "C#", "SQL"] },
  { category: "Tools & Libraries", items: ["NumPy", "Pandas", "PyTorch", "Matplotlib", "Git", "MATLAB"] },
  { category: "Domains", items: ["Algorithms", "Quantitative Finance"] },
];
```

### Nav Links

```typescript
// Replaces existing NAV_LINKS. Resume is a separate element in the nav component, not part of this array.
const NAV_LINKS: { label: string; href: string; type: "route" | "anchor" }[] = [
  { label: "Projects", href: "/projects", type: "route" },
  { label: "About", href: "#about", type: "anchor" },
  { label: "Experience", href: "#experience", type: "anchor" },
  { label: "Contact", href: "#contact", type: "anchor" },
];
```

## Technical Architecture

### Stack
- **Framework:** Next.js 16 with App Router (existing)
- **React:** 19 (existing)
- **Styling:** Tailwind CSS 4 (existing) — CSS custom properties for theme colors, toggled via class on `<html>`
- **Animations:** Framer Motion (existing) — `whileInView` for scroll entry, short durations
- **TypeScript** (existing)

### Dark Mode Implementation
- CSS custom properties as defined in the color table above
- `.dark` class on `<html>` element toggles variable values
- Default: respect `prefers-color-scheme` media query
- Override: user toggle, saved to `localStorage`
- Blocking `<script>` in `<head>` reads `localStorage` and sets `.dark` class before first paint

### Data Architecture
- `src/data/projects.ts` — project definitions with all detail content (existing, will be expanded to match `Project` interface above)
- `src/lib/constants.ts` — personal info, nav links (updated to new structure), skills restructured to categorized format
- `src/data/experience.ts` — new file for experience entries matching `Experience` interface above
- Resume PDF in `/public/resume.pdf` — resume download button is conditionally rendered (hidden if file doesn't exist)

### Component Structure
```
src/
  app/
    layout.tsx          — root layout, Inter font, theme blocking script
    page.tsx            — homepage (assembles sections)
    projects/
      page.tsx          — projects page
    globals.css         — Tailwind + CSS custom properties for theming
  components/
    nav.tsx             — sticky nav with theme toggle, resume button
    hero.tsx            — homepage hero
    selected-work.tsx   — project row list
    project-row.tsx     — individual project row with hover inversion
    about.tsx           — two-column about section with categorized skills
    experience.tsx      — experience rows
    education.tsx       — education row (hardcoded content)
    contact.tsx         — contact section
    footer.tsx          — footer
    section-header.tsx  — reusable section header bar
    theme-toggle.tsx    — dark/light mode toggle button
    snap-in.tsx         — reusable Framer Motion scroll-entry wrapper (replaces fade-in.tsx)
    projects/
      project-selector.tsx  — project grid selector
      project-detail.tsx    — full project detail view
      project-stats.tsx     — 3-column stats
      project-content.tsx   — sidebar nav + write-up content
  data/
    projects.ts         — project definitions (expanded)
    experience.ts       — experience entries (new)
  lib/
    constants.ts        — personal info, nav, skills (expanded)
```

### Responsive Design
- Desktop-first for the brutalist grid layouts
- Mobile nav: full-screen overlay with the same brutalist styling — black background, white text, links stacked vertically in large monospace uppercase. Hamburger icon is a simple `≡` / `✕` toggle.
- Project selector: 4-column on desktop, 2-column on tablet (`md:`), single-column on mobile
- Two-column sections (About, Project Content): collapse to single column on mobile
- Project detail sidebar nav: moves above content as a horizontal scrollable row on mobile
- Breakpoints via Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`)

## Out of Scope
- Blog
- Interactive demos
- CMS integration
- Contact form
- Analytics
- SEO beyond basic meta tags
