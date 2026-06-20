import { FlashcardModel } from "../models/Flashcards";
import { toFlashcardDTO } from "../utils/flashcard.mapper";
import { TagModel } from "../models/Tags";

interface CreateFlashcardInput {
  question: string;
  /** Tag ids this flashcard belongs to. */
  tags?: string[];
}

export const createFlashcard = async ({ question, tags }: CreateFlashcardInput) => {
  const flashcard = await FlashcardModel.create({ question, tags });
  return toFlashcardDTO(flashcard);
};

export async function getAllFlashcards() {
  const flashcards = await FlashcardModel.find().populate("tags", "slug name");
  return flashcards.map(toFlashcardDTO);
}

export async function getFlashcardsByTags(slug: string) {
  const tag = await TagModel.findOne({ slug });
  if (!tag) return [];
  const flashcards = await FlashcardModel.find({ tags: tag._id }).populate(
    "tags",
    "slug name",
  );
  return flashcards.map(toFlashcardDTO);
}

export async function totalFlashcards() {
  return await FlashcardModel.countDocuments();
}
