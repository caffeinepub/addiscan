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
    "potentially carcinogenic",
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
    "digestive issues",
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
      return "Moderate";
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

// Category color map — tailored for dark theme with subtle tints
const CATEGORY_COLORS: Record<string, string> = {
  preservative: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  colorant: "bg-violet-500/10 text-violet-400 border border-violet-500/20",
  colour: "bg-violet-500/10 text-violet-400 border border-violet-500/20",
  sweetener: "bg-pink-500/10 text-pink-400 border border-pink-500/20",
  emulsifier: "bg-sky-500/10 text-sky-400 border border-sky-500/20",
  thickener: "bg-teal-500/10 text-teal-400 border border-teal-500/20",
  stabilizer: "bg-teal-500/10 text-teal-400 border border-teal-500/20",
  antioxidant:
    "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  flavour: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
  flavor: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
  acidulant: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  acid: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  leavening: "bg-lime-500/10 text-lime-400 border border-lime-500/20",
  humectant: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
  bulking: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",
  firming: "bg-stone-500/10 text-stone-400 border border-stone-500/20",
};

export function getCategoryColor(category: string): string {
  const key = category.toLowerCase();
  for (const [k, v] of Object.entries(CATEGORY_COLORS)) {
    if (key.includes(k)) return v;
  }
  return "bg-slate-500/10 text-slate-400 border border-slate-500/20";
}
