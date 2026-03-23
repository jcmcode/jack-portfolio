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
