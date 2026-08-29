import { createClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import CertificationForm from "@/components/admin/CertificationForm";

export default async function EditCertificationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: certification } = await supabase
    .from("certifications")
    .select("*")
    .eq("id", id)
    .single();

  if (!certification) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-neutral-900 mb-6">
        Edit Certification
      </h1>
      <CertificationForm initialData={certification} />
    </main>
  );
}