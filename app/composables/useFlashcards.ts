import { computed } from "vue";
import type { FlashcardDTO } from "~~/shared/types/flashcards.types";

export function useFlashcards(url: string) {
  const {
    data: flashcards,
    status,
    error,
  } = useFetch<FlashcardDTO[]>(`/api/flashcards/${url}`);

  const { data: totalAmountFlashcards } = useFetch<number>(`/api/flashcards/total`);

  const flashcardsQuestions = computed(() => {
    return flashcards.value?.map((flashcard) => flashcard.question) ?? [];
  });

  return {
    flashcards,
    flashcardsQuestions,
    totalAmountFlashcards,
  };
}
