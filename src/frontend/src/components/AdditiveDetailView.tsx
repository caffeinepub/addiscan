import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  FlaskConical,
  Leaf,
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
  if (level === "high") return <AlertTriangle className="w-5 h-5" />;
  if (level === "moderate") return <AlertCircle className="w-5 h-5" />;
  return <CheckCircle className="w-5 h-5" />;
}

export function AdditiveDetailView({ additive }: AdditiveDetailViewProps) {
  const concernLevel = getConcernLevel(additive.healthEffects);
  const concernClasses = getConcernClasses(concernLevel);
  const categoryColor = getCategoryColor(additive.category);

  return (
    <div className="space-y-5">
      {/* Name & E-number */}
      <div>
        <h2 className="font-display font-bold text-xl text-foreground leading-tight mb-2">
          {additive.name}
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          {additive.eNumber && (
            <span className="inline-flex items-center gap-1.5 text-sm font-mono font-semibold text-muted-foreground bg-muted px-3 py-1 rounded-md">
              <FlaskConical className="w-4 h-4" />
              {additive.eNumber}
            </span>
          )}
          <span
            className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1 rounded-md ${categoryColor}`}
          >
            <Tag className="w-3.5 h-3.5" />
            {additive.category}
          </span>
        </div>
      </div>

      <Separator />

      {/* Concern level */}
      <div className={`rounded-xl p-4 ${concernClasses}`}>
        <div className="flex items-center gap-2 mb-2">
          <ConcernIcon level={concernLevel} />
          <span className="font-semibold text-sm">
            {getConcernLabel(concernLevel)}
          </span>
        </div>
        <p className="text-sm leading-relaxed">{additive.healthEffects}</p>
      </div>

      {/* Description */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
          About
        </h4>
        <p className="text-sm text-foreground leading-relaxed">
          {additive.description}
        </p>
      </div>

      {/* Common products */}
      {additive.commonProducts.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
            <Package className="w-3.5 h-3.5" />
            Commonly Found In
          </h4>
          <div className="flex flex-wrap gap-2">
            {additive.commonProducts.map((product) => (
              <span
                key={product}
                className="text-sm bg-secondary text-secondary-foreground px-3 py-1 rounded-md"
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
          <Separator />
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5 text-safe" />
              Alternatives
            </h4>
            <p className="text-xs text-muted-foreground mb-2">
              Natural or safer alternatives to this additive:
            </p>
            <div className="flex flex-wrap gap-2">
              {additive.alternatives.map((alt) => (
                <span
                  key={alt}
                  className="text-sm concern-safe px-3 py-1 rounded-md font-medium"
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
