import { createClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import ExperienceForm from "@/components/admin/ExperienceForm";

export default async function EditExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: experience } = await supabase
    .from("experience")
    .select("*")
    .eq("id", id)
    .single();

  if (!experience) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-neutral-900 mb-6">
        Edit Experience
      </h1>
      <ExperienceForm initialData={experience} />
    </main>
  );
}