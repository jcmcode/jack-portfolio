# Portfolio Redesign — High-Contrast Brutalist Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the portfolio from a generic dark template into a distinctive high-contrast brutalist website with dark/light mode toggle, homepage, and dedicated projects page.

**Architecture:** Full visual teardown of existing components. New CSS custom property-based theming system with `.dark` class toggle. Data layer expanded with richer project/experience models. Two pages: homepage (single-page scroll) and projects page (selector + detail view).

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS 4, Framer Motion, TypeScript

**Spec:** `docs/superpowers/specs/2026-03-23-portfolio-redesign-design.md`

---

## File Structure

### Files to Create
- `src/data/experience.ts` — experience entries
- `src/components/theme-toggle.tsx` — dark/light mode toggle
- `src/components/snap-in.tsx` — scroll-entry animation wrapper
- `src/components/selected-work.tsx` — project row list for homepage
- `src/components/project-row.tsx` — individual project row
- `src/components/experience.tsx` — experience section
- `src/components/education.tsx` — education row
- `src/app/projects/page.tsx` — projects page
- `src/components/projects/project-selector.tsx` — project grid selector
- `src/components/projects/project-detail.tsx` — full project detail view
- `src/components/projects/project-stats.tsx` — 3-column stats
- `src/components/projects/project-content.tsx` — sidebar nav + write-up

### Files to Modify
- `src/app/globals.css` — complete rewrite for theme variables
- `src/app/layout.tsx` — add theme blocking script, update metadata
- `src/app/page.tsx` — new section assembly
- `src/lib/constants.ts` — restructure skills, update nav links
- `src/data/projects.ts` — expand Project interface and data
- `src/components/nav.tsx` — complete rewrite
- `src/components/hero.tsx` — complete rewrite
- `src/components/section-header.tsx` — rewrite (rename from section-heading.tsx)
- `src/components/about.tsx` — complete rewrite
- `src/components/contact.tsx` — complete rewrite
- `src/components/footer.tsx` — complete rewrite

### Files to Delete
- `src/components/fade-in.tsx` — replaced by snap-in.tsx
- `src/components/section-heading.tsx` — replaced by section-header.tsx
- `src/components/projects.tsx` — replaced by selected-work.tsx
- `src/components/project-card.tsx` — replaced by project-row.tsx
- `src/components/social-links.tsx` — absorbed into contact.tsx

---

## Task 1: Theme Foundation — CSS Variables & Global Styles

**Files:**
- Rewrite: `src/app/globals.css`

This task sets up the entire theming system that every subsequent component depends on.

- [ ] **Step 1: Rewrite globals.css with CSS custom properties**

```css
@import "tailwindcss";

@theme inline {
  --font-sans: var(--font-inter), system-ui, sans-serif;
  --font-mono: "Courier New", "Courier", monospace;
}

/* Light mode (default) */
:root {
  --bg: #fff;
  --fg: #000;
  --text-secondary: #555;
  --text-muted: #767676;
  --border: #000;
  --border-subtle: #ddd;
  --hover-bg: #000;
  --hover-fg: #fff;
  --bg-subtle: #f5f5f5;
}

/* Dark mode */
.dark {
  --bg: #0a0a0a;
  --fg: #fff;
  --text-secondary: #aaa;
  --text-muted: #888;
  --border: #fff;
  --border-subtle: #222;
  --hover-bg: #fff;
  --hover-fg: #000;
  --bg-subtle: #111;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--bg);
  color: var(--fg);
  font-family: var(--font-sans);
  transition: background-color 0.15s, color 0.15s;
}

/* Focus indicators — brutalist 2px outline */
:focus-visible {
  outline: 2px solid var(--fg);
  outline-offset: 2px;
}
```

- [ ] **Step 2: Verify build passes**

Run: `cd /Users/jack/Documents/code/jackportfolio && npm run build`
Expected: Build succeeds (existing components will look broken — that's fine, we're tearing them down)

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: replace global styles with brutalist CSS custom properties theme system"
```

---

## Task 2: Data Layer — Expand Projects, Create Experience, Restructure Constants

**Files:**
- Modify: `src/data/projects.ts`
- Create: `src/data/experience.ts`
- Modify: `src/lib/constants.ts`

- [ ] **Step 1: Rewrite src/data/projects.ts with expanded interface**

```typescript
export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  status: string;
  timeline: string;
  role: string;
  githubUrl?: string;
  stats: { value: string; label: string }[];
  image?: string;
  sections: {
    overview: string;
    approach: string;
    results: string;
    learnings: string;
  };
}

