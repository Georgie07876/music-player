const noAudio = {
  currentTime: ref(0),
  duration: ref(0),
  seek: (time: number) => {
    void time;
  },
};

export function useAudio() {
  const { $audio } = useNuxtApp();
  return $audio ?? noAudio;
}
