import { createClient } from "@/lib/supabase-server";
import SortableList from "@/components/admin/SortableList";

export default async function AdminProjectsPage() {
  const supabase = await createClient();

  const result = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  const rows = result.data ? result.data : [];

  const items = rows.map((row) => ({
    id: row.id,
    title: row.title,
    subtitle: row.short_description ? row.short_description : "",
    starred: row.featured === true,
  }));

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <SortableList
        heading="Projects"
        table="projects"
        basePath="/admin/projects"
        newLabel="New Project"
        emptyText="No projects added yet."
        items={items}
      />
    </main>
  );
}