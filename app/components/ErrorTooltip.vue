<template>
  <Transition name="fade">
    <div v-if="isVisible && errorInfo" class="container-error">
      <span>{{ code }}</span>
      <p>{{ errorInfo.message }}</p>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    code: number | null;
    delay?: number;
  }>(),
  { delay: 2000 },
);

const isVisible = ref(false);
let timer: ReturnType<typeof setTimeout> | null = null;

type ErrorInfo = {
  message: string;
  type: "warning" | "error";
};

const errorDictionary = new Map<number, ErrorInfo>([
  [
    2,
    {
      message: "Проблема с сетью. Проверьте соединение и нажмите Play ещё раз.",
      type: "warning",
    },
  ],
  [
    3,
    {
      message:
        "Файл повреждён — воспроизвести его не получится. Выберите другой трек.",
      type: "error",
    },
  ],
  [
    4,
    {
      message:
        "Трек недоступен в источнике, возможно он удалён. Выберите другой трек.",
      type: "error",
    },
  ],
]);

function hide() {
  isVisible.value = false;
  if (timer !== null) {
    clearTimeout(timer);
    timer = null;
  }
}

watch(
  () => props.code,
  (code) => {
    if (code === null) {
      hide();
      return;
    }
    isVisible.value = true;
    if (timer !== null) clearTimeout(timer);
    timer = setTimeout(hide, props.delay);
  },
  { immediate: true },
);

onUnmounted(hide);

const errorInfo = computed(() => {
  if (props.code === null) {
    return null;
  }
  return (
    errorDictionary.get(props.code) ?? {
      message: `Не удалось воспроизвести трек (код: ${props.code})`,
      type: "error",
    }
  );
});
</script>

<style scoped>
.container-error {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  max-width: 22rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  color: #333;
  font-size: 0.875rem;
  line-height: 1.3;
}

.container-error > span {
  color: #888;
  font-size: 0.75rem;
  font-variant-numeric: tabular-nums;
}

.container-error > p {
  margin: 0;
}

/* Transition "fade": Vue 3 names are enter-from / leave-to (not Vue 2's enter / leave). */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
