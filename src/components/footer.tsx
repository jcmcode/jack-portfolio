import { PERSONAL } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 py-8">
      <div className="max-w-6xl mx-auto px-6 text-center text-sm text-neutral-500">
        &copy; {new Date().getFullYear()} {PERSONAL.name}. All rights reserved.
      </div>
    </footer>
  );
}
