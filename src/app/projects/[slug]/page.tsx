import { createClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { normalizeUrl } from "@/lib/url";

export default async function ProjectDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await props.params;
  const slug = resolvedParams.slug;

  const supabase = await createClient();

  const result = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  const project = result.data;

  if (!project) {
    notFound();
  }

  const technologies: string[] = project.technologies
    ? project.technologies
    : [];
  const githubHref = normalizeUrl(project.github_url);
  const liveHref = normalizeUrl(project.live_url);

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <Link
        href="/#projects"
        className="mb-8 inline-flex items-center gap-2 text-sm text-soft transition hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to projects
      </Link>

      <p className="font-code text-xs tracking-widest text-sec-projects mb-3">
        PROJECT
      </p>
      <h1 className="font-heading text-4xl font-bold leading-tight text-ink md:text-5xl">
        {project.title}
      </h1>
      <div className="mt-4 h-1 w-10 rounded-full bg-sec-projects" />

      {project.short_description && (
        <p className="mt-6 max-w-[60ch] text-lg leading-8 text-soft">
          {project.short_description}
        </p>
      )}

      {(githubHref || liveHref) && (
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {githubHref && (
            <Link
              href={githubHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md border border-line bg-card px-4 py-2 text-sm font-medium text-ink transition hover:border-sec-projects"
            >
              <FaGithub className="h-4 w-4" />
              GitHub
            </Link>
          )}
          {liveHref && (
            <Link
              href={liveHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-500"
            >
              <ExternalLink className="h-4 w-4" />
              Live demo
            </Link>
          )}
        </div>
      )}

      {technologies.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-line px-3 py-1 text-xs text-soft"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {project.image_url && (
        <div className="relative mt-10 h-64 w-full overflow-hidden rounded-2xl border border-line bg-card sm:h-96">
          <Image
            src={project.image_url}
            alt={project.title}
            fill
            sizes="(min-width: 896px) 896px, 100vw"
            className="object-cover"
            priority
          />
        </div>
      )}

      {project.description && (
        <div className="mt-10 rounded-2xl border border-line bg-card p-6 sm:p-8">
          <p className="font-code text-xs uppercase tracking-widest text-sec-projects mb-4">
            About this project
          </p>
          <p className="whitespace-pre-line text-[16px] leading-8 text-soft">
            {project.description}
          </p>
        </div>
      )}
    </main>
  );
}