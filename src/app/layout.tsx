import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  alternates: { canonical: "/" },
  title: "Jackson Moores",
  description:
    "Mathematics & Engineering at Queen's University. Software for quant research and AI tools.",
  openGraph: {
    title: "Jackson Moores",
    description:
      "Mathematics & Engineering at Queen's University. Software for quant research and AI tools.",
    type: "website",
    url: "/",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#111214" },
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
  ],
};

// Runs before first paint:
// - applies a saved light/dark choice, so there's no flash;
// - decides whether to play the "agents build the site" intro (first visit this
//   session, homepage only, no reduced motion, not a deep link). A fallback reveals the page if
//   the intro script never starts.
const themeScript = `(function(){try{var d=document.documentElement;var t=localStorage.getItem('theme');if(t==='light'||t==='dark')d.dataset.theme=t;
var seen=sessionStorage.getItem('introSeen');var rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(location.pathname==='/'&&!seen&&!rm&&!location.hash&&!navigator.webdriver){d.dataset.intro='building';setTimeout(function(){if(d.dataset.intro==='building'&&!window.__introRunning)d.dataset.intro='done';},4000);}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${archivo.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
