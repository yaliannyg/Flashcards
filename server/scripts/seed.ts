import mongoose from "mongoose";
import { FlashcardModel } from "../models/Flashcards";
import { TagModel } from "../models/Tags";
import "dotenv/config";

const MONGO_URI = process.env.NUXT_MONGOOSE_URI;

const tagDefinitions = [
  { name: "Geography", slug: "geography" },
  { name: "Technology", slug: "technology" },
  { name: "Biology", slug: "biology" },
  { name: "Chemistry", slug: "chemistry" },
  { name: "Literature", slug: "literature" },
  { name: "Physics", slug: "physics" },
  { name: "History", slug: "history" },
  { name: "Mathematics", slug: "mathematics" },
  { name: "Astronomy", slug: "astronomy" },
  { name: "Art", slug: "art" },
];

interface FlashcardSeed {
  question: string;
  stats: { successes: number; failures: number };
  dotsActive: number;
  /** Tag slugs this flashcard is tagged with. */
  tags: string[];
}

const flashcards: FlashcardSeed[] = [
  {
    question: "What is the capital of France?",
    stats: { successes: 8, failures: 1 },
    dotsActive: 1,
    tags: ["geography", "history"],
  },
  {
    question: "What is the largest country by area?",
    stats: { successes: 5, failures: 3 },
    dotsActive: 2,
    tags: ["geography", "history"],
  },
  {
    question: "What does HTTP stand for?",
    stats: { successes: 10, failures: 0 },
    dotsActive: 1,
    tags: ["technology", "mathematics"],
  },
  {
    question: "What does CSS stand for?",
    stats: { successes: 4, failures: 2 },
    dotsActive: 2,
    tags: ["technology", "art"],
  },
  {
    question: "What is the powerhouse of the cell?",
    stats: { successes: 6, failures: 1 },
    dotsActive: 1,
    tags: ["biology", "chemistry"],
  },
  {
    question: "How many chromosomes do humans have?",
    stats: { successes: 3, failures: 4 },
    dotsActive: 3,
    tags: ["biology", "chemistry"],
  },
  {
    question: "What is the formula for water?",
    stats: { successes: 9, failures: 0 },
    dotsActive: 1,
    tags: ["chemistry", "biology"],
  },
  {
    question: "What is the atomic number of carbon?",
    stats: { successes: 2, failures: 5 },
    dotsActive: 3,
    tags: ["chemistry", "physics"],
  },
  {
    question: "Who wrote 'Don Quixote'?",
    stats: { successes: 7, failures: 2 },
    dotsActive: 2,
    tags: ["literature", "history"],
  },
  {
    question: "Who wrote '1984'?",
    stats: { successes: 5, failures: 1 },
    dotsActive: 1,
    tags: ["literature", "history"],
  },
  {
    question: "What is the speed of light in a vacuum?",
    stats: { successes: 4, failures: 3 },
    dotsActive: 2,
    tags: ["physics", "mathematics"],
  },
  {
    question: "What is Newton's second law of motion?",
    stats: { successes: 6, failures: 2 },
    dotsActive: 2,
    tags: ["physics", "mathematics"],
  },
  {
    question: "What year did World War II end?",
    stats: { successes: 8, failures: 1 },
    dotsActive: 1,
    tags: ["history", "geography"],
  },
  {
    question: "In what year did the French Revolution begin?",
    stats: { successes: 3, failures: 3 },
    dotsActive: 2,
    tags: ["history", "literature"],
  },
  {
    question: "What is the Pythagorean theorem?",
    stats: { successes: 7, failures: 1 },
    dotsActive: 1,
    tags: ["mathematics", "physics"],
  },
  {
    question: "What is the value of π (pi) to 5 decimal places?",
    stats: { successes: 2, failures: 4 },
    dotsActive: 3,
    tags: ["mathematics", "physics"],
  },
  {
    question: "What planet is known as the Red Planet?",
    stats: { successes: 9, failures: 0 },
    dotsActive: 1,
    tags: ["astronomy", "physics"],
  },
  {
    question: "How many planets are in the solar system?",
    stats: { successes: 6, failures: 1 },
    dotsActive: 1,
    tags: ["astronomy", "physics"],
  },
  {
    question: "Who painted the Mona Lisa?",
    stats: { successes: 5, failures: 2 },
    dotsActive: 2,
    tags: ["art", "history"],
  },
  {
    question: "Who painted 'The Starry Night'?",
    stats: { successes: 4, failures: 2 },
    dotsActive: 2,
    tags: ["art", "history"],
  },
];

async function seed() {
  await mongoose.connect(MONGO_URI as string);
  console.log("Connected to MongoDB");

  await FlashcardModel.deleteMany({});
  await TagModel.deleteMany({});
  console.log("Cleared existing flashcards and tags");

  const insertedTags = await TagModel.insertMany(tagDefinitions);
  console.log(`Seeded ${insertedTags.length} tags`);

  const tagMap = Object.fromEntries(insertedTags.map((tag) => [tag.slug, tag._id]));

  const flashcardDocs = flashcards.map(({ tags, ...flashcard }) => ({
    ...flashcard,
    tags: tags.map((slug) => tagMap[slug]),
  }));

  const insertedFlashcards = await FlashcardModel.insertMany(flashcardDocs);
  console.log(`Seeded ${insertedFlashcards.length} flashcards`);

  for (const tag of insertedTags) {
    const tagFlashcards = insertedFlashcards.filter((f) =>
      f.tags?.some((tagId) => tagId.toString() === tag._id.toString()),
    );
    await TagModel.findByIdAndUpdate(tag._id, {
      flashcards: tagFlashcards.map((f) => f._id),
    });
  }
  console.log("Updated tag flashcard references");

  await mongoose.disconnect();
  console.log("Done");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
