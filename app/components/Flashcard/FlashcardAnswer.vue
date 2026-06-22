<template>
  <div class="flex flex-1 overflow-hidden">
    <!-- Left: Question or Answer -->
    <div
      class="flex flex-1 flex-col items-center justify-center px-4 py-3 text-center"
    >
      <p
        class="mb-2.5 text-xxs font-semibold tracking-[0.18em] text-text-heading uppercase"
      >
        {{ answerLabel }}
      </p>
      <p class="text-[13px] leading-relaxed font-normal text-text-base">
        {{ answer }}
      </p>
    </div>

    <!-- Vertical divider -->
    <div class="w-px shrink-0 bg-border" />

    <!-- Right: Review stats -->

    <FlashcardReviewActions @review="emit('review', $event)" />
  </div>
</template>

<script setup lang="ts">
import type { ReviewResult } from "~~/shared/types/flashcards.types";

interface FlashCardAnswerProps {
  answer: string;
}
defineProps<FlashCardAnswerProps>();

const emit = defineEmits<{
  review: [result: ReviewResult];
}>();

const answerLabel = "answer";
</script>

<style scoped></style>
