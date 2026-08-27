import { createClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import SkillForm from "@/components/admin/SkillForm";

export default async function EditSkillPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: skill } = await supabase
    .from("skills")
    .select("*")
    .eq("id", id)
    .single();

  if (!skill) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-neutral-900 mb-6">Edit Skill</h1>
      <SkillForm initialData={skill} />
    </main>
  );
}