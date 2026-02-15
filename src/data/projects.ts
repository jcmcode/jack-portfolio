export interface Project {
  title: string;
  description: string;
  tags: string[];
  status?: string;
}

export const projects: Project[] = [
  {
    title: "Derivative Modelling",
    description:
      "Implementing Breeden-Litzenberger extraction to reconstruct market-implied probability distributions from option chains. Builds risk-neutral density surfaces for derivative pricing and risk analysis.",
    tags: ["Python", "Scipy", "Plotly", "Breeden-Litzenberger"],
    status: "In Progress",
  },
  {
    title: "Wildfire Containment Algorithm",
    description:
      "UAV coordination algorithm for wildfire containment using Lloyd's algorithm to optimize coverage zones. Simulates multi-drone deployment for efficient area partitioning and real-time fire boundary tracking.",
    tags: ["Matlab", "Lloyd's Algorithm"],
  },
  {
    title: "Autonomous Mars Rover",
    description:
      "Navigation algorithm using LiDAR sensor data to detect and avoid obstacles in unstructured terrain. Processes point cloud data for real-time pathfinding and autonomous decision-making.",
    tags: ["Python", "LiDAR"],
  },
  {
    title: "HomeSafe",
    description:
      "AI-based safety-first route optimizer that uses crime and environmental data to recommend the safest walking paths. Built at QHacks 2024, placing 6th overall.",
    tags: ["Python", "HTML", "MapBox API", "OpenAI API"],
    status: "QHacks 2024 – 6th Place",
  },
];
