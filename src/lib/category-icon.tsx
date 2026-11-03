import {
  Code2,
  Globe,
  Server,
  Cpu,
  Database,
  Wrench,
  Layers,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export function getCategoryIcon(category: string): LucideIcon {
  const key = category.toLowerCase();

  if (key.includes("language") || key.includes("program")) return Code2;
  if (key.includes("front") || key.includes("web")) return Globe;
  if (key.includes("back") || key.includes("api") || key.includes("server")) {
    return Server;
  }
  if (key.includes("database") || key.includes("sql")) return Database;
  if (key.includes("tool")) return Wrench;
  if (
    key.includes("machine") ||
    key.includes("learning") ||
    key.includes("data") ||
    key === "ai" ||
    key === "ml"
  ) {
    return Cpu;
  }

  return Layers;
}