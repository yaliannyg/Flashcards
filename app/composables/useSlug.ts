import { ref, computed } from "vue";

export function useSlug() {
  const route = useRoute();

  const slugName = computed(() => route.params.slug?.toString() || "");

  return { slugName };
}
