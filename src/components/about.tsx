import { PERSONAL, SKILLS } from "@/lib/constants";
import SectionHeader from "./section-header";
import SnapIn from "./snap-in";

export default function About() {
  return (
    <section id="about">
      <SectionHeader label="About" />
      <div
        className="grid md:grid-cols-2"
        style={{ borderBottom: "2px solid var(--border)" }}
      >
        <SnapIn>
          <div
            style={{
              borderRight: "1px solid var(--border-subtle)",
              padding: "48px",
            }}
          >
            <p
              className="text-[15px] leading-[1.8] mb-4 max-w-[680px]"
              style={{ color: "var(--text-secondary)" }}
            >
              I&apos;m Jackson — a student at {PERSONAL.university} studying{" "}
              {PERSONAL.tagline}, graduating {PERSONAL.graduation}.
            </p>
            <p
              className="text-[15px] leading-[1.8] max-w-[680px]"
              style={{ color: "var(--text-secondary)" }}
            >
              I&apos;m interested in the intersection of quantitative modeling
              and software engineering. I like building things that take hard
              mathematical problems and turn them into working systems — from
              financial derivatives pricing to autonomous navigation.
            </p>
          </div>
        </SnapIn>

        <SnapIn delay={0.05}>
          <div style={{ padding: "48px" }}>
            {SKILLS.map((group) => (
              <div key={group.category} className="mb-7 last:mb-0">
                <div
                  className="font-mono text-[10px] uppercase tracking-[3px] mb-3"
                  style={{ color: "var(--text-muted)" }}
                >
                  {group.category}
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-[11px] uppercase tracking-[1px] px-2.5 py-1"
                      style={{ border: "1px solid var(--border)" }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SnapIn>
      </div>
    </section>
  );
}
