import { useStudyStore } from "./useStudyStore";

/**
 * Read/write access to tags. Backed by the shared `useStudyStore` (MongoDB when
 * signed in, localStorage otherwise).
 */
export function useTags() {
  const store = useStudyStore();

  return {
    tags: store.tags,
    createTag: store.createTag,
    deleteTag: store.deleteTag,
  };
}
