import { createClient } from "@/lib/supabase-server";
import SortableList from "@/components/admin/SortableList";

export default async function AdminEducationPage() {
  const supabase = await createClient();

  const result = await supabase
    .from("education")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("start_date", { ascending: false });

  const rows = result.data ? result.data : [];

  const items = rows.map((row) => ({
    id: row.id,
    title: row.degree,
    subtitle: row.institution,
  }));

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <SortableList
        heading="Education"
        table="education"
        basePath="/admin/education"
        newLabel="New Education"
        emptyText="No education added yet."
        items={items}
      />
    </main>
  );
}