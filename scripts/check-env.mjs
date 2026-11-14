// Refuses to ship a build that's missing pieces: no Turnstile site key (or a
// test key), no resume PDF, or missing Worker secrets.
//   node scripts/check-env.mjs          before `npm run deploy` (checks everything)
//   node scripts/check-env.mjs --build  in Cloudflare's builder (`npm run build:cf`),
//                                       which can't list secrets
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import nextEnv from "@next/env";

const fail = (msg) => {
  console.error(`✗ ${msg}`);
  process.exit(1);
};

nextEnv.loadEnvConfig(process.cwd(), false);
const key = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
if (!key) fail("NEXT_PUBLIC_TURNSTILE_SITE_KEY is not set. Put your real site key in .env.production.");
if (/^[123]x0+[A-F]{2}$/.test(key)) fail(`NEXT_PUBLIC_TURNSTILE_SITE_KEY is a Cloudflare test key (${key}). Use your real site key.`);
console.log("✓ Turnstile site key looks real.");

if (!existsSync("public/resume.pdf")) fail("public/resume.pdf is missing. Put your resume there before deploying.");
console.log("✓ public/resume.pdf is present.");

if (process.argv.includes("--build")) process.exit(0);

const REQUIRED = ["TURNSTILE_SECRET_KEY", "RESEND_API_KEY", "CONTACT_TO", "CONTACT_FROM"];
let names;
try {
  const out = execFileSync("npx", ["wrangler", "secret", "list", "--format", "json"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  names = JSON.parse(out.slice(out.indexOf("["))).map((s) => s.name);
} catch {
  fail("Couldn't list the Worker's secrets. Run `npx wrangler login`, then set them (see README step 5).");
}
const missing = REQUIRED.filter((n) => !names.includes(n));
if (missing.length) fail(`Worker secrets not set: ${missing.join(", ")}. See README step 5.`);
console.log("✓ Worker secrets are set.");
