<template>
  <p v-if="pending">Loading…</p>
  <p v-else-if="error">Could not load track.</p>
  <section v-else-if="track">
    <h1>{{ track.title }}</h1>
    <p>{{ track.artist }}</p>
  </section>
  <p v-else>Track not found.</p>
</template>

<script setup lang="ts">
const route = useRoute();
const id = computed(() => String(route.params.id));
const seoTitle = computed(() => {
  if (!track.value) return "Track not found";
  return `«${track.value.title} — ${track.value.artist}»`;
});

useSeoMeta({
  title: () => seoTitle.value,
  ogTitle: () => seoTitle.value,
  ogDescription: () => track.value?.artist ?? "Track not found",
  ogType: "music.song",
});

definePageMeta({ middleware: "track-id" });
const { track, pending, error } = useTrack(id);
</script>
