<template>
  <div class="global-player">
    <div class="global-player__top">
      <div v-if="playerStore.currentTrack" class="global-player__now">
        <span class="global-player__title">{{
          playerStore.currentTrack?.title
        }}</span>
        <span class="global-player__artist">{{
          playerStore.currentTrack?.artist
        }}</span>
      </div>
      <div class="global-player__error">
        <ErrorTooltip :code="playerStore.sourceErrorCode" />
      </div>

      <PlayerControls class="global-player__controls" />
    </div>

    <div class="global-player__row">
      <div class="global-player__volume">
        <IconButton
          size="small"
          :name-icon="playerStore.muted ? 'mdi:volume-off' : 'mdi:volume-high'"
          :label="playerStore.muted ? 'Unmute' : 'Mute'"
          @click="playerStore.toggleMute()"
        >
        </IconButton>

        <input
          class="global-player__volume-range"
          type="range"
          min="0"
          max="1"
          step="0.01"
          :value="playerStore.muted ? 0 : playerStore.volume"
          aria-label="Volume"
          @input="onVolumeInput"
        />
      </div>

      <div class="global-player__time">
        <input
          class="global-player__timeline"
          type="range"
          min="0"
          :max="maxTime"
          step="any"
          :value="currentTime"
          :style="{ '--fill': fillPercent + '%' }"
          @input="onSeekInput"
        />
        <span class="global-player__time-value">
          {{ formatDuration(currentTime) }}/{{ durationLabel }}</span
        >
      </div>

      <FavoriteButton :is-favorite="isFavorite" @toggle="toggleFavorite" />
    </div>
  </div>
</template>

<script setup lang="ts">
const playerStore = usePlayerStore();
const favoritesStore = useFavoritesStore();
const { duration, currentTime, seek } = useAudio();

const isFavorite = computed(() => {
  const track = playerStore.currentTrack;
  return track ? favoritesStore.isFavorite(track.id) : false;
});

function toggleFavorite() {
  const track = playerStore.currentTrack;
  if (track) {
    favoritesStore.toggle(track);
  }
}

function onVolumeInput(event: Event) {
  const input = event.target as HTMLInputElement;
  if (playerStore.muted) {
    playerStore.unmute();
  }
  playerStore.setVolume(Number(input.value));
}

function onSeekInput(event: Event) {
  const input = event.target as HTMLInputElement;
  seek(Number(input.value));
}

const maxTime = computed(() =>
  Number.isFinite(duration.value) && duration.value > 0 ? duration.value : 0,
);
const fillPercent = computed(() => {
  if (Number.isNaN(duration.value) || duration.value <= 0) {
    return 0;
  }
  return Math.min((currentTime.value / duration.value) * 100, 100);
});
const durationLabel = computed(() => {
  if (Number.isFinite(duration.value) && duration.value > 0) {
    return formatDuration(duration.value);
  } else {
    return "0:00";
  }
});
</script>

<style scoped>
.global-player {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 0.5rem;
  padding: 0.6rem 1.25rem;
  border-top: 1px solid #ddd;
  background: #fff;
}

.global-player__top {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 1rem;
}

.global-player__controls {
  grid-column: 2;
}

.global-player__now {
  display: grid;
  gap: 0.1rem;
  min-width: 0;
}

.global-player__title {
  overflow: hidden;
  font-size: 0.95rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.global-player__artist {
  overflow: hidden;
  color: #666;
  font-size: 0.8rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.global-player__row {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 0.75rem;
}

.global-player__volume {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
}

.global-player__volume-range {
  width: 0;
  min-width: 0;
  height: 1rem;
  margin: 0;
  padding: 0;
  border: none;
  opacity: 0;
  appearance: none;
  background: transparent;
  cursor: pointer;
  transition:
    width 0.2s ease,
    margin-left 0.2s ease,
    opacity 0.2s ease;
}

.global-player__volume:hover .global-player__volume-range,
.global-player__volume:focus-within .global-player__volume-range {
  width: 6rem;
  margin-left: 0.5rem;
  opacity: 1;
}

@media (hover: none) {
  .global-player__volume-range {
    width: 6rem;
    margin-left: 0.5rem;
    opacity: 1;
  }
}

.global-player__volume-range::-webkit-slider-runnable-track {
  height: 0.25rem;
  border-radius: 999px;
  background: #e8e8e8;
}

.global-player__volume-range::-webkit-slider-thumb {
  width: 0.75rem;
  height: 0.75rem;
  margin-top: -0.25rem;
  border: none;
  border-radius: 50%;
  appearance: none;
  background: #333;
}

.global-player__volume-range::-moz-range-track {
  height: 0.25rem;
  border-radius: 999px;
  background: #e8e8e8;
}

.global-player__volume-range::-moz-range-thumb {
  width: 0.75rem;
  height: 0.75rem;
  border: none;
  border-radius: 50%;
  background: #333;
}

.global-player__volume-range:focus-visible {
  outline: 2px solid #333;
  outline-offset: 2px;
}

.global-player__time {
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
}

.global-player__timeline {
  flex: 1 1 auto;
  min-width: 0;
  height: 1rem;
  margin: 0;
  padding: 0;
  border: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
}

.global-player__timeline::-webkit-slider-runnable-track {
  height: 0.375rem;
  border-radius: 999px;
  background: linear-gradient(to right, #333 var(--fill), #e8e8e8 var(--fill));
}

.global-player__timeline::-webkit-slider-thumb {
  width: 0.875rem;
  height: 0.875rem;
  margin-top: -0.25rem;
  border: none;
  border-radius: 50%;
  appearance: none;
  background: #333;
}

.global-player__timeline::-moz-range-track {
  height: 0.375rem;
  border-radius: 999px;
  background: #e8e8e8;
}

.global-player__timeline::-moz-range-progress {
  height: 0.375rem;
  border-radius: 999px;
  background: #333;
}

.global-player__timeline::-moz-range-thumb {
  width: 0.875rem;
  height: 0.875rem;
  border: none;
  border-radius: 50%;
  background: #333;
}

.global-player__timeline:focus-visible {
  outline: 2px solid #333;
  outline-offset: 2px;
}
</style>
