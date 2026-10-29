<template>
  <button
    type="button"
    :aria-label="label"
    :class="`icon-button icon-button--${size}`"
  >
    <Icon :name="nameIcon" />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  nameIcon: string;
  size: "small" | "main";
}>();
</script>

<style scoped>
.icon-button {
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

.icon-button--small {
  height: 2.25rem;
  width: 2.25rem;
  font-size: 1.125rem;
}

.icon-button--main {
  height: 3rem;
  width: 3rem;
  font-size: 1.375rem;
}
.icon-button:hover {
  background: #f4f4f4;
}

.icon-button:focus-visible {
  outline: 2px solid #333;
  outline-offset: 2px;
}
</style>
