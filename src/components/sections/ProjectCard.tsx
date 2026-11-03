import Link from "next/link";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { ExternalLink, Star } from "lucide-react";
import { normalizeUrl } from "@/lib/url";

export type ProjectItem = {
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

export default function ProjectCard(props: { project: ProjectItem }) {
  const project = props.project;
  const detailHref = "/projects/" + project.slug;
  const githubHref = normalizeUrl(project.github_url);
  const liveHref = normalizeUrl(project.live_url);
  const technologies = project.technologies ? project.technologies : [];

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-card transition hover:-translate-y-1 hover:border-sec-projects">
      {project.image_url && (
        <div className="relative h-44 w-full bg-page">
          <Image
            src={project.image_url}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="font-heading text-lg font-bold text-ink">
            {project.title}
          </h3>
          {project.featured && (
            <Star className="mt-1 h-4 w-4 shrink-0 fill-yellow-500 text-yellow-500" />
          )}
        </div>

        {project.short_description && (
          <p className="mb-4 text-sm leading-6 text-soft">
            {project.short_description}
          </p>
        )}

        {technologies.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-line px-2.5 py-0.5 text-xs text-soft"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between pt-3">
          <Link
            href={detailHref}
            className="text-sm font-medium text-sec-projects hover:underline"
          >
            View details →
          </Link>

          <div className="flex items-center gap-3 text-soft">
            {githubHref && (
              <Link
                href={githubHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="transition hover:text-ink"
              >
                <FaGithub className="h-4 w-4" />
              </Link>
            )}
            {liveHref && (
              <Link
                href={liveHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Live demo"
                className="transition hover:text-ink"
              >
                <ExternalLink className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}