export const projects: Project[] = [
  {
    slug: "derivative-modelling",
    title: "Derivative Modelling",
    description:
      "Financial modeling toolkit using the Breeden-Litzenberger theorem for extracting risk-neutral probability distributions from option prices.",
    tags: ["Python", "NumPy", "Quantitative Finance"],
    status: "In Progress",
    timeline: "2025 — Present",
    role: "Solo Developer",
    githubUrl: "https://github.com/jcmcode",
    stats: [
      { value: "3", label: "Pricing Models" },
      { value: "~2K", label: "Lines of Code" },
      { value: "PDF", label: "Risk-Neutral Dist." },
    ],
    sections: {
      overview:
        "A financial modeling toolkit that uses the Breeden-Litzenberger theorem to extract risk-neutral probability distributions from option prices. The goal is to build an intuitive system for pricing derivatives and understanding implied market expectations.",
      approach:
        "Option chain data ingestion and cleaning pipeline. Numerical differentiation of call prices to extract risk-neutral PDFs. Monte Carlo simulation for exotic derivative pricing. Visualization suite for probability distributions and Greeks.",
      results:
        "Successfully extracted implied probability distributions that closely match historical realized distributions. The toolkit provides a clean interface for exploring how market expectations shift across different expiration dates.",
      learnings:
        "Deepened understanding of the relationship between option prices and probabilistic expectations. Practical challenges of numerical methods — noise handling, interpolation choices, and the importance of robust data pipelines.",
    },
  },
  {
    slug: "wildfire-containment",
    title: "Wildfire Containment Algorithm",
    description:
      "UAV coordination system using Lloyd's algorithm for optimal wildfire containment positioning.",
    tags: ["C++", "Algorithms"],
    status: "Complete",
    timeline: "2024",
    role: "Solo Developer",
    stats: [
      { value: "Lloyd's", label: "Core Algorithm" },
      { value: "Multi", label: "UAV Coordination" },
      { value: "C++", label: "Implementation" },
    ],
    sections: {
      overview:
        "A system for coordinating multiple UAVs to optimally contain wildfire spread using Lloyd's algorithm for Voronoi-based positioning.",
      approach:
        "Implemented Lloyd's algorithm to iteratively compute optimal UAV positions based on fire perimeter geometry. Simulation engine models fire spread dynamics to test containment strategies.",
      results:
        "Achieved effective containment positioning that adapts to changing fire perimeters in real-time simulation.",
      learnings:
        "Gained experience with computational geometry, Voronoi diagrams, and real-time optimization under changing constraints.",
    },
  },
  {
    slug: "mars-rover",
    title: "Autonomous Mars Rover",
    description:
      "LiDAR-based autonomous navigation system for Mars rover traversal over uneven terrain.",
    tags: ["C++", "LiDAR"],
    status: "Complete",
    timeline: "2024",
    role: "Team Project",
    stats: [
      { value: "LiDAR", label: "Sensor Suite" },
      { value: "A*", label: "Path Planning" },
      { value: "C++", label: "Implementation" },
    ],
    sections: {
      overview:
        "An autonomous navigation system for a Mars rover prototype that uses LiDAR sensing to traverse uneven terrain without human intervention.",
      approach:
        "Point cloud processing from LiDAR data to build terrain maps. A* pathfinding with terrain cost heuristics. Real-time obstacle detection and path replanning.",
      results:
        "Successfully navigated simulated Martian terrain with obstacle avoidance and efficient path planning.",
      learnings:
        "Learned about sensor fusion, real-time systems constraints, and the challenges of autonomous decision-making in uncertain environments.",
    },
  },
  {
    slug: "homesafe",
    title: "HomeSafe",
    description:
      "AI-powered safety route optimizer built at QHacks 2024, placing 6th overall.",
    tags: ["QHacks 2024", "AI", "Safety"],
    status: "QHacks 2024 — 6th Place",
    timeline: "2024",
    role: "Hackathon Team",
    stats: [
      { value: "6th", label: "QHacks Placement" },
      { value: "36h", label: "Build Time" },
      { value: "AI", label: "Route Optimization" },
    ],
    sections: {
      overview:
        "An AI-powered route optimization tool that finds the safest walking routes by analyzing crime data, lighting conditions, and foot traffic patterns.",
      approach:
        "Aggregated public safety data sources. Built a weighted graph model where edge costs incorporate safety metrics. AI model scores route segments for relative safety.",
      results:
        "Placed 6th overall at QHacks 2024. Judges highlighted the practical impact and clean UX of the safety route recommendations.",
      learnings:
        "First major hackathon experience. Learned to scope aggressively, divide work effectively in a team, and present technical work to non-technical judges.",
    },
  },
];
```

- [ ] **Step 2: Create src/data/experience.ts**

```typescript
export interface Experience {
  year: string;
  role: string;
  company: string;
  description: string;
}

// These are intentional visible placeholders. Jackson will replace them
// with real data from his resume. Do not try to source real data — commit as-is.
export const experiences: Experience[] = [
  {
    year: "2025",
    role: "Role Title",
    company: "Company / Organization",
    description: "Brief description of work and impact.",
  },
  {
    year: "2024",
    role: "Role Title",
    company: "Company / Organization",
    description: "Brief description of work and impact.",
  },
];
```

- [ ] **Step 3: Rewrite src/lib/constants.ts with restructured data**

```typescript
export const PERSONAL = {
  name: "Jackson Moores",
  tagline: "Applied Mathematics & Computer Engineering",
  intro:
    "Modeling derivatives, designing algorithms, and engineering systems that solve real problems.",
  email: "jcmoores@outlook.com",
  location: "Kingston, ON",
  university: "Queen's University",
  graduation: "May 2027",
};

export const NAV_LINKS: { label: string; href: string; type: "route" | "anchor" }[] = [
  { label: "Projects", href: "/projects", type: "route" },
  { label: "About", href: "/#about", type: "anchor" },
  { label: "Experience", href: "/#experience", type: "anchor" },
  { label: "Contact", href: "/#contact", type: "anchor" },
];

