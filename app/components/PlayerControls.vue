<template>
  <div class="container">
    <div class="global-player">
      <IconButton
        label="Previous track"
        name-icon="mdi:skip-previous"
        size="small"
        @click="onPrev"
      >
      </IconButton>

      <IconButton
        :label="playerStore.isPlaying ? 'Pause' : 'Play'"
        :name-icon="playerStore.isPlaying ? 'mdi:pause' : 'mdi:play'"
        size="main"
        @click="playerStore.togglePlay()"
      >
      </IconButton>

      <IconButton
        label="Next track"
        name-icon="mdi:skip-next"
        size="small"
        @click="onNext"
      >
      </IconButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const playerStore = usePlayerStore();
const { currentTime, duration, seek } = useAudio();

function onPrev() {
  if (currentTime.value < duration.value && currentTime.value > 3) {
    seek(0);
    return;
  }
  playerStore.prev();
}

function onNext() {
  playerStore.next();
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  padding: 1rem;
}
.global-player {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.6rem 1.25rem;
  border: solid 2px #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>
