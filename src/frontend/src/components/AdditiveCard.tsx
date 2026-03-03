import {
  AlertTriangle,
  CheckCircle,
  FlaskConical,
  Leaf,
  OctagonAlert,
  Package,
} from "lucide-react";
import type { Additive } from "../backend";
import {
  getCategoryColor,
  getConcernClasses,
  getConcernLabel,
  getConcernLevel,
} from "../lib/additive-utils";

interface AdditiveCardProps {
  additive: Additive;
  compact?: boolean;
  index?: number;
}

function ConcernIcon({ level }: { level: "high" | "moderate" | "safe" }) {
  if (level === "high") return <OctagonAlert className="w-3.5 h-3.5" />;
  if (level === "moderate") return <AlertTriangle className="w-3.5 h-3.5" />;
  return <CheckCircle className="w-3.5 h-3.5" />;
}

export function AdditiveCard({
  additive,
  compact = false,
  index,
}: AdditiveCardProps) {
  const concernLevel = getConcernLevel(additive.healthEffects);
  const concernClasses = getConcernClasses(concernLevel);
  const categoryColor = getCategoryColor(additive.category);

  const concernBorderColor =
    concernLevel === "high"
      ? "border-high/25"
      : concernLevel === "moderate"
        ? "border-moderate/25"
        : "border-safe/20";

  const concernIndicatorBg =
    concernLevel === "high"
      ? "bg-high"
      : concernLevel === "moderate"
        ? "bg-moderate"
        : "bg-safe";

  return (
    <div
      className={`bg-card rounded-lg border ${concernBorderColor} overflow-hidden animate-fade-in hover:shadow-card transition-all duration-200`}
      data-ocid={
        index !== undefined ? `scan.results.item.${index + 1}` : undefined
      }
    >
      {/* Left accent stripe */}
      <div className="flex">
        <div className={`w-1 flex-shrink-0 ${concernIndicatorBg} opacity-80`} />
        <div className="flex-1 p-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-2.5">
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-semibold text-foreground text-sm leading-tight">
                {additive.name}
              </h3>
              {additive.eNumber && (
                <span className="inline-flex items-center gap-1 mt-1 text-xs font-mono text-muted-foreground bg-muted/60 px-1.5 py-0.5 rounded-sm">
                  <FlaskConical className="w-3 h-3" />
                  {additive.eNumber}
                </span>
              )}
            </div>

            {/* Concern badge */}
            <span
              className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0 ${concernClasses}`}
            >
              <ConcernIcon level={concernLevel} />
              {getConcernLabel(concernLevel)}
            </span>
          </div>

          {/* Category badge */}
          <span
            className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-sm mb-2.5 ${categoryColor}`}
          >
            {additive.category}
          </span>

          {/* Description */}
          <p className="text-xs text-muted-foreground leading-relaxed mb-3">
            {additive.description}
          </p>

          {/* Health effects */}
          <div className={`rounded-md px-3 py-2 ${concernClasses}`}>
            <p className="text-xs font-semibold uppercase tracking-wide mb-1 opacity-60">
              Health Notes
            </p>
            <p className="text-xs leading-relaxed">{additive.healthEffects}</p>
          </div>

          {/* Common products */}
          {!compact && additive.commonProducts.length > 0 && (
            <div className="mt-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 flex items-center gap-1">
                <Package className="w-3 h-3" />
                Found in
              </p>
              <div className="flex flex-wrap gap-1">
                {additive.commonProducts.map((product) => (
                  <span
                    key={product}
                    className="text-xs bg-muted/50 text-muted-foreground px-2 py-0.5 rounded-sm"
                  >
                    {product}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Alternatives */}
          {!compact &&
            additive.alternatives &&
            additive.alternatives.length > 0 && (
              <div className="mt-3 pt-3 border-t border-border/50">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 flex items-center gap-1">
                  <Leaf className="w-3 h-3 text-safe" />
                  Alternatives
                </p>
                <div className="flex flex-wrap gap-1">
                  {additive.alternatives.map((alt) => (
                    <span
                      key={alt}
                      className="text-xs concern-safe px-2 py-0.5 rounded-sm font-medium"
                    >
                      {alt}
                    </span>
                  ))}
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
