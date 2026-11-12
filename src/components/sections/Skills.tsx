"use client";

import { motion, MotionConfig } from "framer-motion";
import Link from "next/link";
import SkillLogo from "@/components/ui/SkillLogo";
import SectionHeading from "@/components/ui/SectionHeading";
import type { SkillItem } from "@/lib/skills";

export default function Skills(props: { skills: SkillItem[] }) {
  const skills = props.skills;

  if (skills.length === 0) return null;

  const flagged = skills.filter((skill) => skill.is_core === true);
  const coreSkills = flagged.length > 0 ? flagged : skills.slice(0, 9);

  return (
    <MotionConfig reducedMotion="user">
      <section id="skills" className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading title="Skills" barClass="bg-sec-skills" />

        <div className="mb-6 flex items-center gap-4">
          <p className="font-code text-xs uppercase tracking-widest text-soft">
            Core stack
          </p>
          <div className="h-px flex-1 bg-line" />
        </div>

        <div className="flex flex-wrap gap-5">
          {coreSkills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="group flex w-24 flex-col items-center gap-3"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-line bg-card transition duration-300 group-hover:-translate-y-1 group-hover:border-sec-skills group-hover:shadow-[0_0_24px_-6px_var(--cyan)]">
                <SkillLogo name={skill.name} icon={skill.icon} size="md" />
              </div>
              <span className="text-center text-xs text-soft">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/skills"
            className="inline-block rounded-full border border-sec-skills px-6 py-2.5 text-sm font-medium text-ink transition hover:bg-sec-skills hover:text-page"
          >
            View all skills →
          </Link>
        </div>
      </section>
    </MotionConfig>
  );
}