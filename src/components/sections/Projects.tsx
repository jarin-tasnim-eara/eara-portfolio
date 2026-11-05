"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ProjectCard from "@/components/sections/ProjectCard";
import type { ProjectItem } from "@/components/sections/ProjectCard";
import ShowMoreGrid from "@/components/ui/ShowMoreGrid";

export default function Projects(props: { projects: ProjectItem[] }) {
  const projects = props.projects;

  if (projects.length === 0) return null;

  const items = projects.map((project) => (
    <ProjectCard key={project.id} project={project} />
  ));

  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <p className="font-code text-xs tracking-widest text-sec-projects mb-3">
          PROJECTS
        </p>
        <h2 className="font-heading text-3xl font-bold text-ink">Projects</h2>
        <div className="mt-3 h-1 w-10 rounded-full bg-sec-projects" />
      </motion.div>

      <ShowMoreGrid
        items={items}
        gridClassName="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        buttonClassName="rounded-full border border-sec-projects bg-card px-6 py-2.5 text-sm font-medium text-ink transition hover:bg-sec-projects hover:text-white"
      />

      {projects.length > 3 && (
        <div className="mt-6 text-center">
          <Link
            href="/projects"
            className="text-sm text-soft transition hover:text-ink"
          >
            View all projects →
          </Link>
        </div>
      )}
    </section>
  );
}