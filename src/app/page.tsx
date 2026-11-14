import Contact from "@/components/contact";
import Intro from "@/components/intro";
import ScrollCompanions from "@/components/scroll-companions";
import { Experience, Hero, Projects, SiteFooter } from "@/components/sections";
import SiteHeader from "@/components/site-header";

export default function Home() {
  return (
    <>
      <div className="sweep" aria-hidden="true" />
      <SiteHeader />
      <ScrollCompanions />
      <main>
        <Hero />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <SiteFooter />
      <Intro />
    </>
  );
}
