"use client";

import { motion } from "framer-motion";

type SectionHeadingProps = {
  title: string;
  barClass: string;
};

export default function SectionHeading(props: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-10"
    >
      <h2 className="font-heading text-3xl font-bold text-ink md:text-4xl">
        {props.title}
      </h2>
      <div className={"mt-3 h-1 w-10 rounded-full " + props.barClass} />
    </motion.div>
  );
}