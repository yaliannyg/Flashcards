import { getAllCards } from "~~/server/services/card.service";

export default defineEventHandler(async (event) => {
  return await getAllCards();
});