export const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/jcmcode" },
  { label: "LinkedIn", href: "https://linkedin.com/in/jackson-moores" },
];

export const SKILLS: { category: string; items: string[] }[] = [
  { category: "Languages", items: ["Python", "C++", "C", "Java", "C#", "SQL"] },
  {
    category: "Tools & Libraries",
    items: ["NumPy", "Pandas", "PyTorch", "Matplotlib", "Git", "MATLAB"],
  },
  { category: "Domains", items: ["Algorithms", "Quantitative Finance"] },
];
```

- [ ] **Step 4: Verify data files have no syntax errors**

Run: `cd /Users/jack/Documents/code/jackportfolio && npx tsc --noEmit src/data/projects.ts src/data/experience.ts src/lib/constants.ts`
Note: A full `npm run build` WILL fail at this point because existing components (`about.tsx`, `nav.tsx`, `project-card.tsx`, etc.) still reference the old data shapes. Do NOT try to fix those — they are completely rewritten in Tasks 5-10.

- [ ] **Step 5: Commit**

```bash
git add src/data/projects.ts src/data/experience.ts src/lib/constants.ts
git commit -m "feat: expand data models for brutalist redesign — projects, experience, skills"
```

---

## Task 3: Layout & Theme Script

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Rewrite layout.tsx with theme blocking script**

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Jackson Moores",
  description:
    "Applied Mathematics & Computer Engineering — Queen's University",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Verify build passes**

Run: `cd /Users/jack/Documents/code/jackportfolio && npm run build`

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: add theme blocking script and update layout for brutalist redesign"
```

---

## Task 4: Shared Components — SnapIn, SectionHeader, ThemeToggle

**Files:**
- Create: `src/components/snap-in.tsx`
- Create: `src/components/theme-toggle.tsx`
- Create: `src/components/section-header.tsx` (new file, old one will be deleted later)

- [ ] **Step 1: Create snap-in.tsx**

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";

