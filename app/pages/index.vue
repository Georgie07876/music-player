<template>
  <section>
    <h1>Home</h1>
    <p v-if="pending">Loading…</p>
    <p v-else-if="error">Could not load tracks.</p>
    <p v-else>{{ lastAction }}</p>

    <TrackList
      :favorite-ids="favoritesStore.favoriteIds"
      :tracks="tracks"
      @play="onPlay"
      @favorite="onFavorite"
    />
  </section>
</template>

<script setup lang="ts">
import type { Track } from "~/utils/tracks";

const playerStore = usePlayerStore();
const favoritesStore = useFavoritesStore();
const { tracks, pending, error } = useTracks();
const lastAction = ref("");

function onPlay(track: Track) {
  playerStore.playTrack(track, tracks.value);
}

function onFavorite(track: Track) {
  const wasFavorite = favoritesStore.isFavorite(track.id);
  favoritesStore.toggle(track);
  lastAction.value = wasFavorite
    ? "Removed from favorites"
    : "Added to favorites";
}
</script>
