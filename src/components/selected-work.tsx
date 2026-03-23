import { projects } from "@/data/projects";
import SectionHeader from "./section-header";
import ProjectRow from "./project-row";
import SnapIn from "./snap-in";

export default function SelectedWork() {
  return (
    <section>
      <SectionHeader
        label="Selected Work"
        right={`${String(projects.length).padStart(2, "0")} Projects`}
      />
      <SnapIn>
        <div>
          {projects.map((project, i) => (
            <ProjectRow
              key={project.slug}
              project={project}
              index={i}
              isLast={i === projects.length - 1}
            />
          ))}
        </div>
      </SnapIn>
    </section>
  );
}
