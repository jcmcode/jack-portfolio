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
