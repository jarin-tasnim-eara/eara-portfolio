"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Copy, Check } from "lucide-react";
import SocialIcons from "@/components/ui/SocialIcons";

type ContactProps = {
  email: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  resumeUrl: string | null;
  googleScholarUrl: string | null;
  researchgateUrl: string | null;
};

const outlineClass =
  "rounded-md border border-line px-5 py-2.5 text-sm font-medium text-ink transition hover:border-sec-about";

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
    <section id="contact" className="max-w-4xl mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-line bg-card p-8 text-center sm:p-12"
      >
        <p className="font-code text-xs tracking-widest text-sec-about mb-3">
          CONTACT
        </p>
        <h2 className="font-heading text-3xl font-bold text-ink">
          Get in touch
        </h2>
        <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-sec-about" />
        <p className="mx-auto mt-6 max-w-md text-soft">
          Have a question or an opportunity in mind? Feel free to reach out.
        </p>

        {email && (
          <div className="mt-8 flex flex-col items-center gap-5">
            <p className="select-all font-heading text-xl font-medium text-ink">
              {email}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={copyEmail}
                className="flex items-center gap-2 rounded-md bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-violet-500"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
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

        <div className="mt-10 flex flex-col items-center gap-5 border-t border-line pt-8">
          <SocialIcons
            githubUrl={githubUrl}
            linkedinUrl={linkedinUrl}
            googleScholarUrl={googleScholarUrl}
            researchgateUrl={researchgateUrl}
          />
          {resumeUrl && (
            <Link
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-sec-about hover:underline"
            >
              Download CV →
            </Link>
          )}
        </div>
      </motion.div>
    </section>
  );
}