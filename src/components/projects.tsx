import FadeIn from "./fade-in";
import SectionHeading from "./section-heading";
import ProjectCard from "./project-card";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="py-20 md:py-32 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <SectionHeading>Projects</SectionHeading>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
