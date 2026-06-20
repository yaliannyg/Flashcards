import { createTag } from "~~/server/services/tag.service";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return createTag(body);
});
