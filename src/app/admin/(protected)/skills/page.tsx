import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import { Plus, Pencil } from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminSkillsPage() {
  const supabase = await createClient();

  const { data: skills } = await supabase
    .from("skills")
    .select("*")
    .order("category", { ascending: true })
    .order("sort_order", { ascending: true });

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Skills</h1>
        <Link
          href="/admin/skills/new"
          className="flex items-center gap-2 bg-neutral-900 text-white px-4 py-2 rounded-md text-sm hover:bg-neutral-700 transition"
        >
          <Plus className="w-4 h-4" />
          New Skill
        </Link>
      </div>

      {!skills || skills.length === 0 ? (
        <p className="text-neutral-400 text-sm">No skills added yet.</p>
      ) : (
        <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
          {skills.map((skill, index) => (
            <div
              key={skill.id}
              className={`flex items-center justify-between px-5 py-4 ${
                index !== skills.length - 1 ? "border-b border-neutral-200" : ""
              }`}
            >
              <div className="min-w-0">
                <p className="font-medium text-neutral-900">{skill.name}</p>
                <p className="text-xs text-neutral-400">{skill.category}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/admin/skills/${skill.id}/edit`}
                  className="p-2 rounded-md text-neutral-500 hover:bg-neutral-100 transition"
                >
                  <Pencil className="w-4 h-4" />
                </Link>
                <DeleteButton table="skills" id={skill.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}