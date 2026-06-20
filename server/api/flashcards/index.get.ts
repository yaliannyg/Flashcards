import { getAllFlashcards } from "~~/server/services/flashcard.service";

export default defineEventHandler(async (event) => {
  return await getAllFlashcards();
});
