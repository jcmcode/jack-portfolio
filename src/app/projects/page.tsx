"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { projects } from "@/data/projects";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import ProjectSelector from "@/components/projects/project-selector";
import ProjectDetail from "@/components/projects/project-detail";
import SnapIn from "@/components/snap-in";

function ProjectsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeSlug = searchParams.get("project") || projects[0].slug;
  const activeProject = projects.find((p) => p.slug === activeSlug) || projects[0];

  function handleSelect(slug: string) {
    router.push(`/projects?project=${slug}`, { scroll: false });
  }

  return (
    <>
      <SnapIn>
        <section
          style={{
            padding: "56px 48px 48px",
            borderBottom: "2px solid var(--border)",
          }}
        >
          <h1
            className="text-[clamp(48px,8vw,64px)] font-black leading-[0.9] mb-4"
            style={{ letterSpacing: "-4px" }}
          >
            PROJECTS
          </h1>
          <p
            className="font-mono text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            A selection of work across quantitative finance, algorithms, and
            systems engineering.
          </p>
        </section>
      </SnapIn>

      <ProjectSelector
        projects={projects}
        activeSlug={activeProject.slug}
        onSelect={handleSelect}
      />
      <ProjectDetail project={activeProject} />
    </>
  );
}

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <main>
        <Suspense fallback={null}>
          <ProjectsContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
