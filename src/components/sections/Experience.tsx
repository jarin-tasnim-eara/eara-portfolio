"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

type ExperienceItem = {
  id: string;
  position: string;
  organization: string;
  location: string | null;
  start_date: string | null;
  end_date: string | null;
  currently_working: boolean | null;
  description: string | null;
  technologies: string[] | null;
};

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function Experience(props: { experiences: ExperienceItem[] }) {
  const experiences = props.experiences;

  if (experiences.length === 0) return null;

  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading title="Experience" barClass="bg-sec-experience" />

      <div className="max-w-4xl space-y-10 border-l border-line pl-8">
        {experiences.map((exp, index) => {
          const technologies = exp.technologies ? exp.technologies : [];
          const startLabel = formatDate(exp.start_date);
          const endLabel = exp.currently_working
            ? "Present"
            : formatDate(exp.end_date);
          const period = endLabel ? startLabel + " — " + endLabel : startLabel;

          return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="relative"
            >
              <span className="absolute -left-[41px] top-7 flex h-4 w-4 items-center justify-center rounded-full border border-sec-experience bg-page">
                <span className="h-1.5 w-1.5 rounded-full bg-sec-experience" />
              </span>

              <div className="rounded-xl border border-line bg-card p-6 transition hover:border-sec-experience">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-heading text-lg font-bold text-ink">
                    {exp.position}
                  </h3>
                  <span className="font-code text-xs text-sec-experience">
                    {period}
                  </span>
                </div>

                <p className="mt-1 text-sm text-soft">
                  {exp.organization}
                  {exp.location ? " · " + exp.location : ""}
                </p>

                {exp.description && (
                  <p className="mt-4 whitespace-pre-line text-[15px] leading-7 text-soft">
                    {exp.description}
                  </p>
                )}

                {technologies.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-line px-2.5 py-0.5 text-xs text-soft"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}