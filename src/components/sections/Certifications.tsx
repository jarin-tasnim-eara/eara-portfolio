"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

type CertificationItem = {
  id: string;
  title: string;
  issuer: string | null;
  issue_date: string | null;
  credential_url: string | null;
  image_url: string | null;
  description: string | null;
  type: string;
};

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function typeLabel(type: string): string {
  if (type.length === 0) return "Certification";
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export default function Certifications(props: {
  certifications: CertificationItem[];
}) {
  const certifications = props.certifications;

  if (certifications.length === 0) return null;

  return (
    <section id="certifications" className="max-w-4xl mx-auto px-6 py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold text-neutral-900 dark:text-white mb-10"
      >
        Certifications & Achievements
      </motion.h2>

      <div className="grid sm:grid-cols-2 gap-5">
        {certifications.map((cert, index) => {
          const delayValue = (index % 2) * 0.1;

          return (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: delayValue }}
              className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 flex gap-4"
            >
              {cert.image_url && (
                <div className="relative w-16 h-16 shrink-0 rounded-md overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                  <Image
                    src={cert.image_url}
                    alt={cert.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <span className="inline-block text-xs px-2 py-0.5 bg-neutral-100 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 rounded-full mb-2">
                  {typeLabel(cert.type)}
                </span>

                <h3 className="font-semibold text-neutral-900 dark:text-white text-sm">
                  {cert.title}
                </h3>

                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  {cert.issuer}
                  {cert.issue_date ? " · " + formatDate(cert.issue_date) : ""}
                </p>

                {cert.description && (
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed">
                    {cert.description}
                  </p>
                )}

                {cert.credential_url && (
                  <Link
                    href={cert.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:underline mt-3"
                  >
                    <ExternalLink className="w-3 h-3" />
                    View Credential
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