<template>
  <div ref="rootRef" class="relative">
    <button
      type="button"
      class="text-primary border-primary-emphasis/25 hover:bg-primary/10 flex h-fit items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors"
      @click="isOpen = !isOpen"
    >
      <Plus :size="14" :stroke-width="2.5" />
      {{ ADD_TAG_LABEL }}
    </button>

    <div
      v-if="isOpen"
      class="bg-surface-muted border-border absolute left-0 top-full z-10 mt-1.5 flex max-h-48 w-44 flex-col overflow-auto rounded-lg border p-1 shadow-lg"
    >
      <button
        v-for="tag in options"
        :key="tag.id"
        type="button"
        class="text-text-base hover:bg-primary/10 rounded-md px-2.5 py-1.5 text-left text-xs transition-colors"
        @click="handleSelect(tag)"
      >
        {{ tag.name }}
      </button>

      <p v-if="!options.length" class="text-text-heading px-2.5 py-1.5 text-xs">
        {{ EMPTY_LABEL }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus } from "@lucide/vue";
import { onBeforeUnmount, onMounted, ref } from "vue";
import type { TagDTO } from "~~/shared/types/tags.types";

const ADD_TAG_LABEL = "Add tag";
const EMPTY_LABEL = "No tags available";

interface Props {
  options: TagDTO[];
}

defineProps<Props>();

const emit = defineEmits<{
  (e: "select", tag: TagDTO): void;
}>();

const rootRef = ref<HTMLElement | null>(null);
const isOpen = ref(false);

const handleSelect = (tag: TagDTO) => {
  emit("select", tag);
  isOpen.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
  if (rootRef.value && !rootRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => document.addEventListener("click", handleClickOutside));
onBeforeUnmount(() => document.removeEventListener("click", handleClickOutside));
</script>
