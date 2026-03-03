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
import { BookOpen, ChevronRight, FlaskConical, Search, X } from "lucide-react";
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

export function EncyclopediaPage() {
  const { data: additives = [], isLoading, isError } = useGetAllAdditives();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORY);
  const [selectedAdditive, setSelectedAdditive] = useState<Additive | null>(
    null,
  );

  // Derive unique categories
  const categories = useMemo(() => {
    const cats = new Set(additives.map((a) => a.category));
    return Array.from(cats).sort();
  }, [additives]);

  // Filter additives client-side for instant feedback
  const filtered = useMemo(() => {
    return additives.filter((a) => {
      const matchesSearch =
        !searchTerm.trim() ||
        a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (a.eNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ??
          false) ||
        a.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === ALL_CATEGORY ||
        a.category.toLowerCase().includes(selectedCategory.toLowerCase());

      return matchesSearch && matchesCategory;
    });
  }, [additives, searchTerm, selectedCategory]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
          <BookOpen className="w-4 h-4" />
          Encyclopedia
        </div>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-3">
          Additives Database
        </h1>
        <p className="text-muted-foreground text-base max-w-xl leading-relaxed">
          Browse our comprehensive database of food additives and preservatives.
          Search by name, E-number, or filter by category.
        </p>
      </div>

      {/* Search & Filter */}
      <div className="bg-card rounded-2xl border border-border shadow-card p-4 sm:p-5 mb-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, E-number, or category..."
            className="pl-9 bg-background"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategory(ALL_CATEGORY)}
            className={cn(
              "text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-150",
              selectedCategory === ALL_CATEGORY
                ? "bg-primary text-primary-foreground shadow-xs"
                : "bg-secondary text-secondary-foreground hover:bg-accent",
            )}
          >
            All ({additives.length})
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
                onClick={() =>
                  setSelectedCategory(isActive ? ALL_CATEGORY : cat)
                }
                className={cn(
                  "text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-150",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : `${getCategoryColor(cat)} hover:opacity-80`,
                )}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Results count */}
      {!isLoading && (
        <p className="text-sm text-muted-foreground mb-4">
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
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="space-y-3">
          {["a", "b", "c", "d", "e", "f"].map((k) => (
            <Skeleton key={k} className="h-20 w-full rounded-xl" />
          ))}
        </div>
      )}

      {/* Error state */}
      {isError && (
        <div className="text-center py-12">
          <p className="text-destructive font-medium">
            Failed to load additives database.
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Please refresh the page to try again.
          </p>
        </div>
      )}

      {/* Additives list */}
      {!isLoading && !isError && (
        <div className="space-y-2">
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <Search className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
              <p className="font-medium text-foreground">No additives found</p>
              <p className="text-sm text-muted-foreground mt-1">
                Try adjusting your search or filter.
              </p>
            </div>
          ) : (
            filtered.map((additive) => {
              const concernLevel = getConcernLevel(additive.healthEffects);
              const concernClasses = getConcernClasses(concernLevel);
              const categoryColor = getCategoryColor(additive.category);

              return (
                <button
                  type="button"
                  key={Number(additive.id)}
                  onClick={() => setSelectedAdditive(additive)}
                  className="w-full text-left bg-card hover:bg-accent/50 border border-border rounded-xl p-4 transition-all duration-150 hover:shadow-card group animate-fade-in"
                >
                  <div className="flex items-center gap-3">
                    {/* Concern indicator dot */}
                    <div
                      className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                        concernLevel === "high"
                          ? "bg-high"
                          : concernLevel === "moderate"
                            ? "bg-moderate"
                            : "bg-safe"
                      }`}
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm text-foreground truncate">
                          {additive.name}
                        </span>
                        {additive.eNumber && (
                          <span className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded-sm flex-shrink-0">
                            <FlaskConical className="w-3 h-3" />
                            {additive.eNumber}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-sm ${categoryColor}`}
                        >
                          {additive.category}
                        </span>
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full ${concernClasses}`}
                        >
                          {concernLevel === "high"
                            ? "High Concern"
                            : concernLevel === "moderate"
                              ? "Moderate"
                              : "Safe"}
                        </span>
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
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
        <DialogContent className="max-w-lg max-h-[85vh] flex flex-col p-0 gap-0">
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-border flex-shrink-0">
            <DialogTitle className="font-display text-lg">
              Additive Details
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="flex-1 overflow-auto">
            <div className="px-6 py-5">
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
