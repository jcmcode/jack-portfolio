"use client";

import { useEffect, useRef } from "react";
import { TURNSTILE_SITE_KEY } from "@/lib/site";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, options: Record<string, unknown>) => string;
      remove: (widgetId: string) => void;
    };
  }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
let scriptPromise: Promise<void> | null = null;

function loadTurnstile(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => {
        scriptPromise = null;
        reject(new Error("Turnstile failed to load"));
      };
      document.head.appendChild(script);
    });
  }
  return scriptPromise;
}

/**
 * Cloudflare Turnstile widget. Calls `onToken` with a fresh token, or null when
 * it expires or errors. Bump `resetKey` to get a new widget (tokens are single use).
 */
export default function Turnstile({
  onToken,
  resetKey,
}: {
  onToken: (token: string | null) => void;
  resetKey: number;
}) {
  const container = useRef<HTMLDivElement>(null);
  const callback = useRef(onToken);

  useEffect(() => {
    callback.current = onToken;
  }, [onToken]);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;
    let widgetId: string | undefined;
    let cancelled = false;

    loadTurnstile()
      .then(() => {
        if (cancelled || !container.current || !window.turnstile) return;
        widgetId = window.turnstile.render(container.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: "auto",
          size: "flexible",
          // Stay invisible unless Cloudflare decides this visitor needs a challenge.
          appearance: "interaction-only",
          callback: (token: string) => callback.current(token),
          "expired-callback": () => callback.current(null),
          "error-callback": () => callback.current(null),
          // Mark when a visible challenge is showing, so layout can give it room.
          "before-interactive-callback": () => container.current?.classList.add("challenge"),
          "after-interactive-callback": () => container.current?.classList.remove("challenge"),
        });
      })
      .catch(() => callback.current(null));

    return () => {
      cancelled = true;
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
    };
  }, [resetKey]);

  return <div ref={container} className="turnstile" />;
}
