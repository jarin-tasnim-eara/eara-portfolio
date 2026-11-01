"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SocialIcons from "@/components/ui/SocialIcons";

type HeroProps = {
  fullName: string;
  title: string;
  shortIntro: string | null;
  profileImageUrl: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  googleScholarUrl: string | null;
  researchgateUrl: string | null;
  resumeUrl: string | null;
};

export default function Hero(props: HeroProps) {
  const {
    fullName,
    title,
    shortIntro,
    profileImageUrl,
    githubUrl,
    linkedinUrl,
    googleScholarUrl,
    researchgateUrl,
    resumeUrl,
  } = props;

  const reduceMotion = useReducedMotion();

  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

  const floatAnimation = reduceMotion ? { y: 0 } : { y: [0, -12, 0] };

  return (
    <section className="max-w-6xl mx-auto px-6 pt-16 pb-12 min-h-[calc(100vh-5rem)] flex items-center">
      <div className="grid w-full items-center gap-12 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-code text-xs tracking-widest text-sec-skills mb-4"
          >
            HELLO, I&apos;M
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-heading text-5xl md:text-7xl font-bold leading-[1.05] text-ink"
          >
            {fullName}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-5 font-heading text-lg md:text-xl text-sec-projects"
          >
            {title}
          </motion.p>

          {shortIntro && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-5 max-w-[52ch] text-[17px] leading-8 text-soft"
            >
              {shortIntro}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link
              href="#projects"
              className="rounded-md bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-violet-500"
            >
              View Projects
            </Link>
            <Link
              href="#contact"
              className="rounded-md border border-line bg-card px-5 py-2.5 text-sm font-medium text-ink transition hover:border-sec-skills"
            >
              Contact Me
            </Link>
            {resumeUrl && (
              <Link
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md px-3 py-2.5 text-sm font-medium text-soft transition hover:text-ink"
              >
                Download CV
              </Link>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8"
          >
            <SocialIcons
              githubUrl={githubUrl}
              linkedinUrl={linkedinUrl}
              googleScholarUrl={googleScholarUrl}
              researchgateUrl={researchgateUrl}
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto w-full max-w-xs"
        >
          <motion.div
            animate={floatAnimation}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div className="absolute -inset-3 rounded-[2rem] border border-sec-projects opacity-40" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line bg-card">
              {profileImageUrl ? (
                <Image
                  src={profileImageUrl}
                  alt={fullName}
                  fill
                  sizes="320px"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center font-heading text-6xl font-bold text-sec-projects">
                  {initials}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}