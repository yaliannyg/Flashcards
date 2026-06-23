import { deleteTag } from "~~/server/services/tag.service";
import { handleApiError } from "~~/server/utils/handle-error";

export default defineEventHandler(async (event) => {
  try {
    const slug = getRouterParam(event, "slug");
    if (!slug) {
      throw createError({ statusCode: 400, statusMessage: "Tag slug is required" });
    }
    return await deleteTag(slug);
  } catch (error) {
    handleApiError(error, "DELETE /api/tags/:slug");
  }
});
