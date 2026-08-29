"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import { Loader2 } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

type CertificationFormData = {
  id?: string;
  title: string;
  issuer: string;
  issue_date: string;
  credential_url: string;
  image_url: string;
  description: string;
  type: string;
};

const TYPE_OPTIONS = ["certification", "workshop", "award", "achievement"];

export default function CertificationForm({
  initialData,
}: {
  initialData?: CertificationFormData;
}) {
  const router = useRouter();
  const isEditMode = Boolean(initialData?.id);

  const [form, setForm] = useState<CertificationFormData>({
    title: initialData?.title ?? "",
    issuer: initialData?.issuer ?? "",
    issue_date: initialData?.issue_date ?? "",
    credential_url: initialData?.credential_url ?? "",
    image_url: initialData?.image_url ?? "",
    description: initialData?.description ?? "",
    type: initialData?.type ?? "certification",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateField<K extends keyof CertificationFormData>(
    key: K,
    value: CertificationFormData[K]
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
      issue_date: form.issue_date || null,
    };

    if (isEditMode && initialData?.id) {
      const { error: updateError } = await supabase
        .from("certifications")
        .update(payload)
        .eq("id", initialData.id);

      if (updateError) {
        setError(updateError.message);
        setLoading(false);
        return;
      }
    } else {
      const { error: insertError } = await supabase
        .from("certifications")
        .insert(payload);

      if (insertError) {
        setError(insertError.message);
        setLoading(false);
        return;
      }
    }

    router.push("/admin/certifications");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Title" required>
          <input
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            required
            className="input"
          />
        </Field>
        <Field label="Type" required>
          <select
            value={form.type}
            onChange={(e) => updateField("type", e.target.value)}
            className="input"
          >
            {TYPE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt.charAt(0).toUpperCase() + opt.slice(1)}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Issuer / Organization">
          <input
            value={form.issuer}
            onChange={(e) => updateField("issuer", e.target.value)}
            className="input"
          />
        </Field>
        <Field label="Issue Date">
          <input
            type="date"
            value={form.issue_date}
            onChange={(e) => updateField("issue_date", e.target.value)}
            className="input"
          />
        </Field>
      </div>

      <Field label="Credential URL">
        <input
          value={form.credential_url}
          onChange={(e) => updateField("credential_url", e.target.value)}
          className="input"
        />
      </Field>

      <Field label="Certificate Image">
        <ImageUpload
          folder="certifications"
          value={form.image_url}
          onChange={(url) => updateField("image_url", url)}
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

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="flex items-center gap-2 bg-neutral-900 text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-neutral-700 disabled:opacity-50 transition"
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {isEditMode ? "Update Certification" : "Create Certification"}
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