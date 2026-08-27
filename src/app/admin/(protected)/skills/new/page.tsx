import SkillForm from "@/components/admin/SkillForm";

export default function NewSkillPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-neutral-900 mb-6">New Skill</h1>
      <SkillForm />
    </main>
  );
}