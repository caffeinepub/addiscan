/**
 * Utility helpers for additive concern levels and category colors.
 * Kept separate from lib/utils.ts (which is read-only).
 */

export type ConcernLevel = "high" | "moderate" | "safe";

/**
 * Derive a concern level from health-effects text using keyword heuristics.
 */
export function getConcernLevel(healthEffects: string): ConcernLevel {
  const text = healthEffects.toLowerCase();

  const highKeywords = [
    "carcinogen",
    "cancer",
    "toxic",
    "banned",
    "harmful",
    "dangerous",
    "severe",
    "serious risk",
    "linked to cancer",
    "mutagen",
    "teratogen",
  ];

  const moderateKeywords = [
    "allerg",
    "sensitivity",
    "hyperactiv",
    "intoleran",
    "caution",
    "concern",
    "moderate",
    "avoid",
    "limit",
    "controversial",
    "may cause",
    "linked to",
    "potential",
  ];

  if (highKeywords.some((k) => text.includes(k))) return "high";
  if (moderateKeywords.some((k) => text.includes(k))) return "moderate";
  return "safe";
}

export function getConcernLabel(level: ConcernLevel): string {
  switch (level) {
    case "high":
      return "High Concern";
    case "moderate":
      return "Moderate Concern";
    case "safe":
      return "Generally Safe";
  }
}

export function getConcernClasses(level: ConcernLevel): string {
  switch (level) {
    case "high":
      return "concern-high";
    case "moderate":
      return "concern-moderate";
    case "safe":
      return "concern-safe";
  }
}

const CATEGORY_COLORS: Record<string, string> = {
  preservative:
    "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  colorant:
    "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  colour:
    "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  sweetener: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
  emulsifier:
    "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  thickener: "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
  stabilizer:
    "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
  antioxidant:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  flavour:
    "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  flavor:
    "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  acidulant:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  acid: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  leavening: "bg-lime-100 text-lime-800 dark:bg-lime-900/30 dark:text-lime-300",
  humectant: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
};

export function getCategoryColor(category: string): string {
  const key = category.toLowerCase();
  for (const [k, v] of Object.entries(CATEGORY_COLORS)) {
    if (key.includes(k)) return v;
  }
  return "bg-secondary text-secondary-foreground";
}
