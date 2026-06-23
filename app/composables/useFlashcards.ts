import { computed, toValue, type Ref } from "vue";
import { useStudyStore } from "./useStudyStore";

/**
 * Read access to flashcards for a given view. `slug` is empty for the full list
 * or a tag slug for a filtered list. Data comes from the shared `useStudyStore`,
 * which is backed by MongoDB when signed in and localStorage otherwise.
 */
export function useFlashcards(url: string | Ref<string>) {
  const store = useStudyStore();

  const flashcards = computed(() => {
    const slug = toValue(url);
    if (!slug) return store.flashcards.value;
    return store.flashcards.value.filter((card) =>
      card.tags?.some((tag) => tag.slug === slug),
    );
  });

  const totalAmountFlashcards = computed(() => flashcards.value.length);

  const flashcardsQuestions = computed(() =>
    flashcards.value.map((flashcard) => flashcard.question),
  );

  return {
    flashcards,
    flashcardsQuestions,
    totalAmountFlashcards,
    deleteFlashcard: store.deleteFlashcard,
    status: store.status,
  };
}
