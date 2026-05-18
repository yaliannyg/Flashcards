import type { CategoryDTO } from "~~/shared/types/categories.types";
import { CategoryDB } from "../models/Categories";

export const toCategoryDTO = (category: CategoryDB): CategoryDTO => ({
  id: category._id.toString(),
  name: category.name,
  slug: category.slug,
  cards: category.cards.map((card) => card._id.toString()),
});
