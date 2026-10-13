import type { Track } from "~/utils/mock-tracks";

export const usePlayerStore = defineStore("player", {
  state: () => ({
    currentTrack: null as Track | null,
    isPlaying: false,
    queue: <Track[]>[],
    volume: 0.8,
    muted: false,
    sourceErrorCode: null as number | null,
  }),
  actions: {
    playTrack(track: Track, list?: Track[]) {
      this.sourceErrorCode = null;
      this.queue = list ? [...list] : [track];
      this.currentTrack = track;
      this.isPlaying = true;
    },
    pause() {
      this.isPlaying = false;
    },
    togglePlay() {
      if (this.isPlaying) {
        this.isPlaying = false;
      } else {
        this.isPlaying = true;
      }
    },
    setVolume(value: number) {
      this.volume = value;
    },
    toggleMute() {
      if (this.muted) {
        this.muted = false;
      } else {
        this.muted = true;
      }
    },
    unmute() {
      this.muted = false;
    },
    next() {
      const index = this.queue.findIndex((t) => t.id === this.currentTrack?.id);
      if (index === -1) return;
      const target = this.queue[(index + 1) % this.queue.length];
      if (!target) return;
      this.playTrack(target, this.queue);
    },
    prev() {
      const index = this.queue.findIndex((t) => t.id === this.currentTrack?.id);
      if (index === -1) return;
      const target =
        this.queue[(index - 1 + this.queue.length) % this.queue.length];
      if (!target) return;
      this.playTrack(target, this.queue);
    },
    handleEnded() {
      this.next();
    },
    handleSourceError(code: number | null) {
      if (code === 1) return;
      this.pause();
      this.sourceErrorCode = code;
    },
  },
});
