import { createClient } from "@/lib/supabase-server";
import { FolderKanban, Wrench, Briefcase, Award } from "lucide-react";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  const [
    { count: projectCount },
    { count: skillCount },
    { count: experienceCount },
    { count: certificationCount },
  ] = await Promise.all([
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("skills").select("*", { count: "exact", head: true }),
    supabase.from("experiences").select("*", { count: "exact", head: true }),
    supabase.from("certifications").select("*", { count: "exact", head: true }),
  ]);

  const stats = [
    { label: "Projects", count: projectCount ?? 0, icon: FolderKanban },
    { label: "Skills", count: skillCount ?? 0, icon: Wrench },
    { label: "Experience", count: experienceCount ?? 0, icon: Briefcase },
    { label: "Certifications", count: certificationCount ?? 0, icon: Award },
  ];

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
      <p className="text-neutral-500 mt-1 text-sm">
        Logged in as {user?.email}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white border border-neutral-200 rounded-xl p-5"
            >
              <Icon className="w-5 h-5 text-neutral-400" />
              <p className="text-2xl font-bold text-neutral-900 mt-3">
                {stat.count}
              </p>
              <p className="text-sm text-neutral-500">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}