"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import { Loader2 } from "lucide-react";

type EducationFormData = {
  id?: string;
  degree: string;
  institution: string;
  location: string;
  start_date: string;
  end_date: string;
  result: string;
  description: string;
  sort_order: number;
};

export default function EducationForm({
  initialData,
}: {
  initialData?: EducationFormData;
}) {
  const router = useRouter();
  const isEditMode = Boolean(initialData?.id);

  const [form, setForm] = useState<EducationFormData>({
    degree: initialData?.degree ?? "",
    institution: initialData?.institution ?? "",
    location: initialData?.location ?? "",
    start_date: initialData?.start_date ?? "",
    end_date: initialData?.end_date ?? "",
    result: initialData?.result ?? "",
    description: initialData?.description ?? "",
    sort_order: initialData?.sort_order ?? 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateField<K extends keyof EducationFormData>(
    key: K,
    value: EducationFormData[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();

    const payload = {
      ...form,
      start_date: form.start_date || null,
      end_date: form.end_date || null,
    };

    if (isEditMode && initialData?.id) {
      const { error: updateError } = await supabase
        .from("education")
        .update(payload)
        .eq("id", initialData.id);

      if (updateError) {
        setError(updateError.message);
        setLoading(false);
        return;
      }
    } else {
      const { error: insertError } = await supabase
        .from("education")
        .insert(payload);

      if (insertError) {
        setError(insertError.message);
        setLoading(false);
        return;
      }
    }

    router.push("/admin/education");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Degree" required>
          <input
            value={form.degree}
            onChange={(e) => updateField("degree", e.target.value)}
            required
            placeholder="e.g. BSc in CSE"
            className="input"
          />
        </Field>
        <Field label="Institution" required>
          <input
            value={form.institution}
            onChange={(e) => updateField("institution", e.target.value)}
            required
            className="input"
          />
        </Field>
      </div>

      <Field label="Location">
        <input
          value={form.location}
          onChange={(e) => updateField("location", e.target.value)}
          className="input"
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Start Date">
          <input
            type="date"
            value={form.start_date}
            onChange={(e) => updateField("start_date", e.target.value)}
            className="input"
          />
        </Field>
        <Field label="End Date">
          <input
            type="date"
            value={form.end_date}
            onChange={(e) => updateField("end_date", e.target.value)}
            className="input"
          />
        </Field>
      </div>

      <Field label="Result">
        <input
          value={form.result}
          onChange={(e) => updateField("result", e.target.value)}
          placeholder="e.g. CGPA 3.80"
          className="input"
        />
      </Field>

      <Field label="Description">
        <textarea
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
          rows={3}
          className="input"
        />
      </Field>

      <Field label="Sort Order">
        <input
          type="number"
          value={form.sort_order}
          onChange={(e) => updateField("sort_order", Number(e.target.value))}
          className="input"
        />
      </Field>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="flex items-center gap-2 bg-neutral-900 text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-neutral-700 disabled:opacity-50 transition"
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {isEditMode ? "Update Education" : "Create Education"}
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