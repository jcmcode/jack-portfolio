export interface Org {
  org: string;
  span: string;
  note: string;
  roles: { role: string; when: string }[];
}

export const experience: Org[] = [
  {
    org: "Strategic Analysis Corporation",
    span: "2026 — now",
    note: "Building an AI-powered equity-research platform.",
    roles: [
      { role: "AI-Accelerated Platform Developer (Intern)", when: "Apr 2026 — now" },
      { role: "Generative AI Research & Optimization (Contract)", when: "Mar — Apr 2026" },
    ],
  },
  {
    org: "QUANTT",
    span: "2024 — now",
    note: "Queen's Algorithmic & Network Trading Team. I run the club's tech and co-lead its research.",
    roles: [
      { role: "Chief Technology Officer", when: "Mar 2026 — now" },
      { role: "Project Manager, Pairs Trading", when: "Aug 2025 — Apr 2026" },
      { role: "Quantitative Analyst", when: "Sep 2024 — Aug 2025" },
    ],
  },
  {
    org: "Queen's University",
    span: "Class of 2027",
    note: "Probability, stochastic processes, control theory and information theory.",
    roles: [
      {
        role: "B.A.Sc. Mathematics & Engineering (Computing & Communications)",
        when: "May 2027",
      },
    ],
  },
];
