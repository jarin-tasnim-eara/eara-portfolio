"use client";

import { motion, MotionConfig } from "framer-motion";
import type { Variants } from "framer-motion";
import SkillLogo from "@/components/ui/SkillLogo";
import { getCategoryIcon } from "@/lib/category-icon";

type SkillItem = {
  id: string;
  name: string;
  category: string | null;
  icon: string | null;
  is_core: boolean | null;
};

type SkillGroup = {
  name: string;
  items: SkillItem[];
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, staggerChildren: 0.06, delayChildren: 0.15 },
  },
};

const chipVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

export default function Skills(props: { skills: SkillItem[] }) {
  const skills = props.skills;

  if (skills.length === 0) return null;

  const coreSkills = skills.filter((skill) => skill.is_core === true);

  const groups: SkillGroup[] = [];
  skills.forEach((skill) => {
    const groupName =
      skill.category && skill.category.length > 0 ? skill.category : "Other";
    const existing = groups.find((group) => group.name === groupName);
    if (existing) {
      existing.items.push(skill);
    } else {
      groups.push({ name: groupName, items: [skill] });
    }
  });

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

        {coreSkills.length > 0 && (
          <div className="mb-14">
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
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => {
            const CategoryIcon = getCategoryIcon(group.name);

            return (
              <motion.div
                key={group.name}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                className="rounded-2xl border border-line bg-card p-6"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-sec-skills">
                      <CategoryIcon className="h-5 w-5" />
                    </span>
                    <h3 className="font-heading text-lg font-bold text-ink">
                      {group.name}
                    </h3>
                  </div>
                  <span className="font-code text-xs text-soft">
                    {group.items.length}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <motion.span
                      key={skill.id}
                      variants={chipVariants}
                      className="flex items-center gap-2 rounded-full border border-line py-1.5 pl-1.5 pr-3 text-sm text-ink"
                    >
                      <SkillLogo
                        name={skill.name}
                        icon={skill.icon}
                        size="sm"
                      />
                      {skill.name}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </MotionConfig>
  );
}