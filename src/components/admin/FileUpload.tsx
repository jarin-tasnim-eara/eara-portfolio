"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import { Upload, FileText, X, Loader2 } from "lucide-react";

interface FileUploadProps {
  folder: string;
  value: string;
  onChange: (url: string) => void;
  accept?: string;
}

export default function FileUpload({
  folder,
  value,
  onChange,
  accept = "*",
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    setError(null);
    setUploading(true);

    try {
      const supabase = createClient();

      const fileExt = file.name.split(".").pop();

      const fileName = `${folder}/${crypto.randomUUID()}.${
        fileExt ?? "file"
      }`;

      const { error: uploadError } = await supabase.storage
        .from("portfolio-media")
        .upload(fileName, file);

      if (uploadError) {
        setError(uploadError.message);
        return;
      }

      const { data } = supabase.storage
        .from("portfolio-media")
        .getPublicUrl(fileName);

      if (!data?.publicUrl) {
        setError("Could not generate file URL.");
        return;
      }

      onChange(data.publicUrl);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong while uploading the file.");
      }
    } finally {
      setUploading(false);
    }
  }

  function handleRemove() {
    setError(null);
    onChange("");
  }

  if (value) {
    return (
      <div>
        <div className="flex items-center gap-3 w-fit rounded-md border border-neutral-200 px-3 py-2">
          <FileText className="h-4 w-4 text-neutral-500" />

          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-700 underline hover:text-neutral-900"
          >
            View uploaded file
          </a>

          <button
            type="button"
            onClick={handleRemove}
            className="cursor-pointer"
            aria-label="Remove uploaded file"
          >
            <X className="h-4 w-4 text-neutral-400 hover:text-red-500" />
          </button>
        </div>

        {error && (
          <p className="mt-1 text-xs text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <div>
      <label className="flex w-fit cursor-pointer items-center gap-2 rounded-md border border-dashed border-neutral-300 px-4 py-2 text-sm text-neutral-500 transition hover:border-neutral-400">
        {uploading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Upload className="h-4 w-4" />
        )}

        {uploading ? "Uploading..." : "Upload file"}

        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          disabled={uploading}
          className="hidden"
        />
      </label>

      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}