import FadeIn from "./fade-in";
import SectionHeading from "./section-heading";
import { SKILLS } from "@/lib/constants";

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <SectionHeading>About Me</SectionHeading>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <FadeIn delay={0.1}>
            <div className="space-y-4 text-base md:text-lg text-neutral-400">
              <p>
                I&apos;m a full-stack developer with a passion for building
                clean, performant web applications. I enjoy working across the
                entire stack, from crafting pixel-perfect UIs to designing robust
                APIs and databases.
              </p>
              <p>
                When I&apos;m not coding, you can find me exploring new
                technologies, contributing to open-source projects, or enjoying
                the outdoors.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div>
              <h3 className="text-lg font-semibold text-neutral-50 mb-4">
                Technologies I work with
              </h3>
              <div className="flex flex-wrap gap-2">
                {SKILLS.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm bg-neutral-900 border border-neutral-800 text-neutral-300 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
