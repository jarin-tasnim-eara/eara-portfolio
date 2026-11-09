import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import Slider from "@/components/ui/Slider";
import SectionHeading from "@/components/ui/SectionHeading";
import { normalizeUrl } from "@/lib/url";

type CertificationItem = {
  id: string;
  title: string;
  issuer: string | null;
  issue_date: string | null;
  credential_url: string | null;
  image_url: string | null;
  description: string | null;
  type: string | null;
};

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function typeLabel(type: string | null): string {
  if (!type || type.length === 0) return "Certification";
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export default function Certifications(props: {
  certifications: CertificationItem[];
}) {
  const certifications = props.certifications;

  if (certifications.length === 0) return null;

  const items = certifications.map((cert) => {
    const credentialHref = normalizeUrl(cert.credential_url);

    return (
      <div
        key={cert.id}
        className="flex h-full gap-4 rounded-xl border border-line bg-card p-5 transition hover:-translate-y-1 hover:border-sec-awards"
      >
        {cert.image_url && (
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-page">
            <Image
              src={cert.image_url}
              alt={cert.title}
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <span className="mb-2 inline-block rounded-full border border-sec-awards px-2 py-0.5 font-code text-[10px] uppercase tracking-wider text-sec-awards">
            {typeLabel(cert.type)}
          </span>

          <h3 className="font-heading text-sm font-bold text-ink">
            {cert.title}
          </h3>

          <p className="mt-1 text-xs text-soft">
            {cert.issuer}
            {cert.issue_date ? " · " + formatDate(cert.issue_date) : ""}
          </p>

          {cert.description && (
            <p className="mt-2 text-xs leading-5 text-soft">
              {cert.description}
            </p>
          )}

          {credentialHref && (
            <Link
              href={credentialHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-sec-awards hover:underline"
            >
              <ExternalLink className="h-3 w-3" />
              View credential
            </Link>
          )}
        </div>
      </div>
    );
  });

  return (
    <section id="certifications" className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading title="Certifications" barClass="bg-sec-awards" />

      <Slider
        items={items}
        dotClass="bg-sec-awards"
        label="Certifications"
      />
    </section>
  );
}