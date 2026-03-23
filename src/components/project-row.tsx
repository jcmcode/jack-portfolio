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
