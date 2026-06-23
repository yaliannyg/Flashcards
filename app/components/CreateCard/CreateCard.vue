<template>
  <div class="flex size-full flex-col gap-5 overflow-auto px-3 py-4">
    <!-- Tags (shared across every card) -->
    <div class="flex flex-col gap-1.5">
      <div class="flex flex-wrap items-center gap-1.5">
        <FlashcardTag v-for="tag in tags" :key="tag.id" :label="tag.name" />

        <TagSelect :options="availableTags" @select="handleAddTag" />
      </div>

      <p v-if="errors?.tags" class="text-xxs font-medium text-red-500">
        {{ errors.tags }}
      </p>
    </div>

    <!-- Question & Answer rows -->
    <div class="flex flex-col gap-5">
      <div v-for="(card, index) in cards" :key="index" class="flex flex-col gap-2">
        <div v-if="cards.length > 1" class="flex items-center justify-between">
          <span
            class="text-xxs font-semibold tracking-[0.18em] text-text-heading uppercase"
          >
            {{ CARD_LABEL }} {{ index + 1 }}
          </span>

          <button
            type="button"
            class="text-text-heading hover:text-red-500 flex items-center gap-1 text-xxs font-medium transition-colors"
            @click="handleRemoveCard(index)"
          >
            <X :size="14" :stroke-width="2.5" />
            {{ REMOVE_LABEL }}
          </button>
        </div>

        <div class="grid h-64 sm:grid-cols-2 gap-5">
          <CreateCardField
            :id="`question-${index}`"
            v-model="card.question"
            :label="QUESTION_LABEL"
            :placeholder="QUESTION_PLACEHOLDER"
            :error="errors?.cards?.[index]?.question"
            class="h-full"
          />

          <CreateCardField
            :id="`answer-${index}`"
            v-model="card.answer"
            :label="ANSWER_LABEL"
            :placeholder="ANSWER_PLACEHOLDER"
            :error="errors?.cards?.[index]?.answer"
            class="h-full"
          />
        </div>
      </div>

      <button
        v-if="multiple"
        type="button"
        class="text-primary border-primary-emphasis/25 hover:bg-primary/10 flex w-fit items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors"
        @click="handleAddCard"
      >
        <Plus :size="14" :stroke-width="2.5" />
        {{ ADD_CARD_LABEL }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, X } from "@lucide/vue";
import { computed } from "vue";
import FlashcardTag from "~/components/Flashcard/FlashcardTag.vue";
import TagSelect from "~/components/Tags/TagSelect.vue";
import type { TagDTO } from "~~/shared/types/tags.types";
import CreateCardField from "./CreateCardField.vue";

export interface CardInput {
  question: string;
  answer: string;
}

interface CardErrors {
  question?: string;
  answer?: string;
}

interface FormErrors {
  cards?: CardErrors[];
  tags?: string;
}

const QUESTION_LABEL = "question";
const QUESTION_PLACEHOLDER = "Enter the question";
const ANSWER_LABEL = "answer";
const ANSWER_PLACEHOLDER = "Enter the answer";
const CARD_LABEL = "Card";
const ADD_CARD_LABEL = "Add card";
const REMOVE_LABEL = "Remove";

const { multiple = true } = defineProps<{
  errors?: FormErrors;
  /** Allow adding/removing extra question/answer rows. */
  multiple?: boolean;
}>();

const cards = defineModel<CardInput[]>("cards", {
  default: () => [{ question: "", answer: "" }],
});
const tags = defineModel<TagDTO[]>("tags", { default: () => [] });

const { tags: allTags } = useTags();

const availableTags = computed(() =>
  (allTags.value ?? []).filter(
    (tag) => !tags.value.some((selected) => selected.id === tag.id),
  ),
);

const handleAddTag = (tag: TagDTO) => {
  tags.value = [...tags.value, tag];
};

const handleAddCard = () => {
  cards.value = [...cards.value, { question: "", answer: "" }];
};

const handleRemoveCard = (index: number) => {
  cards.value = cards.value.filter((_, i) => i !== index);
};
</script>

<style scoped></style>
