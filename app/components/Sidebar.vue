<template>
  <aside
    class="flex flex-col shrink-0 h-screen w-48 border-r border-border bg-surface"
  >
    <div class="px-5 pt-6 pb-3">
      <span
        class="text-xxs tracking-widest uppercase text-text-heading font-semibold"
      >
        Tags
      </span>
    </div>

    <div class="flex-1 overflow-y-auto px-3 space-y-px">
      <NuxtLink
        to="/"
        class="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer group"
        :style="{ transition: 'background 0.15s' }"
      >
        <div class="flex items-center gap-2.5">
          <Tag :size="12" class="text-text-heading" />
          <span class="text-xs text-text-muted font-normal">
            {{ ALL_TAGS_LABEL }}
          </span>
        </div>
        <span
          class="text-xxs px-1.5 py-0.5 rounded-full bg-surface-muted text-text-muted"
        >
          {{ totalAmountFlashcards ?? 0 }}
        </span>
      </NuxtLink>
      <NuxtLink
        v-for="tag in tags"
        :key="tag.id"
        :to="`/${tag.slug}`"
        class="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer group"
        :style="{ transition: 'background 0.15s' }"
      >
        <div class="flex items-center gap-2.5">
          <Tag :size="12" class="text-text-heading" />
          <span class="text-xs text-text-muted font-normal">
            {{ tag.name }}
          </span>
        </div>
        <span
          class="text-xxs px-1.5 py-0.5 rounded-full bg-surface-muted text-text-muted"
        >
          {{ tag.flashcards?.length ?? 0 }}
        </span>
      </NuxtLink>
      <TagInputRow
        v-if="isAddingTag"
        @save="handleSaveTag"
        @cancel="isAddingTag = false"
      />
    </div>

    <div class="px-4 py-5">
      <button
        class="flex items-center justify-center gap-2 w-full py-2 rounded-lg text-xs transition-opacity hover:opacity-80 bg-primary text-white font-semibold border-primary-emphasis/25 capitalize"
        @click="isAddingTag = true"
      >
        <Plus :size="13" :stroke-width="2.5" />
        new tag
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { Plus, Tag } from "@lucide/vue";
import { ref } from "vue";
import TagInputRow from "./Tags/TagInputRow.vue";

const ALL_TAGS_LABEL = "All";

const { tags, createTag } = await useTags();
const { data: totalAmountFlashcards } = await useFetch<number>(
  "/api/flashcards/total",
);

const isAddingTag = ref(false);

const handleSaveTag = async (name: string) => {
  await createTag(name);
  isAddingTag.value = false;
};
</script>

<style scoped></style>
