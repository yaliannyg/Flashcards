<template>
  <div class="flex flex-col items-center gap-1 shrink-0 ">
    <div class="flex items-center gap-1">
      <div
        v-for="i in totalDots"
        :key="i"
        class="size-2 rounded-full"
        :class="i <= activeDots ? 'bg-primary-emphasis' : 'bg-white/15'"
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

const label = "difficulty";
const totalDots = 5;
</script>
