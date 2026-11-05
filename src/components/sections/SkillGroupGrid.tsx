"use client";

import { motion, MotionConfig } from "framer-motion";
import type { Variants } from "framer-motion";
import SkillLogo from "@/components/ui/SkillLogo";
import { getCategoryIcon } from "@/lib/category-icon";
import type { SkillGroup } from "@/lib/skills";

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

export default function SkillGroupGrid(props: { groups: SkillGroup[] }) {
  const groups = props.groups;

  return (
    <MotionConfig reducedMotion="user">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => {
          const CategoryIcon = getCategoryIcon(group.name);

          return (
            <motion.div
              key={group.slug}
              id={group.slug}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="scroll-mt-24 rounded-2xl border border-line bg-card p-6 transition target:border-sec-skills"
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
                    <SkillLogo name={skill.name} icon={skill.icon} size="sm" />
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </MotionConfig>
  );
}