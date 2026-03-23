import Nav from "@/components/nav";
import Hero from "@/components/hero";
import SelectedWork from "@/components/selected-work";
import About from "@/components/about";
import Experience from "@/components/experience";
import Education from "@/components/education";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SelectedWork />
        <About />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
