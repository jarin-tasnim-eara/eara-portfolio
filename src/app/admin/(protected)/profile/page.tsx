import { createClient } from "@/lib/supabase-server";
import ProfileForm from "@/components/admin/ProfileForm";

export default async function AdminProfilePage() {
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profile")
    .select("*")
    .limit(1)
    .maybeSingle();

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-neutral-900 mb-6">
        Profile Settings
      </h1>
      <ProfileForm initialData={profile ?? undefined} />
    </main>
  );
}