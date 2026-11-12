"use client";

import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";

type FooterProps = {
  fullName: string | null;
  title?: string | null;
};

export default function Footer(props: FooterProps) {
  const { fullName } = props;
  const pathname = usePathname();

  if (pathname && pathname.startsWith("/admin")) return null;

  const year = new Date().getFullYear();

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="mt-6 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col-reverse gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-soft">
          © {year} {fullName ? fullName : "Portfolio"}. All rights reserved.
        </p>

        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex w-fit items-center gap-2 text-sm text-soft transition hover:text-ink"
        >
          <ArrowUp className="h-4 w-4" />
          Back to top
        </button>
      </div>
    </footer>
  );
}