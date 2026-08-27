import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import { Plus, Pencil, Star } from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminProjectsPage() {
  const supabase = await createClient();

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 bg-neutral-900 text-white px-4 py-2 rounded-md text-sm hover:bg-neutral-700 transition"
        >
          <Plus className="w-4 h-4" />
          New Project
        </Link>
      </div>

      {!projects || projects.length === 0 ? (
        <p className="text-neutral-400 text-sm">No projects added yet.</p>
      ) : (
        <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`flex items-center justify-between px-5 py-4 ${
                index !== projects.length - 1 ? "border-b border-neutral-200" : ""
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                {project.featured && (
                  <Star className="w-4 h-4 text-yellow-500 shrink-0 fill-yellow-500" />
                )}
                <div className="min-w-0">
                  <p className="font-medium text-neutral-900 truncate">
                    {project.title}
                  </p>
                  <p className="text-xs text-neutral-400 truncate">
                    {project.short_description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/admin/projects/${project.id}/edit`}
                  className="p-2 rounded-md text-neutral-500 hover:bg-neutral-100 transition"
                >
                  <Pencil className="w-4 h-4" />
                </Link>
                <DeleteButton table="projects" id={project.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}