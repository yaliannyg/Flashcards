import type { FlashcardDTO } from "~~/shared/types/flashcards.types";
import type { TagDTO } from "~~/shared/types/tags.types";
import { useAuth } from "./useAuth";
import * as guest from "~/utils/guestStorage";
import type {
  CreateFlashcardInput,
  UpdateFlashcardInput,
} from "~/utils/guestStorage";

type LoadStatus = "idle" | "pending" | "ready";

/**
 * Single source of truth for flashcards and tags. When the owner is signed in
 * the data comes from the MongoDB API; otherwise it comes from localStorage
 * (`guestStorage`). State lives in `useState` so every component shares it.
 */
export function useStudyStore() {
  const { isAuthenticated } = useAuth();

  const flashcards = useState<FlashcardDTO[]>("study:flashcards", () => []);
  const tags = useState<TagDTO[]>("study:tags", () => []);
  const status = useState<LoadStatus>("study:status", () => "idle");

  /** Reload both collections from the active backend. */
  const refresh = async () => {
    status.value = "pending";

    if (isAuthenticated.value) {
      const [loadedFlashcards, loadedTags] = await Promise.all([
        $fetch<FlashcardDTO[]>("/api/flashcards"),
        $fetch<TagDTO[]>("/api/tags"),
      ]);
      flashcards.value = loadedFlashcards;
      tags.value = loadedTags;
    } else {
      flashcards.value = guest.getFlashcards();
      tags.value = guest.getTags();
    }

    status.value = "ready";
  };

  const createFlashcard = async (input: CreateFlashcardInput, reload = true) => {
    if (isAuthenticated.value) {
      await $fetch("/api/flashcards", { method: "POST", body: input });
    } else {
      guest.createFlashcard(input);
    }
    if (reload) await refresh();
  };

  const updateFlashcard = async (
    id: string,
    input: UpdateFlashcardInput,
    reload = true,
  ) => {
    if (isAuthenticated.value) {
      await $fetch(`/api/flashcards/${id}` as "/api/flashcards/:id", {
        method: "PATCH",
        body: input,
      });
    } else {
      guest.updateFlashcard(id, input);
    }
    if (reload) await refresh();
  };

  const deleteFlashcard = async (id: string) => {
    if (isAuthenticated.value) {
      await $fetch(`/api/flashcards/${id}` as "/api/flashcards/:id", { method: "DELETE" });
    } else {
      guest.deleteFlashcard(id);
    }
    await refresh();
  };

  const getFlashcard = async (id: string): Promise<FlashcardDTO | null> => {
    // Prefer the already-loaded list so this works the same in both modes.
    const cached = flashcards.value.find((card) => card.id === id);
    if (cached) return cached;

    if (isAuthenticated.value) {
      return await $fetch<FlashcardDTO>(
        `/api/flashcards/${id}` as "/api/flashcards/:id",
      ).catch(() => null);
    }
    return guest.getFlashcardById(id);
  };

  const createTag = async (name: string) => {
    if (isAuthenticated.value) {
      await $fetch("/api/tags", { method: "POST", body: { name } });
    } else {
      guest.createTag(name);
    }
    await refresh();
  };

  const deleteTag = async (slug: string) => {
    if (isAuthenticated.value) {
      await $fetch(`/api/tags/${slug}` as "/api/tags/:slug", { method: "DELETE" });
    } else {
      guest.deleteTag(slug);
    }
    await refresh();
  };

  return {
    flashcards,
    tags,
    status,
    refresh,
    createFlashcard,
    updateFlashcard,
    deleteFlashcard,
    getFlashcard,
    createTag,
    deleteTag,
  };
}
