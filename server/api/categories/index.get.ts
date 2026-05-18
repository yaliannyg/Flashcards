import { getCategories } from "~~/server/services/category.service";

export default defineEventHandler((event) => {
  return getCategories();
});
