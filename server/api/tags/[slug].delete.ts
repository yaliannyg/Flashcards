import { deleteTag } from "~~/server/services/tag.service";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: "Tag slug is required" });
  }
  return await deleteTag(slug);
});
