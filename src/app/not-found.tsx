import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container hero" style={{ minHeight: "70vh" }}>
      <p className="eyebrow">404</p>
      <h1 className="hero-name" style={{ fontSize: "clamp(48px, 8vw, 96px)" }}>
        Nothing here<span className="dot">.</span>
      </h1>
      <p className="hero-intro">That page doesn&apos;t exist, or it moved.</p>
      <div className="hero-actions">
        <Link className="btn btn-solid btn-lg" href="/">
          Back to the homepage
        </Link>
      </div>
    </main>
  );
}
