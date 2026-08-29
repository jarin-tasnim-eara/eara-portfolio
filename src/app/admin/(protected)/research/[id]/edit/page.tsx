import { createClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import ResearchForm from "@/components/admin/ResearchForm";

export default async function EditResearchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: research } = await supabase
    .from("research")
    .select("*")
    .eq("id", id)
    .single();

  if (!research) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-neutral-900 mb-6">
        Edit Research
      </h1>
      <ResearchForm initialData={research} />
    </main>
  );
}