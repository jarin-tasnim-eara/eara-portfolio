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
    <section id="about" className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading title="About" barClass="bg-sec-about" />

      {aboutText && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 max-w-[68ch] text-[17px] leading-8 text-soft"
        >
          {aboutText}
        </motion.p>
      )}

      <div className="grid max-w-4xl gap-6 sm:grid-cols-2">
        {currentFocus && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-xl border border-line bg-card p-6"
          >
            <p className="mb-3 font-code text-xs uppercase tracking-widest text-sec-about">
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
            className="rounded-xl border border-line bg-card p-6"
          >
            <p className="mb-3 font-code text-xs uppercase tracking-widest text-sec-about">
              Career direction
            </p>
            <p className="text-[15px] leading-7 text-soft">
              {careerDirection}
            </p>
          </motion.div>
        )}
      </div>

      {currentlyLearning.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 max-w-4xl"
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