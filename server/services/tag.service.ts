import { Types } from "mongoose";
import { TagModel } from "../models/Tags";
import { FlashcardModel } from "../models/Flashcards";
import { toTagDTO } from "../utils/tag.mapper";

interface CreateTagInput {
  name: string;
}

const slugify = (name: string) =>
  name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export async function getTags() {
  const tags = await TagModel.find();

  // Derive each tag's flashcard count from the authoritative flashcard.tags
  // relationship rather than a denormalized array that can drift out of sync.
  const counts = await FlashcardModel.aggregate<{
    _id: Types.ObjectId;
    count: number;
  }>([{ $unwind: "$tags" }, { $group: { _id: "$tags", count: { $sum: 1 } } }]);

  const countByTag = new Map(counts.map((c) => [c._id.toString(), c.count]));

  return tags.map((tag) => toTagDTO(tag, countByTag.get(tag._id.toString()) ?? 0));
}

export async function createTag({ name }: CreateTagInput) {
  const trimmedName = name.trim();
  if (!trimmedName) {
    throw createError({ statusCode: 400, statusMessage: "Tag name is required" });
  }

  const tag = await TagModel.create({
    name: trimmedName,
    slug: slugify(trimmedName),
  });

  return toTagDTO(tag);
}

export async function deleteTag(slug: string) {
  const tag = await TagModel.findOne({ slug });
  if (!tag) {
    throw createError({ statusCode: 404, statusMessage: "Tag not found" });
  }

  // Delete flashcards that belong only to this tag; for flashcards that have
  // other tags too, just remove this tag from their list.
  await FlashcardModel.deleteMany({ tags: [tag._id] });
  await FlashcardModel.updateMany(
    { tags: tag._id },
    { $pull: { tags: tag._id } },
  );

  await tag.deleteOne();

  return { id: tag._id.toString() };
}
