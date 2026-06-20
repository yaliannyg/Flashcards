import { Schema, model, Types } from "mongoose";
import type { InferSchemaType } from "mongoose";

const flashcardSchema = new Schema(
  {
    question: { type: String, required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    stats: {
      successes: { type: Number, default: 0 },
      failures: { type: Number, default: 0 },
    },
    dotsActive: { type: Number, default: 0 },
  },
  { autoIndex: true, timestamps: true },
);

export type FlashcardDB = InferSchemaType<typeof flashcardSchema> & {
  _id: Types.ObjectId;
};

export const FlashcardModel = model("Flashcard", flashcardSchema);
