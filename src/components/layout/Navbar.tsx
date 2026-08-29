"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon } from "lucide-react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Research", href: "#research" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({
  githubUrl,
  linkedinUrl,
  resumeUrl,
}: {
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  resumeUrl?: string | null;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <a
          href="#"
          className="font-semibold text-neutral-900 dark:text-white"
        >
          Eara
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">

          {/* GitHub */}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition"
            >
              GitHub
            </a>
          )}

          {/* LinkedIn */}
          {linkedinUrl && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition"
            >
              LinkedIn
            </a>
          )}

          {/* Theme Toggle */}
          {mounted && (
            <button
              type="button"
              onClick={() =>
                setTheme(theme === "dark" ? "light" : "dark")
              }
              aria-label="Toggle theme"
              className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
          )}

          {/* Resume */}
          {resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-md hover:opacity-90 transition"
            >
              Resume
            </a>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden text-neutral-600 dark:text-neutral-300"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 px-6 py-4 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">

          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm text-neutral-600 dark:text-neutral-300"
            >
              {link.label}
            </a>
          ))}

          {/* Mobile GitHub */}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-600 dark:text-neutral-300"
            >
              GitHub
            </a>
          )}

          {/* Mobile LinkedIn */}
          {linkedinUrl && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-600 dark:text-neutral-300"
            >
              LinkedIn
            </a>
          )}

          {/* Mobile Resume */}
          {resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-center px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-md"
            >
              Resume
            </a>
          )}
        </div>
      )}
    </header>
  );
}