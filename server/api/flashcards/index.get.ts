import { getAllFlashcards } from "~~/server/services/flashcard.service";
import { handleApiError } from "~~/server/utils/handle-error";

export default defineEventHandler(async () => {
  try {
    return await getAllFlashcards();
  } catch (error) {
    handleApiError(error, "GET /api/flashcards");
  }
});
