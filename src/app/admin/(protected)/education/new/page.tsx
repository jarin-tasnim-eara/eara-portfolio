import EducationForm from "@/components/admin/EducationForm";

export default function NewEducationPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-neutral-900 mb-6">
        New Education
      </h1>
      <EducationForm />
    </main>
  );
}