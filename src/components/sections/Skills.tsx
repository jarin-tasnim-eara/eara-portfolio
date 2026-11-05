"use client";

import { motion, MotionConfig } from "framer-motion";
import Link from "next/link";
import SkillLogo from "@/components/ui/SkillLogo";
import { groupSkills } from "@/lib/skills";
import type { SkillItem } from "@/lib/skills";

export default function Skills(props: { skills: SkillItem[] }) {
  const skills = props.skills;

  if (skills.length === 0) return null;

  const flagged = skills.filter((skill) => skill.is_core === true);
  const coreSkills = flagged.length > 0 ? flagged : skills.slice(0, 9);
  const groups = groupSkills(skills);

  return (
    <MotionConfig reducedMotion="user">
      <section id="skills" className="max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="font-code text-xs tracking-widest text-sec-skills mb-3">
            SKILLS
          </p>
          <h2 className="font-heading text-3xl font-bold text-ink">
            Skills &amp; Tools
          </h2>
          <div className="mt-3 h-1 w-10 rounded-full bg-sec-skills" />
        </motion.div>

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

        <div className="mb-6 mt-14 flex items-center gap-4">
          <p className="font-code text-xs uppercase tracking-widest text-soft">
            Browse by category
          </p>
          <div className="h-px flex-1 bg-line" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-3"
        >
          {groups.map((group) => (
            <Link
              key={group.slug}
              href={"/skills#" + group.slug}
              className="rounded-full border border-line bg-card px-4 py-2 text-sm text-ink transition hover:-translate-y-0.5 hover:border-sec-skills"
            >
              {group.name}
              <span className="ml-2 font-code text-xs text-soft">
                {group.items.length}
              </span>
            </Link>
          ))}

          <Link
            href="/skills"
            className="px-3 py-2 text-sm font-medium text-sec-skills hover:underline"
          >
            View all skills →
          </Link>
        </motion.div>
      </section>
    </MotionConfig>
  );
}