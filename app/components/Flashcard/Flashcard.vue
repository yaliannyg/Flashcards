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

      <FlashcardDifficultyDots :active-dots="dotsActive" />
    </header>

    <!-- Content area -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Left: Question -->
      <FlashcardQuestion :question="question" />

      <!-- Vertical divider -->
      <div class="w-px shrink-0 bg-border" />

      <!-- Right: Review stats -->

      <FlashcardStats :statSuccess="statSuccess" :statFailures="statFailures" />
    </div>

    <!-- Reveal Answer button -->
    <button
      type="button"
      class="h-auto py-1 w-full shrink-0 cursor-pointer border-none bg-primary text-xs font-semibold tracking-[0.01em] text-text-base transition-opacity hover:opacity-90 active:opacity-80"
    >
      {{ revealLabel }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { FlashcardDTO } from "~~/shared/types/flashcards.types";
import FlashcardDifficultyDots from "./FlashcardDifficultyDots.vue";
import FlashcardQuestion from "./FlashcardQuestion.vue";
import FlashcardStats from "./FlashcardStats.vue";
import FlashcardTag from "./FlashcardTag.vue";

type Props = Omit<FlashcardDTO, "id">;

const { dotsActive = 0, tags, stats } = defineProps<Props>();

const statSuccess = computed(() => (stats ? stats.successes : 0));
const statFailures = computed(() => (stats ? stats.failures : 0));

const revealLabel = "Reveal Answer";
</script>
