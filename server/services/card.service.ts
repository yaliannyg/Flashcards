import { CardModel } from "../models/Cards";
import type { CardDTO } from "~~/shared/types/cards.types";
import { toCardDTO } from "../utils/card.mapper";
import { CategoryModel } from "../models/Categories";

export const createCard = async ({ front, back, category }: CardDTO) => {
  const a = await CardModel.create({ front, back, category });
  console.log(a);
  return toCardDTO(a);
};

export async function getAllCards() {
  const cards = await CardModel.find();
  return cards.map(toCardDTO);
}

export async function getCardsByCategories(slug: string) {
  const category = await CategoryModel.findOne({ slug });
  if (!category) return [];
  const cards = await CardModel.find({ category: category._id });
  return cards.map(toCardDTO);
}
