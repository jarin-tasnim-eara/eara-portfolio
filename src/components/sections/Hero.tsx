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
  availabilityText: string | null;
  showAvailability: boolean;
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
    availabilityText,
    showAvailability,
  } = props;

  const reduceMotion = useReducedMotion();

  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

  const floatAnimation = reduceMotion ? { y: 0 } : { y: [0, -12, 0] };
  const spinAnimation = reduceMotion ? { rotate: 0 } : { rotate: 360 };

  const statusVisible =
    showAvailability && availabilityText && availabilityText.trim().length > 0;

  return (
    <section className="mx-auto flex max-w-6xl items-center px-6 pb-10 pt-14 md:pt-20 lg:min-h-[calc(85vh-5rem)]">
      <div className="grid w-full items-center gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-12">
        <div className="order-2">
          {statusVisible && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/50 bg-emerald-500/10 px-3.5 py-1.5 text-[13px] font-medium text-emerald-700 dark:text-emerald-300"
            >
              <span className="status-dot" />
              {availabilityText}
            </motion.div>
          )}

          <motion.h1
            id="hero-name"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-heading text-4xl font-bold leading-[1.05] text-ink sm:text-5xl md:text-7xl"
          >
            {fullName}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-5 font-heading text-lg text-sec-projects md:text-xl"
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
          className="order-1 mx-auto md:mx-0"
        >
          <motion.div
            animate={floatAnimation}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative h-56 w-56 sm:h-64 sm:w-64 md:h-80 md:w-80"
          >
            <motion.div
              aria-hidden="true"
              animate={spinAnimation}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 rounded-full border border-dashed border-sec-skills opacity-40 md:-inset-6"
            />
            <div className="absolute -inset-2 rounded-full border border-sec-projects opacity-40 md:-inset-3" />
            <div className="relative h-full w-full overflow-hidden rounded-full border border-line bg-card">
              {profileImageUrl ? (
                <Image
                  src={profileImageUrl}
                  alt={fullName}
                  fill
                  sizes="320px"
                  className="object-cover object-top"
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