interface SnapInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function SnapIn({ children, delay = 0, className }: SnapInProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Create theme-toggle.tsx**

```tsx
"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle({ className }: { className?: string }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className={`font-mono text-[10px] uppercase tracking-[2px] transition-colors duration-150 cursor-pointer ${className ?? ""}`}
      style={{ color: className ? undefined : "var(--text-muted)" }}
    >
      {dark ? "LIGHT" : "DARK"}
    </button>
  );
}
```

- [ ] **Step 3: Create new section-header.tsx**

```tsx
interface SectionHeaderProps {
  label: string;
  right?: string;
}

export default function SectionHeader({ label, right }: SectionHeaderProps) {
  return (
    <div
      className="flex justify-between items-baseline"
      style={{
        padding: "16px 48px",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <span
        className="font-mono text-[10px] uppercase tracking-[3px]"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </span>
      {right && (
        <span
          className="font-mono text-[10px]"
          style={{ color: "var(--text-muted)" }}
        >
          {right}
        </span>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Verify build passes**

Run: `cd /Users/jack/Documents/code/jackportfolio && npm run build`

- [ ] **Step 5: Commit**

```bash
git add src/components/snap-in.tsx src/components/theme-toggle.tsx src/components/section-header.tsx
git commit -m "feat: add shared components — SnapIn, ThemeToggle, SectionHeader"
```

---

## Task 5: Navigation

**Files:**
- Rewrite: `src/components/nav.tsx`

- [ ] **Step 1: Rewrite nav.tsx with brutalist design**

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";
import ThemeToggle from "./theme-toggle";

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50"
      style={{
        backgroundColor: "var(--bg)",
        borderBottom: "2px solid var(--border)",
      }}
      aria-label="Main navigation"
    >
      <div className="flex justify-between items-center" style={{ padding: "20px 48px" }}>
        {/* Logo */}
        <Link
          href="/"
          className="text-[13px] font-black tracking-[4px] uppercase"
          style={{ color: "var(--fg)" }}
        >
          Jackson Moores
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) =>
            link.type === "route" ? (
              <Link
                key={link.label}
                href={link.href}
                className="font-mono text-[10px] uppercase tracking-[2px] transition-colors duration-150 hover:opacity-100"
                style={{ color: "var(--text-muted)" }}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="font-mono text-[10px] uppercase tracking-[2px] transition-colors duration-150 hover:opacity-100"
                style={{ color: "var(--text-muted)" }}
              >
                {link.label}
              </a>
            )
          )}
          <a
            href="/resume.pdf"
            download
            className="font-mono text-[10px] uppercase tracking-[2px] px-3.5 py-1.5 transition-colors duration-150"
            style={{
              backgroundColor: "var(--fg)",
              color: "var(--bg)",
            }}
          >
            Resume ↓
          </a>
          <ThemeToggle />
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden font-mono text-lg cursor-pointer"
          style={{ color: "var(--fg)" }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? "✕" : "≡"}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 top-[62px] z-40 flex flex-col items-center justify-center gap-8"
          style={{ backgroundColor: "var(--hover-bg)" }}
        >
          {NAV_LINKS.map((link) =>
            link.type === "route" ? (
              <Link
                key={link.label}
                href={link.href}
                className="font-mono text-sm uppercase tracking-[3px]"
                style={{ color: "var(--hover-fg)" }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="font-mono text-sm uppercase tracking-[3px]"
                style={{ color: "var(--hover-fg)" }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            )
          )}
          <a
            href="/resume.pdf"
            download
            className="font-mono text-sm uppercase tracking-[3px]"
            style={{ color: "var(--hover-fg)" }}
            onClick={() => setMobileOpen(false)}
          >
            Resume ↓
          </a>
          <ThemeToggle className="text-[var(--hover-fg)]" />
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 2: Verify build passes**

Run: `cd /Users/jack/Documents/code/jackportfolio && npm run build`

- [ ] **Step 3: Commit**

```bash
git add src/components/nav.tsx
git commit -m "feat: rewrite nav with brutalist design, mobile overlay, theme toggle"
```

---

## Task 6: Hero Section

**Files:**
- Rewrite: `src/components/hero.tsx`

- [ ] **Step 1: Rewrite hero.tsx**

```tsx
"use client";

import { PERSONAL } from "@/lib/constants";
import SnapIn from "./snap-in";

export default function Hero() {
  return (
    <section
      style={{
        padding: "72px 48px 56px",
        borderBottom: "2px solid var(--border)",
      }}
    >
      <SnapIn>
        <div
          className="font-mono text-[10px] uppercase tracking-[3px] mb-7"
          style={{ color: "var(--text-muted)" }}
        >
          {PERSONAL.tagline} — {PERSONAL.university}
        </div>
      </SnapIn>

      <SnapIn delay={0.05}>
        <h1
          className="text-[clamp(48px,8vw,72px)] font-black leading-[0.88] mb-7"
          style={{ letterSpacing: "-4px", color: "var(--fg)" }}
        >
          BUILDING
          <br />
          QUANTITATIVE
          <br />
          SYSTEMS
        </h1>
      </SnapIn>

      <SnapIn delay={0.1}>
        <div className="flex justify-between items-end">
          <p
            className="font-mono text-[13px] leading-relaxed max-w-[420px]"
            style={{ color: "var(--text-secondary)" }}
          >
            {PERSONAL.intro}
          </p>
          <a
            href="/#about"
            className="hidden md:block font-mono text-[10px] uppercase tracking-[2px]"
            style={{ color: "var(--text-muted)" }}
          >
            Scroll ↓
          </a>
        </div>
      </SnapIn>
    </section>
  );
}
```

- [ ] **Step 2: Verify build passes**

Run: `cd /Users/jack/Documents/code/jackportfolio && npm run build`

- [ ] **Step 3: Commit**

```bash
git add src/components/hero.tsx
git commit -m "feat: rewrite hero with brutalist massive typography"
```

---

## Task 7: Selected Work — Project Rows for Homepage

**Files:**
- Create: `src/components/project-row.tsx`
- Create: `src/components/selected-work.tsx`

- [ ] **Step 1: Create project-row.tsx**

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import type { Project } from "@/data/projects";

interface ProjectRowProps {
  project: Project;
  index: number;
  isLast: boolean;
}

export default function ProjectRow({ project, index, isLast }: ProjectRowProps) {
  const num = String(index + 1).padStart(2, "0");
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/projects?project=${project.slug}`}
      className="flex justify-between items-baseline transition-colors duration-[120ms]"
      style={{
        padding: "18px 48px",
        borderBottom: isLast
          ? "2px solid var(--border)"
          : "1px solid var(--border-subtle)",
        color: hovered ? "var(--hover-fg)" : "var(--fg)",
        backgroundColor: hovered ? "var(--hover-bg)" : "var(--bg)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-baseline gap-5">
        <span
          className="font-mono text-[10px]"
          style={{ color: hovered ? "inherit" : "var(--text-muted)" }}
        >
          {num}
        </span>
        <span className="text-[17px] font-extrabold" style={{ letterSpacing: "-0.5px" }}>
          {project.title}
        </span>
      </div>
      <div className="flex items-baseline gap-6">
        <span
          className="font-mono text-[10px] uppercase tracking-[1px] hidden sm:inline"
          style={{ color: hovered ? "inherit" : "var(--text-muted)" }}
        >
          {project.tags.join(" / ")}
        </span>
        <span
          className="text-sm transition-opacity duration-[120ms]"
          style={{ opacity: hovered ? 1 : 0 }}
        >
          →
        </span>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Create selected-work.tsx**

```tsx
import { projects } from "@/data/projects";
import SectionHeader from "./section-header";
import ProjectRow from "./project-row";
import SnapIn from "./snap-in";

export default function SelectedWork() {
  return (
    <section>
      <SectionHeader
        label="Selected Work"
        right={`${String(projects.length).padStart(2, "0")} Projects`}
      />
      <SnapIn>
        <div>
          {projects.map((project, i) => (
            <ProjectRow
              key={project.slug}
              project={project}
              index={i}
              isLast={i === projects.length - 1}
            />
          ))}
        </div>
      </SnapIn>
    </section>
  );
}
```

- [ ] **Step 3: Verify build passes**

Run: `cd /Users/jack/Documents/code/jackportfolio && npm run build`

- [ ] **Step 4: Commit**

```bash
git add src/components/project-row.tsx src/components/selected-work.tsx
git commit -m "feat: add SelectedWork and ProjectRow components with hover inversion"
```

---

## Task 8: About Section

**Files:**
- Rewrite: `src/components/about.tsx`

- [ ] **Step 1: Rewrite about.tsx with two-column layout and categorized skills**

```tsx
import { PERSONAL, SKILLS } from "@/lib/constants";
import SectionHeader from "./section-header";
import SnapIn from "./snap-in";

export default function About() {
  return (
    <section id="about">
      <SectionHeader label="About" />
      <div
        className="grid md:grid-cols-2"
        style={{ borderBottom: "2px solid var(--border)" }}
      >
        {/* Bio */}
        <SnapIn>
          <div
            style={{
              borderRight: "1px solid var(--border-subtle)",
              padding: "48px",
            }}
          >
            <p
              className="text-[15px] leading-[1.8] mb-4 max-w-[680px]"
              style={{ color: "var(--text-secondary)" }}
            >
              I&apos;m Jackson — a student at {PERSONAL.university} studying{" "}
              {PERSONAL.tagline}, graduating {PERSONAL.graduation}.
            </p>
            <p
              className="text-[15px] leading-[1.8] max-w-[680px]"
              style={{ color: "var(--text-secondary)" }}
            >
              I&apos;m interested in the intersection of quantitative modeling
              and software engineering. I like building things that take hard
              mathematical problems and turn them into working systems — from
              financial derivatives pricing to autonomous navigation.
            </p>
          </div>
        </SnapIn>

        {/* Skills */}
        <SnapIn delay={0.05}>
          <div style={{ padding: "48px" }}>
            {SKILLS.map((group) => (
              <div key={group.category} className="mb-7 last:mb-0">
                <div
                  className="font-mono text-[10px] uppercase tracking-[3px] mb-3"
                  style={{ color: "var(--text-muted)" }}
                >
                  {group.category}
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-[11px] uppercase tracking-[1px] px-2.5 py-1"
                      style={{ border: "1px solid var(--border)" }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SnapIn>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build passes**

Run: `cd /Users/jack/Documents/code/jackportfolio && npm run build`

- [ ] **Step 3: Commit**

```bash
git add src/components/about.tsx
git commit -m "feat: rewrite About with two-column layout and categorized skills"
```

---

## Task 9: Experience & Education Sections

**Files:**
- Create: `src/components/experience.tsx`
- Create: `src/components/education.tsx`

- [ ] **Step 1: Create experience.tsx**

```tsx
import { experiences } from "@/data/experience";
import SectionHeader from "./section-header";
import SnapIn from "./snap-in";

export default function Experience() {
  return (
    <section id="experience">
      <SectionHeader label="Experience" />
      <SnapIn>
        <div>
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="grid grid-cols-[80px_1fr] md:grid-cols-[100px_1fr_200px] items-baseline"
              style={{
                padding: "20px 48px",
                borderBottom:
                  i === experiences.length - 1
                    ? "2px solid var(--border)"
                    : "1px solid var(--border-subtle)",
              }}
            >
              <span
                className="font-mono text-[11px]"
                style={{ color: "var(--text-muted)" }}
              >
                {exp.year}
              </span>
              <div>
                <div className="text-[15px] font-bold" style={{ letterSpacing: "-0.3px" }}>
                  {exp.role}
                </div>
                <div className="text-[13px]" style={{ color: "var(--text-secondary)" }}>
                  {exp.company}
                </div>
              </div>
              <div
                className="hidden md:block font-mono text-[11px] leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {exp.description}
              </div>
            </div>
          ))}
        </div>
      </SnapIn>
    </section>
  );
}
```

- [ ] **Step 2: Create education.tsx**

```tsx
import SnapIn from "./snap-in";

