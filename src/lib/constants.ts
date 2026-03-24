export const PERSONAL = {
  name: "Jackson Moores",
  tagline: "Applied Mathematics & Computer Engineering",
  intro: "Modeling derivatives, designing algorithms, and engineering systems that solve real problems.",
  email: "jcmoores@outlook.com",
  location: "Kingston, ON",
  university: "Queen's University",
  graduation: "May 2027",
};

export const NAV_LINKS: { label: string; href: string; type: "route" | "anchor" }[] = [
  { label: "Projects", href: "/projects", type: "route" },
  { label: "About", href: "/#about", type: "anchor" },
  { label: "Experience", href: "/#experience", type: "anchor" },
  { label: "Contact", href: "/#contact", type: "anchor" },
];

export const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/jcmcode" },
  { label: "LinkedIn", href: "https://linkedin.com/in/jackson-moores" },
];

export const SKILLS: { category: string; items: string[] }[] = [
  { category: "Languages", items: ["Python", "C++/C", "Java", "C#", "SQL"] },
  { category: "ML / Data Science", items: ["NumPy", "Pandas", "Matplotlib", "PyTorch", "XGBoost", "Scikit-learn"] },
  { category: "Tools", items: ["Git", "Bash", "MATLAB", "Excel", "Claude Code"] },
  { category: "Domains", items: ["Algorithms", "Quantitative Finance", "Capital Markets", "Financial Modeling", "Data Analysis"] },
];
