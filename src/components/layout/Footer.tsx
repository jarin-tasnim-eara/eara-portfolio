"use client";

import { usePathname } from "next/navigation";
import SocialIcons from "@/components/ui/SocialIcons";

type FooterProps = {
  fullName: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  googleScholarUrl: string | null;
  researchgateUrl: string | null;
};

export default function Footer(props: FooterProps) {
  const { fullName, githubUrl, linkedinUrl, googleScholarUrl, researchgateUrl } =
    props;
  const pathname = usePathname();

  if (pathname && pathname.startsWith("/admin")) return null;

  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="font-heading text-lg font-bold text-ink">
            {fullName ? fullName : "Portfolio"}
          </p>
          <p className="mt-1 text-xs text-soft">
            © {year} · Built with Next.js and Supabase
          </p>
        </div>

        <SocialIcons
          githubUrl={githubUrl}
          linkedinUrl={linkedinUrl}
          googleScholarUrl={googleScholarUrl}
          researchgateUrl={researchgateUrl}
        />
      </div>
    </footer>
  );
}