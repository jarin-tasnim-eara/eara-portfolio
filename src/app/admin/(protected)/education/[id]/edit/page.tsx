import { createClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import EducationForm from "@/components/admin/EducationForm";

export default async function EditEducationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: education } = await supabase
    .from("education")
    .select("*")
    .eq("id", id)
    .single();

  if (!education) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-neutral-900 mb-6">
        Edit Education
      </h1>
      <EducationForm initialData={education} />
    </main>
  );
}