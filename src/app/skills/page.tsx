import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase-server";
import { groupSkills } from "@/lib/skills";
import SkillGroupGrid from "@/components/sections/SkillGroupGrid";

export const metadata = {
  title: "All Skills — Jarin Tasnim Eara",
};

export default async function AllSkillsPage() {
  const supabase = await createClient();

  const result = await supabase
    .from("skills")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  const skills = result.data ? result.data : [];
  const groups = groupSkills(skills);

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <Link
        href="/#skills"
        className="mb-8 inline-flex items-center gap-2 text-sm text-soft transition hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </Link>

      <p className="font-code text-xs tracking-widest text-sec-skills mb-3">
        ALL SKILLS
      </p>
      <h1 className="font-heading text-4xl font-bold text-ink">
        Skills &amp; Tools
      </h1>
      <div className="mt-3 mb-10 h-1 w-10 rounded-full bg-sec-skills" />

      {groups.length === 0 ? (
        <p className="text-soft">No skills added yet.</p>
      ) : (
        <SkillGroupGrid groups={groups} />
      )}
    </main>
  );
}