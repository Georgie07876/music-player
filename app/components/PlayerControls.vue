<template>
  <div class="container">
    <div class="global-player">
      <button
        type="button"
        class="global-player__btn global-player__btn--side"
        aria-label="Previous track"
      >
        <Icon name="mdi:skip-previous" />
      </button>

      <button
        type="button"
        class="global-player__btn global-player__btn--main"
        :aria-label="playerStore.isPlaying ? 'Pause' : 'Play'"
        @click="playerStore.togglePlay()"
      >
        <Icon v-if="playerStore.isPlaying" name="mdi:pause" />
        <Icon v-else name="mdi:play" />
      </button>

      <button
        type="button"
        class="global-player__btn global-player__btn--side"
        aria-label="Next track"
      >
        <Icon name="mdi:skip-next" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const playerStore = usePlayerStore();
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

.global-player__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 1px solid #ccc;
  border-radius: 50%;
  background: #fff;
  color: #333;
  cursor: pointer;
}

.global-player__btn--side {
  width: 2.25rem;
  height: 2.25rem;
  font-size: 1rem;
}

.global-player__btn--main {
  width: 3rem;
  height: 3rem;
  font-size: 1.375rem;
}

.global-player__btn:hover {
  background: #f4f4f4;
}

.global-player__btn:focus-visible {
  outline: 2px solid #333;
  outline-offset: 2px;
}
</style>
