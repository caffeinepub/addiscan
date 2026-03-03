import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  FlaskConical,
  Leaf,
  Loader2,
  OctagonAlert,
  Pencil,
  Plus,
  Settings2,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Additive } from "../backend";
import {
  useAddAdditive,
  useDeleteAdditive,
  useGetAllAdditives,
  useUpdateAdditive,
} from "../hooks/useQueries";
import { getCategoryColor } from "../lib/additive-utils";
import { cn } from "../lib/utils";

const CATEGORIES = [
  "Preservative",
  "Colorant",
  "Flavor Enhancer",
  "Sweetener",
  "Thickener",
  "Antioxidant",
  "Emulsifier",
  "Other",
];

// ─── Types ───────────────────────────────────────────────────────────────────

interface AdditiveFormData {
  name: string;
  eNumber: string;
  category: string;
  description: string;
  healthEffects: string;
  commonProductsRaw: string;
  alternativesRaw: string;
}

const emptyForm = (): AdditiveFormData => ({
  name: "",
  eNumber: "",
  category: "",
  description: "",
  healthEffects: "",
  commonProductsRaw: "",
  alternativesRaw: "",
});

function additiveToForm(a: Additive): AdditiveFormData {
  return {
    name: a.name,
    eNumber: a.eNumber ?? "",
    category: a.category,
    description: a.description,
    healthEffects: a.healthEffects,
    commonProductsRaw: a.commonProducts.join(", "),
    alternativesRaw: a.alternatives.join(", "),
  };
}

