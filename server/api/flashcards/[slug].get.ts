import { getFlashcardsByTags } from "~~/server/services/flashcard.service";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  if (!slug) return [];
  return await getFlashcardsByTags(slug);
});
