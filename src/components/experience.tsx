import { experiences } from "@/data/experience";
import SectionHeader from "./section-header";
import SnapIn from "./snap-in";

export default function Experience() {
  return (
    <section id="experience">
      <SectionHeader label="Experience" />
      <SnapIn>
        <div>
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="grid grid-cols-[80px_1fr] md:grid-cols-[100px_1fr_200px] items-baseline"
              style={{
                padding: "20px 48px",
                borderBottom:
                  i === experiences.length - 1
                    ? "2px solid var(--border)"
                    : "1px solid var(--border-subtle)",
              }}
            >
              <span
                className="font-mono text-[11px]"
                style={{ color: "var(--text-muted)" }}
              >
                {exp.year}
              </span>
              <div>
                <div className="text-[15px] font-bold" style={{ letterSpacing: "-0.3px" }}>
                  {exp.role}
                </div>
                <div className="text-[13px]" style={{ color: "var(--text-secondary)" }}>
                  {exp.company}
                </div>
              </div>
              <div
                className="hidden md:block font-mono text-[11px] leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {exp.description}
              </div>
            </div>
          ))}
        </div>
      </SnapIn>
    </section>
  );
}
