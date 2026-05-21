<template>
  <div class="flex flex-col py-2">
    <div class="flex flex-col justify-center">
      <div class="px-6 flex flex-col">
        <span class="font-light text-sm">ON THIS PAGE</span>
        <span class="font-light text-xs">Questions</span>
      </div>
    </div>
    <div class="flex flex-col text-sm flex-1 overflow-auto">
      <div class="py-1 px-6">
        <template v-if="cardsQuestions.length">
          <div v-for="question in cardsQuestions" class="flex gap-2 py-1">
            <div class="rounded p-0.5 size-1 bg-on-muted my-auto"></div>
            <span class="text-xs">{{ question }}</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCards } from "#imports";

const { cardsQuestions } = useCards();
</script>

<style scoped></style>
