"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle({ className }: { className?: string }) {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
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
      {mounted ? (dark ? "LIGHT" : "DARK") : "DARK"}
    </button>
  );
}
