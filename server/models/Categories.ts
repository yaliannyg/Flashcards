import { Schema, InferSchemaType, model } from "mongoose";

const categorySchema = new Schema({
  name: { type: String, required: true, trim: true },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  cards: [{ type: Schema.Types.ObjectId, ref: "Card" }],
});

export type CategoryDB = InferSchemaType<typeof categorySchema> & {
  _id: Types.ObjectId;
};

export const CategoryModel = model("Category", categorySchema);
