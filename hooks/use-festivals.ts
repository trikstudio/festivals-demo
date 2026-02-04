import { useQuery } from '@tanstack/react-query';

import { fetchFestival, fetchFestivals } from '@/lib/festivals';

export const festivalsQueryKey = ['festivals'];

export function useFestivals() {
  return useQuery({
    queryKey: festivalsQueryKey,
    queryFn: fetchFestivals,
  });
}

export function useFestival(id?: string) {
  return useQuery({
    queryKey: ['festival', id],
    queryFn: () => fetchFestival(id ?? ''),
    enabled: Boolean(id),
  });
}
