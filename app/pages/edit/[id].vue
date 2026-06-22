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
      :multiple="false"
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
import type { FlashcardDTO } from "~~/shared/types/flashcards.types";
import type { TagDTO } from "~~/shared/types/tags.types";

definePageMeta({
  layout: "add-flashcards",
});

const PAGE_TITLE = "Edit Flashcard";
const SAVE_LABEL = "Save";
const QUESTION_REQUIRED = "Question is required";
const ANSWER_REQUIRED = "Answer is required";
const TAGS_REQUIRED = "Select at least one tag";

const route = useRoute();
const router = useRouter();
const id = route.params.id as string;

const { data: flashcard } = await useFetch<FlashcardDTO>(
  `/api/flashcards/${id}`,
  { key: `flashcard:${id}` },
);

const cards = ref<CardInput[]>([
  {
    question: flashcard.value?.question ?? "",
    answer: flashcard.value?.answer ?? "",
  },
]);
const tags = ref<TagDTO[]>(flashcard.value?.tags ?? []);

const errors = reactive<{
  cards: { question: string; answer: string }[];
  tags: string;
}>({
  cards: [],
  tags: "",
});

function validate() {
  const card = cards.value[0]!;
  errors.tags = tags.value.length ? "" : TAGS_REQUIRED;
  errors.cards = [
    {
      question: card.question.trim() ? "" : QUESTION_REQUIRED,
      answer: card.answer.trim() ? "" : ANSWER_REQUIRED,
    },
  ];
  return !errors.tags && !errors.cards[0]!.question && !errors.cards[0]!.answer;
}

async function handleSave() {
  if (!validate()) return;

  const card = cards.value[0]!;

  await $fetch(`/api/flashcards/${id}` as "/api/flashcards/:id", {
    method: "PATCH",
    body: {
      question: card.question.trim(),
      answer: card.answer.trim(),
      tags: tags.value.map((tag) => tag.id),
    },
  });

  await refreshNuxtData();

  router.back();
}
</script>

<style scoped></style>
