<template>
  <section>
    <h1>Search</h1>
    <SearchInput v-model="query" />
    <p v-if="pending">Loading…</p>
    <p v-else-if="error">Could not load tracks.</p>
    <p v-else>{{ lastAction }}</p>
    <TrackList
      :favorite-ids="favoritesStore.favoriteIds"
      :tracks="tracks"
      @play="onPlay"
      @favorite="onFavorite"
    >
      <template #empty> No tracks match “{{ query }}”. </template>
    </TrackList>
  </section>
</template>

<script setup lang="ts">
import type { Track } from "#shared/types/track";

const route = useRoute();
const favoritesStore = useFavoritesStore();
const lastAction = ref("");
const playerStore = usePlayerStore();

// definePageMeta({ middleware: "search-query" });

const query = computed({
  get() {
    return String(route.query.q ?? "");
  },
  set(value: string) {
    navigateTo({
      path: "/search",
      replace: true,
      query: value.trim() ? { q: value } : {},
    });
  },
});
useSeoMeta({
  title: () => (query.value ? `Search: ${query.value}` : "Search"),
  description: "Search for tracks",
  ogTitle: () => (query.value ? `Search: ${query.value}` : "Search"),
});
const { tracks, pending, error } = useSearch(query);

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
