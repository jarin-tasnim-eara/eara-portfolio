"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Copy, Check } from "lucide-react";

type ContactProps = {
  email: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  resumeUrl: string | null;
  googleScholarUrl: string | null;
  researchgateUrl: string | null;
};

const outlineClass =
  "px-5 py-2.5 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-md text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900 transition";

export default function Contact(props: ContactProps) {
  const {
    email,
    githubUrl,
    linkedinUrl,
    resumeUrl,
    googleScholarUrl,
    researchgateUrl,
  } = props;

  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  if (
    !email &&
    !githubUrl &&
    !linkedinUrl &&
    !resumeUrl &&
    !googleScholarUrl &&
    !researchgateUrl
  ) {
    return null;
  }

  const mailtoHref = email ? "mailto:" + email : "";
  const gmailHref = email
    ? "https://mail.google.com/mail/?view=cm&fs=1&to=" +
      encodeURIComponent(email)
    : "";

  return (
    <section id="contact" className="max-w-3xl mx-auto px-6 py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
          Get In Touch
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto mb-8">
          Have a question or an opportunity in mind? Feel free to reach out.
        </p>

        {email && (
          <div className="flex flex-col items-center gap-4 mb-8">
            <p className="text-lg font-medium text-neutral-900 dark:text-white select-all">
              {email}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={copyEmail}
                className="flex items-center gap-2 px-5 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-md text-sm font-medium hover:opacity-90 transition"
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                {copied ? "Copied" : "Copy email"}
              </button>
              <Link
                href={gmailHref}
                target="_blank"
                rel="noopener noreferrer"
                className={outlineClass}
              >
                Open in Gmail
              </Link>
              <Link href={mailtoHref} className={outlineClass}>
                Email app
              </Link>
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-3">
          {linkedinUrl && (
            <Link
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={outlineClass}
            >
              LinkedIn
            </Link>
          )}
          {githubUrl && (
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={outlineClass}
            >
              GitHub
            </Link>
          )}
          {googleScholarUrl && (
            <Link
              href={googleScholarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={outlineClass}
            >
              Google Scholar
            </Link>
          )}
          {researchgateUrl && (
            <Link
              href={researchgateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={outlineClass}
            >
              ResearchGate
            </Link>
          )}
          {resumeUrl && (
            <Link
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={outlineClass}
            >
              Download CV
            </Link>
          )}
        </div>
      </motion.div>
    </section>
  );
}