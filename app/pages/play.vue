<template>
  <div>
    Play
    <span>{{ flashcards }}</span>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useFlashcards } from "#imports";

const route = useRoute();

const { flashcards } = useFlashcards(`${route.query.tag}`);
</script>

<style scoped></style>
