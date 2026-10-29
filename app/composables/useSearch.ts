import type { ApiResponse } from "#shared/types/api";
import type { Track } from "#shared/types/track";

export function useSearch(query: MaybeRefOrGetter<string>) {
  const fetchOptions = computed(() => ({ query: toValue(query) }));

  const { data, pending, error } = useFetch<ApiResponse<Track[]>>(
    "/api/search",
    {
      query: fetchOptions,
    },
  );

  const tracks = computed(() => data.value?.data ?? []);
  return { tracks, pending, error };
}
