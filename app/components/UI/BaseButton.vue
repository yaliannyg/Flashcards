<template>
  <button
    class="bg-primary rounded-lg h-fit py-2 px-4 font-semibold ml-auto text-white transition-opacity hover:opacity-80 border-primary-emphasis/25"
    @click="emit('click')"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
interface Props {
  label: string;
}
const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "click"): void;
}>();
</script>

<style lang="scss" scoped></style>
