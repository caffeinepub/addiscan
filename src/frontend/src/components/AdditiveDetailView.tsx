import { Separator } from "@/components/ui/separator";
import {
  AlertTriangle,
  CheckCircle,
  FlaskConical,
  Leaf,
  OctagonAlert,
  Package,
  Tag,
} from "lucide-react";
import type { Additive } from "../backend";
import {
  getCategoryColor,
  getConcernClasses,
  getConcernLabel,
  getConcernLevel,
} from "../lib/additive-utils";

interface AdditiveDetailViewProps {
  additive: Additive;
}

function ConcernIcon({ level }: { level: "high" | "moderate" | "safe" }) {
  if (level === "high") return <OctagonAlert className="w-4 h-4" />;
  if (level === "moderate") return <AlertTriangle className="w-4 h-4" />;
  return <CheckCircle className="w-4 h-4" />;
}

export function AdditiveDetailView({ additive }: AdditiveDetailViewProps) {
  const concernLevel = getConcernLevel(additive.healthEffects);
  const concernClasses = getConcernClasses(concernLevel);
  const categoryColor = getCategoryColor(additive.category);

  return (
    <div className="space-y-4">
      {/* Name & badges */}
      <div>
        <h2 className="font-display font-bold text-xl text-foreground leading-tight mb-2.5">
          {additive.name}
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          {additive.eNumber && (
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-muted-foreground bg-muted/60 px-2.5 py-1 rounded-md">
              <FlaskConical className="w-3.5 h-3.5" />
              {additive.eNumber}
            </span>
          )}
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md ${categoryColor}`}
          >
            <Tag className="w-3 h-3" />
            {additive.category}
          </span>
        </div>
      </div>

      <Separator className="opacity-30" />

      {/* Concern level */}
      <div className={`rounded-md px-4 py-3 ${concernClasses}`}>
        <div className="flex items-center gap-2 mb-1.5">
          <ConcernIcon level={concernLevel} />
          <span className="font-semibold text-sm">
            {getConcernLabel(concernLevel)}
          </span>
        </div>
        <p className="text-sm leading-relaxed">{additive.healthEffects}</p>
      </div>

      {/* Description */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
          About
        </h4>
        <p className="text-sm text-foreground/80 leading-relaxed">
          {additive.description}
        </p>
      </div>

      {/* Common products */}
      {additive.commonProducts.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1.5">
            <Package className="w-3.5 h-3.5" />
            Commonly Found In
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {additive.commonProducts.map((product) => (
              <span
                key={product}
                className="text-xs bg-muted/60 text-muted-foreground px-2.5 py-1 rounded-md"
              >
                {product}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Alternatives */}
      {additive.alternatives && additive.alternatives.length > 0 && (
        <>
          <Separator className="opacity-30" />
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5 text-safe" />
              Natural Alternatives
            </h4>
            <p className="text-xs text-muted-foreground mb-2">
              Safer or natural alternatives to this additive:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {additive.alternatives.map((alt) => (
                <span
                  key={alt}
                  className="text-xs concern-safe px-2.5 py-1 rounded-md font-medium"
                >
                  {alt}
                </span>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
