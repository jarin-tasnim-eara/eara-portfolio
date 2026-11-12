export type CertificationItem = {
  id: string;
  title: string;
  issuer: string | null;
  issue_date: string | null;
  credential_url: string | null;
  image_url: string | null;
  description: string | null;
  type: string | null;
};

export function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function typeLabel(type: string | null): string {
  if (!type || type.length === 0) return "Certification";
  return type.charAt(0).toUpperCase() + type.slice(1);
}