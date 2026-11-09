import { createClient } from "@/lib/supabase-server";
import SortableList from "@/components/admin/SortableList";

export default async function AdminExperiencePage() {
  const supabase = await createClient();

  const result = await supabase
    .from("experience")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("start_date", { ascending: false });

  const rows = result.data ? result.data : [];

  const items = rows.map((row) => ({
    id: row.id,
    title: row.position,
    subtitle:
      row.organization + (row.currently_working ? " · Present" : ""),
  }));

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <SortableList
        heading="Experience"
        table="experience"
        basePath="/admin/experience"
        newLabel="New Experience"
        emptyText="No experience added yet."
        items={items}
      />
    </main>
  );
}