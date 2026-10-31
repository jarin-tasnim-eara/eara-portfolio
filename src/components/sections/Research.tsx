"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FileText, Award } from "lucide-react";

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
  featured: boolean;
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
    <section id="research" className="max-w-3xl mx-auto px-6 py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold text-neutral-900 dark:text-white mb-10"
      >
        Research & Publications
      </motion.h2>

      <div className="space-y-5">
        {research.map((item, index) => {
          const delayValue = index * 0.1;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: delayValue }}
              className={
                item.featured
                  ? "border border-neutral-300 dark:border-neutral-700 rounded-xl p-5 bg-neutral-50 dark:bg-neutral-900/50"
                  : "border border-neutral-200 dark:border-neutral-800 rounded-xl p-5"
              }
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="font-semibold text-neutral-900 dark:text-white">
                  {item.title}
                </h3>
                {item.featured && (
                  <Award className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                )}
              </div>

              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">
                {item.publication_type}
                {item.conference ? " · " + item.conference : ""}
              </p>

              <p className="text-xs text-neutral-400 mb-3">
                {formatDate(item.publication_date)}
                {item.authors ? " · " + item.authors : ""}
              </p>

              {item.description && (
                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-3">
                  {item.description}
                </p>
              )}

              <div className="flex items-center gap-4">
                {item.paper_url && (
                  <Link
                    href={item.paper_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:underline"
                  >
                    <FileText className="w-4 h-4" />
                    Paper
                  </Link>
                )}
                {item.certificate_url && (
                  <Link
                    href={item.certificate_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:underline"
                  >
                    <Award className="w-4 h-4" />
                    Certificate
                  </Link>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}