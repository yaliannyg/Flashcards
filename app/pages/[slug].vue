<script setup lang="ts">
import Flashcard from "@/components/Flashcard/Flashcard.vue";
import { computed } from "vue";
import { useFlashcards } from "#imports";
import { useSlug } from "~/composables/useSlug";

const slug = useSlug();
const { flashcards } = await useFlashcards(slug.slugName.value);

const flashCardsLength = computed(() => flashcards.value?.length ?? 0);

defineExpose({
  flashCardsLength,
});
</script>

<template>
  <div class="grid grid-cols-2 lg:grid-cols-3 gap-5 px-3">
    <Flashcard
      v-for="{ id, tags, question, stats, dotsActive } in flashcards"
      :key="id"
      :question="question"
      :tags="tags"
      :stats="stats"
      :dotsActive="dotsActive"
    />
  </div>
</template>
