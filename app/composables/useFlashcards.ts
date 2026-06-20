import { computed, toValue, type Ref } from "vue";
import type { FlashcardDTO } from "~~/shared/types/flashcards.types";

export function useFlashcards(url: string | Ref<string>) {
  const {
    data: flashcards,
    status,
    error,
  } = useFetch<FlashcardDTO[]>(() => `/api/flashcards/${toValue(url)}`);

  const totalAmountFlashcards = computed(() => flashcards.value?.length ?? 0);

  const flashcardsQuestions = computed(() => {
    return flashcards.value?.map((flashcard) => flashcard.question) ?? [];
  });

  return {
    flashcards,
    flashcardsQuestions,
    totalAmountFlashcards,
    status,
  };
}
