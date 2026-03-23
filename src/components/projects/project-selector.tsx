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
