"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import { Loader2 } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import FileUpload from "@/components/admin/FileUpload";

type ResearchFormData = {
  id?: string;
  title: string;
  description: string;
  publication_type: string;
  conference: string;
  publication_date: string;
  authors: string;
  paper_url: string;
  certificate_url: string;
  image_url: string;
  featured: boolean;
};

export default function ResearchForm({
  initialData,
}: {
  initialData?: ResearchFormData;
}) {
  const router = useRouter();
  const isEditMode = Boolean(initialData?.id);

  const [form, setForm] = useState<ResearchFormData>({
    title: initialData?.title ?? "",
    description: initialData?.description ?? "",
    publication_type: initialData?.publication_type ?? "",
    conference: initialData?.conference ?? "",
    publication_date: initialData?.publication_date ?? "",
    authors: initialData?.authors ?? "",
    paper_url: initialData?.paper_url ?? "",
    certificate_url: initialData?.certificate_url ?? "",
    image_url: initialData?.image_url ?? "",
    featured: initialData?.featured ?? false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateField<K extends keyof ResearchFormData>(
    key: K,
    value: ResearchFormData[K]
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
      publication_date: form.publication_date || null,
    };

    if (isEditMode && initialData?.id) {
      const { error: updateError } = await supabase
        .from("research")
        .update(payload)
        .eq("id", initialData.id);

      if (updateError) {
        setError(updateError.message);
        setLoading(false);
        return;
      }
    } else {
      const { error: insertError } = await supabase
        .from("research")
        .insert(payload);

      if (insertError) {
        setError(insertError.message);
        setLoading(false);
        return;
      }
    }

    router.push("/admin/research");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <Field label="Title" required>
        <input
          value={form.title}
          onChange={(e) => updateField("title", e.target.value)}
          required
          className="input"
        />
      </Field>

      <Field label="Description">
        <textarea
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
          rows={4}
          className="input"
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Publication Type">
          <input
            value={form.publication_type}
            onChange={(e) => updateField("publication_type", e.target.value)}
            placeholder="e.g. Conference Poster"
            className="input"
          />
        </Field>
        <Field label="Conference / Event">
          <input
            value={form.conference}
            onChange={(e) => updateField("conference", e.target.value)}
            placeholder="e.g. IEEE QPAIN 2026"
            className="input"
          />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Publication Date">
          <input
            type="date"
            value={form.publication_date}
            onChange={(e) => updateField("publication_date", e.target.value)}
            className="input"
          />
        </Field>
        <Field label="Authors">
          <input
            value={form.authors}
            onChange={(e) => updateField("authors", e.target.value)}
            className="input"
          />
        </Field>
      </div>

      <Field label="Paper URL">
        <input
          value={form.paper_url}
          onChange={(e) => updateField("paper_url", e.target.value)}
          className="input"
        />
      </Field>

      <Field label="Certificate">
        <FileUpload
          folder="research"
          value={form.certificate_url}
          onChange={(url) => updateField("certificate_url", url)}
        />
      </Field>

      <Field label="Image">
        <ImageUpload
          folder="research"
          value={form.image_url}
          onChange={(url) => updateField("image_url", url)}
        />
      </Field>

      <label className="flex items-center gap-2 text-sm text-neutral-700">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(e) => updateField("featured", e.target.checked)}
          className="w-4 h-4"
        />
        Featured research
      </label>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="flex items-center gap-2 bg-neutral-900 text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-neutral-700 disabled:opacity-50 transition"
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {isEditMode ? "Update Research" : "Create Research"}
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