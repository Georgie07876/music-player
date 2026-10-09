let audioEl: HTMLAudioElement | null = null;
const currentTime = ref(0);
const duration = ref(0);

function streamUrl(id: string) {
  return `https://api.audius.co/v1/tracks/${id}/stream`;
}

export function useAudio() {
  function seek(time: number) {
    if (audioEl === null) {
      return;
    }

    audioEl.currentTime = time;
    currentTime.value = audioEl.currentTime;
  }
  if (import.meta.client && audioEl === null) {
    const el = new Audio();
    audioEl = el;
    const store = usePlayerStore();
    el.volume = store.volume;
    el.muted = store.muted;

    el.addEventListener("play", () => {
      store.isPlaying = true;
    });
    el.addEventListener("pause", () => {
      store.isPlaying = false;
    });
    el.addEventListener("volumechange", () => {
      store.volume = el.volume;
      store.muted = el.muted;
    });
    el.addEventListener("timeupdate", () => {
      currentTime.value = el.currentTime;
    });
    el.addEventListener("loadedmetadata", () => {
      duration.value = el.duration;
    });
    el.addEventListener("durationchange", () => {
      duration.value = el.duration;
    });

    async function playWithRetry(limit = 3) {
      for (let attempt = 1; attempt <= limit; attempt++) {
        try {
          await el.play();
          return;
        } catch (error) {
          if (error instanceof DOMException && error.name === "AbortError") {
            return;
          }
          if (
            error instanceof DOMException &&
            error.name === "NotAllowedError"
          ) {
            store.pause();
            return;
          }
          if (attempt === limit) {
            store.pause();
            return;
          }
          await new Promise((resolve) => setTimeout(resolve, 500));
          el.load();
        }
      }
    }

    function startPlayback() {
      if (store.isPlaying) {
        playWithRetry();
      } else {
        el.pause();
      }
    }

    watch(() => store.isPlaying, startPlayback);

    watch(
      () => store.currentTrack,
      () => {
        if (store.currentTrack === null) {
          return;
        }
        el.src = streamUrl(store.currentTrack.id);
        startPlayback();
      },
    );
    watch(
      () => store.volume,
      () => {
        el.volume = store.volume;
      },
    );
    watch(
      () => store.muted,
      () => {
        el.muted = store.muted;
      },
    );
  }
  return { currentTime, duration, seek };
}
