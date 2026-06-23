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
import { onMounted, reactive, ref } from "vue";
import { useStudyStore } from "~/composables/useStudyStore";
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

const { getFlashcard, updateFlashcard } = useStudyStore();

const cards = ref<CardInput[]>([{ question: "", answer: "" }]);
const tags = ref<TagDTO[]>([]);

// Load on the client so guest (localStorage) flashcards resolve too.
onMounted(async () => {
  const flashcard = await getFlashcard(id);
  if (!flashcard) return;
  cards.value = [{ question: flashcard.question, answer: flashcard.answer }];
  tags.value = flashcard.tags ?? [];
});

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

  await updateFlashcard(id, {
    question: card.question.trim(),
    answer: card.answer.trim(),
    tags: tags.value.map((tag) => tag.id),
  });

  router.back();
}
</script>

<style scoped></style>
