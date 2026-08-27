"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import { Trash2, Loader2 } from "lucide-react";

export default function DeleteButton({
  table,
  id,
}: {
  table: string;
  id: string;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    const confirmed = confirm("Are you sure you want to delete this item?");
    if (!confirmed) return;

    setLoading(true);
    const supabase = createClient();

    const { error } = await supabase.from(table).delete().eq("id", id);

    if (error) {
      alert("Failed to delete: " + error.message);
      setLoading(false);
      return;
    }

    router.refresh(); // list re-fetch করার জন্য
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-2 rounded-md text-red-400 hover:bg-red-50 transition disabled:opacity-50"
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Trash2 className="w-4 h-4" />
      )}
    </button>
  );
}