<template>
  <div
    class="flex flex-1 flex-col items-center justify-center px-4 py-3 text-center"
  >
    <p
      class="mb-2.5 text-xxs font-semibold tracking-[0.18em] text-text-heading uppercase"
    >
      {{ questionLabel }}
    </p>
    <p class="text-[13px] leading-relaxed font-normal text-text-base">
      {{ question }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface FlashCardQuestionsProps {
  question: string;
}
defineProps<FlashCardQuestionsProps>();

const questionLabel = "question"
</script>

<style scoped></style>
