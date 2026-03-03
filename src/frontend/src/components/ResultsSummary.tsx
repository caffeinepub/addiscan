import { OctagonAlert, Shield, ShieldCheck } from "lucide-react";
import type { Additive } from "../backend";
import { getConcernLevel } from "../lib/additive-utils";

interface ResultsSummaryProps {
  additives: Additive[];
}

export function ResultsSummary({ additives }: ResultsSummaryProps) {
  if (additives.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-10 px-6 text-center animate-fade-in bg-safe-bg/30 rounded-lg border border-safe/20 mb-6"
        data-ocid="scan.results.empty_state"
      >
        <div className="w-12 h-12 rounded-full bg-safe/10 border border-safe/20 flex items-center justify-center mb-3">
          <ShieldCheck className="w-6 h-6 text-safe" />
        </div>
        <h3 className="font-display font-semibold text-base text-foreground mb-1">
          No Known Additives Found
        </h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          We didn't find any recognized additives or preservatives in this
          ingredient list.
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

  const summaryBg =
    overallLevel === "high"
      ? "bg-high-bg/40 border-high/20"
      : overallLevel === "moderate"
        ? "bg-moderate-bg/40 border-moderate/20"
        : "bg-safe-bg/30 border-safe/20";

  return (
    <div className={`rounded-lg border ${summaryBg} p-4 mb-5 animate-fade-in`}>
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
            overallLevel === "high"
              ? "bg-high/15"
              : overallLevel === "moderate"
                ? "bg-moderate/15"
                : "bg-safe/15"
          }`}
        >
          {overallLevel === "high" ? (
            <OctagonAlert className="w-5 h-5 text-high" />
          ) : overallLevel === "moderate" ? (
            <Shield className="w-5 h-5 text-moderate" />
          ) : (
            <ShieldCheck className="w-5 h-5 text-safe" />
          )}
        </div>
        <div>
          <h3 className="font-display font-semibold text-sm text-foreground">
            {additives.length} Additive{additives.length !== 1 ? "s" : ""}{" "}
            Detected
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {overallLevel === "high"
              ? "Contains ingredients of high concern"
              : overallLevel === "moderate"
                ? "Contains ingredients worth noting"
                : "All detected additives are generally considered safe"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          {
            count: highCount,
            label: "High Concern",
            textColor: "text-high",
            bgColor: "bg-high/10 border-high/20",
          },
          {
            count: moderateCount,
            label: "Moderate",
            textColor: "text-moderate",
            bgColor: "bg-moderate/10 border-moderate/20",
          },
          {
            count: safeCount,
            label: "Safe",
            textColor: "text-safe",
            bgColor: "bg-safe/10 border-safe/20",
          },
        ].map(({ count, label, textColor, bgColor }) => (
          <div
            key={label}
            className={`rounded-md p-2.5 text-center border ${bgColor}`}
          >
            <div className={`text-xl font-display font-bold ${textColor}`}>
              {count}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
