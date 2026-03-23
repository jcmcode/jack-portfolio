export interface Experience {
  year: string;
  role: string;
  company: string;
  description: string;
}

// These are intentional visible placeholders. Jackson will replace them
// with real data from his resume. Do not try to source real data — commit as-is.
export const experiences: Experience[] = [
  {
    year: "2025",
    role: "Role Title",
    company: "Company / Organization",
    description: "Brief description of work and impact.",
  },
  {
    year: "2024",
    role: "Role Title",
    company: "Company / Organization",
    description: "Brief description of work and impact.",
  },
];
