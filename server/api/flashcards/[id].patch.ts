import { updateFlashcard } from "~~/server/services/flashcard.service";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "Missing flashcard id" });
  }

  const body = await readBody(event);
  const flashcard = await updateFlashcard(id, body);

  if (!flashcard) {
    throw createError({ statusCode: 404, statusMessage: "Flashcard not found" });
  }

  return flashcard;
});
