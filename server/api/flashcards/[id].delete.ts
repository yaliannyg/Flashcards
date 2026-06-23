import { deleteFlashcard } from "~~/server/services/flashcard.service";
import { handleApiError } from "~~/server/utils/handle-error";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    if (!id) {
      throw createError({ statusCode: 400, statusMessage: "Missing flashcard id" });
    }

    const result = await deleteFlashcard(id);

    if (!result) {
      throw createError({ statusCode: 404, statusMessage: "Flashcard not found" });
    }

    return result;
  } catch (error) {
    handleApiError(error, "DELETE /api/flashcards/:id");
  }
});
