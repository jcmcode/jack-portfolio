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
