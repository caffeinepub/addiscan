import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Determine concern level from healthEffects text.
 * Returns 'high' | 'moderate' | 'safe'
 */
export function getConcernLevel(healthEffects: string): 'high' | 'moderate' | 'safe' {
  const text = healthEffects.toLowerCase();
  const highKeywords = ['carcinogen', 'cancer', 'toxic', 'harmful', 'dangerous', 'potentially carcinogenic'];
  const moderateKeywords = ['allergic', 'allergy', 'hyperactivity', 'digestive', 'controversy', 'contradictory', 'sensitive', 'asthmatic', 'concern'];

  if (highKeywords.some(k => text.includes(k))) return 'high';
  if (moderateKeywords.some(k => text.includes(k))) return 'moderate';
  return 'safe';
}

export function getConcernLabel(level: 'high' | 'moderate' | 'safe'): string {
  switch (level) {
    case 'high': return 'High Concern';
    case 'moderate': return 'Moderate Concern';
    case 'safe': return 'Generally Safe';
  }
}

export function getConcernClasses(level: 'high' | 'moderate' | 'safe'): string {
  switch (level) {
    case 'high': return 'concern-high';
    case 'moderate': return 'concern-moderate';
    case 'safe': return 'concern-safe';
  }
}

export function getCategoryColor(category: string): string {
  const cat = category.toLowerCase();
  if (cat.includes('preservative')) return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
  if (cat.includes('colorant') || cat.includes('color')) return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
  if (cat.includes('sweetener')) return 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300';
  if (cat.includes('emulsifier')) return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
  if (cat.includes('antioxidant')) return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300';
  if (cat.includes('thickener') || cat.includes('stabilizer')) return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
  if (cat.includes('flavor') || cat.includes('flavour')) return 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300';
  return 'bg-secondary text-secondary-foreground';
}
