import { getFlashcardsByTags } from "~~/server/services/flashcard.service";
import { handleApiError } from "~~/server/utils/handle-error";

export default defineEventHandler(async (event) => {
  try {
    const slug = getRouterParam(event, "slug");
    if (!slug) return [];
    return await getFlashcardsByTags(slug);
  } catch (error) {
    handleApiError(error, "GET /api/flashcards/tag/:slug");
  }
});
