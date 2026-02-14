export const PERSONAL = {
  name: "Jack",
  tagline: "Full-Stack Developer",
  intro:
    "I build modern web applications with clean code and thoughtful design. Passionate about creating experiences that are fast, accessible, and delightful to use.",
  email: "hello@jack.dev",
  location: "San Francisco, CA",
} as const;

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

export const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/jack",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/jack",
  },
  {
    label: "Twitter",
    href: "https://twitter.com/jack",
  },
] as const;

export const SKILLS = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Tailwind CSS",
  "PostgreSQL",
  "Python",
  "Docker",
  "AWS",
  "Git",
] as const;
