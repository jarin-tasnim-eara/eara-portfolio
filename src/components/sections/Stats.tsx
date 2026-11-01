"use client";

import { motion } from "framer-motion";
import CountUp from "@/components/ui/CountUp";

type StatsProps = {
  projects: number;
  research: number;
  certifications: number;
  skills: number;
};

export default function Stats(props: StatsProps) {
  const items = [
    {
      key: "projects",
      label: "Projects",
      value: props.projects,
      text: "text-sec-projects",
      bar: "bg-sec-projects",
    },
    {
      key: "research",
      label: "Research",
      value: props.research,
      text: "text-sec-research",
      bar: "bg-sec-research",
    },
    {
      key: "awards",
      label: "Certifications",
      value: props.certifications,
      text: "text-sec-awards",
      bar: "bg-sec-awards",
    },
    {
      key: "skills",
      label: "Skills",
      value: props.skills,
      text: "text-sec-skills",
      bar: "bg-sec-skills",
    },
  ].filter((item) => item.value > 0);

  if (items.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto px-6 pb-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-card border border-line rounded-xl p-5"
          >
            <p
              className={
                "font-heading text-4xl md:text-5xl font-bold " + item.text
              }
            >
              <CountUp value={item.value} />
            </p>
            <p className="mt-2 font-code text-xs tracking-widest uppercase text-soft">
              {item.label}
            </p>
            <div className={"mt-4 h-0.5 w-10 rounded-full " + item.bar} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}