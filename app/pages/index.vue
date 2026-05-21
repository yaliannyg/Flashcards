<template>
  <div class="flex">
    <CardsList v-if="cards" :cards="cards" />
  </div>
</template>

<script setup lang="ts">
import { useCards } from "#imports";
definePageMeta({
  layout: "default",
});

const { cards } = useCards();
</script>

<style scoped></style>
