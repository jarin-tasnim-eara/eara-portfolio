import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Award, ExternalLink, Maximize2 } from "lucide-react";
import { createClient } from "@/lib/supabase-server";
import { normalizeUrl } from "@/lib/url";
import { formatDate, typeLabel } from "@/lib/certifications";
import type { CertificationItem } from "@/lib/certifications";

export default async function CertificationDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await props.params;
  const id = resolvedParams.id;

  const supabase = await createClient();

  const result = await supabase
    .from("certifications")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  const cert: CertificationItem | null = result.data;

  if (!cert) {
    notFound();
  }

  const credentialHref = normalizeUrl(cert.credential_url);
  const meta = [cert.issuer, formatDate(cert.issue_date)]
    .filter(Boolean)
    .join(" · ");

  return (
    <main className="mx-auto max-w-6xl px-6 py-14">
      <Link
        href="/#certifications"
        className="mb-8 inline-flex items-center gap-2 text-sm text-soft transition hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to certifications
      </Link>

      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line bg-neutral-100">
          {cert.image_url ? (
            <Image
              src={cert.image_url}
              alt={cert.title}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-contain p-3"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-neutral-400">
              <Award className="h-16 w-16" />
            </div>
          )}
        </div>

        <div>
          <span className="inline-block rounded-full border border-sec-awards px-3 py-0.5 font-code text-[11px] uppercase tracking-wider text-sec-awards">
            {typeLabel(cert.type)}
          </span>

          <h1 className="mt-4 font-heading text-3xl font-bold leading-tight text-ink">
            {cert.title}
          </h1>
          <div className="mt-4 h-1 w-10 rounded-full bg-sec-awards" />

          {meta && <p className="mt-5 text-base text-soft">{meta}</p>}

          {cert.description && (
            <p className="mt-5 whitespace-pre-line text-[16px] leading-8 text-soft">
              {cert.description}
            </p>
          )}

          {(credentialHref || cert.image_url) && (
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {credentialHref && (
                <Link
                  href={credentialHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-md bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-500"
                >
                  <ExternalLink className="h-4 w-4" />
                  View credential
                </Link>
              )}
              {cert.image_url && (
                <Link
                  href={cert.image_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-md border border-line bg-card px-4 py-2 text-sm font-medium text-ink transition hover:border-sec-awards"
                >
                  <Maximize2 className="h-4 w-4" />
                  Open full size
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}