import { createFlashcard } from "~~/server/services/flashcard.service";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return createFlashcard(body);
});
