export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 py-8 mt-20">
      <div className="max-w-5xl mx-auto px-6 text-center text-sm text-neutral-400">
        © {new Date().getFullYear()} Jarin Tasnim Eara. Built with Next.js and Supabase.
      </div>
    </footer>
  );
}