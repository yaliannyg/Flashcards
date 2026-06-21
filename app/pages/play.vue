<template>
  <div>
    Play
    <span>{{ flashcards }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useFlashcards } from "#imports";

definePageMeta({
  layout: "home",
});

const route = useRoute();
const tag = computed(() => `${route.query.tag}`);

const { flashcards } = useFlashcards(tag);
</script>

<style scoped></style>
