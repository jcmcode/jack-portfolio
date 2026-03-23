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
        <Link
          href="/"
          className="text-[13px] font-black tracking-[4px] uppercase"
          style={{ color: "var(--fg)" }}
        >
          Jackson Moores
        </Link>

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

        <button
          className="md:hidden font-mono text-lg cursor-pointer"
          style={{ color: "var(--fg)" }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? "✕" : "≡"}
        </button>
      </div>

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
