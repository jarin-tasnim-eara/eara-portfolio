import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, FileText, Award } from "lucide-react";
import { createClient } from "@/lib/supabase-server";
import { normalizeUrl } from "@/lib/url";
import { formatFullDate, venueFor } from "@/lib/research";
import type { ResearchItem } from "@/lib/research";

export default async function ResearchDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await props.params;
  const id = resolvedParams.id;

  const supabase = await createClient();

  const result = await supabase
    .from("research")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  const item: ResearchItem | null = result.data;

  if (!item) {
    notFound();
  }

  const paperHref = normalizeUrl(item.paper_url);
  const certificateHref = normalizeUrl(item.certificate_url);
  const venue = venueFor(item);
  const date = formatFullDate(item.publication_date);

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <Link
        href="/#research"
        className="mb-8 inline-flex items-center gap-2 text-sm text-soft transition hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to research
      </Link>

      <h1 className="font-heading text-3xl font-bold leading-tight text-ink md:text-4xl">
        {item.title}
      </h1>
      <div className="mt-4 h-1 w-10 rounded-full bg-sec-research" />

      <div className="mt-6 space-y-1">
        {venue && <p className="text-base text-sec-research">{venue}</p>}
        {date && <p className="text-sm text-soft">{date}</p>}
        {item.authors && (
          <p className="text-sm text-soft">Authors: {item.authors}</p>
        )}
      </div>

      {(paperHref || certificateHref) && (
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {paperHref && (
            <Link
              href={paperHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-500"
            >
              <FileText className="h-4 w-4" />
              Read the paper
            </Link>
          )}
          {certificateHref && (
            <Link
              href={certificateHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md border border-line bg-card px-4 py-2 text-sm font-medium text-ink transition hover:border-sec-research"
            >
              <Award className="h-4 w-4" />
              View certificate
            </Link>
          )}
        </div>
      )}

      {item.image_url && (
        <div className="relative mt-10 h-64 w-full overflow-hidden rounded-2xl border border-line bg-card sm:h-96">
          <Image
            src={item.image_url}
            alt={item.title}
            fill
            sizes="(min-width: 896px) 896px, 100vw"
            className="object-cover"
            priority
          />
        </div>
      )}

      {item.description && (
        <div className="mt-10 rounded-2xl border border-line bg-card p-6 sm:p-8">
          <p className="mb-4 font-code text-xs uppercase tracking-widest text-sec-research">
            About this work
          </p>
          <p className="whitespace-pre-line text-[16px] leading-8 text-soft">
            {item.description}
          </p>
        </div>
      )}
    </main>
  );
}