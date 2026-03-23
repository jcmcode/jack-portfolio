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
