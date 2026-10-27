<script setup lang="ts">
useHead({
  titleTemplate: (title?: string) =>
    title ? `${title} — Open Music Player` : "Open Music Player",
});
</script>

<template>
  <div class="app">
    <main class="app-main">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </main>
  </div>
</template>

<style>
.app-main {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  box-sizing: border-box;
}

.app-main section {
  display: grid;
  gap: 0.85rem;
}
</style>
