import { createCard } from "~~/server/services/card.service";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return createCard(body);
});
