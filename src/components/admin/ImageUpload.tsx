"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import { Upload, X, Loader2 } from "lucide-react";
import Image from "next/image";

export default function ImageUpload({
  folder,
  value,
  onChange,
}: {
  folder: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploading(true);

    const supabase = createClient();
    const fileExt = file.name.split(".").pop();
    const fileName = `${folder}/${crypto.randomUUID()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("portfolio-media")
      .upload(fileName, file);

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("portfolio-media")
      .getPublicUrl(fileName);

    onChange(publicUrlData.publicUrl);
    setUploading(false);
  }

  return (
    <div>
      {value ? (
        <div className="relative w-40 h-40 rounded-md overflow-hidden border border-neutral-200">
          <Image src={value} alt="Uploaded" fill className="object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-1 right-1 bg-black/60 rounded-full p-1"
          >
            <X className="w-3 h-3 text-white" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed border-neutral-300 rounded-md cursor-pointer hover:border-neutral-400 transition">
          {uploading ? (
            <Loader2 className="w-5 h-5 animate-spin text-neutral-400" />
          ) : (
            <>
              <Upload className="w-5 h-5 text-neutral-400" />
              <span className="text-xs text-neutral-400 mt-2">
                Click to upload
              </span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
        </label>
      )}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}