import type { TagDTO } from "~~/shared/types/tags.types";
import type { TagDB } from "../models/Tags";

export const toTagDTO = (tag: TagDB): TagDTO => ({
  id: tag._id.toString(),
  name: tag.name,
  slug: tag.slug,
  flashcards: tag.flashcards.map((flashcard) => flashcard._id.toString()),
});
