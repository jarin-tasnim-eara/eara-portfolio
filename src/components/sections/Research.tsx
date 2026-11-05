"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FileText, Award } from "lucide-react";
import { normalizeUrl } from "@/lib/url";

type ResearchItem = {
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

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function Research(props: { research: ResearchItem[] }) {
  const research = props.research;

  if (research.length === 0) return null;

  return (
    <section id="research" className="max-w-4xl mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <p className="font-code text-xs tracking-widest text-sec-research mb-3">
          RESEARCH
        </p>
        <h2 className="font-heading text-3xl font-bold text-ink">
          Research &amp; Publications
        </h2>
        <div className="mt-3 h-1 w-10 rounded-full bg-sec-research" />
      </motion.div>

      <div className="space-y-6">
        {research.map((item, index) => {
          const paperHref = normalizeUrl(item.paper_url);
          const certificateHref = normalizeUrl(item.certificate_url);
          const cardClass = item.featured
            ? "overflow-hidden rounded-xl border border-sec-research bg-card transition"
            : "overflow-hidden rounded-xl border border-line bg-card transition hover:border-sec-research";
          const meta = [item.publication_type, item.conference]
            .filter(Boolean)
            .join(" · ");
          const byline = [formatDate(item.publication_date), item.authors]
            .filter(Boolean)
            .join(" · ");

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={cardClass}
            >
              {item.image_url && (
                <div className="relative h-52 w-full bg-page">
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    sizes="(min-width: 896px) 896px, 100vw"
                    className="object-cover"
                  />
                </div>
              )}

              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-heading text-lg font-bold text-ink">
                    {item.title}
                  </h3>
                  {item.featured && (
                    <span className="shrink-0 rounded-full border border-sec-research px-2.5 py-0.5 font-code text-[10px] uppercase tracking-wider text-sec-research">
                      Featured
                    </span>
                  )}
                </div>

                {meta && <p className="mt-2 text-sm text-sec-research">{meta}</p>}
                {byline && <p className="mt-1 text-xs text-soft">{byline}</p>}

                {item.description && (
                  <p className="mt-4 text-[15px] leading-7 text-soft">
                    {item.description}
                  </p>
                )}

                {(paperHref || certificateHref) && (
                  <div className="mt-5 flex flex-wrap items-center gap-5">
                    {paperHref && (
                      <Link
                        href={paperHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-sec-research hover:underline"
                      >
                        <FileText className="h-4 w-4" />
                        Paper
                      </Link>
                    )}
                    {certificateHref && (
                      <Link
                        href={certificateHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-sec-research hover:underline"
                      >
                        <Award className="h-4 w-4" />
                        Certificate
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}