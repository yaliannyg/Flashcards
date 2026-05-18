import mongoose from "mongoose";
import { CardModel } from "../models/Cards";
import { CategoryModel } from "../models/Categories";
import "dotenv/config";

const MONGO_URI = process.env.NUXT_MONGOOSE_URI;

const categories = [
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

const cardsByCategorySlug: Record<string, { front: string; back: string }[]> = {
  geography: [
    { front: "What is the capital of France?", back: "Paris" },
    { front: "What is the largest country by area?", back: "Russia" },
  ],
  technology: [
    { front: "What does HTTP stand for?", back: "HyperText Transfer Protocol" },
    { front: "What does CSS stand for?", back: "Cascading Style Sheets" },
  ],
  biology: [
    { front: "What is the powerhouse of the cell?", back: "The mitochondria" },
    { front: "How many chromosomes do humans have?", back: "46 (23 pairs)" },
  ],
  chemistry: [
    {
      front: "What is the formula for water?",
      back: "H₂O (two hydrogen atoms bonded to one oxygen atom)",
    },
    { front: "What is the atomic number of carbon?", back: "6" },
  ],
  literature: [
    { front: "Who wrote 'Don Quixote'?", back: "Miguel de Cervantes" },
    { front: "Who wrote '1984'?", back: "George Orwell" },
  ],
  physics: [
    {
      front: "What is the speed of light in a vacuum?",
      back: "Approximately 299,792,458 meters per second (≈ 3 × 10⁸ m/s)",
    },
    {
      front: "What is Newton's second law of motion?",
      back: "F = ma (Force equals mass times acceleration)",
    },
  ],
  history: [
    { front: "What year did World War II end?", back: "1945" },
    { front: "In what year did the French Revolution begin?", back: "1789" },
  ],
  mathematics: [
    {
      front: "What is the Pythagorean theorem?",
      back: "a² + b² = c², where c is the hypotenuse of a right triangle",
    },
    {
      front: "What is the value of π (pi) to 5 decimal places?",
      back: "3.14159",
    },
  ],
  astronomy: [
    { front: "What planet is known as the Red Planet?", back: "Mars" },
    { front: "How many planets are in the solar system?", back: "8" },
  ],
  art: [
    { front: "Who painted the Mona Lisa?", back: "Leonardo da Vinci" },
    { front: "Who painted 'The Starry Night'?", back: "Vincent van Gogh" },
  ],
};

async function seed() {
  await mongoose.connect(MONGO_URI as string);
  console.log("Connected to MongoDB");

  await CardModel.deleteMany({});
  await CategoryModel.deleteMany({});
  console.log("Cleared existing cards and categories");

  const insertedCategories = await CategoryModel.insertMany(categories);
  console.log(`Seeded ${insertedCategories.length} categories`);

  const categoryMap = Object.fromEntries(
    insertedCategories.map((cat) => [cat.slug, cat._id]),
  );

  const cards = [];
  for (const [slug, cardDefs] of Object.entries(cardsByCategorySlug)) {
    const categoryId = categoryMap[slug];
    for (const card of cardDefs) {
      cards.push({ ...card, category: categoryId });
    }
  }

  const insertedCards = await CardModel.insertMany(cards);
  console.log(`Seeded ${insertedCards.length} cards`);

  for (const cat of insertedCategories) {
    const catCards = insertedCards.filter(
      (c) => c.category?.toString() === cat._id.toString(),
    );
    await CategoryModel.findByIdAndUpdate(cat._id, {
      cards: catCards.map((c) => c._id),
    });
  }
  console.log("Updated category card references");

  await mongoose.disconnect();
  console.log("Done");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
