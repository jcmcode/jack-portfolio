/** Body shapes for the three agents: square, round, dome. */
export const BOT_BODIES = [
  "M5 6.5h14a3 3 0 0 1 3 3v9.5a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V9.5a3 3 0 0 1 3-3z",
  "M12 5a8.5 8.5 0 1 1 0 17a8.5 8.5 0 1 1 0-17z",
  "M12 6.5c5 0 9 3 9 7.5v3a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5v-3c0-4.5 4-7.5 9-7.5z",
];

/** One agent, drawn in a 24×24 box. Colour comes from the parent's .bot-N class. */
export default function BotSvg({ index, size = 26 }: { index: number; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <line className="antenna" x1="12" y1="6.5" x2="12" y2="2.6" strokeWidth="1.4" strokeLinecap="round" />
      <circle className="body" cx="12" cy="2" r="1.7" />
      <path className="body" d={BOT_BODIES[index]} />
      <g className="eyes">
        <circle cx="9" cy="13.5" r="2.7" fill="#fff" stroke="rgba(0,0,0,0.18)" strokeWidth="0.5" />
        <circle cx="15" cy="13.5" r="2.7" fill="#fff" stroke="rgba(0,0,0,0.18)" strokeWidth="0.5" />
        <g className="pupils">
          <circle cx="9" cy="13.5" r="1.35" fill="#111214" />
          <circle cx="15" cy="13.5" r="1.35" fill="#111214" />
        </g>
      </g>
    </svg>
  );
}
