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

function periodFor(start: string | null, end: string | null): string {
  const startYear = formatYear(start);
  const endYear = formatYear(end);

  if (startYear && endYear) return startYear + " — " + endYear;
  if (startYear) return startYear + " — Present";
  return endYear;
}

export default function Education(props: { education: EducationItem[] }) {
  const education = props.education;

  if (education.length === 0) return null;

  return (
    <section id="education" className="max-w-4xl mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <p className="font-code text-xs tracking-widest text-sec-education mb-3">
          EDUCATION
        </p>
        <h2 className="font-heading text-3xl font-bold text-ink">Education</h2>
        <div className="mt-3 h-1 w-10 rounded-full bg-sec-education" />
      </motion.div>

      <div className="space-y-5">
        {education.map((edu, index) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="grid gap-3 rounded-xl border border-line bg-card p-6 transition hover:border-sec-education sm:grid-cols-[9rem_1fr]"
          >
            <p className="font-code text-sm text-sec-education">
              {periodFor(edu.start_date, edu.end_date)}
            </p>

            <div>
              <h3 className="font-heading text-lg font-bold text-ink">
                {edu.degree}
              </h3>
              <p className="mt-1 text-sm text-soft">
                {edu.institution}
                {edu.location ? " · " + edu.location : ""}
              </p>

              {edu.result && (
                <span className="mt-3 inline-block rounded-full border border-sec-education px-3 py-0.5 text-xs text-sec-education">
                  {edu.result}
                </span>
              )}

              {edu.description && (
                <p className="mt-3 text-[15px] leading-7 text-soft">
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