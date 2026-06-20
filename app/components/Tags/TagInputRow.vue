<template>
  <div class="flex items-center gap-2.5 px-3 py-2 rounded-lg">
    <Tag :size="12" class="text-text-heading shrink-0" />
    <input
      ref="inputRef"
      v-model="name"
      type="text"
      :placeholder="PLACEHOLDER"
      class="flex-1 min-w-0 bg-transparent text-xs text-text-base placeholder:text-text-heading outline-none"
      @keydown.enter="handleSave"
      @keydown.escape="emit('cancel')"
    />
    <div class="flex items-center gap-1.5 shrink-0">
      <button
        type="button"
        :aria-label="SAVE_LABEL"
        class="flex items-center justify-center text-primary-emphasis hover:opacity-80"
        @click="handleSave"
      >
        <Save :size="12" />
      </button>
      <button
        type="button"
        :aria-label="CANCEL_LABEL"
        class="flex items-center justify-center text-text-muted hover:opacity-80"
        @click="emit('cancel')"
      >
        <X :size="12" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Save, Tag, X } from "@lucide/vue";
import { nextTick, onMounted, ref } from "vue";

const PLACEHOLDER = "Tag name";
const SAVE_LABEL = "Save tag";
const CANCEL_LABEL = "Cancel";

const emit = defineEmits<{
  (e: "save", name: string): void;
  (e: "cancel"): void;
}>();

const name = ref("");
const inputRef = ref<HTMLInputElement | null>(null);

const handleSave = () => {
  const trimmedName = name.value.trim();
  if (!trimmedName) {
    emit("cancel");
    return;
  }
  emit("save", trimmedName);
};

onMounted(() => {
  nextTick(() => inputRef.value?.focus());
});
</script>
