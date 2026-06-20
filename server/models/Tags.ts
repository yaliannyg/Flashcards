import { Schema, model, Types } from "mongoose";
import type { InferSchemaType } from "mongoose";

const tagSchema = new Schema({
  name: { type: String, required: true, trim: true },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  flashcards: [{ type: Schema.Types.ObjectId, ref: "Flashcard" }],
});

export type TagDB = InferSchemaType<typeof tagSchema> & {
  _id: Types.ObjectId;
};

export const TagModel = model("Tag", tagSchema);
