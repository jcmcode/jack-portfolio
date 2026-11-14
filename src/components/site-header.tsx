import ThemeToggle from "./theme-toggle";
import T from "./typed";
import { RESUME_URL, SITE } from "@/lib/site";

export default function SiteHeader() {
  return (
    <header className="site-header in d1">
      <div className="container site-header-inner">
        <a href="#top" style={{ fontWeight: 600, fontSize: 15 }}>
          <T>{SITE.name}</T>
        </a>
        <nav aria-label="Main" className="site-nav">
          <a className="nav-link" href="#work">
            <T>Work</T>
          </a>
          <a className="nav-link" href="#experience">
            <T>Experience</T>
          </a>
          <a className="nav-link" href={RESUME_URL} target="_blank" rel="noopener">
            <T>Resume</T>
          </a>
          <span data-build="box" className="toggle-box">
            <ThemeToggle />
          </span>
          <a className="btn btn-solid" href="#contact" style={{ minHeight: 40, padding: "0 16px" }} data-build="box">
            <T>Contact</T>
          </a>
        </nav>
      </div>
    </header>
  );
}
