import type { FlashcardDB } from "../models/Flashcards";
import type { FlashcardDTO } from "~~/shared/types/flashcards.types";
import type { TagDTO } from "~~/shared/types/tags.types";

export const toFlashcardDTO = (flashcard: FlashcardDB): FlashcardDTO => {
  const populatedTags = flashcard.tags as unknown as {
    _id: { toString(): string };
    slug: string;
    name: string;
  }[];

  const tags: TagDTO[] = populatedTags.map((tag) => ({
    id: tag._id.toString(),
    slug: tag.slug,
    name: tag.name,
  }));

  return {
    id: flashcard._id.toString(),
    question: flashcard.question,
    tags,
    stats: flashcard.stats,
    dotsActive: flashcard.dotsActive,
  };
};
