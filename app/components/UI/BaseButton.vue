<template>
  <button
    class="w-full py-2 px-4 text-on-muted bg-muted font-semibold text-xs capitalize rounded-md cursor-pointer"
    @click="handleClick"
  >
    <slot> </slot>
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

function handleClick(event: MouseEvent) {
  emit("click", event);
}
</script>

<style scoped></style>
