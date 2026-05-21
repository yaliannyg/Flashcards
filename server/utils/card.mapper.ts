import type { CardDB } from "../models/Cards";
import type { CardDTO } from "~~/shared/types/cards.types";
import type { CategoryDTO } from "~~/shared/types/categories.types";

export const toCardDTO = (card: CardDB): CardDTO => {
  const cat = card.category as unknown as {
    _id: { toString(): string };
    slug: string;
    name: string;
  } | null;
  
  const category: CategoryDTO = cat
    ? { id: cat._id.toString(), slug: cat.slug, name: cat.name }
    : { id: "", slug: "", name: "" };

  return {
    id: card._id.toString(),
    front: card.front,
    back: card.back,
    category,
  };
};
