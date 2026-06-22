<template>
  <div class="flex size-full flex-col">
    <header class="flex w-full items-center justify-between px-3 py-4">
      <h1 class="text-lg text-text-base font-semibold">{{ PAGE_TITLE }}</h1>
      <BaseButton :label="SAVE_LABEL" @click="handleSave" />
    </header>

    <CreateCard
      v-model:cards="cards"
      v-model:tags="tags"
      :errors="errors"
      class="flex-1"
    />
  </div>
</template>

<script setup lang="ts">
import CreateCard, {
  type CardInput,
} from "@/components/CreateCard/CreateCard.vue";
import BaseButton from "@/components/UI/BaseButton.vue";
import { reactive, ref } from "vue";
import type { TagDTO } from "~~/shared/types/tags.types";

definePageMeta({
  layout: "add-flashcards",
});

const PAGE_TITLE = "New Flashcards";
const SAVE_LABEL = "Save";
const QUESTION_REQUIRED = "Question is required";
const ANSWER_REQUIRED = "Answer is required";
const TAGS_REQUIRED = "Select at least one tag";

const cards = ref<CardInput[]>([{ question: "", answer: "" }]);
const tags = ref<TagDTO[]>([]);

const errors = reactive<{
  cards: { question: string; answer: string }[];
  tags: string;
}>({
  cards: [],
  tags: "",
});

function validate() {
  errors.tags = tags.value.length ? "" : TAGS_REQUIRED;
  errors.cards = cards.value.map((card) => ({
    question: card.question.trim() ? "" : QUESTION_REQUIRED,
    answer: card.answer.trim() ? "" : ANSWER_REQUIRED,
  }));

  const cardsValid = errors.cards.every((card) => !card.question && !card.answer);
  return !errors.tags && cardsValid;
}

async function handleSave() {
  if (!validate()) return;

  const tagIds = tags.value.map((tag) => tag.id);

  await Promise.all(
    cards.value.map((card) =>
      $fetch("/api/flashcards", {
        method: "POST",
        body: {
          question: card.question.trim(),
          answer: card.answer.trim(),
          tags: tagIds,
        },
      }),
    ),
  );

  await refreshNuxtData(["tags", "flashcards-total"]);

  await navigateTo("/");
}
</script>

<style scoped></style>
