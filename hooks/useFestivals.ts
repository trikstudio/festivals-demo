import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { fetchFestival, fetchFestivals } from '@/api/festivals';

export const festivalsQueryKey = ['festivals'];

export function useFestivals() {
  const query = useQuery({
    queryKey: festivalsQueryKey,
    queryFn: fetchFestivals,
  });

  useEffect(() => {
    console.log('[festivals-flow] list:state', {
      isLoading: query.isLoading,
      isError: query.isError,
      count: query.data?.length ?? 0,
    });
  }, [query.isLoading, query.isError, query.data]);

  if (query.error) {
    console.error('[festivals-flow] list:error', query.error);
  }

  return query;
}

export function useFestival(id?: string) {
  const query = useQuery({
    queryKey: ['festival', id],
    queryFn: () => fetchFestival(id ?? ''),
    enabled: Boolean(id),
  });

  useEffect(() => {
    console.log('[festivals-flow] detail:state', {
      id: id ?? null,
      enabled: Boolean(id),
      isLoading: query.isLoading,
      isError: query.isError,
      festivalName: query.data?.name ?? null,
    });
  }, [id, query.isLoading, query.isError, query.data]);

  if (query.error) {
    console.error('[festivals-flow] detail:error', {
      id: id ?? null,
      error: query.error,
    });
  }

  return query;
}
