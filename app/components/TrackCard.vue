<script setup lang="ts">
import type { Track } from "#shared/types/track";
defineProps<{
  track: Track;
  isFavorite: boolean;
}>();

const emit = defineEmits<{
  play: [track: Track];
  favorite: [track: Track];
}>();
</script>

<template>
  <article
    class="grid grid-cols-[auto_1fr_auto] items-center gap-x-3 gap-y-1.5 rounded-lg border border-gray-300 p-3"
  >
    <NuxtImg
      v-if="track.artwork"
      :src="track.artwork"
      width="48"
      height="48"
      sizes="48px"
      format="webp"
      class="rounded-full"
    />
    <UserAvatar v-else :initials="getInitials(track.artist)" />

    <div>
      <NuxtLink
        :to="`/track/${track.id}`"
        class="text-inherit no-underline hover:underline"
      >
        {{ track.title }}
      </NuxtLink>
      <p class="mt-0.5 text-gray-600">{{ track.artist }}</p>
    </div>

    <span class="text-gray-500 tabular-nums">
      {{ formatDuration(track.duration) }}
    </span>

    <div class="col-start-2 col-span-2 flex gap-2">
      <AppButton @click="emit('play', track)">Play</AppButton>
      <FavoriteButton
        :is-favorite="isFavorite"
        @toggle="emit('favorite', track)"
      />
    </div>
  </article>
</template>
