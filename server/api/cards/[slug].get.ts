import { getCardsByCategories } from "~~/server/services/card.service";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  if (!slug) return [];
  return await getCardsByCategories(slug);
});
