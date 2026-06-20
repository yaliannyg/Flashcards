<template>
  <div
    class="flex max-w-7xl size-full h-screen m-auto text-xs overflow-hidden bg-background"
  >
    <Sidebar />

    <main class="flex-1 flex flex-col">
      <div class="flex w-full items-center px-2 py-4">
        <div
          class="flex flex-col items-baseline justify-center gap-1 text-lg text-text-base font-semibold"
        >
          <h1>My catalog</h1>
          <p  class="mt-1 text-xs text-text-heading font-normal">
            <span v-if="status === 'success'">{{ totalAmountFlashcards }}</span>
            
            flashcard sets
          </p>
        </div>
        <BaseButton label="Add Flash Card" @click="handleAddFlashCard" />
      </div>

      <div class="size-full max-h-full flex-1 overflow-auto">
        <slot></slot>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import BaseButton from "@/components/UI/BaseButton.vue";
import Sidebar from "@/components/Sidebar.vue";
import { useFlashcards } from "#imports";
import { useSlug } from "~/composables/useSlug";

const slug = useSlug();
const { totalAmountFlashcards, status } = useFlashcards(slug.slugName);

function handleAddFlashCard() {
  console.log("TO DO");
}
</script>

<style scoped></style>
