<script setup lang="ts">
import Flashcard from "@/components/Flashcard/Flashcard.vue";
import { useFlashcards } from "#imports";
import { useSlug } from "~/composables/useSlug";

definePageMeta({
  layout: "home",
});

const slug = useSlug();
const { flashcards } = useFlashcards(slug.slugName);
</script>

<template>
  <div class="grid grid-cols-2 lg:grid-cols-3 gap-5 px-3">
    <Flashcard
      v-for="{ id, tags, question, answer, stats, dotsActive } in flashcards"
      :key="id"
      :card-id="id"
      :question="question"
      :answer="answer"
      :tags="tags"
      :stats="stats"
      :dotsActive="dotsActive"
    />
  </div>
</template>
