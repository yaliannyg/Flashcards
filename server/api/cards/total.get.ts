import { totalCards } from "~~/server/services/card.service";

export default defineEventHandler(async (event) => {
  return await totalCards();
});
