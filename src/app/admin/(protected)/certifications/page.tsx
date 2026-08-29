import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import { Plus, Pencil } from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminCertificationsPage() {
  const supabase = await createClient();

  const { data: certifications } = await supabase
    .from("certifications")
    .select("*")
    .order("issue_date", { ascending: false });

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">
          Certifications
        </h1>
        <Link
          href="/admin/certifications/new"
          className="flex items-center gap-2 bg-neutral-900 text-white px-4 py-2 rounded-md text-sm hover:bg-neutral-700 transition"
        >
          <Plus className="w-4 h-4" />
          New Certification
        </Link>
      </div>

      {!certifications || certifications.length === 0 ? (
        <p className="text-neutral-400 text-sm">
          No certifications added yet.
        </p>
      ) : (
        <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
          {certifications.map((cert, index) => (
            <div
              key={cert.id}
              className={`flex items-center justify-between px-5 py-4 ${
                index !== certifications.length - 1
                  ? "border-b border-neutral-200"
                  : ""
              }`}
            >
              <div className="min-w-0">
                <p className="font-medium text-neutral-900 truncate">
                  {cert.title}
                </p>
                <p className="text-xs text-neutral-400 truncate">
                  {cert.issuer} · {cert.type}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/admin/certifications/${cert.id}/edit`}
                  className="p-2 rounded-md text-neutral-500 hover:bg-neutral-100 transition"
                >
                  <Pencil className="w-4 h-4" />
                </Link>
                <DeleteButton table="certifications" id={cert.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}