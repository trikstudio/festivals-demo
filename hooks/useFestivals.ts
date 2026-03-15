import { useQuery } from "@tanstack/react-query";

import { fetchFestival, fetchFestivals } from "@/api/festivals";

export function useFestivals() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["festivals"],
    queryFn: fetchFestivals,
  });

  return { festivals: data, error, isLoading };
}

export function useFestivalDetail(id: string) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["festival", id],
    queryFn: () => fetchFestival(id),
  });

  return { festival: data, error, isLoading };
}
