import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  ArrowRight,
  ClipboardPaste,
  Loader2,
  ScanLine,
} from "lucide-react";
import { useState } from "react";
import type { Additive } from "../backend";
import { AdditiveCard } from "../components/AdditiveCard";
import { ResultsSummary } from "../components/ResultsSummary";
import { useParseIngredients } from "../hooks/useQueries";

const EXAMPLE_INGREDIENTS =
  "Water, Sugar, Citric Acid, Sodium Benzoate (E211), Aspartame (E951), Tartrazine (E102), Natural Flavors, Xanthan Gum (E415)";

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Find the label",
    desc: "Flip the product and locate the ingredients list printed on the back.",
  },
  {
    step: "02",
    title: "Paste & scan",
    desc: "Type or paste the full ingredient text into the box above.",
  },
  {
    step: "03",
    title: "Review findings",
    desc: "See every identified additive with health notes and safer alternatives.",
  },
];

export function ScanPage() {
  const [ingredientsText, setIngredientsText] = useState("");
  const [results, setResults] = useState<Additive[] | null>(null);
  const [validationError, setValidationError] = useState("");

  const parseIngredients = useParseIngredients();

  const handleAnalyze = async () => {
    setValidationError("");

    if (!ingredientsText.trim()) {
      setValidationError(
        "Please paste or type the ingredient list from the product label.",
      );
      return;
    }

    try {
      const found = await parseIngredients.mutateAsync(ingredientsText);
      setResults(found);
    } catch {
      // error handled via mutation state
    }
  };

  const handlePasteExample = () => {
    setIngredientsText(EXAMPLE_INGREDIENTS);
    setResults(null);
    setValidationError("");
  };

  const handleClear = () => {
    setIngredientsText("");
    setResults(null);
    setValidationError("");
    parseIngredients.reset();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Hero */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mb-4">
          <ScanLine className="w-3.5 h-3.5" />
          Ingredient Scanner
        </div>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-3 leading-tight tracking-tight">
          What's really in
          <br />
          <span className="text-primary">your food?</span>
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-md leading-relaxed">
          Paste the ingredient list from any food product label to instantly
          identify additives, preservatives, and their health effects.
        </p>
      </div>

      {/* Input area */}
      <div className="bg-card rounded-xl border border-border p-4 sm:p-5 mb-5">
        <div className="flex items-center justify-between mb-2.5">
          <label
            htmlFor="scan-ingredients"
            className="text-xs font-semibold text-foreground uppercase tracking-wide"
          >
            Ingredient List
          </label>
          <button
            type="button"
            onClick={handlePasteExample}
            className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-medium transition-colors"
          >
            <ClipboardPaste className="w-3 h-3" />
            Try example
          </button>
        </div>

        <Textarea
          id="scan-ingredients"
          data-ocid="scan.textarea"
          value={ingredientsText}
          onChange={(e) => {
            setIngredientsText(e.target.value);
            setValidationError("");
            if (results !== null) setResults(null);
          }}
          placeholder="Paste ingredient list here…&#10;&#10;e.g. Water, Sugar, Citric Acid, Sodium Benzoate (E211), ..."
          className="min-h-[130px] resize-y text-xs leading-relaxed font-mono bg-background/50 border-border/60 focus:ring-primary/20 placeholder:text-muted-foreground/40"
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.ctrlKey) handleAnalyze();
          }}
        />

        {validationError && (
          <p className="mt-2 text-xs text-destructive flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            {validationError}
          </p>
        )}

        <div className="flex items-center gap-2 mt-3">
          <Button
            onClick={handleAnalyze}
            disabled={parseIngredients.isPending}
            data-ocid="scan.submit_button"
            className="gap-1.5 font-semibold"
            size="sm"
          >
            {parseIngredients.isPending ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Scanning…
              </>
            ) : (
              <>
                <ScanLine className="w-3.5 h-3.5" />
                Scan Ingredients
              </>
            )}
          </Button>

          {(ingredientsText || results !== null) && (
            <Button
              variant="ghost"
              onClick={handleClear}
              disabled={parseIngredients.isPending}
              size="sm"
              className="text-muted-foreground hover:text-foreground text-xs"
            >
              Clear
            </Button>
          )}

          <span className="ml-auto text-xs text-muted-foreground hidden sm:block">
            Ctrl + Enter to scan
          </span>
        </div>
      </div>

      {/* Error state */}
      {parseIngredients.isError && (
        <Alert variant="destructive" className="mb-5 animate-fade-in">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            Failed to analyze ingredients. Please check your connection and try
            again.
          </AlertDescription>
        </Alert>
      )}

      {/* Results */}
      {results !== null && (
        <div className="animate-fade-in">
          <ResultsSummary additives={results} />

          {results.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {results.map((additive, i) => (
                <AdditiveCard
                  key={Number(additive.id)}
                  additive={additive}
                  index={i}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* How it works */}
      {results === null && !parseIngredients.isPending && (
        <div className="mt-6 animate-fade-in">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
            How it works
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {HOW_IT_WORKS.map(({ step, title, desc }, i) => (
              <div
                key={step}
                className="bg-card rounded-lg border border-border p-4 relative group"
              >
                <div className="flex items-start gap-3">
                  <span className="font-mono text-2xl font-bold text-primary/20 leading-none flex-shrink-0 mt-0.5">
                    {step}
                  </span>
                  <div>
                    <h4 className="font-display font-semibold text-sm text-foreground mb-1">
                      {title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
                {i < 2 && (
                  <div className="hidden sm:block absolute -right-1.5 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="w-3 h-3 text-muted-foreground/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
