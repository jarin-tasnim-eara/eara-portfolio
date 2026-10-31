import {
  Code2,
  Database,
  Server,
  Wrench,
  Globe,
  Terminal,
  Layers,
  Cpu,
  GitBranch,
  Palette,
  Box,
  LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Code2,
  Database,
  Server,
  Wrench,
  Globe,
  Terminal,
  Layers,
  Cpu,
  GitBranch,
  Palette,
  Box,
};

export function getIconComponent(iconName: string | null): LucideIcon {
  if (!iconName || !ICON_MAP[iconName]) {
    return Box;
  }
  return ICON_MAP[iconName];
}