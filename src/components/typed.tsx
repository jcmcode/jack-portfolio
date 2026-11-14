/**
 * Text the intro agents can "type": rendered as one span per character so the
 * intro can reveal them one by one. It's a single copy of the text, so copying,
 * find-in-page and search engines all see it normally.
 */
export default function T({ children }: { children: string }) {
  return (
    <span data-type="">
      <span className="tw">
        {[...children].map((c, i) => (
          <span key={i}>{c}</span>
        ))}
      </span>
    </span>
  );
}
