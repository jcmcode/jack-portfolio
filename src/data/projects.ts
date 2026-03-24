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
      "Quantitative trading framework that discovers and trades equity pairs through unsupervised clustering across 142 tickers and 5 sectors.",
    tags: ["Python", "Scikit-learn", "Pandas", "Quantitative Finance"],
    status: "Complete",
    timeline: "2024 — 2025",
    role: "QUANTT Research Group",
    githubUrl: "https://github.com/jcmcode/QUANTT-PairsTrading",
    stats: [
      { value: "64%", label: "Profitability" },
      { value: "142", label: "Tickers Analyzed" },
      { value: "5x", label: "vs Random Selection" },
    ],
    sections: {
      overview:
        "A quantitative trading research framework that discovers and trades equity pairs through unsupervised clustering. Instead of traditional cointegration, it identifies assets that repeatedly cluster together based on real-time feature similarity, then validates and backtests these persistent pairs across 142 tickers in 5 sectors.",
      approach:
        "Used OPTICS, KMeans, and DBSCAN clustering to identify pairs based on feature similarity rather than price correlation. Validated pairs through a 5-test scored methodology with permutation testing. Applied Kalman-filtered hedge ratios for dynamic position sizing with 10bps transaction cost modeling.",
      results:
        "Achieved 5x improvement over random pair selection (4.0% vs 0.8% pass rate). Identified 3,643 pairs exceeding 8% noise-adjusted frequency threshold. 64% profitability on top 50 pairs. 940 statistically significant pairs confirmed via permutation testing.",
      learnings:
        "Developed deep understanding of unsupervised learning applied to financial data. Learned the importance of rigorous statistical validation — permutation testing revealed that many seemingly profitable pairs were indistinguishable from noise without proper controls.",
    },
  },
  {
    slug: "risk-neutral-density",
    title: "Risk-Neutral Density",
    description:
      "Implements Breeden-Litzenberger (1978) to extract market-implied probability distributions from SPY options data.",
    tags: ["Python", "Jupyter", "Options Pricing", "Finance"],
    status: "Complete",
    timeline: "2025",
    role: "Solo Developer",
    githubUrl: "https://github.com/jcmcode/risk-neutral-density",
    stats: [
      { value: "19", label: "Figures Generated" },
      { value: "SPY", label: "Options Data" },
      { value: "B-L", label: "Core Method" },
    ],
    sections: {
      overview:
        "Implements the Breeden-Litzenberger (1978) method to extract market-implied probability distributions from live SPY options data. Demonstrates how option prices encode forward-looking market expectations about asset price movements and tail risks.",
      approach:
        "Live SPY options data acquisition and processing. Volatility smile extraction via Black-Scholes inversion using Brent's algorithm. Risk-neutral density recovery using butterfly spread approximation with cubic spline interpolation.",
      results:
        "Generated 19 publication-quality figures showing market-implied distributions. Key empirical finding: the market assigns 2-10x more probability to large declines (10-20%) versus lognormal predictions, reflecting persistent post-1987 crash hedging demand.",
      learnings:
        "Deepened understanding of how option markets price tail risk. The gap between risk-neutral and real-world distributions reveals the price of fear embedded in option markets.",
    },
  },
  {
    slug: "vchat",
    title: "vChat",
    description:
      "Self-hosted P2P encrypted video chat with zero accounts, tracking, or media servers. Supports 2-6 participants.",
    tags: ["SvelteKit", "TypeScript", "WebRTC", "Docker"],
    status: "Complete",
    timeline: "2025",
    role: "Solo Developer",
    githubUrl: "https://github.com/jcmcode/vchat",
    stats: [
      { value: "P2P", label: "Architecture" },
      { value: "E2E", label: "Encryption" },
      { value: "6", label: "Max Participants" },
    ],
    sections: {
      overview:
        "A self-hosted peer-to-peer encrypted video chat application with zero accounts, tracking, or media servers. Built for privacy — all media streams are encrypted end-to-end via WebRTC DTLS-SRTP with no data touching a central server.",
      approach:
        "SvelteKit frontend with TypeScript, Node.js WebSocket signaling server for peer discovery only. Docker + Caddy reverse proxy + Coturn TURN server for NAT traversal. Full mesh topology for up to 6 participants.",
      results:
        "Feature-complete video chat with screen sharing, file transfer, text chat, reactions, room passwords, and group admission control. Fully self-hostable with Docker Compose.",
      learnings:
        "Learned the complexity of WebRTC — NAT traversal, STUN/TURN relay fallbacks, and the tradeoffs of mesh vs SFU topology. Building for privacy-first means rethinking assumptions about what needs to be centralized.",
    },
  },
  {
    slug: "claude-telegram",
    title: "Claude Telegram Assistant",
    description:
      "Personal AI assistant integrating Telegram with Claude Code CLI, with autonomous routines and a skill system.",
    tags: ["Python", "Claude API", "Telegram", "MCP"],
    status: "Complete",
    timeline: "2025",
    role: "Solo Developer",
    githubUrl: "https://github.com/jcmcode/claude-telegram-assistant",
    stats: [
      { value: "MCP", label: "Protocol" },
      { value: "Auto", label: "Routines" },
      { value: "3-Tier", label: "Memory" },
    ],
    sections: {
      overview:
        "A personal assistant that integrates Telegram messaging with Claude Code CLI, giving Claude access to a full tool ecosystem — calendar, email, reminders, browser, files — via Telegram commands and autonomous heartbeat routines.",
      approach:
        "Skill system with keyword/regex auto-detection for commands (+email, +schedule, +remind, +task). Three-tier memory architecture: hot context, index, and knowledge tree. Autonomous heartbeat routines for morning briefings, midday checks, and evening summaries via launchd scheduling.",
      results:
        "Functional personal assistant with 2-hour session persistence, task queue for autonomous execution, and full MCP tool integration. Handles daily scheduling, email drafting, and proactive reminders without manual invocation.",
      learnings:
        "Learned about designing agentic systems that balance autonomy with user control. The three-tier memory architecture was essential — without it, context degradation made the assistant unreliable across sessions.",
    },
  },
  {
    slug: "pomo",
    title: "Pomo",
    description:
      "Lightweight native macOS Pomodoro timer with dual-ring display and menu bar integration.",
    tags: ["Swift", "SwiftUI", "macOS"],
    status: "Complete",
    timeline: "2025",
    role: "Solo Developer",
    githubUrl: "https://github.com/jcmcode/pomo",
    stats: [
      { value: "Swift 6", label: "Language" },
      { value: "Native", label: "macOS App" },
      { value: "3", label: "Presets" },
    ],
    sections: {
      overview:
        "A lightweight native macOS Pomodoro timer with a dual-ring visual display, menu bar integration with progress indicator, and customizable work/break intervals.",
      approach:
        "Built with SwiftUI targeting macOS 14+. Three presets (Classic 25/5, Deep Work 50/10, Short Sprint 15/3) plus custom sequences. Granular notification system with system alerts, audio cues, and menu bar visual indicators.",
      results:
        "Clean, focused timer app that stays out of the way. Menu bar integration means it's always accessible without cluttering the desktop. Light/dark mode support follows system preferences.",
      learnings:
        "First native macOS app. Learned SwiftUI's declarative approach and the nuances of menu bar app development — managing window lifecycle and background execution differently from standard apps.",
    },
  },
  {
    slug: "homesafe",
    title: "HomeSafe Kingston",
    description:
      "Crime safety analysis tool for Kingston with route safety recommendations. Built at QHacks 2024, placing 6th.",
    tags: ["Python", "Flask", "QHacks 2024"],
    status: "QHacks 2024 — 6th Place",
    timeline: "2024",
    role: "Hackathon Team",
    githubUrl: "https://github.com/jcmcode/HomeSafe-Kingston",
    stats: [
      { value: "6th", label: "QHacks Placement" },
      { value: "36h", label: "Build Time" },
      { value: "Flask", label: "Web Framework" },
    ],
    sections: {
      overview:
        "A crime safety analysis tool for Kingston that processes crime statistics and incident data, providing route safety recommendations via a Flask web interface.",
      approach:
        "Aggregated Kingston crime data from CSV datasets. Built a safe routing engine (safe_router.py) that scores route segments based on historical incident density. Flask web app for visualization and route input.",
      results:
        "Placed 6th overall at QHacks 2024. Judges highlighted the practical impact and clean UX of the safety route recommendations.",
      learnings:
        "First major hackathon experience. Learned to scope aggressively under time pressure, divide work effectively in a team, and present technical work to non-technical judges.",
    },
  },
];
