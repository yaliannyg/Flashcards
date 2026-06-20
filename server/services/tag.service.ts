import { TagModel } from "../models/Tags";
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

  return tags.map(toTagDTO);
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
