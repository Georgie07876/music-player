import type { ApiResponse } from "#shared/types/api";
import type { Track } from "#shared/types/track";

export function useTracks() {
  const { data, pending, error } =
    useFetch<ApiResponse<Track[]>>("/api/trending");

  const tracks = computed(() => data.value?.data ?? []);

  return { tracks, pending, error };
}
