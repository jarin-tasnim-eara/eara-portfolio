"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import { Loader2, X } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import FileUpload from "@/components/admin/FileUpload";

type ProfileFormData = {
  id?: string;
  full_name: string;
  title: string;
  short_intro: string;
  about_text: string;
  current_focus: string;
  career_direction: string;
  email: string;
  linkedin_url: string;
  github_url: string;
  resume_url: string;
  profile_image_url: string;
  google_scholar_url: string;
researchgate_url: string;
availability_text: string;
show_availability: boolean;
currently_learning: string[];
};

export default function ProfileForm({
  initialData,
}: {
  initialData?: ProfileFormData;
}) {
  const router = useRouter();

  const [form, setForm] = useState<ProfileFormData>({
    full_name: initialData?.full_name ?? "",
    title: initialData?.title ?? "",
    short_intro: initialData?.short_intro ?? "",
    about_text: initialData?.about_text ?? "",
    current_focus: initialData?.current_focus ?? "",
    career_direction: initialData?.career_direction ?? "",
    email: initialData?.email ?? "",
    linkedin_url: initialData?.linkedin_url ?? "",
    github_url: initialData?.github_url ?? "",
    resume_url: initialData?.resume_url ?? "",
    profile_image_url: initialData?.profile_image_url ?? "",
    google_scholar_url: initialData?.google_scholar_url ?? "",
researchgate_url: initialData?.researchgate_url ?? "",
availability_text: initialData?.availability_text ?? "",
show_availability: initialData?.show_availability ?? false,
currently_learning: initialData?.currently_learning ?? [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [learningInput, setLearningInput] = useState("");

  function updateField<K extends keyof ProfileFormData>(
    key: K,
    value: ProfileFormData[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

function addLearning() {
  const trimmed = learningInput.trim();
  if (trimmed && !form.currently_learning.includes(trimmed)) {
    updateField("currently_learning", [...form.currently_learning, trimmed]);
  }
  setLearningInput("");
}

function removeLearning(item: string) {
  updateField(
    "currently_learning",
    form.currently_learning.filter((entry) => entry !== item)
  );
}

function handleLearningKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
  if (e.key === "Enter" || e.key === ",") {
    e.preventDefault();
    addLearning();
  }
}

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setSaved(false);

    const supabase = createClient();

    const payload = { ...form, updated_at: new Date().toISOString() };

    if (initialData?.id) {
      const { error: updateError } = await supabase
        .from("profile")
        .update(payload)
        .eq("id", initialData.id);

      if (updateError) {
        setError(updateError.message);
        setLoading(false);
        return;
      }
    } else {
      const { error: insertError } = await supabase
        .from("profile")
        .insert(payload);

      if (insertError) {
        setError(insertError.message);
        setLoading(false);
        return;
      }
    }

    setLoading(false);
    setSaved(true);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Full Name" required>
          <input
            value={form.full_name}
            onChange={(e) => updateField("full_name", e.target.value)}
            required
            className="input"
          />
        </Field>
        <Field label="Professional Title" required>
          <input
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            required
            placeholder="e.g. CSE Student | Aspiring Software Developer"
            className="input"
          />
        </Field>
      </div>

      <Field label="Short Intro (Hero section)">
        <div className="space-y-3 rounded-md border border-neutral-200 p-4">
  <label className="flex items-center gap-2 text-sm text-neutral-700">
    <input
      type="checkbox"
      checked={form.show_availability}
      onChange={(e) => updateField("show_availability", e.target.checked)}
      className="w-4 h-4"
    />
    Show availability status on the home page
  </label>
  <Field label="Status text">
    <input
      value={form.availability_text}
      onChange={(e) => updateField("availability_text", e.target.value)}
      placeholder="e.g. Open to internships"
      className="input"
    />
  </Field>
</div>
        <textarea
          value={form.short_intro}
          onChange={(e) => updateField("short_intro", e.target.value)}
          rows={2}
          className="input"
        />
      </Field>

      <Field label="About Text">
        <textarea
          value={form.about_text}
          onChange={(e) => updateField("about_text", e.target.value)}
          rows={5}
          className="input"
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Current Focus">
          <textarea
            value={form.current_focus}
            onChange={(e) => updateField("current_focus", e.target.value)}
            rows={2}
            className="input"
          />
        </Field>
        <Field label="Career Direction">
          <textarea
            value={form.career_direction}
            onChange={(e) => updateField("career_direction", e.target.value)}
            rows={2}
            className="input"
          />

        </Field>
      </div>

      <Field label="Currently learning (press Enter to add)">
  <div className="mb-2 flex flex-wrap gap-2">
    {form.currently_learning.map((item) => (
      <span
        key={item}
        className="flex items-center gap-1 rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-700"
      >
        {item}
        <button
          type="button"
          onClick={() => removeLearning(item)}
          className="hover:text-red-500"
        >
          <X className="h-3 w-3" />
        </button>
      </span>
    ))}
  </div>
  <input
    value={learningInput}
    onChange={(e) => setLearningInput(e.target.value)}
    onKeyDown={handleLearningKeyDown}
    placeholder="e.g. Node.js"
    className="input"
  />
</Field>

      <Field label="Email">
        <input
          type="email"
          value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
          className="input"
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="LinkedIn URL">
          <input
            value={form.linkedin_url}
            onChange={(e) => updateField("linkedin_url", e.target.value)}
            className="input"
          />
        </Field>
        <Field label="GitHub URL">
          <input
            value={form.github_url}
            onChange={(e) => updateField("github_url", e.target.value)}
            className="input"
          />
        </Field>
      </div>


      <div className="grid grid-cols-2 gap-4">
  <Field label="Google Scholar URL">
    <input
      value={form.google_scholar_url}
      onChange={(e) => updateField("google_scholar_url", e.target.value)}
      className="input"
    />
  </Field>
  <Field label="ResearchGate URL">
    <input
      value={form.researchgate_url}
      onChange={(e) => updateField("researchgate_url", e.target.value)}
      className="input"
    />
  </Field>
</div>

      <Field label="Profile Image">
        <ImageUpload
          folder="profile"
          value={form.profile_image_url}
          onChange={(url) => updateField("profile_image_url", url)}
        />
      </Field>

      <Field label="Resume (CV)">
        <FileUpload
          folder="resume"
          value={form.resume_url}
          onChange={(url) => updateField("resume_url", url)}
          accept=".pdf"
        />
      </Field>

      {error && <p className="text-sm text-red-500">{error}</p>}
      {saved && (
        <p className="text-sm text-green-600">Profile saved successfully.</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="flex items-center gap-2 bg-neutral-900 text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-neutral-700 disabled:opacity-50 transition"
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        Save Profile
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