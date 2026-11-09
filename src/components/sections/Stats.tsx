"use client";

import { motion } from "framer-motion";
import CountUp from "@/components/ui/CountUp";

type StatsProps = {
  projects: number;
  skills: number;
  research: number;
  certifications: number;
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
      key: "skills",
      label: "Skills",
      value: props.skills,
      text: "text-sec-skills",
      bar: "bg-sec-skills",
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
  ].filter((item) => item.value > 0);

  if (items.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 pb-10 pt-4">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {items.map((item, index) => (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="rounded-xl border border-line bg-card p-5"
          >
            <p
              className={
                "font-heading text-4xl font-bold md:text-5xl " + item.text
              }
            >
              <CountUp value={item.value} />
            </p>
            <p className="mt-2 font-code text-xs uppercase tracking-widest text-soft">
              {item.label}
            </p>
            <div className={"mt-4 h-0.5 w-10 rounded-full " + item.bar} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}