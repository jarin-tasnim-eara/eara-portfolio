export type ResearchItem = {
  id: string;
  title: string;
  description: string | null;
  publication_type: string | null;
  conference: string | null;
  publication_date: string | null;
  authors: string | null;
  paper_url: string | null;
  certificate_url: string | null;
  image_url: string | null;
  featured: boolean | null;
};

export function formatYear(dateStr: string | null): string {
  if (!dateStr) return "";
  return new Date(dateStr).getFullYear().toString();
}

export function formatFullDate(dateStr: string | null): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export function venueFor(item: ResearchItem): string {
  return [item.publication_type, item.conference].filter(Boolean).join(" · ");
}

export function shortAuthors(authors: string | null, limit: number): string {
  if (!authors) return "";

  const names = authors
    .split(",")
    .map((name) => name.trim())
    .filter(Boolean);

  if (names.length <= limit) return names.join(", ");

  return (
    names.slice(0, limit).join(", ") + " +" + (names.length - limit) + " more"
  );
}