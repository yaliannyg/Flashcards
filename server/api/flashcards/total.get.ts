import { totalFlashcards } from "~~/server/services/flashcard.service";
import { handleApiError } from "~~/server/utils/handle-error";

export default defineEventHandler(async () => {
  try {
    return await totalFlashcards();
  } catch (error) {
    handleApiError(error, "GET /api/flashcards/total");
  }
});
