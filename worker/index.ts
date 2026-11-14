/**
 * Cloudflare Worker for the portfolio.
 *
 * Static pages and the resume PDF come from the Next.js export (the ASSETS
 * binding). This Worker only runs first for /api/*:
 *   POST /api/contact  contact form -> email to the site owner
 *
 * No email address appears on the page itself.
 */

interface Env {
  ASSETS: Fetcher;
  FORM_LIMITER?: RateLimit;
  TURNSTILE_SECRET_KEY: string;
  RESEND_API_KEY: string;
  CONTACT_TO: string;
  CONTACT_FROM: string;
}

const REQUIRED_SECRETS = [
  "TURNSTILE_SECRET_KEY",
  "RESEND_API_KEY",
  "CONTACT_TO",
  "CONTACT_FROM",
] as const;
const MAX_BODY_BYTES = 16 * 1024;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** Cloudflare's published always-pass/always-fail Turnstile secrets, used for local runs. */
const TEST_TURNSTILE_SECRET = /^[123]x0+[A-F]{2}$/;

/** `_headers` only covers static assets, so Worker responses set these themselves. */
const SECURITY_HEADERS = {
  "x-content-type-options": "nosniff",
  "strict-transport-security": "max-age=31536000",
  "referrer-policy": "strict-origin-when-cross-origin",
};

class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);

    if (!url.pathname.startsWith("/api/")) {
      return env.ASSETS.fetch(request);
    }

    try {
      const missing = REQUIRED_SECRETS.filter((k) => !env[k]);
      if (missing.length) {
        console.error(`Worker misconfigured: missing secrets ${missing.join(", ")}`);
        throw new HttpError(503, "This form isn't available right now. Please try again later.");
      }
      if (url.pathname === "/api/contact" && request.method === "POST") {
        return await handleContact(request, env);
      }
      return json({ error: "Not found." }, 404);
    } catch (err) {
      if (err instanceof HttpError) return json({ error: err.message }, err.status);
      console.error("Unhandled API error", err);
      return json({ error: "Something went wrong. Please try again in a moment." }, 500);
    }
  },
} satisfies ExportedHandler<Env>;

// ---------------------------------------------------------------------------
// Handlers

async function handleContact(request: Request, env: Env): Promise<Response> {
  await enforceRateLimit(request, env, "contact");
  const body = await readJson(request);

  // Hidden honeypot field: real visitors never fill it in.
  if (typeof body.hp_extra === "string" && body.hp_extra.trim() !== "") {
    return json({ ok: true });
  }

  const name = cleanLine(body.name, 100, "Please add your name.");
  const email = cleanEmail(body.email);
  const subject = cleanLine(body.subject, 150, "Please add a subject.");
  const message = cleanText(body.message, 5000, "Please write a short message.");
  await verifyTurnstile(body.turnstileToken, request, env);

  await sendEmail(env, {
    to: env.CONTACT_TO,
    subject: `[Portfolio] ${subject}`,
    replyTo: email,
    text: `From: ${name} <${email}>\nSubject: ${subject}\n\n${message}\n`,
  });

  return json({ ok: true });
}

// ---------------------------------------------------------------------------
// Helpers

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...SECURITY_HEADERS, "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

async function readJson(request: Request): Promise<Record<string, unknown>> {
  const text = await readBodyCapped(request, MAX_BODY_BYTES);
  try {
    const parsed: unknown = JSON.parse(text);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as Record<string, unknown>;
    }
  } catch {
    // fall through
  }
  throw new HttpError(400, "Invalid request.");
}

/** Reads at most `max` bytes, so an oversized body is rejected without buffering all of it. */
async function readBodyCapped(request: Request, max: number): Promise<string> {
  const tooLong = () => new HttpError(413, "That message is too long.");
  if (Number(request.headers.get("content-length") ?? 0) > max) throw tooLong();
  if (!request.body) return "";

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > max) {
      await reader.cancel();
      throw tooLong();
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const c of chunks) {
    bytes.set(c, offset);
    offset += c.byteLength;
  }
  return new TextDecoder().decode(bytes);
}

function cleanLine(value: unknown, max: number, emptyMessage: string): string {
  const s = typeof value === "string" ? value.replace(/[\r\n]+/g, " ").trim() : "";
  if (!s) throw new HttpError(400, emptyMessage);
  if (s.length > max) throw new HttpError(400, `Please keep that under ${max} characters.`);
  return s;
}

function cleanText(value: unknown, max: number, emptyMessage: string): string {
  const s = typeof value === "string" ? value.trim() : "";
  if (!s) throw new HttpError(400, emptyMessage);
  if (s.length > max) throw new HttpError(400, `Please keep your message under ${max} characters.`);
  return s;
}

function cleanEmail(value: unknown): string {
  const s = typeof value === "string" ? value.trim() : "";
  if (!EMAIL_RE.test(s) || s.length > 254) throw new HttpError(400, "Please enter a valid email address.");
  return s;
}

async function enforceRateLimit(request: Request, env: Env, scope: string): Promise<void> {
  if (!env.FORM_LIMITER) return;
  const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
  const { success } = await env.FORM_LIMITER.limit({ key: `${scope}:${ip}` });
  if (!success) throw new HttpError(429, "Too many requests. Please wait a minute and try again.");
}

async function verifyTurnstile(token: unknown, request: Request, env: Env): Promise<void> {
  if (typeof token !== "string" || !token) {
    throw new HttpError(400, "Please complete the verification check.");
  }
  const form = new FormData();
  form.append("secret", env.TURNSTILE_SECRET_KEY);
  form.append("response", token);
  const ip = request.headers.get("cf-connecting-ip");
  if (ip) form.append("remoteip", ip);

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: form,
  });
  if (!res.ok) {
    console.error("Turnstile siteverify failed", res.status);
    throw new HttpError(502, "Couldn't verify right now. Please try again in a minute.");
  }
  const outcome = (await res.json()) as { success?: boolean; hostname?: string };
  if (!outcome.success) {
    throw new HttpError(403, "Verification failed. Please refresh the page and try again.");
  }
  // A token is only good for the site it was issued on. (Test keys report "example.com".)
  const host = new URL(request.url).hostname;
  if (!TEST_TURNSTILE_SECRET.test(env.TURNSTILE_SECRET_KEY) && outcome.hostname !== host) {
    console.error(`Turnstile hostname mismatch: token for ${outcome.hostname}, request to ${host}`);
    throw new HttpError(403, "Verification failed. Please refresh the page and try again.");
  }
}

async function sendEmail(
  env: Env,
  mail: { to: string; subject: string; text: string; replyTo?: string },
): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM,
      to: [mail.to],
      subject: mail.subject,
      text: mail.text,
      ...(mail.replyTo ? { reply_to: mail.replyTo } : {}),
    }),
  });
  if (!res.ok) {
    console.error("Email send failed", res.status, await res.text());
    throw new HttpError(502, "Couldn't send right now. Please try again in a few minutes.");
  }
}
