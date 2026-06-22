import { computed, toValue, type Ref } from "vue";
import type { FlashcardDTO } from "~~/shared/types/flashcards.types";

// `slug` is empty for the full list and a tag slug for a filtered list.
const buildUrl = (slug: string) =>
  slug ? `/api/flashcards/tag/${slug}` : "/api/flashcards";

export function useFlashcards(url: string | Ref<string>) {
  const { data: flashcards, status } = useFetch<FlashcardDTO[]>(() => buildUrl(toValue(url)), {
    // Wrapping useFetch in a composable makes Nuxt's auto-generated key the
    // same for every caller (it's derived from this call site, not the URL),
    // so the layout, index and tag pages would otherwise share one cache entry.
    // Key by URL so each tag/list has its own.
    key: () => `flashcards:${toValue(url)}`,
    // The persistent layout (header count) and the page (grid) call this for
    // the same key; "defer" makes them share one in-flight request instead of
    // cancelling each other (the default is "cancel").
    dedupe: "defer",
  });

  const totalAmountFlashcards = computed(() => flashcards.value?.length ?? 0);

  const flashcardsQuestions = computed(() => {
    return flashcards.value?.map((flashcard) => flashcard.question) ?? [];
  });

  const deleteFlashcard = async (id: string) => {
    await $fetch(`/api/flashcards/${id}` as "/api/flashcards/:id", { method: "DELETE" });

    // Drop the card from the current list immediately for instant feedback.
    if (flashcards.value) {
      flashcards.value = flashcards.value.filter((card) => card.id !== id);
    }

    // Sync the header counter and the sidebar tag/total counters.
    await refreshNuxtData();
  };

  return {
    flashcards,
    flashcardsQuestions,
    totalAmountFlashcards,
    deleteFlashcard,
    status,
  };
}
