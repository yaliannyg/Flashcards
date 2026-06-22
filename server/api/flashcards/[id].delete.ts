import { deleteFlashcard } from "~~/server/services/flashcard.service";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "Missing flashcard id" });
  }

  const result = await deleteFlashcard(id);

  if (!result) {
    throw createError({ statusCode: 404, statusMessage: "Flashcard not found" });
  }

  return result;
});
