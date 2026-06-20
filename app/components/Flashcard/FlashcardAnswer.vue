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

    <FlashcardReviewActions />
  </div>
</template>

<script setup lang="ts">
interface FlashCardAnswerProps {
  answer: string;
}
defineProps<FlashCardAnswerProps>();

const answerLabel = "answer";
</script>

<style scoped></style>
