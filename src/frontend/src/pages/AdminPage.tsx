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
  Pencil,
  Plus,
  Settings2,
  ShieldAlert,
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

// ─── Types ──────────────────────────────────────────────────────────────────

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

// ─── Tag chip ────────────────────────────────────────────────────────────────

function TagChipList({
  raw,
  placeholder,
}: { raw: string; placeholder?: string }) {
  const tags = parseCommaSeparated(raw);
  if (!raw.trim()) {
    return (
      <span className="text-muted-foreground text-xs italic">
        {placeholder ?? "none"}
      </span>
    );
  }
  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-block text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-md"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

// ─── Form Dialog ─────────────────────────────────────────────────────────────

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

  // Keep form in sync when editTarget changes
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
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-lg flex items-center gap-2">
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
          <DialogDescription>
            {editTarget
              ? `Editing "${editTarget.name}". Changes will be saved to the database.`
              : "Fill in the fields below to add a new additive to the database."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          {/* Name */}
          <div className="space-y-1.5">
            <Label htmlFor="admin-name">
              Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="admin-name"
              data-ocid="admin.form.name_input"
              value={form.name}
              onChange={field("name")}
              placeholder="e.g. Sodium Benzoate"
              className={cn(errors.name && "border-destructive")}
              autoFocus
            />
            {errors.name && (
              <p className="text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.name}
              </p>
            )}
          </div>

          {/* E-Number + Category row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="admin-enumber">E-Number</Label>
              <Input
                id="admin-enumber"
                data-ocid="admin.form.enumber_input"
                value={form.eNumber}
                onChange={field("eNumber")}
                placeholder="e.g. E211"
                className="font-mono"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="admin-category">
                Category <span className="text-destructive">*</span>
              </Label>
              <Input
                id="admin-category"
                data-ocid="admin.form.category_input"
                value={form.category}
                onChange={field("category")}
                placeholder="e.g. Preservative"
                className={cn(errors.category && "border-destructive")}
              />
              {errors.category && (
                <p className="text-xs text-destructive flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.category}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="admin-description">
              Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="admin-description"
              data-ocid="admin.form.description_textarea"
              value={form.description}
              onChange={field("description")}
              placeholder="What is this additive and what does it do?"
              rows={3}
              className={cn(errors.description && "border-destructive")}
            />
            {errors.description && (
              <p className="text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.description}
              </p>
            )}
          </div>

          {/* Health Effects */}
          <div className="space-y-1.5">
            <Label htmlFor="admin-health">
              Health Effects <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="admin-health"
              data-ocid="admin.form.health_effects_textarea"
              value={form.healthEffects}
              onChange={field("healthEffects")}
              placeholder="Describe known health effects, concerns, or safety information…"
              rows={3}
              className={cn(errors.healthEffects && "border-destructive")}
            />
            {errors.healthEffects && (
              <p className="text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.healthEffects}
              </p>
            )}
          </div>

          {/* Common Products */}
          <div className="space-y-1.5">
            <Label htmlFor="admin-common-products">Common Products</Label>
            <Input
              id="admin-common-products"
              data-ocid="admin.form.common_products_input"
              value={form.commonProductsRaw}
              onChange={field("commonProductsRaw")}
              placeholder="Soft drinks, Bread, Salad dressings (comma-separated)"
            />
            {form.commonProductsRaw.trim() && (
              <div className="pt-1">
                <TagChipList raw={form.commonProductsRaw} />
              </div>
            )}
          </div>

          {/* Alternatives */}
          <div className="space-y-1.5">
            <Label
              htmlFor="admin-alternatives"
              className="flex items-center gap-1.5"
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
            />
            {form.alternativesRaw.trim() && (
              <div className="pt-1">
                <TagChipList raw={form.alternativesRaw} />
              </div>
            )}
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
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              data-ocid="admin.form.submit_button"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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

// ─── Delete Confirmation Dialog ───────────────────────────────────────────────

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
      <DialogContent data-ocid="admin.delete_dialog" className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive font-display">
            <ShieldAlert className="w-5 h-5" />
            Delete Additive
          </DialogTitle>
          <DialogDescription className="pt-1">
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
            data-ocid="admin.delete_dialog.cancel_button"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={deleteMutation.isPending}
            data-ocid="admin.delete_dialog.confirm_button"
          >
            {deleteMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting…
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
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
      {/* Page header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            <Settings2 className="w-4 h-4" />
            Admin
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-2">
            Manage Additives
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed max-w-xl">
            Add, edit, or remove food additives from the database. Changes are
            reflected immediately across the app.
          </p>
        </div>
        <Button
          onClick={openAddForm}
          size="lg"
          className="flex-shrink-0 gap-2"
          data-ocid="admin.add_button"
        >
          <Plus className="w-4 h-4" />
          Add Additive
        </Button>
      </div>

      {/* Loading */}
      {isLoading && (
        <div
          data-ocid="admin.loading_state"
          className="space-y-3 bg-card rounded-2xl border border-border p-4"
        >
          {["a", "b", "c", "d", "e", "f"].map((k) => (
            <Skeleton key={k} className="h-14 w-full rounded-lg" />
          ))}
        </div>
      )}

      {/* Error */}
      {isError && !isLoading && (
        <div
          data-ocid="admin.error_state"
          className="rounded-2xl border border-destructive/30 bg-destructive/5 p-8 text-center"
        >
          <AlertCircle className="w-10 h-10 text-destructive/60 mx-auto mb-3" />
          <p className="font-semibold text-destructive">
            Failed to load additives.
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Check your connection and refresh the page.
          </p>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !isError && additives.length === 0 && (
        <div
          data-ocid="admin.empty_state"
          className="rounded-2xl border border-dashed border-border bg-card p-12 text-center"
        >
          <FlaskConical className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="font-semibold text-foreground mb-1">No additives yet</p>
          <p className="text-sm text-muted-foreground mb-6">
            Add your first food additive to get started.
          </p>
          <Button
            onClick={openAddForm}
            variant="outline"
            data-ocid="admin.add_button"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add First Additive
          </Button>
        </div>
      )}

      {/* Table */}
      {!isLoading && !isError && additives.length > 0 && (
        <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">
              {additives.length} additive{additives.length !== 1 ? "s" : ""} in
              database
            </span>
          </div>

          <div className="overflow-x-auto">
            <Table data-ocid="admin.table">
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[200px]">Name</TableHead>
                  <TableHead className="w-[100px]">E-Number</TableHead>
                  <TableHead className="w-[130px]">Category</TableHead>
                  <TableHead>Common Products</TableHead>
                  <TableHead>Alternatives</TableHead>
                  <TableHead className="w-[110px] text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {additives.map((additive, index) => (
                  <TableRow
                    key={Number(additive.id)}
                    data-ocid={`admin.item.${index + 1}`}
                    className="group"
                  >
                    <TableCell className="font-medium text-foreground">
                      {additive.name}
                    </TableCell>
                    <TableCell>
                      {additive.eNumber ? (
                        <span className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded-md">
                          <FlaskConical className="w-3 h-3" />
                          {additive.eNumber}
                        </span>
                      ) : (
                        <span className="text-muted-foreground text-xs">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={cn(
                          "text-xs font-medium",
                          getCategoryColor(additive.category),
                        )}
                      >
                        {additive.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-[160px]">
                      {additive.commonProducts.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {additive.commonProducts.slice(0, 2).map((p) => (
                            <span
                              key={p}
                              className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-sm"
                            >
                              {p}
                            </span>
                          ))}
                          {additive.commonProducts.length > 2 && (
                            <span className="text-xs text-muted-foreground">
                              +{additive.commonProducts.length - 2}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-xs">—</span>
                      )}
                    </TableCell>
                    <TableCell className="max-w-[160px]">
                      {additive.alternatives.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {additive.alternatives.slice(0, 2).map((alt) => (
                            <span
                              key={alt}
                              className="text-xs bg-safe/10 text-safe-fg px-2 py-0.5 rounded-sm"
                            >
                              {alt}
                            </span>
                          ))}
                          {additive.alternatives.length > 2 && (
                            <span className="text-xs text-muted-foreground">
                              +{additive.alternatives.length - 2}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-xs">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditForm(additive)}
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          data-ocid={`admin.edit_button.${index + 1}`}
                          aria-label={`Edit ${additive.name}`}
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteTarget(additive)}
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
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
