"use client";

import { motion } from "framer-motion";

type AboutProps = {
  aboutText: string | null;
  currentFocus: string | null;
  careerDirection: string | null;
};

export default function About(props: AboutProps) {
  const { aboutText, currentFocus, careerDirection } = props;

  return (
    <section id="about" className="max-w-3xl mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="font-code text-xs tracking-widest text-sec-about mb-3">
          00 / ABOUT
        </p>
        <h2 className="font-heading text-3xl font-bold text-ink">About Me</h2>
        <div className="mt-3 h-1 w-10 rounded-full bg-sec-about" />
      </motion.div>

      {aboutText && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-soft text-[17px] leading-8 max-w-[68ch] mb-10"
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
            className="bg-card border border-line rounded-xl p-6"
          >
            <p className="font-code text-xs tracking-widest uppercase text-sec-about mb-3">
              Currently focused on
            </p>
            <p className="text-soft text-[15px] leading-7">{currentFocus}</p>
          </motion.div>
        )}

        {careerDirection && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card border border-line rounded-xl p-6"
          >
            <p className="font-code text-xs tracking-widest uppercase text-sec-about mb-3">
              Career direction
            </p>
            <p className="text-soft text-[15px] leading-7">
              {careerDirection}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}