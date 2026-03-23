import { PERSONAL, SOCIAL_LINKS } from "@/lib/constants";
import SnapIn from "./snap-in";

export default function Contact() {
  return (
    <section id="contact" style={{ padding: "64px 48px" }} className="text-center">
      <SnapIn>
        <h2
          className="text-4xl font-black mb-4"
          style={{ letterSpacing: "-2px" }}
        >
          LET&apos;S CONNECT
        </h2>
      </SnapIn>
      <SnapIn delay={0.05}>
        <p
          className="font-mono text-[13px] mb-8"
          style={{ color: "var(--text-secondary)" }}
        >
          Open to opportunities in quantitative finance, software engineering,
          and research.
        </p>
      </SnapIn>
      <SnapIn delay={0.1}>
        <div className="flex justify-center gap-8 flex-wrap">
          <a
            href={`mailto:${PERSONAL.email}`}
            className="font-mono text-[11px] uppercase tracking-[2px] pb-1 transition-colors duration-150"
            style={{
              color: "var(--fg)",
              borderBottom: "2px solid var(--border)",
            }}
          >
            Email
          </a>
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] uppercase tracking-[2px] pb-1 transition-colors duration-150"
              style={{
                color: "var(--fg)",
                borderBottom: "2px solid var(--border)",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </SnapIn>
    </section>
  );
}
