"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type HeroProps = {
  fullName: string;
  title: string;
  shortIntro: string | null;
  profileImageUrl: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  email: string | null;
};

export default function Hero(props: HeroProps) {
  const fullName = props.fullName;
  const title = props.title;
  const shortIntro = props.shortIntro;
  const profileImageUrl = props.profileImageUrl;
  const githubUrl = props.githubUrl;
  const linkedinUrl = props.linkedinUrl;
  const email = props.email;

  const mailtoHref = email ? "mailto:" + email : "";

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-3xl mx-auto text-center">

        {profileImageUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-28 h-28 mx-auto mb-6 rounded-full overflow-hidden border border-neutral-200 dark:border-neutral-800"
          >
            <Image
              src={profileImageUrl}
              alt={fullName}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-sm text-neutral-500 dark:text-neutral-400 mb-3"
        >
          Hi, I&apos;m
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-3"
        >
          {fullName}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg text-neutral-500 dark:text-neutral-400 mb-6"
        >
          {title}
        </motion.p>

        {shortIntro && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-neutral-600 dark:text-neutral-300 max-w-xl mx-auto mb-8"
          >
            {shortIntro}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="#projects"
            className="px-5 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-md text-sm font-medium hover:opacity-90 transition"
          >
            View Projects
          </Link>

          {email && (
            <Link
              href={mailtoHref}
              className="px-5 py-2.5 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-md text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900 transition"
            >
              Contact Me
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-16"
        >
          <ArrowDown className="w-4 h-4 mx-auto text-neutral-400 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}