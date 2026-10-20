import type { AudiusResponse } from "~/utils/tracks";

export function useTracks() {
  const {
    data: raw,
    pending,
    error,
  } = useFetch<AudiusResponse<unknown[]>>("/api/trending");

  const tracks = computed(() => {
    const list = raw.value?.data ?? [];
    return list.map(toTrack);
  });
  return { tracks, pending, error };
}
