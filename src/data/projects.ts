export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce application with real-time inventory, Stripe payments, and an admin dashboard for managing products and orders.",
    image: "/projects/ecommerce.png",
    tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/jack/ecommerce",
  },
  {
    title: "Task Management App",
    description:
      "A collaborative task management tool with drag-and-drop boards, real-time updates, and team workspaces.",
    image: "/projects/taskapp.png",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/jack/taskapp",
  },
  {
    title: "AI Chat Interface",
    description:
      "A sleek chat interface for interacting with language models, featuring streaming responses, conversation history, and markdown rendering.",
    image: "/projects/aichat.png",
    tags: ["Next.js", "OpenAI", "Tailwind CSS", "Vercel AI SDK"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/jack/aichat",
  },
  {
    title: "Developer Portfolio",
    description:
      "A minimal, dark-themed portfolio site built with Next.js and Framer Motion. Clean animations and responsive design.",
    image: "/projects/portfolio.png",
    tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
    githubUrl: "https://github.com/jack/portfolio",
  },
];
