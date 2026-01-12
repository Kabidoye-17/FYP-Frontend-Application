import type { IconProps } from "@phosphor-icons/react";

export type PriorityLevel = "low" | "medium" | "high";

export type StatusLevel = "backlog" | "in progress" | "completed";

interface PriorityIconConfig {
  iconName: string;
  color: string;
  weight?: IconProps["weight"];
}

interface StatusIconConfig {
  iconName: string;
  color: string;
  weight?: IconProps["weight"];
}

export const priorityIconMap: Record<PriorityLevel, PriorityIconConfig> = {
  low: {
    iconName: "Flag",
    color: "var(--text-secondary)", 
    weight: "regular",
  },
  medium: {
    iconName: "Flag",
    color: "var(--plum)", 
    weight: "regular",
  },
  high: {
    iconName: "Flag",
    color: "var(--plum)", 
    weight: "fill",
  },
};

// Status icon mappings
export const statusIconMap: Record<StatusLevel, StatusIconConfig> = {
  backlog: {
    iconName: "CircleDashed",
    color: "var(--plum)", 
    weight: "regular",
  },
  "in progress": {
    iconName: "Circle",
    color: "var(--plum)", 
    weight: "regular",
  },
  completed: {
    iconName: "Circle",
    color: "var(--plum)", 
    weight: "fill",
  },
};

export const getPriorityIcon = (
  priority: string
): PriorityIconConfig | null => {
  const normalizedPriority = priority.toLowerCase() as PriorityLevel;
  return priorityIconMap[normalizedPriority] || null;
};

export const getStatusIcon = (status: string): StatusIconConfig | null => {
  const normalizedStatus = status.toLowerCase() as StatusLevel;
  return statusIconMap[normalizedStatus] || null;
};
