import { TagModel } from "../models/Tags";
import { toTagDTO } from "../utils/tag.mapper";

export async function getTags() {
  const tags = await TagModel.find();

  return tags.map(toTagDTO);
}
