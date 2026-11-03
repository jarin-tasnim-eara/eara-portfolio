import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase-server";
import ProjectCard from "@/components/sections/ProjectCard";

export const metadata = {
  title: "All Projects — Jarin Tasnim Eara",
};

export default async function AllProjectsPage() {
  const supabase = await createClient();

  const result = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  const projects = result.data ? result.data : [];

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <Link
        href="/#projects"
        className="mb-8 inline-flex items-center gap-2 text-sm text-soft transition hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </Link>

      <p className="font-code text-xs tracking-widest text-sec-projects mb-3">
        ALL PROJECTS
      </p>
      <h1 className="font-heading text-4xl font-bold text-ink">Projects</h1>
      <div className="mt-3 mb-10 h-1 w-10 rounded-full bg-sec-projects" />

      {projects.length === 0 ? (
        <p className="text-soft">No projects added yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </main>
  );
}