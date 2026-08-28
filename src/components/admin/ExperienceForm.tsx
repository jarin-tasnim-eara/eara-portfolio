"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import { X, Loader2 } from "lucide-react";

type ExperienceFormData = {
  id?: string;
  position: string;
  organization: string;
  location: string;
  start_date: string;
  end_date: string;
  currently_working: boolean;
  description: string;
  technologies: string[];
  sort_order: number;
};

export default function ExperienceForm({
  initialData,
}: {
  initialData?: ExperienceFormData;
}) {
  const router = useRouter();
  const isEditMode = Boolean(initialData?.id);

  const [form, setForm] = useState<ExperienceFormData>({
    position: initialData?.position ?? "",
    organization: initialData?.organization ?? "",
    location: initialData?.location ?? "",
    start_date: initialData?.start_date ?? "",
    end_date: initialData?.end_date ?? "",
    currently_working: initialData?.currently_working ?? false,
    description: initialData?.description ?? "",
    technologies: initialData?.technologies ?? [],
    sort_order: initialData?.sort_order ?? 0,
  });

  const [techInput, setTechInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateField<K extends keyof ExperienceFormData>(
    key: K,
    value: ExperienceFormData[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function addTechnology() {
    const trimmed = techInput.trim();
    if (trimmed && !form.technologies.includes(trimmed)) {
      updateField("technologies", [...form.technologies, trimmed]);
    }
    setTechInput("");
  }

  function removeTechnology(tech: string) {
    updateField(
      "technologies",
      form.technologies.filter((t) => t !== tech)
    );
  }

  function handleTechKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTechnology();
    }
  }

  function handleCurrentlyWorkingChange(checked: boolean) {
    setForm((prev) => ({
      ...prev,
      currently_working: checked,
      end_date: checked ? "" : prev.end_date,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();

    const payload = {
      ...form,
      end_date: form.currently_working ? null : form.end_date || null,
      start_date: form.start_date || null,
    };

    if (isEditMode && initialData?.id) {
      const { error: updateError } = await supabase
        .from("experience")
        .update(payload)
        .eq("id", initialData.id);

      if (updateError) {
        setError(updateError.message);
        setLoading(false);
        return;
      }
    } else {
      const { error: insertError } = await supabase
        .from("experience")
        .insert(payload);

      if (insertError) {
        setError(insertError.message);
        setLoading(false);
        return;
      }
    }

    router.push("/admin/experience");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Position" required>
          <input
            value={form.position}
            onChange={(e) => updateField("position", e.target.value)}
            required
            className="input"
          />
        </Field>
        <Field label="Organization" required>
          <input
            value={form.organization}
            onChange={(e) => updateField("organization", e.target.value)}
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
            disabled={form.currently_working}
            className="input disabled:opacity-40 disabled:bg-neutral-100"
          />
        </Field>
      </div>

      <label className="flex items-center gap-2 text-sm text-neutral-700">
        <input
          type="checkbox"
          checked={form.currently_working}
          onChange={(e) => handleCurrentlyWorkingChange(e.target.checked)}
          className="w-4 h-4"
        />
        Currently working here
      </label>

      <Field label="Description">
        <textarea
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
          rows={4}
          className="input"
        />
      </Field>

      <Field label="Technologies (press Enter to add)">
        <div className="flex flex-wrap gap-2 mb-2">
          {form.technologies.map((tech) => (
            <span
              key={tech}
              className="flex items-center gap-1 bg-neutral-100 text-neutral-700 text-xs px-2.5 py-1 rounded-full"
            >
              {tech}
              <button
                type="button"
                onClick={() => removeTechnology(tech)}
                className="hover:text-red-500"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
        <input
          value={techInput}
          onChange={(e) => setTechInput(e.target.value)}
          onKeyDown={handleTechKeyDown}
          placeholder="e.g. React"
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
        {isEditMode ? "Update Experience" : "Create Experience"}
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