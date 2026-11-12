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

type EducationItem = {
  id: string;
  degree: string;
  institution: string;
  location: string | null;
  start_date: string | null;
  end_date: string | null;
  major: string | null;
  minor: string | null;
  result: string | null;
  description: string | null;
};

function formatMonth(dateStr: string | null): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function formatYear(dateStr: string | null): string {
  if (!dateStr) return "";
  return new Date(dateStr).getFullYear().toString();
}

function yearPeriod(start: string | null, end: string | null): string {
  const startYear = formatYear(start);
  const endYear = formatYear(end);

  if (startYear && endYear) return startYear + " — " + endYear;
  if (startYear) return startYear + " — Present";
  return endYear;
}

export default function ExperienceEducation(props: {
  experiences: ExperienceItem[];
  education: EducationItem[];
}) {
  const { experiences, education } = props;

  if (experiences.length === 0 && education.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-12">
        {experiences.length > 0 && (
          <div id="experience">
            <SectionHeading title="Experience" barClass="bg-sec-experience" />

            <div className="space-y-8 border-l border-line pl-7">
              {experiences.map((exp, index) => {
                const technologies = exp.technologies ? exp.technologies : [];
                const startLabel = formatMonth(exp.start_date);
                const endLabel = exp.currently_working
                  ? "Present"
                  : formatMonth(exp.end_date);
                const period = endLabel
                  ? startLabel + " — " + endLabel
                  : startLabel;

                return (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="relative"
                  >
                    <span className="absolute -left-[35px] top-6 flex h-4 w-4 items-center justify-center rounded-full border border-sec-experience bg-page">
                      <span className="h-1.5 w-1.5 rounded-full bg-sec-experience" />
                    </span>

                    <div className="rounded-xl border border-line bg-card p-5 transition hover:border-sec-experience">
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
                        <p className="mt-3 whitespace-pre-line text-[15px] leading-7 text-soft">
                          {exp.description}
                        </p>
                      )}

                      {technologies.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
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
          </div>
        )}

        {education.length > 0 && (
          <div id="education">
            <SectionHeading title="Education" barClass="bg-sec-education" />

            <div className="space-y-4">
              {education.map((edu, index) => {
                const hasChips = edu.major || edu.minor || edu.result;

                return (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="rounded-xl border border-line bg-card p-5 transition hover:border-sec-education"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-heading text-lg font-bold text-ink">
                        {edu.degree}
                      </h3>
                      <span className="font-code text-xs text-sec-education">
                        {yearPeriod(edu.start_date, edu.end_date)}
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-soft">
                      {edu.institution}
                      {edu.location ? " · " + edu.location : ""}
                    </p>

                    {hasChips && (
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        {edu.major && (
                          <span className="rounded-full border border-line px-3 py-0.5 text-xs text-ink">
                            <span className="text-sec-education">Major</span>
                            {" · " + edu.major}
                          </span>
                        )}
                        {edu.minor && (
                          <span className="rounded-full border border-line px-3 py-0.5 text-xs text-ink">
                            <span className="text-sec-education">Minor</span>
                            {" · " + edu.minor}
                          </span>
                        )}
                        {edu.result && (
                          <span className="rounded-full border border-sec-education px-3 py-0.5 text-xs text-sec-education">
                            {edu.result}
                          </span>
                        )}
                      </div>
                    )}

                    {edu.description && (
                      <p className="mt-3 text-[15px] leading-7 text-soft">
                        {edu.description}
                      </p>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}