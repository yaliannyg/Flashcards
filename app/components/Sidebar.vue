<template>
  <div
    class="flex flex-col h-screen"
   
  >
    <div
      class="h-14 flex flex-col justify-center border-b border-border text-on-surface border-r"
    >
      <div class="px-6 py-2">
        <h3 class="font-semibold">Flashcards</h3>
      </div>
    </div>
    <div class="grid grid-rows-2 gap-2 flex-1 min-h-0 border-border border-r">
      <QuestionsSummary />

      <CategorySummary />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
