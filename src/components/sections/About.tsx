"use client";

import { motion } from "framer-motion";

type AboutProps = {
  aboutText: string | null;
  currentFocus: string | null;
  careerDirection: string | null;
};

export default function About({
  aboutText,
  currentFocus,
  careerDirection,
}: AboutProps) {
  return (
    <section id="about" className="max-w-3xl mx-auto px-6 py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold text-neutral-900 dark:text-white mb-8"
      >
        About Me
      </motion.h2>

      {aboutText && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-8"
        >
          {aboutText}
        </motion.p>
      )}

      <div className="grid sm:grid-cols-2 gap-6">
        {currentFocus && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-5"
          >
            <p className="text-xs uppercase tracking-wide text-neutral-400 mb-2">
              Currently Focused On
            </p>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              {currentFocus}
            </p>
          </motion.div>
        )}

        {careerDirection && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-5"
          >
            <p className="text-xs uppercase tracking-wide text-neutral-400 mb-2">
              Career Direction
            </p>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              {careerDirection}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}