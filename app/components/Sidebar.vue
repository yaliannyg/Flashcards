<template>
  <aside
    class="flex flex-col shrink-0 h-screen w-48 border-r border-border bg-surface"
  >
    <div class="px-5 pt-6 pb-3">
      <span
        class="text-xxs tracking-widest uppercase text-text-heading font-semibold"
      >
        Tags
      </span>
    </div>

    <div class="flex-1 overflow-y-auto px-3 space-y-px">
      <div
        v-for="tag in tags"
        :key="tag.label"
        class="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer group"
        :style="{ transition: 'background 0.15s' }"
      >
        <div class="flex items-center gap-2.5">
          <Tag :size="12" class="text-text-heading" />
          <span class="text-xs text-text-muted font-normal">
            {{ tag.label }}
          </span>
        </div>
        <span
          class="text-xxs px-1.5 py-0.5 rounded-full bg-surface-muted text-text-muted"
        >
          {{ tag.count }}
        </span>
      </div>
    </div>

    <div class="px-4 py-5">
      <button
        class="flex items-center justify-center gap-2 w-full py-2 rounded-lg text-xs transition-opacity hover:opacity-80 bg-surface-muted text-primary-emphasis font-semibold border-primary-emphasis/25 capitalize"
      >
        <Plus :size="13" :stroke-width="2.5" />
        new tag
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { Plus, Tag } from "@lucide/vue";

const tags = [
  { label: "Algorithms", count: 7 },
  { label: "Biology", count: 3 },
  { label: "History", count: 5 },
  { label: "Mathematics", count: 4 },
  { label: "Geography", count: 6 },
  { label: "Physics", count: 3 },
  { label: "Chemistry", count: 5 },
  { label: "Literature", count: 4 },
  { label: "Astronomy", count: 2 },
];
</script>

<style scoped></style>
<!-- onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            } -->
