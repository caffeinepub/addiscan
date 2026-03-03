import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Additive } from "../backend";
import { DEFAULT_ADDITIVES } from "../lib/seed-data";
import { useActor } from "./useActor";

export function useGetAllAdditives() {
  const { actor, isFetching } = useActor();

  return useQuery<Additive[]>({
    queryKey: ["additives", "all"],
    queryFn: async () => {
      if (!actor) return [];
      let all = await actor.getAllAdditives();

      // Auto-seed if the database is empty
      if (all.length === 0) {
        await Promise.all(
          DEFAULT_ADDITIVES.map((a) =>
            actor.addAdditive(
              a.name,
              a.eNumber,
              a.category,
              a.description,
              a.healthEffects,
              a.commonProducts,
              a.alternatives,
            ),
          ),
        );
        all = await actor.getAllAdditives();
      }

      return all;
    },
    enabled: !!actor && !isFetching,
    staleTime: 0,
    gcTime: 0,
  });
}

export function useSearchAdditivesByName(searchTerm: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Additive[]>({
    queryKey: ["additives", "search", searchTerm],
    queryFn: async () => {
      if (!actor) return [];
      if (!searchTerm.trim()) return actor.getAllAdditives();
      return actor.searchAdditivesByName(searchTerm);
    },
    enabled: !!actor && !isFetching,
    staleTime: 2 * 60 * 1000,
  });
}

export function useFilterAdditivesByCategory(category: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Additive[]>({
    queryKey: ["additives", "category", category],
    queryFn: async () => {
      if (!actor) return [];
      if (!category || category === "all") return actor.getAllAdditives();
      return actor.filterAdditivesByCategory(category);
    },
    enabled: !!actor && !isFetching,
    staleTime: 2 * 60 * 1000,
  });
}

export function useParseIngredients() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation<Additive[], Error, string>({
    mutationFn: async (ingredientsText: string) => {
      if (!actor) throw new Error("Backend not available");
      return actor.parseIngredients(ingredientsText);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scan"] });
    },
  });
}

interface AddAdditiveInput {
  name: string;
  eNumber: string | null;
  category: string;
  description: string;
  healthEffects: string;
  commonProducts: string[];
  alternatives: string[];
}

interface UpdateAdditiveInput extends AddAdditiveInput {
  id: bigint;
}

export function useAddAdditive() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation<bigint, Error, AddAdditiveInput>({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Backend not available");
      return actor.addAdditive(
        input.name,
        input.eNumber,
        input.category,
        input.description,
        input.healthEffects,
        input.commonProducts,
        input.alternatives,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["additives"] });
    },
  });
}

export function useUpdateAdditive() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation<boolean, Error, UpdateAdditiveInput>({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Backend not available");
      return actor.updateAdditive(
        input.id,
        input.name,
        input.eNumber,
        input.category,
        input.description,
        input.healthEffects,
        input.commonProducts,
        input.alternatives,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["additives"] });
    },
  });
}

export function useDeleteAdditive() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation<boolean, Error, bigint>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Backend not available");
      return actor.deleteAdditive(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["additives"] });
    },
  });
}
