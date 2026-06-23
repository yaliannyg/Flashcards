import type { FlashcardDTO, FlashcardStats } from "~~/shared/types/flashcards.types";
import type { TagDTO } from "~~/shared/types/tags.types";

/**
 * localStorage-backed flashcard/tag repository used when the owner is NOT
 * signed in. It mirrors the server services (`flashcard.service`, `tag.service`)
 * so the client data layer behaves the same in guest and authenticated modes.
 * All functions are client-only; on the server they no-op or return empty.
 */

const FLASHCARDS_KEY = "flashcards:guest:flashcards";
const TAGS_KEY = "flashcards:guest:tags";

interface RawFlashcard {
  id: string;
  question: string;
  answer: string;
  /** Tag ids this flashcard belongs to. */
  tagIds: string[];
  stats: FlashcardStats;
  dotsActive: number;
  /** Epoch ms, used to sort newest-first like the DB list. */
  createdAt: number;
}

interface RawTag {
  id: string;
  slug: string;
  name: string;
}

export interface CreateFlashcardInput {
  question: string;
  answer: string;
  tags: string[];
}

export interface UpdateFlashcardInput {
  question?: string;
  answer?: string;
  tags?: string[];
  stats?: FlashcardStats;
  dotsActive?: number;
}

function read<T>(key: string): T[] {
  if (!import.meta.client) return [];
  try {
    return JSON.parse(localStorage.getItem(key) ?? "[]") as T[];
  } catch {
    return [];
  }
}

function write<T>(key: string, value: T[]): void {
  if (!import.meta.client) return;
  localStorage.setItem(key, JSON.stringify(value));
}

const slugify = (name: string) =>
  name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export function getTags(): TagDTO[] {
  const rawTags = read<RawTag>(TAGS_KEY);
  const rawCards = read<RawFlashcard>(FLASHCARDS_KEY);

  // Derive each tag's count from the flashcard relationship, like the server.
  const countByTag = new Map<string, number>();
  for (const card of rawCards) {
    for (const tagId of card.tagIds) {
      countByTag.set(tagId, (countByTag.get(tagId) ?? 0) + 1);
    }
  }

  return rawTags.map((tag) => ({
    id: tag.id,
    slug: tag.slug,
    name: tag.name,
    flashcardCount: countByTag.get(tag.id) ?? 0,
  }));
}

export function getFlashcards(): FlashcardDTO[] {
  const tagsById = new Map(getTags().map((tag) => [tag.id, tag]));

  return read<RawFlashcard>(FLASHCARDS_KEY)
    .sort((a, b) => b.createdAt - a.createdAt)
    .map((card) => ({
      id: card.id,
      question: card.question,
      answer: card.answer,
      tags: card.tagIds
        .map((id) => tagsById.get(id))
        .filter((tag): tag is TagDTO => Boolean(tag)),
      stats: card.stats,
      dotsActive: card.dotsActive,
    }));
}

export function getFlashcardById(id: string): FlashcardDTO | null {
  return getFlashcards().find((card) => card.id === id) ?? null;
}

export function createFlashcard({ question, answer, tags }: CreateFlashcardInput): void {
  if (!tags?.length) throw new Error("A flashcard must have at least one tag");

  const cards = read<RawFlashcard>(FLASHCARDS_KEY);
  cards.push({
    id: crypto.randomUUID(),
    question,
    answer,
    tagIds: tags,
    stats: { successes: 0, failures: 0 },
    dotsActive: 0,
    createdAt: Date.now(),
  });
  write(FLASHCARDS_KEY, cards);
}

export function updateFlashcard(id: string, input: UpdateFlashcardInput): void {
  if (input.tags !== undefined && input.tags.length === 0) {
    throw new Error("A flashcard must have at least one tag");
  }

  const cards = read<RawFlashcard>(FLASHCARDS_KEY);
  const card = cards.find((c) => c.id === id);
  if (!card) return;

  if (input.question !== undefined) card.question = input.question;
  if (input.answer !== undefined) card.answer = input.answer;
  if (input.tags !== undefined) card.tagIds = input.tags;
  if (input.stats !== undefined) card.stats = input.stats;
  if (input.dotsActive !== undefined) card.dotsActive = input.dotsActive;

  write(FLASHCARDS_KEY, cards);
}

export function deleteFlashcard(id: string): void {
  write(
    FLASHCARDS_KEY,
    read<RawFlashcard>(FLASHCARDS_KEY).filter((card) => card.id !== id),
  );
}

export function createTag(name: string): void {
  const trimmed = name.trim();
  if (!trimmed) throw new Error("Tag name is required");

  const tags = read<RawTag>(TAGS_KEY);
  tags.push({ id: crypto.randomUUID(), name: trimmed, slug: slugify(trimmed) });
  write(TAGS_KEY, tags);
}

export function deleteTag(slug: string): void {
  const tags = read<RawTag>(TAGS_KEY);
  const tag = tags.find((t) => t.slug === slug);
  if (!tag) return;

  // Mirror the server: drop flashcards left with no tags, untag the rest.
  const remaining = read<RawFlashcard>(FLASHCARDS_KEY)
    .map((card) => ({ ...card, tagIds: card.tagIds.filter((id) => id !== tag.id) }))
    .filter((card) => card.tagIds.length > 0);

  write(FLASHCARDS_KEY, remaining);
  write(TAGS_KEY, tags.filter((t) => t.id !== tag.id));
}
