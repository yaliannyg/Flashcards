import { createTag } from "~~/server/services/tag.service";
import { handleApiError } from "~~/server/utils/handle-error";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    return await createTag(body);
  } catch (error) {
    handleApiError(error, "POST /api/tags");
  }
});
