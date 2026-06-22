<template>
  <aside
    class="flex flex-col shrink-0 h-screen w-48 border-r border-border bg-surface"
  >
    <div class="flex border-b border-border">
      <button
        v-for="tab in TABS"
        :key="tab.id"
        type="button"
        class="flex-1 py-3 text-xxs tracking-widest uppercase font-semibold transition-colors"
        :class="
          activeTab === tab.id
            ? 'text-text-heading border-b-2 border-primary -mb-px'
            : 'text-text-muted hover:text-text-heading'
        "
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <div
      v-if="activeTab === 'questions'"
      class="flex flex-col flex-1 min-h-0"
    >
      <div class="flex-1 overflow-y-auto px-3 py-3 space-y-px">
        <NuxtLink
          v-for="flashcard in sortedFlashcards"
          :key="flashcard.id"
          :to="`/edit/${flashcard.id}`"
          class="block px-3 py-2 rounded-lg cursor-pointer text-xs text-text-muted font-normal line-clamp-2"
          :style="{ transition: 'background 0.15s' }"
        >
          {{ flashcard.question }}
        </NuxtLink>
        <p
          v-if="!flashcards?.length"
          class="px-3 py-2 text-xs text-text-muted/70 font-normal"
        >
          {{ NO_QUESTIONS_LABEL }}
        </p>
      </div>
    </div>

    <div v-else class="flex flex-col flex-1 min-h-0">
      <div class="flex-1 overflow-y-auto px-3 py-3 space-y-px">
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
          <div class="flex items-center gap-1.5 relative">
            <span
              class="text-xxs px-1.5 py-0.5 rounded-full bg-surface-muted text-text-muted"
            >
              {{ tag.flashcardCount }}
            </span>
            <button
              type="button"
              class="absolute left-5 p-1 rounded text-text-muted opacity-0 group-hover:opacity-100 hover:text-red-500 transition-opacity"
              aria-label="Delete tag"
              @click.prevent.stop="handleDeleteTag(tag.slug)"
            >
              <Trash2 :size="12" />
            </button>
          </div>
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
    </div>
  </aside>
</template>

<script setup lang="ts">
import { Plus, Tag, Trash2 } from "@lucide/vue";
import { computed, ref } from "vue";
import { useFlashcards } from "#imports";
import { useSlug } from "~/composables/useSlug";
import TagInputRow from "./Tags/TagInputRow.vue";

type TabId = "tags" | "questions";

const ALL_TAGS_LABEL = "All";
const NO_QUESTIONS_LABEL = "No flashcards yet";
const TABS: { id: TabId; label: string }[] = [
  { id: "tags", label: "Tags" },
  { id: "questions", label: "Questions" },
];

const activeTab = ref<TabId>("tags");

const slug = useSlug();
const { flashcards } = useFlashcards(slug.slugName);

const sortedFlashcards = computed(() =>
  [...(flashcards.value ?? [])].sort((a, b) =>
    a.question.localeCompare(b.question),
  ),
);

const { tags, createTag, deleteTag } = await useTags();
const { data: totalAmountFlashcards } = await useFetch<number>(
  "/api/flashcards/total",
  { key: "flashcards-total" },
);

const isAddingTag = ref(false);

const handleSaveTag = async (name: string) => {
  await createTag(name);
  isAddingTag.value = false;
};

const route = useRoute();

const handleDeleteTag = async (slug: string) => {
  await deleteTag(slug);
  if (route.params.slug === slug) {
    await navigateTo("/");
  }
};
</script>

<style scoped></style>
