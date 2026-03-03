import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  ClipboardPaste,
  Loader2,
  Scan,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import type { Additive } from "../backend";
import { AdditiveCard } from "../components/AdditiveCard";
import { ResultsSummary } from "../components/ResultsSummary";
import { useParseIngredients } from "../hooks/useQueries";

const EXAMPLE_INGREDIENTS =
  "Water, Sugar, Citric Acid, Sodium Benzoate (E211), Aspartame (E951), Tartrazine (E102), Natural Flavors, Xanthan Gum (E415)";

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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Hero section */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
          <Sparkles className="w-4 h-4" />
          Ingredient Analyzer
        </div>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-3 leading-tight">
          What's Really in Your Food?
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          Paste the ingredient list from the back of any product to instantly
          identify preservatives, additives, and their health effects.
        </p>
      </div>

      {/* Input card */}
      <div className="bg-card rounded-2xl shadow-card border border-border p-5 sm:p-7 mb-8">
        <div className="flex items-center justify-between mb-3">
          <Label
            htmlFor="ingredients"
            className="text-sm font-semibold text-foreground"
          >
            Ingredient List
          </Label>
          <button
            type="button"
            onClick={handlePasteExample}
            className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 font-medium transition-colors"
          >
            <ClipboardPaste className="w-3.5 h-3.5" />
            Try an example
          </button>
        </div>

        <Textarea
          id="ingredients"
          value={ingredientsText}
          onChange={(e) => {
            setIngredientsText(e.target.value);
            setValidationError("");
            if (results !== null) setResults(null);
          }}
          placeholder="Paste or type the ingredients from the product label here...&#10;&#10;Example: Water, Sugar, Citric Acid, Sodium Benzoate (E211), ..."
          className="min-h-[140px] resize-y text-sm leading-relaxed font-mono bg-background border-border focus:ring-primary/30"
        />

        {validationError && (
          <p className="mt-2 text-sm text-destructive flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {validationError}
          </p>
        )}

        <div className="flex items-center gap-3 mt-4">
          <Button
            onClick={handleAnalyze}
            disabled={parseIngredients.isPending}
            className="flex-1 sm:flex-none sm:min-w-[180px] font-semibold"
            size="lg"
          >
            {parseIngredients.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Scan className="w-4 h-4 mr-2" />
                Analyze Ingredients
              </>
            )}
          </Button>

          {(ingredientsText || results !== null) && (
            <Button
              variant="outline"
              onClick={handleClear}
              disabled={parseIngredients.isPending}
              size="lg"
            >
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Error state */}
      {parseIngredients.isError && (
        <Alert variant="destructive" className="mb-6 animate-fade-in">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {results.map((additive) => (
                <AdditiveCard key={Number(additive.id)} additive={additive} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* How it works */}
      {results === null && !parseIngredients.isPending && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in">
          {[
            {
              step: "1",
              title: "Find the Label",
              desc: "Flip the product over and locate the ingredients list on the back.",
            },
            {
              step: "2",
              title: "Paste & Analyze",
              desc: "Type or paste the full ingredient list into the text box above.",
            },
            {
              step: "3",
              title: "Review Results",
              desc: "See all identified additives with health notes and concern levels.",
            },
          ].map(({ step, title, desc }) => (
            <div
              key={step}
              className="bg-card rounded-xl border border-border p-4 text-center"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-display font-bold text-sm flex items-center justify-center mx-auto mb-3">
                {step}
              </div>
              <h4 className="font-display font-semibold text-sm text-foreground mb-1">
                {title}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
