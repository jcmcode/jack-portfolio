import FadeIn from "./fade-in";
import SectionHeading from "./section-heading";
import SocialLinks from "./social-links";
import { PERSONAL } from "@/lib/constants";

export default function Contact() {
  return (
    <section id="contact" className="py-20 md:py-32 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <FadeIn>
          <SectionHeading>Get in Touch</SectionHeading>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="text-base md:text-lg text-neutral-400 max-w-xl mx-auto mb-8">
            I&apos;m always open to new opportunities and interesting projects.
            Feel free to reach out if you&apos;d like to work together.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <a
            href={`mailto:${PERSONAL.email}`}
            className="inline-block px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors mb-8"
          >
            Say Hello
          </a>
        </FadeIn>

        <FadeIn delay={0.3}>
          <SocialLinks className="justify-center" />
        </FadeIn>
      </div>
    </section>
  );
}
