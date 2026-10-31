"use client";

import { motion } from "framer-motion";

type EducationItem = {
  id: string;
  degree: string;
  institution: string;
  location: string | null;
  start_date: string | null;
  end_date: string | null;
  result: string | null;
  description: string | null;
};

function formatYear(dateStr: string | null): string {
  if (!dateStr) return "";
  return new Date(dateStr).getFullYear().toString();
}

export default function Education({
  education,
}: {
  education: EducationItem[];
}) {
  if (education.length === 0) return null;

  return (
    <section id="education" className="max-w-3xl mx-auto px-6 py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold text-neutral-900 dark:text-white mb-10"
      >
        Education
      </motion.h2>

      <div className="space-y-6">
        {education.map((edu, index) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6 border-b border-neutral-100 dark:border-neutral-900 pb-6 last:border-0"
          >
            <span className="text-sm text-neutral-400 shrink-0 sm:w-28">
              {formatYear(edu.start_date)}
              {edu.end_date ? ` — ${formatYear(edu.end_date)}` : ""}
            </span>

            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-white">
                {edu.degree}
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                {edu.institution}
                {edu.location && ` · ${edu.location}`}
              </p>
              {edu.result && (
                <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">
                  {edu.result}
                </p>
              )}
              {edu.description && (
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed">
                  {edu.description}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}