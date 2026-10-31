import { createClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowLeft } from "lucide-react";

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

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Projects
      </Link>

      {project.image_url && (
        <div className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 mb-8">
          <Image
            src={project.image_url}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-3">
        {project.title}
      </h1>

      {project.short_description && (
        <p className="text-lg text-neutral-500 dark:text-neutral-400 mb-6">
          {project.short_description}
        </p>
      )}

      <div className="flex items-center gap-4 mb-8">
        {project.github_url && (
          <Link
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md text-sm hover:bg-neutral-50 dark:hover:bg-neutral-900 transition"
          >
            GitHub
          </Link>
        )}
        {project.live_url && (
          <Link
            href={project.live_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-md text-sm hover:opacity-90 transition"
          >
            <ExternalLink className="w-4 h-4" />
            Live Demo
          </Link>
        )}
      </div>

      {project.technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {project.technologies.map((tech: string) => (
            <span
              key={tech}
              className="text-xs px-3 py-1 bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {project.description && (
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-line">
            {project.description}
          </p>
        </div>
      )}
    </main>
  );
}