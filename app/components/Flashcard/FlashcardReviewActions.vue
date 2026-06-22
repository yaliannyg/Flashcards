<template>
  <aside
    class="flex flex-col items-center justify-center py-3 shrink-0 w-17 bg-[#21213a]"
  >
    <div class="flex flex-col items-center gap-2">
      <button
        type="button"
        :aria-label="correctLabel"
        class="flex items-center justify-center size-9 rounded-lg bg-primary-emphasis/10 text-primary-emphasis transition-colors hover:bg-primary-emphasis/20 active:bg-primary-emphasis/30"
        @click="emit('review', 'correct')"
      >
        <Check class="size-5" />
      </button>
      <button
        type="button"
        :aria-label="incorrectLabel"
        class="flex items-center justify-center h-9 w-9 rounded-lg bg-[#e05c78]/10 text-[#e05c78] transition-colors hover:bg-[#e05c78]/20 active:bg-[#e05c78]/30"
        @click="emit('review', 'incorrect')"
      >
        <X class="h-5 w-5" />
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { Check, X } from "@lucide/vue";
import type { ReviewResult } from "~~/shared/types/flashcards.types";

const emit = defineEmits<{
  review: [result: ReviewResult];
}>();

const correctLabel = "Mark as correct";
const incorrectLabel = "Mark as incorrect";
</script>

<style scoped></style>
