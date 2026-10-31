"use client";

import { motion } from "framer-motion";

type ExperienceItem = {
  id: string;
  position: string;
  organization: string;
  location: string | null;
  start_date: string | null;
  end_date: string | null;
  currently_working: boolean;
  description: string | null;
  technologies: string[];
};

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function Experience({
  experiences,
}: {
  experiences: ExperienceItem[];
}) {
  if (experiences.length === 0) return null;

  return (
    <section id="experience" className="max-w-3xl mx-auto px-6 py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold text-neutral-900 dark:text-white mb-10"
      >
        Experience
      </motion.h2>

      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-8 border-l-2 border-neutral-200 dark:border-neutral-800"
          >
            <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-neutral-900 dark:bg-white" />

            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
              <h3 className="font-semibold text-neutral-900 dark:text-white">
                {exp.position}
              </h3>
              <span className="text-xs text-neutral-400">
                {formatDate(exp.start_date)} —{" "}
                {exp.currently_working ? "Present" : formatDate(exp.end_date)}
              </span>
            </div>

            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">
              {exp.organization}
              {exp.location && ` · ${exp.location}`}
            </p>

            {exp.description && (
              <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-3 whitespace-pre-line">
                {exp.description}
              </p>
            )}

            {exp.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-0.5 bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}