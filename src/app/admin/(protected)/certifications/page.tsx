import { createClient } from "@/lib/supabase-server";
import SortableList from "@/components/admin/SortableList";

export default async function AdminCertificationsPage() {
  const supabase = await createClient();

  const result = await supabase
    .from("certifications")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("issue_date", { ascending: false });

  const rows = result.data ? result.data : [];

  const items = rows.map((row) => ({
    id: row.id,
    title: row.title,
    subtitle:
      (row.issuer ? row.issuer : "") + (row.type ? " · " + row.type : ""),
  }));

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <SortableList
        heading="Certifications"
        table="certifications"
        basePath="/admin/certifications"
        newLabel="New Certification"
        emptyText="No certifications added yet."
        items={items}
      />
    </main>
  );
}