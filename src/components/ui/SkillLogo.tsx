import Image from "next/image";

type SkillLogoProps = {
  name: string;
  icon: string | null;
  size: "sm" | "md";
};

const PALETTE = [
  "#3776AB",
  "#E34F26",
  "#2B8FB5",
  "#7C5CFF",
  "#0E8FA3",
  "#D9822B",
  "#2E7D5B",
  "#C2410C",
];

function colorFor(name: string): string {
  let total = 0;
  for (let i = 0; i < name.length; i++) {
    total += name.charCodeAt(i);
  }
  return PALETTE[total % PALETTE.length];
}

function initialsFor(name: string): string {
  const cleaned = name.replace(/[^a-zA-Z0-9 ]/g, " ").trim();
  const words = cleaned.split(/\s+/).filter(Boolean);

  if (words.length >= 2) {
    return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
  }

  return cleaned.charAt(0).toUpperCase() + cleaned.charAt(1).toLowerCase();
}

export default function SkillLogo(props: SkillLogoProps) {
  const { name, icon, size } = props;

  const isImage = icon
    ? icon.startsWith("http://") || icon.startsWith("https://")
    : false;

  const boxClass =
    size === "md"
      ? "h-14 w-14 rounded-xl text-lg"
      : "h-6 w-6 rounded-md text-[10px]";
  const padClass = size === "md" ? "p-2.5" : "p-1";

  if (isImage && icon) {
    return (
      <span
        className={
          "relative flex shrink-0 items-center justify-center overflow-hidden bg-white " +
          boxClass
        }
      >
        <Image
          src={icon}
          alt={name}
          fill
          unoptimized
          sizes="56px"
          className={"object-contain " + padClass}
        />
      </span>
    );
  }

  return (
    <span
      className={
        "flex shrink-0 items-center justify-center font-heading font-bold text-white " +
        boxClass
      }
      style={{ backgroundColor: colorFor(name) }}
    >
      {initialsFor(name)}
    </span>
  );
}