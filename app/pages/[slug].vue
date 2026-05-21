<template>
  <div class="size-full">
    <CardsList v-if="cards" :cards="cards" />
  </div>
</template>

<script setup lang="ts">
import { useCards } from "#imports";
import { useSlug } from "~/composables/useSlug";

const { cards } = await useCards();
</script>

<style scoped></style>
