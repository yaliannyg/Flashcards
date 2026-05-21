import { ref, computed } from "vue";

import { useSlug } from "#imports";
export function useCards() {
  const slug = useSlug();

  const {
    data: cards,
    status,
    error,
  } = useFetch<CardDTO[]>(`/api/cards/${slug.slugName.value}`);

  const { data: totalAmoundCards } = useFetch<number>(`/api/cards/total`);

  const cardsQuestions = computed(() => {
    return cards.value?.map((card) => card.front) ?? [];
  });

  return {
    cards,
    cardsQuestions,
    totalAmoundCards,
  };
}
