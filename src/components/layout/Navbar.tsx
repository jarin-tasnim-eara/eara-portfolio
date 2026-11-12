"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const NAV_LINKS = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Education", id: "education" },
  { label: "Research", id: "research" },
  { label: "Certifications", id: "certifications" },
];

type NavbarProps = {
  fullName?: string | null;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  resumeUrl?: string | null;
};

const iconClass =
  "flex h-9 w-9 items-center justify-center rounded-full border border-line text-soft transition hover:border-sec-skills hover:text-ink";

function monogramFor(fullName: string | null | undefined): string {
  if (!fullName) return "J";
  const words = fullName.split(" ").filter(Boolean).slice(0, 3);
  const letters = words.map((word) => word.charAt(0).toUpperCase()).join("");
  return letters.length > 0 ? letters : "J";
}

export default function Navbar(props: NavbarProps) {
  const { fullName, githubUrl, linkedinUrl, resumeUrl } = props;
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeIds, setActiveIds] = useState<string[]>([]);
  const [showName, setShowName] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setShowName(true);
      return;
    }

    const target = document.getElementById("hero-name");

    if (!target) {
      setShowName(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setShowName(!entry.isIntersecting && entry.boundingClientRect.top < 0);
        });
      },
      { threshold: 0 }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveIds([]);
      return;
    }

    const visible = new Set<string>();

    const elements = NAV_LINKS.map((link) =>
      document.getElementById(link.id)
    ).filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible.add(entry.target.id);
          } else {
            visible.delete(entry.target.id);
          }
        });

        const group = new Set(visible);

        if (group.has("experience") || group.has("education")) {
          group.add("experience");
          group.add("education");
        }

        setActiveIds(Array.from(group));
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    elements.forEach((el) => observer.observe(el));

    function onScroll() {
      if (window.scrollY < 200) {
        visible.clear();
        setActiveIds([]);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  if (pathname && pathname.startsWith("/admin")) return null;

  const nameClass = showName
    ? "block max-w-[220px] overflow-hidden whitespace-nowrap font-heading text-sm font-bold text-ink opacity-100 transition-all duration-300"
    : "block max-w-0 overflow-hidden whitespace-nowrap font-heading text-sm font-bold text-ink opacity-0 transition-all duration-300";

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-page/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3"
          aria-label="Home"
        >
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-heading text-xs font-bold text-white"
            style={{ background: "linear-gradient(135deg, #7c5cff, #22d3ee)" }}
          >
            {monogramFor(fullName)}
          </span>
          <span className={nameClass}>{fullName}</span>
        </Link>

        <nav className="hidden items-center gap-6 xl:flex">
          {NAV_LINKS.map((link) => {
            const isActive = activeIds.includes(link.id);
            const linkClass = isActive
              ? "relative text-sm text-ink transition"
              : "relative text-sm text-soft transition hover:text-ink";

            return (
              <Link key={link.id} href={"/#" + link.id} className={linkClass}>
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full bg-sec-skills" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          {githubUrl && (
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className={iconClass}
            >
              <FaGithub className="h-4 w-4" />
            </Link>
          )}
          {linkedinUrl && (
            <Link
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={iconClass}
            >
              <FaLinkedinIn className="h-4 w-4" />
            </Link>
          )}

          {mounted && (
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className={iconClass}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
          )}

          {resumeUrl && (
            <Link
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-1 text-sm font-medium text-soft transition hover:text-ink"
            >
              CV
            </Link>
          )}

          <Link
            href="/#contact"
            className="rounded-full bg-violet-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-violet-500"
          >
            Let&apos;s talk
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-3 xl:hidden">
          {mounted && (
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className={iconClass}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
          )}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className={iconClass}
          >
            {menuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-line bg-page px-6 py-5 xl:hidden">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => {
              const isActive = activeIds.includes(link.id);
              const linkClass = isActive
                ? "text-sm font-medium text-sec-skills"
                : "text-sm text-soft";

              return (
                <Link
                  key={link.id}
                  href={"/#" + link.id}
                  onClick={() => setMenuOpen(false)}
                  className={linkClass}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="flex flex-wrap items-center gap-3 pt-2">
              {githubUrl && (
                <Link
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className={iconClass}
                >
                  <FaGithub className="h-4 w-4" />
                </Link>
              )}
              {linkedinUrl && (
                <Link
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className={iconClass}
                >
                  <FaLinkedinIn className="h-4 w-4" />
                </Link>
              )}
              {resumeUrl && (
                <Link
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-1 text-sm font-medium text-soft"
                >
                  CV
                </Link>
              )}
              <Link
                href="/#contact"
                onClick={() => setMenuOpen(false)}
                className="rounded-full bg-violet-600 px-5 py-2 text-sm font-medium text-white"
              >
                Let&apos;s talk
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}