function parseCommaSeparated(raw: string): string[] {
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

// ─── Tag Preview ──────────────────────────────────────────────────────────────

function TagPreview({ raw }: { raw: string }) {
  const tags = parseCommaSeparated(raw);
  if (!raw.trim()) return null;
  return (
    <div className="flex flex-wrap gap-1 mt-1.5">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-block text-xs bg-muted/50 text-muted-foreground px-2 py-0.5 rounded-sm"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

// ─── Form Dialog ──────────────────────────────────────────────────────────────

interface FormDialogProps {
  open: boolean;
  onClose: () => void;
  editTarget: Additive | null;
}

function FormDialog({ open, onClose, editTarget }: FormDialogProps) {
  const [form, setForm] = useState<AdditiveFormData>(
    editTarget ? additiveToForm(editTarget) : emptyForm(),
  );
  const [errors, setErrors] = useState<
    Partial<Record<keyof AdditiveFormData, string>>
  >({});

  const addMutation = useAddAdditive();
  const updateMutation = useUpdateAdditive();
  const isPending = addMutation.isPending || updateMutation.isPending;
  const key = editTarget ? String(editTarget.id) : "new";

  function validate(): boolean {
    const newErrors: typeof errors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.category.trim()) newErrors.category = "Category is required.";
    if (!form.description.trim())
      newErrors.description = "Description is required.";
    if (!form.healthEffects.trim())
      newErrors.healthEffects = "Health effects are required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function field(name: keyof AdditiveFormData) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [name]: e.target.value }));
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      name: form.name.trim(),
      eNumber: form.eNumber.trim() || null,
      category: form.category.trim(),
      description: form.description.trim(),
      healthEffects: form.healthEffects.trim(),
      commonProducts: parseCommaSeparated(form.commonProductsRaw),
      alternatives: parseCommaSeparated(form.alternativesRaw),
    };

    try {
      if (editTarget) {
        await updateMutation.mutateAsync({ ...payload, id: editTarget.id });
        toast.success(`"${payload.name}" updated successfully.`);
      } else {
        await addMutation.mutateAsync(payload);
        toast.success(`"${payload.name}" added to the database.`);
      }
      onClose();
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()} key={key}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-display text-base flex items-center gap-2">
            {editTarget ? (
              <>
                <Pencil className="w-4 h-4 text-primary" />
                Edit Additive
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 text-primary" />
                Add New Additive
              </>
            )}
          </DialogTitle>
          <DialogDescription className="text-xs">
            {editTarget
              ? `Editing "${editTarget.name}". Changes are reflected immediately.`
              : "Fill in the details below to add a new additive to the database."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          {/* Name */}
          <div className="space-y-1.5">
            <Label htmlFor="admin-name" className="text-xs font-semibold">
              Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="admin-name"
              data-ocid="admin.form.name_input"
              value={form.name}
              onChange={field("name")}
              placeholder="e.g. Sodium Benzoate"
              className={cn(
                "text-sm bg-background/50",
                errors.name &&
                  "border-destructive focus-visible:ring-destructive",
              )}
              autoFocus
            />
            {errors.name && (
              <p className="text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.name}
              </p>
            )}
          </div>

          {/* E-Number + Category */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="admin-enumber" className="text-xs font-semibold">
                E-Number
              </Label>
              <Input
                id="admin-enumber"
                data-ocid="admin.form.enumber_input"
                value={form.eNumber}
                onChange={field("eNumber")}
                placeholder="e.g. E211"
                className="font-mono text-sm bg-background/50"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="admin-category" className="text-xs font-semibold">
                Category <span className="text-destructive">*</span>
              </Label>
              <Select
                value={form.category}
                onValueChange={(val) => {
                  setForm((prev) => ({ ...prev, category: val }));
                  if (errors.category)
                    setErrors((prev) => ({ ...prev, category: undefined }));
                }}
              >
                <SelectTrigger
                  id="admin-category"
                  data-ocid="admin.form.category_select"
                  className={cn(
                    "text-sm bg-background/50",
                    errors.category && "border-destructive",
                  )}
                >
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat} className="text-sm">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-xs text-destructive flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.category}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label
              htmlFor="admin-description"
              className="text-xs font-semibold"
            >
              Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="admin-description"
              data-ocid="admin.form.description_textarea"
              value={form.description}
              onChange={field("description")}
              placeholder="What is this additive and what does it do?"
              rows={3}
              className={cn(
                "text-sm resize-none bg-background/50",
                errors.description && "border-destructive",
              )}
            />
            {errors.description && (
              <p className="text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.description}
              </p>
            )}
          </div>

          {/* Health Effects */}
          <div className="space-y-1.5">
            <Label htmlFor="admin-health" className="text-xs font-semibold">
              Health Effects <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="admin-health"
              data-ocid="admin.form.healtheffects_textarea"
              value={form.healthEffects}
              onChange={field("healthEffects")}
              placeholder="Describe known health effects, concerns, or safety information…"
              rows={3}
              className={cn(
                "text-sm resize-none bg-background/50",
                errors.healthEffects && "border-destructive",
              )}
            />
            {errors.healthEffects && (
              <p className="text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.healthEffects}
              </p>
            )}
          </div>

          {/* Common Products */}
          <div className="space-y-1.5">
            <Label
              htmlFor="admin-common-products"
              className="text-xs font-semibold"
            >
              Common Products
            </Label>
            <Input
              id="admin-common-products"
              data-ocid="admin.form.commonproducts_input"
              value={form.commonProductsRaw}
              onChange={field("commonProductsRaw")}
              placeholder="Soft drinks, Bread, Pickles (comma-separated)"
              className="text-sm bg-background/50"
            />
            <TagPreview raw={form.commonProductsRaw} />
          </div>

          {/* Alternatives */}
          <div className="space-y-1.5">
            <Label
              htmlFor="admin-alternatives"
              className="text-xs font-semibold flex items-center gap-1.5"
            >
              <Leaf className="w-3.5 h-3.5 text-safe" />
              Alternatives
            </Label>
            <Input
              id="admin-alternatives"
              data-ocid="admin.form.alternatives_input"
              value={form.alternativesRaw}
              onChange={field("alternativesRaw")}
              placeholder="Rosemary extract, Vitamin C, Sea salt (comma-separated)"
              className="text-sm bg-background/50"
            />
            <TagPreview raw={form.alternativesRaw} />
            <p className="text-xs text-muted-foreground">
              Natural or safer alternatives to this additive.
            </p>
          </div>

          <DialogFooter className="pt-2 gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isPending}
              data-ocid="admin.form.cancel_button"
              size="sm"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              data-ocid="admin.form.submit_button"
              size="sm"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                  {editTarget ? "Saving…" : "Adding…"}
                </>
              ) : editTarget ? (
                "Save Changes"
              ) : (
                "Add Additive"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Delete Confirmation ──────────────────────────────────────────────────────

interface DeleteDialogProps {
  target: Additive | null;
  onClose: () => void;
}

function DeleteDialog({ target, onClose }: DeleteDialogProps) {
  const deleteMutation = useDeleteAdditive();

  async function handleConfirm() {
    if (!target) return;
    try {
      await deleteMutation.mutateAsync(target.id);
      toast.success(`"${target.name}" removed from the database.`);
      onClose();
    } catch {
      toast.error("Failed to delete. Please try again.");
    }
  }

  return (
    <Dialog open={!!target} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        data-ocid="admin.dialog"
        className="max-w-sm bg-card border-border"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive font-display text-base">
            <OctagonAlert className="w-4 h-4" />
            Delete Additive
          </DialogTitle>
          <DialogDescription className="text-xs pt-1">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-foreground">
              "{target?.name}"
            </span>
            ? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 pt-2">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={deleteMutation.isPending}
            data-ocid="admin.delete_cancel_button"
            size="sm"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={deleteMutation.isPending}
            data-ocid="admin.delete_confirm_button"
            size="sm"
          >
            {deleteMutation.isPending ? (
              <>
                <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                Deleting…
              </>
            ) : (
              <>
                <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                Delete
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Admin Page ───────────────────────────────────────────────────────────────

export function AdminPage() {
  const { data: additives = [], isLoading, isError } = useGetAllAdditives();
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Additive | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Additive | null>(null);

  function openAddForm() {
    setEditTarget(null);
    setFormOpen(true);
  }

  function openEditForm(additive: Additive) {
    setEditTarget(additive);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditTarget(null);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-7 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mb-4">
            <Settings2 className="w-3.5 h-3.5" />
            Admin
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-2 tracking-tight">
            Manage Additives
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
            Add, edit, or remove food additives. Changes are reflected
            immediately across the app.
          </p>
        </div>
        <Button
          onClick={openAddForm}
          size="sm"
          className="gap-1.5 flex-shrink-0"
          data-ocid="admin.add_button"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Additive
        </Button>
      </div>

      {/* Loading */}
      {isLoading && (
        <div
          data-ocid="admin.loading_state"
          className="space-y-2 bg-card rounded-xl border border-border p-4"
        >
          {["a", "b", "c", "d", "e", "f"].map((k) => (
            <Skeleton key={k} className="h-12 w-full rounded-md" />
          ))}
        </div>
      )}

      {/* Error */}
      {isError && !isLoading && (
        <div
          data-ocid="admin.error_state"
          className="rounded-xl border border-destructive/20 bg-destructive/5 p-8 text-center"
        >
          <AlertCircle className="w-8 h-8 text-destructive/50 mx-auto mb-3" />
          <p className="font-semibold text-sm text-destructive mb-1">
            Failed to load additives
          </p>
          <p className="text-xs text-muted-foreground">
            Check your connection and refresh the page.
          </p>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !isError && additives.length === 0 && (
        <div
          data-ocid="admin.empty_state"
          className="rounded-xl border border-dashed border-border bg-card p-12 text-center"
        >
          <FlaskConical className="w-10 h-10 text-muted-foreground/20 mx-auto mb-4" />
          <p className="font-semibold text-sm text-foreground mb-1">
            No additives yet
          </p>
          <p className="text-xs text-muted-foreground mb-5">
            Add your first food additive to get started.
          </p>
          <Button
            onClick={openAddForm}
            variant="outline"
            size="sm"
            data-ocid="admin.add_button"
          >
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            Add First Additive
          </Button>
        </div>
      )}

      {/* Table */}
      {!isLoading && !isError && additives.length > 0 && (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-3 border-b border-border/60 flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              {additives.length} additive{additives.length !== 1 ? "s" : ""} in
              database
            </span>
          </div>

          <div className="overflow-x-auto">
            <Table data-ocid="admin.list">
              <TableHeader>
                <TableRow className="hover:bg-transparent border-border/60">
                  <TableHead className="text-xs w-[180px]">Name</TableHead>
                  <TableHead className="text-xs w-[90px]">E-Number</TableHead>
                  <TableHead className="text-xs w-[120px]">Category</TableHead>
                  <TableHead className="text-xs">Common Products</TableHead>
                  <TableHead className="text-xs">Alternatives</TableHead>
                  <TableHead className="text-xs w-[80px] text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {additives.map((additive, index) => (
                  <TableRow
                    key={Number(additive.id)}
                    data-ocid={`admin.item.${index + 1}`}
                    className="group border-border/40"
                  >
                    <TableCell className="font-medium text-sm text-foreground py-3">
                      {additive.name}
                    </TableCell>
                    <TableCell className="py-3">
                      {additive.eNumber ? (
                        <span className="inline-flex items-center gap-0.5 text-xs font-mono text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded-sm">
                          <FlaskConical className="w-2.5 h-2.5" />
                          {additive.eNumber}
                        </span>
                      ) : (
                        <span className="text-muted-foreground/40 text-xs">
                          —
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="py-3">
                      <Badge
                        variant="secondary"
                        className={cn(
                          "text-xs font-medium py-0.5",
                          getCategoryColor(additive.category),
                        )}
                      >
                        {additive.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-[160px] py-3">
                      {additive.commonProducts.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {additive.commonProducts.slice(0, 2).map((p) => (
                            <span
                              key={p}
                              className="text-xs bg-muted/40 text-muted-foreground px-1.5 py-0.5 rounded-sm"
                            >
                              {p}
                            </span>
                          ))}
                          {additive.commonProducts.length > 2 && (
                            <span className="text-xs text-muted-foreground/50">
                              +{additive.commonProducts.length - 2}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground/40 text-xs">
                          —
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="max-w-[160px] py-3">
                      {additive.alternatives.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {additive.alternatives.slice(0, 2).map((alt) => (
                            <span
                              key={alt}
                              className="text-xs concern-safe px-1.5 py-0.5 rounded-sm"
                            >
                              {alt}
                            </span>
                          ))}
                          {additive.alternatives.length > 2 && (
                            <span className="text-xs text-muted-foreground/50">
                              +{additive.alternatives.length - 2}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground/40 text-xs">
                          —
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right py-3">
                      <div className="flex items-center justify-end gap-0.5">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditForm(additive)}
                          className="h-7 w-7 text-muted-foreground hover:text-foreground"
                          data-ocid={`admin.edit_button.${index + 1}`}
                          aria-label={`Edit ${additive.name}`}
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteTarget(additive)}
                          className="h-7 w-7 text-muted-foreground hover:text-destructive"
                          data-ocid={`admin.delete_button.${index + 1}`}
                          aria-label={`Delete ${additive.name}`}
                        >
                          <X className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {/* Form dialog */}
      <FormDialog open={formOpen} onClose={closeForm} editTarget={editTarget} />

      {/* Delete dialog */}
      <DeleteDialog
        target={deleteTarget}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
}
