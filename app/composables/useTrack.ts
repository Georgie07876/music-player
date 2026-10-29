import type { ApiResponse } from "#shared/types/api";
import type { Track } from "#shared/types/track";

export function useTrack(id: MaybeRefOrGetter<string>) {
  const { data, pending, error } = useFetch<ApiResponse<Track>>(
    () => `/api/tracks/${toValue(id)}`,
  );

  const track = computed(() => data.value?.data ?? null);
  return { track, pending, error };
}
