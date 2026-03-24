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
