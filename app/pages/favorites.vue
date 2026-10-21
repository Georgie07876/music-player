<template>
  <section>
    <h1>Favorites</h1>
    <p>{{ lastAction }}</p>
    <TrackList
      :favorite-ids="favoritesStore.favoriteIds"
      :tracks="favoritesStore.tracks"
      @play="onPlay"
      @favorite="onFavorite"
    >
      <template #empty> No favorite tracks yet. </template>
    </TrackList>
  </section>
</template>

<script setup lang="ts">
import type { Track } from "#shared/types/track";

const favoritesStore = useFavoritesStore();
const playerStore = usePlayerStore();
function onPlay(track: Track) {
  playerStore.playTrack(track, favoritesStore.tracks);
}

const lastAction = ref("");

function onFavorite(track: Track) {
  const wasFavorite = favoritesStore.isFavorite(track.id);
  favoritesStore.toggle(track);
  lastAction.value = wasFavorite
    ? "Removed from favorites"
    : "Added to favorites";
}
</script>
