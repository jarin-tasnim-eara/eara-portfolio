"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Star } from "lucide-react";

type Project = {
  id: string;
  title: string;
  slug: string;
  short_description: string | null;
  image_url: string | null;
  github_url: string | null;
  live_url: string | null;
  featured: boolean;
  technologies: string[];
};

export default function Projects(props: { projects: Project[] }) {
  const projects = props.projects;

  if (projects.length === 0) return null;

  return (
    <section id="projects" className="max-w-4xl mx-auto px-6 py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold text-neutral-900 dark:text-white mb-10"
      >
        Projects
      </motion.h2>

      <div className="grid sm:grid-cols-2 gap-6">
        {projects.map((project, index) => {
          const detailHref = "/projects/" + project.slug;
          const delayValue = (index % 2) * 0.1;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: delayValue }}
            >
              <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden hover:shadow-md dark:hover:shadow-none dark:hover:border-neutral-700 transition h-full flex flex-col">

                {project.image_url && (
                  <div className="relative w-full h-44 bg-neutral-100 dark:bg-neutral-900">
                    <Image
                      src={project.image_url}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-neutral-900 dark:text-white">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 shrink-0 mt-0.5" />
                    )}
                  </div>

                  {project.short_description && (
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                      {project.short_description}
                    </p>
                  )}

                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-0.5 bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-auto flex items-center justify-between pt-3">
                    <Link
                      href={detailHref}
                      className="text-sm font-medium text-neutral-900 dark:text-white hover:underline"
                    >
                      View Details
                    </Link>

                    <div className="flex items-center gap-3">
                      {project.github_url && (
                        <Link
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-medium text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition"
                        >
                          GitHub
                        </Link>
                      )}
                      {project.live_url && (
                        <Link
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}