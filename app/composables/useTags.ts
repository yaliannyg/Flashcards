import type { TagDTO } from "~~/shared/types/tags.types";

export async function useTags() {
  const { data: tags } = await useFetch<TagDTO[]>("/api/tags", { key: "tags" });

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

  const deleteTag = async (slug: string) => {
    await $fetch(`/api/tags/${slug}`, { method: "DELETE" });

    if (tags.value) {
      tags.value = tags.value.filter((tag) => tag.slug !== slug);
    }
  };

  return { tags, createTag, deleteTag };
}
