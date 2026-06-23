import { getFlashcardById } from "~~/server/services/flashcard.service";
import { handleApiError } from "~~/server/utils/handle-error";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    if (!id) {
      throw createError({ statusCode: 400, statusMessage: "Missing flashcard id" });
    }

    const flashcard = await getFlashcardById(id);

    if (!flashcard) {
      throw createError({ statusCode: 404, statusMessage: "Flashcard not found" });
    }

    return flashcard;
  } catch (error) {
    handleApiError(error, "GET /api/flashcards/:id");
  }
});