export default function Education() {
  return (
    <SnapIn>
      <div
        className="flex flex-col sm:flex-row justify-between sm:items-baseline"
        style={{
          padding: "28px 48px",
          borderBottom: "2px solid var(--border)",
        }}
      >
        <div
          className="text-xl font-extrabold mb-1 sm:mb-0"
          style={{ letterSpacing: "-0.5px" }}
        >
          Queen&apos;s University
        </div>
        <div className="sm:text-right">
          <div
            className="font-mono text-xs"
            style={{ color: "var(--text-secondary)" }}
          >
            B.ASc Applied Mathematics & Computer Engineering
          </div>
          <div
            className="font-mono text-[11px] mt-1"
            style={{ color: "var(--text-muted)" }}
          >
            Expected May 2027 — Kingston, ON
          </div>
        </div>
      </div>
    </SnapIn>
  );
}
```

- [ ] **Step 3: Verify build passes**

Run: `cd /Users/jack/Documents/code/jackportfolio && npm run build`

- [ ] **Step 4: Commit**

```bash
git add src/components/experience.tsx src/components/education.tsx
git commit -m "feat: add Experience and Education sections"
```

---

## Task 10: Contact & Footer

**Files:**
- Rewrite: `src/components/contact.tsx`
- Rewrite: `src/components/footer.tsx`

- [ ] **Step 1: Rewrite contact.tsx**

```tsx
import { PERSONAL, SOCIAL_LINKS } from "@/lib/constants";
import SnapIn from "./snap-in";

