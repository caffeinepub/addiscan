import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Additive } from '../backend';

export function useGetAllAdditives() {
  const { actor, isFetching } = useActor();

  return useQuery<Additive[]>({
    queryKey: ['additives', 'all'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllAdditives();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useSearchAdditivesByName(searchTerm: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Additive[]>({
    queryKey: ['additives', 'search', searchTerm],
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
    queryKey: ['additives', 'category', category],
    queryFn: async () => {
      if (!actor) return [];
      if (!category || category === 'all') return actor.getAllAdditives();
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
      if (!actor) throw new Error('Backend not available');
      return actor.parseIngredients(ingredientsText);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scan'] });
    },
  });
}
