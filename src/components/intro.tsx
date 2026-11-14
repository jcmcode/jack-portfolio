"use client";

import { useEffect, useRef } from "react";
import BotSvg from "./bot-svg";

declare global {
  interface Window {
    __introRunning?: boolean;
  }
}

type Bot = {
  el: HTMLDivElement;
  /** A few rings per bot, used in turn, so a new burst never yanks an old one away. */
  rings: HTMLDivElement[];
  nextRing: number;
  caret: HTMLDivElement;
  frame: HTMLDivElement;
  x: number;
  y: number;
  s: number;
  rot: number;
};
type Point = { x: number; y: number; s?: number };
type Target = Point | (() => Point);
type MoveOptions = { hop?: number; bob?: number };
type Task = (b: Bot) => Promise<void>;

const SIZE = 34;
const RINGS_PER_BOT = 4;
/** Global tempo: every movement, typing speed and pause is multiplied by this. */
const PACE = 1.35;
const RAIL_SCALE = 26 / SIZE;
const SECTION_IDS = ["work", "experience", "contact"];
type QueuedTask = { el: HTMLElement; run: Task };

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

/**
 * Next animation frame, with a timer fallback: browsers pause rAF for hidden
 * tabs, and all motion here is time-based, so a slower tick still lands right.
 */
function nextFrame(cb: (now: number) => void) {
  let done = false;
  const run = () => {
    if (done) return;
    done = true;
    cb(performance.now());
  };
  requestAnimationFrame(run);
  setTimeout(run, 50);
}

/**
 * An element's box in page coordinates. The agents live on a layer anchored to
 * the document (not the window), so they scroll with whatever they're building.
 */
function pageRect(el: Element) {
  const r = el.getBoundingClientRect();
  const x = window.scrollX;
  const y = window.scrollY;
  return { left: r.left + x, top: r.top + y, right: r.right + x, bottom: r.bottom + y, width: r.width, height: r.height };
}

