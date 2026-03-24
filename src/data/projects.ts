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
    slug: "pairs-trading",
    title: "QUANTT Pairs Trading",
    description:
      "Arbitrage algorithm using unsupervised clustering to identify and trade correlated securities across 5 sectors.",
    tags: ["Python", "Scikit-learn", "Pandas", "Quantitative Finance"],
    status: "Complete",
    timeline: "2025 — Present",
    role: "Project Manager — QUANTT",
    githubUrl: "https://github.com/jcmcode/QUANTT-PairsTrading",
    stats: [
      { value: "64%", label: "Top-50 Profitability" },
      { value: "142", label: "Tickers Analyzed" },
      { value: "940", label: "Significant Pairs" },
    ],
    sections: {
      overview:
        "Developed an arbitrage algorithm to trade pairs and an unsupervised clustering pipeline to identify correlated securities. Built as Project Manager for QUANTT — Queen's University Algorithmic and Network Trading Team.",
      approach:
        "Used OPTICS, KMeans, and DBSCAN clustering to identify pairs based on feature similarity rather than traditional cointegration. Validated pairs through a 5-test scored methodology with permutation testing. Applied Kalman-filtered hedge ratios for dynamic position sizing with 10bps transaction cost modeling.",
      results:
        "5x improvement over random pair selection (4.0% vs 0.8% pass rate). 3,643 pairs exceeded 8% noise-adjusted frequency threshold. 64% profitability on top 50 pairs out-of-sample. 940 statistically significant pairs confirmed via permutation testing across 142 tickers in 5 sectors.",
      learnings:
        "Rigorous statistical validation is essential — permutation testing revealed that many seemingly profitable pairs were indistinguishable from noise without proper controls. Managing a research team taught me to balance ambition with methodological discipline.",
    },
  },
  {
    slug: "risk-neutral-density",
    title: "Risk-Neutral Density",
    description:
      "Breeden-Litzenberger extraction to reconstruct market-implied probability distributions from option chains.",
    tags: ["Python", "SciPy", "Plotly", "Breeden-Litzenberger"],
    status: "In Progress",
    timeline: "2025 — Present",
    role: "Solo Developer",
    githubUrl: "https://github.com/jcmcode/risk-neutral-density",
    stats: [
      { value: "2-10x", label: "Tail Risk vs Lognormal" },
      { value: "SPY", label: "Options Chain" },
      { value: "B-L '78", label: "Core Method" },
    ],
    sections: {
      overview:
        "Implementing Breeden-Litzenberger extraction to reconstruct market-implied probability distributions from option chains to analyze tail risk, skew, and directional bias relative to lognormal benchmarks.",
      approach:
        "Live SPY options data acquisition. Volatility smile extraction via Black-Scholes inversion using Brent's algorithm. Risk-neutral density recovery using the second partial derivative of call prices with respect to strike (butterfly spread approximation) and cubic spline interpolation.",
      results:
        "Extracted risk-neutral densities showing the market assigns 2-10x more probability to large declines (10-20%) versus lognormal predictions — quantifying the persistent crash premium embedded in option prices since 1987.",
      learnings:
        "The gap between risk-neutral and real-world distributions is where the money is. Understanding this spread is fundamental to derivatives pricing and tail risk hedging.",
    },
  },
  {
    slug: "vchat",
    title: "vChat",
    description:
      "Self-hosted P2P encrypted video chat — zero accounts, zero tracking, zero media servers.",
    tags: ["SvelteKit", "TypeScript", "WebRTC", "Docker"],
    status: "Complete",
    timeline: "2025",
    role: "Solo Developer",
    githubUrl: "https://github.com/jcmcode/vchat",
    stats: [
      { value: "P2P", label: "No Central Server" },
      { value: "E2EE", label: "DTLS-SRTP" },
      { value: "2-6", label: "Participants" },
    ],
    sections: {
      overview:
        "A self-hosted peer-to-peer encrypted video chat application. Zero accounts, zero tracking, zero media servers. All media encrypted end-to-end via WebRTC DTLS-SRTP.",
      approach:
        "SvelteKit frontend with TypeScript. Node.js WebSocket signaling server for peer discovery only. Docker + Caddy reverse proxy + Coturn TURN server for NAT traversal. Full mesh topology.",
      results:
        "Feature-complete: video/audio calls, screen sharing, file transfer, text chat, reactions, room passwords, group admission control. Fully self-hostable via Docker Compose.",
      learnings:
        "WebRTC is deceptively complex — NAT traversal, STUN/TURN fallbacks, and mesh vs SFU tradeoffs. Privacy-first architecture forces you to rethink what actually needs to be centralized.",
    },
  },
  {
    slug: "wildfire-containment",
    title: "Wildfire Containment Algorithm",
    description:
      "UAV coordination algorithm using Lloyd's Algorithm to optimize wildfire containment coverage.",
    tags: ["MATLAB", "Lloyd's Algorithm"],
    status: "Complete",
    timeline: "2024",
    role: "Solo Developer",
    stats: [
      { value: "Lloyd's", label: "Core Algorithm" },
      { value: "UAV", label: "Multi-Agent" },
      { value: "MATLAB", label: "Implementation" },
    ],
    sections: {
      overview:
        "Developed a UAV coordination algorithm utilizing Lloyd's Algorithm to optimize wildfire containment coverage and effectively shrink wildfire radius.",
      approach:
        "Lloyd's algorithm iteratively computes Voronoi regions and repositions UAVs to the centroid of their coverage area, converging on an optimal spatial distribution around the fire perimeter.",
      results:
        "Algorithm converges on optimal containment positioning that adapts as the fire perimeter changes, effectively shrinking the wildfire radius through coordinated UAV coverage.",
      learnings:
        "Computational geometry applied to real-world optimization problems. Voronoi-based methods provide elegant solutions to multi-agent coordination.",
    },
  },
  {
    slug: "mars-rover",
    title: "Autonomous Mars Rover",
    description:
      "Autonomous navigation algorithm using LiDAR sensor data to detect and avoid obstacles en route to a destination.",
    tags: ["Python", "LiDAR", "Pathfinding"],
    status: "Complete",
    timeline: "2024",
    role: "Solo Developer",
    stats: [
      { value: "LiDAR", label: "Obstacle Detection" },
      { value: "Auto", label: "Navigation" },
      { value: "Python", label: "Implementation" },
    ],
    sections: {
      overview:
        "Built an autonomous navigation algorithm for a Mars rover to navigate to a specified destination around multiple obstructions utilizing LiDAR sensor data to detect and avoid obstacles.",
      approach:
        "LiDAR point cloud processing to build a real-time obstacle map. Pathfinding with obstacle avoidance heuristics. Continuous replanning as new sensor data arrives.",
      results:
        "Rover successfully navigates to specified destinations while autonomously avoiding multiple obstructions detected via LiDAR.",
      learnings:
        "Autonomous decision-making under uncertainty. Real-time sensor data is noisy — robust filtering and conservative safety margins are essential.",
    },
  },
  {
    slug: "homesafe",
    title: "HomeSafe Kingston",
    description:
      "AI-based safety-first route optimizer using crime and environmental data. QHacks 2024 — 6th Place.",
    tags: ["Python", "HTML", "MapBox API", "OpenAI API"],
    status: "QHacks 2024 — 6th Place",
    timeline: "2024",
    role: "Hackathon Team",
    githubUrl: "https://github.com/jcmcode/HomeSafe-Kingston",
    stats: [
      { value: "6th", label: "QHacks 2024" },
      { value: "AI", label: "Route Scoring" },
      { value: "MapBox", label: "Visualization" },
    ],
    sections: {
      overview:
        "Created an AI-based safety-first route optimizer using crime and environmental data to give directions avoiding high-risk areas which other map tools would not avoid.",
      approach:
        "Aggregated Kingston crime data and environmental risk factors. Built route scoring with OpenAI API for risk assessment. MapBox API for visualization and route rendering.",
      results:
        "Placed 6th overall at QHacks 2024. Judges highlighted the practical impact — generating routes that actively avoid high-risk areas, something Google Maps and Apple Maps don't do.",
      learnings:
        "Scoping aggressively under 36-hour time pressure. Dividing work effectively in a team and presenting technical work to non-technical judges.",
    },
  },
  {
    slug: "claude-telegram",
    title: "Claude Telegram Assistant",
    description:
      "Personal AI assistant bridging Telegram with Claude Code CLI — autonomous routines, skill system, persistent memory.",
    tags: ["Python", "Claude API", "Telegram", "MCP"],
    status: "Complete",
    timeline: "2025",
    role: "Solo Developer",
    githubUrl: "https://github.com/jcmcode/claude-telegram-assistant",
    stats: [
      { value: "MCP", label: "Tool Protocol" },
      { value: "3-Tier", label: "Memory System" },
      { value: "Auto", label: "Heartbeat Routines" },
    ],
    sections: {
      overview:
        "A personal assistant integrating Telegram with Claude Code CLI, giving Claude access to calendar, email, reminders, browser, and files via Telegram commands and autonomous scheduled routines.",
      approach:
        "Skill system with keyword/regex auto-detection (+email, +schedule, +remind, +task). Three-tier memory: hot context, index, and knowledge tree. Autonomous heartbeat routines via launchd for morning briefings, midday checks, evening summaries.",
      results:
        "Functional daily assistant with 2-hour session persistence, autonomous task execution, and full MCP tool integration. Handles scheduling, email drafting, and proactive reminders without manual invocation.",
      learnings:
        "Agentic systems need clear boundaries between autonomy and user control. The three-tier memory architecture was the difference between a reliable assistant and one that forgot everything between sessions.",
    },
  },
];
