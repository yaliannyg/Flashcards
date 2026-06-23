import { watch } from "vue";
import { useAuth } from "~/composables/useAuth";
import { useStudyStore } from "~/composables/useStudyStore";

/**
 * Load flashcards/tags on the client once the app starts, and reload whenever
 * the owner signs in or out (which swaps the backend between MongoDB and
 * localStorage). Client-only because guest data lives in localStorage.
 */
export default defineNuxtPlugin(() => {
  const { isAuthenticated } = useAuth();
  const store = useStudyStore();

  store.refresh();

  watch(isAuthenticated, () => store.refresh());
});
