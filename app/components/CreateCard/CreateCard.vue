<template>
  <div class="flex size-full flex-col gap-5 overflow-auto px-3 py-4">
    <!-- Tags -->
    <div class="flex flex-col gap-1.5">
      <div class="flex flex-wrap items-center gap-1.5">
        <FlashcardTag v-for="tag in tags" :key="tag.id" :label="tag.name" />

        <TagSelect :options="availableTags" @select="handleAddTag" />
      </div>

      <p v-if="errors?.tags" class="text-xxs font-medium text-red-500">
        {{ errors.tags }}
      </p>
    </div>

    <!-- Question & Answer -->
    <div class="grid flex-1 grid-cols-2 gap-5 max-h-1/2">
      <CreateCardField
        id="question"
        v-model="question"
        :label="QUESTION_LABEL"
        :placeholder="QUESTION_PLACEHOLDER"
        :error="errors?.question"
        class="h-full"
      />

      <CreateCardField
        id="answer"
        v-model="answer"
        :label="ANSWER_LABEL"
        :placeholder="ANSWER_PLACEHOLDER"
        :error="errors?.answer"
        class="h-full"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import FlashcardTag from "~/components/Flashcard/FlashcardTag.vue";
import TagSelect from "~/components/Tags/TagSelect.vue";
import type { TagDTO } from "~~/shared/types/tags.types";
import CreateCardField from "./CreateCardField.vue";

interface FormErrors {
  question?: string;
  answer?: string;
  tags?: string;
}

const QUESTION_LABEL = "question";
const QUESTION_PLACEHOLDER = "Enter the question";
const ANSWER_LABEL = "answer";
const ANSWER_PLACEHOLDER = "Enter the answer";

defineProps<{ errors?: FormErrors }>();

const question = defineModel<string>("question", { default: "" });
const answer = defineModel<string>("answer", { default: "" });
const tags = defineModel<TagDTO[]>("tags", { default: () => [] });

const { tags: allTags } = await useTags();

const availableTags = computed(() =>
  (allTags.value ?? []).filter(
    (tag) => !tags.value.some((selected) => selected.id === tag.id),
  ),
);

const handleAddTag = (tag: TagDTO) => {
  tags.value = [...tags.value, tag];
};
</script>
