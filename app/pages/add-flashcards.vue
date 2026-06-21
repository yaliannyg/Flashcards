<template>
  <div class="flex size-full flex-col">
    <header class="flex w-full items-center justify-between px-3 py-4">
      <h1 class="text-lg text-text-base font-semibold">{{ PAGE_TITLE }}</h1>
      <BaseButton :label="SAVE_LABEL" @click="handleSave" />
    </header>

    <CreateCard
      v-model:question="question"
      v-model:answer="answer"
      v-model:tags="tags"
      :errors="errors"
      class="flex-1"
    />
  </div>
</template>

<script setup lang="ts">
import CreateCard from "@/components/CreateCard/CreateCard.vue";
import BaseButton from "@/components/UI/BaseButton.vue";
import { reactive, ref } from "vue";
import type { TagDTO } from "~~/shared/types/tags.types";

definePageMeta({
  layout: "add-flashcards",
});

const PAGE_TITLE = "New Flashcard";
const SAVE_LABEL = "Save";
const QUESTION_REQUIRED = "Question is required";
const ANSWER_REQUIRED = "Answer is required";
const TAGS_REQUIRED = "Select at least one tag";

const question = ref("");
const answer = ref("");
const tags = ref<TagDTO[]>([]);

const errors = reactive({
  question: "",
  answer: "",
  tags: "",
});

function validate() {
  errors.question = question.value.trim() ? "" : QUESTION_REQUIRED;
  errors.answer = answer.value.trim() ? "" : ANSWER_REQUIRED;
  errors.tags = tags.value.length ? "" : TAGS_REQUIRED;
  return !errors.question && !errors.answer && !errors.tags;
}

async function handleSave() {
  if (!validate()) return;

  await $fetch("/api/flashcards", {
    method: "POST",
    body: {
      question: question.value.trim(),
      answer: answer.value.trim(),
      tags: tags.value.map((tag) => tag.id),
    },
  });

  await navigateTo("/");
}
</script>

<style scoped></style>
