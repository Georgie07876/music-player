import type { AudiusResponse } from "~/utils/tracks";

export function useTrack(id: MaybeRefOrGetter<string>) {
  const config = useRuntimeConfig();

  const {
    data: raw,
    pending,
    error,
  } = useFetch<AudiusResponse<unknown>>(
    () => `https://api.audius.co/v1/tracks/${toValue(id)}`,
    {
      query: {
        public_Key: config.public.audiusKey,
      },
    },
  );
  const track = computed(() => {
    const item = raw.value?.data;
    return item ? toTrack(item) : null;
  });
  return { track, pending, error };
}
