import type { NextConfig } from "next";

// The site is fully static: `next build` writes plain HTML/CSS/JS to `out/`,
// which the Cloudflare Worker in `worker/` serves as static assets.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
