import type { TagDTO } from "~~/shared/types/tags.types";
import type { TagDB } from "../models/Tags";

export const toTagDTO = (tag: TagDB, flashcardCount = 0): TagDTO => ({
  id: tag._id.toString(),
  name: tag.name,
  slug: tag.slug,
  flashcardCount,
});
