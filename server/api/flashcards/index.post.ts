import { createFlashcard } from "~~/server/services/flashcard.service";
import { handleApiError } from "~~/server/utils/handle-error";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    return await createFlashcard(body);
  } catch (error) {
    handleApiError(error, "POST /api/flashcards");
  }
});
