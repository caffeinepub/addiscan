import { Shield, ShieldAlert, ShieldCheck, Sparkles } from "lucide-react";
import type { Additive } from "../backend";
import { getConcernLevel } from "../lib/additive-utils";

interface ResultsSummaryProps {
  additives: Additive[];
}

export function ResultsSummary({ additives }: ResultsSummaryProps) {
  if (additives.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-6 text-center animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-safe-bg flex items-center justify-center mb-4">
          <ShieldCheck className="w-8 h-8 text-safe" />
        </div>
        <h3 className="font-display font-semibold text-lg text-foreground mb-2">
          No Known Additives Detected
        </h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          Great news! We didn't find any recognized additives or preservatives
          in the ingredient list you provided.
        </p>
      </div>
    );
  }

  const highCount = additives.filter(
    (a) => getConcernLevel(a.healthEffects) === "high",
  ).length;
  const moderateCount = additives.filter(
    (a) => getConcernLevel(a.healthEffects) === "moderate",
  ).length;
  const safeCount = additives.filter(
    (a) => getConcernLevel(a.healthEffects) === "safe",
  ).length;

  const overallLevel =
    highCount > 0 ? "high" : moderateCount > 0 ? "moderate" : "safe";

  return (
    <div
      className={`rounded-xl p-4 sm:p-5 mb-6 animate-fade-in border ${
        overallLevel === "high"
          ? "bg-high-bg border-high/20"
          : overallLevel === "moderate"
            ? "bg-moderate-bg border-moderate/20"
            : "bg-safe-bg border-safe/20"
      }`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
            overallLevel === "high"
              ? "bg-high/20"
              : overallLevel === "moderate"
                ? "bg-moderate/20"
                : "bg-safe/20"
          }`}
        >
          {overallLevel === "high" ? (
            <ShieldAlert className="w-5 h-5 text-high" />
          ) : overallLevel === "moderate" ? (
            <Shield className="w-5 h-5 text-moderate" />
          ) : (
            <ShieldCheck className="w-5 h-5 text-safe" />
          )}
        </div>
        <div>
          <h3 className="font-display font-semibold text-foreground">
            {additives.length} Additive{additives.length !== 1 ? "s" : ""} Found
          </h3>
          <p className="text-sm text-muted-foreground">
            {overallLevel === "high"
              ? "Contains ingredients of high concern"
              : overallLevel === "moderate"
                ? "Contains ingredients worth noting"
                : "All detected additives are generally safe"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-card/60 rounded-lg p-3 text-center">
          <div className="text-2xl font-display font-bold text-high">
            {highCount}
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">
            High Concern
          </div>
        </div>
        <div className="bg-card/60 rounded-lg p-3 text-center">
          <div className="text-2xl font-display font-bold text-moderate">
            {moderateCount}
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">Moderate</div>
        </div>
        <div className="bg-card/60 rounded-lg p-3 text-center">
          <div className="text-2xl font-display font-bold text-safe">
            {safeCount}
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">
            Generally Safe
          </div>
        </div>
      </div>
    </div>
  );
}
