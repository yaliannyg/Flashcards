import type { CardDB } from "../models/Cards";
import type { CardDTO } from "~~/shared/types/cards.types";

export const toCardDTO = (card: CardDB): CardDTO => ({
  id: card._id.toString(),
  front: card.front,
  back: card.back,
  category: card.category?.toString() ?? "",
});
