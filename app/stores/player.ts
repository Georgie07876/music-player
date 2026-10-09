import type { Track } from "~/utils/mock-tracks";

export const usePlayerStore = defineStore("player", {
  state: () => ({
    currentTrack: null as Track | null,
    isPlaying: false,
    queue: <Track[]>[],
    volume: 0.8,
    muted: false,
  }),
  actions: {
    playTrack(track: Track) {
      this.currentTrack = track;
      this.isPlaying = true;
      if (!this.queue.some((item) => item.id === track.id)) {
        this.queue.push(track);
      }
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
  },
});
