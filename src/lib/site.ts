export const SITE = {
  url: "https://jacksonmoores.com",
  name: "Jackson Moores",
  eyebrow: "Mathematics & Engineering · Queen's University · 2027",
  intro:
    "I study math and engineering at Queen's. I build software for quant research and AI tools, and I use AI agents to do a lot of the building. Right now I'm a platform developer at Strategic Analysis Corporation and CTO of QUANTT.",
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
