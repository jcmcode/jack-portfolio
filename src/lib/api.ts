export type ApiResult = { ok: true } | { ok: false; error: string };

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** POST JSON to one of the Worker's /api routes and normalise the outcome. */
export async function postJson(url: string, body: unknown): Promise<ApiResult> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) return { ok: true };
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    return { ok: false, error: data.error ?? "Something went wrong. Please try again." };
  } catch {
    return { ok: false, error: "Couldn't reach the server. Check your connection and try again." };
  }
}
