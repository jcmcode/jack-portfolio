import T from "./typed";
import { experience } from "@/data/experience";
import { projects, type Project } from "@/data/projects";
import { RESUME_URL, SITE } from "@/lib/site";

export function Hero() {
  return (
    <section id="top" className="container hero">
      <p className="eyebrow in d2">
        <T>{SITE.eyebrow}</T>
      </p>
      <h1 className="hero-name in d3" aria-label="Jackson Moores">
        <span className="line" aria-hidden="true">
          {[..."Jackson"].map((c, i) => (
            <span key={i} className="ch">
              {c}
            </span>
          ))}
        </span>
        <span className="line" aria-hidden="true">
          {[..."Moores"].map((c, i) => (
            <span key={i} className="ch">
              {c}
            </span>
          ))}
          <span className="ch dot">.</span>
        </span>
      </h1>
      <p className="hero-intro in d4">
        <T>{SITE.intro}</T>
      </p>
      <div className="hero-actions in d5">
        <a className="btn btn-solid btn-lg" href="#contact" data-build="box">
          <T>Get in touch</T>
        </a>
        <a className="btn btn-outline btn-lg" href={RESUME_URL} target="_blank" rel="noopener" data-build="box">
          <T>View my resume</T>
        </a>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const content = (
    <>
      <span className="project-kind">
        <T>{project.kind}</T>
      </span>
      <span className="project-title">
        <T>{project.title}</T>
        {project.href && (
          <span className="arrow" aria-hidden="true">
            ↗
          </span>
        )}
      </span>
      <span className="project-desc">
        <T>{project.description}</T>
      </span>
      <span className="project-meta">
        <span className="tags">
          <T>{project.tags}</T>
        </span>
        <span className="result">
          <T>{project.result}</T>
        </span>
      </span>
    </>
  );

  return project.href ? (
    <a className="project-card reveal" href={project.href} target="_blank" rel="noopener noreferrer" data-build="box">
      {content}
    </a>
  ) : (
    <div className="project-card reveal" data-build="box">
      {content}
    </div>
  );
}

export function Projects() {
  return (
    <section id="work" className="container section">
      <h2 className="section-title">
        <T>Projects</T>
      </h2>
      <div className="project-grid">
        {projects.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" className="container section experience">
      <h2 className="section-title">
        <T>Experience</T>
      </h2>
      <div className="experience-list">
        {experience.map((o) => (
          <div key={o.org} className="reveal" data-build="box">
            <div className="org-head">
              <span className="org-name">
                <T>{o.org}</T>
              </span>
              <span className="date">
                <T>{o.span}</T>
              </span>
            </div>
            <div className="org-roles">
              {o.roles.map((r) => (
                <div key={r.role} className="role">
                  <span>
                    <T>{r.role}</T>
                  </span>
                  <span className="date">
                    <T>{r.when}</T>
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="container site-footer">
      <span>
        <T>{`© ${new Date().getFullYear()} Jackson Moores`}</T>
      </span>
    </footer>
  );
}
