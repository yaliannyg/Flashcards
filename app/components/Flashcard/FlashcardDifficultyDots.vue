<template>
  <div class="flex flex-col items-center gap-1 shrink-0">
    <div class="flex items-center gap-1">
      <button
        v-for="i in totalDots"
        :key="i"
        type="button"
        :aria-label="`${label} ${i}`"
        class="size-2 cursor-pointer rounded-full border-none p-0 transition-opacity hover:opacity-80 active:opacity-70"
        :class="i <= activeDots ? 'bg-primary-emphasis' : 'bg-white/15'"
        @click="emit('select', i)"
      />
    </div>
    <span
      class="text-xxxs font-medium tracking-[0.12em] text-text-heading uppercase"
    >
      {{ label }}
    </span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  activeDots: number;
}

defineProps<Props>();

const emit = defineEmits<{ select: [value: number] }>();

const label = "difficulty";
const totalDots = 5;
</script>
