import type { TagDTO } from "./tags.types";

/** Outcome of reviewing a flashcard during a study session. */
export type ReviewResult = "correct" | "incorrect";

export interface FlashcardStats {
  /** Number of times this flashcard was answered correctly. */
  successes: number;
  /** Number of times this flashcard was answered incorrectly. */
  failures: number;
}

export interface FlashcardDTO {
  id: string;
  question: string;
  answer: string;
  /** Topic tags rendered as pills in the header. */
  tags?: TagDTO[];
  /** Success/failure review counters. */
  stats?: FlashcardStats;
  /** Number of difficulty dots filled in. */
  dotsActive?: number;
}
