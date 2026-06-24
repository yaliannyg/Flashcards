<template>
  <!-- Backdrop: mobile only, dismisses the drawer on tap -->
  <Transition
    enter-active-class="transition-opacity duration-300 ease-out"
    enter-from-class="opacity-0"
    leave-active-class="transition-opacity duration-300 ease-in"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isOpen"
      class="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm sm:hidden"
      aria-hidden="true"
      @click="close"
    />
  </Transition>

  <aside
    id="app-sidebar"
    :aria-label="SIDEBAR_LABEL"
    :inert="isMobile && !isOpen"
    class="flex flex-col shrink-0 h-dvh w-72 max-w-[85vw] border-r border-border bg-surface fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out sm:static sm:w-48 sm:max-w-none sm:translate-x-0 sm:transition-none"
    :class="isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'"
  >
    <!-- Mobile drawer header with close button -->
    <div
      class="flex items-center justify-between px-4 py-3 border-b border-border sm:hidden"
    >
      <span
        class="text-xxs font-semibold tracking-widest uppercase text-text-heading"
      >
        {{ MENU_LABEL }}
      </span>
      <button
        ref="closeButton"
        type="button"
        class="-mr-1 p-2 rounded-lg text-text-muted transition-colors hover:text-text-base hover:bg-surface-muted active:bg-surface-muted outline-none focus-visible:ring-2 focus-visible:ring-primary-emphasis"
        :aria-label="CLOSE_LABEL"
        @click="close"
      >
        <X :size="18" />
      </button>
    </div>

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

    <div v-if="activeTab === 'questions'" class="flex flex-col flex-1 min-h-0">
      <div class="px-4 my-4">
         <label
          for="search-question"
          class="text-xxs font-semibold tracking-[0.18em] text-text-heading uppercase"
        >
          {{ SEARCH_LABEL }}
        </label>
        <input
          id="search-question"
          v-model="search"
          type="text"
          class="rounded-lg w-full border border-border bg-surface-muted px-3 py-1 text-xxs text-text-base placeholder:text-text-heading outline-none focus:border-primary-emphasis"
        />
        </div>
      <div class="flex-1 overflow-y-auto px-3 pb-3 space-y-px">
     
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
import { Plus, Tag, Trash2, X } from "@lucide/vue";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useFlashcards } from "#imports";
import { useSidebar } from "~/composables/useSidebar";
import { useSlug } from "~/composables/useSlug";
import { useStudyStore } from "~/composables/useStudyStore";
import { useTags } from "~/composables/useTags";
import TagInputRow from "./Tags/TagInputRow.vue";

type TabId = "tags" | "questions";

const ALL_TAGS_LABEL = "All";
const NO_QUESTIONS_LABEL = "No flashcards yet";
const SEARCH_LABEL = "Search";
const SIDEBAR_LABEL = "Sidebar navigation";
const MENU_LABEL = "Menu";
const CLOSE_LABEL = "Close menu";
const MOBILE_QUERY = "(max-width: 639px)";
const TABS: { id: TabId; label: string }[] = [
  { id: "tags", label: "Tags" },
  { id: "questions", label: "Questions" },
];

const activeTab = ref<TabId>("tags");
const search = ref("");

const { isOpen, close } = useSidebar();
const closeButton = ref<HTMLButtonElement | null>(null);

// Tracks whether we're at a mobile breakpoint so the drawer behaviours
// (scroll lock, `inert`, ESC-to-close) only apply where the overlay exists.
const isMobile = ref(false);
let mediaQuery: MediaQueryList | null = null;
const syncIsMobile = (event: MediaQueryListEvent | MediaQueryList) => {
  isMobile.value = event.matches;
};

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape" && isOpen.value) close();
};

onMounted(() => {
  mediaQuery = window.matchMedia(MOBILE_QUERY);
  syncIsMobile(mediaQuery);
  mediaQuery.addEventListener("change", syncIsMobile);
  window.addEventListener("keydown", onKeydown);
});

onBeforeUnmount(() => {
  mediaQuery?.removeEventListener("change", syncIsMobile);
  window.removeEventListener("keydown", onKeydown);
  document.body.style.overflow = "";
});

// Lock background scroll while the mobile drawer is open and move focus to the
// close button so keyboard users land inside the drawer. On close, return focus
// to the menu trigger so it doesn't get dropped onto the now-`inert` aside
// (which triggers the "aria-hidden/blocked focus" warning).
watch(isOpen, (open) => {
  if (!import.meta.client) return;
  document.body.style.overflow = open && isMobile.value ? "hidden" : "";
  if (open) {
    nextTick(() => closeButton.value?.focus());
  } else if (isMobile.value) {
    const trigger = document.querySelector<HTMLElement>(
      '[aria-controls="app-sidebar"]',
    );
    trigger?.focus();
  }
});


const slug = useSlug();
const { flashcards } = useFlashcards(slug.slugName);
const store = useStudyStore();

const searchedFlashCards = computed(() => {
  return search.value.length
    ? flashcards.value.filter((flashcard) =>
        flashcard.question.toLowerCase().startsWith(search.value.toLowerCase()),
      )
    : flashcards.value;
});

const sortedFlashcards = computed(() =>
  [...(searchedFlashCards.value ?? [])].sort((a, b) =>
    a.question.localeCompare(b.question),
  ),
);

const { tags, createTag, deleteTag } = useTags();
// "All" count is every flashcard regardless of the current tag filter.
const totalAmountFlashcards = computed(() => store.flashcards.value.length);

const isAddingTag = ref(false);

const handleSaveTag = async (name: string) => {
  await createTag(name);
  isAddingTag.value = false;
};

const route = useRoute();

// Close the drawer after navigating so a tag/question tap doesn't leave it open.
watch(
  () => route.fullPath,
  () => close(),
);

const handleDeleteTag = async (slug: string) => {
  await deleteTag(slug);
  if (route.params.slug === slug) {
    await navigateTo("/");
  }
};
</script>

<style scoped></style>
