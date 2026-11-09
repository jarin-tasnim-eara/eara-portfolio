import { createClient } from "@/lib/supabase-server";
import SortableList from "@/components/admin/SortableList";

export default async function AdminResearchPage() {
  const supabase = await createClient();

  const result = await supabase
    .from("research")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("publication_date", { ascending: false });

  const rows = result.data ? result.data : [];

  const items = rows.map((row) => ({
    id: row.id,
    title: row.title,
    subtitle: row.conference
      ? row.conference
      : row.publication_type
        ? row.publication_type
        : "",
    starred: row.featured === true,
  }));

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <SortableList
        heading="Research"
        table="research"
        basePath="/admin/research"
        newLabel="New Research"
        emptyText="No research added yet."
        items={items}
      />
    </main>
  );
}