export interface Project {
  kind: string;
  title: string;
  description: string;
  tags: string;
  result: string;
  href?: string;
}

export const projects: Project[] = [
  {
    kind: "Quant research",
    title: "QUANTT Pairs Trading",
    description:
      "Clustering-based pair discovery and walk-forward backtesting across 142 equities.",
    tags: "Python · scikit-learn · Kalman",
    result: "41% → 64% profitable pairs",
    href: "https://github.com/jcmcode/QUANTT-PairsTrading",
  },
  {
    kind: "Production",
    title: "quantt.ca + Connect",
    description:
      "The club's site and a sponsor and internship platform that I build and maintain.",
    tags: "Next.js · PostgreSQL",
    result: "Live, used club-wide",
    href: "https://quantt.ca",
  },
  {
    kind: "Systems",
    title: "vChat",
    description: "Self-hosted peer-to-peer video chat with no accounts and no media servers.",
    tags: "SvelteKit · WebRTC",
    result: "Open source · self-hostable",
    href: "https://github.com/jcmcode/vchat",
  },
  {
    kind: "Algorithms",
    title: "Wildfire Containment",
    description: "UAV coordination using a density-weighted Lloyd's algorithm to cover a fire line.",
    tags: "MATLAB",
    result: "Even coverage as the fire moves",
  },
  {
    kind: "Robotics",
    title: "Autonomous Mars Rover",
    description:
      "Navigates to a target around obstacles using LiDAR data, replanning as new scans arrive.",
    tags: "Python · LiDAR",
    result: "Reaches target autonomously",
  },
  {
    kind: "Hackathon",
    title: "HomeSafe Kingston",
    description:
      "A route planner that steers around higher-risk areas using public crime and environmental data.",
    tags: "Python · Mapbox · OpenAI",
    result: "6th place, QHacks 2024",
    href: "https://github.com/jcmcode/HomeSafe-Kingston",
  },
];
