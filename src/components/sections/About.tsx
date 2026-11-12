"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

type AboutProps = {
  aboutText: string | null;
  currentFocus: string | null;
  careerDirection: string | null;
  currentlyLearning: string[];
};

export default function About(props: AboutProps) {
  const { aboutText, currentFocus, careerDirection, currentlyLearning } = props;

  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-14">
      <SectionHeading title="About" barClass="bg-sec-about" />

      <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start lg:gap-12">
        <div>
          {aboutText && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="max-w-[68ch] text-base leading-7 text-soft"
            >
              {aboutText}
            </motion.p>
          )}
        </div>

        <div className="flex flex-col gap-4">
          {currentFocus && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-xl border border-line bg-card p-5"
            >
              <p className="mb-2 font-code text-xs uppercase tracking-widest text-sec-about">
                Currently focused on
              </p>
              <p className="text-[15px] leading-7 text-soft">{currentFocus}</p>
            </motion.div>
          )}

          {careerDirection && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-xl border border-line bg-card p-5"
            >
              <p className="mb-2 font-code text-xs uppercase tracking-widest text-sec-about">
                Career direction
              </p>
              <p className="text-[15px] leading-7 text-soft">
                {careerDirection}
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {currentlyLearning.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8"
        >
          <div className="mb-4 flex items-center gap-4">
            <p className="font-code text-xs uppercase tracking-widest text-soft">
              Currently learning
            </p>
            <div className="h-px flex-1 bg-line" />
          </div>

          <div className="flex flex-wrap gap-2">
            {currentlyLearning.map((item) => (
              <span
                key={item}
                className="rounded-full border border-sec-about px-3.5 py-1.5 text-sm text-ink"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
}