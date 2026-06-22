import { FlashcardModel } from "../models/Flashcards";
import { toFlashcardDTO } from "../utils/flashcard.mapper";
import { TagModel } from "../models/Tags";

interface CreateFlashcardInput {
  question: string;
  answer: string;
  /** Tag ids this flashcard belongs to. */
  tags?: string[];
}

export const createFlashcard = async ({ question, answer, tags }: CreateFlashcardInput) => {
  const flashcard = await FlashcardModel.create({ question, answer, tags });

  if (tags?.length) {
    await TagModel.updateMany(
      { _id: { $in: tags } },
      { $addToSet: { flashcards: flashcard._id } },
    );
  }

  return toFlashcardDTO(flashcard);
};

export async function getAllFlashcards() {
  const flashcards = await FlashcardModel.find()
    .sort({ createdAt: -1 })
    .populate("tags", "slug name");
  return flashcards.map(toFlashcardDTO);
}

export async function getFlashcardsByTags(slug: string) {
  const tag = await TagModel.findOne({ slug });
  if (!tag) return [];
  const flashcards = await FlashcardModel.find({ tags: tag._id })
    .sort({ createdAt: -1 })
    .populate("tags", "slug name");
  return flashcards.map(toFlashcardDTO);
}

export async function totalFlashcards() {
  return await FlashcardModel.countDocuments();
}
