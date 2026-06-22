<template>
  <div
    class="flex h-54 w-auto shrink-0 flex-col overflow-hidden rounded-2xl bg-surface shadow-2xl"
  >
    <header
      class="flex shrink-0 items-start justify-between gap-2 px-3 pt-3 pb-2"
    >
      <div class="flex items-center gap-1 overflow-hidden">
        <FlashcardTag v-for="tag in tags" :key="tag.id" :label="tag.name" />
      </div>

      <FlashcardDifficultyDots
        :active-dots="difficulty"
        @select="handleDifficulty"
      />
    </header>

    <!-- Content area -->
    <FlashcardAnswer
      :answer="answer"
      v-if="isAnswerRevealed"
      @review="handleReview"
    />
    <FlashcardQuestion
      v-else
      :question="question"
      :statSuccess="successes"
      :statFailures="failures"
    />

    <!-- Reveal Answer button -->
    <button
      type="button"
      class="h-auto py-1 w-full shrink-0 cursor-pointer border-none bg-primary text-xs font-semibold tracking-[0.01em] text-text-base transition-opacity hover:opacity-90 active:opacity-80"
      @click="isAnswerRevealed = !isAnswerRevealed"
    >
      {{ revealLabel }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type {
  FlashcardDTO,
  ReviewResult,
} from "~~/shared/types/flashcards.types";
import FlashcardAnswer from "./FlashcardAnswer.vue";
import FlashcardDifficultyDots from "./FlashcardDifficultyDots.vue";
import FlashcardQuestion from "./FlashcardQuestion.vue";
import FlashcardTag from "./FlashcardTag.vue";

type Props = Omit<FlashcardDTO, "id"> & { cardId: string };

const { cardId, dotsActive = 0, stats } = defineProps<Props>();

const successes = ref(stats?.successes ?? 0);
const failures = ref(stats?.failures ?? 0);
const difficulty = ref(dotsActive);

const isAnswerRevealed = ref(false);

const handleDifficulty = async (value: number) => {
  const previous = difficulty.value;
  // Clicking the active dot count again clears the difficulty.
  difficulty.value = value === previous ? 0 : value;

  try {
    await $fetch(`/api/flashcards/${cardId}`, {
      method: "PATCH",
      body: { dotsActive: difficulty.value },
    });
  } catch {
    // Revert the optimistic update if persisting failed.
    difficulty.value = previous;
  }
};

const handleReview = async (result: ReviewResult) => {
  if (result === "correct") successes.value += 1;
  else failures.value += 1;

  // Back to the default state so the next card is ready to review.
  isAnswerRevealed.value = false;

  try {
    await $fetch(`/api/flashcards/${cardId}`, {
      method: "PATCH",
      body: {
        stats: { successes: successes.value, failures: failures.value },
      },
    });
  } catch {
    // Revert the optimistic update if persisting failed.
    if (result === "correct") successes.value -= 1;
    else failures.value -= 1;
  }
};

const revealLabel = computed(() =>
  isAnswerRevealed.value ? "Show Question" : "Reveal Answer",
);
</script>
