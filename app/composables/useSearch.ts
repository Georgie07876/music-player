import type { AudiusResponse } from "~/utils/tracks";

export function useSearch(query: MaybeRefOrGetter<string>) {
  const fetchOptions = computed(() => ({ query: toValue(query) }));

  const {
    data: raw,
    pending,
    error,
  } = useFetch<AudiusResponse<unknown[]>>("/api/search", {
    query: fetchOptions,
  });

  const tracks = computed(() => (raw.value?.data ?? []).map(toTrack));
  return { tracks, pending, error };
}
