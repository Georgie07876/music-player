import type { AudiusResponse } from "~/utils/tracks";

export function useTrack(id: MaybeRefOrGetter<string>) {
  const {
    data: raw,
    pending,
    error,
  } = useFetch<AudiusResponse<unknown>>(() => `/api/tracks/${toValue(id)}`);

  const track = computed(() => {
    const item = raw.value?.data;
    return item ? toTrack(item) : null;
  });
  return { track, pending, error };
}
