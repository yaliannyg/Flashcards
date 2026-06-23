import { getTags } from "~~/server/services/tag.service";
import { handleApiError } from "~~/server/utils/handle-error";

export default defineEventHandler(async () => {
  try {
    return await getTags();
  } catch (error) {
    handleApiError(error, "GET /api/tags");
  }
});
