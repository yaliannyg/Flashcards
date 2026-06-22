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
  if (!tags?.length) {
    throw createError({ statusCode: 400, statusMessage: "A flashcard must have at least one tag" });
  }

  const flashcard = await FlashcardModel.create({ question, answer, tags });

  await TagModel.updateMany(
    { _id: { $in: tags } },
    { $addToSet: { flashcards: flashcard._id } },
  );

  return toFlashcardDTO(flashcard);
};

interface UpdateFlashcardInput {
  question?: string;
  answer?: string;
  /** Tag ids this flashcard belongs to. Replaces the existing set when provided. */
  tags?: string[];
  /** Success/failure review counters. */
  stats?: { successes: number; failures: number };
  /** Number of difficulty dots filled in. */
  dotsActive?: number;
}

export const updateFlashcard = async (id: string, input: UpdateFlashcardInput) => {
  const existing = await FlashcardModel.findById(id);
  if (!existing) return null;

  const { tags, ...rest } = input;

  if (tags !== undefined && tags.length === 0) {
    throw createError({ statusCode: 400, statusMessage: "A flashcard must have at least one tag" });
  }

  const update: Record<string, unknown> = { ...rest };
  if (tags !== undefined) update.tags = tags;

  const flashcard = await FlashcardModel.findByIdAndUpdate(id, update, {
    new: true,
  }).populate("tags", "slug name");

  if (tags !== undefined) {
    const previous = existing.tags.map((tag) => tag.toString());
    const added = tags.filter((tag) => !previous.includes(tag));
    const removed = previous.filter((tag) => !tags.includes(tag));

    if (added.length) {
      await TagModel.updateMany(
        { _id: { $in: added } },
        { $addToSet: { flashcards: existing._id } },
      );
    }
    if (removed.length) {
      await TagModel.updateMany(
        { _id: { $in: removed } },
        { $pull: { flashcards: existing._id } },
      );
    }
  }

  return flashcard ? toFlashcardDTO(flashcard) : null;
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
