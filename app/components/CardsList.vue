<template>
  <div class="grid grid-cols-3 py-4 px-4 gap-2">
    <div v-for="card in cards" class="h-32 px-4">
      <Card v-bind="card" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CardDTO } from "~~/shared/types/cards.types";

interface CardsListProps {
  cards: CardDTO[];
}
defineProps<CardsListProps>();
</script>

<style scoped></style>
