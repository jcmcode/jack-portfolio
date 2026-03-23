export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  status: string;
  timeline: string;
  role: string;
  githubUrl?: string;
  stats: { value: string; label: string }[];
  image?: string;
  sections: {
    overview: string;
    approach: string;
    results: string;
    learnings: string;
  };
}

export const projects: Project[] = [
  {
    slug: "derivative-modelling",
    title: "Derivative Modelling",
    description: "Financial modeling toolkit using the Breeden-Litzenberger theorem for extracting risk-neutral probability distributions from option prices.",
    tags: ["Python", "NumPy", "Quantitative Finance"],
    status: "In Progress",
    timeline: "2025 — Present",
    role: "Solo Developer",
    githubUrl: "https://github.com/jcmcode",
    stats: [
      { value: "3", label: "Pricing Models" },
      { value: "~2K", label: "Lines of Code" },
      { value: "PDF", label: "Risk-Neutral Dist." },
    ],
    sections: {
      overview: "A financial modeling toolkit that uses the Breeden-Litzenberger theorem to extract risk-neutral probability distributions from option prices. The goal is to build an intuitive system for pricing derivatives and understanding implied market expectations.",
      approach: "Option chain data ingestion and cleaning pipeline. Numerical differentiation of call prices to extract risk-neutral PDFs. Monte Carlo simulation for exotic derivative pricing. Visualization suite for probability distributions and Greeks.",
      results: "Successfully extracted implied probability distributions that closely match historical realized distributions. The toolkit provides a clean interface for exploring how market expectations shift across different expiration dates.",
      learnings: "Deepened understanding of the relationship between option prices and probabilistic expectations. Practical challenges of numerical methods — noise handling, interpolation choices, and the importance of robust data pipelines.",
    },
  },
  {
    slug: "wildfire-containment",
    title: "Wildfire Containment Algorithm",
    description: "UAV coordination system using Lloyd's algorithm for optimal wildfire containment positioning.",
    tags: ["C++", "Algorithms"],
    status: "Complete",
    timeline: "2024",
    role: "Solo Developer",
    stats: [
      { value: "Lloyd's", label: "Core Algorithm" },
      { value: "Multi", label: "UAV Coordination" },
      { value: "C++", label: "Implementation" },
    ],
    sections: {
      overview: "A system for coordinating multiple UAVs to optimally contain wildfire spread using Lloyd's algorithm for Voronoi-based positioning.",
      approach: "Implemented Lloyd's algorithm to iteratively compute optimal UAV positions based on fire perimeter geometry. Simulation engine models fire spread dynamics to test containment strategies.",
      results: "Achieved effective containment positioning that adapts to changing fire perimeters in real-time simulation.",
      learnings: "Gained experience with computational geometry, Voronoi diagrams, and real-time optimization under changing constraints.",
    },
  },
  {
    slug: "mars-rover",
    title: "Autonomous Mars Rover",
    description: "LiDAR-based autonomous navigation system for Mars rover traversal over uneven terrain.",
    tags: ["C++", "LiDAR"],
    status: "Complete",
    timeline: "2024",
    role: "Team Project",
    stats: [
      { value: "LiDAR", label: "Sensor Suite" },
      { value: "A*", label: "Path Planning" },
      { value: "C++", label: "Implementation" },
    ],
    sections: {
      overview: "An autonomous navigation system for a Mars rover prototype that uses LiDAR sensing to traverse uneven terrain without human intervention.",
      approach: "Point cloud processing from LiDAR data to build terrain maps. A* pathfinding with terrain cost heuristics. Real-time obstacle detection and path replanning.",
      results: "Successfully navigated simulated Martian terrain with obstacle avoidance and efficient path planning.",
      learnings: "Learned about sensor fusion, real-time systems constraints, and the challenges of autonomous decision-making in uncertain environments.",
    },
  },
  {
    slug: "homesafe",
    title: "HomeSafe",
    description: "AI-powered safety route optimizer built at QHacks 2024, placing 6th overall.",
    tags: ["QHacks 2024", "AI", "Safety"],
    status: "QHacks 2024 — 6th Place",
    timeline: "2024",
    role: "Hackathon Team",
    stats: [
      { value: "6th", label: "QHacks Placement" },
      { value: "36h", label: "Build Time" },
      { value: "AI", label: "Route Optimization" },
    ],
    sections: {
      overview: "An AI-powered route optimization tool that finds the safest walking routes by analyzing crime data, lighting conditions, and foot traffic patterns.",
      approach: "Aggregated public safety data sources. Built a weighted graph model where edge costs incorporate safety metrics. AI model scores route segments for relative safety.",
      results: "Placed 6th overall at QHacks 2024. Judges highlighted the practical impact and clean UX of the safety route recommendations.",
      learnings: "First major hackathon experience. Learned to scope aggressively, divide work effectively in a team, and present technical work to non-technical judges.",
    },
  },
];
