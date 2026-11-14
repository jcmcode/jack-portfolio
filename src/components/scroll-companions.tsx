"use client";

import { useEffect, useRef, useState } from "react";
import BotSvg, { BOT_BODIES } from "./bot-svg";
import { SECTIONS } from "@/lib/site";

const RAIL_HEIGHT = 300;
const GAP = RAIL_HEIGHT / (SECTIONS.length - 1);

/** Where along the rail the reader is: the current section and a position in px. */
function railTarget() {
  const vh = window.innerHeight;
  const sy = window.scrollY;
  const tops = SECTIONS.map((s) => {
    const el = document.getElementById(s.id);
    return el ? el.getBoundingClientRect().top + sy : 0;
  });
  const probe = sy + vh * 0.35;
  let idx = 0;
  for (let i = 0; i < tops.length; i++) if (tops[i] <= probe) idx = i;
  let frac = 0;
  if (idx < tops.length - 1) {
    frac = Math.max(0, Math.min(1, (probe - tops[idx]) / Math.max(1, tops[idx + 1] - tops[idx])));
  }
  const atBottom = sy > 0 && sy + vh >= document.documentElement.scrollHeight - 2;
  if (atBottom) {
    idx = tops.length - 1;
    frac = 0;
  }
  return { idx, y: (idx + frac) * GAP };
}

/**
 * A section rail in the right margin with three small agents that follow the
 * reader down the page, lean as they move, watch the cursor and blink.
 * Wide screens only; with reduced motion they simply sit at the current section.
 */
export default function ScrollCompanions() {
  const [active, setActive] = useState(0);
  const botEls = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = Date.now();
    const bots = [0, 1, 2].map((i) => ({
      y: -80 - i * 30,
      vy: 0,
      x: 0,
      vx: 0,
      nextBlink: start + 1500 + i * 900,
      blinkUntil: 0,
    }));
    let dir = 1;
    let current = 0;
    let pointer: { x: number; y: number } | null = null;
    let pointerMoved = false;
    let raf = 0;
    let sleepTimer = 0;
    let sleeping = false;
    let lastScrollY = -1;

    // The loop sleeps whenever nothing is moving and wakes on scroll, pointer
    // movement, resize, or when the next blink is due.
    const wake = () => {
      if (!sleeping) return;
      sleeping = false;
      clearTimeout(sleepTimer);
      raf = requestAnimationFrame(tick);
    };
    const sleep = (ms: number) => {
      sleeping = true;
      sleepTimer = window.setTimeout(wake, ms);
    };
    const onPointer = (e: PointerEvent) => {
      pointer = { x: e.clientX, y: e.clientY };
      pointerMoved = true;
      wake();
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("resize", wake);

    function tick() {
      const els = botEls.current;
      // The rail is display:none on narrow screens: sleep until a resize.
      if (!els[0] || els[0].offsetParent === null) {
        sleeping = true;
        return;
      }

      const t = railTarget();
      if (t.idx !== current) {
        current = t.idx;
        bots[0].vx += 7;
        setActive(t.idx);
      }
      if (Math.abs(bots[0].vy) > 1.5) dir = bots[0].vy > 0 ? 1 : -1;
      const now = Date.now();

      bots.forEach((b, i) => {
        const el = els[i];
        if (!el) return;
        const target = i === 0 ? t.y : bots[i - 1].y - 24 * dir;
        if (reduced) {
          b.y = target;
          b.vy = 0;
          b.x = 0;
        } else {
          const k = i === 0 ? 0.075 : 0.06 - i * 0.008;
          b.vy = (b.vy + (target - b.y) * k) * 0.8;
          b.y += b.vy;
          b.vx = (b.vx - b.x * 0.16) * 0.74;
          b.x += b.vx;
        }
        const lean = reduced ? 0 : Math.max(-22, Math.min(22, b.vy * 2.4));
        el.style.transform = `translate(${b.x.toFixed(1)}px, ${(b.y - 13).toFixed(1)}px) rotate(${lean.toFixed(1)}deg)`;

        const pupils = el.querySelector<SVGGElement>(".pupils");
        if (pupils) {
          let px = 0;
          let py = 0.4;
          if (pointer) {
            const r = el.getBoundingClientRect();
            const dx = pointer.x - (r.left + r.width / 2);
            const dy = pointer.y - (r.top + r.height / 2);
            const d = Math.hypot(dx, dy) || 1;
            px = (dx / d) * 1.3;
            py = (dy / d) * 1.3;
          }
          pupils.setAttribute("transform", `translate(${px.toFixed(2)} ${py.toFixed(2)})`);
        }

        if (!reduced) {
          if (now > b.nextBlink) {
            b.blinkUntil = now + 130;
            b.nextBlink = now + 2500 + Math.random() * 4000;
          }
          const eyes = el.querySelector<SVGGElement>(".eyes");
          if (eyes) eyes.style.transform = now < b.blinkUntil ? "scaleY(0.12)" : "";
        }
      });

      const settled = bots.every((b, i) => {
        const target = i === 0 ? t.y : bots[i - 1].y - 24 * dir;
        return Math.abs(b.vy) < 0.02 && Math.abs(b.vx) < 0.02 && Math.abs(target - b.y) < 0.5 && now >= b.blinkUntil;
      });
      const scrolled = window.scrollY !== lastScrollY;
      lastScrollY = window.scrollY;
      const moved = pointerMoved;
      pointerMoved = false;
      if (settled && !scrolled && !moved) {
        const nextBlink = reduced ? 60000 : Math.min(...bots.map((b) => b.nextBlink)) - now;
        sleep(Math.max(16, nextBlink));
      } else {
        raf = requestAnimationFrame(tick);
      }
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(sleepTimer);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", wake);
    };
  }, []);

  return (
    <nav className="rail" aria-label="Page sections">
      <div className="rail-line" aria-hidden="true" />
      {SECTIONS.map((s, i) => (
        <a
          key={s.id}
          className="tick"
          href={`#${s.id}`}
          aria-current={i === active ? "true" : undefined}
          style={{ top: i * GAP }}
        >
          <span className="tick-label">{s.label}</span>
          <span className="tick-dot" />
        </a>
      ))}
      <div className="bots" aria-hidden="true">
        {BOT_BODIES.map((_, i) => (
          <div
            key={i}
            className={`bot bot-shape bot-${i}`}
            ref={(el) => {
              botEls.current[i] = el;
            }}
          >
            <BotSvg index={i} />
          </div>
        ))}
      </div>
    </nav>
  );
}
