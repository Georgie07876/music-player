import type { AudiusResponse } from "~/utils/tracks";

export function useSearch(query: MaybeRefOrGetter<string>) {
  const config = useRuntimeConfig();

  const fetchOptions = computed(() => {
    return {
      public_Key: config.public.audiusKey,
      query: toValue(query),
    };
  });
  const {
    data: raw,
    pending,
    error,
  } = useFetch<AudiusResponse<unknown[]>>(
    "https://api.audius.co/v1/tracks/search",
    {
      query: fetchOptions,
    },
  );

  const tracks = computed(() => (raw.value?.data ?? []).map(toTrack));
  return { tracks, pending, error };
}
