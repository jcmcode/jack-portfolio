export const SITE = {
  url: "https://jacksonmoores.com",
  name: "Jackson Moores",
  eyebrow: "Mathematics & Engineering · Queen's University · 2027",
  intro:
    "I'm in my fourth year of Mathematics and Engineering at Queen's, specializing in computing and communications. I'm interested in mathematical finance, probability and stochastic processes, and software development, especially agentic development with tools such as Claude Code and Codex.",
};

/** public/resume.pdf, shipped with the site (kept out of git). Opens in the browser's PDF viewer. */
export const RESUME_URL = "/resume.pdf";

export const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jackson-moores" },
  { label: "GitHub", href: "https://github.com/jcmcode" },
];

/** Sections shown in the nav and on the scroll rail, in page order. */
export const SECTIONS = [
  { id: "top", label: "Intro" },
  { id: "work", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