function center(el: Element): Point {
  const r = pageRect(el);
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

function visible(el: Element): boolean {
  const r = el.getBoundingClientRect();
  return r.width > 0 && r.height > 0 && r.right > 0 && r.left < window.innerWidth;
}

/**
 * First-visit intro: the page starts as a blueprint (see globals.css) and three
 * agents build it. In the hero they type the header, eyebrow and intro text,
 * stamp the name letter by letter and assemble the buttons. Then they carry on
 * straight through the rest of the page, sharing one job list (whatever is on
 * screen first), whether or not the reader is scrolling, and finally return to
 * the scroll rail. Whether it plays is decided before first paint in layout.tsx.
 * Scrolling or typing skips the hero part; Escape or "Skip intro" finishes everything.
 */
export default function Intro() {
  const botEls = useRef<(HTMLDivElement | null)[]>([]);
  const ringEls = useRef<(HTMLDivElement | null)[]>([]);
  const caretEls = useRef<(HTMLDivElement | null)[]>([]);
  const frameEls = useRef<(HTMLDivElement | null)[]>([]);
  const skipRef = useRef<() => void>(() => {});

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.intro !== "building") return;
    window.__introRunning = true;

    let phase: "hero" | "tour" | "done" = "hero";
    let skipHero = false;
    let skipAll = false;
    let cancelled = false;
    const skipping = () => cancelled || skipAll || (phase === "hero" && skipHero);

    const bots: Bot[] = [];
    botEls.current.forEach((el, i) => {
      const rings = ringEls.current
        .slice(i * RINGS_PER_BOT, (i + 1) * RINGS_PER_BOT)
        .filter((r): r is HTMLDivElement => r !== null);
      const caret = caretEls.current[i];
      const frame = frameEls.current[i];
      if (el && rings.length && caret && frame) {
        bots.push({ el, rings, nextRing: 0, caret, frame, x: -100, y: -100, s: 0, rot: 0 });
      }
    });

    // ---- drawing primitives -------------------------------------------------
    const place = (b: Bot) => {
      b.el.style.transform = `translate(${(b.x - SIZE / 2).toFixed(1)}px, ${(b.y - SIZE / 2).toFixed(1)}px) rotate(${b.rot.toFixed(1)}deg) scale(${b.s.toFixed(3)})`;
    };
    const pop = (b: Bot, scale = 1) => {
      const ring = b.rings[b.nextRing++ % b.rings.length];
      ring.style.transform = `translate(${b.x.toFixed(1)}px, ${b.y.toFixed(1)}px) scale(${scale})`;
      ring.classList.remove("pop");
      void ring.offsetWidth; // restart the CSS animation
      ring.classList.add("pop");
    };
    const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, skipping() ? 0 : ms * PACE));

    const move = (b: Bot, to: Target, baseMs: number, opts: MoveOptions = {}) =>
      new Promise<void>((resolve) => {
        if (skipping()) return resolve();
        const ms = baseMs * PACE;
        const { hop = 30, bob = 0 } = opts;
        const x0 = b.x;
        const y0 = b.y;
        const s0 = b.s;
        const start = performance.now();
        let lastX = b.x;
        const step = (now: number) => {
          if (skipping()) return resolve();
          const p = typeof to === "function" ? to() : to;
          const t = Math.min(1, (now - start) / ms);
          const e = easeInOut(t);
          b.x = x0 + (p.x - x0) * e;
          b.y = y0 + (p.y - y0) * e - Math.sin(Math.PI * t) * hop - Math.abs(Math.sin((t * ms) / 55)) * bob;
          b.s = s0 + ((p.s ?? s0) - s0) * e;
          b.rot = clamp((b.x - lastX) * 2.5, -25, 25);
          lastX = b.x;
          place(b);
          if (t < 1) {
            nextFrame(step);
          } else {
            b.rot = 0;
            place(b);
            resolve();
          }
        };
        nextFrame(step);
      });

    /** Reveal [data-type] text one character at a time, with the bot riding the caret. */
    const typeInto = (b: Bot, el: HTMLElement, basePerChar: number) =>
      new Promise<void>((resolve) => {
        const chars = [...el.querySelectorAll<HTMLElement>(".tw > span")];
        // Long passages type faster per character so they don't drag.
        const lengthFactor = chars.length > 60 ? 0.4 : chars.length > 25 ? 0.7 : 1;
        const perChar = basePerChar * lengthFactor * PACE;
        let shown = 0;
        const done = () => {
          chars.forEach((c) => c.classList.add("on"));
          el.classList.add("typed");
          b.caret.style.opacity = "0";
          b.rot = 0;
          place(b);
          resolve();
        };
        if (!chars.length || skipping()) return done();
        const start = performance.now();
        b.caret.style.opacity = "1";
        const step = (now: number) => {
          if (skipping()) return done();
          const n = Math.min(chars.length, Math.floor((now - start) / perChar) + 1);
          for (; shown < n; shown++) chars[shown].classList.add("on");
          const r = pageRect(chars[n - 1]);
          b.x += (r.right + 14 - b.x) * 0.45;
          b.y += (r.top - 6 - b.y) * 0.45;
          b.rot = Math.sin(now / 45) * 9; // scribbling
          place(b);
          b.caret.style.height = `${r.height.toFixed(0)}px`;
          b.caret.style.transform = `translate(${(r.right + 1).toFixed(1)}px, ${r.top.toFixed(1)}px)`;
          if (n >= chars.length) {
            setTimeout(done, 90);
            return;
          }
          nextFrame(step);
        };
        nextFrame(step);
      });

    const PAD = 4; // matches the scaffold's outline-offset
    const frameRect = (el: HTMLElement) => {
      const r = pageRect(el);
      return { l: r.left - PAD, t: r.top - PAD, w: r.width + PAD * 2, h: r.height + PAD * 2 };
    };
    const hideFrame = (b: Bot) => {
      b.frame.classList.remove("on");
      setTimeout(() => {
        b.frame.querySelectorAll("i").forEach((e) => (e.style.transform = "scale(0)"));
      }, 320);
    };

    /** Walk the box's perimeter clockwise from the top-left, drawing a glowing frame behind. */
    const traceFrame = (b: Bot, el: HTMLElement) =>
      new Promise<void>((resolve) => {
        if (skipping()) return resolve();
        const [top, right, bottom, left] = [...b.frame.querySelectorAll<HTMLElement>("i")];
        const first = frameRect(el);
        const ms = clamp((first.w + first.h) * 2 * 0.55, 420, 850) * PACE;
        const start = performance.now();
        b.frame.classList.add("on");
        const step = (now: number) => {
          if (skipping()) return resolve();
          const t = Math.min(1, (now - start) / ms);
          const { l, t: tp, w, h } = frameRect(el);
          const d = easeInOut(t) * (w + h) * 2;
          b.frame.style.transform = `translate(${l.toFixed(1)}px, ${tp.toFixed(1)}px)`;
          b.frame.style.width = `${w.toFixed(1)}px`;
          b.frame.style.height = `${h.toFixed(1)}px`;
          top.style.transform = `scaleX(${clamp(d / w, 0, 1)})`;
          right.style.transform = `scaleY(${clamp((d - w) / h, 0, 1)})`;
          bottom.style.transform = `scaleX(${clamp((d - w - h) / w, 0, 1)})`;
          left.style.transform = `scaleY(${clamp((d - 2 * w - h) / h, 0, 1)})`;
          // The bot walks just outside the line it's drawing.
          const o = 9;
          if (d <= w) [b.x, b.y] = [l + d, tp - o];
          else if (d <= w + h) [b.x, b.y] = [l + w + o, tp + (d - w)];
          else if (d <= 2 * w + h) [b.x, b.y] = [l + w - (d - w - h), tp + h + o];
          else [b.x, b.y] = [l - o, tp + h - (d - 2 * w - h)];
          b.y -= Math.abs(Math.sin(now / 60)) * 3;
          b.rot = Math.sin(now / 70) * 7;
          place(b);
          if (t < 1) nextFrame(step);
          else {
            b.rot = 0;
            place(b);
            resolve();
          }
        };
        nextFrame(step);
      });

    /** Elements that are placed whole rather than broken into smaller pieces. */
    const isLeaf = (el: HTMLElement) =>
      el.matches("[data-type], input, textarea, select, iframe, svg, img, .turnstile") || el.children.length === 0;

    /**
     * Carry each child of `container` in and drop it into place. Pieces that
     * contain smaller pieces get those placed one by one too; text gets typed.
     */
    const placePieces = async (b: Bot, container: HTMLElement, perChar: number, depth: number): Promise<void> => {
      const kids = [...container.children].filter(
        (c): c is HTMLElement => c instanceof HTMLElement && !c.matches(".sr-only, .honeypot") && visible(c),
      );
      for (const kid of kids) {
        if (skipping()) return;
        const nested = depth < 4 && !isLeaf(kid);
        if (nested) kid.classList.add("nest");
        b.el.classList.add("carrying");
        await move(b, () => {
          const r = pageRect(kid);
          return { x: r.left + Math.min(r.width, 140) / 2, y: r.top - 12 };
        }, 230, { hop: 36 });
        b.el.classList.remove("carrying");
        kid.classList.add("placed");
        if (kid.matches("[data-type]")) await typeInto(b, kid, perChar);
        else if (nested) await placePieces(b, kid, perChar, depth + 1);
        else await wait(90);
      }
    };

    /**
     * Build a [data-build] box from parts: trace its frame, slot the base in,
     * then carry each piece over and drop it into place (typing any text in it).
     */
    const assemble = async (b: Bot, el: HTMLElement, perChar: number) => {
      const finish = () => {
        el.classList.remove("assembling");
        el.classList.add("built", "quiet");
        b.el.classList.remove("carrying");
        hideFrame(b);
      };
      if (skipping()) return finish();
      await move(b, () => {
        const f = frameRect(el);
        return { x: f.l, y: f.t - 9, s: 1 };
      }, 360, { hop: 44 });
      await traceFrame(b, el);
      if (skipping()) return finish();
      el.classList.add("assembling");
      pop(b, 0.8);
      await wait(140);
      hideFrame(b);

      await placePieces(b, el, perChar, 0);
      finish();
    };

    const caretStart = (el: HTMLElement) => () => {
      const first = el.querySelector(".tw > span") ?? el;
      const r = pageRect(first);
      return { x: r.left - 4, y: r.top - 6, s: 1 };
    };

    const typeTask =
      (el: HTMLElement | null, perChar: number): Task =>
      async (b) => {
        if (!el || !visible(el)) {
          el?.classList.add("typed");
          return;
        }
        await move(b, caretStart(el), 340, { hop: 44 });
        await typeInto(b, el, perChar);
      };
    const assembleTask =
      (el: HTMLElement | null, perChar = 26): Task =>
      async (b) => {
        if (!el || !visible(el)) {
          el?.classList.add("built");
          return;
        }
        await assemble(b, el, perChar);
      };
    const stampLetters = async (b: Bot, letters: HTMLElement[], perLetter: number) => {
      for (const c of letters) {
        await move(
          b,
          () => {
            const r = pageRect(c);
            return { x: r.left + r.width / 2, y: r.top + 4 };
          },
          perLetter,
          { hop: 26 },
        );
        c.classList.add("built");
        if (!skipping()) pop(b, 0.7);
      }
    };
    // ---- rail ("home") --------------------------------------------------------
    const railBots = () => [...document.querySelectorAll<HTMLElement>(".rail .bot")];
    const railVisible = () => {
      const r = railBots();
      return r.length >= 3 && r[0].offsetParent !== null;
    };
    const home = (i: number) => (): Point => {
      if (railVisible()) return { ...center(railBots()[i]), s: RAIL_SCALE };
      return {
        x: window.scrollX + window.innerWidth + 50,
        y: window.scrollY + window.innerHeight * 0.35 + i * 30,
        s: 0.6,
      };
    };
    let allHome = false;
    /** Once a bot has no more work, it waits at its rail spot, following it as the page scrolls. */
    const waitAtHome = (b: Bot, i: number) => {
      const loop = () => {
        if (allHome || skipping()) return;
        const p = home(i)();
        b.x += (p.x - b.x) * 0.3;
        b.y += (p.y - b.y) * 0.3;
        b.s = p.s ?? b.s;
        b.rot = 0;
        place(b);
        nextFrame(loop);
      };
      nextFrame(loop);
    };

    // ---- finishing ------------------------------------------------------------
    const finishWithin = (scope: ParentNode) => {
      scope.querySelectorAll(".tw > span").forEach((c) => c.classList.add("on"));
      scope.querySelectorAll("[data-type]").forEach((el) => el.classList.add("typed"));
      scope.querySelectorAll("[data-build]").forEach((el) => {
        el.classList.remove("assembling");
        el.classList.add("built");
      });
      scope.querySelectorAll(".hero-name .ch").forEach((el) => el.classList.add("built"));
    };
    const resetBots = () =>
      bots.forEach((b) => {
        b.caret.style.opacity = "0";
        b.el.classList.remove("carrying");
        hideFrame(b);
      });
    const finishHero = () => {
      document.querySelectorAll(".site-header, #top").forEach(finishWithin);
      resetBots();
    };
    const finishAll = () => {
      if (root.dataset.intro === "done") return;
      skipAll = true;
      phase = "done";
      finishWithin(document);
      resetBots();
      removeListeners();
      delete root.dataset.agents;
      root.dataset.intro = "done";
    };
    const markSeen = () => {
      try {
        sessionStorage.setItem("introSeen", "1");
      } catch {
        // Without storage it just plays again next visit.
      }
    };

    // ---- input ----------------------------------------------------------------
    const onScrollIntent = () => {
      if (phase === "hero") skipHero = true;
    };
    // Escape and Tab end everything (Tab means someone wants to reach the
    // controls, which aren't usable until they're built); other keys only skip
    // the hero, the same as scrolling.
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Tab") finishAll();
      else onScrollIntent();
    };
    const removeListeners = () => {
      window.removeEventListener("wheel", onScrollIntent);
      window.removeEventListener("touchstart", onScrollIntent);
      window.removeEventListener("pointerdown", onScrollIntent);
      window.removeEventListener("keydown", onKey);
    };
    window.addEventListener("wheel", onScrollIntent, { passive: true });
    window.addEventListener("touchstart", onScrollIntent, { passive: true });
    window.addEventListener("pointerdown", onScrollIntent, { passive: true });
    window.addEventListener("keydown", onKey);
    skipRef.current = finishAll;

    // ---- the hero -------------------------------------------------------------
    const q = (selector: string) => document.querySelector<HTMLElement>(selector);
    const qa = (selector: string) => [...document.querySelectorAll<HTMLElement>(selector)];

    async function buildHero() {
      const dot = q(".hero-name .dot");
      const lines = qa(".hero-name .line");
      if (!dot || lines.length < 2 || bots.length < 3) return;
      const [b0, b1, b2] = bots;

      // The full stop lands, and the agents pop out of it.
      await wait(150);
      dot.classList.add("built");
      await wait(280);
      const d = center(dot);
      bots.forEach((b) => {
        b.x = d.x;
        b.y = d.y;
        b.s = 0;
        place(b);
      });
      await Promise.all(
        bots.map((b, i) =>
          wait(i * 70).then(() => {
            pop(b);
            return move(b, { x: d.x + (i - 1) * 46, y: d.y - 80, s: 1 }, 360, { hop: 40 });
          }),
        ),
      );

      // Header and eyebrow: logo + theme toggle, nav links + Contact, eyebrow.
      const navLinks = qa(".site-nav .nav-link [data-type]");
      await Promise.all([
        (async () => {
          await typeTask(q(".site-header a[href='#top'] [data-type]"), 50)(b0);
          await assembleTask(q(".site-nav .toggle-box"))(b0);
        })(),
        (async () => {
          for (const link of navLinks) await typeTask(link, 42)(b1);
          await assembleTask(q(".site-nav .btn[data-build]"), 38)(b1);
        })(),
        typeTask(q(".eyebrow [data-type]"), 24)(b2),
      ]);

      // The name, stamped letter by letter, while the intro text gets typed out;
      // then the buttons.
      const letters = lines.map((line) => [...line.querySelectorAll<HTMLElement>(".ch:not(.dot)")]);
      const buttons = qa(".hero-actions [data-build]");
      await Promise.all([
        (async () => {
          await stampLetters(b0, letters[0], 120);
          await assembleTask(buttons[0] ?? null, 40)(b0);
        })(),
        (async () => {
          await stampLetters(b1, letters[1], 120);
          await assembleTask(buttons[1] ?? null, 40)(b1);
        })(),
        typeTask(q(".hero-intro [data-type]"), 8)(b2),
      ]);
      await wait(250);
    }

    // ---- everything below the hero: one continuous shared job list -------------
    /** All remaining work in page order; within a section the boxes are shuffled. */
    const buildQueue = (): QueuedTask[] => {
      const jobs: QueuedTask[] = [];
      for (const id of SECTION_IDS) {
        const section = document.getElementById(id);
        if (!section) continue;
        const title = section.querySelector<HTMLElement>("h2 [data-type]");
        if (title) jobs.push({ el: title, run: typeTask(title, 55) });
        const boxes = [...section.querySelectorAll<HTMLElement>("[data-build]")];
        for (let i = boxes.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [boxes[i], boxes[j]] = [boxes[j], boxes[i]];
        }
        boxes.forEach((box) => jobs.push({ el: box, run: assembleTask(box, 22) }));
      }
      const footer = q(".site-footer [data-type]");
      if (footer) jobs.push({ el: footer, run: typeTask(footer, 30) });
      return jobs;
    };

    /** Next job: whatever unbuilt piece is on screen right now, otherwise the next in page order. */
    const pickJob = (jobs: QueuedTask[]) => {
      if (!jobs.length) return undefined;
      const vh = window.innerHeight;
      let i = jobs.findIndex((j) => {
        const r = j.el.getBoundingClientRect();
        return r.bottom > 0 && r.top < vh;
      });
      if (i < 0) i = 0;
      return jobs.splice(i, 1)[0];
    };

    async function buildRest() {
      const jobs = buildQueue();
      await Promise.all(
        bots.map(async (b, i) => {
          for (let job = pickJob(jobs); job && !skipping(); job = pickJob(jobs)) await job.run(b);
          if (skipping()) return;
          await move(b, home(i), 700, { hop: 70 });
          waitAtHome(b, i);
        }),
      );
      allHome = true;
    }

    async function main() {
      if (window.scrollY > 40) skipHero = true;
      await buildHero();
      finishHero();
      markSeen();
      if (skipAll || cancelled) return;

      // Straight on to the rest of the page: no pause, no trip back to the rail.
      phase = "tour";
      root.dataset.intro = "touring";
      root.dataset.agents = "away";
      await buildRest();
      if (!cancelled) finishAll();
    }

    // Safety net: the hero must never stay a blueprint.
    const watchdog = setTimeout(() => {
      if (phase === "hero") {
        skipHero = true;
        finishHero();
      }
    }, 15000);

    main().catch(() => finishAll());

    return () => {
      clearTimeout(watchdog);
      cancelled = true;
      removeListeners();
    };
  }, []);

  return (
    <>
      <div className="blueprint" aria-hidden="true" />
      <div className="intro-layer" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <div
            key={`caret-${i}`}
            className="intro-caret"
            ref={(el) => {
              caretEls.current[i] = el;
            }}
          />
        ))}
        {[0, 1, 2].map((i) => (
          <div
            key={`frame-${i}`}
            className="intro-frame"
            ref={(el) => {
              frameEls.current[i] = el;
            }}
          >
            <i className="e-t" />
            <i className="e-r" />
            <i className="e-b" />
            <i className="e-l" />
          </div>
        ))}
        {Array.from({ length: 3 * RINGS_PER_BOT }, (_, i) => (
          <div
            key={`ring-${i}`}
            className="intro-ring"
            ref={(el) => {
              ringEls.current[i] = el;
            }}
          />
        ))}
        {[0, 1, 2].map((i) => (
          <div
            key={`bot-${i}`}
            className={`intro-bot bot-shape bot-${i}`}
            ref={(el) => {
              botEls.current[i] = el;
            }}
          >
            <BotSvg index={i} size={SIZE} />
            <span className="carry" />
          </div>
        ))}
      </div>
      <button type="button" className="intro-skip" onClick={() => skipRef.current()}>
        Skip intro
      </button>
    </>
  );
}