export default function Contact() {
  return (
    <section id="contact" style={{ padding: "64px 48px" }} className="text-center">
      <SnapIn>
        <h2
          className="text-4xl font-black mb-4"
          style={{ letterSpacing: "-2px" }}
        >
          LET&apos;S CONNECT
        </h2>
      </SnapIn>
      <SnapIn delay={0.05}>
        <p
          className="font-mono text-[13px] mb-8"
          style={{ color: "var(--text-secondary)" }}
        >
          Open to opportunities in quantitative finance, software engineering,
          and research.
        </p>
      </SnapIn>
      <SnapIn delay={0.1}>
        <div className="flex justify-center gap-8 flex-wrap">
          <a
            href={`mailto:${PERSONAL.email}`}
            className="font-mono text-[11px] uppercase tracking-[2px] pb-1 transition-colors duration-150"
            style={{
              color: "var(--fg)",
              borderBottom: "2px solid var(--border)",
            }}
          >
            Email
          </a>
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] uppercase tracking-[2px] pb-1 transition-colors duration-150"
              style={{
                color: "var(--fg)",
                borderBottom: "2px solid var(--border)",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </SnapIn>
    </section>
  );
}
```

- [ ] **Step 2: Rewrite footer.tsx**

```tsx
export default function Footer() {
  return (
    <footer
      className="flex justify-between"
      style={{
        padding: "20px 48px",
        borderTop: "2px solid var(--border)",
      }}
    >
      <span
        className="font-mono text-[10px] uppercase tracking-[2px]"
        style={{ color: "var(--text-muted)" }}
      >
        © {new Date().getFullYear()} Jackson Moores
      </span>
      <span
        className="font-mono text-[10px] uppercase tracking-[2px]"
        style={{ color: "var(--text-muted)" }}
      >
        Built with Next.js
      </span>
    </footer>
  );
}
```

- [ ] **Step 3: Verify build passes**

Run: `cd /Users/jack/Documents/code/jackportfolio && npm run build`

- [ ] **Step 4: Commit**

```bash
git add src/components/contact.tsx src/components/footer.tsx
git commit -m "feat: rewrite Contact and Footer with brutalist styling"
```

---

## Task 11: Homepage Assembly

**Files:**
- Rewrite: `src/app/page.tsx`

- [ ] **Step 1: Rewrite page.tsx to assemble all new sections**

```tsx
import Nav from "@/components/nav";
import Hero from "@/components/hero";
import SelectedWork from "@/components/selected-work";
import About from "@/components/about";
import Experience from "@/components/experience";
import Education from "@/components/education";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SelectedWork />
        <About />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Verify build passes**

Run: `cd /Users/jack/Documents/code/jackportfolio && npm run build`

- [ ] **Step 3: Start dev server and visually verify homepage**

Run: `cd /Users/jack/Documents/code/jackportfolio && npm run dev`
Open: http://localhost:3000
Check: All sections render, dark/light toggle works, hover inversions work on project rows, mobile nav opens/closes.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: assemble homepage with all brutalist sections"
```

---

## Task 12: Projects Page — Selector Component

**Files:**
- Create: `src/components/projects/project-selector.tsx`

- [ ] **Step 1: Create project-selector.tsx**

```tsx
"use client";

import type { Project } from "@/data/projects";

interface ProjectSelectorProps {
  projects: Project[];
  activeSlug: string;
  onSelect: (slug: string) => void;
}

export default function ProjectSelector({
  projects,
  activeSlug,
  onSelect,
}: ProjectSelectorProps) {
  return (
    <div>
      <div
        className="font-mono text-[10px] uppercase tracking-[3px]"
        style={{
          padding: "12px 48px",
          borderBottom: "1px solid var(--border-subtle)",
          color: "var(--text-muted)",
        }}
      >
        Select a project
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        style={{ borderBottom: "2px solid var(--border)" }}
      >
        {projects.map((project, i) => {
          const isActive = project.slug === activeSlug;
          const num = String(i + 1).padStart(2, "0");
          return (
            <button
              key={project.slug}
              onClick={() => onSelect(project.slug)}
              className="text-left transition-colors duration-[120ms] cursor-pointer"
              style={{
                padding: "20px 24px",
                borderRight:
                  i < projects.length - 1
                    ? "1px solid var(--border-subtle)"
                    : "none",
                backgroundColor: isActive ? "var(--hover-bg)" : "var(--bg)",
                color: isActive ? "var(--hover-fg)" : "var(--fg)",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "var(--bg-subtle)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "var(--bg)";
                }
              }}
            >
              <div
                className="font-mono text-[9px] tracking-[2px] mb-1.5"
                style={{ color: isActive ? "var(--hover-fg)" : "var(--text-muted)", opacity: isActive ? 0.6 : 1 }}
              >
                {num}
              </div>
              <div
                className="text-[13px] font-extrabold mb-1"
                style={{ letterSpacing: "-0.3px" }}
              >
                {project.title}
              </div>
              <div
                className="font-mono text-[9px] uppercase tracking-[1px]"
                style={{ color: isActive ? "var(--hover-fg)" : "var(--text-muted)", opacity: isActive ? 0.6 : 1 }}
              >
                {project.tags.slice(0, 2).join(" / ")}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify build passes**

Run: `cd /Users/jack/Documents/code/jackportfolio && npm run build`

- [ ] **Step 3: Commit**

```bash
git add src/components/projects/project-selector.tsx
git commit -m "feat: add ProjectSelector component with active state inversion"
```

---

## Task 13: Projects Page — Stats & Content Components

**Files:**
- Create: `src/components/projects/project-stats.tsx`
- Create: `src/components/projects/project-content.tsx`

- [ ] **Step 1: Create project-stats.tsx**

```tsx
interface ProjectStatsProps {
  stats: { value: string; label: string }[];
}

export default function ProjectStats({ stats }: ProjectStatsProps) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-3"
      style={{ borderBottom: "2px solid var(--border)" }}
    >
      {stats.map((stat, i) => (
        <div
          key={i}
          className="text-center"
          style={{
            padding: "32px 48px",
            borderRight:
              i < stats.length - 1
                ? "1px solid var(--border-subtle)"
                : "none",
          }}
        >
          <div
            className="text-4xl font-black mb-1"
            style={{ letterSpacing: "-2px" }}
          >
            {stat.value}
          </div>
          <div
            className="font-mono text-[10px] uppercase tracking-[2px]"
            style={{ color: "var(--text-muted)" }}
          >
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Create project-content.tsx**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";

const SECTION_KEYS = ["overview", "approach", "results", "learnings"] as const;
const SECTION_LABELS: Record<string, string> = {
  overview: "Overview",
  approach: "Technical Approach",
  results: "Key Results",
  learnings: "What I Learned",
};

interface ProjectContentProps {
  sections: Project["sections"];
}

export default function ProjectContent({ sections }: ProjectContentProps) {
  const [active, setActive] = useState<string>("overview");
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTION_KEYS.forEach((key) => {
      const el = sectionRefs.current[key];
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(key);
        },
        { threshold: 0, rootMargin: "-40% 0px -60% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-[200px_1fr]"
      style={{ borderBottom: "2px solid var(--border)" }}
    >
      {/* Sidebar nav */}
      <nav
        className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible md:sticky md:top-[80px] md:self-start"
        style={{
          padding: "48px 32px 48px 48px",
          borderRight: "1px solid var(--border-subtle)",
        }}
      >
        {SECTION_KEYS.map((key) => (
          <a
            key={key}
            href={`#section-${key}`}
            onClick={(e) => {
              e.preventDefault();
              sectionRefs.current[key]?.scrollIntoView({ behavior: "smooth" });
            }}
            className="font-mono text-[10px] uppercase tracking-[2px] whitespace-nowrap px-2 py-1 transition-colors duration-[120ms]"
            style={{
              color: active === key ? "var(--hover-fg)" : "var(--text-muted)",
              backgroundColor:
                active === key ? "var(--hover-bg)" : "transparent",
            }}
          >
            {SECTION_LABELS[key]}
          </a>
        ))}
      </nav>

      {/* Content */}
      <div style={{ padding: "48px" }}>
        {SECTION_KEYS.map((key) => (
          <div
            key={key}
            id={`section-${key}`}
            ref={(el) => { sectionRefs.current[key] = el; }}
            className="mb-10 last:mb-0"
          >
            <h3 className="text-sm font-extrabold uppercase tracking-[2px] mb-4">
              {SECTION_LABELS[key]}
            </h3>
            <p
              className="text-[15px] leading-[1.8] max-w-[680px]"
              style={{ color: "var(--text-secondary)" }}
            >
              {sections[key]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify build passes**

Run: `cd /Users/jack/Documents/code/jackportfolio && npm run build`

- [ ] **Step 4: Commit**

```bash
git add src/components/projects/project-stats.tsx src/components/projects/project-content.tsx
git commit -m "feat: add ProjectStats and ProjectContent with sidebar navigation"
```

---

## Task 14: Projects Page — Detail View & Page Assembly

**Files:**
- Create: `src/components/projects/project-detail.tsx`
- Create: `src/app/projects/page.tsx`

- [ ] **Step 1: Create project-detail.tsx**

```tsx
import type { Project } from "@/data/projects";
import ProjectStats from "./project-stats";
import ProjectContent from "./project-content";
import SnapIn from "../snap-in";

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <div>
      {/* Project Hero */}
      <SnapIn>
        <section style={{ padding: "48px", borderBottom: "2px solid var(--border)" }}>
          <h2
            className="text-[clamp(36px,5vw,48px)] font-black leading-[0.9] mb-6"
            style={{ letterSpacing: "-3px" }}
          >
            {project.title.toUpperCase()}
          </h2>
          <div className="flex flex-wrap gap-x-12 gap-y-4 mb-6">
            {[
              { label: "Status", value: project.status },
              { label: "Timeline", value: project.timeline },
              { label: "Role", value: project.role },
              ...(project.githubUrl
                ? [{ label: "Source", value: "GitHub →", href: project.githubUrl }]
                : []),
            ].map((item) => (
              <div key={item.label}>
                <div
                  className="font-mono text-[9px] uppercase tracking-[2px] mb-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  {item.label}
                </div>
                {"href" in item && item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] font-semibold underline"
                  >
                    {item.value}
                  </a>
                ) : (
                  <div className="text-[13px] font-semibold">{item.value}</div>
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] uppercase tracking-[1px] px-2.5 py-1"
                style={{ border: "1px solid var(--border)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
      </SnapIn>

      {/* Stats */}
      <SnapIn>
        <ProjectStats stats={project.stats} />
      </SnapIn>

      {/* Visual placeholder */}
      <SnapIn>
        <div
          className="text-center"
          style={{
            padding: "48px",
            borderBottom: "2px solid var(--border)",
            backgroundColor: "var(--bg-subtle)",
          }}
        >
          {project.image ? (
            <img
              src={project.image}
              alt={`${project.title} screenshot`}
              className="mx-auto max-h-96 object-contain"
            />
          ) : (
            <div
              className="font-mono text-xs uppercase tracking-[2px] py-16"
              style={{
                border: "2px dashed var(--border-subtle)",
                color: "var(--text-muted)",
              }}
            >
              Project screenshot / diagram coming soon
            </div>
          )}
        </div>
      </SnapIn>

      {/* Write-up */}
      <ProjectContent sections={project.sections} />
    </div>
  );
}
```

- [ ] **Step 2: Create src/app/projects/page.tsx**

```tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { projects } from "@/data/projects";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import ProjectSelector from "@/components/projects/project-selector";
import ProjectDetail from "@/components/projects/project-detail";
import SnapIn from "@/components/snap-in";

function ProjectsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeSlug = searchParams.get("project") || projects[0].slug;
  const activeProject = projects.find((p) => p.slug === activeSlug) || projects[0];

  function handleSelect(slug: string) {
    router.push(`/projects?project=${slug}`, { scroll: false });
  }

  return (
    <>
      {/* Page header */}
      <SnapIn>
        <section
          style={{
            padding: "56px 48px 48px",
            borderBottom: "2px solid var(--border)",
          }}
        >
          <h1
            className="text-[clamp(48px,8vw,64px)] font-black leading-[0.9] mb-4"
            style={{ letterSpacing: "-4px" }}
          >
            PROJECTS
          </h1>
          <p
            className="font-mono text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            A selection of work across quantitative finance, algorithms, and
            systems engineering.
          </p>
        </section>
      </SnapIn>

      {/* Selector + Detail */}
      <ProjectSelector
        projects={projects}
        activeSlug={activeProject.slug}
        onSelect={handleSelect}
      />
      <ProjectDetail project={activeProject} />
    </>
  );
}

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <main>
        <Suspense fallback={null}>
          <ProjectsContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Verify build passes**

Run: `cd /Users/jack/Documents/code/jackportfolio && npm run build`

- [ ] **Step 4: Visually verify projects page**

Run: `cd /Users/jack/Documents/code/jackportfolio && npm run dev`
Open: http://localhost:3000/projects
Check: Page header shows, selector boxes render with first project active, clicking a box swaps content, URL updates with `?project=` param, sidebar nav scrolls to sections.

- [ ] **Step 5: Commit**

```bash
git add src/components/projects/project-detail.tsx src/app/projects/page.tsx
git commit -m "feat: add Projects page with selector and detail view"
```

---

## Task 15: Cleanup — Delete Old Components

**Files:**
- Delete: `src/components/fade-in.tsx`
- Delete: `src/components/section-heading.tsx`
- Delete: `src/components/projects.tsx`
- Delete: `src/components/project-card.tsx`
- Delete: `src/components/social-links.tsx`

- [ ] **Step 1: Delete old components**

```bash
cd /Users/jack/Documents/code/jackportfolio
rm src/components/fade-in.tsx
rm src/components/section-heading.tsx
rm src/components/projects.tsx
rm src/components/project-card.tsx
rm src/components/social-links.tsx
```

- [ ] **Step 2: Verify build passes with no dangling imports**

Run: `cd /Users/jack/Documents/code/jackportfolio && npm run build`
Expected: Clean build with no import errors. If any file still imports a deleted component, fix the import.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove old components replaced by brutalist redesign"
```

---

## Task 16: Final Verification

- [ ] **Step 1: Full build**

Run: `cd /Users/jack/Documents/code/jackportfolio && npm run build`
Expected: Clean build, zero errors.

- [ ] **Step 2: Lint**

Run: `cd /Users/jack/Documents/code/jackportfolio && npm run lint`
Expected: No errors.

- [ ] **Step 3: Visual QA — Homepage**

Run: `cd /Users/jack/Documents/code/jackportfolio && npm run dev`
Open http://localhost:3000 and verify:
- [ ] Sticky nav with links, resume button, theme toggle
- [ ] Hero section with massive typography
- [ ] Selected Work rows with hover inversion and arrows
- [ ] About section with two-column layout and categorized skills
- [ ] Experience section with placeholder rows
- [ ] Education row
- [ ] Contact section with underlined links
- [ ] Footer
- [ ] Dark/light toggle works and persists on refresh
- [ ] Mobile nav hamburger opens full-screen overlay
- [ ] All sections responsive at mobile widths

- [ ] **Step 4: Visual QA — Projects Page**

Open http://localhost:3000/projects and verify:
- [ ] Page header with "PROJECTS" title
- [ ] Selector boxes with first project active by default
- [ ] Clicking a selector box swaps content
- [ ] URL updates with `?project=slug`
- [ ] Project hero, stats, visual placeholder, and write-up render
- [ ] Sidebar nav highlights active section on scroll
- [ ] Responsive at mobile widths

- [ ] **Step 5: Cross-page navigation**

- [ ] Clicking project rows on homepage navigates to `/projects?project=slug`
- [ ] "← Back to Home" or nav logo navigates back to homepage
- [ ] Nav links scroll to correct sections on homepage

- [ ] **Step 6: Commit final state**

```bash
git add -A
git commit -m "feat: complete brutalist portfolio redesign — homepage and projects page"
```
