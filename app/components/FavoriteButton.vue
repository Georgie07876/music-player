<template>
  <IconButton
    size="small"
    :name-icon="props.isFavorite ? 'mdi:heart' : 'mdi:heart-outline'"
    :label="favoriteLabel"
    :aria-pressed="isFavorite"
    @click="emit('toggle')"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  isFavorite: boolean;
}>();

const emit = defineEmits<{
  toggle: [];
}>();

const favoriteLabel = computed(() =>
  props.isFavorite ? "Remove from favorites" : "Add to favorites",
);
</script>
