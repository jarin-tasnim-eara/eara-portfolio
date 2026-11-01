import Link from "next/link";
import type { IconType } from "react-icons";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { SiGooglescholar, SiResearchgate } from "react-icons/si";

type SocialIconsProps = {
  githubUrl: string | null;
  linkedinUrl: string | null;
  googleScholarUrl: string | null;
  researchgateUrl: string | null;
};

type SocialItem = {
  label: string;
  href: string | null;
  Icon: IconType;
};

const itemClass =
  "flex h-11 w-11 items-center justify-center rounded-full border border-line bg-card text-soft transition hover:-translate-y-0.5 hover:border-sec-skills hover:text-ink";

export default function SocialIcons(props: SocialIconsProps) {
  const items: SocialItem[] = [
    { label: "LinkedIn", href: props.linkedinUrl, Icon: FaLinkedinIn },
    { label: "GitHub", href: props.githubUrl, Icon: FaGithub },
    {
      label: "Google Scholar",
      href: props.googleScholarUrl,
      Icon: SiGooglescholar,
    },
    {
      label: "ResearchGate",
      href: props.researchgateUrl,
      Icon: SiResearchgate,
    },
  ];

  return (
    <div className="flex items-center gap-3">
      {items.map((item) => {
        if (!item.href) return null;
        const Icon = item.Icon;
        return (
          <Link
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            title={item.label}
            className={itemClass}
          >
            <Icon className="h-5 w-5" />
          </Link>
        );
      })}
    </div>
  );
}