import type { Additive } from '../backend';
import { getConcernLevel, getConcernLabel, getConcernClasses, getCategoryColor } from '../lib/utils';
import { AlertTriangle, CheckCircle, AlertCircle, Package, FlaskConical } from 'lucide-react';

interface AdditiveCardProps {
  additive: Additive;
  compact?: boolean;
}

function ConcernIcon({ level }: { level: 'high' | 'moderate' | 'safe' }) {
  if (level === 'high') return <AlertTriangle className="w-4 h-4" />;
  if (level === 'moderate') return <AlertCircle className="w-4 h-4" />;
  return <CheckCircle className="w-4 h-4" />;
}

export function AdditiveCard({ additive, compact = false }: AdditiveCardProps) {
  const concernLevel = getConcernLevel(additive.healthEffects);
  const concernClasses = getConcernClasses(concernLevel);
  const categoryColor = getCategoryColor(additive.category);

  return (
    <div className="bg-card rounded-xl shadow-card hover:shadow-card-hover transition-shadow duration-200 border border-border overflow-hidden animate-fade-in">
      {/* Top accent bar based on concern */}
      <div
        className={`h-1 w-full ${
          concernLevel === 'high'
            ? 'bg-high'
            : concernLevel === 'moderate'
            ? 'bg-moderate'
            : 'bg-safe'
        }`}
      />

      <div className="p-4 sm:p-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-semibold text-foreground text-base leading-tight truncate">
              {additive.name}
            </h3>
            {additive.eNumber && (
              <span className="inline-flex items-center gap-1 mt-1 text-xs font-mono font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-sm">
                <FlaskConical className="w-3 h-3" />
                {additive.eNumber}
              </span>
            )}
          </div>

          {/* Concern badge */}
          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0 ${concernClasses}`}>
            <ConcernIcon level={concernLevel} />
            {getConcernLabel(concernLevel)}
          </span>
        </div>

        {/* Category badge */}
        <span className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-sm mb-3 ${categoryColor}`}>
          {additive.category}
        </span>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
          {additive.description}
        </p>

        {/* Health effects */}
        <div className={`rounded-lg p-3 ${concernClasses}`}>
          <p className="text-xs font-semibold uppercase tracking-wide mb-1 opacity-70">Health Notes</p>
          <p className="text-sm leading-relaxed">{additive.healthEffects}</p>
        </div>

        {/* Common products */}
        {!compact && additive.commonProducts.length > 0 && (
          <div className="mt-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2 flex items-center gap-1">
              <Package className="w-3 h-3" />
              Common in
            </p>
            <div className="flex flex-wrap gap-1.5">
              {additive.commonProducts.map((product, i) => (
                <span
                  key={i}
                  className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-sm"
                >
                  {product}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
