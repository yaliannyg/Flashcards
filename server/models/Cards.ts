import { Schema, InferSchemaType, model } from "mongoose";

const cardSchema = new Schema(
  {
    front: { type: String, required: true },
    back: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
  },
  { autoIndex: true, timestamps: true },
);

export type CardDB = InferSchemaType<typeof cardSchema> & {
  _id: Types.ObjectId;
};

export const CardModel = model("Card", cardSchema);
