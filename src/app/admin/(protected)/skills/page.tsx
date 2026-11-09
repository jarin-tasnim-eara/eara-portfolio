import { createClient } from "@/lib/supabase-server";
import SortableList from "@/components/admin/SortableList";

export default async function AdminSkillsPage() {
  const supabase = await createClient();

  const result = await supabase
    .from("skills")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  const rows = result.data ? result.data : [];

  const items = rows.map((row) => ({
    id: row.id,
    title: row.name,
    subtitle:
      (row.category ? row.category : "") + (row.is_core ? " · Core" : ""),
    starred: row.is_core === true,
  }));

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <SortableList
        heading="Skills"
        table="skills"
        basePath="/admin/skills"
        newLabel="New Skill"
        emptyText="No skills added yet."
        items={items}
      />
    </main>
  );
}