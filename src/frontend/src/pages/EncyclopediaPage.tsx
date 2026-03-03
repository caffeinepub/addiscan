import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BookOpen,
  ChevronRight,
  FlaskConical,
  RotateCcw,
  Search,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { Additive } from "../backend";
import { AdditiveDetailView } from "../components/AdditiveDetailView";
import { useGetAllAdditives } from "../hooks/useQueries";
import {
  getCategoryColor,
  getConcernClasses,
  getConcernLevel,
} from "../lib/additive-utils";
import { cn } from "../lib/utils";

const ALL_CATEGORY = "all";

const PRESET_CATEGORIES = [
  "Preservative",
  "Colorant",
  "Flavor Enhancer",
  "Sweetener",
  "Thickener",
  "Antioxidant",
  "Emulsifier",
];

export function EncyclopediaPage() {
  const {
    data: additives = [],
    isLoading,
    isError,
    refetch,
  } = useGetAllAdditives();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORY);
  const [selectedAdditive, setSelectedAdditive] = useState<Additive | null>(
    null,
  );

  // Derive unique categories from data, falling back to presets
  const categories = useMemo(() => {
    if (additives.length === 0) return PRESET_CATEGORIES;
    const cats = new Set(additives.map((a) => a.category));
    return Array.from(cats).sort();
  }, [additives]);

  // Client-side filter
  const filtered = useMemo(() => {
    return additives.filter((a) => {
      const term = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !term ||
        a.name.toLowerCase().includes(term) ||
        (a.eNumber?.toLowerCase().includes(term) ?? false) ||
        a.category.toLowerCase().includes(term) ||
        a.description.toLowerCase().includes(term);

      const matchesCategory =
        selectedCategory === ALL_CATEGORY ||
        a.category.toLowerCase().includes(selectedCategory.toLowerCase());

      return matchesSearch && matchesCategory;
    });
  }, [additives, searchTerm, selectedCategory]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-7">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mb-4">
          <BookOpen className="w-3.5 h-3.5" />
          Encyclopedia
        </div>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-2 tracking-tight">
          Additives Database
        </h1>
        <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
          Browse all food additives and preservatives. Search by name, E-number,
          or filter by category.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="bg-card rounded-xl border border-border p-4 mb-5">
        {/* Search bar */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            data-ocid="encyclopedia.search_input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, E-number, or category…"
            className="pl-9 text-sm bg-background/50 border-border/60 h-9"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-0.5 rounded"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            data-ocid="encyclopedia.filter.tab"
            onClick={() => setSelectedCategory(ALL_CATEGORY)}
            className={cn(
              "text-xs font-medium px-2.5 py-1 rounded-md transition-all duration-150",
              selectedCategory === ALL_CATEGORY
                ? "bg-primary text-primary-foreground"
                : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            All
            {additives.length > 0 && (
              <span className="ml-1 opacity-60">({additives.length})</span>
            )}
          </button>
          {categories.map((cat) => {
            const count = additives.filter((a) =>
              a.category.toLowerCase().includes(cat.toLowerCase()),
            ).length;
            const isActive = selectedCategory === cat;
            return (
              <button
                type="button"
                key={cat}
                data-ocid="encyclopedia.filter.tab"
                onClick={() =>
                  setSelectedCategory(isActive ? ALL_CATEGORY : cat)
                }
                className={cn(
                  "text-xs font-medium px-2.5 py-1 rounded-md transition-all duration-150",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {cat}
                {count > 0 && (
                  <span className="ml-1 opacity-60">({count})</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stats row */}
      {!isLoading && !isError && additives.length > 0 && (
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {filtered.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-foreground">
              {additives.length}
            </span>{" "}
            additives
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => refetch()}
            className="text-xs text-muted-foreground hover:text-foreground h-7 px-2 gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            Refresh
          </Button>
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div data-ocid="encyclopedia.loading_state" className="space-y-2">
          {["a", "b", "c", "d", "e", "f"].map((k) => (
            <Skeleton key={k} className="h-16 w-full rounded-lg" />
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <div
          data-ocid="encyclopedia.error_state"
          className="rounded-xl border border-destructive/20 bg-destructive/5 p-8 text-center"
        >
          <FlaskConical className="w-10 h-10 text-destructive/40 mx-auto mb-3" />
          <p className="font-semibold text-sm text-destructive mb-1">
            Failed to load database
          </p>
          <p className="text-xs text-muted-foreground mb-4">
            Check your connection and try again.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            className="gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Retry
          </Button>
        </div>
      )}

      {/* Additives list */}
      {!isLoading && !isError && (
        <div data-ocid="encyclopedia.list" className="space-y-1.5">
          {filtered.length === 0 ? (
            <div
              data-ocid="encyclopedia.empty_state"
              className="text-center py-14"
            >
              <Search className="w-8 h-8 text-muted-foreground/20 mx-auto mb-3" />
              <p className="font-medium text-sm text-foreground mb-1">
                No additives found
              </p>
              <p className="text-xs text-muted-foreground">
                Try adjusting your search or removing category filters.
              </p>
            </div>
          ) : (
            filtered.map((additive, index) => {
              const concernLevel = getConcernLevel(additive.healthEffects);
              const concernClasses = getConcernClasses(concernLevel);
              const categoryColor = getCategoryColor(additive.category);

              const dotColor =
                concernLevel === "high"
                  ? "bg-high"
                  : concernLevel === "moderate"
                    ? "bg-moderate"
                    : "bg-safe";

              return (
                <button
                  type="button"
                  key={Number(additive.id)}
                  data-ocid={`encyclopedia.item.${index + 1}`}
                  onClick={() => setSelectedAdditive(additive)}
                  className="w-full text-left bg-card hover:bg-accent/30 border border-border/60 hover:border-border rounded-lg px-4 py-3 transition-all duration-150 group"
                >
                  <div className="flex items-center gap-3">
                    {/* Concern dot */}
                    <div
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${dotColor}`}
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm text-foreground">
                          {additive.name}
                        </span>
                        {additive.eNumber && (
                          <span className="inline-flex items-center gap-0.5 text-xs font-mono text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded-sm flex-shrink-0">
                            <FlaskConical className="w-2.5 h-2.5" />
                            {additive.eNumber}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span
                          className={`text-xs font-medium px-1.5 py-0.5 rounded-sm ${categoryColor}`}
                        >
                          {additive.category}
                        </span>
                        <span
                          className={`text-xs font-medium px-1.5 py-0.5 rounded-sm ${concernClasses}`}
                        >
                          {concernLevel === "high"
                            ? "High Concern"
                            : concernLevel === "moderate"
                              ? "Moderate"
                              : "Safe"}
                        </span>
                        <span className="text-xs text-muted-foreground hidden sm:block truncate max-w-[280px]">
                          {additive.description}
                        </span>
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors flex-shrink-0" />
                  </div>
                </button>
              );
            })
          )}
        </div>
      )}

      {/* Detail Dialog */}
      <Dialog
        open={!!selectedAdditive}
        onOpenChange={(open) => !open && setSelectedAdditive(null)}
      >
        <DialogContent className="max-w-lg max-h-[85vh] flex flex-col p-0 gap-0 bg-card border-border">
          <DialogHeader className="px-5 pt-5 pb-4 border-b border-border/60 flex-shrink-0">
            <DialogTitle className="font-display text-base">
              Additive Details
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="flex-1 overflow-auto">
            <div className="px-5 py-4">
              {selectedAdditive && (
                <AdditiveDetailView additive={selectedAdditive} />
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
