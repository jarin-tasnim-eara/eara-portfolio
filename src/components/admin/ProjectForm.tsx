"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import { X, Loader2 } from "lucide-react";

type ProjectFormData = {
  id?: string;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  image_url: string;
  github_url: string;
  live_url: string;
  featured: boolean;
  technologies: string[];
};

export default function ProjectForm({
  initialData,
}: {
  initialData?: ProjectFormData;
}) {
  const router = useRouter();
  const isEditMode = Boolean(initialData?.id);

  const [form, setForm] = useState<ProjectFormData>({
    title: initialData?.title ?? "",
    slug: initialData?.slug ?? "",
    short_description: initialData?.short_description ?? "",
    description: initialData?.description ?? "",
    image_url: initialData?.image_url ?? "",
    github_url: initialData?.github_url ?? "",
    live_url: initialData?.live_url ?? "",
    featured: initialData?.featured ?? false,
    technologies: initialData?.technologies ?? [],
  });

  const [slugManuallyEdited, setSlugManuallyEdited] = useState(isEditMode);
  const [techInput, setTechInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateField<K extends keyof ProjectFormData>(
    key: K,
    value: ProjectFormData[K]
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

  function handleTitleChange(value: string) {
    setForm((prev) => ({
      ...prev,
      title: value,
      slug: !slugManuallyEdited
        ? value
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "")
        : prev.slug,
    }));
  }

  function handleSlugChange(value: string) {
    setSlugManuallyEdited(true);
    updateField("slug", value);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();

    if (isEditMode && initialData?.id) {
      const { error: updateError } = await supabase
        .from("projects")
        .update(form)
        .eq("id", initialData.id);

      if (updateError) {
        setError(updateError.message);
        setLoading(false);
        return;
      }
    } else {
      const { error: insertError } = await supabase
        .from("projects")
        .insert(form);

      if (insertError) {
        setError(insertError.message);
        setLoading(false);
        return;
      }
    }

    router.push("/admin/projects");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Title" required>
          <input
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
            className="input"
          />
        </Field>
        <Field label="Slug (URL)" required>
          <input
            value={form.slug}
            onChange={(e) => handleSlugChange(e.target.value)}
            required
            className="input"
          />
        </Field>
      </div>

      <Field label="Short Description">
        <input
          value={form.short_description}
          onChange={(e) => updateField("short_description", e.target.value)}
          className="input"
        />
      </Field>

      <Field label="Description">
        <textarea
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
          rows={5}
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

      <Field label="Image URL">
        <input
          value={form.image_url}
          onChange={(e) => updateField("image_url", e.target.value)}
          className="input"
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="GitHub URL">
          <input
            value={form.github_url}
            onChange={(e) => updateField("github_url", e.target.value)}
            className="input"
          />
        </Field>
        <Field label="Live URL">
          <input
            value={form.live_url}
            onChange={(e) => updateField("live_url", e.target.value)}
            className="input"
          />
        </Field>
      </div>

      <label className="flex items-center gap-2 text-sm text-neutral-700">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(e) => updateField("featured", e.target.checked)}
          className="w-4 h-4"
        />
        Featured project
      </label>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="flex items-center gap-2 bg-neutral-900 text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-neutral-700 disabled:opacity-50 transition"
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {isEditMode ? "Update Project" : "Create Project"}
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