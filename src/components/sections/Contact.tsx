"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail } from "lucide-react";

type ContactProps = {
  email: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  resumeUrl: string | null;
};

export default function Contact(props: ContactProps) {
  const { email, githubUrl, linkedinUrl, resumeUrl } = props;
  const mailtoHref = email ? "mailto:" + email : "";

  if (!email && !githubUrl && !linkedinUrl && !resumeUrl) return null;

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

        <div className="flex flex-wrap items-center justify-center gap-3">
          {email && (
            <Link
              href={mailtoHref}
              className="flex items-center gap-2 px-5 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-md text-sm font-medium hover:opacity-90 transition"
            >
              <Mail className="w-4 h-4" />
              Email Me
            </Link>
          )}

          {linkedinUrl && (
            <Link
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-md text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900 transition"
            >
              LinkedIn
            </Link>
          )}

          {githubUrl && (
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-md text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900 transition"
            >
              GitHub
            </Link>
          )}

          {resumeUrl && (
            <Link
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-md text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900 transition"
            >
              Download CV
            </Link>
          )}
        </div>
      </motion.div>
    </section>
  );
}