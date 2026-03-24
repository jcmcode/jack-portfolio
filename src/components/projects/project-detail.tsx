import type { Project } from "@/data/projects";
import ProjectStats from "./project-stats";
import ProjectContent from "./project-content";
import SnapIn from "../snap-in";

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <div>
      <SnapIn>
        <section style={{ padding: "48px", borderBottom: "2px solid var(--border)" }}>
          <h2
            className="text-[clamp(36px,5vw,48px)] font-black leading-[0.9] mb-6"
            style={{ letterSpacing: "-3px" }}
          >
            {project.title.toUpperCase()}
          </h2>
          <div className="flex flex-wrap gap-x-12 gap-y-4 mb-6">
            {[
              { label: "Status", value: project.status },
              { label: "Timeline", value: project.timeline },
              { label: "Role", value: project.role },
              ...(project.githubUrl
                ? [{ label: "Source", value: "GitHub →", href: project.githubUrl }]
                : []),
            ].map((item) => (
              <div key={item.label}>
                <div
                  className="font-mono text-[9px] uppercase tracking-[2px] mb-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  {item.label}
                </div>
                {"href" in item && item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] font-semibold underline"
                  >
                    {item.value}
                  </a>
                ) : (
                  <div className="text-[13px] font-semibold">{item.value}</div>
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] uppercase tracking-[1px] px-2.5 py-1"
                style={{ border: "1px solid var(--border)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
      </SnapIn>

      <SnapIn>
        <ProjectStats stats={project.stats} />
      </SnapIn>

      <SnapIn>
        <div
          className="text-center"
          style={{
            padding: "48px",
            borderBottom: "2px solid var(--border)",
            backgroundColor: "var(--bg-subtle)",
          }}
        >
          {project.image ? (
            <img
              src={project.image}
              alt={`${project.title} screenshot`}
              className="mx-auto max-h-96 object-contain"
            />
          ) : (
            <div
              className="font-mono text-xs uppercase tracking-[2px] py-16"
              style={{
                border: "2px dashed var(--border-subtle)",
                color: "var(--text-muted)",
              }}
            >
              Project screenshot / diagram coming soon
            </div>
          )}
        </div>
      </SnapIn>

      <ProjectContent sections={project.sections} />
    </div>
  );
}
