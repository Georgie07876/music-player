export function useTracks() {
  const config = useRuntimeConfig();
  const {
    data: raw,
    pending,
    error,
  } = useFetch<AudiusListResponse>("https://api.audius.co/v1/tracks/trending", {
    query: {
      public_Key: config.public.audiusKey,
    },
  });

  const tracks = computed(() => {
    const list = raw.value?.data ?? [];
    return list.map(toTrack);
  });
  return { tracks, pending, error };
}
