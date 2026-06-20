<script setup lang="ts">
import Flashcard from "@/components/Flashcard/Flashcard.vue";
import { useFlashcards } from "#imports";
import { useSlug } from "~/composables/useSlug";

const slug = useSlug();
const { flashcards } = await useFlashcards(slug.slugName.value);
</script>

<template>
  <div class="grid grid-cols-2 lg:grid-cols-3 gap-5 px-3">
    <Flashcard
      v-for="{ id, tags, question, answer, stats, dotsActive } in flashcards"
      :key="id"
      :question="question"
      :answer="answer"
      :tags="tags"
      :stats="stats"
      :dotsActive="dotsActive"
    />
  </div>
</template>
