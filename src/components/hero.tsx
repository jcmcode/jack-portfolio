"use client";

import Link from "next/link";
import { PERSONAL } from "@/lib/constants";
import SnapIn from "./snap-in";

export default function Hero() {
  return (
    <section
      style={{
        padding: "96px 48px 72px",
        borderBottom: "2px solid var(--border)",
      }}
    >
      <SnapIn>
        <div
          className="font-mono text-[10px] uppercase tracking-[3px] mb-8"
          style={{ color: "var(--text-muted)" }}
        >
          {PERSONAL.tagline} — {PERSONAL.university}
        </div>
      </SnapIn>

      <SnapIn delay={0.05}>
        <h1
          className="text-[clamp(64px,12vw,120px)] font-black leading-[0.85] mb-10"
          style={{ letterSpacing: "-5px", color: "var(--fg)" }}
        >
          JACKSON
          <br />
          MOORES
        </h1>
      </SnapIn>

      <SnapIn delay={0.1}>
        <div className="flex justify-between items-end">
          <p
            className="font-mono text-[13px] leading-relaxed max-w-[480px]"
            style={{ color: "var(--text-secondary)" }}
          >
            {PERSONAL.intro}
          </p>
          <Link
            href="/#about"
            className="hidden md:block font-mono text-[10px] uppercase tracking-[2px]"
            style={{ color: "var(--text-muted)" }}
          >
            Scroll ↓
          </Link>
        </div>
      </SnapIn>
    </section>
  );
}
