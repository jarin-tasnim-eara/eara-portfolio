"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FileText, Award } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { normalizeUrl } from "@/lib/url";
import { formatYear, shortAuthors, venueFor } from "@/lib/research";
import type { ResearchItem } from "@/lib/research";

export default function Research(props: { research: ResearchItem[] }) {
  const research = props.research;

  if (research.length === 0) return null;

  return (
    <section id="research" className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading title="Research" barClass="bg-sec-research" />

      <div className="space-y-5">
        {research.map((item, index) => {
          const paperHref = normalizeUrl(item.paper_url);
          const certificateHref = normalizeUrl(item.certificate_url);
          const venue = venueFor(item);
          const authors = shortAuthors(item.authors, 3);
          const cardClass = item.featured
            ? "grid gap-4 rounded-xl border border-sec-research bg-card p-6 transition md:grid-cols-[7rem_1fr_auto] md:items-center md:gap-6"
            : "grid gap-4 rounded-xl border border-line bg-card p-6 transition hover:border-sec-research md:grid-cols-[7rem_1fr_auto] md:items-center md:gap-6";

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={cardClass}
            >
              <p className="font-code text-sm text-sec-research">
                {formatYear(item.publication_date)}
              </p>

              <div className="min-w-0">
                <h3 className="font-heading text-lg font-bold leading-snug text-ink">
                  {item.title}
                </h3>

                {venue && <p className="mt-2 text-sm text-soft">{venue}</p>}
                {authors && (
                  <p className="mt-1 text-xs text-soft">{authors}</p>
                )}

                {(paperHref || certificateHref) && (
                  <div className="mt-4 flex flex-wrap items-center gap-5">
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

              <Link
                href={"/research/" + item.id}
                className="justify-self-start rounded-md border border-sec-research px-4 py-2 text-sm font-medium text-sec-research transition hover:bg-sec-research hover:text-white md:justify-self-end"
              >
                Explore →
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}