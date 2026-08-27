"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import { Loader2 } from "lucide-react";

type SkillFormData = {
  id?: string;
  name: string;
  category: string;
  icon: string;
  proficiency: number;
  sort_order: number;
};

export default function SkillForm({
  initialData,
}: {
  initialData?: SkillFormData;
}) {
  const router = useRouter();
  const isEditMode = Boolean(initialData?.id);

  const [form, setForm] = useState<SkillFormData>({
    name: initialData?.name ?? "",
    category: initialData?.category ?? "",
    icon: initialData?.icon ?? "",
    proficiency: initialData?.proficiency ?? 0,
    sort_order: initialData?.sort_order ?? 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateField<K extends keyof SkillFormData>(
    key: K,
    value: SkillFormData[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();

    if (isEditMode && initialData?.id) {
      const { error: updateError } = await supabase
        .from("skills")
        .update(form)
        .eq("id", initialData.id);

      if (updateError) {
        setError(updateError.message);
        setLoading(false);
        return;
      }
    } else {
      const { error: insertError } = await supabase
        .from("skills")
        .insert(form);

      if (insertError) {
        setError(insertError.message);
        setLoading(false);
        return;
      }
    }

    router.push("/admin/skills");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Name" required>
          <input
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            required
            className="input"
          />
        </Field>
        <Field label="Category" required>
          <input
            value={form.category}
            onChange={(e) => updateField("category", e.target.value)}
            required
            placeholder="e.g. Frontend"
            className="input"
          />
        </Field>
      </div>

      <Field label="Icon (Lucide icon name)">
        <input
          value={form.icon}
          onChange={(e) => updateField("icon", e.target.value)}
          placeholder="e.g. Code2"
          className="input"
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Proficiency (0-100)">
          <input
            type="number"
            min={0}
            max={100}
            value={form.proficiency}
            onChange={(e) =>
              updateField("proficiency", Number(e.target.value))
            }
            className="input"
          />
        </Field>
        <Field label="Sort Order">
          <input
            type="number"
            value={form.sort_order}
            onChange={(e) =>
              updateField("sort_order", Number(e.target.value))
            }
            className="input"
          />
        </Field>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="flex items-center gap-2 bg-neutral-900 text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-neutral-700 disabled:opacity-50 transition"
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {isEditMode ? "Update Skill" : "Create Skill"}
      </button>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-neutral-700 mb-1">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
    </div>
  );
}