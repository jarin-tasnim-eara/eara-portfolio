export function normalizeUrl(
  url: string | null | undefined
): string | null {
  if (!url) return null;

  const trimmed = url.trim();

  if (trimmed.length === 0) return null;

  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("mailto:")
  ) {
    return trimmed;
  }

  return "https://" + trimmed;
}