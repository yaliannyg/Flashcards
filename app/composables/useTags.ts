import type { TagDTO } from "~~/shared/types/tags.types";

export async function useTags() {
  const { data: tags } = await useFetch<TagDTO[]>("/api/tags");

  const createTag = async (name: string) => {
    const tag = await $fetch<TagDTO>("/api/tags", {
      method: "POST",
      body: { name },
    });

    if (tags.value) {
      tags.value = [...tags.value, tag];
    }

    return tag;
  };

  return { tags, createTag };
}
