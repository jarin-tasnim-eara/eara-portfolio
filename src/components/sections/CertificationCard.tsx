import Link from "next/link";
import Image from "next/image";
import { Award } from "lucide-react";
import { formatDate, typeLabel } from "@/lib/certifications";
import type { CertificationItem } from "@/lib/certifications";

export default function CertificationCard(props: { cert: CertificationItem }) {
  const cert = props.cert;
  const meta = [cert.issuer, formatDate(cert.issue_date)]
    .filter(Boolean)
    .join(" · ");

  return (
    <Link
      href={"/certifications/" + cert.id}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-card transition hover:-translate-y-1 hover:border-sec-awards"
    >
      <div className="relative aspect-[4/3] w-full bg-neutral-100">
        {cert.image_url ? (
          <Image
            src={cert.image_url}
            alt={cert.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain p-2"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-neutral-400">
            <Award className="h-10 w-10" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="mb-3 inline-block w-fit rounded-full border border-sec-awards px-2.5 py-0.5 font-code text-[10px] uppercase tracking-wider text-sec-awards">
          {typeLabel(cert.type)}
        </span>

        <h3 className="font-heading text-base font-bold leading-snug text-ink">
          {cert.title}
        </h3>

        {meta && <p className="mt-1 text-xs text-soft">{meta}</p>}

        <span className="mt-auto pt-4 text-sm font-medium text-sec-awards group-hover:underline">
          View details →
        </span>
      </div>
    </Link>
  );
}