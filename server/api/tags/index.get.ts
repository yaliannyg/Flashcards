import { getTags } from "~~/server/services/tag.service";

export default defineEventHandler((event) => {
  return getTags();
});
