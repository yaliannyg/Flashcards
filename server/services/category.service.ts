import { CategoryModel } from "../models/Categories";
import { toCategoryDTO } from "../utils/category.mapper";

export async function getCategories() {
  const categories = await CategoryModel.find();

  return categories.map(toCategoryDTO);
}
