"use client";

import { motion } from "framer-motion";
import { getIconComponent } from "@/lib/icon-map";

type Skill = {
  id: string;
  name: string;
  category: string;
  icon: string | null;
};

export default function Skills({ skills }: { skills: Skill[] }) {
  if (skills.length === 0) return null;

  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    const key = skill.category || "Other";
    if (!acc[key]) acc[key] = [];
    acc[key].push(skill);
    return acc;
  }, {});

  const categories = Object.keys(grouped);

  return (
    <section id="skills" className="max-w-3xl mx-auto px-6 py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold text-neutral-900 dark:text-white mb-10"
      >
        Skills
      </motion.h2>

      <div className="space-y-8">
        {categories.map((category, categoryIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
          >
            <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-3">
              {category}
            </p>
            <div className="flex flex-wrap gap-3">
              {grouped[category].map((skill) => {
                const Icon = getIconComponent(skill.icon);
                return (
                  <div
                    key={skill.id}
                    className="flex items-center gap-2 border border-neutral-200 dark:border-neutral-800 rounded-md px-3 py-2"
                  >
                    <Icon className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                    <span className="text-sm text-neutral-700 dark:text-neutral-300">
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}